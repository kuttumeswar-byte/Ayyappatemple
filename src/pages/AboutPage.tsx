import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { HOLY_18_STEPS, MANDALA_GUIDELINES, HolyStep } from '../data/templeData';
import { playTempleBell } from '../utils/audioBell';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
  onOpenDonation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenDonation,
}) => {
  const [selectedStep, setSelectedStep] = useState<HolyStep>(HOLY_18_STEPS[0]);
  const { t, language } = useLanguage();

  const handleStepClick = (step: HolyStep) => {
    setSelectedStep(step);
    playTempleBell();
  };

  return (
    <div className="min-h-screen bg-[#0C0704] text-stone-200">
      <PageHeader
        title={language === 'en' ? 'About Sri Ayyapa Temple' : language === 'hi' ? 'श्री अय्यप्पा मंदिर का दिव्य इतिहास' : 'ஸ்ரீ ஐயப்ப சுவாமி திருக்கோவில் வரலாறு'}
        subtitle={t('about.p1')}
        kicker={t('about.kicker')}
        breadcrumb={t('nav.about')}
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Section 1: Overview & Hariharasuta Philosophy */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#F5BD47] font-devotional text-xs uppercase tracking-widest block mb-2">
              Spiritual Essence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              The Path of Dharma &amp; <br />
              <span className="text-[#F5BD47]">Eternal Grace of Lord Ayyappa</span>
            </h2>
            <p className="text-stone-300 leading-relaxed mb-5 font-light">
              Lord Sri Ayyappa, revered as <strong className="text-white">Hariharasuta</strong>—the divine confluence of Lord Shiva and Lord Vishnu (Mohini)—embodies supreme austerity, fearless protection, and boundless compassion. He teaches us that every pilgrim is inherently divine, greeting each other as &ldquo;Swami&rdquo; and dissolving all distinctions of caste, creed, social standing, and wealth.
            </p>
            <p className="text-stone-300 leading-relaxed mb-6 font-light">
              The temple sanctum is established following ancient Agamic and Tantric rites. The deity sits in the yogic <strong className="text-[#FFE29A]">Chinmudra</strong> and <strong className="text-[#FFE29A]">Yogapatta</strong> posture, radiating serenity and inviting devotees to attain self-realization (&ldquo;Tat Tvam Asi&rdquo;).
            </p>

            {/* Core Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-800 text-center">
              <div className="p-3 rounded-lg bg-[#140B05] border border-[#F5BD47]/20">
                <span className="block font-serif text-3xl font-bold text-[#F5BD47]">41</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-400">Days Vratam</span>
              </div>
              <div className="p-3 rounded-lg bg-[#140B05] border border-[#F5BD47]/20">
                <span className="block font-serif text-3xl font-bold text-[#F5BD47]">18</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-400">Holy Steps</span>
              </div>
              <div className="p-3 rounded-lg bg-[#140B05] border border-[#F5BD47]/20">
                <span className="block font-serif text-2xl font-bold text-[#F5BD47]">Irumudi</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-400">Twin Bundle</span>
              </div>
            </div>
          </div>

          {/* Three Pillars Card Grid */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#140B05] border border-[#F5BD47]/20 flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-[#F5BD47]/10 text-[#F5BD47] text-2xl shrink-0">
                🤝
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#FFE29A] mb-1">Universal Brotherhood</h3>
                <p className="text-sm text-stone-400 font-light leading-relaxed">
                  Every pilgrim who takes the vow is revered as &lsquo;Swami&rsquo;. No one is superior or inferior in the presence of the Lord.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#140B05] border border-[#F5BD47]/20 flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-[#F5BD47]/10 text-[#F5BD47] text-2xl shrink-0">
                🧘‍♂️
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#FFE29A] mb-1">Austerity &amp; Discipline</h3>
                <p className="text-sm text-stone-400 font-light leading-relaxed">
                  41 days of pure Sattvic diet, cold water ablutions at Brahma Muhurtham, and complete mental and physical Brahmacharya.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#140B05] border border-[#F5BD47]/20 flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-[#F5BD47]/10 text-[#F5BD47] text-2xl shrink-0">
                🍚
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#FFE29A] mb-1">Sacred Annadanam (Charity)</h3>
                <p className="text-sm text-stone-400 font-light leading-relaxed">
                  Feeding thousands of hungry pilgrims daily with love, considered the highest form of worship and spiritual merit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive 18 Holy Steps Explorer */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#140A04] border border-[#F5BD47]/30 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#F5BD47] font-devotional text-xs uppercase tracking-widest block mb-1">
              Pathinettampadi
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
              The 18 Holy Steps of Divine Elevation
            </h2>
            <p className="text-stone-400 text-sm font-light">
              Only pilgrims carrying the sacred Irumudi on their heads can mount the 18 gold-plated steps. Click any step below to explore its inner yogic significance.
            </p>
          </div>

          {/* Stepper Buttons (1 to 18) */}
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-18 gap-2 mb-8">
            {HOLY_18_STEPS.map((s) => {
              const isSelected = selectedStep.step === s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => handleStepClick(s)}
                  className={`py-3 rounded-lg border text-center transition-all cursor-pointer font-serif ${
                    isSelected
                      ? 'bg-[#F5BD47] text-[#0C0704] font-bold border-[#F5BD47] shadow-gold-glow scale-105'
                      : 'bg-[#1E1107] text-[#FFE29A] border-[#F5BD47]/20 hover:border-[#F5BD47]'
                  }`}
                >
                  <span className="block text-[10px] text-stone-400">Step</span>
                  <span className="text-base font-bold">{s.step}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Step Detailed Feature */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#1A0E06] border border-[#F5BD47]/30 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#F5BD47]/20">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-[#F5BD47] text-[#0C0704] font-serif font-bold text-xl flex items-center justify-center shrink-0">
                  {selectedStep.step}
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#FFE29A]">
                    {selectedStep.name}
                  </h3>
                  <p className="text-sm text-stone-400">{selectedStep.meaning}</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded bg-[#F5BD47]/15 text-[#F5BD47] border border-[#F5BD47]/30 font-semibold uppercase tracking-wider">
                Category: {selectedStep.category}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold">
                Spiritual Essence &amp; Discipline
              </h4>
              <p className="text-stone-200 text-sm leading-relaxed">
                {selectedStep.spiritualSignificance}
              </p>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-[#0C0704] border border-[#F5BD47]/20 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-devotional">CHAKRA MANTRA</span>
              <span className="text-[#F5BD47] font-serif italic text-sm">
                ✦ Swamiye Saranam Ayyappa ✦
              </span>
            </div>
          </div>
        </section>

        {/* Section 3: 41-Day Mandala Vratam Guidelines */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#F5BD47] font-devotional text-xs uppercase tracking-widest block mb-1">
              Austerity Protocol
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
              The 41-Day Mandala Vratam &amp; Irumudi
            </h2>
            <p className="text-stone-400 text-sm font-light">
              Essential spiritual codes observed by every Ayyappa devotee before undertaking the holy pilgrimage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MANDALA_GUIDELINES.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#140B05] border border-[#F5BD47]/20 hover:border-[#F5BD47] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#F5BD47] text-[#0C0704] text-xs font-bold flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#FFE29A]">{item.title}</h3>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Irumudi Anatomy Callout */}
          <div className="p-8 rounded-2xl bg-[#1A0E06] border border-[#F5BD47]/30 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-5 rounded-xl bg-[#0C0704] border border-stone-800">
              <span className="text-xs uppercase tracking-wider text-[#F5BD47] font-bold block mb-1">
                Munmudi (Front Compartment - Divine Offering)
              </span>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Contains the consecrated coconut filled with pure cow ghee (Ney-Thenga), raw rice, betel leaves, areca nuts, turmeric powder, vibhuti, and sandalwood paste offered directly at the sanctum sanctorum for Neyyabhishekam.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#0C0704] border border-stone-800">
              <span className="text-xs uppercase tracking-wider text-[#F5BD47] font-bold block mb-1">
                Pinmudi (Rear Compartment - Personal Sustenance)
              </span>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Carries personal sustenance for the pilgrim during the jungle trek, including dry fruits, jaggery, beaten rice (aval), and coconut for the sacred fire altars (Azhi).
              </p>
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <section className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#241308] to-[#120703] border border-[#F5BD47]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to Book a Sacred Pooja or Darshan?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light">
              Offer personal prayers for your family&apos;s peace, prosperity, and longevity.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Book Pooja Seva
            </button>
            <button
              onClick={onOpenDonation}
              className="px-6 py-3 rounded-lg border border-[#F5BD47]/50 hover:border-[#F5BD47] text-[#FFE29A] text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Donate Annadanam
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
