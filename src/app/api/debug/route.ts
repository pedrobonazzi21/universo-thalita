import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = process.env.DATABASE_URL ?? "not set";
    const token = process.env.TURSO_AUTH_TOKEN ? "set (length: " + process.env.TURSO_AUTH_TOKEN.length + ")" : "not set";
    const email = process.env.FIREBASE_CLIENT_EMAIL ? "set" : "not set";
    const key = process.env.FIREBASE_PRIVATE_KEY ? "set (length: " + process.env.FIREBASE_PRIVATE_KEY.length + ")" : "not set";

    return NextResponse.json({
      databaseUrl: url.substring(0, 50) + "...",
      tursoToken: token,
      firebaseEmail: email,
      firebaseKey: key,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
