import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const obras = await prisma.obra.findMany({ take: 3, select: { id: true, titulo: true } });
    return NextResponse.json({ ok: true, count: obras.length, obras });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message, code: e.code }, { status: 500 });
  }
}
