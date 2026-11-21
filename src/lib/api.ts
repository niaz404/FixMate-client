import { authClient } from '@/lib/auth-client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Standard fetch helper calling Express backend on port 5000
 * Automatically attaches BetterAuth session token as Bearer token
 */
export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; [key: string]: any }> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Get session token from BetterAuth
  if (typeof window !== 'undefined') {
    try {
      const sessionRes = await authClient.getSession();
      const token = sessionRes?.data?.session?.token;
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      // In case session check fails or unauthenticated
    }
  }

  // Ensure leading slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  try {
    const res = await fetch(`${API_BASE}${cleanEndpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      let errorMsg = `Request failed with status ${res.status}`;
      try {
        const errJson = await res.json();
        errorMsg = errJson.message || errorMsg;
      } catch (_) {}
      return {
        success: false,
        message: errorMsg,
      };
    }

    const data = await res.json();
    return {
      success: true,
      ...data,
      data: Array.isArray(data) ? data : data.data || data,
    };
  } catch (error: any) {
    console.warn(`[FixMate API] Connection note on ${endpoint}:`, error.message);
    return {
      success: false,
      message: error.message || 'Unable to connect to FixMate backend server.',
    };
  }
}
