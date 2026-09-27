import React from 'react';
import { MANDALA_GUIDELINES } from '../data/templeData';

interface MandalaVratamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MandalaVratamModal: React.FC<MandalaVratamModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#120803] border border-[#F5BD47]/40 rounded-2xl overflow-hidden flex flex-col shadow-2xl max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#F5BD47]/20 flex items-center justify-between bg-[#1A0E06]">
          <div>
            <span className="text-[#F5BD47] font-devotional text-xs tracking-widest uppercase block">
              Ascetic Austerity
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              The 41-Day Mandala Vratam &amp; Irumudi Guidelines
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-900 hover:bg-[#F5BD47] hover:text-[#0C0704] text-stone-400 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-300 text-sm font-light leading-relaxed">
          <p>
            The 41-day Mandala Vratam is a sacred process of physical purification and spiritual elevation. By shedding ego and surrendering worldly attachments, the devotee experiences the divine truth that every individual soul is fundamentally divine.
          </p>

          {/* Vratam Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MANDALA_GUIDELINES.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#180E08] border border-[#F5BD47]/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#F5BD47] text-[#0C0704] text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-[#FFE29A] text-base">{item.title}</h4>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Sacred Irumudi Kettu Deep Dive */}
          <div className="p-5 rounded-xl bg-[#180E08] border border-[#F5BD47]/30">
            <h4 className="font-serif text-xl font-bold text-[#F5BD47] mb-3">
              Anatomy of the Sacred Irumudi (Two-Fold Bundle)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#0C0704] border border-stone-800">
                <span className="text-[#FFE29A] font-bold block mb-1">Munmudi (Front Compartment - Divine)</span>
                <p className="text-stone-400">
                  Holds the consecrated coconut filled with pure cow ghee (Ney-Thenga), raw rice, betel leaves, areca nuts, turmeric powder, vibhuti, and sandal paste offered directly at the sanctum sanctorum.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#0C0704] border border-stone-800">
                <span className="text-[#FFE29A] font-bold block mb-1">Pinmudi (Rear Compartment - Personal)</span>
                <p className="text-stone-400">
                  Carries personal sustenance for the pilgrim during the jungle trek, including dry fruits, jaggery, beaten rice (aval), and coconut for the sacred fire altars (Azhi).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F5BD47]/20 bg-[#160C06] flex justify-between items-center text-xs">
          <span className="text-[#F5BD47] font-devotional">SWAMIYE SARANAM AYYAPPA</span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-semibold uppercase tracking-wider cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
