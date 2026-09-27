import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  kicker?: string;
  breadcrumb: string;
  onNavigateHome: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  kicker,
  breadcrumb,
  onNavigateHome,
}) => {
  const { t } = useLanguage();
  const displayKicker = kicker || t('temple.name');

  return (
    <div className="relative py-12 sm:py-16 bg-gradient-to-b from-[#1C0F08] via-[#120803] to-[#0C0704] border-b border-[#F5BD47]/20 overflow-hidden">
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F5BD47_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Breadcrumb Navigation */}
        <div className="inline-flex items-center gap-2 text-xs text-stone-400 mb-4 bg-[#180E08]/80 px-3.5 py-1.5 rounded-full border border-[#F5BD47]/20">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#F5BD47] transition-colors cursor-pointer"
          >
            {t('nav.home')}
          </button>
          <span className="text-stone-600">/</span>
          <span className="text-[#FFE29A] font-medium">{breadcrumb}</span>
        </div>

        {/* Kicker */}
        <span className="text-[#F5BD47] font-devotional text-xs sm:text-sm uppercase tracking-[0.25em] block mb-2 font-semibold">
          ✦ {displayKicker} ✦
        </span>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h1>

        {/* Gold Divider Accent */}
        <div className="w-24 h-1 bg-[#F5BD47] mx-auto mb-4 rounded-full"></div>

        {/* Subtitle */}
        <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
