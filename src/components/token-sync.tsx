"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { syncFirebaseToken } from "@/lib/sync-token";

export function TokenSync() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        document.cookie = `firebase_token=${token}; path=/; max-age=3600; SameSite=Lax`;
      } else {
        document.cookie = "firebase_token=; path=/; max-age=0";
      }
    });
    return () => unsubscribe();
  }, []);

  return null;
}
