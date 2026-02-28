import { NextRequest, NextResponse } from 'next/server';
import { getAllSchemes, getStatesIndex, getCategoriesIndex } from '@/lib/schemes';
import { getAllSchemesDB, isFirestoreConfigured } from '@/lib/db';

// GET /api/schemes - List all schemes with optional filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as any;
  const state = searchParams.get('state');

  // Use Firestore if configured, otherwise fall back to JSON
  if (isFirestoreConfigured()) {
    const schemes = await getAllSchemesDB({
      category: category || undefined,
      state: state || undefined,
      status: 'published',
    });

    return NextResponse.json({
      schemes,
      states: getStatesIndex(),
      categories: getCategoriesIndex(),
    });
  }

  // Fallback to JSON data
  let schemes = getAllSchemes();

  if (category) {
    schemes = schemes.filter((s) => s.category === category);
  }

  if (state) {
    schemes = schemes.filter(
      (s) => s.states.includes('all') || s.states.includes(state)
    );
  }

  return NextResponse.json({
    schemes,
    states: getStatesIndex(),
    categories: getCategoriesIndex(),
  });
}
