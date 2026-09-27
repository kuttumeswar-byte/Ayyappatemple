import React from 'react';
import { GalleryPhotoItem } from '../services/galleryService';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  photo: GalleryPhotoItem | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  photo,
  loading,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#1E0C06] to-[#0E0502] border border-red-500/40 shadow-2xl p-6 sm:p-7 text-stone-200">
        {/* Warning Icon */}
        <div className="w-14 h-14 mx-auto mb-3 rounded-full border border-red-500/50 bg-red-950/80 flex items-center justify-center text-red-300 text-2xl shadow-lg">
          🗑️
        </div>

        <div className="text-center mb-5">
          <h3 className="font-serif text-xl font-bold text-white mb-1">Delete Gallery Photo?</h3>
          <p className="text-xs text-stone-300">
            Are you sure you want to permanently remove this photo from the temple gallery?
          </p>
        </div>

        {/* Photo Preview Mini-card */}
        <div className="mb-6 p-3 rounded-2xl bg-[#140803] border border-[#F5BD47]/20 flex items-center gap-3">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-16 h-16 rounded-xl object-cover border border-[#F5BD47]/30 shrink-0"
          />
          <div className="min-w-0 flex-1 text-left">
            <span className="text-[10px] uppercase font-bold text-[#F5BD47] tracking-wider block">
              {photo.category}
            </span>
            <h4 className="font-serif text-sm font-bold text-white truncate">{photo.title}</h4>
            {photo.capturedDate && (
              <p className="text-[10px] text-stone-400 mt-0.5">📅 {photo.capturedDate}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer border border-stone-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold shadow-lg cursor-pointer transition-all transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></span>
            ) : (
              <>
                <span>🗑️</span>
                <span>Yes, Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
