import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import {
  GalleryPhotoItem,
  subscribeToGalleryPhotos,
  deleteGalleryPhoto,
} from '../services/galleryService';
import { AdminLoginModal } from '../components/AdminLoginModal';
import { UploadPhotoModal } from '../components/UploadPhotoModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('all');
  const [photos, setPhotos] = useState<GalleryPhotoItem[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState<boolean>(true);
  const [activePhoto, setActivePhoto] = useState<GalleryPhotoItem | null>(null);

  // Admin Modals & Deletion State
  const [adminLoginOpen, setAdminLoginOpen] = useState<boolean>(false);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [photoToDelete, setPhotoToDelete] = useState<GalleryPhotoItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { adminProfile, isAdmin, logoutAdmin } = useAuth();
  const { t } = useLanguage();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Subscribe to real-time gallery updates from Firestore
  useEffect(() => {
    setLoadingPhotos(true);
    const unsubscribe = subscribeToGalleryPhotos((updatedPhotos) => {
      setPhotos(updatedPhotos);
      setLoadingPhotos(false);
    });
    return () => unsubscribe();
  }, []);

  const initiateDelete = (e: React.MouseEvent, photo: GalleryPhotoItem) => {
    e.stopPropagation();
    setPhotoToDelete(photo);
  };

  const handleConfirmDelete = async () => {
    if (!photoToDelete) return;
    setIsDeleting(true);

    try {
      const deletedTitle = photoToDelete.title;
      await deleteGalleryPhoto(photoToDelete.id);
      
      // Update local state immediately
      setPhotos((prev) => prev.filter((p) => p.id !== photoToDelete.id));

      if (activePhoto?.id === photoToDelete.id) {
        setActivePhoto(null);
      }
      setPhotoToDelete(null);
      showToast(`Photo "${deletedTitle}" deleted successfully.`);
    } catch (err) {
      console.error('Failed to delete photo:', err);
      showToast('Error deleting photo. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredPhotos = filter === 'all'
    ? photos
    : photos.filter((p) => p.category === filter);

  const categoryLabels: Record<string, string> = {
    all: 'All Photos',
    sanctum: 'Temple Sanctum',
    festivals: 'Festivals & Aarthi',
    steps: '18 Holy Steps',
    annadanam: 'Annadanam',
    pilgrimage: 'Pilgrim Heritage',
    events: 'Special Events',
  };

  return (
    <div className="min-h-screen bg-[#0C0704] text-stone-200">
      <PageHeader
        title={t('gallery.title')}
        subtitle={t('gallery.subtitle')}
        kicker={t('gallery.kicker')}
        breadcrumb={t('nav.gallery')}
        onNavigateHome={() => onNavigate('home')}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1A0D06] border border-[#F5BD47] text-[#FFE29A] text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Admin Management Toolbar */}
        <div className="rounded-2xl bg-[#140A05] border border-[#F5BD47]/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-gold-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#F5BD47]/50 bg-[#251308] flex items-center justify-center text-[#F5BD47] shrink-0">
              {isAdmin ? '🛡️' : '📷'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel font-bold text-sm sm:text-base text-[#FFE29A]">
                  Temple Divine Gallery
                </span>
                {isAdmin && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    Admin Mode Active
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-400">
                {isAdmin
                  ? `Signed in as ${adminProfile?.name || adminProfile?.email || 'Admin'} • You can upload & delete gallery photos`
                  : 'Devotees can explore sacred darshan, festivals, and seva moments'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {isAdmin ? (
              <>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5BD47] to-[#E5A93C] hover:from-[#FFE29A] hover:to-[#F5BD47] text-[#0C0704] font-bold text-xs tracking-wide shadow-gold-glow cursor-pointer transition-all transform hover:scale-[1.02]"
                >
                  <span>➕</span>
                  <span>Upload Photo</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer border border-stone-700 transition-colors"
                  title="Sign out of Admin"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setAdminLoginOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F1109] hover:bg-[#2F1A0E] text-[#F5BD47] hover:text-[#FFE29A] border border-[#F5BD47]/40 text-xs font-semibold tracking-wide cursor-pointer transition-all shadow-sm"
              >
                <span>🔑</span>
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(categoryLabels).map(([catKey, label]) => (
            <button
              key={catKey}
              onClick={() => setFilter(catKey)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                filter === catKey
                  ? 'bg-[#F5BD47] text-[#0C0704] shadow-gold-glow font-bold scale-[1.02]'
                  : 'bg-[#180E08] text-stone-300 hover:text-[#F5BD47] border border-[#F5BD47]/20 hover:border-[#F5BD47]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Photos Count & Notice */}
        <div className="flex items-center justify-between text-xs text-stone-400 px-1 border-b border-stone-800/80 pb-2">
          <span>
            Showing <strong className="text-[#F5BD47]">{filteredPhotos.length}</strong> photo{filteredPhotos.length === 1 ? '' : 's'}
          </span>
          {isAdmin && (
            <span className="text-amber-400/90 flex items-center gap-1 font-medium">
              <span>ⓘ</span> Click red trash icon (🗑️) on any card to delete
            </span>
          )}
        </div>

        {/* Photos Grid */}
        {loadingPhotos ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#F5BD47] border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-stone-400">Loading sacred temple photo gallery...</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#140A05] border border-dashed border-[#F5BD47]/30 p-8">
            <div className="text-4xl mb-3">🖼️</div>
            <h3 className="font-serif text-lg font-bold text-[#FFE29A] mb-1">No Photos in This Category</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto mb-4">
              There are currently no photos uploaded under this category.
            </p>
            {isAdmin && (
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#F5BD47] text-[#0C0704] font-bold text-xs cursor-pointer shadow-gold-glow"
              >
                Upload Photo Now
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative rounded-3xl overflow-hidden bg-[#160B05] border border-[#F5BD47]/25 hover:border-[#F5BD47] transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow cursor-pointer aspect-4/3 flex flex-col justify-end"
              >
                {/* Image */}
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                />

                {/* Admin Delete Action Button (Overlayed top-right) */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={(e) => initiateDelete(e, photo)}
                    title={`Delete "${photo.title}"`}
                    className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-red-600/90 hover:bg-red-500 text-white border-2 border-white/80 flex items-center justify-center text-sm shadow-2xl cursor-pointer transition-transform transform hover:scale-115 active:scale-95"
                  >
                    🗑️
                  </button>
                )}

                {/* Category Badge Top-Left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#0C0704]/80 text-[#F5BD47] border border-[#F5BD47]/30 backdrop-blur-sm">
                    {photo.category}
                  </span>
                </div>

                {/* Scrim & Caption */}
                <div className="relative z-10 p-5 bg-gradient-to-t from-[#0C0704] via-[#0C0704]/85 to-transparent">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#FFE29A] transition-colors leading-snug line-clamp-1">
                    {photo.title}
                  </h3>
                  {photo.caption && (
                    <p className="text-xs text-stone-300 line-clamp-2 mt-1 font-light leading-relaxed">
                      {photo.caption}
                    </p>
                  )}
                  {photo.capturedDate && (
                    <span className="text-[10px] text-stone-400 mt-2 block">
                      📅 {photo.capturedDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#120803] border border-[#F5BD47]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="p-4 sm:p-5 border-b border-[#F5BD47]/20 flex items-center justify-between gap-4 bg-[#180E08]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#F5BD47] font-semibold">
                  {categoryLabels[activePhoto.category] || activePhoto.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">{activePhoto.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <button
                    onClick={(e) => initiateDelete(e, activePhoto)}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold border border-red-400 shadow-md cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <span>🗑️</span>
                    <span>Delete Photo</span>
                  </button>
                )}
                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-8 h-8 rounded-full bg-stone-900 text-stone-400 hover:text-white flex items-center justify-center cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Lightbox Image Preview */}
            <div className="p-3 sm:p-4 flex-1 flex items-center justify-center bg-[#070301] overflow-hidden min-h-[300px] max-h-[62vh]">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[58vh] w-auto max-w-full object-contain rounded-xl border border-[#F5BD47]/20 shadow-2xl"
              />
            </div>

            {/* Lightbox Caption Footer */}
            <div className="p-4 sm:p-5 border-t border-[#F5BD47]/20 bg-[#160B05] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-stone-300">
              <div className="space-y-1">
                <p className="text-stone-200 text-sm font-normal">{activePhoto.caption || activePhoto.title}</p>
                {activePhoto.capturedDate && (
                  <p className="text-[11px] text-stone-400">Captured on: {activePhoto.capturedDate}</p>
                )}
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="px-5 py-2 rounded-xl bg-[#F5BD47] hover:bg-[#FFE29A] text-[#0C0704] font-bold cursor-pointer shrink-0 transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={() => {
          showToast('Signed in as Admin. You can now upload and delete photos.');
        }}
      />

      {/* Upload Photo Modal */}
      <UploadPhotoModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onPhotoUploaded={() => {
          showToast('New photo published to gallery successfully!');
        }}
      />

      {/* Delete Confirmation In-App Modal */}
      <DeleteConfirmationModal
        isOpen={!!photoToDelete}
        photo={photoToDelete}
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPhotoToDelete(null)}
      />
    </div>
  );
};
