import { NextRequest, NextResponse } from 'next/server';

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
}
