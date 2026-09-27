import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const TimingsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentStatus, setCurrentStatus] = useState<{
    isOpen: boolean;
    session: string;
    nextEvent: string;
  }>({
    isOpen: false,
    session: 'Nada Closed',
    nextEvent: 'Morning Darshan at 05:00 AM'
  });

  useEffect(() => {
    const evaluateStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInMins = hours * 60 + minutes;

      // Morning Darshan: 05:00 (300 mins) to 11:30 (690 mins)
      // Evening Darshan: 17:00 (1020 mins) to 21:00 (1260 mins)
      if (timeInMins >= 300 && timeInMins < 690) {
        setCurrentStatus({
          isOpen: true,
          session: language === 'en' ? 'Morning Darshan Active' : language === 'hi' ? 'प्रातःकालीन दर्शन सक्रिय' : 'காலை தரிசனம் நடைபெறுகிறது',
          nextEvent: timeInMins < 420 ? 'Usha Pooja at 07:00 AM' : 'Uchha Pooja at 11:30 AM'
        });
      } else if (timeInMins >= 1020 && timeInMins < 1260) {
        setCurrentStatus({
          isOpen: true,
          session: language === 'en' ? 'Evening Darshan Active' : language === 'hi' ? 'सायंकालीन दर्शन सक्रिय' : 'மாலை தரிசனம் நடைபெறுகிறது',
          nextEvent: timeInMins < 1125 ? 'Deeparadhana at 06:45 PM' : 'Harivarasanam at 09:00 PM'
        });
      } else if (timeInMins < 300) {
        setCurrentStatus({
          isOpen: false,
          session: language === 'en' ? 'Temple Nada Closed' : language === 'hi' ? 'मंदिर गर्भगृह बंद' : 'நடை சார்த்தப்பட்டுள்ளது',
          nextEvent: 'Nirmalya Darshanam opens at 05:00 AM'
        });
      } else {
        setCurrentStatus({
          isOpen: false,
          session: language === 'en' ? 'Afternoon Rest / Nada Closed' : language === 'hi' ? 'मध्याह्न विश्राम / कपाट बंद' : 'மதிய இடைவேளை',
          nextEvent: 'Evening Nada opens at 05:00 PM'
        });
      }
    };

    evaluateStatus();
    const interval = setInterval(evaluateStatus, 60000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <section className="py-24 bg-[#0F0804] border-b border-[#2C180E] relative" id="timings">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#F5BD47] font-devotional text-sm uppercase tracking-widest block mb-2">
            {t('timings.kicker')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('timings.title')}
          </h2>
          <div className="w-24 h-1 bg-[#F5BD47] mx-auto mb-4"></div>
          <p className="text-stone-400 font-light mb-6">
            {t('timings.subtitle')}
          </p>

          {/* Live Status indicator */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#180E08] border border-[#F5BD47]/30 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full ${currentStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`}></span>
            <span className="text-stone-300 font-medium">Status: <span className="text-[#F5BD47]">{currentStatus.session}</span></span>
            <span className="text-stone-500">|</span>
            <span className="text-stone-400">Next: <span className="text-[#FFE29A]">{currentStatus.nextEvent}</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Morning Schedule */}
          <div className="p-8 rounded-2xl bg-[#170E08]/90 border border-[#F5BD47]/20 shadow-lg hover:border-[#F5BD47]/40 transition-colors">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F5BD47]/15">
              <span className="p-2.5 rounded-lg bg-[#F5BD47]/10 text-[#F5BD47]">
                {/* Morning Sun Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" strokeWidth="2"></circle>
                  <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" strokeWidth="2"></path>
                </svg>
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F5BD47]">{t('timings.morning')}</h3>
              <span className="ml-auto text-xs px-2.5 py-1 rounded bg-[#F5BD47]/15 text-[#F5BD47] font-medium font-mono">
                05:00 AM - 11:30 AM
              </span>
            </div>
            <ul className="space-y-4 text-stone-300">
              <li className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="font-medium text-white">{language === 'en' ? 'Temple Opening & Nirmalya Darshanam' : language === 'hi' ? 'मंदिर उद्घाटन व निर्माल्य दर्शन' : 'நடை திறப்பு & நிர்மால்ய தரிசனம்'}</span>
                <span className="font-mono text-sm text-[#F5BD47]">05:00 AM</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="font-medium text-white">{language === 'en' ? 'Ganapathi Homam & Abhishekam' : language === 'hi' ? 'गणपति होमम एवं अभिषेक' : 'கணபதி ஹோமம் & அபிஷேகம்'}</span>
                <span className="font-mono text-sm text-[#F5BD47]">05:30 AM</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="font-medium text-white">{language === 'en' ? 'Usha Pooja & Neyyabhishekam' : language === 'hi' ? 'उषा पूजा एवं नेय्याभिषेकम' : 'உஷத் பூஜை & நெய்யபிஷேகம்'}</span>
                <span className="font-mono text-sm text-[#F5BD47]">07:00 AM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-white">{language === 'en' ? 'Uchha Pooja & Morning Nada Closure' : language === 'hi' ? 'उच्छ पूजा एवं प्रातः कपाट बंद' : 'உச்சி பூஜை & காலை நடை அடைப்பு'}</span>
                <span className="font-mono text-sm text-[#F5BD47]">11:30 AM</span>
              </li>
            </ul>
          </div>

          {/* Evening Schedule */}
          <div className="p-8 rounded-2xl bg-[#170E08]/90 border border-[#F5BD47]/20 shadow-lg hover:border-[#F5BD47]/40 transition-colors">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F5BD47]/15">
              <span className="p-2.5 rounded-lg bg-[#F5BD47]/10 text-[#F5BD47]">
                {/* Moon / Evening Deepam Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F5BD47]">{t('timings.evening')}</h3>
              <span className="ml-auto text-xs px-2.5 py-1 rounded bg-[#F5BD47]/15 text-[#F5BD47] font-medium font-mono">
                05:00 PM - 09:00 PM
              </span>
            </div>
            <ul className="space-y-4 text-stone-300">
              <li className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="font-medium text-white">{language === 'en' ? 'Evening Nada Opening' : language === 'hi' ? 'सायंकालीन कपाट उद्घाटन' : 'மாலை நடை திறப்பு'}</span>
                <span className="font-mono text-sm text-[#F5BD47]">05:00 PM</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="font-medium text-white">{language === 'en' ? 'Deeparadhana (Maha Aarthi)' : language === 'hi' ? 'दीपाराधना (महा आरती)' : 'தீபாராதனை (மகா ஆரத்தி)'}</span>
                <span className="font-mono text-sm text-[#F5BD47]">06:45 PM</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="font-medium text-white">{language === 'en' ? 'Pushpabhishekam & Athazha Pooja' : language === 'hi' ? 'पुष्पाभिषेकम एवं अत्ताझ पूजा' : 'புஷ்பாபிஷேகம் & அத்தாழ பூஜை'}</span>
                <span className="font-mono text-sm text-[#F5BD47]">07:45 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-white">{language === 'en' ? 'Harivarasanam & Nada Closure' : language === 'hi' ? 'हरिवरासनम् एवं कपाट बंद' : 'ஹரிவராசனம் & நடை அடைப்பு'}</span>
                <span className="font-mono text-sm text-[#F5BD47]">09:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Special Timings Note */}
        <div className="mt-8 p-4 rounded-xl bg-[#140A04] border border-[#F5BD47]/15 flex items-center justify-between text-xs text-stone-400 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#F5BD47]">✦</span>
            <span><strong>{t('timings.specialNotice')}:</strong> {t('timings.noticeDesc')}</span>
          </div>
          <div className="text-stone-300">
            Devaswom Helpline: <span className="text-[#F5BD47]">+91 484 2800 108</span>
          </div>
        </div>
      </div>
    </section>
  );
};
