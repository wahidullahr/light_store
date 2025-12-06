import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Get Supabase client (lazy initialization to avoid SSR issues)
 */
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window === 'undefined') {
      // Server-side: return a mock client that will fail gracefully
      console.error('Missing Supabase environment variables on server');
      throw new Error('Missing Supabase environment variables');
    }
    // Client-side: throw error
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

/**
 * Supabase client for client-side operations
 * Use this in React components, client components, and browser contexts
 *
 * Note: This uses lazy initialization to avoid SSR issues
 */
let supabaseInstance: ReturnType<typeof getSupabaseClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof getSupabaseClient>, {
  get(_target, prop) {
    if (!supabaseInstance) {
      supabaseInstance = getSupabaseClient();
    }
    const value = supabaseInstance[prop as keyof typeof supabaseInstance];
    return typeof value === 'function' ? value.bind(supabaseInstance) : value;
  },
});
