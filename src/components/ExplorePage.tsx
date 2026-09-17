import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, MapPin, Compass, Clock, Navigation, Phone, Calendar, Sparkles } from 'lucide-react';
import { REAL_HOTEL_IMAGES, HOTEL_INFO, EXPERIENCES } from '../data/hotelData';

interface ExplorePageProps {
  onBack: () => void;
  onOpenEnquiry: (subject?: string) => void;
}

type FilterCategory = 'ALL' | 'WALKING DISTANCE' | 'ROYAL PALACES' | 'LAKES & GHATS' | 'CULTURE & BAZAARS';

interface HeritageSpot {
  id: string;
  name: string;
  category: 'ROYAL PALACES' | 'LAKES & GHATS' | 'CULTURE & BAZAARS';
  distance: string;
  duration: string;
  isWalking: boolean;
  image: string;
  description: string;
  highlights: string[];
}

const HERITAGE_SPOTS: HeritageSpot[] = [
  {
    id: 'city-palace',
    name: 'City Palace Complex',
    category: 'ROYAL PALACES',
    distance: '0.9 km from Mewari Villa',
    duration: '10 mins walk',
    isWalking: true,
    image: REAL_HOTEL_IMAGES.royalPalaceUdaipur,
    description:
      'The majestic crown jewel of Udaipur. Sprawling along the eastern banks of Lake Pichola, this monumental palace complex blends Rajasthani and Mughal architectural genius with opulent courtyards, marble balconies, and vintage museums.',
    highlights: ['Zenana Mahal & Mardana Mahal', 'Crystal Gallery & Vintage Car Museum', 'Panoramic views of Lake Pichola'],
  },
  {
    id: 'lake-pichola',
    name: 'Lake Pichola & Ghats',
    category: 'LAKES & GHATS',
    distance: '100m from Mewari Villa',
    duration: '2 mins walk',
    isWalking: true,
    image: REAL_HOTEL_IMAGES.lakeViewTwilight,
    description:
      'An iconic freshwater lake created in the 14th century, celebrated worldwide for its placid mirror-like waters, morning aarti ceremonies at Gangaur Ghat, and mesmerizing golden twilight.',
    highlights: ['Steps from hotel entrance', 'Sunset reflections & peaceful banks', 'Scenic photography vantage'],
  },
  {
    id: 'boat-ride',
    name: 'Lake Pichola Boat Charters',
    category: 'LAKES & GHATS',
    distance: '300m from Mewari Villa',
    duration: '4 mins walk',
    isWalking: true,
    image: REAL_HOTEL_IMAGES.lakeBoatRide,
    description:
      'Embark on traditional wooden boats and luxury cruises departing from nearby Chandpole and Gangaur Ghat. Glide past Jag Mandir Island Palace, the Lake Palace, and lakeside heritage havelis.',
    highlights: ['Jag Mandir Island Palace tour', 'Private sunset charters available', 'Concierge booking assistance'],
  },
  {
    id: 'old-bazaar',
    name: 'Old City Bazaars & Miniature Art',
    category: 'CULTURE & BAZAARS',
    distance: 'Purohit Ka Khurra / Chandpole',
    duration: 'Directly outside',
    isWalking: true,
    image: REAL_HOTEL_IMAGES.oldCityBazaar,
    description:
      'Vibrant winding lanes lined with generations-old ateliers crafting world-renowned Mewari miniature paintings, camel-leather footwear, hand-block prints, antique silver jewellery, and authentic spices.',
    highlights: ['Hathipole & Bada Bazaar close by', 'Centuries-old stone artisan workshops', 'Traditional Rajasthani street snacks'],
  },
  {
    id: 'bagore-ki-haveli',
    name: 'Bagore Ki Haveli & Museum',
    category: 'ROYAL PALACES',
    distance: '0.8 km from Mewari Villa',
    duration: '8 mins walk',
    isWalking: true,
    image: REAL_HOTEL_IMAGES.heritageArches,
    description:
      'An 18th-century noble mansion set right on the waterfront at Gangaur Ghat. Features over a hundred rooms with royal costumes, antique mirrors, and the world-famous Dharohar folk dance performance every evening.',
    highlights: ['Evening Dharohar folk dance show', 'Historic Mewari royal quarters', 'Waterfront puppet & music displays'],
  },
  {
    id: 'jagdish-temple',
    name: 'Jagdish Temple',
    category: 'CULTURE & BAZAARS',
    distance: '0.7 km from Mewari Villa',
    duration: '7 mins walk',
    isWalking: true,
    image: REAL_HOTEL_IMAGES.heritageFacade,
    description:
      'Constructed in 1651 AD by Maharana Jagat Singh, this three-storied Indo-Aryan temple is renowned for exquisite intricately carved sandstone pillars, ornate ceiling domes, and soulful daily prayer chants.',
    highlights: ['Intricate hand-carved stone friezes', 'Historic step-approach from old city', 'Active spiritual heritage'],
  },
  {
    id: 'monsoon-palace',
    name: 'Sajjangarh (Monsoon Palace)',
    category: 'ROYAL PALACES',
    distance: '8.5 km from Mewari Villa',
    duration: '20 mins drive',
    isWalking: false,
    image: REAL_HOTEL_IMAGES.lakeViewRooftop,
    description:
      'Perched high atop Bansdara mountain in the Aravalli range, Sajjangarh was built as an astronomical retreat and monsoon palace overlooking all of Udaipur and surrounding tiger sanctuaries.',
    highlights: ['Highest sunset point in Udaipur', '360° views across lakes and Aravalli hills', 'Easily reachable by private taxi'],
  },
  {
    id: 'fateh-sagar',
    name: 'Fateh Sagar Lake & Rani Road',
    category: 'LAKES & GHATS',
    distance: '3.2 km from Mewari Villa',
    duration: '10 mins drive',
    isWalking: false,
    image: REAL_HOTEL_IMAGES.jalsaLakeSunset,
    description:
      'A picturesque second lake framed by the hills, perfect for scenic evening drives along Rani Road, lakefront cafes, speedboat rides, and boat trips to Nehru Park island.',
    highlights: ['Peaceful promenade walks', 'Scenic Rani Road drive', 'Lakefront open-air cafes'],
  },
];

