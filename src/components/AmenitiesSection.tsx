import React from 'react';
import {
  UserCheck,
  Utensils,
  Car,
  Sun,
  Coffee,
  Wifi,
  Sparkles,
  Ship,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const AmenitiesSection: React.FC = () => {
  const facilities = [
    {
      id: 'staff',
      name: '24/7 Staff & Butler',
      icon: <UserCheck className="w-5 h-5 stroke-[1.4]" />,
    },
    {
      id: 'restaurant',
      name: 'Jalsa Rooftop Dining',
      icon: <Utensils className="w-5 h-5 stroke-[1.4]" />,
    },
    {
      id: 'parking',
      name: 'Dedicated Car Parking',
      icon: <Car className="w-5 h-5 stroke-[1.4]" />,
    },
    {
      id: 'sundeck',
      name: 'Lakefront Sun Deck',
      icon: <Sun className="w-5 h-5 stroke-[1.4]" />,
    },
    {
      id: 'courtyard',
      name: 'Heritage Lounge',
      icon: <Coffee className="w-5 h-5 stroke-[1.4]" />,
    },
    {
      id: 'wifi',
      name: 'High-Speed Wi-Fi',
      icon: <Wifi className="w-5 h-5 stroke-[1.4]" />,
    },
    {
      id: 'laundry',
      name: 'Valet & Laundry',
      icon: <Sparkles className="w-5 h-5 stroke-[1.4]" />,
    },
    {
      id: 'boat',
      name: 'Lake Pichola Cruises',
      icon: <Ship className="w-5 h-5 stroke-[1.4]" />,
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-white relative border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header: Minimalist Eyebrow & Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 mb-3 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
              Facilities Available to Guests
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917]">
            Thoughtfully Curated For Comfort
          </h2>
        </div>

        {/* Minimalist Outlined Icon Grid (Direct match to reference design) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-4 mb-12">
          {facilities.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center p-3 sm:p-2 group cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] group-hover:border-[#9E763B] group-hover:bg-[#FAF6F0] flex items-center justify-center text-[#9E763B] transition-all duration-300 mb-3 shadow-xs group-hover:shadow-sm group-hover:-translate-y-0.5">
                {item.icon}
              </div>
              <span className="text-xs font-sans text-[#44403C] group-hover:text-[#1C1917] font-medium transition-colors leading-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Discreet Parking & Arrival Notice */}
        <div className="max-w-xl mx-auto p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] text-center text-xs font-sans text-[#78716C]">
          <span className="font-semibold text-[#1C1917]">Dedicated Parking:</span> {HOTEL_INFO.parkingNote}. Valet luggage assistance provided gladly upon your arrival.
        </div>

      </div>
    </section>
  );
};
