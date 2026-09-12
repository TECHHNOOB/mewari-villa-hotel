import React from 'react';
import {
  Wifi,
  Wind,
  Bed,
  BellRing,
  Utensils,
  Tv,
  ShieldCheck,
  ArrowUpDown,
  Sparkles,
  Layers,
  Briefcase,
  Car,
} from 'lucide-react';
import { AMENITIES, HOTEL_INFO } from '../data/hotelData';

export const AmenitiesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi':
        return <Wifi className="w-4 h-4 stroke-[1.5]" />;
      case 'Wind':
        return <Wind className="w-4 h-4 stroke-[1.5]" />;
      case 'Bed':
        return <Bed className="w-4 h-4 stroke-[1.5]" />;
      case 'BellRing':
        return <BellRing className="w-4 h-4 stroke-[1.5]" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 stroke-[1.5]" />;
      case 'Tv':
        return <Tv className="w-4 h-4 stroke-[1.5]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 stroke-[1.5]" />;
      case 'ArrowUpDown':
        return <ArrowUpDown className="w-4 h-4 stroke-[1.5]" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 stroke-[1.5]" />;
      case 'CheckSquare':
        return <Layers className="w-4 h-4 stroke-[1.5]" />;
      case 'Luggage':
        return <Briefcase className="w-4 h-4 stroke-[1.5]" />;
      case 'Car':
        return <Car className="w-4 h-4 stroke-[1.5]" />;
      default:
        return <Sparkles className="w-4 h-4 stroke-[1.5]" />;
    }
  };

  return (
    <section className="py-20 md:py-24 bg-white relative border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 mb-2.5 justify-center">
            <span className="w-5 h-px bg-[#C59B51]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
              Guest Comfort &amp; Privileges
            </span>
            <span className="w-5 h-px bg-[#C59B51]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] mb-3">
            Curated Hotel Amenities
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#666666] leading-relaxed">
            Thoughtful comforts and verified facilities provided across Mewari Villa to ensure an effortless, relaxing heritage stay.
          </p>
        </div>

        {/* 12 Verified Amenities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          {AMENITIES.map((amenity) => (
            <div
              key={amenity.id}
              className="p-5 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] hover:border-[#C59B51] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] group-hover:bg-[#C59B51] group-hover:text-white transition-colors mb-3 shadow-xs">
                {getIcon(amenity.iconName)}
              </div>
              <h3 className="font-serif text-sm text-[#171717] font-semibold mb-1">
                {amenity.name}
              </h3>
              <p className="text-[11px] font-body text-[#737373] leading-tight">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Parking Clarification Notice */}
        <div className="max-w-xl mx-auto p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] text-center text-xs font-sans text-[#666666]">
          <span className="font-semibold text-[#171717]">Dedicated Parking:</span> {HOTEL_INFO.parkingNote}. Luggage assistance gladly provided upon arrival.
        </div>

      </div>
    </section>
  );
};
