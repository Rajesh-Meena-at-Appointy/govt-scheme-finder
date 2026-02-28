import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const projectId = process.env.FIREBASE_PROJECT_ID;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

// Check if we're in a server environment with credentials
const isConfigured = projectId && privateKey && clientEmail;

let firestore: ReturnType<typeof getFirestore> | null = null;

if (isConfigured && getApps().length === 0) {
  initializeApp({
    projectId,
    credential: cert({
      projectId,
      privateKey,
      clientEmail,
    }),
  });
  firestore = getFirestore();
} else if (isConfigured && getApps().length > 0) {
  firestore = getFirestore();
}

export { firestore, isConfigured };
