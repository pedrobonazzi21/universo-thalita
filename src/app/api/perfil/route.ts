import { NextResponse } from "next/server";
import { getPerfilData } from "@/actions/perfil";

export async function GET() {
  const data = await getPerfilData();
  if (!data) {
    return NextResponse.json(null, { status: 401 });
  }
  return NextResponse.json(data);
}
