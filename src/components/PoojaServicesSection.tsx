import React, { useState } from 'react';
import { getLocalizedPoojas, PoojaItem } from '../data/templeData';
import { useLanguage } from '../contexts/LanguageContext';

interface PoojaServicesSectionProps {
  onSelectPooja: (pooja: PoojaItem) => void;
}

export const PoojaServicesSection: React.FC<PoojaServicesSectionProps> = ({ onSelectPooja }) => {
  const [filter, setFilter] = useState<'all' | 'abhishekam' | 'homam' | 'special' | 'daily'>('all');
  const { t, language } = useLanguage();

  const allPoojas = getLocalizedPoojas(language);
  const filteredPoojas = filter === 'all'
    ? allPoojas
    : allPoojas.filter(p => p.category === filter);

  const filterTabs = [
    { id: 'all', label: language === 'en' ? 'All Holy Sevas' : language === 'hi' ? 'समस्त पवित्र सेवाएँ' : 'அனைத்து சேவைகள்' },
    { id: 'abhishekam', label: language === 'en' ? 'Abhishekam Sevas' : language === 'hi' ? 'अभिषेक सेवाएँ' : 'அபிஷேக சேவைகள்' },
    { id: 'homam', label: language === 'en' ? 'Sacred Homams' : language === 'hi' ? 'पवित्र होमम' : 'ஹோமங்கள்' },
    { id: 'special', label: language === 'en' ? 'Special Occasions' : language === 'hi' ? 'विशेष उत्सव' : 'சிறப்பு வழிபாடுகள்' },
    { id: 'daily', label: language === 'en' ? 'Daily Archana' : language === 'hi' ? 'दैनिक अर्चना' : 'தினசரி அர்ச்சனை' }
  ];

  return (
    <section className="py-24 bg-[#0F0804] border-t border-[#2C180E]" id="pooja-services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#F5BD47] font-devotional text-sm uppercase tracking-widest block mb-2">
            {t('pooja.kicker')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('pooja.title')}
          </h2>
          <div className="w-24 h-1 bg-[#F5BD47] mx-auto mb-4"></div>
          <p className="text-stone-400 font-light">
            {t('pooja.subtitle')}
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F5BD47] text-[#0C0704] font-bold shadow-gold-glow'
                    : 'bg-[#180E08] text-stone-300 hover:text-[#F5BD47] border border-[#F5BD47]/20 hover:border-[#F5BD47]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Pooja Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPoojas.map((pooja) => (
            <div
              key={pooja.id}
              className="p-8 rounded-2xl bg-[#160C06] border border-[#F5BD47]/20 hover:border-[#F5BD47] transition-all flex flex-col justify-between group hover:shadow-gold-glow"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#F5BD47]/10 text-[#F5BD47] rounded font-medium">
                    {pooja.badge}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#F5BD47] tabular-nums">
                    ₹ {pooja.price.toLocaleString()}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[#FFE29A] transition-colors">
                  {pooja.name}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-4 font-light">
                  {pooja.description}
                </p>
                <div className="text-xs text-stone-500 mb-6 flex items-center gap-2">
                  <span className="text-[#F5BD47]">⏰</span>
                  <span>{pooja.time}</span>
                </div>
              </div>
              <button
                onClick={() => onSelectPooja(pooja)}
                className="w-full py-3 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-semibold text-sm tracking-wide transition-colors cursor-pointer"
              >
                {t('pooja.bookNow')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
