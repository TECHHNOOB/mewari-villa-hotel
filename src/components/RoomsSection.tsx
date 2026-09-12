import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Heart, Bed, Bath, Maximize, Eye } from 'lucide-react';
import { ROOMS } from '../data/hotelData';
import { Room } from '../types';
import { RoomModal } from './RoomModal';

interface RoomsSectionProps {
  onEnquireRoom: (roomName: string) => void;
  onViewRoomPage?: (roomId: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onEnquireRoom, onViewRoomPage }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const badges: { [key: string]: string } = {
    'villa-suite-lake-view': 'FLAGSHIP SUITE',
    'super-deluxe-lake-view': 'LAKE VIEW',
    'super-deluxe-triple-sharing': 'FAMILY HERITAGE',
    'deluxe-non-lake-view': 'HERITAGE CHARM',
  };

  return (
    <section id="stay" className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2.5 mb-2.5">
              <span className="w-5 h-px bg-[#C59B51]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
                Curated Accommodations
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717]">
              Featured Suites &amp; Rooms
            </h2>
          </div>

          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => onEnquireRoom('Any Room')}
              className="inline-flex items-center space-x-1.5 text-xs font-sans uppercase tracking-[0.14em] text-[#666666] hover:text-[#C59B51] transition-colors font-medium group"
            >
              <span>View All Suites</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid - Luxora Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOMS.map((room) => {
            const isFav = favorites[room.id] || false;
            return (
              <div
                key={room.id}
                onClick={() => (onViewRoomPage ? onViewRoomPage(room.id) : setSelectedRoom(room))}
                className="group cursor-pointer bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D5CABE] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Badge & Heart */}
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F0ECE1]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge top-left */}
                    <div className="absolute top-3.5 left-3.5 bg-[#C59B51] text-white text-[9px] uppercase tracking-widest font-sans font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {badges[room.id] || 'EXCLUSIVE'}
                    </div>

                    {/* Favorite Heart top-right */}
                    <button
                      onClick={(e) => toggleFavorite(room.id, e)}
                      aria-label="Save to favorites"
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#404040] hover:text-rose-500 transition-colors shadow-xs"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          isFav ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <h3 className="font-serif text-lg font-medium text-[#171717] group-hover:text-[#C59B51] transition-colors leading-snug">
                        {room.name}
                      </h3>
                      <span className="text-[11px] text-[#C59B51] font-sans font-medium group-hover:underline">
                        View Page →
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[11px] font-sans text-[#737373] flex items-center">
                        Lake Pichola, Udaipur
                      </p>
                      <div className="text-right">
                        <span className="font-serif text-base font-bold text-[#171717]">
                          {room.startingPrice}
                        </span>
                        <span className="text-[10px] font-sans text-[#737373] ml-1">/ night</span>
                      </div>
                    </div>

                    {/* Specs / Amenities Mini Row */}
                    <div className="pt-3 border-t border-[#F0ECE1] grid grid-cols-3 gap-2 text-[#666666] text-[11px] font-sans">
                      <div className="flex items-center space-x-1">
                        <Bed className="w-3.5 h-3.5 text-[#C59B51]" />
                        <span className="truncate">{room.id.includes('triple') ? '3 Beds' : 'King'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath className="w-3.5 h-3.5 text-[#C59B51]" />
                        <span>Ensuite</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Maximize className="w-3.5 h-3.5 text-[#C59B51]" />
                        <span>{room.size}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnquireRoom(room.name);
                    }}
                    className="flex-1 py-2.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-[11px] uppercase tracking-wider font-sans font-semibold rounded-lg transition-colors text-center"
                  >
                    Reserve
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onViewRoomPage) {
                        onViewRoomPage(room.id);
                      } else {
                        setSelectedRoom(room);
                      }
                    }}
                    className="p-2.5 border border-[#EAE4D9] hover:border-[#C59B51] hover:bg-[#FAF8F5] text-[#171717] rounded-lg transition-colors flex items-center justify-center"
                    title="View single room page"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Indicator */}
        <div className="mt-10 flex items-center justify-center space-x-2">
          <div className="w-6 h-1 bg-[#C59B51] rounded-full" />
          <div className="w-2 h-1 bg-[#D8CEBE] rounded-full" />
          <div className="w-2 h-1 bg-[#D8CEBE] rounded-full" />
        </div>

      </div>

      {/* Modal */}
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
