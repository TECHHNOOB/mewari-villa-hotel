import React, { useState } from 'react';
import { ArrowUpRight, Bed, Users } from 'lucide-react';
import { ROOMS } from '../data/hotelData';
import { Room } from '../types';
import { RoomModal } from './RoomModal';

interface RoomsSectionProps {
  onEnquireRoom: (roomName: string) => void;
  onViewRoomPage?: (roomId: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onEnquireRoom, onViewRoomPage }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Map room IDs to benchmark luxury labels matching reference design
  const getRoomDisplayName = (room: Room) => {
    switch (room.id) {
      case 'deluxe-non-lake-view':
        return 'Deluxe Room';
      case 'super-deluxe-lake-view':
        return 'Premier Room';
      case 'super-deluxe-triple-sharing':
        return 'Executive Suite';
      case 'villa-suite-lake-view':
        return 'Signature Suite';
      default:
        return room.name;
    }
  };

  const getRoomBedLabel = (room: Room) => {
    if (room.id.includes('triple')) return '2 Beds';
    return '1 Bed';
  };

  const getRoomPersonLabel = (room: Room) => {
    if (room.id.includes('triple')) return '4 Person';
    return '2 Person';
  };

  const handleCardClick = (room: Room) => {
    if (onViewRoomPage) {
      onViewRoomPage(room.id);
    } else {
      setSelectedRoom(room);
    }
  };

  return (
    <section id="stay" className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header: Matches Orrivaa Benchmark */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                Featured Spaces
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
            </div>

            {/* Headline with Signature Editorial Italic */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-[1.1]">
              Designed Spaces for
              <span className="block sm:inline sm:ml-3 font-editorial-italic font-normal text-[#9E763B]">
                Refined Stays
              </span>
            </h2>
          </div>

          {/* Right: Subtitle Description + Pill Button */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 lg:max-w-lg">
            <p className="font-body text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Well-designed spaces that combine comfort, royal Mewari elegance, and a peaceful setting to support rest and relaxation throughout your stay.
            </p>

            {/* <button
              id="rooms-explore-spaces-btn"
              onClick={() => onEnquireRoom('Any Room')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 group"
            >
              <span>Explore Spaces</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button> */}
          </div>
        </div>

        {/* 4 Cards in 2x2 Grid (Exact Orrivaa Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {ROOMS.map((room) => {
            const displayName = getRoomDisplayName(room);
            const bedLabel = getRoomBedLabel(room);
            const personLabel = getRoomPersonLabel(room);

            return (
              <div
                key={room.id}
                onClick={() => handleCardClick(room)}
                className="group cursor-pointer flex flex-col space-y-4"
              >
                {/* Image Container with Rounded Corners & Floating Price Pill */}
                <div className="relative aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#E8E2D9] shadow-sm border border-[#E8E2D9]">
                  <img
                    src={room.image}
                    alt={`${displayName} at Hotel Mewari Villa`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient bottom shadow for badge contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Floating Price Pill (Bottom-Right, exactly as in Orrivaa design) */}
                  <div className="absolute bottom-4 right-4 bg-black/65 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-white shadow-md">
                    <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-wide">
                      {room.startingPrice}
                    </span>
                    <span className="text-[10px] font-sans text-white/80 ml-1">/Night</span>
                  </div>
                </div>

                {/* Card Meta & Title Underneath (Clean, uncluttered, pure luxury) */}
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1917] group-hover:text-[#9E763B] transition-colors">
                      {displayName}
                    </h3>
                    <p className="text-[11px] font-sans text-[#78716C] mt-0.5">
                      {room.name} · {room.view.includes('Lake') ? 'Lake Pichola Vista' : 'Courtyard Sanctuary'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-sans text-[#78716C]">
                    <div className="flex items-center space-x-1">
                      <Bed className="w-3.5 h-3.5 text-[#9E763B]" />
                      <span>{bedLabel}</span>
                    </div>
                    <span className="text-[#D4CEBF]">·</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-[#9E763B]" />
                      <span>{personLabel}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal Fallback */}
      {selectedRoom && (
        <RoomModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onEnquire={(roomName) => {
            setSelectedRoom(null);
            onEnquireRoom(roomName);
          }}
        />
      )}
    </section>
  );
};
