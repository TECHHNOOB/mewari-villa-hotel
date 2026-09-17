import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight, ChevronRight } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface HeaderProps {
  onOpenEnquiry: (room?: string) => void;
  onNavigateHome?: () => void;
  onNavigateGallery?: () => void;
  onNavigateExplore?: () => void;
  isInnerPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEnquiry,
  onNavigateHome,
  onNavigateGallery,
  onNavigateExplore,
  isInnerPage = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero-section' },
    { label: 'About Us', href: '#about' },
    { label: 'Rooms & Suites', href: '#stay' },
    { label: 'Dining', href: '#dining' },
    { label: 'Explore', href: '#/explore' },
    { label: 'Gallery', href: '#/gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#/gallery') {
      if (onNavigateGallery) onNavigateGallery();
      else window.location.hash = '#/gallery';
      return;
    }

    if (href === '#/explore') {
      if (onNavigateExplore) onNavigateExplore();
      else window.location.hash = '#/explore';
      return;
    }

    if (onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showSolidHeader = isInnerPage || isScrolled;

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showSolidHeader
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md py-3.5 border-b border-[#E8E2D9] shadow-xs text-[#1C1917]'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">

          {/* Official Hotel Mewari Villa Logo */}
          <a
            href="#"
            id="header-brand-logo"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center focus:outline-hidden py-1"
          >
            <img
              src="/mewari-villa-logo.png"
              alt="Hotel Mewari Villa"
              className={`h-11 sm:h-13 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                !showSolidHeader ? 'brightness-0 invert drop-shadow-md' : ''
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[12px] tracking-[0.14em] uppercase font-sans font-medium transition-colors duration-300 relative py-1 hover:text-[#9E763B] ${
                  showSolidHeader ? 'text-[#44403C]' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions (Phone + Gold CTA Pill) */}
          <div className="hidden sm:flex items-center space-x-5">
            <a
              href={`tel:${HOTEL_INFO.primaryPhone}`}
              className={`flex items-center space-x-2 text-xs font-sans transition-colors ${
                showSolidHeader ? 'text-[#57534E] hover:text-[#1C1917]' : 'text-white/80 hover:text-white'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                showSolidHeader ? 'bg-[#FAF8F5] border border-[#E8E2D9] text-[#9E763B]' : 'bg-white/15 border border-white/20 text-white'
              }`}>
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium tracking-wide">{HOTEL_INFO.primaryPhone}</span>
            </a>

            <button
              id="header-enquire-cta"
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-[#9E763B] hover:bg-[#825E29] text-white text-[11px] uppercase tracking-[0.16em] font-sans font-semibold rounded-full shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 group"
            >
              <span>Book Your Stay</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${
                showSolidHeader
                  ? 'text-[#1C1917] border-[#E8E2D9] bg-[#FAF8F5]'
                  : 'text-white border-white/30 bg-black/30 backdrop-blur-xs'
              }`}
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
