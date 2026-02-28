'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Category, Gender, Scheme } from '@/lib/schemes';

const schemeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  summary: z.string().min(1, 'Summary is required'),
  category: z.string().min(1, 'Category is required'),
  states: z.array(z.string()),
  tags: z.array(z.string()),
  benefits: z.array(z.string()),
  documents: z.array(z.string()),
  applyLink: z.string().url().optional().or(z.literal('')),
  rules: z.object({
    minAge: z.number().min(0),
    incomeMax: z.number().nullable(),
    gender: z.enum(['male', 'female', 'other', 'any']),
  }),
  status: z.enum(['draft', 'published']),
});

type SchemeFormData = z.infer<typeof schemeSchema>;

const defaultFormData: SchemeFormData = {
  name: '',
  slug: '',
  summary: '',
  category: 'other',
  states: ['all'],
  tags: [],
  benefits: [],
  documents: [],
  applyLink: '',
  rules: {
    minAge: 18,
    incomeMax: null,
    gender: 'any',
  },
  status: 'draft',
};

export default function SchemeEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthorized, loading: authLoading } = useAuth();
  const isNew = params.id === 'new';
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SchemeFormData>({
    resolver: zodResolver(schemeSchema),
    defaultValues: defaultFormData,
  });

  const categories: Category[] = ['farmer', 'student', 'health', 'women', 'senior', 'jobs', 'other'];
  const genders: Gender[] = ['any', 'male', 'female', 'other'];

  useEffect(() => {
    if (authLoading) return;

    if (!user || !isAuthorized) {
      router.push('/login?redirect=/admin/schemes');
      return;
    }

    if (!isNew) {
      fetchScheme();
    }
  }, [router, isNew, params.id, user, isAuthorized, authLoading]);

  async function fetchScheme() {
    try {
      const response = await fetch(`/api/schemes/${params.id}`);
      if (!response.ok) throw new Error('Scheme not found');
      const data = await response.json();
      reset(data);
    } catch (err) {
      setError('Failed to load scheme');
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data: SchemeFormData) {
    setSaving(true);
    setError(null);

    try {
      const url = isNew ? '/api/schemes' : `/api/schemes/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save');

      router.push('/admin/schemes');
    } catch (err) {
      setError('Failed to save scheme. Make sure Firebase is configured.');
      // Demo mode - just redirect
      if (isNew) {
        router.push('/admin/schemes');
      }
    } finally {
      setSaving(false);
    }
  }

  // Helper to update array fields
  function updateArrayField(field: 'states' | 'tags' | 'benefits' | 'documents', value: string) {
    const current = watch(field) as string[];
    if (current.includes(value)) {
      setValue(field, current.filter((v) => v !== value));
    } else {
      setValue(field, [...current, value]);
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/schemes" className="text-gray-500 hover:text-gray-700">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {isNew ? 'Add New Scheme' : 'Edit Scheme'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scheme Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug *
                </label>
                <input
                  {...register('slug')}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., pm-kisan"
                />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Summary *
                </label>
                <textarea
                  {...register('summary')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apply Link
                </label>
                <input
                  {...register('applyLink')}
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/apply"
                />
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Eligibility Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Age
                </label>
                <input
                  {...register('rules.minAge', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Income (optional)
                </label>
                <input
                  {...register('rules.incomeMax', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  placeholder="Leave empty for no limit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  {...register('rules.gender')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Arrays */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">States & Tags</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  States
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setValue('states', ['all'])}
                    className={`px-3 py-1 rounded-full text-sm ${
                      watch('states').includes('all')
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    All States
                  </button>
                </div>
                {!watch('states').includes('all') && (
                  <input
                    type="text"
                    placeholder="Enter state and press Add"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = (e.target as HTMLInputElement).value.trim();
                        if (value) {
                          updateArrayField('states', value.toLowerCase());
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                )}
                <div className="flex flex-wrap gap-2">
                  {watch('states').map((state) => (
                    <span
                      key={state}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {state}
                      <button
                        type="button"
                        onClick={() => updateArrayField('states', state)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Enter tag and press Add"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value && !watch('tags').includes(value)) {
                        setValue('tags', [...watch('tags'), value]);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {watch('tags').map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => updateArrayField('tags', tag)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits
                </label>
                <input
                  type="text"
                  placeholder="Enter benefit and press Add"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value && !watch('benefits').includes(value)) {
                        setValue('benefits', [...watch('benefits'), value]);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {watch('benefits').map((benefit) => (
                    <span
                      key={benefit}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {benefit}
                      <button
                        type="button"
                        onClick={() => updateArrayField('benefits', benefit)}
                        className="text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Documents
                </label>
                <input
                  type="text"
                  placeholder="Enter document and press Add"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value && !watch('documents').includes(value)) {
                        setValue('documents', [...watch('documents'), value]);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {watch('documents').map((doc) => (
                    <span
                      key={doc}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {doc}
                      <button
                        type="button"
                        onClick={() => updateArrayField('documents', doc)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Publishing</h2>
            <div>
              <label className="flex items-center gap-2">
                <input
                  {...register('status')}
                  type="radio"
                  value="published"
                  checked={watch('status') === 'published'}
                  onChange={() => setValue('status', 'published')}
                />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>
              <label className="flex items-center gap-2 mt-2">
                <input
                  {...register('status')}
                  type="radio"
                  value="draft"
                  checked={watch('status') === 'draft'}
                  onChange={() => setValue('status', 'draft')}
                />
                <span className="text-sm font-medium text-gray-700">Draft</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
            >
              {saving ? 'Saving...' : isNew ? 'Create Scheme' : 'Save Changes'}
            </button>
            <Link
              href="/admin/schemes"
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
