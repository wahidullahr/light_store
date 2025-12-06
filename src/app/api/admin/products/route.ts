import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { ProductInsert } from '@/lib/supabase/types';

/**
 * GET /api/admin/products - Get all products
 * POST /api/admin/products - Create new product
 */
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('products').select('*').order('display_order');

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ProductInsert;

    const { data, error } = await supabaseAdmin.from('products').insert(body as any).select().single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

