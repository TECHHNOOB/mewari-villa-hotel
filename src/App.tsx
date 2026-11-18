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
import { BlogListingPage } from './components/BlogListingPage';
import { SingleBlogPage } from './components/SingleBlogPage';
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
  const [currentView, setCurrentView] = useState<'home' | 'room' | 'gallery' | 'explore' | 'blogs' | 'blog-post'>('home');
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(null);

  // Synchronize view with URL path and hash (supports both https://www.mewarivilla.com/slug and hash fallback for SEO)
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
      const hash = window.location.hash || '';

      // 1. Room page: /room/:id or #/room/:id
      if (pathname.startsWith('/room/')) {
        const roomId = pathname.replace('/room/', '').split('?')[0].trim();
        if (roomId) {
          setActiveRoomId(roomId);
          setActiveBlogSlug(null);
          setCurrentView('room');
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }
      if (hash.startsWith('#/room/')) {
        const roomId = hash.replace('#/room/', '').split('?')[0].trim();
        if (roomId) {
          setActiveRoomId(roomId);
          setActiveBlogSlug(null);
          setCurrentView('room');
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }

      // 2. Gallery: /gallery or #/gallery
      if (pathname === '/gallery' || hash === '#/gallery' || hash.startsWith('#/gallery')) {
        setCurrentView('gallery');
        setActiveBlogSlug(null);
        setActiveRoomId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 3. Explore: /explore or #/explore
      if (pathname === '/explore' || hash === '#/explore' || hash.startsWith('#/explore')) {
        setCurrentView('explore');
        setActiveBlogSlug(null);
        setActiveRoomId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 4. Blogs Listing: /blogs or /blog or #/blogs or #/blog
      if (
        pathname === '/blogs' ||
        pathname === '/blog' ||
        hash === '#/blogs' ||
        hash.startsWith('#/blogs') ||
        hash === '#/blog'
      ) {
        setCurrentView('blogs');
        setActiveBlogSlug(null);
        setActiveRoomId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 5. Single Blog Post with /blog/:slug prefix
      if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '').split('?')[0].trim();
        if (slug) {
          setActiveBlogSlug(slug);
          setActiveRoomId(null);
          setCurrentView('blog-post');
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }
      if (hash.startsWith('#/blog/')) {
        const slug = hash.replace('#/blog/', '').split('?')[0].trim();
        if (slug) {
          setActiveBlogSlug(slug);
          setActiveRoomId(null);
          setCurrentView('blog-post');
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }

      // 6. Direct Root Slug for SEO: https://www.mewarivilla.com/{slug}
      // e.g. /heritage-lake-view-hotel-in-udaipur-mewari-villa
      const cleanSlug = pathname.replace(/^\//, '').split('?')[0].split('#')[0].trim();
      const nonSlugPaths = ['index.html', 'stay', 'about', 'dining', 'contact', 'amenities'];
      if (cleanSlug && !nonSlugPaths.includes(cleanSlug)) {
        setActiveBlogSlug(cleanSlug);
        setActiveRoomId(null);
        setCurrentView('blog-post');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 7. Default: Home
      setCurrentView('home');
      setActiveRoomId(null);
      setActiveBlogSlug(null);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigateToRoom = (roomId: string) => {
    window.history.pushState(null, '', `/room/${roomId}`);
    setActiveRoomId(roomId);
    setActiveBlogSlug(null);
    setCurrentView('room');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToGallery = () => {
    window.history.pushState(null, '', '/gallery');
    setCurrentView('gallery');
    setActiveBlogSlug(null);
    setActiveRoomId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToExplore = () => {
    window.history.pushState(null, '', '/explore');
    setCurrentView('explore');
    setActiveBlogSlug(null);
    setActiveRoomId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToBlogs = () => {
    window.history.pushState(null, '', '/blogs');
    setCurrentView('blogs');
    setActiveBlogSlug(null);
    setActiveRoomId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct SEO clean slug: https://www.mewarivilla.com/{slug}
  const handleNavigateToBlogPost = (slug: string) => {
    window.history.pushState(null, '', `/${slug}`);
    setActiveBlogSlug(slug);
    setActiveRoomId(null);
    setCurrentView('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentView('home');
    setActiveRoomId(null);
    setActiveBlogSlug(null);
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
        onNavigateBlogs={handleNavigateToBlogs}
        isInnerPage={currentView !== 'home'}
      />

      {/* Main Content: Single Room Page vs Gallery Page vs Explore Page vs Blogs vs Home Landing */}
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
        ) : currentView === 'blogs' ? (
          <BlogListingPage
            onBack={handleBackToHome}
            onSelectPost={handleNavigateToBlogPost}
            onOpenEnquiry={handleOpenEnquiry}
          />
        ) : currentView === 'blog-post' && activeBlogSlug ? (
          <SingleBlogPage
            slug={activeBlogSlug}
            onBack={handleNavigateToBlogs}
            onSelectPost={handleNavigateToBlogPost}
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
