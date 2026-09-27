import React, { useState } from 'react';
import { HOLY_18_STEPS, HolyStep } from '../data/templeData';
import { playTempleBell } from '../utils/audioBell';

interface EighteenStepsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EighteenStepsModal: React.FC<EighteenStepsModalProps> = ({ isOpen, onClose }) => {
  const [selectedStep, setSelectedStep] = useState<HolyStep>(HOLY_18_STEPS[0]);

  if (!isOpen) return null;

  const handleStepSelect = (step: HolyStep) => {
    setSelectedStep(step);
    playTempleBell();
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'Indriyas': return 'text-amber-300 border-amber-500/40 bg-amber-950/40';
      case 'Ragas': return 'text-orange-300 border-orange-500/40 bg-orange-950/40';
      case 'Gunas': return 'text-yellow-300 border-yellow-500/40 bg-yellow-950/40';
      case 'Knowledge': return 'text-emerald-300 border-emerald-500/40 bg-emerald-950/40';
      default: return 'text-stone-300 border-stone-600 bg-stone-900';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#120803] border border-[#F5BD47]/40 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#F5BD47]/20 flex items-center justify-between bg-[#1A0E06]">
          <div>
            <span className="text-[#F5BD47] font-devotional text-xs tracking-widest uppercase block">
              Pathinettampadi
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              The 18 Holy Steps of Divine Elevation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-900 hover:bg-[#F5BD47] hover:text-[#0C0704] text-stone-400 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <p className="text-sm text-stone-300 font-light leading-relaxed">
            The 18 sacred steps leading to the sanctum sanctorum of Lord Ayyappa can only be mounted by devotees carrying the sacred <strong className="text-[#F5BD47]">Irumudi bundle</strong> after observing the rigorous 41-day Mandala Vratam. Select any step below to reveal its inner yogic significance.
          </p>

          {/* Stepper Grid (Steps 1 to 18) */}
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-18 gap-2">
            {HOLY_18_STEPS.map((s) => {
              const isSelected = selectedStep.step === s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => handleStepSelect(s)}
                  className={`py-3 rounded-lg border text-center transition-all cursor-pointer font-serif ${
                    isSelected
                      ? 'bg-[#F5BD47] text-[#0C0704] font-bold border-[#F5BD47] shadow-gold-glow scale-105'
                      : 'bg-[#1E1107] text-[#FFE29A] border-[#F5BD47]/20 hover:border-[#F5BD47]'
                  }`}
                >
                  <span className="block text-xs text-stone-400">Step</span>
                  <span className="text-base font-bold">{s.step}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Step Card */}
          <div className="p-6 rounded-xl bg-[#1A0E06] border border-[#F5BD47]/30 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-[#F5BD47]/15">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#F5BD47] text-[#0C0704] font-serif font-bold text-lg flex items-center justify-center">
                  {selectedStep.step}
                </span>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#FFE29A]">
                    {selectedStep.name}
                  </h4>
                  <p className="text-sm text-stone-400">{selectedStep.meaning}</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded border font-medium uppercase tracking-wider ${getCategoryBadgeColor(selectedStep.category)}`}>
                {selectedStep.category}
              </span>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold">
                Spiritual Essence &amp; Transcendence
              </h5>
              <p className="text-stone-200 text-sm leading-relaxed">
                {selectedStep.spiritualSignificance}
              </p>
            </div>

            {/* Sacred Chant */}
            <div className="mt-5 p-3 rounded-lg bg-[#0C0704] border border-[#F5BD47]/20 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-devotional">
                CHAKRA &amp; STEP MANTRA
              </span>
              <span className="text-xs font-serif italic text-[#F5BD47]">
                Swamiye Saranam Ayyappa
              </span>
            </div>
          </div>

          {/* Category Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#150B05] border border-amber-500/20">
              <strong className="text-amber-300 block mb-1">Steps 1 - 5 (Indriyas)</strong>
              <p className="text-stone-400">Mastery over the five sense organs (sight, hearing, smell, taste, touch).</p>
            </div>
            <div className="p-3 rounded-lg bg-[#150B05] border border-orange-500/20">
              <strong className="text-orange-300 block mb-1">Steps 6 - 13 (Ragas)</strong>
              <p className="text-stone-400">Eradication of eight cardinal worldly vices: lust, anger, greed, ego, envy, etc.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#150B05] border border-yellow-500/20">
              <strong className="text-yellow-300 block mb-1">Steps 14 - 16 (Gunas)</strong>
              <p className="text-stone-400">Transcendence of the three material qualities: Sattva, Rajas, and Tamas.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#150B05] border border-emerald-500/20">
              <strong className="text-emerald-300 block mb-1">Steps 17 - 18 (Moksha)</strong>
              <p className="text-stone-400">Awakening of Vidya (spiritual knowledge) and total surrender of Avidya.</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#F5BD47]/20 bg-[#160C06] flex items-center justify-between">
          <span className="text-xs text-stone-400 italic">
            &ldquo;Tat Tvam Asi&rdquo; — You are that Supreme Divinity
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
