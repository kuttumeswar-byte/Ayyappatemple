import React, { useState, useRef } from 'react';
import { addGalleryPhoto, compressImageFile } from '../services/galleryService';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoUploaded?: () => void;
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  isOpen,
  onClose,
  onPhotoUploaded,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('sanctum');
  const [caption, setCaption] = useState('');
  const [capturedDate, setCapturedDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      setImagePreview(compressedDataUrl);
      setImageUrl(compressedDataUrl);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process image. Please try another photo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a photo title.');
      return;
    }
    if (!imageUrl) {
      setErrorMsg('Please select or provide an image.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await addGalleryPhoto({
        title: title.trim(),
        category,
        caption: caption.trim(),
        imageUrl,
        capturedDate,
      });

      // Reset form
      setTitle('');
      setCaption('');
      setImageUrl('');
      setImagePreview(null);
      if (onPhotoUploaded) onPhotoUploaded();
      onClose();
    } catch (err: unknown) {
      console.error('Photo upload error:', err);
      setErrorMsg('Failed to upload photo to Firestore. Please check your admin permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#1C0F07] to-[#0D0603] border border-[#F5BD47]/40 shadow-2xl p-6 sm:p-8 text-stone-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#2A160A] text-stone-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-[#F5BD47]/20"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#F5BD47] font-semibold block">
            Admin Photo Management
          </span>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Upload Gallery Photo</h2>
          <p className="text-xs text-stone-400 mt-1">
            Add a new sacred photo to the temple gallery for devotees worldwide.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Source Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">Image Source</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                  uploadMode === 'file'
                    ? 'bg-[#F5BD47] text-[#0C0704] border-[#F5BD47] shadow-gold-glow'
                    : 'bg-[#160B05] text-stone-300 border-[#F5BD47]/20 hover:border-[#F5BD47]/50'
                }`}
              >
                📁 Choose File from Device
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                  uploadMode === 'url'
                    ? 'bg-[#F5BD47] text-[#0C0704] border-[#F5BD47] shadow-gold-glow'
                    : 'bg-[#160B05] text-stone-300 border-[#F5BD47]/20 hover:border-[#F5BD47]/50'
                }`}
              >
                🔗 Enter Image URL
              </button>
            </div>
          </div>

          {/* Upload File Input */}
          {uploadMode === 'file' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="photo-upload-input"
              />
              <label
                htmlFor="photo-upload-input"
                className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#F5BD47]/40 rounded-2xl bg-[#160B05]/60 hover:bg-[#221108] cursor-pointer transition-colors text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#2A160A] text-[#F5BD47] flex items-center justify-center mb-2">
                  📷
                </div>
                <span className="text-xs font-semibold text-stone-200">
                  {imagePreview ? 'Change Selected Photo' : 'Click to Browse & Upload Photo'}
                </span>
                <span className="text-[10px] text-stone-400 mt-0.5">Supports JPG, PNG, WebP (auto-optimized)</span>
              </label>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Image Direct Web URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                placeholder="https://example.com/temple-photo.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#160B05] border border-[#F5BD47]/30 text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-[#F5BD47]"
              />
            </div>
          )}

          {/* Image Preview Box */}
          {imagePreview && (
            <div className="relative rounded-2xl overflow-hidden border border-[#F5BD47]/40 max-h-48 bg-black flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="max-h-48 w-full object-cover object-center"
              />
              <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-[#F5BD47] font-semibold">
                Preview Ready
              </div>
            </div>
          )}

          {/* Photo Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Photo Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Maha Mandala Pooja Deepam"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#160B05] border border-[#F5BD47]/30 text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-[#F5BD47]"
            />
          </div>

          {/* Category & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#160B05] border border-[#F5BD47]/30 text-stone-100 text-xs focus:outline-none focus:border-[#F5BD47]"
              >
                <option value="sanctum">Temple Sanctum</option>
                <option value="festivals">Festivals & Aarthi</option>
                <option value="steps">18 Holy Steps</option>
                <option value="annadanam">Annadanam</option>
                <option value="pilgrimage">Pilgrim Heritage</option>
                <option value="events">Special Events</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Captured Date</label>
              <input
                type="date"
                value={capturedDate}
                onChange={(e) => setCapturedDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#160B05] border border-[#F5BD47]/30 text-stone-100 text-xs focus:outline-none focus:border-[#F5BD47]"
              />
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Caption / Description</label>
            <textarea
              rows={2}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Brief spiritual significance or occasion details..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#160B05] border border-[#F5BD47]/30 text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-[#F5BD47] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !imageUrl || !title}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5BD47] to-[#E5A93C] hover:from-[#FFE29A] hover:to-[#F5BD47] text-[#0C0704] font-bold text-xs tracking-wide shadow-gold-glow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Publish to Gallery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
