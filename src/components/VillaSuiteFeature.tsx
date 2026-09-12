import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Play, Shield, Sun, Compass, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { REAL_HOTEL_IMAGES } from '../data/hotelData';

interface VillaSuiteFeatureProps {
  onEnquireSuite: () => void;
  onViewRoomPage?: (roomId: string) => void;
}

// Verified real guest reviews from Google & TripAdvisor
const GUEST_REVIEWS = [
  {
    id: 1,
    name: 'Suman Khadka Chhetry',
    source: 'Google Review',
    time: '4 months ago',
    rating: 5,
    avatarText: 'SK',
    review:
      'We had a wonderful stay at this hotel. Rooms are spacious, clean and friendly staffs. The breakfast was good. Location wise it is at the centre, where the City Palace, Ambrai Ghat, Bagore ki Haveli, etc all are at walking distance. Overall we had wonderful stay and thanks to the owner who is extremely friendly.',
  },
  {
    id: 2,
    name: 'Verified Guest',
    source: 'Google Review',
    time: '1 month ago',
    rating: 5,
    avatarText: 'VG',
    review:
      'This was my last stay which I opted for after staying in 2 different properties and I must say it was THE best. Everything is walking distance from the property like Gangaur Ghat, Jagdish Temple, Hathipole Bazar, Bada Bazar and yet you will experience absolute peace.',
  },
  {
    id: 3,
    name: 'NorthStar Traveller',
    source: 'Tripadvisor Review',
    time: '5 months ago',
    rating: 5,
    avatarText: 'NT',
    review:
      'We stayed at Mewari Villa in Udaipur for 2 nights, and it was a wonderful experience. The hotel was very well maintained and extremely clean. The room service was excellent and very prompt. The rooftop restaurant was beautiful, offering a stunning panoramic view.',
  },
  {
    id: 4,
    name: 'Dipesh Akhare',
    source: 'Google Review',
    time: '6 months ago',
    rating: 5,
    avatarText: 'DA',
    review:
      'Outstanding Stay at Mewari Villa – Perfect Location & Value! I had a wonderful stay at Hotel Mewari Villa. It offers a perfect blend of heritage charm, exceptional cleanliness, lakefront proximity, and outstanding value.',
  },
  {
    id: 5,
    name: 'Shubham Banawal',
    source: 'Google Local Guide',
    time: '2 months ago',
    rating: 5,
    avatarText: 'SB',
    review:
      'Honest review. After all reviews, they have improved their services. They are really good now. I have specially tipped them. Rooms are good, hospitality is warm, and the location is unmatched.',
  },
];

