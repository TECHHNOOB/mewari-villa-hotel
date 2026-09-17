import React from 'react';
import { ArrowUpRight, Utensils, Sparkles, Sun, Moon, Clock } from 'lucide-react';
import { REAL_HOTEL_IMAGES, HOTEL_INFO } from '../data/hotelData';

interface RestaurantSectionProps {
  onEnquireDining: () => void;
}

export const RestaurantSection: React.FC<RestaurantSectionProps> = ({ onEnquireDining }) => {
  const diningPrivileges = [
    {
      metric: '100%',
      title: 'Pure Vegetarian',
      desc: 'Authentic Mewari, North Indian & continental recipes prepared with fresh local ingredients.',
    },
    {
      metric: '360°',
      title: 'Waterfront Panoramas',
      desc: 'Unobstructed vistas of Lake Pichola, Gangaur Ghat, and the illuminated City Palace.',
    },
    {
      metric: 'Sunset',
      title: 'Golden Hour Terrace',
      desc: 'Open-air starlit dining bathed in the evening glow and gentle cooling lake breezes.',
    },
    {
      metric: 'Private',
      title: 'Bespoke Setups',
      desc: 'Candlelight romantic tables and dedicated heritage family banquets on the rooftop.',
    },
  ];

  return (
    <section id="dining" className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden border-b border-[#E8E2D9] text-[#1C1917]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header (Matching Orrivaa Luxury Benchmark) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                Jalsa Restaurant &amp; Rooftop
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
            </div>

            {/* Headline with Signature Editorial Italic */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-[1.1]">
              Culinary Elegance
              <span className="block sm:inline sm:ml-3 font-editorial-italic font-normal text-[#9E763B]">
                Above Lake Pichola
              </span>
            </h2>
          </div>

          {/* Subtitle & Table Reservation Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 lg:max-w-lg">
            <p className="font-body text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Serving 100% pure vegetarian cuisine high above Lake Pichola with panoramic vistas across the Aravalli hills and the illuminated City Palace.
            </p>

            {/* <button
              onClick={onEnquireDining}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-sm hover:shadow-md transition-all flex-shrink-0 group cursor-pointer"
            >
              <span>Reserve a Table</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button> */}
          </div>
        </div>

        {/* Master Visual Composition: Asymmetric Luxury Grid (No AI templates!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16 items-stretch">

          {/* Left: Expansive Sunset & Lake Vista (7 cols) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-md border border-[#E8E2D9] aspect-[16/11] lg:aspect-auto lg:min-h-[480px] group bg-[#E8E2D9]">
            <img
              src={REAL_HOTEL_IMAGES.jalsaLakeSunset}
              alt="Sunset over Lake Pichola from Jalsa Rooftop Restaurant"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Top Pill Badge */}
            <div className="absolute top-5 left-5">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                <Sun className="w-3.5 h-3.5 text-[#DFC088]" />
                <span>Golden Hour Vantage</span>
              </span>
            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#DFC088] font-sans font-semibold block mb-1">
                Open-Air Rooftop Terrace
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white drop-shadow-sm">
                Twilight Over Lake Pichola
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-body max-w-lg mt-1 line-clamp-2">
                Watch the sun dip behind the Aravalli hills as royal palace lights shimmer across the peaceful lake waters.
              </p>
            </div>
          </div>

          {/* Right: Stacked Culinary & Seating Cards (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">

            {/* Card 1: Starlit Table Setting */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[#E8E2D9] aspect-[16/10] group bg-[#E8E2D9]">
              <img
                src={REAL_HOTEL_IMAGES.jalsaTableSetting}
                alt="Romantic candlelit dining setup at Jalsa Restaurant"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-sans font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                  <Moon className="w-3 h-3 text-[#DFC088]" />
                  <span>Candlelit Ambiance</span>
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h4 className="font-serif text-lg sm:text-xl font-normal text-white">
                  Intimate Terrace Setups
                </h4>
                <p className="text-xs text-white/75 font-body mt-0.5">
                  Private romantic tables tailored for unforgettable Udaipur evenings.
                </p>
              </div>
            </div>

            {/* Card 2: 100% Pure Vegetarian Cuisine */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[#E8E2D9] aspect-[16/10] group bg-[#E8E2D9]">
              <img
                src={REAL_HOTEL_IMAGES.jalsaFoodView}
                alt="Pure vegetarian Rajasthani delicacies at Jalsa Restaurant"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-sans font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                  <Utensils className="w-3 h-3 text-[#DFC088]" />
                  <span>100% Pure Veg</span>
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h4 className="font-serif text-lg sm:text-xl font-normal text-white">
                  Authentic Mewari Flavors
                </h4>
                <p className="text-xs text-white/75 font-body mt-0.5">
                  Fresh tandoori breads, rich gravies, and traditional regional specialties.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Minimalist Dining Privileges (Matching Stats Divider Style) */}
        <div className="pt-10 border-t border-[#E8E2D9] mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {diningPrivileges.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#E8E2D9] pb-6 sm:pb-0 pr-0 sm:pr-6 last:border-none"
              >
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917] tracking-tight">
                    {item.metric}
                  </span>
                  <span className="text-[#9E763B] font-serif text-xl font-light">/</span>
                  <span className="font-serif text-lg font-medium text-[#1C1917]">
                    {item.title}
                  </span>
                </div>
                <p className="font-body text-xs sm:text-[13px] text-[#78716C] leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Dining Experience Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1C1917] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#DFC088] text-xs uppercase tracking-[0.2em] font-sans font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Table Reservations &amp; In-House Dining</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              A Symphony of Flavors Under Rajasthan's Starlit Sky
            </h3>
            <p className="font-body text-xs sm:text-sm text-white/75 mt-1 max-w-xl">
              Open for breakfast, lunch, and dinner. In-room dining service readily available for all hotel suites and guests.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <button
              onClick={onEnquireDining}
              className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-lg transition-all group cursor-pointer"
            >
              <span>Reserve Table at Jalsa</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
