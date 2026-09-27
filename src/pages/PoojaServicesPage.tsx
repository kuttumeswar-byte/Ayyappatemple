import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { getLocalizedPoojas, PoojaItem } from '../data/templeData';
import { useLanguage } from '../contexts/LanguageContext';

interface PoojaServicesPageProps {
  onNavigate: (page: string) => void;
  onSelectPooja: (pooja: PoojaItem) => void;
  onOpenDonation: () => void;
}

export const PoojaServicesPage: React.FC<PoojaServicesPageProps> = ({
  onNavigate,
  onSelectPooja,
  onOpenDonation,
}) => {
  const [filter, setFilter] = useState<'all' | 'abhishekam' | 'homam' | 'special' | 'daily'>('all');
  const { t, language } = useLanguage();

  const allPoojas = getLocalizedPoojas(language);
  const filteredPoojas = filter === 'all'
    ? allPoojas
    : allPoojas.filter((p) => p.category === filter);

  const filterTabs = [
    { id: 'all', label: language === 'en' ? 'All Holy Sevas' : language === 'hi' ? 'समस्त पवित्र सेवाएँ' : 'அனைத்து சேவைகள்' },
    { id: 'abhishekam', label: language === 'en' ? 'Abhishekam Sevas' : language === 'hi' ? 'अभिषेक सेवाएँ' : 'அபிஷேக சேவைகள்' },
    { id: 'homam', label: language === 'en' ? 'Sacred Homams' : language === 'hi' ? 'पवित्र होमम' : 'ஹோமங்கள்' },
    { id: 'special', label: language === 'en' ? 'Special Occasions' : language === 'hi' ? 'विशेष उत्सव' : 'சிறப்பு வழிபாடுகள்' },
    { id: 'daily', label: language === 'en' ? 'Daily Archana' : language === 'hi' ? 'दैनिक अर्चना' : 'தினசரி அர்ச்சனை' },
  ];

  return (
    <div className="min-h-screen bg-[#0C0704] text-stone-200">
      <PageHeader
        title={t('pooja.title')}
        subtitle={t('pooja.subtitle')}
        kicker={t('pooja.kicker')}
        breadcrumb={t('nav.pooja')}
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F5BD47] text-[#0C0704] shadow-gold-glow font-bold'
                    : 'bg-[#180E08] text-stone-300 hover:text-[#F5BD47] border border-[#F5BD47]/20 hover:border-[#F5BD47]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Poojas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoojas.map((pooja) => (
            <div
              key={pooja.id}
              className="p-8 rounded-3xl bg-[#160C06] border border-[#F5BD47]/20 hover:border-[#F5BD47] transition-all flex flex-col justify-between group hover:shadow-gold-glow"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[11px] uppercase tracking-widest px-3 py-1 bg-[#F5BD47]/10 text-[#F5BD47] rounded font-semibold border border-[#F5BD47]/20">
                    {pooja.badge}
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#F5BD47]">
                    ₹ {pooja.price.toLocaleString()}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[#FFE29A] transition-colors">
                  {pooja.name}
                </h3>

                <p className="text-stone-300 text-sm leading-relaxed mb-4 font-light">
                  {pooja.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/15 mb-4 text-xs">
                  <span className="text-stone-400 block mb-1 font-semibold uppercase tracking-wider text-[10px] text-[#F5BD47]">
                    Spiritual Benefit:
                  </span>
                  <p className="text-stone-300 font-light">{pooja.significance}</p>
                </div>

                <div className="space-y-1.5 mb-6 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="text-[#F5BD47]">⏰</span>
                    <span><strong>Timing:</strong> {pooja.time}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <span className="text-[#F5BD47]">🎁</span>
                    <span><strong>Prasadam:</strong> {pooja.prasadamIncludes.join(', ')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectPooja(pooja)}
                className="w-full py-3.5 rounded-xl bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Book Seva Now
              </button>
            </div>
          ))}
        </div>

        {/* Annadanam Donation Callout */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#2A1608] via-[#1A0E06] to-[#0C0704] border border-[#F5BD47]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold block mb-1">
              Sacred Pilgrim Feeding
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Contribute to Daily Nitya Annadanam
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
              Feed visiting pilgrims and devotees. Annadanam is the highest offering to Lord Ayyappa. All contributions are 100% tax exempt under Section 80G.
            </p>
          </div>
          <button
            onClick={onOpenDonation}
            className="px-8 py-3.5 rounded-xl bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-gold-glow cursor-pointer"
          >
            Sponsor Pilgrim Meals
          </button>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-white text-center">
            Devotee Seva Booking Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#140B05] border border-[#F5BD47]/20">
              <h4 className="font-serif font-bold text-base text-[#FFE29A] mb-2">
                How is the Sankalpam performed?
              </h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Priests read out your name, Janma Nakshatram (birth star), and Gothram during the sacred ritual. The divine vibrations are invoked directly for the registered devotee.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#140B05] border border-[#F5BD47]/20">
              <h4 className="font-serif font-bold text-base text-[#FFE29A] mb-2">
                How does Postal Prasadam delivery work?
              </h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                If you select postal delivery during booking, consecrated Vibhuti, Sandalwood paste, Kumkum, and dry Prasadam will be dispatched via India Post Speed Post within 48 hours of pooja completion.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
