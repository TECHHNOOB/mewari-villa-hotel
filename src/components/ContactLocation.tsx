import React from 'react';
import { MapPin, Phone, Clock, ArrowUpRight, Navigation, ShieldCheck, Car } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const ContactLocation: React.FC = () => {
  const proximityStats = [
    {
      metric: '100m',
      title: 'Lake Pichola',
      desc: 'Direct walking access to tranquil waterfront banks and sunset boat rides.',
    },
    {
      metric: '900m',
      title: 'City Palace',
      desc: 'Historic royal complex and vintage museums just a 10-minute stroll away.',
    },
    {
      metric: '3.2 km',
      title: 'Railway Station',
      desc: 'Quick auto-rickshaw or taxi drive from Udaipur City Railway Station.',
    },
    {
      metric: '24 km',
      title: 'Udaipur Airport',
      desc: 'Convenient 40-minute drive via highway; airport transfers arranged upon request.',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF8F5] text-[#1C1917] relative border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header (Matches Orrivaa Benchmark) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#9E763B] font-semibold">
                Location &amp; Access
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E763B]" />
            </div>

            {/* Headline with Signature Editorial Italic */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-[1.1]">
              Arriving at Mewari Villa<br></br>
              <span className="block sm:inline sm:ml-3 font-editorial-italic font-normal text-[#9E763B]">
                In the Heart of Udaipur
              </span>
            </h2>
          </div>

          {/* Subtitle & Map Link Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 lg:max-w-lg">
            <p className="font-body text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Nestled along the tranquil shores of Lake Pichola at Purohit Ka Khurra before Chandpole, offering peaceful seclusion with unrivaled walking access to iconic heritage sights.
            </p>

            {/* <a
              href={HOTEL_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-sm hover:shadow-md transition-all flex-shrink-0 group cursor-pointer"
            >
              <span>Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a> */}
          </div>
        </div>

        {/* 4 Minimalist Proximity / Transit Slashes (Matching Design System) */}
        <div className="pb-12 mb-12 border-b border-[#E8E2D9]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {proximityStats.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#E8E2D9] pb-6 sm:pb-0 pr-0 sm:pr-6 last:border-none"
              >
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917] tracking-tight">
                    {item.metric}
                  </span>
                  <span className="text-[#9E763B] font-serif text-xl font-light">/</span>
                  <span className="font-serif text-lg font-medium text-[#1C1917]">
                    {item.title}
                  </span>
                </div>
                <p className="font-body text-xs sm:text-[13px] text-[#78716C] leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Master Editorial 2-Column Split: Arrival Details + Panoramic Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Arrival & Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#9E763B] font-semibold block mb-2">
                Heritage Sanctuary · Udaipur
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] mb-6">
                Hotel Mewari Villa
              </h3>

              {/* Address Item */}
              <div className="flex items-start space-x-3.5 mb-6">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#9E763B] shrink-0 mt-0.5 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-sans font-medium block mb-0.5">
                    Official Address
                  </span>
                  <address className="not-italic text-xs sm:text-sm font-sans text-[#1C1917] leading-relaxed">
                    {HOTEL_INFO.address}
                  </address>
                </div>
              </div>

              {/* Dedicated Parking Guidance */}
              <div className="flex items-start space-x-3.5 mb-6">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#9E763B] shrink-0 mt-0.5 shadow-xs">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#9E763B] font-sans font-semibold block mb-0.5">
                    Dedicated Car Parking
                  </span>
                  <p className="text-xs sm:text-sm font-sans text-[#44403C] leading-relaxed">
                    {HOTEL_INFO.parkingNote}. Our team gladly provides luggage and valet assistance on arrival.
                  </p>
                </div>
              </div>

              {/* Direct Phone Assistance */}
              <div className="flex items-start space-x-3.5 mb-6">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#9E763B] shrink-0 mt-0.5 shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-sans font-medium block mb-0.5">
                    Front Desk &amp; Concierge
                  </span>
                  <div className="space-y-0.5">
                    <a
                      href={`tel:${HOTEL_INFO.primaryPhone}`}
                      className="text-xs sm:text-sm font-sans text-[#1C1917] hover:text-[#9E763B] font-medium block transition-colors"
                    >
                      {HOTEL_INFO.primaryPhone}
                    </a>
                    <a
                      href={`tel:${HOTEL_INFO.secondaryPhone}`}
                      className="text-xs font-sans text-[#78716C] hover:text-[#9E763B] block transition-colors"
                    >
                      {HOTEL_INFO.secondaryPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#9E763B] shrink-0 mt-0.5 shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-sans font-medium block mb-0.5">
                    Check-in / Check-out
                  </span>
                  <p className="text-xs sm:text-sm font-sans text-[#1C1917]">
                    Check-in: {HOTEL_INFO.checkIn} · Check-out: {HOTEL_INFO.checkOut}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-8 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center gap-3">
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3 bg-[#9E763B] hover:bg-[#825E29] text-white text-xs uppercase tracking-[0.14em] font-sans font-semibold rounded-full flex items-center justify-center space-x-2 transition-all shadow-sm group"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={`tel:${HOTEL_INFO.primaryPhone}`}
                className="w-full sm:w-auto px-5 py-3 border border-[#E8E2D9] hover:border-[#9E763B] hover:bg-white text-[#1C1917] text-xs uppercase tracking-[0.14em] font-sans font-medium rounded-full flex items-center justify-center space-x-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#9E763B]" />
                <span>Call Us</span>
              </a>
            </div>
          </div>

          {/* Right Column: Expansive Panoramic Google Map Embed (7 cols) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#E8E2D9] shadow-sm bg-[#E8E2D9] min-h-[420px] lg:min-h-full">
            <iframe
              src={HOTEL_INFO.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mewari Villa Hotel Google Maps Location"
              className="w-full h-full object-cover"
            />

            {/* Floating Top Badge */}
            {/* <div className="absolute top-5 left-5 bg-black/65 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full shadow-md pointer-events-none">
              <span className="text-[11px] font-sans font-semibold tracking-wide">
                📍 Hotel Mewari Villa · Lake Pichola, Udaipur
              </span>
            </div> */}
          </div>

        </div>

      </div>
    </section>
  );
};
