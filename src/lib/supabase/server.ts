import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

let supabaseAdminInstance: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Get Supabase admin client (lazy initialization)
 * This ensures environment variables are checked only when actually used
 */
function getSupabaseAdmin() {
  if (supabaseAdminInstance) {
    return supabaseAdminInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Missing Supabase server environment variables. Please check your .env.local file has NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY set.'
    );
  }

  supabaseAdminInstance = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseAdminInstance;
}

/**
 * Supabase client for server-side operations
 * Use this in Server Components, API routes, and server actions
 * This client bypasses Row Level Security (RLS) policies
 *
 * Note: This uses lazy initialization to avoid errors when environment variables
 * are not yet loaded during module import
 */
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(_target, prop) {
    const client = getSupabaseAdmin();
    const value = client[prop as keyof typeof client];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
