import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const InfoBar: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E2D9]">

          {/* Check-In / Check-Out */}
          <div className="flex items-center space-x-4 py-4 sm:pr-8">
            <div className="w-9 h-9 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center flex-shrink-0 text-[#9E763B] shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9E763B] font-semibold mb-0.5">Check-In / Out</div>
              <div className="font-sans text-xs sm:text-sm text-[#1C1917] font-medium">
                {HOTEL_INFO.checkIn} / {HOTEL_INFO.checkOut}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4 py-4 sm:px-8">
            <div className="w-9 h-9 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center flex-shrink-0 text-[#9E763B] shadow-xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9E763B] font-semibold mb-0.5">Prime Location</div>
              <div className="font-sans text-xs sm:text-sm text-[#1C1917] font-medium">Purohit Ka Khurra, Lake Pichola</div>
            </div>
          </div>

          {/* Customer Support */}
          <div className="flex items-center space-x-4 py-4 sm:pl-8">
            <div className="w-9 h-9 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center flex-shrink-0 text-[#9E763B] shadow-xs">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9E763B] font-semibold mb-0.5">Concierge Support</div>
              <div className="font-sans text-xs sm:text-sm text-[#1C1917] font-medium">{HOTEL_INFO.primaryPhone}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
