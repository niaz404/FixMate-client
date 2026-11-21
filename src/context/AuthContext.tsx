'use client';

import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { authClient, useSession, signOut as betterSignOut } from '@/lib/auth-client';
import { toast } from 'sonner';

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: 'customer' | 'technician' | 'admin';
  phone?: string;
  area?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (payload: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const user: User | null = session?.user
    ? {
        id: session.user.id,
        _id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image || '',
        role: (session.user as any).role || 'customer',
        phone: (session.user as any).phone || '',
        area: (session.user as any).area || '',
        bio: (session.user as any).bio || '',
      }
    : null;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || 'Login failed. Please check your credentials.');
        return false;
      }

      toast.success(`Welcome back!`);
      router.refresh();
      return true;
    } catch (err: any) {
      toast.error('An error occurred during login.');
      return false;
    }
  };

  const register = async (payload: any): Promise<boolean> => {
    try {
      const { data, error } = await authClient.signUp.email({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role || 'customer',
        image: payload.image || '',
      });

      if (error) {
        toast.error(error.message || 'Registration failed.');
        return false;
      }

      toast.success('Account created successfully! Welcome to FixMate.');
      router.refresh();
      return true;
    } catch (err: any) {
      toast.error('An error occurred during registration.');
      return false;
    }
  };

  const logout = async () => {
    await betterSignOut();
    toast.info('You have been signed out.');
    router.push('/sign-in');
    router.refresh();
  };

  const updateUser = () => {
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, loading: isPending, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
