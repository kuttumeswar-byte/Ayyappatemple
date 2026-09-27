import React, { useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'sanctum' | 'festivals' | 'steps' | 'annadanam' | 'pilgrimage';
  caption: string;
  imageSrc?: string;
  svgIconType?: string;
}

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'sanctum-moolavar',
      title: 'Moolasthanam Golden Sanctum',
      category: 'sanctum',
      caption: 'The consecrated idol of Lord Sri Ayyappa Swamy in Chinmudra posture radiating divine peace.',
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAVbKRw33rJsA4A4clF2959ykkUUQ9Ez2G4ThGIl3G0VVu8JLuFSd0v4M7hL5Bdxt718jQTdRZSZoVziLWdJnqPusqapVjWWb7JhdROeZGzr8inkHUKlG_00HnXIAHgQSNfgoeXWKMGaQKghIil-EGHVV8ovPS5x1VYPwqRdlAY0kTJxNFMCLoUvlMv5ZGcB1empeScFSGpWmtIX9xnP07e5Nm6lIegUizIYqmPEftvFX-oqKNiFhQyiu-MzeYuurcLA',
    },
    {
      id: 'pathinettampadi-brass',
      title: 'The Sacred Pathinettampadi (18 Steps)',
      category: 'steps',
      caption: 'Golden brass plated eighteen holy steps flanked by glowing brass deepams.',
      svgIconType: 'steps'
    },
    {
      id: 'deeparadhana-aarthi',
      title: 'Maha Deeparadhana Camphor Aarthi',
      category: 'festivals',
      caption: 'Priests offering the grand multi-tiered brass lamp accompanied by bell chiming and conch blowing.',
      svgIconType: 'flame'
    },
    {
      id: 'sacred-annadanam-hall',
      title: 'Nitya Annadanam Feast Hall',
      category: 'annadanam',
      caption: 'Devotees partaking in consecrated vegetarian meal served with devotion on fresh banana leaves.',
      svgIconType: 'feast'
    },
    {
      id: 'irumudi-trek',
      title: 'Pilgrims Carrying Sacred Irumudi',
      category: 'pilgrimage',
      caption: 'Devotees dressed in black dhotis ascending the sacred hill with chants of Swami Saranam.',
      svgIconType: 'pilgrim'
    },
    {
      id: 'makarajyothi-glory',
      title: 'Makarajyothi Celestial Illumination',
      category: 'festivals',
      caption: 'The divine light appearing at Ponnambalamedu hill on Makara Sankranti evening.',
      svgIconType: 'jyothi'
    },
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(i => i.category === filter);

  return (
    <section className="py-24 bg-[#0F0804] border-t border-[#2C180E] relative" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#F5BD47] font-devotional text-sm uppercase tracking-widest block mb-2">
            Devotional Visuals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Photo Gallery — Moments of Devotion
          </h2>
          <div className="w-24 h-1 bg-[#F5BD47] mx-auto mb-4"></div>
          <p className="text-stone-400 font-light">
            Glimpses of sacred rituals, festival celebrations, the consecrated 18 Holy Steps, and the divine atmosphere of Sri Ayyapa Temple.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'sanctum', label: 'Temple Sanctum' },
            { id: 'festivals', label: 'Festivals & Aarthi' },
            { id: 'steps', label: '18 Holy Steps' },
            { id: 'annadanam', label: 'Annadanam' },
            { id: 'pilgrimage', label: 'Pilgrim Heritage' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#F5BD47] text-[#0C0704] font-bold shadow-gold-glow'
                  : 'bg-[#180E08] text-stone-300 hover:text-[#F5BD47] border border-[#F5BD47]/20 hover:border-[#F5BD47]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#160B05] border border-[#F5BD47]/25 hover:border-[#F5BD47] transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow cursor-pointer aspect-4/3 flex flex-col justify-end"
            >
              {item.imageSrc ? (
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                />
              ) : (
                /* Devotional Art Container */
                <div className="absolute inset-0 bg-gradient-to-b from-[#241308] via-[#160B05] to-[#0A0402] flex items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full border border-[#F5BD47]/40 bg-[#2A160A]/80 flex items-center justify-center text-[#F5BD47] group-hover:scale-110 transition-transform">
                    {item.svgIconType === 'steps' && (
                      <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                      </svg>
                    )}
                    {item.svgIconType === 'flame' && (
                      <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C10.5 4 8 7 8 11c0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-2.5-7-4-9zm0 18c-3.3 0-6-2.7-6-6 0-2.8 1.9-5.2 4.5-5.8-.3 1.1-.1 2.3.6 3.1.8.9 2 1.3 3.1 1 .5 1.5.3 3.2-.6 4.5-.4.6-.9 1.1-1.6 1.2z" />
                      </svg>
                    )}
                    {item.svgIconType === 'feast' && (
                      <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" />
                      </svg>
                    )}
                    {item.svgIconType === 'pilgrim' && (
                      <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
                      </svg>
                    )}
                    {item.svgIconType === 'jyothi' && (
                      <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" />
                      </svg>
                    )}
                  </div>
                </div>
              )}

              {/* Gradient Scrim & Caption */}
              <div className="relative z-10 p-5 bg-gradient-to-t from-[#0C0704] via-[#0C0704]/80 to-transparent">
                <span className="text-[10px] uppercase font-bold text-[#F5BD47] tracking-wider block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#FFE29A] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#120803] border border-[#F5BD47]/40 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#F5BD47]/20 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold">
                  {activeItem.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-white">{activeItem.title}</h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="w-8 h-8 rounded-full bg-stone-900 text-stone-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 max-h-[60vh] flex items-center justify-center bg-[#070301]">
              {activeItem.imageSrc ? (
                <img
                  src={activeItem.imageSrc}
                  alt={activeItem.title}
                  className="max-h-[50vh] w-auto object-contain rounded-lg border border-[#F5BD47]/20"
                />
              ) : (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 rounded-full border border-[#F5BD47]/50 bg-[#231207] text-[#F5BD47] mx-auto flex items-center justify-center text-4xl mb-4">
                    ✦
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#FFE29A] mb-2">{activeItem.title}</h4>
                  <p className="text-sm text-stone-300 max-w-md mx-auto">{activeItem.caption}</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#F5BD47]/20 bg-[#160B05] flex justify-between items-center text-xs text-stone-300">
              <p>{activeItem.caption}</p>
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-1.5 rounded bg-[#F5BD47] text-[#0C0704] font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
