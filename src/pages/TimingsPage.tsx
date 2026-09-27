import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useLanguage } from '../contexts/LanguageContext';

interface TimingsPageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const TimingsPage: React.FC<TimingsPageProps> = ({ onNavigate, onOpenBooking }) => {
  const { t, language } = useLanguage();
  const [currentStatus, setCurrentStatus] = useState<{
    isOpen: boolean;
    session: string;
    nextEvent: string;
  }>({
    isOpen: false,
    session: 'Nada Closed',
    nextEvent: 'Morning Darshan at 05:00 AM',
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
          session: 'Morning Darshan Active',
          nextEvent: timeInMins < 420 ? 'Usha Pooja at 07:00 AM' : 'Uchha Pooja at 11:30 AM',
        });
      } else if (timeInMins >= 1020 && timeInMins < 1260) {
        setCurrentStatus({
          isOpen: true,
          session: 'Evening Darshan Active',
          nextEvent: timeInMins < 1125 ? 'Deeparadhana (Maha Aarthi) at 06:45 PM' : 'Harivarasanam at 09:00 PM',
        });
      } else if (timeInMins < 300) {
        setCurrentStatus({
          isOpen: false,
          session: 'Temple Nada Closed',
          nextEvent: 'Nirmalya Darshanam opens at 05:00 AM',
        });
      } else {
        setCurrentStatus({
          isOpen: false,
          session: 'Afternoon Rest / Nada Closed',
          nextEvent: 'Evening Nada opens at 05:00 PM',
        });
      }
    };

    evaluateStatus();
    const interval = setInterval(evaluateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0704] text-stone-200">
      <PageHeader
        title={t('timings.title')}
        subtitle={t('timings.subtitle')}
        kicker={t('timings.kicker')}
        breadcrumb={t('nav.timings')}
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Live Status Tracker Banner */}
        <div className="p-6 rounded-2xl bg-[#180E08] border border-[#F5BD47]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span
              className={`w-3.5 h-3.5 rounded-full ${
                currentStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'
              }`}
            ></span>
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-400 block font-medium">
                Live Sanctum Status
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                {currentStatus.session}
              </h3>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-stone-300">
            Next Holy Ritual: <strong className="text-[#F5BD47]">{currentStatus.nextEvent}</strong>
          </div>
        </div>

        {/* Schedule Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Morning Schedule */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#170E08] border border-[#F5BD47]/20 shadow-xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#F5BD47]/15">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold block mb-1">
                  Dawn Session
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Morning Darshan
                </h3>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-[#F5BD47]/15 text-[#F5BD47] font-mono font-bold">
                05:00 AM – 11:30 AM
              </span>
            </div>

            <ul className="space-y-4 text-sm text-stone-300">
              <li className="flex justify-between items-center pb-3 border-b border-stone-800">
                <span className="font-medium text-white">Temple Opening &amp; Nirmalya Darshanam</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">05:00 AM</span>
              </li>
              <li className="flex justify-between items-center pb-3 border-b border-stone-800">
                <span className="font-medium text-white">Maha Ganapathi Homam</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">05:30 AM</span>
              </li>
              <li className="flex justify-between items-center pb-3 border-b border-stone-800">
                <span className="font-medium text-white">Usha Pooja &amp; Neyyabhishekam</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">07:00 AM</span>
              </li>
              <li className="flex justify-between items-center pb-3 border-b border-stone-800">
                <span className="font-medium text-white">Sahasranama Archana</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">08:30 AM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-white">Uchha Pooja &amp; Morning Nada Closure</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">11:30 AM</span>
              </li>
            </ul>
          </div>

          {/* Evening Schedule */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#170E08] border border-[#F5BD47]/20 shadow-xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#F5BD47]/15">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold block mb-1">
                  Dusk Session
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Evening Darshan
                </h3>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-[#F5BD47]/15 text-[#F5BD47] font-mono font-bold">
                05:00 PM – 09:00 PM
              </span>
            </div>

            <ul className="space-y-4 text-sm text-stone-300">
              <li className="flex justify-between items-center pb-3 border-b border-stone-800">
                <span className="font-medium text-white">Evening Nada Opening</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">05:00 PM</span>
              </li>
              <li className="flex justify-between items-center pb-3 border-b border-stone-800">
                <span className="font-medium text-white">Deeparadhana (Maha Aarthi with Camphor)</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">06:45 PM</span>
              </li>
              <li className="flex justify-between items-center pb-3 border-b border-stone-800">
                <span className="font-medium text-white">Pushpabhishekam &amp; Athazha Pooja</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">07:45 PM</span>
              </li>
              <li className="flex justify-between items-center pb-3 border-b border-stone-800">
                <span className="font-medium text-white">Night Archana &amp; Naivedyam</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">08:30 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-white">Harivarasanam &amp; Nada Closure</span>
                <span className="font-mono text-sm text-[#F5BD47] font-bold">09:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Special Mandala Season Note */}
        <div className="p-8 rounded-3xl bg-[#140B05] border border-[#F5BD47]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl font-bold text-white mb-2">
              Mandala &amp; Makaravilakku Season Timings
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              During the holy 41-day Mandala season (November to January), the temple sanctum opens early at <strong>04:00 AM</strong> and remains open throughout the afternoon to accommodate Sabarimala pilgrims.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-gold-glow"
          >
            Book a Morning or Evening Seva
          </button>
        </div>
      </div>
    </div>
  );
};
