"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebase_token")?.value;
  if (!token) return null;
  return getUserFromToken(token);
}

export async function avaliarObra(obraId: string, nota: number) {
  const user = await getAuthUser();
  if (!user) throw new Error("Não autenticado");

  const dbUser = await prisma.user.findUnique({ where: { firebaseUid: user.uid } });
  if (!dbUser) throw new Error("Usuário não encontrado");

  await prisma.avaliacao.upsert({
    where: { obraId_usuarioId: { obraId, usuarioId: dbUser.id } },
    update: { nota },
    create: { obraId, usuarioId: dbUser.id, nota },
  });

  revalidatePath(`/obras/${obraId}`);
}

export async function getMediaAvaliacoes(obraId: string) {
  const result = await prisma.avaliacao.aggregate({
    where: { obraId },
    _avg: { nota: true },
    _count: true,
  });

  return {
    media: result._avg.nota ?? 0,
    total: result._count,
  };
}