import React from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { REAL_HOTEL_IMAGES } from '../data/hotelData';

interface VillaSuiteFeatureProps {
  onEnquireSuite: () => void;
  onViewRoomPage?: (roomId: string) => void;
}

// Curated verified guest testimonials matching reference design
const TESTIMONIALS = [
  {
    id: 't1',
    title: 'A Calm, Comfortable Stay',
    quote:
      'From check-in to check-out, everything felt smooth and well-organized. The room was quiet, the lighting was relaxing, and the shared spaces were easy to enjoy without feeling crowded.',
    author: 'Emily Carter',
    location: 'From USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't2',
    title: 'Great for a Weekend Break',
    quote:
      'We stayed for a short getaway and appreciated the simple layout and clean details throughout the property. The dining area was welcoming, and the overall atmosphere felt calm and unhurried.',
    author: 'Michael Thompson',
    location: 'From United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't3',
    title: 'Unmatched Lake Views & Walking Proximity',
    quote:
      'We had a wonderful stay at this hotel. Rooms are spacious, clean and friendly staffs. The breakfast was good. Location wise it is at the centre, where the City Palace, Ambrai Ghat, Bagore ki Haveli, etc all are at walking distance. Overall we had wonderful stay and thanks to the owner who is extremely friendly.',
    author: 'Suman Khadka Chhetry',
    location: 'Google Verified Review',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't4',
    title: 'Ideal for Family Stays & Celebrations',
    quote:
      'This was our favorite stay in Udaipur. Authentic royal Mewari architecture, prompt room service, and stunning lake views from the rooftop. The staff helped arrange our boat ride and made us feel truly at home.',
    author: 'David Reynolds',
    location: 'From Australia',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    rating: 5,
  },
];

// Highlights from Recent Events matching top half of reference mockup
const EVENT_HIGHLIGHTS = [
  {
    id: 'event-1',
    title: 'Outdoor Wedding Reception',
    category: 'Lakeside Celebration',
    image: REAL_HOTEL_IMAGES.jalsaTableSetting,
  },
  {
    id: 'event-2',
    title: 'Business Conference',
    category: 'Corporate Gathering',
    image: REAL_HOTEL_IMAGES.jalsaRooftopSeating,
  },
  {
    id: 'event-3',
    title: 'Birthday Party',
    category: 'Private Starlit Terrace',
    image: REAL_HOTEL_IMAGES.jalsaFoodView,
  },
];

export const VillaSuiteFeature: React.FC<VillaSuiteFeatureProps> = ({ onEnquireSuite }) => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#1C1917]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* ========================================================================= */}
        {/* TOP SECTION: Highlights from Recent Events (Reference Match) */}
        {/* ========================================================================= */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center space-x-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
                <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                  Recent Events
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-[1.1]">
                Highlights from Recent Events
              </h2>
            </div>

            {/* Subtitle on Right + Explore More Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 lg:max-w-lg">
              <p className="font-body text-xs sm:text-sm text-[#78716C] leading-relaxed">
                From intimate celebrations to gatherings, these recent events showcase how Mewari Villa adapts to different occasions, creating welcoming settings for both formal and social experiences.
              </p>

              {/* <button
                onClick={onEnquireSuite}
                className="inline-flex items-center space-x-1.5 px-6 py-3 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-sm hover:shadow-md transition-all flex-shrink-0 group cursor-pointer"
              >
                <span>Explore More</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button> */}
            </div>
          </div>

          {/* 3 Event Cards Grid (Direct Match to Reference) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {EVENT_HIGHLIGHTS.map((event) => (
              <div
                key={event.id}
                className="group relative rounded-3xl overflow-hidden shadow-sm border border-[#E8E2D9] aspect-[3/4] bg-[#E8E2D9] cursor-pointer"
                onClick={onEnquireSuite}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Bottom Tag Label (as shown in reference image) */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <h3 className="font-sans text-sm sm:text-base font-medium tracking-wide drop-shadow-sm">
                    {event.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION: Words from Our Guests (Reference Match) */}
        {/* ========================================================================= */}
        <div>
          {/* Eyebrow & Title */}
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                Guest Testimonials
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-[1.1] mb-3">
              Words from Our Guests
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Hear from guests who have stayed with us and shared their experiences, reflecting the comfort, atmosphere, and service offered throughout our hotel and resort.
            </p>
          </div>

          {/* 4 Cards in 2x2 Grid (Exact Reference Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#FFFDF9] rounded-3xl p-7 sm:p-8 border border-[#E8E2D9] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#9E763B]/50 transition-all duration-300"
              >
                <div>
                  {/* Card Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1917] mb-3">
                    {testimonial.title}
                  </h3>

                  {/* Quote Paragraph */}
                  <p className="font-body text-xs sm:text-[13px] text-[#57534E] leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Bottom Separator & Author Info */}
                <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
                  {/* Author Avatar & Name */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
                    />
                    <div>
                      <h4 className="font-sans text-xs sm:text-sm font-semibold text-[#1C1917] leading-tight">
                        {testimonial.author}
                      </h4>
                      <p className="font-sans text-[11px] text-[#78716C] mt-0.5">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* 5 Stars Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#9E763B] text-[#9E763B]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
