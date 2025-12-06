/**
 * Test Supabase connection
 * This file can be used to verify the Supabase setup is working correctly
 */

import { supabase } from './client';

/**
 * Test database connection
 * Call this function to verify Supabase is properly configured
 */
export async function testSupabaseConnection() {
  try {
    // Simple query to test connection
    const { data, error } = await supabase.from('_test').select('count').limit(1);

    if (error) {
      // If table doesn't exist, that's okay - connection is working
      if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
        return {
          success: true,
          message: 'Supabase connection successful (test table does not exist, which is expected)',
        };
      }
      throw error;
    }

    return {
      success: true,
      message: 'Supabase connection successful',
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Supabase connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Test authentication (if auth is enabled)
 */
export async function testSupabaseAuth() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    return {
      success: true,
      message: 'Supabase auth is working',
      hasSession: !!session,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Supabase auth test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

