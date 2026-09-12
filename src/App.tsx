import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfoBar } from './components/InfoBar';
import { RoomsSection } from './components/RoomsSection';
import { SingleRoomPage } from './components/SingleRoomPage';
import { IntroStory } from './components/IntroStory';
import { LocationHighlight } from './components/LocationHighlight';
import { VillaSuiteFeature } from './components/VillaSuiteFeature';
import { RestaurantSection } from './components/RestaurantSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { GallerySection } from './components/GallerySection';
import { WhyMewariVilla } from './components/WhyMewariVilla';
import { InquirySection } from './components/InquirySection';
import { ContactLocation } from './components/ContactLocation';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { InquiryModal } from './components/InquiryModal';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [preselectedRoom, setPreselectedRoom] = useState<string>('Any Room');
  const [currentView, setCurrentView] = useState<'home' | 'room'>('home');
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  // Synchronize view with URL hash (e.g. #/room/villa-suite-lake-view)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/room/')) {
        const roomId = hash.replace('#/room/', '').split('?')[0].trim();
        if (roomId) {
          setActiveRoomId(roomId);
          setCurrentView('room');
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }
      // If hash is home or in-page anchor (e.g. #stay, #hero-section)
      if (!hash.startsWith('#/room/')) {
        setCurrentView('home');
        setActiveRoomId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateToRoom = (roomId: string) => {
    window.location.hash = `#/room/${roomId}`;
    setActiveRoomId(roomId);
    setCurrentView('room');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    setActiveRoomId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll handler for in-page navigation or opening modal
  const handleOpenEnquiry = (roomName?: string) => {
    if (roomName) {
      setPreselectedRoom(roomName);
    }
    const inquiryEl = document.getElementById('inquiry-section');
    if (inquiryEl) {
      inquiryEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setInquiryModalOpen(true);
    }
  };

  const handleExploreVilla = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreUdaipur = () => {
    const el = document.getElementById('experiences');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col font-body selection:bg-[#C59B51]/20 selection:text-[#171717]">
      {/* 1. Header with Transparent to Solid Scroll Effect */}
      <Header
        onOpenEnquiry={() => handleOpenEnquiry()}
        onNavigateHome={handleBackToHome}
      />

      {/* Main Content: Single Room Page vs Home Landing */}
      <main className="flex-grow">
        {currentView === 'room' && activeRoomId ? (
          <SingleRoomPage
            roomId={activeRoomId}
            onBack={handleBackToHome}
            onSelectRoom={handleNavigateToRoom}
            onOpenEnquiry={handleOpenEnquiry}
          />
        ) : (
          <>
            {/* 2. Hero Section */}
            <Hero
              onOpenEnquiry={() => handleOpenEnquiry()}
              onExploreVilla={handleExploreVilla}
            />

            {/* 2b. Info Bar — check-in, address, phone */}
            <InfoBar />

            {/* 3. Rooms & Suites Slider */}
            <RoomsSection
              onEnquireRoom={(room) => handleOpenEnquiry(room)}
              onViewRoomPage={handleNavigateToRoom}
            />

            {/* 4. Discover Refined Luxury / Intro Story */}
            <IntroStory />

            {/* 5. Location / Lake Pichola Spotlight */}
            <LocationHighlight onExploreUdaipur={handleExploreUdaipur} />

            {/* 5b. Villa Suite Flagship Feature */}
            <VillaSuiteFeature
              onEnquireSuite={() => handleOpenEnquiry('Villa Suite Lake View')}
              onViewRoomPage={handleNavigateToRoom}
            />

            {/* 6. Jalsa Lake View Rooftop Restaurant */}
            <RestaurantSection onEnquireDining={() => handleOpenEnquiry('Dining')} />

            {/* 7. Curated Udaipur Experiences */}
            <ExperiencesSection onEnquireExperience={(exp) => handleOpenEnquiry(exp)} />

            {/* 8. Verified Hotel Amenities */}
            <AmenitiesSection />

            {/* 9. Masonry Editorial Gallery with Lightbox */}
            <GallerySection />

            {/* 10. Why Mewari Villa Minimal Luxury Section */}
            <WhyMewariVilla />

            {/* 11. Core Conversion: Plan Your Stay Inquiry Form */}
            <InquirySection
              preselectedRoom={preselectedRoom}
              onClearPreselectedRoom={() => setPreselectedRoom('Any Room')}
            />

            {/* 12. Contact & Location with Embedded Google Map */}
            <ContactLocation />

            {/* 13. Final Cinematic CTA */}
            <FinalCTA onOpenEnquiry={() => handleOpenEnquiry()} />
          </>
        )}
      </main>

      {/* 14. Luxury Minimal Footer */}
      <Footer />

      {/* 15. Sticky Mobile Conversion Bottom Bar */}
      <StickyMobileBar onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* 16. Global Quick Inquiry Pop-up Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        preselectedRoom={preselectedRoom}
      />
    </div>
  );
}
