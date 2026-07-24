import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let _app: ReturnType<typeof initializeApp> | null = null;

function getApp() {
  if (_app) return _app;

  if (getApps().length > 0) {
    _app = getApps()[0];
    return _app;
  }

  _app = initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });

  return _app;
}

export function getAdminAuth() {
  return getAuth(getApp());
}

export async function getUserFromToken(token: string) {
  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    return decoded;
  } catch {
    return null;
  }
}