/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - Supabase type inference issues with custom Database types
/**
 * Simple, robust authentication
 * CLIENT-SIDE ONLY - for use in client components
 */

import { supabase } from '@/lib/supabase/client';

/**
 * Check if current user is admin (client-side)
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return false;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return false;

    // Query admin_users - RLS policy allows if id = auth.uid()
    const { data, error } = await supabase
      .from('admin_users')
      .select('is_active')
      .eq('id', user.id)
      .single();

    // If direct query fails (e.g. RLS issues), try server-side verification API
    if (error || !data) {
      try {
        const response = await fetch('/api/admin/verify-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            return true;
          }
        }
      } catch {
        // Ignore error
      }
      return false;
    }

    return data.is_active === true;
  } catch {
    return false;
  }
}

/**
 * Sign in
 */
export async function signIn(email: string, password: string) {
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

    // Use session from response if available, otherwise wait and get it
    let session = data.session;

    if (!session) {
      // Wait for session to be stored in browser
      await new Promise(resolve => setTimeout(resolve, 1500));

      const {
        data: { session: retrievedSession },
      } = await supabase.auth.getSession();

      session = retrievedSession;
    } else {
      // Session is in response, just wait a bit for it to be stored
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (!session) {
      return {
        success: false,
        error: 'Session not established. Please try again.',
      };
    }

    // Verify admin status
    const admin = await isAdmin();
    if (!admin) {
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'User is not an admin. Please contact administrator.',
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
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { success: !error, error: error?.message };
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
