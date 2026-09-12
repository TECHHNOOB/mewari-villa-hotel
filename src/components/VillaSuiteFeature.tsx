import React, { useState } from 'react';
import { ArrowRight, Play, Shield, Sun, Compass, Star } from 'lucide-react';
import { REAL_HOTEL_IMAGES } from '../data/hotelData';

interface VillaSuiteFeatureProps {
  onEnquireSuite: () => void;
}

export const VillaSuiteFeature: React.FC<VillaSuiteFeatureProps> = ({ onEnquireSuite }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 md:py-24 bg-white border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: What Our Guests Say (4 cols) */}
          <div className="lg:col-span-4 bg-[#FAF8F5] rounded-2xl p-7 border border-[#EAE4D9] flex flex-col justify-between h-full shadow-xs">
            <div>
              <div className="flex items-center space-x-2 text-[#C59B51] mb-3">
                <span className="text-[10px] font-sans uppercase tracking-widest font-semibold">Guest Impressions</span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#171717] mb-4">
                What Our Guests Say
              </h3>

              {/* Large Gold Quote Mark */}
              <div className="font-serif text-5xl text-[#C59B51] leading-none mb-3 font-italic select-none">
                “
              </div>

              <p className="text-xs sm:text-sm font-body text-[#525252] leading-relaxed mb-6">
                From our first evening watching sunset from the rooftop to the quiet comfort of the lake-view suite, Mewari Villa provided unmatched warmth and authentic royal hospitality. Truly a memorable Udaipur experience.
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-3 pt-4 border-t border-[#EAE4D9]">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#EAE4D9] border border-white shadow-xs">
                  <img
                    src={REAL_HOTEL_IMAGES.propertyCourtyard}
                    alt="Michael Thompson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#171717]">
                    Michael &amp; Sarah Thompson
                  </h4>
                  <div className="flex items-center space-x-1 text-[10px] font-sans text-[#737373]">
                    <span>London, UK</span>
                    <span>•</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Indicator Dots */}
              <div className="mt-5 flex items-center space-x-1.5">
                <div className="w-4 h-1 bg-[#C59B51] rounded-full" />
                <div className="w-1.5 h-1 bg-[#D8CEBE] rounded-full" />
                <div className="w-1.5 h-1 bg-[#D8CEBE] rounded-full" />
              </div>
            </div>
          </div>

          {/* Middle Column: Video Showcase Card with Gold Play Button (4 cols) */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-md border border-[#EAE4D9] aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] group bg-[#171717]">
            <img
              src={REAL_HOTEL_IMAGES.lakeViewRooftop}
              alt="Mewari Villa sunset video tour"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

            {/* Centered Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => alert('Tour preview: Mewari Villa Hotel Rooftop and Lake Pichola panoramic views.')}
                className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#171717] group-hover:scale-110 group-hover:bg-[#C59B51] group-hover:text-white transition-all duration-300 shadow-xl"
                aria-label="Play Video Tour"
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
            </div>

            {/* Bottom Tag */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="text-[11px] font-sans font-medium text-white/90 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full">
                Virtual Tour · Sunset Over Lake Pichola
              </span>
            </div>
          </div>

          {/* Right Column: Exclusive Stay Privileges (4 cols) */}
          <div className="lg:col-span-4 bg-[#FAF8F5] rounded-2xl p-7 border border-[#EAE4D9] flex flex-col justify-between h-full shadow-xs">
            <div>
              <div className="flex items-center space-x-2 text-[#C59B51] mb-2">
                <span className="text-[10px] font-sans uppercase tracking-widest font-semibold">Special Stays</span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#171717] mb-3">
                Exclusive Heritage Privileges
              </h3>
              <p className="text-xs font-body text-[#666666] leading-relaxed mb-6">
                Curated royal experiences, personalized dining setups, and private lake boat charters handpicked for your itinerary.
              </p>

              <button
                onClick={onEnquireSuite}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg transition-all shadow-xs mb-6"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Mini Privileges with Icons */}
            <div className="space-y-3 pt-4 border-t border-[#EAE4D9]">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] flex-shrink-0">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-serif font-medium text-[#171717]">High Privacy &amp; Serenity</p>
                  <p className="text-[10px] font-sans text-[#737373]">Intimate heritage quarters</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] flex-shrink-0">
                  <Sun className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-serif font-medium text-[#171717]">Sunset Rooftop Dining</p>
                  <p className="text-[10px] font-sans text-[#737373]">Jalsa pure vegetarian cuisine</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] flex-shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-serif font-medium text-[#171717]">Curated City Excursions</p>
                  <p className="text-[10px] font-sans text-[#737373]">Tailored Lake Pichola boat charters</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
