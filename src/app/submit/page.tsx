'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Category } from '@/lib/schemes';
import { Shield, Send, CheckCircle, AlertCircle, ArrowLeft, FileText, Link as LinkIcon, Users, MapPin } from 'lucide-react';

const submissionSchema = z.object({
  name: z.string().min(1, 'Scheme name is required'),
  category: z.string().min(1, 'Category is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  applyLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  benefits: z.string().optional(),
  documents: z.string().optional(),
  states: z.string().optional(),
  submitterEmail: z.string().email('Please enter a valid email').optional().or(z.literal('')),
});

type SubmissionData = z.infer<typeof submissionSchema>;

const categories: Category[] = ['farmer', 'student', 'health', 'women', 'senior', 'jobs', 'other'];

export default function SubmitSchemePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmissionData>({
    resolver: zodResolver(submissionSchema),
  });

  async function onSubmit(data: SubmissionData) {
    setSubmitting(true);
    setError(null);

    try {
      const schemeData = {
        name: data.name,
        category: data.category,
        summary: data.summary,
        applyLink: data.applyLink || '',
        benefits: data.benefits?.split(',').map((b) => b.trim()).filter(Boolean) || [],
        documents: data.documents?.split(',').map((d) => d.trim()).filter(Boolean) || [],
        states: data.states?.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean) || ['all'],
        tags: [],
        rules: {
          minAge: 18,
          incomeMax: null,
          gender: 'any' as const,
        },
        status: 'draft' as const,
        slug: data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      };

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemeData }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to submit scheme');
      }
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Thank You!</h1>
          <p className="text-slate-600 mb-8">
            Your scheme submission has been received successfully. Our team will review it and publish it if approved. You'll receive a notification once it's live.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/submit"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition"
            >
              Submit Another Scheme
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Govt Scheme Finder</div>
                <div className="text-xs text-slate-500">Submit a Scheme</div>
              </div>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Submit a Government Scheme</h1>
            <p className="text-slate-600 mt-2">
              Know about a government scheme that should be on our platform? Submit it here and our team will review and publish it if approved.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Scheme Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Scheme Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., PM Kisan Samman Nidhi"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('summary')}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of the scheme, its benefits, and eligibility..."
              />
              {errors.summary && (
                <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>
              )}
            </div>

            {/* Apply Link */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <LinkIcon className="inline h-4 w-4 mr-1" />
                Official Website / Apply Link
              </label>
              <input
                {...register('applyLink')}
                type="url"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://pmkisan.gov.in/"
              />
              {errors.applyLink && (
                <p className="text-red-500 text-sm mt-1">{errors.applyLink.message}</p>
              )}
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <FileText className="inline h-4 w-4 mr-1" />
                Benefits (comma separated)
              </label>
              <input
                {...register('benefits')}
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Rs. 6000 per year, Free seeds, Technical support"
              />
            </div>

            {/* Documents */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Required Documents (comma separated)
              </label>
              <input
                {...register('documents')}
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Aadhaar Card, Bank Account, Land Records"
              />
            </div>

            {/* States */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Available States (comma separated, leave empty for all India)
              </label>
              <input
                {...register('states')}
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Rajasthan, Maharashtra, Karnataka"
              />
            </div>

            {/* Submitter Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Email (optional, for notifications)
              </label>
              <input
                {...register('submitterEmail')}
                type="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Scheme
                </>
              )}
            </button>

            <p className="text-xs text-slate-500 text-center">
              By submitting, you confirm this information is accurate to the best of your knowledge.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
