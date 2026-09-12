import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/hotelData';
import { GalleryImage, GalleryCategory } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('ALL');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const categories: GalleryCategory[] = [
    'ALL',
    'VILLA',
    'ROOMS',
    'LAKE VIEW',
    'JALSA',
    'INTERIORS',
    'UDAIPUR',
  ];

  const filteredImages = activeCategory === 'ALL'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#FAF8F5] relative border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#EAE4D9] gap-6">
          <div>
            <div className="flex items-center space-x-2.5 mb-2.5">
              <span className="w-5 h-px bg-[#C59B51]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
                Visual Impressions
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717] leading-tight">
              Mewari Villa Moments
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-sans rounded-lg transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#C59B51] text-white font-semibold shadow-xs'
                    : 'bg-white text-[#666666] border border-[#EAE4D9] hover:border-[#C59B51] hover:text-[#171717]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item, index) => {
            const isFeatured = index % 5 === 0;
            return (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className={`group relative overflow-hidden bg-white rounded-2xl cursor-pointer border border-[#EAE4D9] shadow-xs hover:shadow-xl hover:border-[#D5CABE] transition-all duration-300 ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Hover Maximize Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#171717] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <Maximize2 className="w-4 h-4 text-[#C59B51]" />
                </div>

                {/* Caption on Card */}
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] tracking-wider uppercase text-[#C59B51] font-sans font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-medium leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80 font-body line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <span className="text-xs uppercase tracking-wider text-[#C59B51] font-sans">
                {lightboxImage.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl mt-1">
                {lightboxImage.title}
              </h3>
              <p className="text-xs text-white/70 font-body max-w-lg mt-1">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
