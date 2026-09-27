import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { SacredChantRibbon } from '../components/SacredChantRibbon';
import { TimingsSection } from '../components/TimingsSection';
import { AboutHeritageSection } from '../components/AboutHeritageSection';
import { PoojaItem } from '../data/templeData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
  onSelectPooja: (pooja: PoojaItem) => void;
  onOpenDonation: () => void;
  onOpen18Steps: () => void;
  onOpenVratamGuide: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenDonation,
  onOpen18Steps,
  onOpenVratamGuide,
}) => {
  return (
    <div>
      {/* Hero Section with Quick Access Navigation to separate pages */}
      <HeroSection
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
        onOpenDonation={onOpenDonation}
      />

      {/* Sacred Chant Ribbon (✦ || Swamiye Saranam Ayyappa || ✦) */}
      <SacredChantRibbon />

      {/* Daily Pooja & Darshan Timings Preview */}
      <TimingsSection />

      {/* Sacred Heritage & The 18 Steps Overview */}
      <AboutHeritageSection
        onOpen18Steps={onOpen18Steps}
        onOpenVratamGuide={onOpenVratamGuide}
      />

      {/* Quick Navigation Cards Banner to Inner Pages */}
      <section className="py-16 bg-[#080402] border-t border-[#2C180E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[#F5BD47] font-devotional text-xs uppercase tracking-widest block mb-1">
              Explore The Temple Portal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Discover All Sacred Sections
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { id: 'about', label: 'About Temple', icon: '🏛️' },
              { id: 'pooja-services', label: 'Pooja Booking', icon: '🪔' },
              { id: 'timings', label: 'Darshan Hours', icon: '⏰' },
              { id: 'gallery', label: 'Photo Gallery', icon: '🖼️' },
              { id: 'contact', label: 'Contact & Map', icon: '📍' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate(p.id)}
                className="p-4 rounded-xl bg-[#140B05] border border-[#F5BD47]/20 hover:border-[#F5BD47] hover:bg-[#1C0E07] text-center transition-all cursor-pointer group"
              >
                <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                  {p.icon}
                </span>
                <span className="font-serif text-xs font-bold text-stone-300 group-hover:text-[#F5BD47] transition-colors">
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
