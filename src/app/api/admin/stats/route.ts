import { NextResponse } from 'next/server';
import { getStats, isFirestoreConfigured } from '@/lib/db';

export async function GET() {
  if (!isFirestoreConfigured()) {
    // Return mock stats if not configured
    return NextResponse.json({
      totalSchemes: 0,
      totalSubmissions: 0,
      pendingSubmissions: 0,
      categories: {},
    });
  }

  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
