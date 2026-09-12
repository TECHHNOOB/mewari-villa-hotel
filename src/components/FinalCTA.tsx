import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FinalCTAProps {
  onOpenEnquiry: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenEnquiry }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I schedule a private lake boat ride or tour?',
      answer: 'Our 24/7 concierge can arrange private sunset boat rides on Lake Pichola directly from the nearby ghats, as well as guided tours of City Palace and old Udaipur bazaars.',
    },
    {
      question: 'What are the check-in and check-out timings?',
      answer: `Check-in is at ${HOTEL_INFO.checkIn} and check-out is at ${HOTEL_INFO.checkOut}. Early check-in and luggage storage can be accommodated upon request based on suite availability.`,
    },
    {
      question: 'Can you help with airport and railway transfers?',
      answer: 'Yes, we provide comfortable private airport transfers from Maharana Pratap Airport (approx. 45 mins) and Udaipur City Railway Station directly to our location.',
    },
    {
      question: 'Is rooftop dining at Jalsa 100% pure vegetarian?',
      answer: 'Yes! Jalsa Rooftop Restaurant serves 100% pure vegetarian Rajasthani, North Indian, and Continental delicacies with panoramic views of Lake Pichola and the illuminated City Palace.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-20 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* 1. Frequently Asked Questions Section */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal">
              Frequently Asked Questions
            </h2>
            <p className="text-xs font-sans text-[#737373] mt-2">
              Everything you need to know about planning your royal heritage stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-xl border border-[#EAE4D9] p-5 shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left focus:outline-hidden"
                  >
                    <span className="font-serif text-base font-medium text-[#171717] pr-4">
                      {faq.question}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51] flex-shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-[#F0ECE1] text-xs font-body text-[#666666] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Signature Luxora Warm Gold CTA Banner */}
        <div className="bg-gradient-to-r from-[#C59B51] via-[#BA8A43] to-[#C59B51] rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug mb-2">
              Ready to Experience Mewari Royalty?
            </h3>
            <p className="text-xs sm:text-sm font-sans text-white/90 max-w-xl">
              Let our concierge help you discover the perfect lakeside suite overlooking Lake Pichola.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center space-x-3 px-8 py-3.5 bg-white text-[#171717] hover:bg-[#FAF8F5] text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-xl shadow-lg transition-all active:scale-95 group"
            >
              <span>Reserve Your Stay</span>
              <ArrowRight className="w-4 h-4 text-[#C59B51] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
