import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactSection: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [inquiryType, setInquiryType] = useState('darshan');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { t, language } = useLanguage();

  const committeeMembers = [
    {
      role: t('committee.role.president'),
      name: 'Shri K C Murugan',
      displayPhone: '+91 94342 88009',
      telHref: 'tel:+919434288009',
      waHref: 'https://wa.me/919434288009',
      badgeColor: 'bg-[#F5BD47] text-[#0C0704]',
    },
    {
      role: t('committee.role.secretary'),
      name: 'Shri E S Rajesh',
      displayPhone: '+91 94342 88038',
      telHref: 'tel:+919434288038',
      waHref: 'https://wa.me/919434288038',
      badgeColor: 'bg-[#FFE29A] text-[#0C0704]',
    },
    {
      role: t('committee.role.jointSecretary'),
      name: 'Shri Ranjit Raveendran',
      displayPhone: '+91 93320 00927',
      telHref: 'tel:+919332000927',
      waHref: 'https://wa.me/919332000927',
      badgeColor: 'bg-[#E5A93C] text-[#0C0704]',
    },
    {
      role: t('committee.role.cashier'),
      name: 'Shri Vyshak Murugan',
      displayPhone: '+91 94475 92906',
      telHref: 'tel:+919447592906',
      waHref: 'https://wa.me/919447592906',
      badgeColor: 'bg-[#D4AF37] text-[#0C0704]',
    },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setFormSent(false);
    }, 4000);
  };

  return (
    <section className="py-24 bg-[#0A0502] text-stone-300 relative border-t border-[#2C180E]" id="contact">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#F5BD47] font-devotional text-sm uppercase tracking-widest block mb-2">
            {t('contact.kicker')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-[#F5BD47] mx-auto mb-4"></div>
          <p className="text-stone-400 font-light">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Committee Members Details */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#140B05] border border-[#F5BD47]/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#F5BD47]/20">
            <div>
              <span className="text-[#F5BD47] font-devotional text-xs uppercase tracking-widest block mb-1 font-semibold">
                ✦ {language === 'en' ? 'Temple Executive Committee' : language === 'hi' ? 'मंदिर कार्यकारिणी समिति' : 'திருக்கோவில் நிர்வாகக் குழு'} ✦
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {t('committee.title')}
              </h3>
            </div>
            <span className="text-xs text-stone-400 bg-[#0C0704] px-3.5 py-1.5 rounded-full border border-[#F5BD47]/20 w-fit">
              {language === 'en' ? 'Direct Helpline for Devotees' : language === 'hi' ? 'भक्तों हेतु सीधा संपर्क' : 'நேரடி தொடர்புக்கு'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {committeeMembers.map((member) => (
              <div
                key={member.role}
                className="p-5 rounded-2xl bg-gradient-to-b from-[#1E1007] to-[#120803] border border-[#F5BD47]/25 hover:border-[#F5BD47] transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${member.badgeColor} inline-block mb-3`}>
                    {member.role}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mb-2 leading-snug">
                    {member.name}
                  </h4>
                  <p className="text-[#FFE29A] font-mono text-sm font-semibold mb-4">
                    {member.displayPhone}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-stone-800">
                  <a
                    href={member.telHref}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold text-xs tracking-wider uppercase text-center transition-colors"
                  >
                    {language === 'en' ? 'Call' : language === 'hi' ? 'कॉल' : 'அழைக்க'}
                  </a>
                  <a
                    href={member.waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 rounded-lg bg-[#142A16] hover:bg-[#1E3B20] text-emerald-400 border border-emerald-500/30 text-xs font-medium transition-colors"
                    title="WhatsApp"
                  >
                    💬
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Office & Visit Details */}
          <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-[#140B05] border border-[#F5BD47]/20">
              <h3 className="font-serif text-2xl font-bold text-[#FFE29A] mb-4">
                Temple Office
              </h3>
              <address className="not-italic text-sm space-y-3 leading-relaxed text-stone-300 font-light">
                <p className="flex items-start gap-3">
                  <span className="text-[#F5BD47] text-lg">📍</span>
                  <span>
                    <strong className="text-white">Sri Ayyapa Temple</strong><br />
                    Campbell Bay Great Nicobar
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#F5BD47] text-lg">📞</span>
                  <span>
                    <strong>Helpline:</strong> +91 484 2800 108 / 109 (Available 04:30 AM – 09:30 PM)
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#F5BD47] text-lg">✉️</span>
                  <span>
                    <strong>Official Email:</strong> contact@ayyappaswamydevaswom.org
                  </span>
                </p>
              </address>
            </div>

            {/* Pilgrim Advisory Guidelines */}
            <div className="p-8 rounded-2xl bg-[#140B05] border border-[#F5BD47]/20">
              <h4 className="font-serif text-xl font-bold text-[#F5BD47] mb-3">
                Visiting Devotee Guidelines
              </h4>
              <ul className="space-y-3 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#F5BD47] mt-0.5">✦</span>
                  <span><strong>Dress Code:</strong> Men must wear traditional Dhotis / Veshti (upper body bare or with angavastram). Women are requested to wear Sarees or traditional Salwars.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5BD47] mt-0.5">✦</span>
                  <span><strong>Pathinettampadi (18 Steps):</strong> Only pilgrims carrying the sanctified Irumudi bundle on their heads after the 41-day Vratam may climb the 18 Holy Steps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5BD47] mt-0.5">✦</span>
                  <span><strong>Photography:</strong> Mobile phones and video cameras are strictly prohibited inside the inner sanctum sanctorum.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5BD47] mt-0.5">✦</span>
                  <span><strong>Free Prasadam:</strong> Panchamirtham and sacred Vibhuti are distributed to all visiting devotees at the outer counter.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Priest & Seva Inquiry Form */}
          <div className="p-8 rounded-2xl bg-[#140B05] border border-[#F5BD47]/30 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold block mb-1">
                Direct Inquiry
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                Message Temple Administration
              </h3>

              {formSent ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center text-xl">
                    ✓
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs text-stone-300">
                    The temple office will contact you on your phone number shortly. Saranam Ayyappa!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1 font-medium">
                      Inquiry Subject
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white text-xs focus:outline-none focus:border-[#F5BD47]"
                    >
                      <option value="darshan">Special Darshan / Senior Citizen Access</option>
                      <option value="pooja">Pooja Seva &amp; Archana Inquiries</option>
                      <option value="annadanam">Large Group Annadanam Sponsorship</option>
                      <option value="vratam">Mandala Vratam &amp; Irumudi Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Devotee Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-[#F5BD47]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1 font-medium">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-[#F5BD47]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1 font-medium">
                      Your Message / Questions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please mention preferred dates or specific pooja requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-[#F5BD47]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
