import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

/**
 * POST /api/admin/add-admin - Add existing auth user to admin_users table (ADMIN ONLY)
 * 
 * Body: { email: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Check if requester is authenticated admin
    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: 'Missing Supabase configuration' },
        { status: 500 }
      );
    }

    const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in as admin.' },
        { status: 401 }
      );
    }

    // Verify user is admin
    const { data: adminUser } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .eq('id', session.user.id)
      .eq('is_active', true)
      .single();

    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: 'Forbidden. Only admins can add other admins.' },
        { status: 403 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user in auth.users by email
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();

    if (listError) {
      return NextResponse.json(
        { success: false, error: `Failed to list users: ${listError.message}` },
        { status: 500 }
      );
    }

    const user = users.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: `User with email ${email} not found in Supabase Auth. Please create the user first in Authentication > Users.`,
        },
        { status: 404 }
      );
    }

    // Check if user already exists in admin_users
    const { data: existingAdmin, error: checkError } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" which is fine
      return NextResponse.json(
        {
          success: false,
          error: `Failed to check existing admin: ${checkError.message}`,
        },
        { status: 500 }
      );
    }

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'User is already an admin',
        },
        { status: 400 }
      );
    }

    // Add user to admin_users table
    const { error: insertError } = await supabaseAdmin
      .from('admin_users')
      .insert({
        id: user.id,
        email: user.email!,
        role: 'admin',
        is_active: true,
      });

    if (insertError) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to add user to admin_users: ${insertError.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `User ${email} has been added to admin_users table`,
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

