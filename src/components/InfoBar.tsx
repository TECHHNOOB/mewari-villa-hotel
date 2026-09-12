import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const InfoBar: React.FC = () => {
  return (
    <div className="bg-white border-y border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#EAE4D9]">

          {/* Check-In / Check-Out */}
          <div className="flex items-center space-x-4 py-5 sm:pr-8">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-[#C59B51]" />
            </div>
            <div>
              <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C59B51] font-semibold mb-0.5">Check-In / Out</div>
              <div className="font-sans text-sm text-[#171717] font-medium">
                {HOTEL_INFO.checkIn} / {HOTEL_INFO.checkOut}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4 py-5 sm:px-8">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-[#C59B51]" />
            </div>
            <div>
              <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C59B51] font-semibold mb-0.5">Prime Location</div>
              <div className="font-sans text-sm text-[#171717] font-medium">Purohit Ka Khurra, Lake Pichola</div>
            </div>
          </div>

          {/* Customer Support */}
          <div className="flex items-center space-x-4 py-5 sm:pl-8">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-[#C59B51]" />
            </div>
            <div>
              <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C59B51] font-semibold mb-0.5">Concierge Support</div>
              <div className="font-sans text-sm text-[#171717] font-medium">{HOTEL_INFO.primaryPhone}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
