/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PoojaServicesPage } from './pages/PoojaServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { TimingsPage } from './pages/TimingsPage';
import { PoojaBookingModal } from './components/PoojaBookingModal';
import { DonationModal } from './components/DonationModal';
import { EighteenStepsModal } from './components/EighteenStepsModal';
import { MandalaVratamModal } from './components/MandalaVratamModal';
import { PoojaItem, TEMPLE_POOJAS } from './data/templeData';
import { useTempleBell, autoStartTempleBellOnVisit } from './utils/audioBell';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  const getInitialPage = (): string => {
    const hash = window.location.hash.replace('#', '');
    const validPages = [
      'home',
      'about',
      'pooja-services',
      'gallery',
      'contact',
      'timings',
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedPooja, setSelectedPooja] = useState<PoojaItem | null>(null);
  const [donationModalOpen, setDonationModalOpen] = useState<boolean>(false);
  const [eighteenStepsOpen, setEighteenStepsOpen] = useState<boolean>(false);
  const [vratamModalOpen, setVratamModalOpen] = useState<boolean>(false);
  const { isPlaying: isBellPlaying, toggle: toggleBell } = useTempleBell();

  // Automate temple bell ringing on initial visit
  useEffect(() => {
    autoStartTempleBellOnVisit();
  }, []);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPooja = (pooja: PoojaItem) => {
    setSelectedPooja(pooja);
    setBookingModalOpen(true);
  };

  const handleOpenBookingDefault = () => {
    setSelectedPooja(TEMPLE_POOJAS[0]); // default to Neyyabhishekam
    setBookingModalOpen(true);
  };

  // Render dedicated separated page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBookingDefault}
            onOpenDonation={() => setDonationModalOpen(true)}
          />
        );
      case 'pooja-services':
        return (
          <PoojaServicesPage
            onNavigate={handleNavigate}
            onSelectPooja={handleSelectPooja}
            onOpenDonation={() => setDonationModalOpen(true)}
          />
        );
      case 'gallery':
        return <GalleryPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'timings':
        return (
          <TimingsPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBookingDefault}
          />
        );
      case 'home':
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBookingDefault}
            onSelectPooja={handleSelectPooja}
            onOpenDonation={() => setDonationModalOpen(true)}
            onOpen18Steps={() => setEighteenStepsOpen(true)}
            onOpenVratamGuide={() => setVratamModalOpen(true)}
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#0C0704] text-stone-200 font-sans antialiased overflow-x-hidden selection:bg-[#F5BD47] selection:text-[#0C0704] flex flex-col justify-between pb-16 xl:pb-0">
          {/* Main Sticky Header */}
          <Header
            activeTab={currentPage}
            setActiveTab={handleNavigate}
            onOpenDonation={() => setDonationModalOpen(true)}
          />

          {/* Main Page Content (Opens each screen separately) */}
          <main className="flex-1">{renderCurrentPage()}</main>

          {/* Main Global Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenDonation={() => setDonationModalOpen(true)}
            onOpenVratamGuide={() => setVratamModalOpen(true)}
          />

          {/* Mobile Bottom Navigation Bar (Always Visible on Mobile) */}
          <MobileBottomNav
            activeTab={currentPage}
            setActiveTab={handleNavigate}
            onOpenDonation={() => setDonationModalOpen(true)}
            onOpenBooking={handleOpenBookingDefault}
          />

          {/* Floating Sacred Temple Bell Quick Action */}
          <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
            {isBellPlaying && (
              <button
                onClick={toggleBell}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#180E08]/95 border border-[#F5BD47] text-[#FFE29A] text-xs font-medium shadow-gold-glow animate-pulse cursor-pointer backdrop-blur-md"
                title="Temple Bell Ringing Continuous — Click to Mute"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Bell Ringing Continuous • Click to Mute</span>
              </button>
            )}
            <button
              onClick={toggleBell}
              title={isBellPlaying ? "Temple Bell is Ringing Continuous — Click to Mute" : "Ring Sacred Temple Bell (Continuous)"}
              className={`relative p-3 sm:p-3.5 rounded-full bg-gradient-to-b from-[#2E180A] to-[#120703] border transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-110 shadow-2xl ${
                isBellPlaying
                  ? 'border-[#F5BD47] text-[#FFE29A] shadow-gold-glow-lg ring-4 ring-[#F5BD47]/30 scale-105'
                  : 'border-[#F5BD47]/60 text-[#F5BD47] shadow-gold-glow'
              }`}
            >
              {isBellPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5BD47] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-[#0C0704]"></span>
                </span>
              )}
              <span className={`text-xl sm:text-2xl transition-transform ${isBellPlaying ? 'animate-bounce' : ''}`}>
                🔔
              </span>
            </button>
          </div>

          {/* Interactive Global Modals */}
          <PoojaBookingModal
            pooja={selectedPooja}
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
          />

          <DonationModal
            isOpen={donationModalOpen}
            onClose={() => setDonationModalOpen(false)}
          />

          <EighteenStepsModal
            isOpen={eighteenStepsOpen}
            onClose={() => setEighteenStepsOpen(false)}
          />

          <MandalaVratamModal
            isOpen={vratamModalOpen}
            onClose={() => setVratamModalOpen(false)}
          />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}
