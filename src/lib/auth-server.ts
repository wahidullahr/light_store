/**
 * Server-side authentication utilities
 * For use in Server Components and API routes
 */

import { supabaseAdmin } from '@/lib/supabase/server';

/**
 * Server-side admin check
 */
export async function isAdminServer(userId: string): Promise<boolean> {
  try {
    const { data } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .eq('is_active', true)
      .single();

    return !!data;
  } catch {
    return false;
  }
}



