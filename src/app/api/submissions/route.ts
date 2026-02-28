import { NextRequest, NextResponse } from 'next/server';
import { getAllSubmissionsDB, createSubmissionDB, updateSubmissionDB, DBSubmission, isFirestoreConfigured } from '@/lib/db';

// GET /api/submissions - List all submissions (admin)
export async function GET() {
  if (!isFirestoreConfigured()) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 503 }
    );
  }

  try {
    const submissions = await getAllSubmissionsDB();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

// POST /api/submissions - Create new submission (public)
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate required fields
  if (!body.schemeData?.name || !body.schemeData?.category) {
    return NextResponse.json(
      { error: 'Missing required fields (name, category)' },
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
    const id = await createSubmissionDB({
      schemeData: body.schemeData,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}

// PATCH /api/submissions - Update submission status (admin)
export async function PATCH(request: NextRequest) {
  const body = await request.json();

  if (!body.id || !body.status) {
    return NextResponse.json(
      { error: 'Missing required fields (id, status)' },
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
    await updateSubmissionDB(body.id, {
      status: body.status,
      reviewedBy: body.reviewedBy,
      notes: body.notes,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
