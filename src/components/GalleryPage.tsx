import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/hotelData';
import { GalleryImage, GalleryCategory } from '../types';

interface GalleryPageProps {
  onBack: () => void;
  onOpenEnquiry: (roomName?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onBack, onOpenEnquiry }) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('ALL');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categories: GalleryCategory[] = [
    'ALL',
    'VILLA',
    'ROOMS',
    'LAKE VIEW',
    'JALSA',
    'INTERIORS',
    'UDAIPUR',
  ];

  const filteredImages =
    activeCategory === 'ALL'
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
    <div className="pt-28 sm:pt-32 pb-20 bg-[#FAF8F5] min-h-screen">
      {/* Top Breadcrumb & Hero Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12 sm:mb-16">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-sans text-[#78716C] hover:text-[#9E763B] transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E8E2D9]">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                Visual Impressions
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1917] leading-[1.08]">
              Mewari Villa Moments
            </h1>
            <p className="font-body text-sm sm:text-base text-[#57534E] max-w-2xl mt-3 leading-relaxed">
              Explore an authentic visual journey through our lakeside suites, hand-carved heritage architecture, rooftop sunset dining at Jalsa, and panoramic waters of Lake Pichola.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-sans rounded-full transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#9E763B] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#57534E] border border-[#E8E2D9] hover:border-[#9E763B] hover:text-[#1C1917]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Photo Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative overflow-hidden bg-[#E8E2D9] rounded-2xl sm:rounded-3xl cursor-pointer border border-[#E8E2D9] shadow-xs hover:shadow-xl hover:border-[#9E763B] transition-all duration-300 aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-75 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Hover Maximize Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1C1917] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md transform translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4 text-[#9E763B]" />
              </div>

              {/* Caption on Card */}
              <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-0.5 group-hover:translate-y-0 transition-transform">
                <span className="inline-block px-2.5 py-0.5 bg-black/40 backdrop-blur-xs border border-white/20 text-[#DFC088] text-[10px] tracking-wider uppercase font-sans font-semibold rounded-full mb-1.5">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-medium text-white leading-snug drop-shadow-sm">
                  {item.title}
                </h4>
                <p className="text-xs text-white/80 font-body line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300 mt-0.5">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card on Gallery Page */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-[#1C1917] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#DFC088] font-semibold block mb-2">
              Experience Udaipur's Finest Stay
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              Ready to create your own Mewari Villa moments?
            </h3>
            <p className="font-body text-xs sm:text-sm text-white/75 mt-1 max-w-xl">
              Reserve your lake-view suite or pure vegetarian rooftop dinner overlooking Lake Pichola.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry('Any Room')}
            className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-lg transition-all duration-300 flex-shrink-0 group cursor-pointer"
          >
            <span>Reserve Your Stay</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2.5 rounded-full bg-white/10 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition-colors"
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
              className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center text-white">
              <span className="text-xs uppercase tracking-wider text-[#DFC088] font-sans font-semibold">
                {lightboxImage.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl mt-1 text-white">
                {lightboxImage.title}
              </h3>
              <p className="text-xs text-white/80 font-body max-w-lg mt-1">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
