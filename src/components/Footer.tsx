import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDonation: () => void;
  onOpenVratamGuide: () => void;
  onOpenPrivacyModal?: (type: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDonation,
  onOpenVratamGuide,
}) => {
  const { t, language } = useLanguage();
  return (
    <footer className="bg-[#080402] border-t border-[#F5BD47]/20 pt-16 pb-10 text-stone-400 font-light" id="footer">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Temple Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full border border-[#F5BD47] flex items-center justify-center bg-[#1A0E06]">
              <svg className="w-5 h-5 text-[#F5BD47]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L10 5H14L12 2ZM8.5 6L7 9H17L15.5 6H8.5ZM6 10L5 14H19L18 10H6ZM4 15L3 20H21L20 15H4ZM2 21V22H22V21H2Z"></path>
              </svg>
            </div>
            <span className="font-cinzel text-base font-bold text-[#F5BD47]">{t('temple.name')}</span>
          </div>
          <p className="text-xs leading-relaxed mb-4">
            {language === 'en'
              ? 'A sanctified center of Vedic traditions, worship, and service, welcoming every devotee to the sacred path of Lord Dharma Sastha.'
              : language === 'hi'
              ? 'वैदिक परंपराओं, उपासना और सेवा का एक पावन केंद्र, जो भगवान धर्म शास्ता के पवित्र मार्ग पर प्रत्येक भक्त का स्वागत करता है।'
              : 'வேத மரபுகள், பக்தி மற்றும் ஆன்மீக சேவையின் புனித மையம். தர்ம சாஸ்தாவின் பாதையில் அனைத்து பக்தர்களையும் அரவணைக்கிறது.'}
          </p>
          <p className="text-xs text-[#FFE29A] font-devotional tracking-widest">
            {t('hero.chant')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-stone-800 pb-2">
            {t('footer.quickLinks')}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#F5BD47] transition-colors cursor-pointer text-left"
              >
                {t('nav.home')}
              </button>
            </li>
            <li>
              <button
                onClick={onOpenVratamGuide}
                className="hover:text-[#F5BD47] transition-colors cursor-pointer text-left"
              >
                {t('hero.card4.title')}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('pooja-services')}
                className="hover:text-[#F5BD47] transition-colors cursor-pointer text-left"
              >
                {t('nav.pooja')}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('gallery')}
                className="hover:text-[#F5BD47] transition-colors cursor-pointer text-left"
              >
                {t('nav.gallery')}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-[#F5BD47] transition-colors cursor-pointer text-left"
              >
                {t('nav.contact')}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('pooja-services')}
                className="hover:text-[#F5BD47] transition-colors cursor-pointer text-left"
              >
                Seva &amp; Pooja Booking
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('gallery')}
                className="hover:text-[#F5BD47] transition-colors cursor-pointer text-left"
              >
                Sacred Photo Gallery
              </button>
            </li>
            <li>
              <button
                onClick={onOpenDonation}
                className="hover:text-[#F5BD47] transition-colors cursor-pointer text-left"
              >
                Annadanam Trust Donations
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Timings */}
        <div>
          <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-stone-800 pb-2">
            Temple Office
          </h4>
          <address className="not-italic text-xs space-y-2 leading-relaxed">
            <p className="text-stone-300 font-medium">Sri Ayyapa Temple</p>
            <p>Campbell Bay Great Nicobar</p>
            <p className="pt-2"><strong className="text-white">Phone:</strong> +91 484 2800 108 / 109</p>
            <p><strong className="text-white">Email:</strong> contact@ayyappaswamydevaswom.org</p>
          </address>
        </div>

        {/* Column 4: Annadanam Donation Callout */}
        <div className="p-5 rounded-xl bg-[#140B05] border border-[#F5BD47]/30" id="donate">
          <h4 className="font-serif text-lg font-bold text-[#F5BD47] mb-2">Sacred Annadanam</h4>
          <p className="text-xs text-stone-300 leading-relaxed mb-4">
            Feed hungry pilgrims and earn the eternal blessings of Lord Manikandan. All donations receive 80G tax exemption benefits.
          </p>
          <button
            onClick={onOpenDonation}
            className="w-full py-2.5 rounded bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Contribute Online
          </button>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <p>© 2026 Sri Ayyapa Temple Trust. All rights reserved. Saranam Ayyappa.</p>
        <div className="flex items-center gap-6">
          <button onClick={onOpenVratamGuide} className="hover:text-[#F5BD47] transition-colors cursor-pointer">
            Devotee Guidelines
          </button>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#F5BD47] transition-colors cursor-pointer">
            Temple Office
          </button>
          <span className="text-[#F5BD47]">✦ Swamiye Saranam Ayyappa ✦</span>
        </div>
      </div>
    </footer>
  );
};
