import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { REAL_HOTEL_IMAGES } from '../data/hotelData';

export const IntroStory: React.FC = () => {
  const stats = [
    {
      number: '15+',
      label: 'Years of exceptional royal hospitality and excellence',
    },
    {
      number: '100%',
      label: 'Direct panoramic Lake Pichola and City Palace views',
    },
    {
      number: '4.9★',
      label: 'Ranked among Udaipur’s finest luxury heritage stays',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Top Story Block: Editorial Copy on Left + Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">

          {/* Left: Brand Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            {/* Subtle Eyebrow Tag */}
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                About Mewari Villa
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
            </div>

            {/* Editorial Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-[1.12] mb-6">
              Redefining hospitality
              <span className="block font-editorial-italic font-normal text-[#9E763B] mt-1">
                with timeless elegance
              </span>
            </h2>

            {/* Subtext */}
            <p className="font-body text-sm sm:text-base text-[#57534E] leading-relaxed mb-8">
              Discover a sanctuary where Mewari sophistication meets lakeside serenity. Hotel Mewari Villa is a luxurious destination crafted for those who appreciate architectural beauty, genuine heritage comfort, and heartfelt royal service.
            </p>

            {/* More About Us Pill Button */}
            <div>
              <a
                href="#stay"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <span>More About Us</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

          </div>

          {/* Right: Dual Editorial Photography Cards (As in reference mockup) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

            {/* Card 1: Suite Interior */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md border border-[#E8E2D9] aspect-[4/3] bg-[#EAE4D9]">
              <img
                src={REAL_HOTEL_IMAGES.villaSuiteMain}
                alt="Hotel Mewari Villa Luxury Suite Bedroom"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-xs font-serif italic">
                  Royal Villa Suite &amp; Jharokhas
                </span>
              </div>
            </div>

            {/* Card 2: Lake Pichola Waterfront / Terrace */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md border border-[#E8E2D9] aspect-[4/3] bg-[#EAE4D9] sm:mt-6">
              <img
                src={REAL_HOTEL_IMAGES.lakeViewRooftop}
                alt="Direct Lake Pichola Views from Mewari Villa Terrace"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-xs font-serif italic">
                  Lake Pichola Panorama Terrace
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Minimalist Stats Divider Row (Directly matching Orrivaa reference) */}
        <div className="pt-10 border-t border-[#E8E2D9]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-baseline space-x-4 border-b md:border-b-0 md:border-r border-[#E8E2D9] pb-6 md:pb-0 pr-0 md:pr-6 last:border-none"
              >
                <span className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1917] tracking-tight flex-shrink-0">
                  {stat.number}
                </span>
                <span className="text-[#9E763B] font-serif text-2xl font-light">/</span>
                <p className="font-body text-xs sm:text-[13px] text-[#78716C] leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
