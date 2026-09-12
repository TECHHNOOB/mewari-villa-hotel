import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight, MapPin, Compass } from 'lucide-react';
import { REAL_HOTEL_IMAGES, HOTEL_INFO } from '../data/hotelData';

interface LocationHighlightProps {
  onExploreUdaipur: () => void;
}

export const LocationHighlight: React.FC<LocationHighlightProps> = ({ onExploreUdaipur }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const sights = [
    {
      name: 'City Palace',
      location: 'Udaipur · 0.9 km',
      description: 'The crown jewel of Rajasthan royal architecture with grand courtyards and heritage museum.',
      image: REAL_HOTEL_IMAGES.royalPalaceUdaipur,
    },
    {
      name: 'Lake Pichola',
      location: 'Waterside · 0.1 km',
      description: 'Tranquil sunset waters and iconic lakeside ghats located right by the hotel steps.',
      image: REAL_HOTEL_IMAGES.lakeViewTwilight,
    },
    {
      name: 'Boat Ride Ghat',
      location: 'Lake Pichola · 0.3 km',
      description: 'Private and shared royal boat charters departing for Jag Mandir and scenic lake tours.',
      image: REAL_HOTEL_IMAGES.lakeBoatRide,
    },
    {
      name: 'Old City Bazaar',
      location: 'Purohit Ka Khurra · 0 km',
      description: 'Vibrant heritage lanes filled with traditional Mewari handicrafts, miniature paintings, and textiles.',
      image: REAL_HOTEL_IMAGES.oldCityBazaar,
    },
  ];

  // 2 cards per slide
  const cardsPerSlide = 2;
  const totalSlides = Math.ceil(sights.length / cardsPerSlide);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const visibleSights = sights.slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide);

  return (
    <section className="py-20 md:py-24 bg-[#FAF8F5] border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <span className="w-5 h-px bg-[#C59B51]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
                Prime Neighborhood
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717]">
              Explore Udaipur Heritage
            </h2>
          </div>

          {/* Controls: Explore All + Slider Nav */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <button
              onClick={onExploreUdaipur}
              className="inline-flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.14em] text-[#666666] hover:text-[#C59B51] transition-colors font-medium group"
            >
              <span>View All Sights</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Slider Arrow Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#171717] hover:bg-[#C59B51] hover:text-white hover:border-[#C59B51] transition-all shadow-xs"
                aria-label="Previous sights"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#171717] hover:bg-[#C59B51] hover:text-white hover:border-[#C59B51] transition-all shadow-xs"
                aria-label="Next sights"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Split: 2-Card Slider on Left + Interactive Map Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left Column: 2 Cards Slider (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
              {visibleSights.map((sight) => (
                <div
                  key={sight.name}
                  onClick={onExploreUdaipur}
                  className="group cursor-pointer bg-white rounded-2xl p-3 border border-[#EAE4D9] shadow-xs hover:shadow-xl hover:border-[#D5CABE] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3.5 relative bg-[#F0ECE1]">
                    <img
                      src={sight.image}
                      alt={sight.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Location badge on image */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#171717] text-[10px] font-sans font-semibold px-2.5 py-1 rounded-md shadow-xs">
                      {sight.location}
                    </div>
                  </div>

                  <div className="px-1.5 pb-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-serif text-lg font-medium text-[#171717] group-hover:text-[#C59B51] transition-colors leading-snug">
                        {sight.name}
                      </h3>
                      <div className="w-7 h-7 rounded-full bg-[#FAF8F5] group-hover:bg-[#C59B51] text-[#737373] group-hover:text-white flex items-center justify-center transition-colors shrink-0 ml-2">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-xs font-body text-[#666666] leading-relaxed line-clamp-2">
                      {sight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Dots Indicator */}
            <div className="mt-5 flex items-center justify-center space-x-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    slideIndex === idx
                      ? 'w-6 h-1.5 bg-[#C59B51]'
                      : 'w-2 h-1.5 bg-[#D8CEBE] hover:bg-[#C59B51]/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Map & Location Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#EAE4D9] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-[#C59B51] mb-2">
                <Compass className="w-4 h-4" />
                <span className="text-[10px] font-sans uppercase tracking-wider font-semibold">Interactive Map</span>
              </div>
              <h3 className="font-serif text-xl font-normal text-[#171717] mb-2">
                Find Your Perfect Location
              </h3>
              <p className="text-xs font-body text-[#666666] leading-relaxed mb-4">
                Situated in historic Purohit Ka Khurra right before Chandpole, offering unrivaled walking access to Lake Pichola ghats.
              </p>
            </div>

            {/* Stylized Minimal Map Graphic */}
            <div className="relative rounded-xl overflow-hidden border border-[#EAE4D9] aspect-[16/10] bg-[#F7F4EF] flex items-center justify-center group mb-4">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C59B51_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Pin 1: Hotel */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="px-2 py-1 rounded-md bg-[#C59B51] text-white text-[9px] font-sans font-bold shadow-md whitespace-nowrap mb-1">
                  Mewari Villa Hotel
                </div>
                <div className="w-3 h-3 rounded-full bg-[#C59B51] ring-4 ring-[#C59B51]/30" />
              </div>

              {/* Pin 2: Lake Pichola */}
              <div className="absolute bottom-4 left-6 flex items-center space-x-1 text-[9px] font-sans text-[#737373]">
                <MapPin className="w-3 h-3 text-[#C59B51]" />
                <span>Lake Pichola</span>
              </div>

              {/* Pin 3: City Palace */}
              <div className="absolute top-4 right-6 flex items-center space-x-1 text-[9px] font-sans text-[#737373]">
                <MapPin className="w-3 h-3 text-[#C59B51]" />
                <span>City Palace</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F0ECE1]">
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#C59B51] hover:text-white text-[#171717] text-xs uppercase tracking-wider font-sans font-semibold rounded-lg border border-[#EAE4D9] flex items-center justify-center space-x-2 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
