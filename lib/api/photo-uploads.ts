import { createClient } from '@/lib/supabase/browser';
import {
  saveFeaturedImagesToGymAction,
  deletePhotoFromStorageAction,
  getFeaturedImagesForGym,
} from './photo-uploads-actions';

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

  // Use browser client so the user's session (JWT) is sent; otherwise Storage sees anon and RLS blocks INSERT
  const supabase = createClient();
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


// Server actions (re-exported from photo-uploads-actions.ts)
export {
  saveFeaturedImagesToGymAction,
  deletePhotoFromStorageAction,
  getFeaturedImagesForGym,
} from './photo-uploads-actions';
