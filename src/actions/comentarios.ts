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

export async function criarComentario(
  obraId: string | null,
  texto: string,
  nota: number | null,
  parentId?: string,
  postId?: string
) {
  const user = await getAuthUser();
  if (!user) throw new Error("Não autenticado");

  const dbUser = await prisma.user.findUnique({ where: { firebaseUid: user.uid } });
  if (!dbUser) throw new Error("Usuário não encontrado");

  const comentario = await prisma.comentario.create({
    data: {
      texto,
      nota,
      obraId,
      postId,
      usuarioId: dbUser.id,
      parentId,
    },
    include: {
      usuario: { select: { nome: true, avatarUrl: true } },
      respostas: {
        include: {
          usuario: { select: { nome: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const path = postId ? `/blog/${postId}` : `/obras/${obraId}`;
  revalidatePath(path);
  return comentario;
}

export async function listarComentarios(obraId: string | null, orderBy: "recentes" | "melhores" = "recentes", postId?: string) {
  const order = orderBy === "melhores"
    ? [{ nota: "desc" as const }, { createdAt: "desc" as const }]
    : [{ createdAt: "desc" as const }];

  return prisma.comentario.findMany({
    where: { obraId, parentId: null, postId },
    include: {
      usuario: { select: { nome: true, avatarUrl: true } },
      respostas: {
        include: {
          usuario: { select: { nome: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: order,
  });
}

export async function curtirComentario(comentarioId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Não autenticado");

  const dbUser = await prisma.user.findUnique({ where: { firebaseUid: user.uid } });
  if (!dbUser) throw new Error("Usuário não encontrado");

  const existing = await prisma.curtida.findUnique({
    where: { comentarioId_usuarioId: { comentarioId, usuarioId: dbUser.id } },
  });

  if (existing) {
    await prisma.curtida.delete({ where: { id: existing.id } });
    await prisma.comentario.update({
      where: { id: comentarioId },
      data: { curtidasCount: { decrement: 1 } },
    });
    return { curtido: false };
  }

  await prisma.curtida.create({ data: { comentarioId, usuarioId: dbUser.id } });
  await prisma.comentario.update({
    where: { id: comentarioId },
    data: { curtidasCount: { increment: 1 } },
  });
  return { curtido: true };
}