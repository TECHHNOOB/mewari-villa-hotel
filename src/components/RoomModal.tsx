import React, { useState, useEffect } from 'react';
import { X, Users, Bed, Maximize2, Check, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { Room } from '../types';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onEnquire: (roomName: string) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onEnquire }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [room, onClose]);

  if (!room) return null;

  return (
    <div
      id="room-details-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="room-details-modal-content"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-[#171717] shadow-2xl rounded-2xl border border-[#EAE4D9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 hover:bg-white text-[#171717] transition-colors border border-[#EAE4D9] rounded-full flex items-center justify-center shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image Showcase */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#FAF8F5]">
          <img
            src={room.gallery[activeImageIndex] || room.image}
            alt={`${room.name} interior at Mewari Villa Hotel Udaipur`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Room Name Banner on Image */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C59B51] font-sans font-semibold">
                {room.view}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {room.name}
              </h3>
            </div>
            <div className="text-xs text-white/80 font-sans tracking-wider uppercase">
              {room.size}
            </div>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {room.gallery.length > 1 && (
          <div className="flex gap-2 p-3 bg-[#FAF8F5] border-b border-[#EAE4D9] overflow-x-auto">
            {room.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-[#C59B51] scale-100' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${room.name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tagline & Key Specs Bar */}
          <div>
            <p className="font-serif italic text-base text-[#666666] mb-4">
              &ldquo;{room.tagline}&rdquo;
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-[#EAE4D9] text-xs font-sans">
              <div className="flex items-center space-x-2 text-[#525252]">
                <Users className="w-4 h-4 text-[#C59B51]" />
                <span>{room.occupancy}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#525252]">
                <Bed className="w-4 h-4 text-[#C59B51]" />
                <span className="truncate">{room.bedType}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#525252]">
                <Maximize2 className="w-4 h-4 text-[#C59B51]" />
                <span>{room.size}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#525252]">
                <ShieldCheck className="w-4 h-4 text-[#C59B51]" />
                <span>Verified Facility</span>
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-sans font-semibold text-[#171717] mb-2">
              Suite Description
            </h4>
            <p className="text-xs sm:text-sm font-body text-[#666666] leading-relaxed">
              {room.fullDetails}
            </p>
          </div>

          {/* Highlights */}
          {room.highlights && room.highlights.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-wider font-sans font-semibold text-[#171717] mb-3">
                Key Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {room.highlights.map((hl) => (
                  <div key={hl} className="flex items-center space-x-2 text-xs text-[#525252]">
                    <div className="w-4 h-4 rounded-full bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51]">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Room Amenities */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-sans font-semibold text-[#171717] mb-3">
              Included Amenities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {room.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#EAE4D9] rounded-md text-[11px] font-sans text-[#525252]"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing and CTAs */}
          <div className="pt-4 border-t border-[#EAE4D9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#737373] block">Tariff Starting From</span>
              <div className="flex items-baseline space-x-1">
                <span className="font-serif text-2xl font-bold text-[#171717]">{room.startingPrice}</span>
                <span className="text-xs text-[#737373] font-sans">/ night + taxes</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => onEnquire(room.name)}
                className="flex-1 sm:flex-none px-6 py-3 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>Reserve This Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
