import React, { useState } from 'react';
import { useTempleBell } from '../utils/audioBell';
import { useLanguage } from '../contexts/LanguageContext';

export const SacredChantRibbon: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const { isPlaying: isBellPlaying, toggle: toggleBell } = useTempleBell();
  const { t } = useLanguage();

  const handleChantClick = () => {
    toggleBell();
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <section className="relative parchment-pattern text-[#3F200A] py-5 border-y-2 border-[#D4AF37] shadow-inner select-none overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-6 flex items-center justify-center text-center">
        {/* Left Traditional Brass Filigree Motif */}
        <div className="hidden sm:flex items-center gap-3 text-[#9A6B22] mr-4">
          <svg className="w-6 h-6 rotate-45" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z"></path>
          </svg>
          <span className="text-2xl font-serif tracking-tighter">|||</span>
        </div>

        {/* Sacred Maha Mantra Center (Interactive for devotees) */}
        <button
          onClick={handleChantClick}
          title={isBellPlaying ? "Temple Bell is Ringing — Click to Mute" : "Click to start continuous sacred temple bell"}
          className={`flex items-center gap-4 group cursor-pointer focus:outline-none transition-transform duration-200 ${
            clicked ? 'scale-105' : 'hover:scale-[1.02]'
          }`}
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-[#4A240A] drop-shadow-sm group-hover:text-[#6a340f] transition-colors flex items-center gap-3">
            <span>✦ || {t('ribbon.chant1')} || ✦</span>
            {isBellPlaying && (
              <span className="inline-block text-xl animate-bounce" title="Bell Ringing Continuous">🔔</span>
            )}
          </h2>
        </button>

        {/* Right Traditional Brass Filigree Motif */}
        <div className="hidden sm:flex items-center gap-3 text-[#9A6B22] ml-4">
          <span className="text-2xl font-serif tracking-tighter">|||</span>
          <svg className="w-6 h-6 -rotate-45" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};
