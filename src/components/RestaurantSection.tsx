import React from 'react';
import { Utensils, Mountain, Sun, Eye, Flame, ArrowRight } from 'lucide-react';
import { REAL_HOTEL_IMAGES } from '../data/hotelData';

interface RestaurantSectionProps {
  onEnquireDining: () => void;
}

export const RestaurantSection: React.FC<RestaurantSectionProps> = ({ onEnquireDining }) => {
  const highlights = [
    { title: 'PURE VEGETARIAN', desc: '100% Pure Veg cuisine curated with authentic Rajasthani and North Indian delicacies.', icon: Utensils },
    { title: 'ROOFTOP DINING', desc: 'Open-air elevated terrace seating catching cool evening lake breezes.', icon: Mountain },
    { title: 'LAKE VIEWS', desc: 'Unobstructed vistas of Lake Pichola, shimmering ghats, and City Palace.', icon: Eye },
    { title: 'LIVE KITCHEN', desc: 'Fresh tandoori breads, fragrant curries, and personalized chef preparations.', icon: Flame },
    { title: 'GOLDEN HOUR', desc: 'Watch sunsets reflect across the water as palace lights begin to glow.', icon: Sun },
  ];

  return (
    <section id="dining" className="py-20 md:py-28 bg-white relative overflow-hidden border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-[#EAE4D9] gap-6">
          <div>
            <div className="flex items-center space-x-2.5 mb-2.5">
              <span className="w-5 h-px bg-[#C59B51]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
                Rooftop Culinary Experience
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717] leading-tight">
              Jalsa Restaurant &amp; Rooftop
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-body text-xs sm:text-sm text-[#666666] leading-relaxed">
              Serving 100% pure vegetarian cuisine high above Lake Pichola with panoramic vistas across the Aravalli hills and the illuminated City Palace.
            </p>
          </div>
        </div>

        {/* Large Immersive Real Photography Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {/* Main Hero Rooftop Photograph */}
          <div className="md:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden group shadow-md border border-[#EAE4D9] bg-[#FAF8F5]">
            <img
              src={REAL_HOTEL_IMAGES.jalsaFoodView}
              alt="Jalsa Restaurant rooftop pure vegetarian dining overlooking Lake Pichola Mewari Villa"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C59B51] font-sans font-semibold">
                  The Rooftop Vantage
                </span>
                <div className="font-serif text-xl sm:text-2xl font-medium">Jalsa Lake-View Dining</div>
              </div>
              <div className="hidden sm:block text-xs text-white/80 tracking-wider uppercase font-sans">
                Lake Pichola Panorama
              </div>
            </div>
          </div>

          {/* Secondary Sunset Dining Photograph */}
          <div className="md:col-span-4 relative aspect-[16/10] md:aspect-auto rounded-2xl overflow-hidden group shadow-md border border-[#EAE4D9] bg-[#FAF8F5]">
            <img
              src={REAL_HOTEL_IMAGES.jalsaLakeSunset}
              alt="Sunset atmosphere at Jalsa Rooftop Restaurant Mewari Villa Udaipur"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C59B51] font-sans font-semibold">
                Evening Ambiance
              </span>
              <div className="font-serif text-lg font-medium">Sunset Over The Lake</div>
            </div>
          </div>
        </div>

        {/* 5 Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] hover:border-[#C59B51] transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] mb-3 group-hover:bg-[#C59B51] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-sm font-semibold text-[#171717] tracking-wide mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] font-body text-[#666666] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] gap-4">
          <div>
            <h4 className="font-serif text-lg font-medium text-[#171717]">
              Reserve a Lake-View Table at Jalsa
            </h4>
            <p className="text-xs font-sans text-[#737373] mt-0.5">
              Available for in-house hotel guests and private evening dining inquiries.
            </p>
          </div>
          <button
            onClick={onEnquireDining}
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg transition-colors shadow-xs"
          >
            <span>Inquire Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
