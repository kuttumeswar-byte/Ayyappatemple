import React, { useState, useRef, useEffect } from 'react';
import { useTempleBell } from '../utils/audioBell';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDonation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenDonation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { isPlaying: isBellPlaying, toggle: toggleBell } = useTempleBell();
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; nativeLabel: string; englishLabel: string }[] = [
    { code: 'en', nativeLabel: 'English', englishLabel: 'English' },
    { code: 'hi', nativeLabel: 'हिन्दी', englishLabel: 'Hindi' },
    { code: 'ta', nativeLabel: 'தமிழ்', englishLabel: 'Tamil' },
  ];

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: '🏠', desc: 'Temple Sanctum & Darshan' },
    { id: 'about', label: t('nav.about'), icon: '🏛️', desc: 'Sthala Puranam & 18 Steps' },
    { id: 'pooja-services', label: t('nav.pooja'), icon: '🪔', desc: 'Book Abhishekam & Archana' },
    { id: 'timings', label: t('nav.timings'), icon: '⏰', desc: 'Daily Schedule & Festivals' },
    { id: 'gallery', label: t('nav.gallery'), icon: '🖼️', desc: 'Darshan Photos & Media' },
    { id: 'contact', label: t('nav.contact'), icon: '📍', desc: 'Temple Location, Route & Info' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLanguageObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 bg-[#0C0704]/98 backdrop-blur-md border-b border-[#F5BD47]/30 transition-all duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-4 lg:px-6 py-2 flex items-center justify-between gap-2">
        {/* Temple Branding & Sacred Logo (Compact on mobile so it never pushes other buttons) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none min-w-0 shrink"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#F5BD47]/50 flex items-center justify-center bg-gradient-to-b from-[#2E180A] to-[#120703] group-hover:border-[#F5BD47] transition-colors shadow-gold-glow shrink-0">
            {/* Gopuram Sacred Temple Icon */}
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#F5BD47]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L10 5H14L12 2ZM8.5 6L7 9H17L15.5 6H8.5ZM6 10L5 14H19L18 10H6ZM4 15L3 20H21L20 15H4ZM2 21V22H22V21H2Z"></path>
              <path d="M11 16H13V20H11V16Z" fill="#0C0704" opacity="0.6"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-cinzel text-xs sm:text-base xl:text-lg 2xl:text-xl font-bold tracking-wider text-[#F5BD47] group-hover:text-[#FFE29A] transition-colors leading-tight truncate">
              {t('temple.name')}
            </span>
            <span className="hidden sm:block text-[9px] xl:text-[10px] font-sans tracking-[0.14em] uppercase text-stone-400 font-medium truncate">
              {t('temple.motto')}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Menu (xl screens) */}
        <nav className="hidden xl:flex items-center gap-2.5 xl:gap-3 2xl:gap-6 font-sans text-xs xl:text-[13px] 2xl:text-sm font-medium tracking-wide">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer transition-colors relative py-1 px-1.5 xl:px-2 whitespace-nowrap ${
                  isActive
                    ? "text-[#F5BD47] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#F5BD47]"
                    : "text-stone-300 hover:text-[#F5BD47]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone: High Priority Menu + Language + Bell + Donate */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile High-Visibility Hamburger Menu Button (ALWAYS ON RIGHT) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#F5BD47] to-[#E5A93C] text-[#0C0704] font-bold text-xs uppercase tracking-wider shadow-gold-glow cursor-pointer transition-all active:scale-95 shrink-0 border border-[#FFE29A]"
            aria-label="Open Navigation Menu"
            title="Open Pages Menu"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              ) : (
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              )}
            </svg>
            <span className="font-extrabold text-[11px]">{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
          </button>

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg border border-[#F5BD47]/40 bg-[#160B05] hover:bg-[#2A1608] hover:border-[#F5BD47] text-stone-200 hover:text-[#F5BD47] text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm select-none shrink-0"
              title="Change Language / भाषा बदलें / மொழியை மாற்றவும்"
              aria-label="Change Language"
            >
              <span className="text-sm leading-none">🌐</span>
              <span className="font-semibold text-xs text-[#FFE29A] hidden xs:inline sm:inline">
                {currentLanguageObj.nativeLabel}
              </span>
              <svg
                className={`w-3 h-3 text-[#F5BD47] transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Language Dropdown Menu */}
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#140B06] border border-[#F5BD47]/40 shadow-gold-glow-lg py-1.5 z-50 animate-in fade-in duration-150 backdrop-blur-md">
                <div className="px-3.5 py-1.5 text-[10px] uppercase tracking-wider text-stone-400 font-semibold border-b border-stone-800">
                  {t('header.selectLanguage')}
                </div>
                {languages.map((lang) => {
                  const isCurrent = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#2E180A] text-[#F5BD47] font-bold border-l-2 border-[#F5BD47]'
                          : 'text-stone-300 hover:bg-[#1F1008] hover:text-[#FFE29A]'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-[13px]">{lang.nativeLabel}</span>
                        <span className="text-[10px] text-stone-400">{lang.englishLabel}</span>
                      </div>
                      {isCurrent && (
                        <span className="text-[#F5BD47] font-bold text-sm">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Temple Bell Toggle (Desktop) */}
          <button
            onClick={toggleBell}
            title={isBellPlaying ? "Temple Bell is Ringing Continuous — Click to Mute" : "Ring Sacred Temple Bell (Continuous)"}
            className={`hidden sm:inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all select-none cursor-pointer ${
              isBellPlaying
                ? 'border-[#F5BD47] bg-[#2A170A] text-[#FFE29A] shadow-gold-glow ring-2 ring-[#F5BD47]/40'
                : 'border-[#F5BD47]/30 bg-[#1A0E06] hover:bg-[#2A170A] text-[#F5BD47]'
            }`}
          >
            <span className={`text-sm leading-none transition-transform inline-block ${isBellPlaying ? 'animate-bounce text-[#FFE29A]' : ''}`}>
              🔔
            </span>
            <span className="whitespace-nowrap">
              {isBellPlaying ? 'Mute' : 'Bell'}
            </span>
          </button>
        </div>
      </div>

      {/* Horizontal Mobile Navigation Chips / Scrollbar (Always visible on mobile right below header) */}
      <div className="xl:hidden bg-[#120904] border-t border-[#F5BD47]/20 px-2 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#F5BD47] text-[#0C0704] font-bold shadow-gold-glow'
                  : 'bg-[#1C0E07] text-stone-300 border border-[#F5BD47]/30 hover:border-[#F5BD47]'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Full-Screen Mobile Drawer Modal when MENU is tapped */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[52px] bg-black/95 backdrop-blur-xl border-t border-[#F5BD47]/40 p-4 sm:p-6 overflow-y-auto z-50 animate-in fade-in duration-200">
          <div className="max-w-md mx-auto space-y-4 pb-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5BD47]/20">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#F5BD47] block">
                  Select Page To Visit
                </span>
                <p className="text-xs text-stone-400">All temple services &amp; darshan sections</p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1 rounded-lg bg-[#2A1509] text-stone-300 font-bold text-xs border border-[#F5BD47]/30"
              >
                ✕ Close
              </button>
            </div>

            {/* Navigation Cards */}
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#381B0C] to-[#1C0D06] border-[#F5BD47] shadow-gold-glow ring-2 ring-[#F5BD47]/50'
                        : 'bg-[#180C06] border-stone-800 hover:border-[#F5BD47]/40 hover:bg-[#221008]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl p-2 rounded-xl bg-[#2A1408] border border-[#F5BD47]/30 flex items-center justify-center shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <h4
                          className={`font-serif text-base font-bold ${
                            isActive ? 'text-[#FFE29A]' : 'text-stone-100 group-hover:text-[#FFE29A]'
                          }`}
                        >
                          {item.label}
                        </h4>
                        <p className="text-xs text-stone-400">{item.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isActive ? (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5BD47] text-[#0C0704] font-bold">
                          Active
                        </span>
                      ) : (
                        <span className="text-stone-500 group-hover:text-[#F5BD47] text-lg font-bold">
                          →
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-3 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonation();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5BD47] to-[#E5A93C] text-[#0C0704] font-bold text-xs uppercase tracking-wider shadow-gold-glow cursor-pointer text-center"
              >
                🙏 {t('header.contributeAnnadanam')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
