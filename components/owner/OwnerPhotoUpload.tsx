'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  Loader,
  Image as ImageIcon,
} from 'lucide-react';
import Link from 'next/link';
import {
  uploadPhotoToStorage,
  validatePhotoFile,
  saveFeaturedImagesToGymAction,
  deletePhotoFromStorageAction,
  getFeaturedImagesForGym,
  getMaxImagesForGym,
  PhotoUploadResult,
} from '@/lib/api/photo-uploads';
import { Button } from '@/components/shared/Button';

interface OwnerPhotoUploadProps {
  gymId: string;
  /** Max photos allowed for this gym's plan (default 5 for free). Use 10 for featured. */
  maxImages?: number;
  /** Whether this gym is on a featured plan (used for upgrade CTA when at free limit). */
  isFeatured?: boolean;
  onSuccess?: (imageUrls: string[]) => void;
}

export function OwnerPhotoUpload({ gymId, maxImages: maxImagesProp, isFeatured = false, onSuccess }: OwnerPhotoUploadProps) {
  const maxImages = maxImagesProp ?? getMaxImagesForGym(isFeatured);
  const [images, setImages] = useState<string[]>([]);
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing images on mount
  useEffect(() => {
    (async () => {
      try {
        const existingImages = await getFeaturedImagesForGym(gymId);
        setImages(existingImages);
      } catch (err) {
        console.error('Failed to load existing images:', err);
      } finally {
        setLoadingInitial(false);
      }
    })();
  }, [gymId]);

  // Handle file validation
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newFiles: File[] = [];
      const errors: string[] = [];

      Array.from(files).forEach((file) => {
        const validation = validatePhotoFile(file);
        if (validation.valid) {
          newFiles.push(file);
        } else {
          errors.push(`${file.name}: ${validation.error}`);
        }
      });

      if (errors.length > 0) {
        setStatusMessage({
          type: 'error',
          text: errors.join('\n'),
        });
      }

      // Check total images wouldn't exceed plan limit
      const totalImages = images.length + newFiles.length + uploadQueue.length;
      if (totalImages > maxImages) {
        setStatusMessage({
          type: 'error',
          text: `Your plan allows up to ${maxImages} photo${maxImages === 1 ? '' : 's'}. You have ${images.length} existing and ${uploadQueue.length} pending.`,
        });
        return;
      }

      if (newFiles.length > 0) {
        setUploadQueue((prev) => [...prev, ...newFiles]);
        setStatusMessage({
          type: 'info',
          text: `${newFiles.length} file(s) added to queue.`,
        });
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [images, uploadQueue, maxImages]
  );

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // Upload files
  const handleUpload = async () => {
    if (uploadQueue.length === 0) {
      setStatusMessage({
        type: 'error',
        text: 'No files to upload.',
      });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const uploadedUrls: string[] = [];

      for (const file of uploadQueue) {
        try {
          const result: PhotoUploadResult = await uploadPhotoToStorage(
            file,
            gymId
          );
          uploadedUrls.push(result.url);
        } catch (err: any) {
          setStatusMessage({
            type: 'error',
            text: `Failed to upload ${file.name}: ${err.message}`,
          });
          setIsUploading(false);
          return;
        }
      }

      // Save all URLs to gym profile (server action; throws if DB update or auth fails)
      const allImages = [...images, ...uploadedUrls];
      await saveFeaturedImagesToGymAction(gymId, allImages);

      // Verify the save persisted: refetch from DB so we never show success if DB didn't update
      const verified = await getFeaturedImagesForGym(gymId);
      const missing = uploadedUrls.filter((u) => !verified.includes(u));
      if (missing.length > 0) {
        setStatusMessage({
          type: 'error',
          text: `Images uploaded to storage but could not be saved to your listing. Please refresh and try again.`,
        });
        setIsUploading(false);
        return;
      }

      setImages(verified);
      setUploadQueue([]);
      setStatusMessage({
        type: 'success',
        text: `Successfully uploaded ${uploadedUrls.length} image(s)!`,
      });

      if (onSuccess) {
        onSuccess(verified);
      }
    } catch (err: any) {
      const message = err?.message ?? String(err);
      setStatusMessage({
        type: 'error',
        text: message.includes('Unauthorized')
          ? 'You don’t have permission to update this gym. Make sure you’re the claimed owner.'
          : (typeof message === 'string' && (message.includes('Server Components render') || message.includes('digest')))
            ? 'Upload or save failed. Ensure the gym is claimed by you and the featured_images column exists on the gyms table. Try again or check the browser console for details.'
            : `Upload error: ${message}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Remove from queue
  const removeFromQueue = (index: number) => {
    setUploadQueue((prev) => prev.filter((_, i) => i !== index));
  };

  // Delete uploaded image (refetch from DB so UI stays in sync with server)
  const handleDeleteImage = async (imageUrl: string) => {
    try {
      await deletePhotoFromStorageAction(gymId, imageUrl);
      const afterDelete = await getFeaturedImagesForGym(gymId);
      setImages(Array.isArray(afterDelete) ? afterDelete : []);
      setStatusMessage({
        type: 'success',
        text: 'Image deleted successfully.',
      });
      if (onSuccess && Array.isArray(afterDelete)) {
        onSuccess(afterDelete);
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error: ${err.message}`,
      });
    }
  };

  // Photo reordering (featured only)
  const handlePhotoDragStart = (index: number) => {
    if (!isFeatured) return;
    setDraggedIndex(index);
  };

  const handlePhotoDragOver = (e: React.DragEvent, index: number) => {
    if (!isFeatured) return;
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handlePhotoDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handlePhotoDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (!isFeatured || draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // Reorder images array
    const newImages = [...images];
    const [draggedImage] = newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);

    setImages(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);

    // Save new order to database
    try {
      await saveFeaturedImagesToGymAction(gymId, newImages);
      setStatusMessage({
        type: 'success',
        text: 'Photo order updated successfully.',
      });
      if (onSuccess) {
        onSuccess(newImages);
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Failed to save order: ${err.message}`,
      });
      // Revert on error
      const current = await getFeaturedImagesForGym(gymId);
      setImages(Array.isArray(current) ? current : []);
    }
  };

  if (loadingInitial) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-muted">Loading photos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Messages */}
      {statusMessage && (
        <div
          className={`flex items-start gap-3 p-4 rounded-lg ${
            statusMessage.type === 'success'
              ? 'bg-secondary-green/20 border border-secondary-green/50'
              : statusMessage.type === 'error'
                ? 'bg-secondary-coral/20 border border-secondary-coral/50'
                : 'bg-primary-blue/20 border border-primary-blue/50'
          }`}
        >
          {statusMessage.type === 'success' && (
            <CheckCircle className="w-5 h-5 text-secondary-green flex-shrink-0 mt-0.5" />
          )}
          {statusMessage.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-secondary-coral flex-shrink-0 mt-0.5" />
          )}
          {statusMessage.type === 'info' && (
            <ImageIcon className="w-5 h-5 text-primary-blue flex-shrink-0 mt-0.5" />
          )}
          <div className="text-text-light whitespace-pre-wrap text-sm">
            {statusMessage.text}
          </div>
        </div>
      )}

      {/* Existing Images */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-white">
              Your Photos ({images.length}/{maxImages})
              {isFeatured && images.length > 1 && (
                <span className="ml-2 text-sm text-text-muted font-normal">
                  (Drag to reorder)
                </span>
              )}
            </h3>
            {!isFeatured && images.length > 1 && (
              <Link
                href="/pricing"
                className="text-sm text-primary-blue hover:text-primary-blue/80 transition-colors"
              >
                Upgrade to reorder photos →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {images.map((imageUrl, index) => (
              <div
                key={imageUrl}
                draggable={isFeatured}
                onDragStart={() => handlePhotoDragStart(index)}
                onDragOver={(e) => handlePhotoDragOver(e, index)}
                onDragEnd={handlePhotoDragEnd}
                onDrop={(e) => handlePhotoDrop(e, index)}
                className={`relative group aspect-square rounded-lg overflow-hidden bg-surface-lighter border transition-all ${
                  draggedIndex === index
                    ? 'opacity-50 scale-95 border-primary-blue'
                    : dragOverIndex === index && draggedIndex !== null
                      ? 'border-primary-blue border-2 scale-105'
                      : 'border-surface-lighter hover:border-primary-blue'
                } ${isFeatured ? 'cursor-move' : ''}`}
              >
                <img
                  src={imageUrl}
                  alt={`Gym photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDeleteImage(imageUrl)}
                  disabled={isUploading}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div>
        <h3 className="text-lg font-semibold text-text-white mb-4">
          {images.length === 0 ? 'Upload Your First Photos' : 'Add More Photos'}
        </h3>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-primary-blue bg-primary-blue/10'
              : 'border-surface-lighter hover:border-primary-blue hover:bg-primary-blue/5'
          }`}
        >
          <Upload className="w-12 h-12 text-primary-blue mx-auto mb-3" />
          <p className="text-text-white font-semibold mb-1">
            Drag and drop your images here
          </p>
          <p className="text-text-muted text-sm mb-4">
            or click to browse (JPG or PNG, max 5MB each)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            disabled={isUploading}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            Choose Files
          </Button>
        </div>

        {/* Upload Queue */}
        {uploadQueue.length > 0 && (
          <div className="mt-6">
            <h4 className="text-text-white font-semibold mb-3">
              Ready to upload ({uploadQueue.length})
            </h4>
            <div className="space-y-2 mb-4">
              {uploadQueue.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 bg-surface-lighter rounded-lg"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ImageIcon className="w-5 h-5 text-primary-blue flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-text-light text-sm truncate">
                        {file.name}
                      </p>
                      <p className="text-text-muted text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromQueue(index)}
                    disabled={isUploading}
                    className="text-text-muted hover:text-text-light disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading && (
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                )}
                {isUploading ? 'Uploading...' : 'Upload Now'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setUploadQueue([])}
                disabled={isUploading}
              >
                Clear Queue
              </Button>
            </div>
          </div>
        )}

        {/* Image Limit Info */}
        <div className="mt-4 p-3 bg-surface-lighter rounded-lg space-y-2">
          <p className="text-text-muted text-sm">
            ℹ️ Your plan allows up to {maxImages} photo{maxImages === 1 ? '' : 's'} per gym. Currently:{' '}
            <span className="text-text-light font-semibold">
              {images.length}
            </span>
            /{maxImages}
          </p>
          {!isFeatured && (
            <p className="text-text-muted text-sm">
              <Link href="/pricing" className="text-primary-blue hover:underline">
                Upgrade to featured
              </Link>
              {' '}to add up to 10 photos and get more visibility.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
