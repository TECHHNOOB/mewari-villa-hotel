import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, Eye } from 'lucide-react';
import { REAL_HOTEL_IMAGES } from '../data/hotelData';

interface SpacesShowcaseProps {
  onEnquire: (spaceName: string) => void;
}

interface SpaceItem {
  id: string;
  name: string;
  tabLabel: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
}

const SPACES: SpaceItem[] = [
  {
    id: 'rooftop-dining',
    name: 'Jalsa Rooftop Restaurant',
    tabLabel: 'Rooftop & Dining',
    subtitle: 'Pure Vegetarian Dining Above Lake Pichola',
    description:
      'Perched high above the old city quarters, Jalsa offers open-air starlit dining, authentic Rajasthani vegetarian recipes, and mesmerizing unobstructed views of Lake Pichola and the City Palace.',
    image: REAL_HOTEL_IMAGES.jalsaLakeSunset,
    highlights: ['100% Pure Vegetarian', 'Sunset Lake Panoramas', 'Candlelit Tables'],
  },
  {
    id: 'lake-terraces',
    name: 'Sunset Terraces & Deck',
    tabLabel: 'Lakefront Terraces',
    subtitle: 'Panoramic Aravalli & Waterfront Vistas',
    description:
      'Step out onto the open-air sun deck where gentle breezes from Lake Pichola create an oasis of calm. Ideal for quiet morning tea, reading, or watching wooden boats drift across the water.',
    image: REAL_HOTEL_IMAGES.lakeViewRooftop,
    highlights: ['360° Lake & Hill Vistas', 'Sunrise Serenity', 'Unobstructed Vantage'],
  },
  {
    id: 'heritage-courtyards',
    name: 'Historic Sandstone Courtyard',
    tabLabel: 'Heritage Courtyard',
    subtitle: 'Authentic Rajasthani Architecture & Arches',
    description:
      'Built with traditional Mewari sandstone masonry and hand-carved jali stone screens, our courtyard welcomes guests into centuries-old Rajasthani grandeur and peaceful shade.',
    image: REAL_HOTEL_IMAGES.heroExterior,
    highlights: ['Hand-Carved Stone Arches', 'Peaceful Old City Ambience', 'Traditional Jali Work'],
  },
  {
    id: 'villa-suites',
    name: 'Royal Villa Suites & Jharokhas',
    tabLabel: 'Guest Suites',
    subtitle: 'Intimate Luxury Overlooking Lake Waters',
    description:
      'Our signature suites feature handcrafted wooden appointments, plush king bedding, and ornate arched jharokha bay windows that frame the lake like a royal living canvas.',
    image: REAL_HOTEL_IMAGES.villaSuiteMain,
    highlights: ['Private Arched Jharokhas', 'Lake Pichola Views', 'En-Suite Luxury'],
  },
];

export const SpacesShowcase: React.FC<SpacesShowcaseProps> = ({ onEnquire }) => {
  const [activeTab, setActiveTab] = useState<string>(SPACES[0].id);

  const activeSpace = SPACES.find((s) => s.id === activeTab) || SPACES[0];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                Essential Spaces
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-[1.1]">
              Essential Spaces to
              <span className="block sm:inline sm:ml-3 font-editorial-italic font-normal text-[#9E763B]">
                Enjoy at Mewari Villa
              </span>
            </h2>
          </div>

          <p className="font-body text-xs sm:text-sm text-[#78716C] max-w-md leading-relaxed">
            Spaces designed to support rest, authentic dining, and panoramic lake tranquility throughout every moment of your stay.
          </p>
        </div>

        {/* Category Tabs (Matches reference design tabs) */}
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-[#E8E2D9]">
          {SPACES.map((space) => {
            const isActive = space.id === activeTab;
            return (
              <button
                key={space.id}
                onClick={() => setActiveTab(space.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#9E763B] text-white shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white'
                }`}
              >
                {space.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Showcase Banner Display */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E8E2D9] bg-[#1C1917] min-h-[460px] sm:min-h-[540px] flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpace.id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0"
            >
              <img
                src={activeSpace.image}
                alt={activeSpace.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Foreground Content Card */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-sans font-medium uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#DFC088]" />
              <span>{activeSpace.subtitle}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-3">
              {activeSpace.name}
            </h3>

            <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed mb-6 max-w-2xl">
              {activeSpace.description}
            </p>

            {/* Highlights Tag Pill Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {activeSpace.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-sans"
                >
                  ✓ {h}
                </span>
              ))}
            </div>

            {/* Action Pill */}
            <button
              onClick={() => onEnquire(activeSpace.name)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <span>Experience {activeSpace.tabLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
