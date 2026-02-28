'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Types
interface Stats {
  totalSchemes: number;
  totalSubmissions: number;
  pendingSubmissions: number;
  categories: Record<string, number>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthorized, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user || !isAuthorized) {
      router.push('/login?redirect=/admin');
      return;
    }

    fetchStats();
  }, [router, user, isAuthorized, authLoading]);

  async function fetchStats() {
    try {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError('Unable to load stats. Make sure Firebase is configured.');
      // Use mock data for demo
      setStats({
        totalSchemes: 0,
        totalSubmissions: 0,
        pendingSubmissions: 0,
        categories: {},
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Schemes"
            value={stats?.totalSchemes ?? 0}
            icon="📋"
            color="blue"
          />
          <StatCard
            title="Pending Submissions"
            value={stats?.pendingSubmissions ?? 0}
            icon="⏳"
            color="yellow"
          />
          <StatCard
            title="Total Submissions"
            value={stats?.totalSubmissions ?? 0}
            icon="📝"
            color="green"
          />
          <StatCard
            title="Categories"
            value={Object.keys(stats?.categories ?? {}).length}
            icon="🏷️"
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/schemes/new"
                className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue- text-white rounded-md700 transition"
              >
                + Add New Scheme
              </Link>
              <Link
                href="/admin/submissions"
                className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                View Submissions ({stats?.pendingSubmissions ?? 0} pending)
              </Link>
              <Link
                href="/admin/schemes"
                className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                Manage Schemes
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
            {Object.keys(stats?.categories ?? {}).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(stats?.categories ?? {}).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="capitalize">{category}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No categories yet</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'yellow' | 'green' | 'purple';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}
