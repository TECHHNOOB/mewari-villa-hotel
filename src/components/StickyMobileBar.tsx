import React from 'react';
import { MessageSquare, CalendarCheck } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface StickyMobileBarProps {
  onOpenEnquiry: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenEnquiry }) => {
  return (
    <div
      id="sticky-mobile-bottom-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE4D9] px-4 py-3 flex items-center justify-between shadow-lg"
    >
      {/* Starting Rate */}
      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-wider text-[#737373] font-sans">
          Lake Pichola Stays
        </span>
        <span className="text-xs font-serif text-[#171717]">
          From <strong className="text-[#C59B51] font-bold">₹3,500</strong>/night
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-2">
        <a
          href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Mewari Villa Hotel, I would like to inquire about room availability.')}`}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-sticky-whatsapp"
          className="py-2 px-3 bg-[#FAF8F5] border border-[#EAE4D9] text-[#25D366] text-xs font-sans font-medium rounded-lg flex items-center space-x-1.5 active:scale-95 transition-transform"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenEnquiry}
          id="mobile-sticky-enquire-now"
          className="py-2 px-4 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg flex items-center space-x-1.5 active:scale-95 transition-transform shadow-xs"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};
