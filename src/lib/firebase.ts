import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Hardcoded Master Firebase Configuration for standalone Netlify & local deployments
export const FIREBASE_CONFIG = {
  projectId: 'root-adviser-j07pf',
  appId: '1:326585801874:web:76db786df04f47c2d2da4b',
  apiKey: 'AIzaSyDrkElz1s-vySxD5k-RatXHOx7rfEn8lS0',
  authDomain: 'root-adviser-j07pf.firebaseapp.com',
  firestoreDatabaseId: 'ai-studio-sriayyappaswamyt-77b4170c-593b-4edd-8785-d56a30104c67',
  storageBucket: 'root-adviser-j07pf.firebasestorage.app',
  messagingSenderId: '326585801874',
  measurementId: '',
  oAuthClientId: '326585801874-kr52df253fahopo7mmf5j14o5pj2ta16.apps.googleusercontent.com',
};

// Initialize Firebase App instance safely
const app =
  getApps().length === 0
    ? initializeApp(FIREBASE_CONFIG)
    : getApps()[0];

// Initialize Firestore with Database ID (Mandatory for applet & standalone environments)
export const db = getFirestore(app, FIREBASE_CONFIG.firestoreDatabaseId);

// Initialize Authentication & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Operation Types for error handling
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection check on boot
export async function validateFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline or connecting...');
    }
    return false;
  }
}

// Validate in background
validateFirebaseConnection().catch(() => {});
