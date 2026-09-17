import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { sendBookingInquiry } from '../services/inquiryService';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      await sendBookingInquiry({
        source: 'Footer Newsletter & Offers Subscription',
        guestName: 'Newsletter Subscriber',
        guestPhone: 'N/A',
        guestEmail: email.trim(),
        specialRequests: 'Subscriber requested updates on seasonal tariffs and heritage packages.',
        enquiryType: 'Newsletter Subscription',
      });
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#/')) {
      window.location.hash = href;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-white text-[#171717] pt-16 pb-24 md:pb-12 border-t border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Top Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#EAE4D9]">

          {/* Col 1: Brand & Logo (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <img
                src="/mewari-villa-logo.png"
                alt="Hotel Mewari Villa"
                className="h-16 w-auto object-contain"
              />
            </div>

            <p className="text-xs font-body text-[#666666] leading-relaxed max-w-sm">
              Redefining luxury heritage stays with exceptional lakeside suites, tranquil rooftop dining at Jalsa, and unmatched personalized Mewari hospitality.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#525252] hover:text-[#C59B51] hover:border-[#C59B51] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#525252] hover:text-[#C59B51] hover:border-[#C59B51] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#525252] hover:text-[#C59B51] hover:border-[#C59B51] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#525252] hover:text-[#C59B51] hover:border-[#C59B51] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Accommodations (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-wider font-sans text-[#171717] font-semibold block mb-4">
              Suites &amp; Rooms
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#666666]">
              <li>
                <a href="#stay" onClick={(e) => handleNavClick(e, '#stay')} className="hover:text-[#C59B51] transition-colors">
                  Villa Suite Lake View
                </a>
              </li>
              <li>
                <a href="#stay" onClick={(e) => handleNavClick(e, '#stay')} className="hover:text-[#C59B51] transition-colors">
                  Super Deluxe Lake View
                </a>
              </li>
              <li>
                <a href="#stay" onClick={(e) => handleNavClick(e, '#stay')} className="hover:text-[#C59B51] transition-colors">
                  Triple Sharing Family
                </a>
              </li>
              <li>
                <a href="#stay" onClick={(e) => handleNavClick(e, '#stay')} className="hover:text-[#C59B51] transition-colors">
                  Deluxe Non Lake View
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Explore & Dining (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-wider font-sans text-[#171717] font-semibold block mb-4">
              Explore Udaipur
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#666666]">
              <li>
                <a href="#/explore" onClick={(e) => handleNavClick(e, '#/explore')} className="hover:text-[#9E763B] transition-colors">
                  Heritage Guide &amp; Sights
                </a>
              </li>
              <li>
                <a href="#dining" onClick={(e) => handleNavClick(e, '#dining')} className="hover:text-[#9E763B] transition-colors">
                  Jalsa Rooftop Dining
                </a>
              </li>
              <li>
                <a href="#/explore" onClick={(e) => handleNavClick(e, '#/explore')} className="hover:text-[#9E763B] transition-colors">
                  Lake Pichola Boat Ride
                </a>
              </li>
              <li>
                <a href="#/gallery" onClick={(e) => handleNavClick(e, '#/gallery')} className="hover:text-[#9E763B] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-[#9E763B] transition-colors">
                  Heritage Story
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact (4 cols) */}
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-wider font-sans text-[#171717] font-semibold block mb-2">
              Stay Connected
            </span>
            <p className="text-xs font-body text-[#666666] leading-relaxed mb-4">
              Subscribe for exclusive seasonal retreats, private boat packages, and heritage stories.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center space-x-2 mb-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] rounded-lg text-xs font-sans text-[#171717] placeholder:text-[#999999] focus:outline-hidden focus:border-[#C59B51]"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#C59B51] hover:bg-[#B3873E] text-white rounded-lg transition-colors shadow-xs"
                title="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs font-sans text-[#C59B51] mb-2">
                ✓ Thank you for subscribing to Mewari Villa!
              </p>
            )}

            <div className="flex flex-col space-y-1 text-xs text-[#737373] font-sans pt-1">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#C59B51]" />
                <span>{HOTEL_INFO.primaryPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59B51]" />
                <span>Purohit Ka Khurra, Udaipur 313001</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-[#8C8C8C]">
          <p>© {new Date().getFullYear()} Mewari Villa Hotel. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#about" className="hover:text-[#171717] transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-[#171717] transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-[#171717] transition-colors">Location Map</a>
          </div>
          <p>Designed with Excellence · Heritage Luxury</p>
        </div>

      </div>
    </footer>
  );
};
