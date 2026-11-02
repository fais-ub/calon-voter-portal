import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Firestore, serverTimestamp } from 'firebase/firestore';
import { AcademicVoterSubmission } from './types';

// Read environment variables with default fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyB7PXDDJG7fH8i9unpWtZAgBEYGWDPbUEs',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'sivoters.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'sivoters',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'sivoters.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '898298998371',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:898298998371:android:3719ecef541f122da11256',
};

// Check if credentials have been populated
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'your_api_key_here' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'your_project_id'
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
  } catch (err) {
    console.warn('Firebase initialization error, running in local fallback mode:', err);
  }
}

/**
 * Submit academic voter registration directly to Firestore 'voters' collection
 * (Text-only metadata, zero Firebase Storage dependency)
 */
export async function submitAcademicVoter(
  submission: AcademicVoterSubmission
): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const voterId = `ar_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const payload = {
      id: voterId,
      fullName: submission.fullName.trim(),
      campus: submission.campus.trim(),
      country: submission.country.trim(),
      email: submission.email.trim().toLowerCase(),
      whatsapp: submission.whatsapp?.trim() || '',
      title: submission.title,
      broadSubject: submission.broadSubject,
      submittedAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString(),
      status: 'pending',
      type: 'academic',
      source: 'public_portal',
    };

    if (isFirebaseConfigured && db) {
      const votersRef = collection(db, 'voters');
      await setDoc(doc(votersRef, voterId), payload);
    } else {
      // Local fallback storage for testing/demo
      const existing = JSON.parse(localStorage.getItem('qs_voters_submissions') || '[]');
      existing.unshift(payload);
      localStorage.setItem('qs_voters_submissions', JSON.stringify(existing));
    }

    return { success: true, id: voterId };
  } catch (err: any) {
    console.error('Error submitting voter nomination to Firestore:', err);
    return { success: false, id: '', error: err.message || 'Submission failed' };
  }
}
