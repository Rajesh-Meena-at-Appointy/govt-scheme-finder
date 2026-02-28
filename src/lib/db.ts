import { firestore, isConfigured } from './firebase-admin';
import { Scheme, Category, Gender } from './schemes';
import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';

// Types for our database collections
export interface DBScheme extends Omit<Scheme, 'id'> {
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
  createdBy?: string;
}

export interface DBSubmission {
  id: string;
  schemeData: Partial<DBScheme>;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface DBUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  favorites: string[];
}

// Helper to convert DB document to Scheme
function dbToScheme(doc: QueryDocumentSnapshot<DocumentData> | { id: string; data: () => DBScheme }): Scheme {
  const data = 'data' in doc ? doc.data() : doc;
  return {
    id: doc.id,
    slug: data.slug,
    name: data.name,
    summary: data.summary,
    category: data.category,
    states: data.states,
    tags: data.tags,
    benefits: data.benefits,
    documents: data.documents,
    applyLink: data.applyLink,
    rules: data.rules,
  };
}

// Schemes CRUD
export async function getAllSchemesDB(filters?: {
  category?: Category;
  state?: string;
  status?: 'draft' | 'published';
}): Promise<Scheme[]> {
  if (!firestore) {
    console.warn('Firestore not configured, using JSON data');
    return [];
  }

  let query = firestore.collection('schemes') as any;

  if (filters?.status) {
    query = query.where('status', '==', filters.status);
  } else {
    // Default to published only for public queries
    query = query.where('status', '==', 'published');
  }

  const snapshot = await query.get();
  let schemes = snapshot.docs.map(dbToScheme);

  // Apply additional filters that Firestore doesn't handle well
  if (filters?.category) {
    schemes = schemes.filter((s: Scheme) => s.category === filters.category);
  }

  if (filters?.state) {
    schemes = schemes.filter(
      (s: Scheme) => s.states.includes('all') || s.states.includes(filters.state!)
    );
  }

  return schemes;
}

export async function getSchemeBySlugDB(slug: string): Promise<Scheme | null> {
  if (!firestore) return null;

  const snapshot = await firestore
    .collection('schemes')
    .where('slug', '==', slug)
    .where('status', '==', 'published')
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return dbToScheme(snapshot.docs[0]);
}

export async function getSchemeByIdDB(id: string): Promise<Scheme | null> {
  if (!firestore) return null;

  const doc = await firestore.collection('schemes').doc(id).get();
  if (!doc.exists) return null;
  return dbToScheme({ id: doc.id, data: () => doc.data() as DBScheme });
}

export async function createSchemeDB(
  data: Omit<DBScheme, 'createdAt' | 'updatedAt'>
): Promise<string> {
  if (!firestore) throw new Error('Firestore not configured');

  const now = new Date().toISOString();
  const docRef = await firestore.collection('schemes').add({
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
}

export async function updateSchemeDB(
  id: string,
  data: Partial<Omit<DBScheme, 'createdAt' | 'updatedAt'>>
): Promise<void> {
  if (!firestore) throw new Error('Firestore not configured');

  await firestore.collection('schemes').doc(id).update({
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteSchemeDB(id: string): Promise<void> {
  if (!firestore) throw new Error('Firestore not configured');

  await firestore.collection('schemes').doc(id).delete();
}

// Submissions CRUD
export async function getAllSubmissionsDB(): Promise<DBSubmission[]> {
  if (!firestore) return [];

  const snapshot = await firestore
    .collection('submissions')
    .orderBy('submittedAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as DBSubmission[];
}

export async function createSubmissionDB(
  data: Omit<DBSubmission, 'id' | 'status' | 'submittedAt' | 'reviewedAt' | 'reviewedBy'>
): Promise<string> {
  if (!firestore) throw new Error('Firestore not configured');

  const docRef = await firestore.collection('submissions').add({
    ...data,
    status: 'pending' as const,
    submittedAt: new Date().toISOString(),
  });

  return docRef.id;
}

export async function updateSubmissionDB(
  id: string,
  data: Partial<Pick<DBSubmission, 'status' | 'reviewedBy' | 'notes'>>
): Promise<void> {
  if (!firestore) throw new Error('Firestore not configured');

  await firestore.collection('submissions').doc(id).update({
    ...data,
    reviewedAt: new Date().toISOString(),
  });
}

// Stats
export async function getStats(): Promise<{
  totalSchemes: number;
  totalSubmissions: number;
  pendingSubmissions: number;
  categories: Record<string, number>;
}> {
  if (!firestore) {
    return {
      totalSchemes: 0,
      totalSubmissions: 0,
      pendingSubmissions: 0,
      categories: {},
    };
  }

  const [schemesSnapshot, submissionsSnapshot] = await Promise.all([
    firestore.collection('schemes').where('status', '==', 'published').get(),
    firestore.collection('submissions').get(),
  ]);

  const submissions = submissionsSnapshot.docs.map((doc) => doc.data() as DBSubmission);

  const categories: Record<string, number> = {};
  schemesSnapshot.docs.forEach((doc) => {
    const data = doc.data() as DBScheme;
    categories[data.category] = (categories[data.category] || 0) + 1;
  });

  return {
    totalSchemes: schemesSnapshot.size,
    totalSubmissions: submissionsSnapshot.size,
    pendingSubmissions: submissions.filter((s) => s.status === 'pending').length,
    categories,
  };
}

// Check if Firebase is configured
export function isFirestoreConfigured(): boolean {
  return !!isConfigured && firestore !== null;
}
