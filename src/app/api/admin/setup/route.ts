import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase/server';

/**
 * POST /api/admin/setup - Create admin user (ADMIN ONLY)
 * This endpoint is disabled - admin users must be created manually in Supabase
 * 
 * Body: { email: string, password: string }
 */
export async function POST(request: NextRequest) {
  // Disable this endpoint - admin creation is restricted
  return NextResponse.json(
    {
      success: false,
      error: 'Admin user creation is disabled. Please create admin users manually in Supabase Dashboard.',
    },
    { status: 403 }
  );
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    });

    if (authError) {
      return NextResponse.json(
        { success: false, error: `Auth error: ${authError.message}` },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Add user to admin_users table
    const { error: adminError } = await supabaseAdmin
      .from('admin_users')
      .insert({
        id: authData.user.id,
        email: authData.user.email!,
        role: 'admin',
        is_active: true,
      });

    if (adminError) {
      // If admin_users insert fails, try to delete the auth user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to add user to admin_users: ${adminError.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Admin user created successfully',
        userId: authData.user.id,
      },
      { status: 201 }
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

