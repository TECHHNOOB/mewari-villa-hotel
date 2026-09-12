import React from 'react';
import { WHY_MEWARI } from '../data/hotelData';

export const WhyMewariVilla: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white text-[#171717] relative overflow-hidden border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Eyebrow & Oversized Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2.5 mb-2.5">
            <span className="w-5 h-px bg-[#C59B51]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
              Heritage Philosophy
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] leading-tight">
            A stay shaped by heritage, place, &amp; timeless hospitality.
          </h2>
        </div>

        {/* 4 Differentiators in Luxora Minimal Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_MEWARI.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] hover:border-[#C59B51] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#C59B51] font-light mb-4 group-hover:scale-105 transition-transform origin-left">
                  0{idx + 1}
                </div>

                <h3 className="font-serif text-xl text-[#171717] font-medium tracking-wide mb-1.5">
                  {item.title}
                </h3>

                <div className="text-[10px] uppercase tracking-wider font-sans text-[#C59B51] font-semibold mb-3">
                  {item.tagline}
                </div>

                <p className="text-xs text-[#666666] font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Generous Statement */}
        <div className="mt-16 pt-10 border-t border-[#EAE4D9] text-center max-w-2xl mx-auto">
          <p className="font-serif italic text-lg sm:text-xl text-[#525252] leading-relaxed">
            &ldquo;An intimate boutique sanctuary where every guest is welcomed with authentic Mewari warmth.&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
};
