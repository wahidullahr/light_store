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

    // Wait a bit longer for session to be fully established
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Use the user's own ID to check - RLS allows users to see their own record
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, is_active, email')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Admin check error:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        userId: user.id,
        userEmail: user.email,
      });
      return false;
    }

    if (!data) {
      console.error('No admin record found for user:', user.id);
      return false;
    }

    if (data.is_active !== true) {
      console.error('Admin user is not active:', data);
      return false;
    }

    return true;
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

    // Wait for session to be fully established
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Get session to verify it's established
    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();

    if (!currentSession) {
      return {
        success: false,
        error: 'Session not established. Please try again.',
      };
    }

    // Verify user is admin
    const isAdmin = await isAdminClient();
    if (!isAdmin) {
      // Get more details about why it failed
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      // Try to query admin_users directly to see what's wrong
      const { data: adminCheck, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', currentUser?.id || '')
        .single();

      console.error('Admin verification failed:', {
        userId: currentUser?.id,
        userEmail: currentUser?.email,
        adminCheck,
        adminError,
      });

      await supabase.auth.signOut();
      return {
        success: false,
        error:
          'User is not an admin. Please verify the user exists in admin_users table with is_active=true. Check browser console for details.',
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
