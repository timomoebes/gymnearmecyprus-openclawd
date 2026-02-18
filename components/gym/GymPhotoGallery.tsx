'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GymPhotoGalleryProps {
  images: string[];
  gymName: string;
  /** Optional max to show (default 6) */
  maxImages?: number;
}

export function GymPhotoGallery({ images, gymName, maxImages = 6 }: GymPhotoGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = images.slice(0, maxImages);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || items.length === 0) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.offsetWidth;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(Math.max(0, index), items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateActiveIndex();
    el.addEventListener('scroll', updateActiveIndex);
    const ro = new ResizeObserver(updateActiveIndex);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateActiveIndex);
      ro.disconnect();
    };
  }, [updateActiveIndex]);

  const goTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = el.offsetWidth;
    el.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
    setActiveIndex(index);
  };

  if (items.length === 0) return null;

  return (
    <section className="mb-12" aria-label="Gym photos">
      <h2 className="sr-only">Photos</h2>
      <div className="relative">
        {/* Scroll container: native touch swipe + scroll-snap */}
        <div
          ref={scrollRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${gymName} photo gallery`}
          className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth gap-0 -mx-4 sm:mx-0 sm:rounded-card [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {items.map((imageUrl, index) => (
            <div
              key={typeof imageUrl === 'string' ? imageUrl : `img-${index}`}
              className="flex-none w-full sm:w-full snap-center sm:rounded-card overflow-hidden bg-surface-card"
              style={{ minWidth: '100%' }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Photo ${index + 1} of ${items.length}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={imageUrl}
                  alt={`${gymName} photo ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next (desktop and keyboard) */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-blue"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(Math.min(items.length - 1, activeIndex + 1))}
              disabled={activeIndex === items.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-blue"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {items.length > 1 && (
          <div
            className="flex justify-center gap-2 mt-3"
            role="tablist"
            aria-label="Photo navigation"
          >
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Go to photo ${index + 1}`}
                onClick={() => goTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-background-dark ${
                  activeIndex === index
                    ? 'bg-primary-blue scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
