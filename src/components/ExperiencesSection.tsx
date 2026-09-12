import React from 'react';
import { ArrowUpRight, Compass, Sparkles, Calendar } from 'lucide-react';
import { EXPERIENCES } from '../data/hotelData';

interface ExperiencesSectionProps {
  onEnquireExperience: (expTitle: string) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onEnquireExperience }) => {
  return (
    <section id="experiences" className="py-20 md:py-28 bg-[#FAF8F5] relative border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#EAE4D9] gap-6">
          <div>
            <div className="flex items-center space-x-2.5 mb-2.5">
              <span className="w-5 h-px bg-[#C59B51]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
                Curated Excursions
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717] leading-tight">
              Bespoke Udaipur Journeys
            </h2>
          </div>
          <div className="max-w-md text-xs sm:text-sm text-[#666666] font-body leading-relaxed">
            <p>
              From private sunset boat rides on Lake Pichola to regal palace walks, our concierge crafts unforgettable journeys tailored to your rhythm.
            </p>
          </div>
        </div>

        {/* 3 Visual Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.id}
              onClick={() => onEnquireExperience(exp.title)}
              className="group cursor-pointer bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D5CABE] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F0ECE1]">
                <img
                  src={exp.image}
                  alt={`${exp.title} experience in Udaipur`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 bg-[#C59B51] text-white text-[9px] uppercase tracking-wider font-sans font-semibold rounded-md shadow-xs">
                    {exp.tag}
                  </span>
                </div>

                {/* Arrow CTA Top Right */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#171717] group-hover:bg-[#C59B51] group-hover:text-white transition-colors shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                {/* Subtitle Badge */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <span className="text-[11px] uppercase tracking-wider font-sans text-white/90">
                    {exp.subtitle}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#C59B51] font-semibold mb-1">
                    EXPERIENCE 0{index + 1}
                  </div>
                  <h3 className="font-serif text-xl text-[#171717] font-medium mb-2 group-hover:text-[#C59B51] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#666666] font-body leading-relaxed mb-4">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-[11px] font-sans text-[#737373]">
                  <span className="flex items-center space-x-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#C59B51]" />
                    <span>Udaipur Concierge</span>
                  </span>
                  <span className="text-[#C59B51] font-medium group-hover:underline">
                    Inquire Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
