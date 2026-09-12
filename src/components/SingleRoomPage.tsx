import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  Users,
  Maximize2,
  Eye,
  Check,
  Phone,
  MessageSquare,
  Calendar,
  ShieldCheck,
  Sparkles,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Clock,
  MapPin,
  Maximize,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Room } from '../types';
import { ROOMS, HOTEL_INFO, REAL_HOTEL_IMAGES } from '../data/hotelData';

interface SingleRoomPageProps {
  roomId: string;
  onBack: () => void;
  onSelectRoom: (roomId: string) => void;
  onOpenEnquiry: (roomName?: string) => void;
}

export const SingleRoomPage: React.FC<SingleRoomPageProps> = ({
  roomId,
  onBack,
  onSelectRoom,
  onOpenEnquiry,
}) => {
  const room = ROOMS.find((r) => r.id === roomId) || ROOMS[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState('2 Guests');

  // Scroll to top when room changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
  }, [roomId]);

  const otherRooms = ROOMS.filter((r) => r.id !== room.id);

  const badges: { [key: string]: string } = {
    'villa-suite-lake-view': 'FLAGSHIP SUITE · LAKE PICHOLA',
    'super-deluxe-lake-view': 'HERITAGE LAKE VIEW',
    'super-deluxe-triple-sharing': 'SPACIOUS FAMILY RETREAT',
    'deluxe-non-lake-view': 'TRANQUIL HERITAGE CHARM',
  };

  const generateWhatsAppBookingUrl = () => {
    const text = `Hello Mewari Villa Hotel,
I would like to inquire regarding reserving the ${room.name}.
Dates: ${checkInDate || 'Flexible'} to ${checkOutDate || 'Flexible'}
Guests: ${guestCount}
Tariff: ${room.startingPrice} per night

Please let me know room availability and reservation details.`;

    return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + room.gallery.length) % room.gallery.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % room.gallery.length);
  };

  return (
    <div className="pt-24 pb-24 bg-white text-[#171717] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* 1. Breadcrumbs & Back Navigation */}
        <div className="flex items-center justify-between py-4 mb-6 border-b border-[#EAE4D9]">
          <div className="flex items-center space-x-2 text-xs font-sans text-[#737373]">
            <button
              onClick={onBack}
              className="hover:text-[#C59B51] transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>All Accommodations</span>
            </button>
            <span>/</span>
            <span className="text-[#171717] font-medium">{room.name}</span>
          </div>

          <button
            onClick={onBack}
            className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 border border-[#EAE4D9] hover:border-[#C59B51] text-xs font-sans font-medium rounded-lg transition-colors text-[#525252] hover:text-[#171717]"
          >
            <span>← Back to Hotel Home</span>
          </button>
        </div>

        {/* 2. Room Title, Subtitle & Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-[#FAF8F5] border border-[#C59B51]/40 text-[#C59B51] text-[10px] font-sans font-semibold uppercase tracking-wider rounded-md">
                {badges[room.id] || 'ROYAL ACCOMMODATION'}
              </span>
              <span className="text-xs font-sans text-[#737373] flex items-center">
                <MapPin className="w-3.5 h-3.5 text-[#C59B51] mr-1" />
                {room.view}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717] leading-tight">
              {room.name}
            </h1>
            <p className="font-serif italic text-base sm:text-lg text-[#666666] mt-1.5">
              &ldquo;{room.tagline}&rdquo;
            </p>
          </div>

          <div className="md:text-right shrink-0">
            <span className="text-xs text-[#737373] font-sans uppercase tracking-wider block">
              Tariff Starting From
            </span>
            <div className="flex items-baseline md:justify-end space-x-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                {room.startingPrice}
              </span>
              <span className="text-xs text-[#737373] font-sans">/ night + taxes</span>
            </div>
            <p className="text-[11px] text-[#C59B51] font-sans font-medium mt-0.5">
              ✓ Direct Booking Guarantee · No Hidden Fees
            </p>
          </div>
        </div>

        {/* 3. Luxury Photo Showcase Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
          {/* Main Large Hero Image (8 cols) */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="md:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-[#EAE4D9] bg-[#FAF8F5]"
          >
            <img
              src={room.gallery[activeImageIndex] || room.image}
              alt={`${room.name} primary photograph`}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

            <button
              onClick={handlePrevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-[#C59B51] hover:text-white flex items-center justify-center text-[#171717] transition-colors shadow-md"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-[#C59B51] hover:text-white flex items-center justify-center text-[#171717] transition-colors shadow-md"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-sans px-3 py-1.5 rounded-lg flex items-center space-x-2">
              <Maximize2 className="w-3.5 h-3.5 text-[#C59B51]" />
              <span>Click to open full gallery ({activeImageIndex + 1}/{room.gallery.length})</span>
            </div>
          </div>

          {/* Right Thumbnails (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
            {room.gallery.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/9] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 shadow-xs ${
                  activeImageIndex === idx
                    ? 'border-[#C59B51] ring-2 ring-[#C59B51]/30'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${room.name} angle ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Key Room Specifications Bar */}
        <div className="bg-[#FAF8F5] border border-[#EAE4D9] rounded-2xl p-5 mb-12 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center divide-x divide-[#EAE4D9] divide-y-0">
            <div className="flex flex-col items-center p-2">
              <Maximize className="w-4 h-4 text-[#C59B51] mb-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-[#737373] font-sans">Room Size</span>
              <span className="font-serif text-sm font-semibold text-[#171717]">{room.size}</span>
            </div>

            <div className="flex flex-col items-center p-2">
              <Bed className="w-4 h-4 text-[#C59B51] mb-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-[#737373] font-sans">Bed Type</span>
              <span className="font-serif text-sm font-semibold text-[#171717] truncate max-w-[120px]">
                {room.bedType.split('+')[0]}
              </span>
            </div>

            <div className="flex flex-col items-center p-2">
              <Users className="w-4 h-4 text-[#C59B51] mb-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-[#737373] font-sans">Occupancy</span>
              <span className="font-serif text-sm font-semibold text-[#171717]">{room.occupancy}</span>
            </div>

            <div className="flex flex-col items-center p-2">
              <Eye className="w-4 h-4 text-[#C59B51] mb-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-[#737373] font-sans">View</span>
              <span className="font-serif text-sm font-semibold text-[#171717] truncate max-w-[120px]">
                {room.view}
              </span>
            </div>

            <div className="flex flex-col items-center p-2">
              <Clock className="w-4 h-4 text-[#C59B51] mb-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-[#737373] font-sans">Check-in</span>
              <span className="font-serif text-sm font-semibold text-[#171717]">{HOTEL_INFO.checkIn}</span>
            </div>

            <div className="flex flex-col items-center p-2">
              <ShieldCheck className="w-4 h-4 text-[#C59B51] mb-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-[#737373] font-sans">Hygiene</span>
              <span className="font-serif text-sm font-semibold text-[#171717]">100% Sanitized</span>
            </div>
          </div>
        </div>

        {/* 5. Main Split Section: Narrative & Amenities (8 cols) + Sticky Reservation Form (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">

          {/* Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-10">

            {/* Narrative */}
            <div>
              <div className="flex items-center space-x-2 mb-2.5">
                <span className="w-4 h-px bg-[#C59B51]" />
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#C59B51] font-semibold">
                  Suite Narrative
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] mb-4">
                About The {room.name}
              </h2>
              <div className="space-y-4 font-body text-sm text-[#525252] leading-relaxed">
                <p>{room.fullDetails}</p>
                <p>
                  Imbued with authentic Rajasthani heritage motifs, handcrafted woodwork, and traditional brass appointments, this accommodation reflects the regal traditions of Mewar. Nestled peacefully in Purohit Ka Khurra near Chandpole, guests enjoy total relaxation just moments from Udaipur’s iconic ghats and palaces.
                </p>
              </div>
            </div>

            {/* Highlights Grid */}
            <div>
              <h3 className="font-serif text-xl font-normal text-[#171717] mb-4">
                Signature Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] flex items-center space-x-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-white border border-[#C59B51] flex items-center justify-center text-[#C59B51] shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-sans font-medium text-[#171717]">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Amenities Grid */}
            <div>
              <h3 className="font-serif text-xl font-normal text-[#171717] mb-4">
                Included Suite Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="p-3 bg-white rounded-xl border border-[#EAE4D9] flex items-center space-x-2.5 shadow-2xs"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#C59B51]" />
                    <span className="text-xs font-sans text-[#404040]">{amenity}</span>
                  </div>
                ))}
                <div className="p-3 bg-white rounded-xl border border-[#EAE4D9] flex items-center space-x-2.5 shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-[#C59B51]" />
                  <span className="text-xs font-sans text-[#404040]">Hot Water Geyser</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#EAE4D9] flex items-center space-x-2.5 shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-[#C59B51]" />
                  <span className="text-xs font-sans text-[#404040]">Rooftop Dining Access</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#EAE4D9] flex items-center space-x-2.5 shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-[#C59B51]" />
                  <span className="text-xs font-sans text-[#404040]">Luggage Assistance</span>
                </div>
              </div>
            </div>

            {/* Stay Policies */}
            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9]">
              <h3 className="font-serif text-lg font-medium text-[#171717] mb-3">
                Hotel Policies &amp; Guest Guidelines
              </h3>
              <ul className="space-y-2 text-xs font-sans text-[#666666]">
                <li className="flex items-center space-x-2">
                  <span className="text-[#C59B51]">•</span>
                  <span><strong>Check-in:</strong> {HOTEL_INFO.checkIn} | <strong>Check-out:</strong> {HOTEL_INFO.checkOut}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#C59B51]">•</span>
                  <span><strong>Pure Vegetarian Dining:</strong> Jalsa Restaurant on the rooftop serves 100% pure vegetarian cuisine.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#C59B51]">•</span>
                  <span><strong>Parking:</strong> {HOTEL_INFO.parkingNote}. Our team assists gladly with luggage transfer upon arrival.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Sticky Booking & Inquiry Card (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE4D9] shadow-xl">
              <div className="flex items-baseline justify-between pb-4 border-b border-[#EAE4D9] mb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#737373] block font-sans">Starting Tariff</span>
                  <span className="font-serif text-3xl font-bold text-[#171717]">{room.startingPrice}</span>
                  <span className="text-xs text-[#737373] font-sans ml-1">/ night</span>
                </div>
                <span className="px-2.5 py-1 bg-[#FAF8F5] text-[#C59B51] text-[10px] font-sans font-bold uppercase tracking-wider rounded-md border border-[#EAE4D9]">
                  Best Rate
                </span>
              </div>

              {/* Booking Controls */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Guests / Occupancy
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51]"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Standard)</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="5 Guests">5 Guests (With Extra Bed)</option>
                  </select>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => onOpenEnquiry(room.name)}
                  className="w-full py-3.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-lg shadow-md transition-all active:scale-98 text-center flex items-center justify-center space-x-2"
                >
                  <span>Reserve {room.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={generateWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#FAF8F5] hover:bg-[#25D366] text-[#171717] hover:text-white border border-[#EAE4D9] hover:border-[#25D366] text-xs uppercase tracking-wider font-sans font-semibold rounded-lg transition-all text-center flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                  <span>WhatsApp Concierge</span>
                </a>

                <a
                  href={`tel:${HOTEL_INFO.primaryPhone}`}
                  className="w-full py-2.5 bg-white text-[#737373] hover:text-[#171717] text-xs font-sans flex items-center justify-center space-x-1.5 text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C59B51]" />
                  <span>Call {HOTEL_INFO.primaryPhone}</span>
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F0ECE1] text-[11px] font-sans text-[#737373] space-y-1">
                <p>✓ Instant inquiry confirmation with hotel desk</p>
                <p>✓ Best direct tariff guaranteed</p>
                <p>✓ Free cancellation options available</p>
              </div>
            </div>
          </div>

        </div>

        {/* 6. Explore Other Suites Section */}
        <div className="pt-12 border-t border-[#EAE4D9]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="w-4 h-px bg-[#C59B51]" />
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#C59B51] font-semibold">
                  Compare Accommodations
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717]">
                Other Suites at Mewari Villa
              </h2>
            </div>

            <button
              onClick={onBack}
              className="text-xs font-sans uppercase tracking-wider text-[#666666] hover:text-[#C59B51] font-semibold transition-colors"
            >
              View All Suites →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherRooms.map((otherRoom) => (
              <div
                key={otherRoom.id}
                onClick={() => onSelectRoom(otherRoom.id)}
                className="group cursor-pointer bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D5CABE] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF8F5]">
                    <img
                      src={otherRoom.image}
                      alt={otherRoom.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#C59B51] text-white text-[9px] uppercase tracking-widest font-sans font-bold px-2 py-0.5 rounded-md">
                      {badges[otherRoom.id] || 'HERITAGE'}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg font-medium text-[#171717] group-hover:text-[#C59B51] transition-colors leading-snug mb-1">
                      {otherRoom.name}
                    </h3>
                    <p className="text-xs font-sans text-[#737373] mb-3">{otherRoom.view}</p>

                    <div className="flex items-baseline justify-between pt-3 border-t border-[#F0ECE1]">
                      <span className="text-xs text-[#737373] font-sans">Starting from</span>
                      <span className="font-serif text-lg font-bold text-[#171717]">
                        {otherRoom.startingPrice} <span className="text-xs font-sans font-normal text-[#737373]">/ night</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRoom(otherRoom.id);
                    }}
                    className="w-full py-2.5 bg-[#FAF8F5] group-hover:bg-[#C59B51] group-hover:text-white text-[#171717] text-xs uppercase tracking-wider font-sans font-semibold rounded-lg border border-[#EAE4D9] group-hover:border-[#C59B51] transition-all text-center"
                  >
                    View Suite Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={room.gallery[activeImageIndex] || room.image}
              alt={room.name}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <span className="text-xs uppercase tracking-wider text-[#C59B51] font-sans">
                {room.name} · Photo {activeImageIndex + 1} of {room.gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
