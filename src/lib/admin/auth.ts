/**
 * Admin authentication utilities
 */

import { supabase } from '@/lib/supabase/client';
import { supabaseAdmin } from '@/lib/supabase/server';

/**
 * Check if current user is an admin (client-side)
 */
export async function isAdminClient(): Promise<boolean> {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Auth error:', userError);
      return false;
    }

    // Use the user's own ID to check - RLS allows users to see their own record
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, is_active')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Admin check error:', error);
      return false;
    }

    return !!data && data.is_active === true;
  } catch (error) {
    console.error('isAdminClient error:', error);
    return false;
  }
}

/**
 * Check if current user is an admin (server-side)
 */
export async function isAdminServer(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .eq('is_active', true)
      .single();

    return !error && !!data;
  } catch {
    return false;
  }
}

/**
 * Sign in admin user
 */
export async function signInAdmin(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'No user data returned' };
    }

    // Wait a moment for session to be established
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verify user is admin
    const isAdmin = await isAdminClient();
    if (!isAdmin) {
      await supabase.auth.signOut();
      return {
        success: false,
        error:
          'User is not an admin. Please make sure the user exists in the admin_users table. See CMS_SETUP_GUIDE.md for instructions.',
      };
    }

    return { success: true, user: data.user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during login',
    };
  }
}

/**
 * Sign out admin user
 */
export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  return { success: !error, error: error?.message };
}

/**
 * Get current admin user
 */
export async function getCurrentAdmin() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .eq('is_active', true)
    .single();

  return data;
}

