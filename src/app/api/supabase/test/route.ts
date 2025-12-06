import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

/**
 * Test Supabase connection endpoint
 * GET /api/supabase/test
 * 
 * This endpoint tests the Supabase server connection
 */
export async function GET() {
  try {
    // Test connection with a simple query
    const { data, error } = await supabaseAdmin.from('_test').select('count').limit(1);

    if (error) {
      // If table doesn't exist, connection is still working
      if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
        return NextResponse.json(
          {
            success: true,
            message: 'Supabase connection successful',
            note: 'Test table does not exist, which is expected. Connection is working correctly.',
          },
          { status: 200 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Supabase connection successful',
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Supabase connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

