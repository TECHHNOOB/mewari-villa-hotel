import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface HeaderProps {
  onOpenEnquiry: (room?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero-section' },
    { label: 'Rooms & Suites', href: '#stay' },
    { label: 'Dining', href: '#dining' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Heritage', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md py-3.5 border-b border-[#EAE4D9] shadow-xs'
            : 'bg-white/90 backdrop-blur-sm py-4 border-b border-[#F0ECE1]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">

          {/* Official Hotel Mewari Villa Logo */}
          <a href="#" id="header-brand-logo" className="group flex items-center focus:outline-hidden py-1">
            <img
              src="/mewari-villa-logo.png"
              alt="Hotel Mewari Villa"
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs tracking-[0.08em] uppercase font-sans font-medium text-[#404040] hover:text-[#C59B51] transition-colors duration-200 relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions (Phone + Gold CTA) */}
          <div className="hidden sm:flex items-center space-x-5">
            <a
              href={`tel:${HOTEL_INFO.primaryPhone}`}
              className="flex items-center space-x-2 text-xs font-sans text-[#525252] hover:text-[#171717] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#C59B51]">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium tracking-wide">{HOTEL_INFO.primaryPhone}</span>
            </a>

            <button
              id="header-enquire-cta"
              onClick={() => onOpenEnquiry()}
              className="px-5 py-2.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-[0.14em] font-sans font-semibold rounded-lg shadow-sm transition-all duration-300 hover:shadow-md active:scale-95"
            >
              Book Stay
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-[#171717] rounded-lg border border-[#EAE4D9] bg-[#FAF8F5]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end sm:hidden">
          <div className="bg-white border-t border-[#EAE4D9] p-6 rounded-t-3xl shadow-2xl flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
              <div className="flex items-center">
                <img
                  src="/mewari-villa-logo.png"
                  alt="Hotel Mewari Villa"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-[#737373] hover:text-[#171717]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between py-2 text-sm font-sans font-medium text-[#262626] hover:text-[#C59B51] border-b border-[#FAF8F5]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#A3A3A3]" />
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col space-y-3">
              <a
                href={`tel:${HOTEL_INFO.primaryPhone}`}
                className="flex items-center justify-center space-x-2 py-3 rounded-lg border border-[#EAE4D9] text-sm font-sans font-medium text-[#171717] bg-[#FAF8F5]"
              >
                <Phone className="w-4 h-4 text-[#C59B51]" />
                <span>Call {HOTEL_INFO.primaryPhone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3 bg-[#C59B51] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-lg shadow-md"
              >
                Reserve Your Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
