import React from 'react';
import { MapPin, Phone, Mail, Navigation, Clock } from 'lucide-react';
import { HOTEL_INFO, REAL_HOTEL_IMAGES } from '../data/hotelData';

export const ContactLocation: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF8F5] text-[#171717] relative border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2.5 mb-2.5">
            <span className="w-5 h-px bg-[#C59B51]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
              Location &amp; Access
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#171717] mb-3">
            How to Reach Mewari Villa
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#666666] leading-relaxed">
            Conveniently nestled along the tranquil shores of Lake Pichola, close to Udaipur’s historic old city, Chandpole, and sunset ghats.
          </p>
        </div>

        {/* 3 Column / Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">

          {/* Left: Hotel Exterior Photo Card */}
          <div className="lg:col-span-4 relative aspect-[4/3] lg:aspect-auto rounded-2xl overflow-hidden border border-[#EAE4D9] shadow-xs bg-white group min-h-[280px]">
            <img
              src={REAL_HOTEL_IMAGES.heritageFacade}
              alt="Mewari Villa Hotel Heritage Facade and Entrance Udaipur"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[9px] tracking-widest uppercase text-[#C59B51] font-sans font-bold block mb-1">
                Property Entrance
              </span>
              <div className="font-serif text-lg font-medium">Mewari Villa Hotel</div>
              <p className="text-xs text-white/80 font-sans mt-0.5">
                Before Chandpole Parking, Lake Pichola
              </p>
            </div>
          </div>

          {/* Middle: Contact Details Card */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE4D9] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-widest uppercase font-sans text-[#C59B51] font-semibold block mb-1">
                Luxury Heritage Retreat
              </span>
              <h3 className="font-serif text-xl font-medium text-[#171717] mb-6">
                Mewari Villa Hotel
              </h3>

              {/* Address */}
              <div className="flex items-start space-x-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8C8C] font-sans block mb-0.5">
                    Address
                  </span>
                  <address className="not-italic text-xs font-sans text-[#171717] leading-relaxed">
                    Purohit Ka Khurra, Before Chandpole Parking, Udaipur, Rajasthan 313001
                  </address>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start space-x-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8C8C] font-sans block mb-0.5">
                    Direct Contact
                  </span>
                  <a href={`tel:${HOTEL_INFO.primaryPhone}`} className="text-xs font-sans text-[#171717] hover:text-[#C59B51] font-medium block">
                    {HOTEL_INFO.primaryPhone}
                  </a>
                  <a href={`tel:${HOTEL_INFO.secondaryPhone}`} className="text-xs font-sans text-[#666666] hover:text-[#C59B51] block">
                    {HOTEL_INFO.secondaryPhone}
                  </a>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8C8C] font-sans block mb-0.5">
                    Timings
                  </span>
                  <p className="text-xs font-sans text-[#171717]">
                    Check-in: {HOTEL_INFO.checkIn} · Check-out: {HOTEL_INFO.checkOut}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F0ECE1]">
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Maps */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-[#EAE4D9] shadow-xs relative bg-white min-h-[280px]">
            <iframe
              src={HOTEL_INFO.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '280px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mewari Villa Hotel Google Maps Location"
              className="w-full h-full"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
