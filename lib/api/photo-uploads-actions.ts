'use server';

import { createClient as createServerClient } from '@/lib/supabase/server';
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

    const supabase = createServerClient();
    
    // Verify ownership
    const { data: gym, error: gymError } = await supabase
      .from('gyms')
      .select('owner_id')
      .eq('id', gymId)
      .single();

    if (gymError || gym.owner_id !== userId) {
      throw new Error('Unauthorized');
    }

    // Update gym with featured images
    const { error: updateError } = await supabase
      .from('gyms')
      .update({ featured_images: imageUrls })
      .eq('id', gymId);

    if (updateError) throw updateError;

    return { success: true };
  } catch (error) {
    console.error('Error saving featured images:', error);
    throw error;
  }
}

export async function deletePhotoFromStorageAction(
  gymId: string,
  filePath: string
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const supabase = createServerClient();
    
    // Verify ownership
    const { data: gym, error: gymError } = await supabase
      .from('gyms')
      .select('owner_id')
      .eq('id', gymId)
      .single();

    if (gymError || gym.owner_id !== userId) {
      throw new Error('Unauthorized');
    }

    // Delete from storage
    const { error: deleteError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (deleteError) throw deleteError;

    return { success: true };
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
}

export async function getFeaturedImagesForGym(gymId: string) {
  try {
    const supabase = createServerClient();
    
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