export const ExplorePage: React.FC<ExplorePageProps> = ({ onBack, onOpenEnquiry }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filterButtons: FilterCategory[] = [
    'ALL',
    'WALKING DISTANCE',
    'ROYAL PALACES',
    'LAKES & GHATS',
    'CULTURE & BAZAARS',
  ];

  const filteredSpots = HERITAGE_SPOTS.filter((spot) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'WALKING DISTANCE') return spot.isWalking;
    return spot.category === activeFilter;
  });

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-[#FAF8F5] min-h-screen text-[#1C1917]">
      {/* Top Breadcrumb & Page Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12 sm:mb-16">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-sans text-[#78716C] hover:text-[#9E763B] transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E8E2D9]">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                Curated Excursions &amp; Heritage
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1917] leading-[1.08]">
              Explore Udaipur Heritage
            </h1>
            <p className="font-editorial-italic font-normal text-[#9E763B] text-xl sm:text-2xl mt-1.5">
              Where Centuries of Royal Mewari Splendor Meet Lake Pichola
            </p>
            <p className="font-body text-sm sm:text-base text-[#57534E] max-w-2xl mt-3 leading-relaxed">
              Situated in the historic old quarters at Purohit Ka Khurra before Chandpole, Hotel Mewari Villa places you within effortless walking distance of royal palaces, sacred stone temples, serene lake ghats, and bustling artisan bazaars.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-sans rounded-full transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#9E763B] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#57534E] border border-[#E8E2D9] hover:border-[#9E763B] hover:text-[#1C1917]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Proximity Reference Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D9] shadow-xs">
            <span className="text-[10px] uppercase tracking-wider font-sans text-[#9E763B] font-semibold block mb-1">
              Waterfront Steps
            </span>
            <div className="font-serif text-lg font-medium text-[#1C1917]">Lake Pichola</div>
            <p className="text-xs text-[#78716C] font-sans mt-0.5">100m · 2 mins walk</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D9] shadow-xs">
            <span className="text-[10px] uppercase tracking-wider font-sans text-[#9E763B] font-semibold block mb-1">
              Royal Landmark
            </span>
            <div className="font-serif text-lg font-medium text-[#1C1917]">City Palace</div>
            <p className="text-xs text-[#78716C] font-sans mt-0.5">900m · 10 mins walk</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D9] shadow-xs">
            <span className="text-[10px] uppercase tracking-wider font-sans text-[#9E763B] font-semibold block mb-1">
              Rail Transit
            </span>
            <div className="font-serif text-lg font-medium text-[#1C1917]">Railway Station</div>
            <p className="text-xs text-[#78716C] font-sans mt-0.5">3.2 km · 12 mins drive</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D9] shadow-xs">
            <span className="text-[10px] uppercase tracking-wider font-sans text-[#9E763B] font-semibold block mb-1">
              Air Transit
            </span>
            <div className="font-serif text-lg font-medium text-[#1C1917]">Udaipur Airport</div>
            <p className="text-xs text-[#78716C] font-sans mt-0.5">24 km · 40 mins drive</p>
          </div>
        </div>
      </div>

      {/* Sights & Excursions Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#9E763B] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E2D9]">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="bg-black/60 backdrop-blur-md text-white border border-white/20 text-[10px] font-sans font-semibold uppercase px-3 py-1 rounded-full">
                      {spot.category}
                    </span>
                    {spot.isWalking && (
                      <span className="bg-[#9E763B] text-white text-[10px] font-sans font-semibold uppercase px-2.5 py-1 rounded-full shadow-sm">
                        🚶 Walking Distance
                      </span>
                    )}
                  </div>

                  {/* Distance pill bottom-right */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white text-xs font-sans font-medium">
                    {spot.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] group-hover:text-[#9E763B] transition-colors">
                      {spot.name}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-sans text-[#78716C] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#9E763B]" />
                    <span>{spot.distance}</span>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                    {spot.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 pt-4 border-t border-[#F0ECE1]">
                    {spot.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-sans text-[#44403C]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => onOpenEnquiry(`Explore Tour: ${spot.name}`)}
                  className="w-full py-3 bg-[#FAF8F5] hover:bg-[#9E763B] hover:text-white text-[#1C1917] text-xs uppercase tracking-[0.14em] font-sans font-semibold rounded-full border border-[#E8E2D9] hover:border-[#9E763B] transition-all flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <span>Plan Visit with Concierge</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signature Curated Excursions Spotlight (Lake Boat Rides, Palace Tours, Local Walks) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-20">
        <div className="bg-white rounded-3xl border border-[#E8E2D9] p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center space-x-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                Tailored Hotel Concierge Experiences
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
              Bespoke Udaipur Journeys
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] font-body mt-2 leading-relaxed">
              Our front desk and heritage concierge gladly organize private guides, boat charter tickets, auto-rickshaw hire, and airport transfers directly from our hotel desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={exp.id}
                onClick={() => onOpenEnquiry(`Experience: ${exp.title}`)}
                className="group cursor-pointer rounded-2xl p-4 border border-[#E8E2D9] hover:border-[#9E763B] hover:shadow-md transition-all bg-[#FAF8F5] flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 relative bg-[#E8E2D9]">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#9E763B] text-white text-[9px] uppercase tracking-wider font-sans font-semibold px-2 py-0.5 rounded-md shadow-xs">
                      {exp.tag}
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#1C1917] group-hover:text-[#9E763B] transition-colors mb-1.5">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#57534E] font-body leading-relaxed mb-4">
                    {exp.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-sans text-[#9E763B] font-medium">
                  <span>Enquire Experience</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Location & Google Map Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="bg-white rounded-3xl border border-[#E8E2D9] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info (5 cols) */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center space-x-2 text-[#9E763B] mb-3">
                <Compass className="w-4 h-4" />
                <span className="text-[11px] font-sans uppercase tracking-wider font-semibold">
                  Hotel Location &amp; Directions
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mb-4">
                How to Reach Mewari Villa
              </h2>

              <p className="text-xs sm:text-sm text-[#57534E] font-body leading-relaxed mb-6">
                Situated at Purohit Ka Khurra right before Chandpole Parking in Udaipur’s historic old city quarter, overlooking Lake Pichola.
              </p>

              <div className="space-y-4 text-xs font-sans text-[#44403C] mb-8">
                <div className="flex items-start space-x-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
                  <MapPin className="w-4 h-4 text-[#9E763B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#1C1917]">Official Address</span>
                    <span className="text-[#78716C]">{HOTEL_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
                  <Navigation className="w-4 h-4 text-[#9E763B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#1C1917]">Vehicle Parking</span>
                    <span className="text-[#78716C]">{HOTEL_INFO.parkingNote}. Luggage assistance readily provided.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
                  <Phone className="w-4 h-4 text-[#9E763B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#1C1917]">Arrival Assistance &amp; Direct Phone</span>
                    <span className="text-[#78716C]">{HOTEL_INFO.primaryPhone} / {HOTEL_INFO.secondaryPhone}</span>
                  </div>
                </div>
              </div>

              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-md transition-all group cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Right Map Embed (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-inner h-[380px] sm:h-[420px] bg-[#E8E2D9]">
              <iframe
                title="Mewari Villa Hotel Google Map Location"
                src={HOTEL_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Concierge Booking Card */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1C1917] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#DFC088] font-semibold block mb-2">
              Plan Your Udaipur Itinerary
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              Need assistance planning your Udaipur heritage visit?
            </h3>
            <p className="font-body text-xs sm:text-sm text-white/75 mt-1 max-w-xl">
              Connect directly with our local concierge for tailored boat tour timings, royal palace entry details, and private heritage tours.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry('Tailored Udaipur Day Tour')}
            className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-lg transition-all duration-300 flex-shrink-0 group cursor-pointer"
          >
            <span>Connect With Concierge</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
