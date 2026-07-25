import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let _app: ReturnType<typeof initializeApp> | null = null;
let _initError: string | null = null;

function getApp() {
  if (_app) return _app;
  if (_initError) return null;

  if (getApps().length > 0) {
    _app = getApps()[0];
    return _app;
  }

  try {
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      _initError = "FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY not set";
      console.error("[firebase-admin]", _initError);
      return null;
    }

    _app = initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });

    return _app;
  } catch (e) {
    _initError = e instanceof Error ? e.message : "Failed to init Firebase Admin";
    console.error("[firebase-admin] init error:", _initError);
    return null;
  }
}

export function getAdminAuth() {
  const app = getApp();
  if (!app) return null;
  try {
    return getAuth(app);
  } catch {
    return null;
  }
}

export async function getUserFromToken(token: string) {
  try {
    const auth = getAdminAuth();
    if (!auth) return null;
    const decoded = await auth.verifyIdToken(token);
    return decoded;
  } catch (e) {
    console.error("[firebase-admin] verifyIdToken error:", e instanceof Error ? e.message : e);
    return null;
  }
}
