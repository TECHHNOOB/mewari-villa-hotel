import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfoBar } from './components/InfoBar';
import { IntroStory } from './components/IntroStory';
import { RoomsSection } from './components/RoomsSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { SpacesShowcase } from './components/SpacesShowcase';
import { SingleRoomPage } from './components/SingleRoomPage';
import { VillaSuiteFeature } from './components/VillaSuiteFeature';
import { RestaurantSection } from './components/RestaurantSection';
import { GalleryPage } from './components/GalleryPage';
import { ExplorePage } from './components/ExplorePage';
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
  const [currentView, setCurrentView] = useState<'home' | 'room' | 'gallery' | 'explore'>('home');
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  // Synchronize view with URL hash (e.g. #/room/villa-suite-lake-view, #/gallery, #/explore)
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
      if (hash === '#/gallery' || hash.startsWith('#/gallery')) {
        setCurrentView('gallery');
        setActiveRoomId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (hash === '#/explore' || hash.startsWith('#/explore')) {
        setCurrentView('explore');
        setActiveRoomId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      // If hash is home or in-page anchor (e.g. #stay, #hero-section)
      if (!hash.startsWith('#/room/') && !hash.startsWith('#/gallery') && !hash.startsWith('#/explore')) {
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

  const handleNavigateToGallery = () => {
    window.location.hash = '#/gallery';
    setCurrentView('gallery');
    setActiveRoomId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToExplore = () => {
    window.location.hash = '#/explore';
    setCurrentView('explore');
    setActiveRoomId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    setActiveRoomId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open popup modal on all Book Stay / Reserve clicks
  const handleOpenEnquiry = (roomName?: string) => {
    if (roomName) {
      setPreselectedRoom(roomName);
    } else {
      setPreselectedRoom('Any Room');
    }
    setInquiryModalOpen(true);
  };

  const handleExploreVilla = () => {
    const el = document.getElementById('stay');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-body selection:bg-[#9E763B]/20 selection:text-[#1C1917]">
      {/* 1. Header with Transparent to Solid Scroll Effect */}
      <Header
        onOpenEnquiry={() => handleOpenEnquiry()}
        onNavigateHome={handleBackToHome}
        onNavigateGallery={handleNavigateToGallery}
        onNavigateExplore={handleNavigateToExplore}
        isInnerPage={currentView !== 'home'}
      />

      {/* Main Content: Single Room Page vs Gallery Page vs Explore Page vs Home Landing */}
      <main className="flex-grow">
        {currentView === 'room' && activeRoomId ? (
          <SingleRoomPage
            roomId={activeRoomId}
            onBack={handleBackToHome}
            onSelectRoom={handleNavigateToRoom}
            onOpenEnquiry={handleOpenEnquiry}
          />
        ) : currentView === 'gallery' ? (
          <GalleryPage
            onBack={handleBackToHome}
            onOpenEnquiry={handleOpenEnquiry}
          />
        ) : currentView === 'explore' ? (
          <ExplorePage
            onBack={handleBackToHome}
            onOpenEnquiry={handleOpenEnquiry}
          />
        ) : (
          <>
            {/* 2. Hero Section (Grand Edge-to-Edge Editorial) */}
            <Hero
              onOpenEnquiry={() => handleOpenEnquiry()}
              onExploreVilla={handleExploreVilla}
            />

            {/* 2b. Info Bar — check-in, address, phone */}
            <InfoBar />

            {/* 3. About: Redefining Hospitality with Timeless Elegance & Stats Divider */}
            <IntroStory />

            {/* 4. Designed Spaces for Refined Stays (2x2 Luxury Grid) */}
            <RoomsSection
              onEnquireRoom={(room) => handleOpenEnquiry(room)}
              onViewRoomPage={handleNavigateToRoom}
            />

            {/* 5. Facilities Available to Guests (Minimalist Luxury Icons) */}
            <AmenitiesSection />

            {/* 6. Essential Spaces to Enjoy at Mewari Villa (Tabbed Showcase) */}
            <SpacesShowcase onEnquire={(space) => handleOpenEnquiry(space)} />

            {/* 7. Villa Suite Flagship Feature */}
            <VillaSuiteFeature
              onEnquireSuite={() => handleOpenEnquiry('Villa Suite Lake View')}
              onViewRoomPage={handleNavigateToRoom}
            />

            {/* 8. Jalsa Lake View Rooftop Restaurant */}
            <RestaurantSection onEnquireDining={() => handleOpenEnquiry('Dining')} />

            {/* 9. Why Mewari Villa Minimal Luxury Section */}
            <WhyMewariVilla />

            {/* 10. Core Conversion: Plan Your Stay Inquiry Form */}
            <InquirySection
              preselectedRoom={preselectedRoom}
              onClearPreselectedRoom={() => setPreselectedRoom('Any Room')}
            />

            {/* 11. Contact & Location with Embedded Google Map */}
            <ContactLocation />

            {/* 12. Final Cinematic CTA */}
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
