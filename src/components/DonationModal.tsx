import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { playTempleBell } from '../utils/audioBell';
import { downloadReceiptPDF, printReceiptWindow, ReceiptData } from '../utils/receiptGenerator';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'payment' | 'receipt'>('form');
  const [amount, setAmount] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [cause, setCause] = useState<string>('annadanam');
  const [donorName, setDonorName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [panNumber, setPanNumber] = useState<string>('');
  const [receiptNumber, setReceiptNumber] = useState<string>('');
  const [receiptDate, setReceiptDate] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  const TEMPLE_UPI_ID = '226112039003611@cnrb';
  const TEMPLE_PAYEE_NAME = 'Sri Ayyappa Swamy Temple';

  const presetAmounts = [251, 501, 1116, 2501, 5001, 10001];
  const effectiveAmount = customAmount ? parseInt(customAmount, 10) || 0 : amount;

  const causeNames: Record<string, string> = {
    annadanam: 'Nitya Annadanam (Feed Pilgrims)',
    deepam: 'Nitya Deepam (Sanctum Brass Lamps)',
    goshala: 'Goshala Seva (Sacred Cow Welfare)',
    temple: 'Temple Trust (Sanctum Upkeep & Renovation)',
  };

  // Generate dynamic UPI QR Code when entering payment step or amount changes
  useEffect(() => {
    if (step === 'payment' && effectiveAmount > 0) {
      const upiUrl = `upi://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(
        TEMPLE_PAYEE_NAME
      )}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent(
        `Donation for ${causeNames[cause] || 'Temple Seva'} - ${donorName || 'Devotee'}`
      )}`;

      QRCode.toDataURL(upiUrl, {
        width: 320,
        margin: 1.5,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [step, effectiveAmount, cause, donorName]);

  if (!isOpen) return null;

  const getPilgrimMealCount = (amt: number) => {
    return Math.floor(amt / 20); // ~₹20 per meal
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount < 1) {
      alert('Please select or enter a valid donation amount.');
      return;
    }
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    const recId = 'SAS-80G-' + Math.floor(100000 + Math.random() * 900000);
    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    setReceiptNumber(recId);
    setReceiptDate(today);
    setStep('receipt');
    playTempleBell();
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(TEMPLE_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  const getReceiptPayload = (): ReceiptData => {
    return {
      receiptNumber: receiptNumber || 'SAS-80G-782910',
      donorName: donorName.trim() || 'Devotee of Lord Ayyappa',
      phone: phone.trim() || '',
      email: email.trim() || '',
      panNumber: panNumber.trim().toUpperCase() || undefined,
      amount: effectiveAmount,
      cause: cause,
      causeLabel: causeNames[cause] || 'Temple Seva Fund',
      transactionRef: transactionRef.trim() || undefined,
      date: receiptDate || new Date().toLocaleDateString('en-IN'),
      templeUpi: TEMPLE_UPI_ID,
    };
  };

  const handleDownloadPDF = () => {
    setIsPdfGenerating(true);
    try {
      downloadReceiptPDF(getReceiptPayload());
    } catch (err) {
      console.error('PDF generation error:', err);
      // fallback to print
      printReceiptWindow(getReceiptPayload());
    } finally {
      setTimeout(() => setIsPdfGenerating(false), 1000);
    }
  };

  const handlePrintReceipt = () => {
    printReceiptWindow(getReceiptPayload());
  };

  const upiDeepLink = `upi://pay?pa=${TEMPLE_UPI_ID}&pn=${encodeURIComponent(
    TEMPLE_PAYEE_NAME
  )}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent(
    `Temple Donation - ${cause}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#120803] border border-[#F5BD47]/40 rounded-3xl overflow-hidden flex flex-col shadow-2xl max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#F5BD47]/20 flex items-center justify-between bg-[#1A0E06]">
          <div>
            <span className="text-[#F5BD47] font-devotional text-xs tracking-widest uppercase block">
              Punya Seva &amp; Charity
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {step === 'form' && 'Contribute to Temple Seva'}
              {step === 'payment' && 'Bank UPI QR Payment'}
              {step === 'receipt' && 'Sacred 80G Donation Receipt'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-stone-900 hover:bg-[#F5BD47] hover:text-[#0C0704] text-stone-400 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Steps Progress */}
        <div className="px-6 py-2.5 bg-[#0D0502] border-b border-stone-800 flex items-center justify-center gap-2 text-xs">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
              step === 'form'
                ? 'bg-[#F5BD47] text-[#0C0704] font-bold'
                : 'text-stone-400'
            }`}
          >
            <span>1</span>
            <span>Details</span>
          </div>
          <span className="text-stone-600">→</span>
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
              step === 'payment'
                ? 'bg-[#F5BD47] text-[#0C0704] font-bold'
                : 'text-stone-400'
            }`}
          >
            <span>2</span>
            <span>Scan &amp; Pay</span>
          </div>
          <span className="text-stone-600">→</span>
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
              step === 'receipt'
                ? 'bg-[#F5BD47] text-[#0C0704] font-bold'
                : 'text-stone-400'
            }`}
          >
            <span>3</span>
            <span>80G Receipt</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Details Form */}
          {step === 'form' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Cause Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 mb-2 font-medium">
                  Select Seva Fund
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'annadanam', name: 'Annadanam', desc: 'Feed Pilgrims' },
                    { id: 'deepam', name: 'Nitya Deepam', desc: 'Sanctum Oil' },
                    { id: 'goshala', name: 'Goshala Seva', desc: 'Cow Welfare' },
                    { id: 'temple', name: 'Temple Trust', desc: 'Sanctum upkeep' },
                  ].map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setCause(c.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        cause === c.id
                          ? 'border-[#F5BD47] bg-[#2E180A] shadow-gold-glow'
                          : 'border-stone-800 bg-[#160B05] hover:border-stone-600'
                      }`}
                    >
                      <span className="block font-serif font-bold text-sm text-[#FFE29A]">{c.name}</span>
                      <span className="text-[11px] text-stone-400">{c.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset Amounts */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 mb-2 font-medium">
                  Select Contribution Amount (₹)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {presetAmounts.map((amt) => {
                    const isSelected = !customAmount && amount === amt;
                    return (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2.5 rounded-xl border font-serif font-bold text-base transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F5BD47] text-[#0C0704] border-[#F5BD47] shadow-gold-glow'
                            : 'bg-[#180E08] text-[#FFE29A] border-[#F5BD47]/20 hover:border-[#F5BD47]'
                        }`}
                      >
                        ₹ {amt}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount */}
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-stone-400 font-serif">₹</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Or enter custom amount in Rupees"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 focus:outline-none focus:border-[#F5BD47] text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Meal Impact Indicator */}
                {cause === 'annadanam' && effectiveAmount > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-[#1E1106] border border-[#F5BD47]/30 flex items-center gap-3">
                    <span className="text-xl">🍚</span>
                    <p className="text-xs text-stone-300">
                      Your contribution of <strong className="text-[#F5BD47]">₹ {effectiveAmount.toLocaleString()}</strong> sponsors wholesome hot meals for approximately{' '}
                      <strong className="text-[#FFE29A] font-bold underline">{getPilgrimMealCount(effectiveAmount)} pilgrims</strong> today!
                    </p>
                  </div>
                )}
              </div>

              {/* Devotee / Donor Information */}
              <div className="space-y-4 pt-2 border-t border-stone-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                      Donor Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Sri / Smt. Devotee Name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 focus:outline-none focus:border-[#F5BD47] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 focus:outline-none focus:border-[#F5BD47] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                      Email Address (for 80G Tax Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="devotee@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 focus:outline-none focus:border-[#F5BD47] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                      PAN Card Number (for 80G Exemption)
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 focus:outline-none focus:border-[#F5BD47] text-sm font-mono uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Tax Exemption Badge */}
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span className="p-1 rounded bg-[#F5BD47]/20 text-[#F5BD47]">🛡️</span>
                <span>All donations to Sri Ayyapa Temple Trust are 100% tax exempt under Section 80G of the Income Tax Act.</span>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5BD47] to-[#E5A93C] hover:from-[#FFE29A] hover:to-[#F5BD47] text-[#0C0704] font-bold text-sm tracking-wide transition-all shadow-gold-glow cursor-pointer transform hover:scale-[1.01]"
              >
                Proceed to Pay ₹ {effectiveAmount.toLocaleString()} via Bank UPI QR
              </button>
            </form>
          )}

          {/* STEP 2: Bank UPI QR Code with Respected Amount */}
          {step === 'payment' && (
            <div className="space-y-6 text-center">
              <div className="p-4 rounded-2xl bg-[#180E08] border border-[#F5BD47]/30 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#F5BD47] tracking-wider block">
                    {causeNames[cause] || 'Temple Seva'}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {donorName || 'Devotee of Lord Ayyappa'}
                  </h4>
                  <p className="text-xs text-stone-400">Contact: {phone} • {email}</p>
                </div>
                <div className="text-right sm:border-l sm:border-stone-800 sm:pl-4">
                  <span className="text-xs text-stone-400 block">Total Donation</span>
                  <span className="font-serif text-2xl font-bold text-[#FFE29A]">
                    ₹ {effectiveAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1E0E06] to-[#0E0502] border-2 border-[#F5BD47]/60 max-w-sm mx-auto shadow-2xl relative">
                {/* Bank / UPI Header Badge */}
                <div className="flex items-center justify-between mb-4 border-b border-[#F5BD47]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏛️</span>
                    <div className="text-left">
                      <span className="font-serif text-xs font-bold text-white block">
                        Canara Bank UPI
                      </span>
                      <span className="text-[10px] text-[#F5BD47]">Official Temple Account</span>
                    </div>
                  </div>
                  <div className="bg-[#2A160A] px-2.5 py-1 rounded-full border border-[#F5BD47]/40 text-[10px] font-bold text-[#FFE29A]">
                    ₹ {effectiveAmount}
                  </div>
                </div>

                {/* The Dynamic QR Image generated with exact amount */}
                <div className="bg-white p-3 rounded-2xl mx-auto shadow-inner flex items-center justify-center min-h-[220px]">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt={`UPI QR Code for ₹${effectiveAmount}`}
                      className="w-56 h-56 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-56 h-56 flex items-center justify-center text-stone-400 text-xs">
                      Generating Bank QR...
                    </div>
                  )}
                </div>

                {/* UPI ID Footer */}
                <div className="mt-4 pt-3 border-t border-[#F5BD47]/20 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] text-stone-400 block uppercase tracking-wider">UPI ID</span>
                    <span className="text-xs font-mono font-bold text-[#FFE29A]">{TEMPLE_UPI_ID}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUPI}
                    className="px-2.5 py-1 rounded-lg bg-[#2A160A] hover:bg-[#3E200E] border border-[#F5BD47]/40 text-[#F5BD47] text-[10px] font-semibold transition-colors cursor-pointer"
                  >
                    {copiedUpi ? '✓ Copied!' : 'Copy UPI'}
                  </button>
                </div>
              </div>

              {/* Mobile Direct Pay Button */}
              <div className="max-w-sm mx-auto space-y-3">
                <a
                  href={upiDeepLink}
                  className="w-full py-3 rounded-xl bg-[#28150A] hover:bg-[#3D200E] border border-[#F5BD47]/40 text-[#FFE29A] text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all sm:hidden"
                >
                  <span>📲</span>
                  <span>Open in Google Pay / PhonePe / Paytm</span>
                </a>

                {/* Optional UPI Ref Number */}
                <div className="text-left">
                  <label className="block text-[11px] text-stone-400 mb-1">
                    UPI Reference / UTR Number (Optional, for instant receipt matching):
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. 402938192834"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0C0704] border border-[#F5BD47]/30 text-white placeholder-stone-600 text-xs font-mono focus:outline-none focus:border-[#F5BD47]"
                  />
                </div>

                {/* Confirm Payment Completed */}
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5BD47] to-[#E5A93C] hover:from-[#FFE29A] hover:to-[#F5BD47] text-[#0C0704] font-bold text-xs tracking-wider uppercase shadow-gold-glow cursor-pointer transition-all transform hover:scale-[1.01]"
                >
                  ✓ I Have Completed Payment (View 80G Receipt)
                </button>

                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-xs text-stone-400 hover:text-[#F5BD47] underline cursor-pointer"
                >
                  ← Modify Amount / Donor Details
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Tax Exemption Receipt Screen */}
          {step === 'receipt' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center text-3xl shadow-lg">
                ✓
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold block">
                  Punya Phalam Bestowed
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  Thank You for Your Sacred Contribution!
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm mt-1.5 font-light">
                  May Lord Dharma Sastha bestow eternal health, peace, and prosperity upon you and your family.
                </p>
              </div>

              {/* 80G Receipt Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#180E08] border border-[#F5BD47]/40 text-left space-y-2.5 font-mono text-xs">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Trust Name:</span>
                  <span className="text-white font-semibold font-sans">Sri Ayyapa Temple Devaswom</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Receipt No:</span>
                  <span className="text-[#F5BD47] font-bold">{receiptNumber}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Date:</span>
                  <span className="text-white">{receiptDate}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Donor Name:</span>
                  <span className="text-white">{donorName || 'Devotee of Lord Ayyappa'}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Amount Contributed:</span>
                  <span className="text-[#FFE29A] font-bold text-sm">₹ {effectiveAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Fund Allocated:</span>
                  <span className="text-white capitalize">{causeNames[cause] || cause}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Temple Bank Account:</span>
                  <span className="text-stone-200">{TEMPLE_UPI_ID} (Canara Bank)</span>
                </div>
                {transactionRef && (
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-stone-400">Bank UTR / Ref:</span>
                    <span className="text-[#FFE29A]">{transactionRef}</span>
                  </div>
                )}
                {panNumber && (
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-stone-400">Donor PAN:</span>
                    <span className="text-white">{panNumber}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span className="text-stone-400">Tax Exemption:</span>
                  <span className="text-emerald-400 font-sans">Eligible for 100% 80G Deduction (ITBA/EXM/80G)</span>
                </div>
              </div>

              {/* Action Buttons: Instant PDF Download & Print */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={isPdfGenerating}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#F5BD47] to-[#E5A93C] hover:from-[#FFE29A] hover:to-[#F5BD47] text-[#0C0704] font-bold text-xs tracking-wider uppercase transition-all shadow-gold-glow cursor-pointer flex items-center justify-center gap-2 transform hover:scale-[1.01]"
                >
                  {isPdfGenerating ? (
                    <span>Generating PDF...</span>
                  ) : (
                    <>
                      <span>📥</span>
                      <span>Download 80G PDF Receipt</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="py-3 px-4 rounded-xl border border-[#F5BD47]/40 text-[#FFE29A] hover:bg-[#1E1107] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🖨️</span>
                  <span>Print Receipt (Window)</span>
                </button>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-stone-400 hover:text-[#F5BD47] underline cursor-pointer"
                >
                  Done • Close Window (Swami Saranam)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
