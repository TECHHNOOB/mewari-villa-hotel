import React from 'react';
import { ArrowRight, Award, Users, Star, Clock } from 'lucide-react';
import { REAL_HOTEL_IMAGES, HOTEL_INFO } from '../data/hotelData';

export const IntroStory: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-24 bg-white relative overflow-hidden border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Luxora-Style Host Spotlight + Heritage Stats Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left: Host & Concierge Spotlight Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-4 h-px bg-[#C59B51]" />
                <span className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
                  Personal Concierge
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal mb-6">
                Meet Your Royal Host
              </h2>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-[#EAE4D9]">
                  <img
                    src={REAL_HOTEL_IMAGES.propertyCourtyard}
                    alt="Mewari Villa Heritage Host & Manager"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#171717]">
                    Thakur Arvind Singh
                  </h3>
                  <p className="text-xs font-sans text-[#C59B51] uppercase tracking-wider mb-2 font-medium">
                    Senior Heritage Host &amp; Concierge
                  </p>
                  <p className="text-xs font-body text-[#666666] leading-relaxed">
                    With over 15 years dedicated to traditional hospitality in Udaipur, our host ensures tailored lake excursions, private palace tours, and authentic royal Mewari experiences.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Arvind Singh, I would like to speak regarding my stay at Mewari Villa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg transition-all"
              >
                <span>Connect With Host</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: 4-Metric Statistics Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] p-6 sm:p-10 flex flex-col justify-center shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 text-center">

              {/* Stat 1 */}
              <div className="flex flex-col items-center p-3">
                <div className="w-10 h-10 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] mb-3 shadow-xs">
                  <Star className="w-4 h-4 fill-[#C59B51]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] mb-1">
                  99.2%
                </div>
                <div className="text-[11px] font-sans text-[#737373] tracking-wide">
                  Guest Satisfaction
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center p-3">
                <div className="w-10 h-10 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] mb-3 shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] mb-1">
                  1,500+
                </div>
                <div className="text-[11px] font-sans text-[#737373] tracking-wide">
                  Discerning Guests
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center p-3">
                <div className="w-10 h-10 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] mb-3 shadow-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] mb-1">
                  4.9★
                </div>
                <div className="text-[11px] font-sans text-[#737373] tracking-wide">
                  TripAdvisor Rating
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center p-3">
                <div className="w-10 h-10 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] mb-3 shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] mb-1">
                  15+
                </div>
                <div className="text-[11px] font-sans text-[#737373] tracking-wide">
                  Years Heritage Legacy
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-[#EAE4D9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666] font-body">
              <p>
                Steps from Lake Pichola, offering pure vegetarian dining, sunset terrace vistas, and authentic Rajasthani architecture.
              </p>
              <span className="font-sans font-medium text-[#C59B51] whitespace-nowrap">
                Purohit Ka Khurra · Udaipur
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
