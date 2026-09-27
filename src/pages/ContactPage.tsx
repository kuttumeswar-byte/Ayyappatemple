import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { PageHeader } from '../components/PageHeader';
import { playTempleBell } from '../utils/audioBell';
import { useLanguage } from '../contexts/LanguageContext';
import { DonationModal } from '../components/DonationModal';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [inquiryType, setInquiryType] = useState('darshan');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [contactQrUrl, setContactQrUrl] = useState<string>('');
  const [donationModalOpen, setDonationModalOpen] = useState<boolean>(false);
  const { t, language } = useLanguage();

  const TEMPLE_UPI_ID = '226112039003611@cnrb';

  useEffect(() => {
    // Generate high quality QR code for Canara Bank UPI ID
    const upiUrl = `upi://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(
      'Sri Ayyappa Swamy Temple'
    )}&cu=INR&tn=${encodeURIComponent('Temple Seva & Annadanam')}`;

    QRCode.toDataURL(upiUrl, {
      width: 360,
      margin: 1.5,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
      .then((url) => setContactQrUrl(url))
      .catch((err) => console.error('Contact QR error:', err));
  }, []);

  const committeeMembers = [
    {
      role: t('committee.role.president'),
      name: 'Shri K C Murugan',
      phone: '9434288009',
      displayPhone: '+91 94342 88009',
      telHref: 'tel:+919434288009',
      waHref: 'https://wa.me/919434288009',
      badgeColor: 'bg-[#F5BD47] text-[#0C0704]',
      borderHover: 'hover:border-[#F5BD47]',
      accentBg: 'from-[#2A1608] to-[#140A04]',
    },
    {
      role: t('committee.role.secretary'),
      name: 'Shri E S Rajesh',
      phone: '9434288038',
      displayPhone: '+91 94342 88038',
      telHref: 'tel:+919434288038',
      waHref: 'https://wa.me/919434288038',
      badgeColor: 'bg-[#FFE29A] text-[#0C0704]',
      borderHover: 'hover:border-[#FFE29A]',
      accentBg: 'from-[#261408] to-[#120803]',
    },
    {
      role: t('committee.role.jointSecretary'),
      name: 'Shri Ranjit Raveendran',
      phone: '9332000927',
      displayPhone: '+91 93320 00927',
      telHref: 'tel:+919332000927',
      waHref: 'https://wa.me/919332000927',
      badgeColor: 'bg-[#E5A93C] text-[#0C0704]',
      borderHover: 'hover:border-[#E5A93C]',
      accentBg: 'from-[#281508] to-[#130904]',
    },
    {
      role: t('committee.role.cashier'),
      name: 'Shri Vyshak Murugan',
      phone: '94475 92906',
      displayPhone: '+91 94475 92906',
      telHref: 'tel:+919447592906',
      waHref: 'https://wa.me/919447592906',
      badgeColor: 'bg-[#D4AF37] text-[#0C0704]',
      borderHover: 'hover:border-[#D4AF37]',
      accentBg: 'from-[#241307] to-[#120803]',
    },
  ];

  const handleCopyPhone = (ph: string, displayName: string) => {
    navigator.clipboard.writeText(ph.replace(/\s+/g, ''));
    setCopiedPhone(displayName);
    setTimeout(() => {
      setCopiedPhone(null);
    }, 2500);
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(TEMPLE_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => {
      setCopiedUpi(false);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSent(true);
    playTempleBell();
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setIsSent(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0C0704] text-stone-200">
      <PageHeader
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        kicker={t('contact.kicker')}
        breadcrumb={t('nav.contact')}
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Committee Members Details Section */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#140B05] border border-[#F5BD47]/30 shadow-2xl relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(245,189,71,0.08)_0%,transparent_70%)] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-[#F5BD47]/20 relative z-10">
            <div>
              <span className="text-[#F5BD47] font-devotional text-xs uppercase tracking-widest block mb-2 font-semibold">
                ✦ {language === 'en' ? 'Temple Executive Committee' : language === 'hi' ? 'मंदिर कार्यकारिणी समिति' : 'திருக்கோவில் நிர்வாகக் குழு'} ✦
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t('committee.title')}
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm font-light mt-2 max-w-2xl leading-relaxed">
                {t('committee.subtitle')}
              </p>
            </div>

            {copiedPhone && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs animate-in fade-in">
                <span>✓</span>
                <span>{copiedPhone} phone copied to clipboard</span>
              </div>
            )}
          </div>

          {/* Committee Member Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {committeeMembers.map((member) => (
              <div
                key={member.role}
                className={`p-6 rounded-2xl bg-gradient-to-b ${member.accentBg} border border-[#F5BD47]/20 ${member.borderHover} transition-all duration-300 shadow-md hover:shadow-gold-glow hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  {/* Role Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${member.badgeColor} shadow-sm`}>
                      {member.role}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Active Office Bearer"></span>
                  </div>

                  {/* Name */}
                  <h3 className="font-serif text-xl font-bold text-white mb-2 leading-snug">
                    {member.name}
                  </h3>

                  {/* Phone Number Display */}
                  <div className="flex items-center gap-2 text-[#FFE29A] font-mono text-sm sm:text-base font-semibold mb-5 bg-[#0C0704]/60 px-3 py-2 rounded-lg border border-[#F5BD47]/15">
                    <svg className="w-4 h-4 text-[#F5BD47] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{member.displayPhone}</span>
                  </div>
                </div>

                {/* Actions: Call Directly & WhatsApp & Copy */}
                <div className="space-y-2 pt-2 border-t border-stone-800/80">
                  <a
                    href={member.telHref}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                    </svg>
                    <span>{language === 'en' ? 'Call Now' : language === 'hi' ? 'कॉल करें' : 'அழைக்க'}</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={member.waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#142A16] hover:bg-[#1E3B20] text-emerald-400 border border-emerald-500/30 text-[11px] font-medium transition-colors"
                      title="Open WhatsApp Chat"
                    >
                      <span>💬 WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyPhone(member.phone, member.name)}
                      className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#180E08] hover:bg-[#28160B] text-stone-300 hover:text-[#F5BD47] border border-[#F5BD47]/20 text-[11px] font-medium transition-colors cursor-pointer"
                      title="Copy Number"
                    >
                      <span>📋 Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Official Bank Account & UPI SCAN & PAY Banner Section */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A0E06] via-[#120703] to-[#0A0402] border-2 border-[#F5BD47]/40 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Description & Bank Account Information */}
            <div className="flex-1 space-y-6 text-left">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] uppercase font-bold tracking-wider bg-[#F5BD47]/20 text-[#FFE29A] border border-[#F5BD47]/40 mb-3">
                  🏛️ Official Temple Bank &amp; UPI
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                  Direct Bank &amp; UPI QR Contributions
                </h2>
                <p className="text-stone-300 text-xs sm:text-sm font-light mt-2 leading-relaxed">
                  Devotees wishing to contribute towards Nitya Annadanam, Sanctum Upkeep, Pushpabhishekam, or Temple Sevas can send direct offerings via Canara Bank UPI.
                </p>
              </div>

              {/* Account Details Box */}
              <div className="p-5 rounded-2xl bg-[#0E0603] border border-[#F5BD47]/30 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Beneficiary Name:</span>
                  <span className="text-white font-sans font-bold">Sri Ayyappa Swamy Temple Trust</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Bank &amp; Branch:</span>
                  <span className="text-white font-sans">Canara Bank, Campbell Bay Branch</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Official UPI ID:</span>
                  <span className="text-[#FFE29A] font-bold text-sm">{TEMPLE_UPI_ID}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-stone-400">Tax Exemption:</span>
                  <span className="text-emerald-400 font-sans font-medium">100% Tax Exempt under Section 80G</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDonationModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5BD47] to-[#E5A93C] hover:from-[#FFE29A] hover:to-[#F5BD47] text-[#0C0704] font-bold text-xs uppercase tracking-wider shadow-gold-glow cursor-pointer transition-all transform hover:scale-[1.02]"
                >
                  Contribute Online (Get 80G Receipt)
                </button>
                <button
                  type="button"
                  onClick={handleCopyUPI}
                  className="px-4 py-3 rounded-xl bg-[#2A160A] hover:bg-[#3A1E0E] text-[#F5BD47] border border-[#F5BD47]/40 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  {copiedUpi ? '✓ UPI ID Copied!' : '📋 Copy UPI ID'}
                </button>
              </div>
            </div>

            {/* Right: The Complete Canara Bank "SCAN & PAY" Card */}
            <div className="w-full max-w-[340px] shrink-0">
              <div className="bg-white rounded-3xl p-5 text-center shadow-2xl border-4 border-[#F5BD47]/80 text-stone-900">
                {/* Canara Bank Top Blue Banner */}
                <div className="bg-[#0093D8] text-white py-2 px-3 rounded-xl flex items-center justify-between mb-3 shadow-sm">
                  <div className="text-left">
                    <span className="text-[11px] font-bold block leading-none">केनरा बैंक</span>
                    <span className="text-sm font-bold tracking-wide">Canara Bank</span>
                  </div>
                  <div className="bg-[#FAA61A] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    Syndicate
                  </div>
                </div>

                <div className="text-xs font-bold tracking-[0.25em] text-stone-700 uppercase mb-2">
                  SCAN &amp; PAY
                </div>

                {/* QR Code Container */}
                <div className="border-2 border-stone-200 rounded-2xl p-2 bg-white flex items-center justify-center min-h-[200px]">
                  {contactQrUrl ? (
                    <img
                      src={contactQrUrl}
                      alt="Canara Bank UPI QR Code"
                      className="w-52 h-52 object-contain"
                    />
                  ) : (
                    <div className="w-52 h-52 flex items-center justify-center text-stone-400 text-xs">
                      Loading Temple QR...
                    </div>
                  )}
                </div>

                {/* UPI ID */}
                <div className="mt-2.5 pt-2 border-t border-stone-100">
                  <span className="text-[10px] text-stone-500 font-semibold block uppercase">UPI ID</span>
                  <span className="text-xs font-mono font-bold text-stone-900">{TEMPLE_UPI_ID}</span>
                </div>

                {/* BHIM UPI & Payment Apps Supported Logos */}
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-bold px-2 py-1 bg-stone-100 rounded text-stone-700">BHIM UPI</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded">GPay</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-purple-50 text-purple-700 rounded">PhonePe</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-sky-50 text-sky-700 rounded">Paytm</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-amber-50 text-amber-800 rounded">CBDC e₹</span>
                </div>

                <div className="mt-2 text-[10px] font-bold text-blue-900 flex items-center justify-center gap-1">
                  <span>e₹</span>
                  <span>DIGITAL RUPEE ACCEPTED HERE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Office Info & Travel Guide */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-[#140B05] border border-[#F5BD47]/20">
              <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold block mb-2">
                Sanctum Office
              </span>
              <h2 className="font-serif text-3xl font-bold text-white mb-6">
                Sri Ayyapa Temple
              </h2>

              <address className="not-italic text-sm space-y-4 leading-relaxed text-stone-300 font-light">
                <div className="flex items-start gap-4">
                  <span className="text-[#F5BD47] text-xl shrink-0 mt-0.5">📍</span>
                  <div>
                    <strong className="text-white block font-medium">Sanctum Location</strong>
                    <p className="text-stone-300 font-medium">Sri Ayyapa Temple</p>
                    <p className="text-stone-400">Campbell Bay Great Nicobar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-[#F5BD47] text-xl shrink-0 mt-0.5">📞</span>
                  <div>
                    <strong className="text-white block font-medium">Helpline Telephones</strong>
                    <p className="text-stone-400">+91 484 2800 108 / 109</p>
                    <span className="text-[11px] text-[#FFE29A] font-sans">Active daily 04:30 AM to 09:30 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-[#F5BD47] text-xl shrink-0 mt-0.5">✉️</span>
                  <div>
                    <strong className="text-white block font-medium">Official Correspondence</strong>
                    <p className="text-stone-400">contact@ayyappaswamydevaswom.org</p>
                  </div>
                </div>
              </address>
            </div>

            {/* Pilgrim Advisory Guidelines */}
            <div className="p-8 rounded-3xl bg-[#140B05] border border-[#F5BD47]/20">
              <h3 className="font-serif text-2xl font-bold text-[#FFE29A] mb-4">
                Essential Devotee Guidelines
              </h3>
              <ul className="space-y-3.5 text-xs text-stone-300 leading-relaxed font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F5BD47] font-bold mt-0.5">✦</span>
                  <span><strong>Dress Code:</strong> Men are required to wear traditional Dhotis / Veshti (upper body bare or draped with traditional shawl). Women must wear Sarees or traditional Salwar Kameez.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F5BD47] font-bold mt-0.5">✦</span>
                  <span><strong>The 18 Holy Steps:</strong> Only pilgrims carrying the sanctified Irumudi bundle on their heads after the 41-day Mandala Vratam are permitted to ascend the sacred 18 Steps.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F5BD47] font-bold mt-0.5">✦</span>
                  <span><strong>Sanctum Photography:</strong> Mobile phones and video recorders are strictly banned inside the inner sanctum to preserve spiritual sanctity.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F5BD47] font-bold mt-0.5">✦</span>
                  <span><strong>Free Annadanam:</strong> Hot vegetarian meals are served continuously at the Annadana Mandapam for all pilgrims.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#140B05] border border-[#F5BD47]/30 shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold block mb-1">
                Direct Communication
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
                Send a Message to Devaswom Office
              </h3>

              {isSent ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center text-2xl shadow-lg">
                    ✓
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-sm mx-auto font-light">
                    Your message has been logged. The temple administrative team will reach out to you via phone or email shortly. Saranam Ayyappa!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white text-xs focus:outline-none focus:border-[#F5BD47]"
                    >
                      <option value="darshan">Special Darshan / Senior Citizen Access</option>
                      <option value="pooja">Pooja Seva &amp; Archana Booking Inquiries</option>
                      <option value="annadanam">Large Group Annadanam Sponsorship</option>
                      <option value="vratam">Mandala Vratam &amp; Irumudi Guidance from Priests</option>
                      <option value="travel">Pilgrim Accommodation &amp; Route Guidance</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                        Devotee Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sri / Smt. Devotee Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-[#F5BD47]"
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-[#F5BD47]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="devotee@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-[#F5BD47]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                      Your Message / Specific Requirements
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please mention dates, number of pilgrims, or special seva requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-[#F5BD47]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold text-xs uppercase tracking-wider transition-colors shadow-gold-glow cursor-pointer mt-2"
                  >
                    Submit Devotee Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </div>
  );
};
