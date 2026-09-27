import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutHeritageSectionProps {
  onOpen18Steps: () => void;
  onOpenVratamGuide: () => void;
}

export const AboutHeritageSection: React.FC<AboutHeritageSectionProps> = ({
  onOpen18Steps,
  onOpenVratamGuide,
}) => {
  const { t, language } = useLanguage();

  return (
    <section className="py-24 bg-[#0A0603] text-stone-300 relative" id="about">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Description */}
        <div>
          <span className="text-[#F5BD47] font-devotional text-sm uppercase tracking-widest block mb-2">
            {t('about.kicker')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {t('about.title')}
          </h2>
          <p className="text-stone-300 leading-relaxed mb-6 font-light">
            {t('about.p1')}
          </p>
          <p className="text-stone-300 leading-relaxed mb-8 font-light">
            {t('about.p2')}
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-800">
            <div>
              <div className="text-3xl font-serif font-bold text-[#F5BD47] tabular-nums">41</div>
              <div className="text-xs uppercase tracking-wider text-stone-400 mt-1">
                {language === 'en' ? 'Days Mandala Vratam' : language === 'hi' ? 'दिवसीय मंडल व्रतम' : 'நாட்கள் மண்டல விரதம்'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-[#F5BD47] tabular-nums">18</div>
              <div className="text-xs uppercase tracking-wider text-stone-400 mt-1">
                {language === 'en' ? 'Divine Steps of Purity' : language === 'hi' ? 'पवित्र आध्यात्मिक सोपान' : 'புனித பொற்படிகள்'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-[#F5BD47]">Irumudi</div>
              <div className="text-xs uppercase tracking-wider text-stone-400 mt-1">
                {language === 'en' ? 'Sacred Twin Bundle' : language === 'hi' ? 'पावन इरुमुडी पोटली' : 'புனித இருமுடி கட்டு'}
              </div>
            </div>
          </div>

          {/* Interactive CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onOpen18Steps}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>{t('about.explore18')}</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
            <button
              onClick={onOpenVratamGuide}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#F5BD47]/40 hover:border-[#F5BD47] text-[#FFE29A] hover:bg-[#1E1108] text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>{t('about.learnVratam')}</span>
            </button>
          </div>
        </div>

        {/* Sacred Values Cards Grid */}
        <div className="space-y-4">
          {/* Value 1 */}
          <div className="p-6 rounded-xl bg-[#140B06] border border-[#F5BD47]/20 flex gap-5 items-start hover:border-[#F5BD47]/40 transition-colors">
            <div className="p-3 rounded-lg bg-[#F5BD47]/10 text-[#F5BD47] shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-[#FFE29A] mb-1">{t('about.value1.title')}</h4>
              <p className="text-sm text-stone-400 font-light">
                {t('about.value1.desc')}
              </p>
            </div>
          </div>

          {/* Value 2 */}
          <div className="p-6 rounded-xl bg-[#140B06] border border-[#F5BD47]/20 flex gap-5 items-start hover:border-[#F5BD47]/40 transition-colors">
            <div className="p-3 rounded-lg bg-[#F5BD47]/10 text-[#F5BD47] shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5h-2v-2h2zm0-4h-2V7h2z"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-[#FFE29A] mb-1">{t('about.value2.title')}</h4>
              <p className="text-sm text-stone-400 font-light">
                {t('about.value2.desc')}
              </p>
            </div>
          </div>

          {/* Value 3 */}
          <div className="p-6 rounded-xl bg-[#140B06] border border-[#F5BD47]/20 flex gap-5 items-start hover:border-[#F5BD47]/40 transition-colors">
            <div className="p-3 rounded-lg bg-[#F5BD47]/10 text-[#F5BD47] shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-[#FFE29A] mb-1">{t('about.value4.title')}</h4>
              <p className="text-sm text-stone-400 font-light">
                {t('about.value4.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
