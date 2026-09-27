import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenDonation: () => void;
}

const DEFAULT_CDN_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDAVbKRw33rJsA4A4clF2959ykkUUQ9Ez2G4ThGIl3G0VVu8JLuFSd0v4M7hL5Bdxt718jQTdRZSZoVziLWdJnqPusqapVjWWb7JhdROeZGzr8inkHUKlG_00HnXIAHgQSNfgoeXWKMGaQKghIil-EGHVV8ovPS5x1VYPwqRdlAY0kTJxNFMCLoUvlMv5ZGcB1empeScFSGpWmtIX9xnP07e5Nm6lIegUizIYqmPEftvFX-oqKNiFhQyiu-MzeYuurcLA';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenDonation,
}) => {
  const { t, language } = useLanguage();
  // Checks for local public image first (/hero-bg.png then /hero-bg.jpg), then falls back to CDN image
  const [attemptIndex, setAttemptIndex] = useState<number>(0);
  const imageSources = ['/hero-bg.png', '/hero-bg.jpg', DEFAULT_CDN_IMAGE];
  const currentSrc = imageSources[attemptIndex] || DEFAULT_CDN_IMAGE;

  const handleImageError = () => {
    if (attemptIndex < imageSources.length - 1) {
      setAttemptIndex((prev) => prev + 1);
    }
  };

  return (
    <section className="relative w-full min-h-[920px] flex flex-col justify-between overflow-hidden bg-[#0C0704]" id="home">
      {/* Hero Background Image Layer with Atmospheric Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          alt="Sri Ayyapa Temple Sanctum and Devotees"
          className="w-full h-full object-cover object-center filter brightness-[1.18] contrast-[1.08] saturate-[1.12]"
          src={currentSrc}
          referrerPolicy="no-referrer"
          onError={handleImageError}
        />
        {/* Divine Golden Radial Glow over the Deity idol area (center/right) to highlight and illuminate Lord Ayyappa */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(255,235,170,0.22)_0%,rgba(245,189,71,0.12)_35%,transparent_65%)] pointer-events-none mix-blend-screen"></div>

        {/* Text readability gradient strictly on the left side where headings reside */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0704]/90 via-[#0C0704]/45 via-45% to-transparent pointer-events-none"></div>

        {/* Bottom subtle fade to seamlessly transition into cards and chant ribbon */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0704] via-[#0C0704]/20 via-20% to-transparent pointer-events-none"></div>
      </div>

      {/* Hero Content Overlay (Upper/Middle) */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-6 md:px-12 pt-16 md:pt-24 w-full">
        <div className="max-w-2xl">
          {/* Sacred Chant Header */}
          <div className="flex items-center gap-3 text-[#F5BD47] mb-6">
            <span className="font-devotional text-sm md:text-base font-semibold tracking-[0.25em] text-shadow-gold">
              {t('hero.chant')}
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#F5BD47] to-transparent"></div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.18] mb-6 text-shadow-deep">
            <span className="font-serif block text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-200 mb-2">
              {t('hero.welcome')}
            </span>
            <span className="font-samarkan font-normal tracking-wide inline-block">
              <span className="text-[#F5BD47] text-shadow-gold">{t('hero.templeNameGold')}</span>
              <span className="text-white">{t('hero.templeNameRest')}</span>
            </span>
          </h1>

          {/* Subtitle & Motto */}
          <p className="text-stone-200 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10 text-shadow-deep">
            {t('hero.subtitle')}
          </p>

          {/* CTAs: Donate Now + Book Pooja */}
          <div className="flex flex-wrap items-center gap-3.5 mb-6">
            <button
              onClick={onOpenDonation}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-[#F5BD47] hover:bg-[#ffd56b] text-[#0C0704] font-bold text-sm sm:text-base shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform hover:scale-[1.03] duration-200 cursor-pointer border border-[#F5BD47]"
              title="Contribute to Temple Annadanam & Trust"
            >
              <span>{t('hero.donateCta')}</span>
              <span className="w-5 h-5 rounded-full bg-[#0C0704] text-[#F5BD47] flex items-center justify-center">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                </svg>
              </span>
            </button>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F0E06]/90 hover:bg-[#2E160A] text-[#FFE29A] hover:text-white font-bold text-sm sm:text-base border border-[#F5BD47]/60 shadow-md transition-all cursor-pointer"
            >
              <span>🪔 Book Pooja</span>
            </button>
          </div>

          {/* Quick Page Jump Pills for Mobile Viewers */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-[11px] uppercase tracking-wider text-[#F5BD47] font-semibold block w-full">
              Explore Temple Pages:
            </span>
            {[
              { id: 'about', label: '🏛️ About Temple' },
              { id: 'pooja-services', label: '🪔 Pooja Services' },
              { id: 'timings', label: '⏰ Darshan Timings' },
              { id: 'gallery', label: '🖼️ Photo Gallery' },
              { id: 'contact', label: '📍 Contact & Route' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate(p.id)}
                className="px-3 py-1.5 rounded-xl bg-[#140A04]/90 hover:bg-[#2A1408] border border-[#F5BD47]/40 hover:border-[#F5BD47] text-stone-200 hover:text-[#FFE29A] text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Feature Cards Grid (Bottom Anchored in Hero) */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-6 md:px-12 pb-10 pt-16 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {/* Card 1: Temple Timings */}
          <div
            onClick={() => onNavigate('timings')}
            className="group relative rounded-2xl p-6 bg-[#160B05]/80 backdrop-blur-md border border-[#F5BD47]/30 hover:border-[#F5BD47] transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow flex flex-col justify-between min-h-[170px] cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 text-[#F5BD47] flex items-center justify-center">
                {/* Temple Icon */}
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L9 6H15L12 2ZM6 8L4 12H20L18 8H6ZM3 14L2 19H22L21 14H3ZM10 16H14V19H10V16Z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5BD47] group-hover:text-[#FFE29A] transition-colors mb-1">
                {t('hero.card1.title')}
              </h3>
              <p className="text-xs text-stone-300 font-light">{t('hero.card1.subtitle')}</p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 rounded-full bg-[#F5BD47]/20 group-hover:bg-[#F5BD47] text-[#F5BD47] group-hover:text-[#0C0704] flex items-center justify-center transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: Pooja Services */}
          <div
            onClick={() => onNavigate('pooja-services')}
            className="group relative rounded-2xl p-6 bg-[#160B05]/80 backdrop-blur-md border border-[#F5BD47]/30 hover:border-[#F5BD47] transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow flex flex-col justify-between min-h-[170px] cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 text-[#F5BD47] flex items-center justify-center">
                {/* Sacred Lotus Icon */}
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3C11.5 5 10 7.5 7.5 9C9.5 9.5 11 11 12 13C13 11 14.5 9.5 16.5 9C14 7.5 12.5 5 12 3ZM5 11C4 13 4 16 7 18C8.5 17 10 15 10.5 13.5C8.5 13.5 6.5 12.5 5 11ZM19 11C17.5 12.5 15.5 13.5 13.5 13.5C14 15 15.5 17 17 18C20 16 20 13 19 11ZM12 15C10 16.5 8 18 8 20H16C16 18 14 16.5 12 15Z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5BD47] group-hover:text-[#FFE29A] transition-colors mb-1">
                {t('hero.card2.title')}
              </h3>
              <p className="text-xs text-stone-300 font-light">{t('hero.card2.subtitle')}</p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 rounded-full bg-[#F5BD47]/20 group-hover:bg-[#F5BD47] text-[#F5BD47] group-hover:text-[#0C0704] flex items-center justify-center transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3: Sacred Gallery */}
          <div
            onClick={() => onNavigate('gallery')}
            className="group relative rounded-2xl p-6 bg-[#160B05]/80 backdrop-blur-md border border-[#F5BD47]/30 hover:border-[#F5BD47] transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow flex flex-col justify-between min-h-[170px] cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 text-[#F5BD47] flex items-center justify-center">
                {/* Image Gallery Icon */}
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5BD47] group-hover:text-[#FFE29A] transition-colors mb-1">
                {t('nav.gallery')}
              </h3>
              <p className="text-xs text-stone-300 font-light">{language === 'en' ? 'Darshan, Aarthi & Sanctum' : language === 'hi' ? 'दर्शन, आरती व गर्भगृह' : 'தரிசனம், ஆரத்தி & சந்நிதி'}</p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 rounded-full bg-[#F5BD47]/20 group-hover:bg-[#F5BD47] text-[#F5BD47] group-hover:text-[#0C0704] flex items-center justify-center transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 4: Donate to Temple */}
          <div
            onClick={onOpenDonation}
            className="group relative rounded-2xl p-6 bg-[#160B05]/80 backdrop-blur-md border border-[#F5BD47]/30 hover:border-[#F5BD47] transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow flex flex-col justify-between min-h-[170px] cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 text-[#F5BD47] flex items-center justify-center">
                {/* Giving Hand / Coin Icon */}
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM6 8C4.9 8 4 8.9 4 10C4 11.1 4.9 12 6 12C7.1 12 8 11.1 8 10C8 8.9 7.1 8 6 8ZM18 8C16.9 8 16 8.9 16 10C16 11.1 16.9 12 18 12C19.1 12 20 11.1 20 10C20 8.9 19.1 8 18 8ZM12 8C10.62 8 9.5 9.12 9.5 10.5C9.5 11.88 10.62 13 12 13C13.38 13 14.5 11.88 14.5 10.5C14.5 9.12 13.38 8 12 8ZM3 15V20H21V15C21 13.34 17.66 12.5 12 12.5C6.34 12.5 3 13.34 3 15Z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5BD47] group-hover:text-[#FFE29A] transition-colors mb-1">
                {t('hero.card5.title')}
              </h3>
              <p className="text-xs text-stone-300 font-light">{t('hero.card5.subtitle')}</p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 rounded-full bg-[#F5BD47]/20 group-hover:bg-[#F5BD47] text-[#F5BD47] group-hover:text-[#0C0704] flex items-center justify-center transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 5: About Temple */}
          <div
            onClick={() => onNavigate('about')}
            className="group relative rounded-2xl p-6 bg-[#160B05]/80 backdrop-blur-md border border-[#F5BD47]/30 hover:border-[#F5BD47] transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow flex flex-col justify-between min-h-[170px] cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 text-[#F5BD47] flex items-center justify-center">
                {/* 18 Steps / Heritage Icon */}
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5BD47] group-hover:text-[#FFE29A] transition-colors mb-1">
                {t('nav.about')}
              </h3>
              <p className="text-xs text-stone-300 font-light">{language === 'en' ? 'Sacred Heritage & Dharma' : language === 'hi' ? 'पवित्र परंपरा व धर्म' : 'புனித பாரம்பரியமும் தர்மமும்'}</p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 rounded-full bg-[#F5BD47]/20 group-hover:bg-[#F5BD47] text-[#F5BD47] group-hover:text-[#0C0704] flex items-center justify-center transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
