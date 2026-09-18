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
  Camera,
  Share2,
  Heart,
  Star,
  Compass,
  Utensils,
  CheckCircle2,
} from 'lucide-react';
import { Room } from '../types';
import { ROOMS, HOTEL_INFO } from '../data/hotelData';
import { sendBookingInquiry } from '../services/inquiryService';

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
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form State
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState('2 Guests');
  const [guestMessage, setGuestMessage] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Scroll to top when room changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setFormSubmitted(false);
  }, [roomId]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  const otherRooms = ROOMS.filter((r) => r.id !== room.id);

  const badges: { [key: string]: string } = {
    'villa-suite-lake-view': 'FLAGSHIP SUITE · LAKE PICHOLA',
    'super-deluxe-lake-view': 'HERITAGE LAKE VIEW',
    'super-deluxe-triple-sharing': 'SPACIOUS FAMILY RETREAT',
    'deluxe-non-lake-view': 'TRANQUIL HERITAGE CHARM',
  };

  // Strictly show only photos belonging to this specific room (no other hotel photos)
  const allPhotos: string[] = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  const primaryHeroPhoto = allPhotos[0] || room.image;
  const topLandscapePhoto = allPhotos[1] || allPhotos[0];
  const bottomLeftPhoto = allPhotos[2] || allPhotos[1] || allPhotos[0];
  const bottomRightPhoto = allPhotos[3] || allPhotos[allPhotos.length - 1];

  const handlePrevPhoto = () => {
    setActiveImageIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const handleNextPhoto = () => {
    setActiveImageIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation, deletion, tab, and copy/paste shortcuts
    if (
      ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key) ||
      (e.ctrlKey || e.metaKey)
    ) {
      return;
    }
    // Block any non-digit character (strictly 0-9 only)
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip out all non-digits and cap strictly at 10 digits
    const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setGuestPhone(numericOnly);
    setFormError('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || guestName.trim().length < 2) {
      setFormError('Please enter your full name (at least 2 characters).');
      return;
    }
    const phoneDigits = guestPhone.replace(/\D/g, '');
    if (!phoneDigits) {
      setFormError('Please enter your 10-digit mobile number (numbers only).');
      return;
    }
    if (phoneDigits.length !== 10) {
      setFormError('Please enter a valid 10-digit mobile number (exactly 10 digits required).');
      return;
    }
    if (guestEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    await sendBookingInquiry({
      source: `Single Room Page (${room.name})`,
      guestName: guestName,
      guestPhone: `+91 ${guestPhone}`,
      guestEmail: guestEmail,
      roomPreference: room.name,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guestCount: guestCount,
      specialRequests: guestMessage,
      enquiryType: 'Suite Reservation',
    });

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  const generateDirectWhatsAppUrl = () => {
    const text = `Hello Mewari Villa Hotel,
I would like to enquire about reserving the ${room.name} (${room.startingPrice}/night).
Dates: ${checkInDate || 'Flexible'} to ${checkOutDate || 'Flexible'}
Guests: ${guestCount}
Please let me know room availability and best direct booking tariff.`;

    return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-24 pb-24 bg-white text-[#171717] min-h-screen selection:bg-[#C59B51]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Breadcrumbs (Exact reference style: Buy > Lagos Villas > ...) */}
        <div className="flex items-center justify-between py-3 mb-4 text-xs font-sans text-[#737373]">
          <div className="flex items-center space-x-2 overflow-hidden truncate">
            <button
              onClick={onBack}
              className="hover:text-[#C59B51] transition-colors flex items-center shrink-0"
            >
              <span>Hotel Mewari Villa</span>
            </button>
            <span>&gt;</span>
            <button
              onClick={onBack}
              className="hover:text-[#C59B51] transition-colors shrink-0"
            >
              <span>Accommodations</span>
            </button>
            <span>&gt;</span>
            <span className="shrink-0">Lake Pichola Heritage</span>
            <span>&gt;</span>
            <span className="text-[#171717] font-medium truncate">{room.name}</span>
          </div>

          <button
            onClick={onBack}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 border border-[#EAE4D9] hover:border-[#C59B51] text-xs font-sans font-medium rounded-lg transition-colors text-[#525252] hover:text-[#171717] shrink-0 ml-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Rooms</span>
          </button>
        </div>

        {/* 2. Photo Gallery Showcase (Exact arrangement requested by user) */}
        {/* Left: 1 large hero image | Right: 1 top wide + 2 bottom split with "See all X photos" pill */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 mb-8">

          {/* LEFT: 1 Large Hero Image (7 cols out of 12) */}
          <div
            onClick={() => {
              setActiveImageIndex(0);
              setLightboxOpen(true);
            }}
            className="lg:col-span-7 relative h-[320px] sm:h-[420px] md:h-[480px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group shadow-xs border border-[#EAE4D9] bg-[#FAF8F5]"
          >
            <img
              src={primaryHeroPhoto}
              alt={`${room.name} master suite photograph`}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Room category badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[#171717] text-[10px] font-sans font-semibold uppercase tracking-wider rounded-lg shadow-sm border border-white/40">
                {badges[room.id] || 'HERITAGE COLLECTION'}
              </span>
            </div>
          </div>

          {/* RIGHT: 3 Images (1 Top Landscape + 2 Bottom Split) (5 cols out of 12) */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-3.5 h-[320px] sm:h-[420px] md:h-[480px] lg:h-[500px]">

            {/* Top Wide Image */}
            <div
              onClick={() => {
                setActiveImageIndex(1);
                setLightboxOpen(true);
              }}
              className="relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group shadow-xs border border-[#EAE4D9] bg-[#FAF8F5]"
            >
              <img
                src={topLandscapePhoto}
                alt={`${room.name} interior perspective`}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom Row: 2 Split Images */}
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5 flex-1">

              {/* Bottom Left Image */}
              <div
                onClick={() => {
                  setActiveImageIndex(2);
                  setLightboxOpen(true);
                }}
                className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group shadow-xs border border-[#EAE4D9] bg-[#FAF8F5]"
              >
                <img
                  src={bottomLeftPhoto}
                  alt={`${room.name} details & bathroom`}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Bottom Right Image with "See all X photos" pill button */}
              <div
                onClick={() => {
                  setActiveImageIndex(3);
                  setLightboxOpen(true);
                }}
                className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group shadow-xs border border-[#EAE4D9] bg-[#FAF8F5]"
              >
                <img
                  src={bottomRightPhoto}
                  alt={`${room.name} hotel courtyard & balcony`}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Overlaid "See all X photos" Pill Button matching reference */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(0);
                    setLightboxOpen(true);
                  }}
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-[11px] sm:text-xs font-sans font-medium rounded-lg border border-white/25 shadow-lg transition-all active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>See all {allPhotos.length} photos</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* 3. Main Split Content (Left 7-8 cols details | Right 4-5 cols sticky booking & host) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">

          {/* LEFT COLUMN: Title, Narrative, Specs, Features & Policies (8 cols) */}
          <div className="lg:col-span-8 space-y-8">

            {/* Room Header with Share & Save Actions */}
            <div className="pb-6 border-b border-[#EAE4D9]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#171717] leading-tight">
                    {room.name}
                  </h1>
                  <div className="flex items-center text-xs text-[#666666] font-sans mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B51] mr-1.5 shrink-0" />
                    <span>Purohit Ka Khurra, Near Chandpole &amp; Lake Pichola, Udaipur, Rajasthan</span>
                  </div>
                </div>

                {/* Share & Save Buttons */}
                <div className="flex items-center space-x-2.5 shrink-0">
                  <button
                    onClick={handleShare}
                    className="relative inline-flex items-center space-x-1.5 px-3.5 py-1.5 border border-[#EAE4D9] hover:border-[#C59B51] rounded-lg text-xs font-sans text-[#404040] hover:text-[#C59B51] bg-white transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                    {copiedLink && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#171717] text-white text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap">
                        Link Copied!
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 border rounded-lg text-xs font-sans transition-colors ${isSaved
                        ? 'border-[#C59B51] text-[#C59B51] bg-[#FAF8F5]'
                        : 'border-[#EAE4D9] text-[#404040] hover:border-[#C59B51] hover:text-[#C59B51] bg-white'
                      }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#C59B51] text-[#C59B51]' : ''
                        }`}
                    />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>

              <p className="font-serif italic text-sm sm:text-base text-[#737373] mt-3">
                &ldquo;{room.tagline}&rdquo;
              </p>
            </div>

            {/* Description / Narrative Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-sm font-body text-[#525252] leading-relaxed">
              <p>{room.description}</p>
              <p>{room.fullDetails}</p>
              <p>
                Nestled along the tranquil waterfront street of Purohit Ka Khurra near Chandpole, Hotel Mewari Villa places you within walking distance to Gangaur Ghat, Bagore Ki Haveli, and City Palace while sheltering you in peaceful, heritage-inspired tranquility.
              </p>
            </div>

            {/* Room Specifications Grid (Exact layout from reference: Property Type, Year Built, Size, Bedrooms, Bathrooms, Price) */}
            <div className="bg-[#FAF8F5] border border-[#EAE4D9] rounded-2xl p-5 sm:p-6 shadow-2xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#737373] font-sans block mb-1">
                    Room Category
                  </span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-[#171717] block">
                    {room.name.includes('Suite') ? 'Royal Heritage Suite' : 'Deluxe Heritage Room'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#737373] font-sans block mb-1">
                    Heritage Style
                  </span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-[#171717] block">
                    Mewar Royal Architecture
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#737373] font-sans block mb-1">
                    Room Size
                  </span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-[#171717] block">
                    {room.size}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#737373] font-sans block mb-1">
                    Bedding
                  </span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-[#171717] block">
                    {room.bedType}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#737373] font-sans block mb-1">
                    Bathrooms
                  </span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-[#171717] block">
                    1 Luxury Marble Bath
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#737373] font-sans block mb-1">
                    Starting Tariff
                  </span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-[#C59B51] block">
                    {room.startingPrice} <span className="text-xs text-[#737373] font-normal">/ night</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Property Features / Amenities (2-column icon list like reference) */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#171717] mb-4">
                Property Features &amp; Amenities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <Compass className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    {room.view}
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <Utensils className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    Jalsa Rooftop Pure Veg Restaurant
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <Wifi className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    Complimentary High-Speed Wi-Fi
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <Wind className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    Climate Control Air Conditioning
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <Sparkles className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    En-suite Bathroom with Hot Water Rain Shower
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <Clock className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    24/7 Room Service &amp; Concierge Desk
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <Tv className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    Flat-Screen LED Entertainment TV
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <Coffee className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    In-Room Electric Kettle &amp; Tea Amenities
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <ShieldCheck className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    In-Room Electronic Safe &amp; Wardrobe
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EAE4D9]">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B51] shrink-0" />
                  <span className="text-xs font-sans text-[#333333] font-medium">
                    Daily Royal Housekeeping &amp; Luggage Care
                  </span>
                </div>
              </div>
            </div>

            {/* Hotel Policies & Guest Guidelines */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9]">
              <h3 className="font-serif text-base font-medium text-[#171717] mb-2.5">
                Hotel Policies &amp; Guidelines
              </h3>
              <ul className="space-y-2 text-xs font-sans text-[#666666]">
                <li className="flex items-center space-x-2">
                  <span className="text-[#C59B51]">•</span>
                  <span><strong>Check-in:</strong> {HOTEL_INFO.checkIn} &nbsp;|&nbsp; <strong>Check-out:</strong> {HOTEL_INFO.checkOut}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#C59B51]">•</span>
                  <span><strong>100% Pure Vegetarian:</strong> Jalsa Restaurant on our rooftop serves strictly pure vegetarian food.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#C59B51]">•</span>
                  <span><strong>Parking:</strong> {HOTEL_INFO.parkingNote}. Our team gladly assists with luggage transfer upon your arrival.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN: Concierge Host Card + Booking Form + Testimonial (4 cols, Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">

            {/* 1. Agent / Host Card (Exact reference style) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE4D9] shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Circular Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C59B51] flex items-center justify-center text-[#C59B51] font-serif font-bold text-sm shrink-0">
                  MV
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-[#171717]">
                    Hotel Mewari Villa
                  </h3>
                  <p className="text-[11px] font-sans text-[#737373]">
                    Heritage Hospitality Team
                  </p>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className="text-xs font-sans font-semibold text-[#171717]">4.9</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dark Pill Call Agent Button */}
              <a
                href={`tel:${HOTEL_INFO.primaryPhone}`}
                className="px-3.5 py-2 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs font-sans font-medium rounded-lg inline-flex items-center space-x-1.5 transition-colors shadow-xs shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#C59B51]" />
                <span>Call Hotel</span>
              </a>
            </div>

            {/* 2. Reservation / Contact Form Card (Exact reference style) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE4D9] shadow-md">
              <h3 className="font-serif text-base font-normal text-[#171717] mb-1">
                Reserve or Inquire
              </h3>
              <p className="text-xs text-[#737373] font-sans mb-4">
                Leave your details and our team will get back to you shortly.
              </p>

              {formSubmitted ? (
                <div className="p-5 bg-[#FAF8F5] border border-[#C59B51]/40 rounded-xl text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-10 h-10 text-[#C59B51] mx-auto" />
                  <h4 className="font-serif text-base font-semibold text-[#171717]">
                    Inquiry Sent Successfully!
                  </h4>
                  <p className="text-xs font-sans text-[#525252] leading-relaxed">
                    Your reservation details for <strong>{room.name}</strong> have been forwarded to our reservations team. We will review room availability and contact you shortly.
                  </p>
                  <div className="pt-2 space-y-2">
                    <a
                      href={generateDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-xs font-sans font-medium flex items-center justify-center space-x-2 transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Also Message on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-[11px] text-[#737373] hover:text-[#171717] underline font-medium pt-1 block mx-auto"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  {formError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans rounded-lg">
                      {formError}
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E0D9CC] rounded-lg text-xs font-sans text-[#171717] placeholder-[#999999] focus:outline-hidden focus:border-[#C59B51] transition-colors"
                    />
                  </div>

                  {/* Phone with Country Code (+91) */}
                  <div>
                    <div className="flex rounded-lg border border-[#E0D9CC] overflow-hidden focus-within:border-[#C59B51] transition-colors bg-white">
                      <div className="px-3 py-2.5 bg-[#FAF8F5] border-r border-[#E0D9CC] text-xs font-sans text-[#404040] flex items-center space-x-1 shrink-0 select-none">
                        <span>🇮🇳</span>
                        <span>+91</span>
                        <span className="text-[10px] text-[#737373]">∨</span>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={guestPhone}
                        onKeyDown={handlePhoneKeyDown}
                        onChange={handlePhoneChange}
                        required
                        className="w-full px-3.5 py-2.5 bg-white text-xs font-sans text-[#171717] placeholder-[#999999] focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-[#78716C] font-sans mt-1 block">
                      Numbers only · 10 digits
                    </span>
                  </div>

                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E0D9CC] rounded-lg text-xs font-sans text-[#171717] placeholder-[#999999] focus:outline-hidden focus:border-[#C59B51] transition-colors"
                    />
                  </div>

                  {/* Separate Dates: Check-in & Check-out */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#737373] font-sans font-semibold mb-1">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-[#E0D9CC] rounded-lg text-xs font-sans text-[#171717] focus:outline-hidden focus:border-[#C59B51] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#737373] font-sans font-semibold mb-1">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-[#E0D9CC] rounded-lg text-xs font-sans text-[#171717] focus:outline-hidden focus:border-[#C59B51] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Separate Guests / Occupancy Field */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#737373] font-sans font-semibold mb-1">
                      Guests / Occupancy
                    </label>
                    <div className="relative flex items-center">
                      <Users className="w-3.5 h-3.5 text-[#C59B51] absolute left-3 pointer-events-none" />
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full pl-9 pr-7 py-2.5 bg-white border border-[#E0D9CC] rounded-lg text-xs font-sans text-[#171717] focus:outline-hidden focus:border-[#C59B51] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="1 Guest">1 Guest (Solo)</option>
                        <option value="2 Guests">2 Guests (Standard)</option>
                        <option value="3 Guests">3 Guests (Triple)</option>
                        <option value="4 Guests">4 Guests (Family)</option>
                        <option value="5+ Guests">5+ Guests (Multiple Rooms)</option>
                      </select>
                      <span className="absolute right-3 pointer-events-none text-[#737373] text-[10px]">▼</span>
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="Your message or special requests"
                      rows={2}
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-[#E0D9CC] rounded-lg text-xs font-sans text-[#171717] placeholder-[#999999] focus:outline-hidden focus:border-[#C59B51] transition-colors resize-none"
                    />
                  </div>

                  {/* Terms Checkbox */}
                  <label className="flex items-start space-x-2 text-[11px] font-sans text-[#666666] cursor-pointer select-none pt-1">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded border-[#C59B51] text-[#C59B51] focus:ring-0"
                    />
                    <span>
                      I agree to be contacted by Mewari Villa via WhatsApp, phone, or email.
                    </span>
                  </label>

                  {/* Submit Button (Get in touch -> style from reference) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg shadow-sm transition-all text-center flex items-center justify-center space-x-2 active:scale-98 mt-2 disabled:opacity-75 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Get in touch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {/* WhatsApp Quick Chat */}
                  <a
                    href={generateDirectWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#25D366] text-[#171717] hover:text-white border border-[#EAE4D9] hover:border-[#25D366] text-xs font-sans font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366] group-hover:text-white" />
                    <span>Instant WhatsApp Chat</span>
                  </a>
                </form>
              )}
            </div>

            {/* 3. Review Snippet Card (Matching reference Lekki villa review pill) */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#EAE4D9] flex items-center justify-center text-[#171717] font-serif font-bold text-[10px]">
                    SK
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-semibold text-[#171717]">
                      Suman Khadka
                    </h4>
                    <p className="text-[10px] text-[#737373] font-sans">Verified Guest · 4 mos ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-amber-500 text-xs font-semibold font-sans">
                  <span>★</span>
                  <span>5.0</span>
                </div>
              </div>
              <p className="text-[11px] font-body text-[#525252] leading-relaxed italic">
                &ldquo;Spacious, clean rooms and friendly staff. The City Palace, Ambrai Ghat, and Bagore ki Haveli are at walking distance.&rdquo;
              </p>
            </div>

          </div>

        </div>

        {/* 4. Cross-Navigation: Other Suites at Mewari Villa */}
        <div className="pt-12 border-t border-[#EAE4D9]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#C59B51] font-semibold block mb-1">
                Heritage Collection
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#171717]">
                Other Suites &amp; Rooms at Mewari Villa
              </h3>
            </div>

            <button
              onClick={onBack}
              className="text-xs font-sans text-[#C59B51] hover:underline font-medium"
            >
              View Full Overview →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherRooms.map((r) => (
              <div
                key={r.id}
                onClick={() => onSelectRoom(r.id)}
                className="group cursor-pointer bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden shadow-2xs hover:shadow-lg hover:border-[#D5CABE] transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#171717] text-[10px] font-sans font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-2xs">
                    {r.startingPrice} <span className="font-normal text-[9px]">/ night</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-base font-medium text-[#171717] group-hover:text-[#C59B51] transition-colors mb-1">
                      {r.name}
                    </h4>
                    <p className="text-xs text-[#737373] font-sans line-clamp-1 mb-2">
                      {r.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#C59B51] font-medium font-sans">
                    <span>Explore Suite Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Fullscreen Lightbox Modal with Carousel Navigation */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn"
        >
          {/* Top Bar: Title & Close Button */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full pt-2">
            <div>
              <h3 className="font-serif text-base sm:text-lg font-medium text-white/90">
                {room.name}
              </h3>
              <p className="text-xs font-sans text-[#C59B51]">
                Photo {activeImageIndex + 1} of {allPhotos.length}
              </p>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close photo gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Viewport with Prev / Next Navigation */}
          <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4">
            <button
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:left-4 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-[#C59B51] text-white flex items-center justify-center transition-colors border border-white/20 shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={allPhotos[activeImageIndex]}
              alt={`${room.name} photo ${activeImageIndex + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
            />

            <button
              onClick={handleNextPhoto}
              className="absolute right-2 sm:right-4 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-[#C59B51] text-white flex items-center justify-center transition-colors border border-white/20 shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="max-w-4xl mx-auto w-full pb-2 overflow-x-auto flex items-center justify-center space-x-2.5">
            {allPhotos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 sm:w-20 aspect-[16/10] rounded-lg overflow-hidden shrink-0 border-2 transition-all ${activeImageIndex === idx
                    ? 'border-[#C59B51] scale-105'
                    : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
              >
                <img
                  src={photo}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
