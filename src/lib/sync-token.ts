import { auth } from "@/lib/firebase";

export async function syncFirebaseToken() {
  const user = auth.currentUser;
  if (!user) {
    document.cookie = "firebase_token=; path=/; max-age=0";
    return;
  }
  try {
    const token = await user.getIdToken(true);
    document.cookie = `firebase_token=${token}; path=/; max-age=3600; SameSite=Lax`;
  } catch {
    document.cookie = "firebase_token=; path=/; max-age=0";
  }
}