export const VillaSuiteFeature: React.FC<VillaSuiteFeatureProps> = ({ onEnquireSuite, onViewRoomPage }) => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance reviews every 7.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % GUEST_REVIEWS.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrevReview = () => {
    setCurrentReview((prev) => (prev - 1 + GUEST_REVIEWS.length) % GUEST_REVIEWS.length);
  };

  const handleNextReview = () => {
    setCurrentReview((prev) => (prev + 1) % GUEST_REVIEWS.length);
  };

  const activeReview = GUEST_REVIEWS[currentReview];

  return (
    <section className="py-20 md:py-24 bg-white border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: What Our Guests Say with Real Google/TripAdvisor Reviews (4 cols) */}
          <div
            className="lg:col-span-4 bg-[#FAF8F5] rounded-2xl p-7 border border-[#EAE4D9] flex flex-col justify-between h-full shadow-xs transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-[#C59B51]">
                  <span className="text-[10px] font-sans uppercase tracking-widest font-semibold">Guest Impressions</span>
                </div>
                {/* Previous & Next arrow buttons */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={handlePrevReview}
                    className="w-7 h-7 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#171717] hover:bg-[#C59B51] hover:text-white hover:border-[#C59B51] transition-colors shadow-xs"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNextReview}
                    className="w-7 h-7 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#171717] hover:bg-[#C59B51] hover:text-white hover:border-[#C59B51] transition-colors shadow-xs"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-normal text-[#171717] mb-3">
                What Our Guests Say
              </h3>

              {/* Large Gold Quote Mark */}
              <div className="font-serif text-5xl text-[#C59B51] leading-none mb-2 font-italic select-none">
                “
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm font-body text-[#404040] leading-relaxed min-h-[110px] mb-6">
                {activeReview.review}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-3 pt-4 border-t border-[#EAE4D9]">
                {/* Avatar with initials */}
                <div className="w-10 h-10 rounded-full bg-[#EAE4D9] border border-white flex items-center justify-center text-[#171717] font-serif font-bold text-xs shadow-xs shrink-0">
                  {activeReview.avatarText}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-semibold text-[#171717] truncate">
                    {activeReview.name}
                  </h4>
                  <div className="flex items-center space-x-1.5 text-[10px] font-sans text-[#737373]">
                    <span>{activeReview.source}</span>
                    <span>•</span>
                    <div className="flex text-amber-500">
                      {[...Array(activeReview.rating)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Indicator Dots */}
              <div className="mt-5 flex items-center space-x-1.5">
                {GUEST_REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentReview(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      currentReview === idx
                        ? 'w-5 h-1 bg-[#C59B51]'
                        : 'w-1.5 h-1 bg-[#D8CEBE] hover:bg-[#C59B51]/60'
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column: Video Showcase Card with Gold Play Button (4 cols) */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-md border border-[#EAE4D9] aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] group bg-[#171717]">
            <img
              src={REAL_HOTEL_IMAGES.lakeViewRooftop}
              alt="Mewari Villa sunset video tour"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

            {/* Centered Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => alert('Tour preview: Mewari Villa Hotel Rooftop and Lake Pichola panoramic views.')}
                className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#171717] group-hover:scale-110 group-hover:bg-[#C59B51] group-hover:text-white transition-all duration-300 shadow-xl"
                aria-label="Play Video Tour"
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
            </div>

            {/* Bottom Tag */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="text-[11px] font-sans font-medium text-white/90 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full">
                Virtual Tour · Sunset Over Lake Pichola
              </span>
            </div>
          </div>

          {/* Right Column: Exclusive Stay Privileges (4 cols) */}
          <div className="lg:col-span-4 bg-[#FAF8F5] rounded-2xl p-7 border border-[#EAE4D9] flex flex-col justify-between h-full shadow-xs">
            <div>
              <div className="flex items-center space-x-2 text-[#C59B51] mb-2">
                <span className="text-[10px] font-sans uppercase tracking-widest font-semibold">Special Stays</span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#171717] mb-3">
                Exclusive Heritage Privileges
              </h3>
              <p className="text-xs font-body text-[#666666] leading-relaxed mb-6">
                Curated royal experiences, personalized dining setups, and private lake boat charters handpicked for your itinerary.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                {onViewRoomPage && (
                  <button
                    onClick={() => onViewRoomPage('villa-suite-lake-view')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg transition-all shadow-xs"
                  >
                    <span>View Suite Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C59B51]" />
                  </button>
                )}
                <button
                  onClick={onEnquireSuite}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg transition-all shadow-xs"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3 Mini Privileges with Icons */}
            <div className="space-y-3 pt-4 border-t border-[#EAE4D9]">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] flex-shrink-0">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-serif font-medium text-[#171717]">High Privacy &amp; Serenity</p>
                  <p className="text-[10px] font-sans text-[#737373]">Intimate heritage quarters</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] flex-shrink-0">
                  <Sun className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-serif font-medium text-[#171717]">Sunset Rooftop Dining</p>
                  <p className="text-[10px] font-sans text-[#737373]">Jalsa pure vegetarian cuisine</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] flex-shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-serif font-medium text-[#171717]">Curated City Excursions</p>
                  <p className="text-[10px] font-sans text-[#737373]">Tailored Lake Pichola boat charters</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
