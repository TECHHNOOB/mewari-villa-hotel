import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { REAL_HOTEL_IMAGES } from '../data/hotelData';

interface HeroProps {
  onOpenEnquiry: () => void;
  onExploreVilla: () => void;
}

const HERO_SLIDES = [
  {
    id: 'rooftop-sunset',
    url: REAL_HOTEL_IMAGES.jalsaLakeSunset,
    tag: 'Lake Pichola Rooftop',
    alt: 'Sunset over Lake Pichola from Mewari Villa Rooftop Udaipur',
  },
  {
    id: 'suite-lake',
    url: REAL_HOTEL_IMAGES.villaSuiteMain,
    tag: 'Villa Suite Lake View',
    alt: 'Mewari Villa Suite overlooking Lake Pichola Udaipur',
  },
  {
    id: 'panoramic-lake',
    url: REAL_HOTEL_IMAGES.lakeViewRooftop,
    tag: 'Panoramic Lakefront',
    alt: 'Direct Lake Pichola panoramic views from hotel terrace',
  },
  {
    id: 'heritage-courtyard',
    url: REAL_HOTEL_IMAGES.heroExterior,
    tag: 'Royal Heritage Architecture',
    alt: 'Mewari Villa Hotel heritage facade Udaipur',
  },
];

// Curated verified guest avatars for social proof badge
const GUEST_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
];

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry, onExploreVilla }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance hero slides every 7 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
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
    <section
      id="hero-section"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#141210]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Slideshow with Cinematic Fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <img
              src={activeSlide.url}
              alt={activeSlide.alt}
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
            />
            {/* Multi-tier luxury dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/50" />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Spacer for floating header */}
      <div className="h-28 sm:h-32 pointer-events-none" />

      {/* Main Center Content: Grand Editorial Headline */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto py-10 sm:py-16">
        <div className="max-w-4xl">

          {/* Editorial Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 mb-5 sm:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#DFC088]" />
            <span className="text-xs sm:text-[13px] tracking-[0.24em] font-sans uppercase text-[#DFC088] font-medium">
              Welcome to Mewari Villa · Udaipur
            </span>
          </motion.div>

          {/* Headline with Signature Editorial Italic Contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal text-white leading-[1.06] tracking-tight mb-8"
          >
            Relaxation Begins
            <span className="block font-editorial-italic font-normal text-[#E8CE9F] mt-1 sm:mt-2">
              With Refined Comfort
            </span>
          </motion.h1>

        </div>
      </div>

      {/* Bottom Row: Trust Social Proof + Subtext + CTA Pill */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full pb-10 sm:pb-14">
        <div className="pt-8 border-t border-white/15 flex flex-col lg:flex-row lg:items-end justify-between gap-8">

          {/* Left: Social Proof Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            {/* Overlapping Avatars */}
            <div className="flex -space-x-2.5 overflow-hidden">
              {GUEST_AVATARS.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt="Verified Hotel Guest"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white/30 object-cover"
                />
              ))}
            </div>

            {/* Stars & Rating Copy */}
            <div>
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#DFC088] text-[#DFC088]" />
                ))}
                <span className="text-white font-sans text-xs font-semibold ml-1.5">4.9</span>
              </div>
              <p className="text-xs font-sans text-white/75 tracking-wide">
                850+ Verified Guest Reviews
              </p>
            </div>
          </motion.div>

          {/* Right: Subtext & Action Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 lg:max-w-xl"
          >
            <p className="text-xs sm:text-sm font-body text-white/80 leading-relaxed">
              Unwind in a serene retreat designed for refined comfort and timeless elegance, where every detail is crafted to provide the perfect luxurious lakeside stay.
            </p>

            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                id="hero-explore-suites-cta"
                onClick={onExploreVilla}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 group"
              >
                <span>Explore Suites</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Minimalist Slide Navigation & Indicators */}
        <div className="mt-8 flex items-center justify-between text-white/60 text-xs font-sans">
          <div className="flex items-center space-x-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentSlide === idx ? 'w-8 bg-[#DFC088]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] tracking-wider uppercase text-white/70">
              0{currentSlide + 1} / 0{HERO_SLIDES.length} · {activeSlide.tag}
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
