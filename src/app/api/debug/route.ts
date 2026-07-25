import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const email = process.env.FIREBASE_CLIENT_EMAIL ?? "not set";
    const rawKey = process.env.FIREBASE_PRIVATE_KEY ?? "";
    const hasNewlines = rawKey.includes("\n");
    const hasLiteralBackslashN = rawKey.includes("\\n");
    const keyLength = rawKey.length;

    const keyStart = rawKey.substring(0, 30);
    const keyEnd = rawKey.substring(rawKey.length - 30);

    let testResult = "not tested";
    try {
      const user = await getUserFromToken("invalid-test-token");
      testResult = user === null ? "getUserFromToken works (returned null for bad token)" : "unexpected result";
    } catch (e) {
      testResult = "error: " + (e instanceof Error ? e.message : String(e));
    }

    return NextResponse.json({
      firebaseEmail: email,
      keyLength,
      hasNewlines,
      hasLiteralBackslashN,
      keyStart,
      keyEnd,
      testResult,
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
