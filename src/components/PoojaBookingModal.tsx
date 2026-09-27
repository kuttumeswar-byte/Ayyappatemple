import React, { useState } from 'react';
import { PoojaItem, NAKSHATRAS, GOTHRAMS } from '../data/templeData';
import { playTempleBell } from '../utils/audioBell';

interface PoojaBookingModalProps {
  pooja: PoojaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PoojaBookingModal: React.FC<PoojaBookingModalProps> = ({ pooja, isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    devoteeName: '',
    phone: '',
    email: '',
    nakshatra: NAKSHATRAS[0],
    gothram: GOTHRAMS[0],
    poojaDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    sankalpam: 'Universal Well-being & Family Peace',
    postalDelivery: false,
    address: '',
  });

  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen || !pooja) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.devoteeName || !formData.phone) {
      alert('Please fill in devotee name and phone number');
      return;
    }

    const randomRef = 'SAS-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setStep('success');
    playTempleBell();
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#120803] border border-[#F5BD47]/40 rounded-2xl overflow-hidden flex flex-col shadow-2xl max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#F5BD47]/20 flex items-center justify-between bg-[#1A0E06]">
          <div>
            <span className="text-[#F5BD47] font-devotional text-xs tracking-widest uppercase block">
              Sacred Sankalpam
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              {step === 'form' ? `Book ${pooja.name}` : 'Seva Booking Confirmed'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="w-9 h-9 rounded-full bg-stone-900 hover:bg-[#F5BD47] hover:text-[#0C0704] text-stone-400 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Pooja Summary Header */}
              <div className="p-4 rounded-xl bg-[#180E08] border border-[#F5BD47]/20 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#FFE29A]">{pooja.name}</h4>
                  <p className="text-xs text-stone-400">{pooja.description}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className="text-xs text-stone-400 block">Dakshina</span>
                  <span className="text-xl font-serif font-bold text-[#F5BD47]">₹ {pooja.price}</span>
                </div>
              </div>

              {/* Devotee Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Devotee Name (Karta) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Swami"
                    value={formData.devoteeName}
                    onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 focus:outline-none focus:border-[#F5BD47] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 focus:outline-none focus:border-[#F5BD47] text-sm"
                  />
                </div>
              </div>

              {/* Vedic Astrological Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Janma Nakshatram (Star)
                  </label>
                  <select
                    value={formData.nakshatra}
                    onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white focus:outline-none focus:border-[#F5BD47] text-sm"
                  >
                    {NAKSHATRAS.map((star) => (
                      <option key={star} value={star} className="bg-[#120803] text-stone-200">
                        {star}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Gothram
                  </label>
                  <select
                    value={formData.gothram}
                    onChange={(e) => setFormData({ ...formData, gothram: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white focus:outline-none focus:border-[#F5BD47] text-sm"
                  >
                    {GOTHRAMS.map((g) => (
                      <option key={g} value={g} className="bg-[#120803] text-stone-200">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seva Date & Sankalpam */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Preferred Pooja Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.poojaDate}
                    onChange={(e) => setFormData({ ...formData, poojaDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white focus:outline-none focus:border-[#F5BD47] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Sankalpam Intention
                  </label>
                  <select
                    value={formData.sankalpam}
                    onChange={(e) => setFormData({ ...formData, sankalpam: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white focus:outline-none focus:border-[#F5BD47] text-sm"
                  >
                    <option value="Health, Longevity & Healing">Ayushya (Health &amp; Longevity)</option>
                    <option value="Removal of Obstacles & Shani Nivarana">Vighna Nivarana (Removal of Obstacles)</option>
                    <option value="Universal Well-being & Family Peace">Santhi &amp; Soukhyam (Family Peace)</option>
                    <option value="Success in Ventures & Education">Vidya &amp; Vijayam (Success in Endeavors)</option>
                    <option value="Prosperity & Abundance">Dhana &amp; Dhanya (Prosperity)</option>
                  </select>
                </div>
              </div>

              {/* Postal Prasadam Delivery Option */}
              <div className="p-4 rounded-xl bg-[#150B05] border border-[#F5BD47]/20">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.postalDelivery}
                    onChange={(e) => setFormData({ ...formData, postalDelivery: e.target.checked })}
                    className="rounded bg-[#0C0704] border-[#F5BD47] text-[#F5BD47] focus:ring-0 w-4 h-4"
                  />
                  <span className="text-xs text-stone-200 font-medium">
                    Receive Consecrated Prasadam via Postal Speed Post (+ ₹50 postal handling)
                  </span>
                </label>
                {formData.postalDelivery && (
                  <textarea
                    rows={2}
                    placeholder="Enter full residential mailing address with PIN code..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full mt-3 px-3 py-2 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 focus:outline-none focus:border-[#F5BD47] text-xs"
                  />
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold text-sm tracking-wide transition-all shadow-gold-glow cursor-pointer"
                >
                  Confirm &amp; Proceed to Sankalpam (₹ {pooja.price + (formData.postalDelivery ? 50 : 0)})
                </button>
              </div>
            </form>
          ) : (
            /* Booking Confirmation Slip */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center text-3xl">
                ✓
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold block">
                  Swami Saranam!
                </span>
                <h4 className="font-serif text-3xl font-bold text-white mt-1">
                  Seva Sankalpam Registered
                </h4>
                <p className="text-stone-300 text-sm mt-2 font-light">
                  Your pooja has been registered in the daily temple ledger. The priests will recite the sacred Archana in your name and birth star.
                </p>
              </div>

              {/* Digital Token Slip */}
              <div className="p-6 rounded-xl bg-[#180E08] border border-[#F5BD47]/40 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Booking Reference:</span>
                  <span className="text-[#F5BD47] font-bold text-sm">{bookingRef}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Devotee (Karta):</span>
                  <span className="text-white font-semibold">{formData.devoteeName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Star &amp; Gothram:</span>
                  <span className="text-[#FFE29A]">{formData.nakshatra} / {formData.gothram}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Seva Offering:</span>
                  <span className="text-white">{pooja.name}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Pooja Date:</span>
                  <span className="text-white">{formData.poojaDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Prasadam Includes:</span>
                  <span className="text-emerald-400 font-sans">{pooja.prasadamIncludes.join(', ')}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-lg border border-[#F5BD47]/40 text-[#FFE29A] hover:bg-[#1E1107] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Print Blessed Receipt
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Done (Saranam Ayyappa)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
