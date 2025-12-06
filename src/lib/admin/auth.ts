/**
 * Admin authentication utilities
 * SIMPLIFIED AND FIXED VERSION
 */

import { supabase } from '@/lib/supabase/client';
import { supabaseAdmin } from '@/lib/supabase/server';

/**
 * Check if current user is an admin (client-side)
 * SIMPLIFIED: Direct query, no API dependency
 */
export async function isAdminClient(): Promise<boolean> {
  try {
    // Step 1: Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('[isAdminClient] No user found:', userError?.message);
      return false;
    }

    // Step 2: Get session to ensure it's established
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error('[isAdminClient] No session found:', sessionError?.message);
      return false;
    }

    // Step 3: Verify session user matches
    if (session.user.id !== user.id) {
      console.error('[isAdminClient] User ID mismatch');
      return false;
    }

    // Step 4: Query admin_users table
    // This will work if RLS policy is correct: "Users can view their own admin record"
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, email, role, is_active')
      .eq('id', user.id)
      .single();

    if (error) {
      // Log error in multiple ways to ensure we see all details
      console.error('=== [isAdminClient] QUERY ERROR ===');
      console.error('Error object:', error);
      console.error(
        'Error stringified:',
        JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
      );
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      console.error('User ID:', user.id);
      console.error('User Email:', user.email);
      console.error('Session User ID:', session.user.id);
      console.error('Session exists:', !!session);
      console.error('===================================');

      // PGRST116 = not found or RLS blocking
      if (error.code === 'PGRST116') {
        console.error('❌ [isAdminClient] PGRST116 ERROR: User cannot see their own admin record');
        console.error('This means either:');
        console.error('1. User does not exist in admin_users table, OR');
        console.error('2. RLS policy is blocking the query');
        console.error('');
        console.error('🔧 FIX: Run this SQL in Supabase SQL Editor:');
        console.error(`
-- Step 1: Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop old policy if exists
DROP POLICY IF EXISTS "Users can view their own admin record" ON admin_users;

-- Step 3: Create the policy
CREATE POLICY "Users can view their own admin record" ON admin_users
  FOR SELECT USING (id = auth.uid());

-- Step 4: Verify it was created
SELECT policyname, cmd, qual
FROM pg_policies 
WHERE tablename = 'admin_users';
        `);
      } else {
        console.error(`❌ [isAdminClient] Unknown error code: ${error.code || 'NO_CODE'}`);
        console.error('Full error object:', error);
      }

      return false;
    }

    if (!data) {
      console.error('[isAdminClient] No admin record found for user:', user.id);
      return false;
    }

    // Type assertion for admin data
    const adminData = data as {
      id: string;
      email: string;
      role: string;
      is_active: boolean;
    };

    if (adminData.is_active !== true) {
      console.error('[isAdminClient] Admin user is not active:', adminData);
      return false;
    }

    console.log('[isAdminClient] ✅ Admin verified:', {
      userId: adminData.id,
      email: adminData.email,
      role: adminData.role,
    });

    return true;
  } catch (error) {
    console.error('[isAdminClient] Unexpected error:', error);
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
      .select('id, is_active')
      .eq('id', userId)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('[isAdminServer] Error:', error.message);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('[isAdminServer] Unexpected error:', error);
    return false;
  }
}

/**
 * Sign in admin user
 * SIMPLIFIED: Better error handling and session management
 */
export async function signInAdmin(email: string, password: string) {
  try {
    console.log('[signInAdmin] Attempting login for:', email);

    // Step 1: Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[signInAdmin] Auth error:', error.message);
      return { success: false, error: error.message };
    }

    if (!data.user) {
      console.error('[signInAdmin] No user data returned');
      return { success: false, error: 'No user data returned' };
    }

    console.log('[signInAdmin] ✅ Auth successful, user ID:', data.user.id);

    // Step 2: Wait for session to be established
    // Give Supabase time to set cookies and establish session
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 3: Verify session is established
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error('[signInAdmin] Session not established:', sessionError?.message);
      return {
        success: false,
        error: 'Session not established. Please try again.',
      };
    }

    if (session.user.id !== data.user.id) {
      console.error('[signInAdmin] Session user mismatch');
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'Session verification failed. Please try again.',
      };
    }

    console.log('[signInAdmin] ✅ Session established');

    // Step 4: Check if user is admin
    // Wait a bit more to ensure RLS context is ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('[signInAdmin] Checking admin status...');
    const isAdmin = await isAdminClient();

    if (!isAdmin) {
      console.error('=== [signInAdmin] ❌ USER IS NOT AN ADMIN ===');
      console.error('User ID:', session.user.id);
      console.error('User Email:', session.user.email);
      console.error('');
      console.error('Possible causes:');
      console.error('1. User does not exist in admin_users table');
      console.error('2. User exists but is_active = false');
      console.error('3. RLS policy is blocking the query (most likely)');
      console.error('4. User ID in admin_users does not match auth.users.id');
      console.error('');
      console.error('🔧 FIX:');
      console.error('1. Run the SQL script: supabase/fix-admin-rls-complete.sql');
      console.error('2. Verify user exists in admin_users:');
      console.error(`   SELECT * FROM admin_users WHERE email = '${session.user.email}';`);
      console.error('3. Check browser console above for detailed error');
      console.error('===========================================');

      // Sign out since they're not admin
      await supabase.auth.signOut();

      return {
        success: false,
        error:
          'User is not an admin. Please verify:\n1. User exists in admin_users table\n2. is_active = true\n3. RLS policy is correctly set\n\nCheck browser console (F12) for detailed error information.',
      };
    }

    console.log('[signInAdmin] ✅ Login successful, user is admin');
    return { success: true, user: data.user };
  } catch (error) {
    console.error('[signInAdmin] Unexpected error:', error);
    await supabase.auth.signOut().catch(() => {});
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
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('[signOutAdmin] Error:', error.message);
    }
    return { success: !error, error: error?.message };
  } catch (error) {
    console.error('[signOutAdmin] Unexpected error:', error);
    return { success: false, error: 'Failed to sign out' };
  }
}

/**
 * Get current admin user
 */
export async function getCurrentAdmin() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('[getCurrentAdmin] Error:', error);
    return null;
  }
}
