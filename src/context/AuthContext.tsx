'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi, getToken, setToken, removeToken } from '@/lib/api';
import { toast } from 'sonner';

export interface User {
  _id: string;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Keep user logged in across page reloads
  useEffect(() => {
    async function loadUser() {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetchApi('/auth/me');
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          removeToken();
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to verify user session on load', err);
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        toast.success(`Welcome back, ${res.user.name}!`);
        return true;
      } else {
        toast.error(res.message || 'Login failed. Please check your credentials.');
        return false;
      }
    } catch (err: any) {
      toast.error('An error occurred during login.');
      return false;
    }
  };

  const register = async (payload: any): Promise<boolean> => {
    try {
      const res = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        toast.success('Account created successfully! Welcome to FixMate.');
        return true;
      } else {
        toast.error(res.message || 'Registration failed.');
        return false;
      }
    } catch (err: any) {
      toast.error('An error occurred during registration.');
      return false;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    toast.info('You have been signed out.');
    router.push('/sign-in');
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
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
