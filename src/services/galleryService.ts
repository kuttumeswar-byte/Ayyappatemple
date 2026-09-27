import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../lib/firebase';

export interface GalleryPhotoItem {
  id: string;
  title: string;
  category: string; // 'sanctum' | 'festivals' | 'steps' | 'annadanam' | 'pilgrimage' | 'events'
  caption?: string;
  imageUrl: string;
  capturedDate?: string;
  uploadedBy?: string;
  uploadedByEmail?: string;
  createdAt?: string;
}

export const INITIAL_TEMPLE_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 'seed-sanctum-moolavar',
    title: 'Moolasthanam Golden Sanctum',
    category: 'sanctum',
    caption: 'The consecrated golden idol of Lord Sri Ayyappa Swamy seated in Chinmudra posture radiating tranquility and divine bliss.',
    imageUrl: '/hero-bg.png',
    capturedDate: '2026-01-14',
    uploadedByEmail: 'admin@temple.org',
  },
  {
    id: 'seed-pathinettampadi-brass',
    title: 'The Sacred Pathinettampadi (18 Steps)',
    category: 'steps',
    caption: 'Golden brass plated eighteen holy steps flanked by glowing brass deepams, ascended only by pilgrims bearing the Irumudi.',
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    capturedDate: '2026-01-10',
    uploadedByEmail: 'admin@temple.org',
  },
  {
    id: 'seed-deeparadhana-aarthi',
    title: 'Maha Deeparadhana Camphor Aarthi',
    category: 'festivals',
    caption: 'Priests offering the grand multi-tiered brass lamp accompanied by resonant bell chiming and sacred Vedic chants.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    capturedDate: '2025-12-25',
    uploadedByEmail: 'admin@temple.org',
  },
  {
    id: 'seed-sacred-annadanam-hall',
    title: 'Nitya Annadanam Feast Hall',
    category: 'annadanam',
    caption: 'Devotees partaking in consecrated vegetarian feast served with love on fresh green plantain leaves.',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80',
    capturedDate: '2025-11-17',
    uploadedByEmail: 'admin@temple.org',
  },
  {
    id: 'seed-irumudi-trek',
    title: 'Pilgrims Carrying Sacred Irumudi',
    category: 'pilgrimage',
    caption: 'Devotees dressed in black dhotis carrying the sacred twin bundle on their heads in deep devotion and discipline.',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    capturedDate: '2026-01-05',
    uploadedByEmail: 'admin@temple.org',
  },
  {
    id: 'seed-makarajyothi-glory',
    title: 'Makarajyothi Celestial Illumination',
    category: 'festivals',
    caption: 'The divine light appearing on Makara Sankranti evening, viewed with tears of devotion and collective chants of Swamiye Saranam Ayyappa.',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    capturedDate: '2026-01-14',
    uploadedByEmail: 'admin@temple.org',
  },
];

const GALLERY_PATH = 'gallery';
const DELETED_PATH = 'deleted_photos';
const LOCAL_DELETED_KEY = 'temple_deleted_photo_ids';

let activeSubscribers: ((photos: GalleryPhotoItem[]) => void)[] = [];
let latestPhotos: GalleryPhotoItem[] = [];

function getLocalDeletedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LOCAL_DELETED_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {
    // ignore
  }
  return new Set();
}

function addLocalDeletedId(id: string) {
  try {
    const current = getLocalDeletedIds();
    current.add(id);
    localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(Array.from(current)));
  } catch {
    // ignore
  }
}

/**
 * Subscribe to real-time gallery updates from Firestore.
 * Listens to uploaded photos and deleted photos tracking.
 */
