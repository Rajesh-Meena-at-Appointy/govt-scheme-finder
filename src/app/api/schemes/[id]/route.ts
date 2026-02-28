import { NextRequest, NextResponse } from 'next/server';
import { getSchemeBySlug, getSchemeById, Scheme } from '@/lib/schemes';
import { getSchemeBySlugDB, getSchemeByIdDB, isFirestoreConfigured, createSchemeDB, updateSchemeDB, deleteSchemeDB, DBScheme } from '@/lib/db';

// GET /api/schemes/[id] - Get single scheme
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (isFirestoreConfigured()) {
    // Try by slug first, then by ID
    let scheme = await getSchemeBySlugDB(id);
    if (!scheme) {
      scheme = await getSchemeByIdDB(id);
    }

    if (!scheme) {
      return NextResponse.json({ error: 'Scheme not found' }, { status: 404 });
    }

    return NextResponse.json(scheme);
  }

  // Fallback to JSON
  let scheme = getSchemeBySlug(id);
  if (!scheme) {
    scheme = getSchemeById(id);
  }

  if (!scheme) {
    return NextResponse.json({ error: 'Scheme not found' }, { status: 404 });
  }

  return NextResponse.json(scheme);
}

// PUT /api/schemes/[id] - Update scheme (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  // Validate required fields
  if (!body.name || !body.slug || !body.category) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  if (!isFirestoreConfigured()) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 503 }
    );
  }

  try {
    await updateSchemeDB(id, body as Partial<DBScheme>);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error updating scheme:', error);
    return NextResponse.json(
      { error: 'Failed to update scheme' },
      { status: 500 }
    );
  }
}

// DELETE /api/schemes/[id] - Delete scheme (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isFirestoreConfigured()) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 503 }
    );
  }

  try {
    await deleteSchemeDB(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting scheme:', error);
    return NextResponse.json(
      { error: 'Failed to delete scheme' },
      { status: 500 }
    );
  }
}
