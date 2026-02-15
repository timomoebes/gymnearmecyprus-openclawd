import { createClient as createServerClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { getCurrentUserId } from '@/lib/supabase/server';

const STORAGE_BUCKET = 'gym-photos';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
const MAX_IMAGES_PER_GYM = 5;

/**
 * Validation types and utilities
 */
export interface PhotoUploadValidation {
  valid: boolean;
  error?: string;
}

export interface PhotoUploadResult {
  url: string;
  fileName: string;
  uploadedAt: string;
}

/**
 * Validate file before upload (client-side)
 */
export function validatePhotoFile(file: File): PhotoUploadValidation {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than 5MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`,
    };
  }

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Only JPG and PNG images are allowed. You selected ${file.type}.`,
    };
  }

  return { valid: true };
}

/**
 * Upload a photo to Supabase Storage (client-side)
 * Returns the public URL of the uploaded file
 */
export async function uploadPhotoToStorage(
  file: File,
  gymId: string
): Promise<PhotoUploadResult> {
  // Validate file
  const validation = validatePhotoFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Generate unique filename
  const timestamp = Date.now();
  const ext = file.type === 'image/jpeg' ? 'jpg' : 'png';
  const fileName = `${gymId}-${timestamp}.${ext}`;
  const filePath = `gyms/${gymId}/photos/${fileName}`;

  // Upload to storage
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  if (!data) {
    throw new Error('Upload failed: No data returned');
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(data.path);

  if (!urlData.publicUrl) {
    throw new Error('Could not generate public URL for uploaded file');
  }

  return {
    url: urlData.publicUrl,
    fileName: data.path,
    uploadedAt: new Date().toISOString(),
  };
}

/**
 * Server action: Save featured images URLs to gym profile
 */
export async function saveFeaturedImagesToGymAction(
  gymId: string,
  imageUrls: string[]
): Promise<{ success: boolean; error?: string; featured_images?: string[] }> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return {
      success: false,
      error: 'You must be signed in to upload photos.',
    };
  }

  // Validate number of images
  if (imageUrls.length > MAX_IMAGES_PER_GYM) {
    return {
      success: false,
      error: `Maximum ${MAX_IMAGES_PER_GYM} images allowed per gym.`,
    };
  }

  try {
    const serverSupabase = await createServerClient();

    // Verify ownership: check that user owns this gym
    const { data: gym, error: gymError } = await serverSupabase
      .from('gyms')
      .select('owner_id')
      .eq('id', gymId)
      .single();

    if (gymError || !gym) {
      return {
        success: false,
        error: 'Gym not found.',
      };
    }

    if (gym.owner_id !== userId) {
      return {
        success: false,
        error: 'You do not own this gym.',
      };
    }

    // Update gym with featured images
    const { data, error } = await serverSupabase
      .from('gyms')
      .update({
        featured_images: imageUrls,
        updated_at: new Date().toISOString(),
      })
      .eq('id', gymId)
      .eq('owner_id', userId)
      .select('featured_images')
      .single();

    if (error) {
      return {
        success: false,
        error: `Failed to save images: ${error.message}`,
      };
    }

    return {
      success: true,
      featured_images: data?.featured_images || imageUrls,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Error: ${err?.message || 'Unknown error occurred'}`,
    };
  }
}

/**
 * Delete a photo from storage
 */
export async function deletePhotoFromStorageAction(
  gymId: string,
  photoUrl: string
): Promise<{ success: boolean; error?: string }> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return {
      success: false,
      error: 'You must be signed in to delete photos.',
    };
  }

  try {
    const serverSupabase = await createServerClient();

    // Verify ownership
    const { data: gym, error: gymError } = await serverSupabase
      .from('gyms')
      .select('owner_id, featured_images')
      .eq('id', gymId)
      .single();

    if (gymError || !gym) {
      return {
        success: false,
        error: 'Gym not found.',
      };
    }

    if (gym.owner_id !== userId) {
      return {
        success: false,
        error: 'You do not own this gym.',
      };
    }

    // Extract file path from URL
    // URL format: https://bucket.supabase.co/storage/v1/object/public/gym-photos/gyms/...
    const urlParts = photoUrl.split(`${STORAGE_BUCKET}/`);
    if (urlParts.length < 2) {
      return {
        success: false,
        error: 'Invalid photo URL.',
      };
    }

    const filePath = urlParts[1];

    // Delete from storage
    const { error: deleteError } = await serverSupabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (deleteError) {
      return {
        success: false,
        error: `Failed to delete photo: ${deleteError.message}`,
      };
    }

    // Update gym: remove URL from featured_images array
    const updatedImages = (gym.featured_images || []).filter(
      (url: string) => url !== photoUrl
    );

    const { error: updateError } = await serverSupabase
      .from('gyms')
      .update({
        featured_images: updatedImages,
        updated_at: new Date().toISOString(),
      })
      .eq('id', gymId)
      .eq('owner_id', userId);

    if (updateError) {
      return {
        success: false,
        error: `Photo deleted from storage but failed to update gym: ${updateError.message}`,
      };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: `Error: ${err?.message || 'Unknown error occurred'}`,
    };
  }
}

/**
 * Get featured images for a gym
 */
export async function getFeaturedImagesForGym(gymId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('gyms')
      .select('featured_images')
      .eq('id', gymId)
      .single();

    if (error || !data) {
      return [];
    }

    return data.featured_images || [];
  } catch (err) {
    console.error('Error fetching featured images:', err);
    return [];
  }
}
