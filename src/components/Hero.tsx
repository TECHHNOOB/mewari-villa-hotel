import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Home, IndianRupee, Users, Search } from 'lucide-react';
import { REAL_HOTEL_IMAGES } from '../data/hotelData';

interface HeroProps {
  onOpenEnquiry: () => void;
  onExploreVilla: () => void;
}

const HERO_SLIDES = [
  {
    id: 'suite',
    url: REAL_HOTEL_IMAGES.villaSuiteMain,
    tag: 'Villa Suite Lake View',
    title: 'Waterfront Arched Balconies',
    subtitle: 'Direct panoramic vistas of Lake Pichola & historic City Palace',
    badge: 'Flagship Suite',
    alt: 'Mewari Villa Suite overlooking Lake Pichola Udaipur',
  },
  {
    id: 'rooftop',
    url: REAL_HOTEL_IMAGES.lakeViewRooftop,
    tag: 'Rooftop Vantage',
    title: 'Unobstructed Lake Pichola Views',
    subtitle: 'Gentle lake breezes and 360° Aravalli hill silhouettes',
    badge: 'Sunset Terrace',
    alt: 'Lake Pichola Panoramic Views from Mewari Villa Rooftop',
  },
  {
    id: 'exterior',
    url: REAL_HOTEL_IMAGES.heroExterior,
    tag: 'Heritage Sanctuary',
    title: 'Royal Mewari Architecture',
    subtitle: 'Hand-carved sandstone arches & authentic Rajasthani courtyards',
    badge: 'Purohit Ka Khurra',
    alt: 'Mewari Villa Hotel exterior entrance Udaipur',
  },
  {
    id: 'dining',
    url: REAL_HOTEL_IMAGES.jalsaLakeSunset,
    tag: 'Jalsa Rooftop',
    title: 'Twilight Dinners Over The Lake',
    subtitle: '100% pure vegetarian culinary excellence under starlit skies',
    badge: 'Pure Veg Dining',
    alt: 'Sunset over Lake Pichola from Jalsa Rooftop Restaurant',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry, onExploreVilla }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance every 6.5 seconds unless user is hovering
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero-section" className="relative pt-24 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Typography, CTAs & Interactive Slide Selectors */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            {/* Brand Eyebrow with Crest */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-3 mb-4"
            >
              {/* <img
                src="/mewari-villa-emblem.png"
                alt="Hotel Mewari Villa Emblem"
                className="h-8 w-auto object-contain"
              /> */}
              {/* <span className="h-px w-6 bg-[#C59B51]" /> */}
              <span className="font-serif text-xs tracking-[0.22em] text-[#C59B51] uppercase font-semibold">
                A Royal Heritage Sanctuary · Udaipur
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-5"
            >
              <h2 className="font-serif text-3xl sm:text-4xl text-[#383838] font-light leading-tight">
                Discover Extraordinary
              </h2>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#171717] leading-[1.08] mt-1">
                Luxury Living
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-sm sm:text-base text-[#666666] leading-relaxed max-w-lg mb-7"
            >
              Explore curated collections of the city's most exclusive lakeside suites, authentic royal architecture, and tranquil rooftop dining overlooking Lake Pichola.
            </motion.p>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 mb-8"
            >
              <button
                id="hero-primary-enquiry-cta"
                onClick={onOpenEnquiry}
                className="inline-flex items-center space-x-3 px-6 py-3.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <span>Schedule a Private Stay</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-secondary-explore-cta"
                onClick={onExploreVilla}
                className="px-6 py-3.5 border border-[#D5CABE] text-[#171717] hover:bg-[#FAF8F5] text-xs uppercase tracking-[0.16em] font-sans font-medium rounded-lg transition-all duration-300"
              >
                Explore Suites
              </button>
            </motion.div>

            {/* 4 Interactive Thumbnail Selectors (Starting website slider revived & elevated) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-5 border-t border-[#EAE4D9]"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8C8C8C] font-semibold">
                  Featured Highlights (0{currentSlide + 1} / 0{HERO_SLIDES.length})
                </span>
                <span className="text-xs font-serif text-[#C59B51]">
                  {activeSlide.tag}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative rounded-xl overflow-hidden aspect-[16/10] border-2 transition-all duration-300 text-left group ${isActive
                        ? 'border-[#C59B51] shadow-md ring-2 ring-[#C59B51]/30 scale-[1.02]'
                        : 'border-transparent opacity-65 hover:opacity-100 hover:border-[#D5CABE]'
                        }`}
                    >
                      <img
                        src={slide.url}
                        alt={slide.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-1 left-1.5 right-1.5 text-white">
                        <span className="text-[9px] font-sans font-medium truncate block leading-tight">
                          {slide.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Visual Showcase Slider */}
          <div
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#EAE4D9]/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] bg-[#FAF8F5]"
            >
              {/* Smooth Animated Slide Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeSlide.url}
                    alt={activeSlide.alt}
                    className="w-full h-full object-cover object-center"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Top Navigation Pill Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/40 shadow-md flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[#171717]">
                    {activeSlide.badge}
                  </span>
                </div>

                <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-[10px] font-sans font-semibold tracking-wider">
                  0{currentSlide + 1} / 0{HERO_SLIDES.length}
                </div>
              </div>

              {/* On-Image Slider Arrow Navigation Controls */}
              <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-[#C59B51] text-[#171717] hover:text-white border border-white/40 shadow-lg flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-xs active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-[#C59B51] text-[#171717] hover:text-white border border-white/40 shadow-lg flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-xs active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Floating Information Card */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#EAE4D9] shadow-xl flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-0.5">
                      <span className="w-3 h-px bg-[#C59B51]" />
                      <p className="text-[10px] font-sans uppercase tracking-wider text-[#C59B51] font-semibold">
                        {activeSlide.tag}
                      </p>
                    </div>
                    <h3 className="text-sm sm:text-base font-serif font-medium text-[#171717] leading-snug">
                      {activeSlide.title}
                    </h3>
                    <p className="text-[11px] font-body text-[#666666] hidden sm:block mt-0.5">
                      {activeSlide.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={onOpenEnquiry}
                      className="px-3.5 py-2 bg-[#C59B51] hover:bg-[#B3873E] text-white text-[10px] uppercase tracking-wider font-sans font-semibold rounded-lg transition-colors shadow-xs"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Press / Trust Bar */}
        <div className="mt-14 pt-8 border-t border-[#EAE4D9]">
          <p className="text-center text-[10px] uppercase tracking-[0.24em] font-sans text-[#8C8C8C] mb-5">
            Trusted by discerning travellers worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-serif text-lg tracking-widest text-[#525252] font-semibold">Forbes</span>
            <span className="font-serif text-lg tracking-widest text-[#525252] font-semibold">RobbReport</span>
            <span className="font-serif text-lg tracking-widest text-[#525252] font-semibold">MANSION GLOBAL</span>
            <span className="font-serif text-base tracking-widest text-[#525252] font-medium">Condé Nast Traveller</span>
            <span className="font-serif text-lg tracking-widest text-[#525252] font-semibold">TripAdvisor</span>
          </div>
        </div>

        {/* Floating Property Search / Filter Bar (Luxora Signature) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-[#EAE4D9]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">

            {/* Location */}
            <div className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-sans text-[#8C8C8C]">Location</span>
                <span className="text-xs font-sans font-semibold text-[#171717]">Lake Pichola, Udaipur</span>
              </div>
            </div>

            {/* Suite Type */}
            <div className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51]">
                <Home className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-sans text-[#8C8C8C]">Suite Category</span>
                <span className="text-xs font-sans font-semibold text-[#171717]">All Luxury Suites</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51]">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-sans text-[#8C8C8C]">Tariff Range</span>
                <span className="text-xs font-sans font-semibold text-[#171717]">₹3,500 – ₹10,000+</span>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51]">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-sans text-[#8C8C8C]">Occupancy</span>
                <span className="text-xs font-sans font-semibold text-[#171717]">1–5 Guests / Room</span>
              </div>
            </div>

            {/* Action Button */}
            <div>
              <button
                onClick={onOpenEnquiry}
                className="w-full h-full py-3.5 px-5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-[0.14em] font-sans font-semibold rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Check Availability</span>
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
