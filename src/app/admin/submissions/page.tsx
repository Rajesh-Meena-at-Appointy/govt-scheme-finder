'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Submission {
  id: string;
  schemeData: {
    name?: string;
    category?: string;
    summary?: string;
    applyLink?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  notes?: string;
}

export default function AdminSubmissionsPage() {
  const router = useRouter();
  const { user, isAuthorized, loading: authLoading } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (authLoading) return;

    if (!user || !isAuthorized) {
      router.push('/login?redirect=/admin/submissions');
      return;
    }

    fetchSubmissions();
  }, [router, user, isAuthorized, authLoading]);

  async function fetchSubmissions() {
    try {
      const response = await fetch('/api/submissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReview(id: string, status: 'approved' | 'rejected') {
    try {
      const response = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setSubmissions(
          submissions.map((s) =>
            s.id === id ? { ...s, status, reviewedAt: new Date().toISOString() } : s
          )
        );
      } else {
        alert('Failed to update submission');
      }
    } catch (error) {
      console.error('Error updating submission:', error);
      alert('Failed to update submission');
    }
  }

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
            </div>
            <span className="text-sm text-gray-500">
              {submissions.filter((s) => s.status === 'pending').length} pending
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">No submissions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {submission.schemeData.name || 'Unnamed Scheme'}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[submission.status]
                        }`}
                      >
                        {submission.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Category:</span>{' '}
                        {submission.schemeData.category || 'N/A'}
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span>{' '}
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </div>
                      {submission.reviewedAt && (
                        <div>
                          <span className="font-medium">Reviewed:</span>{' '}
                          {new Date(submission.reviewedAt).toLocaleDateString()}
                        </div>
                      )}
                      {submission.schemeData.applyLink && (
                        <div>
                          <span className="font-medium">Link:</span>{' '}
                          <a
                            href={submission.schemeData.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </a>
                        </div>
                      )}
                    </div>

                    {submission.schemeData.summary && (
                      <p className="mt-3 text-sm text-gray-600">
                        {submission.schemeData.summary}
                      </p>
                    )}

                    {submission.notes && (
                      <p className="mt-3 text-sm text-gray-500 italic">
                        Notes: {submission.notes}
                      </p>
                    )}
                  </div>

                  {submission.status === 'pending' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleReview(submission.id, 'approved')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReview(submission.id, 'rejected')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
