import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export interface AdminProfile {
  name: string;
  email: string;
  type: 'credential' | 'google';
}

interface AuthContextType {
  user: User | null;
  adminProfile: AdminProfile | null;
  isAdmin: boolean;
  loading: boolean;
  signInAdminWithGoogle: () => Promise<User | null>;
  signInWithCredentials: (username: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
}

const ADMIN_STORAGE_KEY = 'temple_admin_authenticated_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [credentialAdmin, setCredentialAdmin] = useState<AdminProfile | null>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithCredentials = async (username: string, pass: string): Promise<boolean> => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanUser === 'admin' && cleanPass === 'Admin@123') {
      const profile: AdminProfile = {
        name: 'Head Temple Administrator',
        email: 'admin@ayyappatemple.org',
        type: 'credential',
      };
      setCredentialAdmin(profile);
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(profile));
      } catch {
        // ignore
      }
      return true;
    }

    throw new Error('Invalid Username or Password. Please use Admin / Admin@123');
  };

  const signInAdminWithGoogle = async (): Promise<User | null> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err: unknown) {
      console.error('Sign-in failed:', err);
      throw err;
    }
  };

  const logoutAdmin = async (): Promise<void> => {
    setCredentialAdmin(null);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      await signOut(auth);
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  const isAdmin = !!user || !!credentialAdmin;
  const adminProfile: AdminProfile | null = credentialAdmin
    ? credentialAdmin
    : user
    ? {
        name: user.displayName || 'Google Admin',
        email: user.email || 'admin@temple.org',
        type: 'google',
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        adminProfile,
        isAdmin,
        loading,
        signInAdminWithGoogle,
        signInWithCredentials,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
