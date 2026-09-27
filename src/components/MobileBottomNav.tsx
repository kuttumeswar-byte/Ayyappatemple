import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDonation: () => void;
  onOpenBooking: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenDonation,
}) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '🏛️' },
    { id: 'pooja-services', label: 'Pooja', icon: '🪔' },
    { id: 'timings', label: 'Timings', icon: '⏰' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'contact', label: 'Contact', icon: '📍' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#120803]/98 backdrop-blur-lg border-t-2 border-[#F5BD47]/40 shadow-2xl safe-area-pb"
    >
      <div className="flex items-center justify-around px-1 py-1.5 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-gradient-to-t from-[#2E180A] to-[#1F0F06] text-[#F5BD47] border border-[#F5BD47]/50 shadow-gold-glow scale-105'
                  : 'text-stone-400 hover:text-stone-200 active:scale-95'
              }`}
            >
              <span className="text-lg leading-none mb-1 block">{item.icon}</span>
              <span
                className={`text-[10px] font-sans leading-none tracking-tight truncate ${
                  isActive ? 'font-bold text-[#FFE29A]' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