export function subscribeToGalleryPhotos(
  onUpdate: (photos: GalleryPhotoItem[]) => void,
  onError?: (err: Error) => void
): () => void {
  activeSubscribers.push(onUpdate);

  const galleryRef = collection(db, GALLERY_PATH);
  const deletedRef = collection(db, DELETED_PATH);

  let currentUploaded: GalleryPhotoItem[] = [];
  let currentDeletedIds = getLocalDeletedIds();

  const emit = () => {
    // Combine custom uploads + seed photos, excluding any deleted IDs
    const combined: GalleryPhotoItem[] = [];
    const seenIds = new Set<string>();

    // 1. Add user uploaded photos
    for (const p of currentUploaded) {
      if (!currentDeletedIds.has(p.id) && !seenIds.has(p.id)) {
        seenIds.add(p.id);
        combined.push(p);
      }
    }

    // 2. Add seed photos if not deleted
    for (const seed of INITIAL_TEMPLE_PHOTOS) {
      if (!currentDeletedIds.has(seed.id) && !seenIds.has(seed.id)) {
        seenIds.add(seed.id);
        combined.push(seed);
      }
    }

    latestPhotos = combined;
    for (const sub of activeSubscribers) {
      sub(combined);
    }
  };

  // Immediate emit from initial state / local cache
  emit();

  // Listen to deleted collection
  const unsubDeleted = onSnapshot(
    deletedRef,
    (snap) => {
      snap.forEach((docSnap) => {
        currentDeletedIds.add(docSnap.id);
        addLocalDeletedId(docSnap.id);
      });
      emit();
    },
    (err) => {
      console.warn('Deleted tracker snapshot notice:', err);
    }
  );

  // Listen to active gallery collection
  const unsubGallery = onSnapshot(
    galleryRef,
    (snapshot) => {
      const dbPhotos: GalleryPhotoItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        dbPhotos.push({
          id: docSnap.id,
          title: data.title || 'Temple Photo',
          category: data.category || 'sanctum',
          caption: data.caption || '',
          imageUrl: data.imageUrl || '',
          capturedDate: data.capturedDate || '',
          uploadedBy: data.uploadedBy || '',
          uploadedByEmail: data.uploadedByEmail || '',
          createdAt: data.createdAt || '',
        });
      });
      currentUploaded = dbPhotos;
      emit();
    },
    (error) => {
      console.error('Gallery snapshot error:', error);
      emit();
      if (onError) {
        try {
          handleFirestoreError(error, OperationType.GET, GALLERY_PATH);
        } catch (wrappedErr) {
          onError(wrappedErr as Error);
        }
      }
    }
  );

  return () => {
    activeSubscribers = activeSubscribers.filter((s) => s !== onUpdate);
    unsubGallery();
    unsubDeleted();
  };
}

/**
 * Upload a new photo to Firestore
 */
export async function addGalleryPhoto(photoData: {
  title: string;
  category: string;
  caption?: string;
  imageUrl: string;
  capturedDate?: string;
}): Promise<string> {
  const photoId = 'photo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const photoDocRef = doc(db, GALLERY_PATH, photoId);

  const currentUser = auth.currentUser;
  const payload = {
    id: photoId,
    title: photoData.title.trim(),
    category: photoData.category,
    caption: (photoData.caption || '').trim(),
    imageUrl: photoData.imageUrl,
    capturedDate: photoData.capturedDate || new Date().toISOString().split('T')[0],
    uploadedBy: currentUser?.uid || 'admin',
    uploadedByEmail: currentUser?.email || 'admin@temple.org',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(photoDocRef, payload);
    return photoId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${GALLERY_PATH}/${photoId}`);
  }
}

/**
 * Delete a photo (works on ANY photo: initial seed or user uploaded)
 */
export async function deleteGalleryPhoto(photoId: string): Promise<void> {
  addLocalDeletedId(photoId);

  // Instantly broadcast removal to all active UI subscribers
  const filtered = latestPhotos.filter((p) => p.id !== photoId);
  latestPhotos = filtered;
  for (const sub of activeSubscribers) {
    sub(filtered);
  }

  // 1. Delete from main gallery collection
  const photoDocRef = doc(db, GALLERY_PATH, photoId);
  try {
    await deleteDoc(photoDocRef);
  } catch (err) {
    console.warn('Doc delete note (may be seed):', err);
  }

  // 2. Mark in deleted_photos registry
  try {
    const deletedDocRef = doc(db, DELETED_PATH, photoId);
    await setDoc(deletedDocRef, {
      id: photoId,
      deletedAt: new Date().toISOString(),
      deletedBy: 'Admin',
    });
  } catch (err) {
    console.error('Tombstone save error:', err);
  }
}

/**
 * Helper to compress and convert client image files (from file input) to optimized Base64
 */
export function compressImageFile(file: File, maxDim = 1280, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as WebP or JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
