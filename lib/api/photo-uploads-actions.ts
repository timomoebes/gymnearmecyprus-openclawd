'use server';

import { createClient } from '@/lib/supabase/server';
import { getCurrentUserId } from '@/lib/supabase/server';

const STORAGE_BUCKET = 'gym-photos';

export async function saveFeaturedImagesToGymAction(
  gymId: string,
  imageUrls: string[]
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const supabase = await createClient();
    
    // Verify ownership
    const { data: gym, error: gymError } = await supabase
      .from('gyms')
      .select('owner_id')
      .eq('id', gymId)
      .single();

    if (gymError || gym.owner_id !== userId) {
      throw new Error('Unauthorized');
    }

    // Update gym with featured images (.maybeSingle() avoids PGRST116 when 0 rows)
    const { data: updated, error: updateError } = await supabase
      .from('gyms')
      .update({ featured_images: imageUrls })
      .eq('id', gymId)
      .select('featured_images')
      .maybeSingle();

    if (updateError) {
      throw new Error(`Database update failed: ${updateError.message}`);
    }
    if (!updated?.featured_images) {
      throw new Error('Database update did not persist featured_images. The gym may not exist or row-level security may have blocked the update.');
    }

    return { success: true, images: updated.featured_images };
  } catch (error) {
    console.error('Error saving featured images:', error);
    // Throw a plain Error with a safe message so production shows a readable message instead of "Server Components render"
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message: unknown }).message)
          : 'Failed to save images to your gym listing.';
    throw new Error(message);
  }
}

/**
 * Extract storage object path from a Supabase public URL.
 * URL format: https://<project>.supabase.co/storage/v1/object/public/gym-photos/gyms/<id>/photos/<file>
 * Returns e.g. "gyms/<id>/photos/<file>" or the original value if not a URL.
 */
function pathFromPublicUrl(publicUrlOrPath: string): string {
  const trimmed = publicUrlOrPath.trim();
  const match = trimmed.match(/\/object\/public\/gym-photos\/(.+)$/);
  if (match) return match[1];
  if (trimmed.startsWith('gyms/')) return trimmed;
  return trimmed;
}

export async function deletePhotoFromStorageAction(
  gymId: string,
  imageUrlOrPath: string
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const supabase = await createClient();

    // Verify ownership
    const { data: gym, error: gymError } = await supabase
      .from('gyms')
      .select('owner_id, featured_images')
      .eq('id', gymId)
      .single();

    if (gymError || gym.owner_id !== userId) {
      throw new Error('Unauthorized');
    }

    const storagePath = pathFromPublicUrl(imageUrlOrPath);

    // Delete from storage (best-effort; path might already be wrong)
    const { error: deleteError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([storagePath]);

    if (deleteError) {
      console.warn('Storage remove failed (file may already be gone):', deleteError.message);
    }

    // Remove this URL from the gym's featured_images in the DB so the photo stays deleted
    const current = (gym.featured_images || []) as string[];
    const updated = current.filter((url) => url !== imageUrlOrPath && url.trim() !== imageUrlOrPath.trim());
    if (updated.length === current.length) {
      console.warn('deletePhotoFromStorageAction: URL not found in featured_images', imageUrlOrPath);
    }

    const { error: updateError } = await supabase
      .from('gyms')
      .update({ featured_images: updated })
      .eq('id', gymId);

    if (updateError) {
      throw new Error(`Failed to update listing: ${updateError.message}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting photo:', error);
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message: unknown }).message)
          : 'Failed to delete photo.';
    throw new Error(message);
  }
}

export async function getFeaturedImagesForGym(gymId: string) {
  try {
    const supabase = await createClient();
    
    const { data: gym, error } = await supabase
      .from('gyms')
      .select('featured_images')
      .eq('id', gymId)
      .single();

    if (error) throw error;

    return gym?.featured_images || [];
  } catch (error) {
    console.error('Error fetching featured images:', error);
    return [];
  }
}
