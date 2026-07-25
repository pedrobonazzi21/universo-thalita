"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

function calcularNivel(xp: number): string {
  if (xp >= 300) return "Mestre dos Livros";
  if (xp >= 150) return "Cr\u00edtico Liter\u00e1rio";
  if (xp >= 51) return "Leitor Ass\u00edduo";
  return "Leitor Iniciante";
}

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebase_token")?.value;
  if (!token) return null;
  return getUserFromToken(token);
}

const usuarioSelect = {
  nome: true,
  avatarUrl: true,
  xp: true,
  nivel: true,
};

export async function criarComentario(
  obraId: string | null,
  texto: string,
  nota: number | null,
  parentId?: string,
  postId?: string
) {
  const user = await getAuthUser();
  if (!user) throw new Error("N\u00e3o autenticado");

  const dbUser = await prisma.user.findUnique({ where: { firebaseUid: user.uid } });
  if (!dbUser) throw new Error("Usu\u00e1rio n\u00e3o encontrado");

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
      usuario: { select: usuarioSelect },
      respostas: {
        include: {
          usuario: { select: usuarioSelect },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const novoXp = dbUser.xp + 15;
  const novoNivel = calcularNivel(novoXp);
  await prisma.user.update({
    where: { id: dbUser.id },
    data: { xp: novoXp, nivel: novoNivel },
  });

  if (!parentId) {
    const totalComentarios = await prisma.comentario.count({
      where: { usuarioId: dbUser.id, parentId: null },
    });

    if (totalComentarios === 1) {
      const medalha = await prisma.medalha.findUnique({ where: { nome: "Primeira Palavra" } });
      if (medalha) {
        await prisma.userMedalha.upsert({
          where: { userId_medalhaId: { userId: dbUser.id, medalhaId: medalha.id } },
          update: {},
          create: { userId: dbUser.id, medalhaId: medalha.id },
        });
      }
    }
  }

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
      usuario: { select: usuarioSelect },
      respostas: {
        include: {
          usuario: { select: usuarioSelect },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: order,
  });
}

export async function curtirComentario(comentarioId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("N\u00e3o autenticado");

  const dbUser = await prisma.user.findUnique({ where: { firebaseUid: user.uid } });
  if (!dbUser) throw new Error("Usu\u00e1rio n\u00e3o encontrado");

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

export async function destacarComentario(comentarioId: string) {
  const comentario = await prisma.comentario.update({
    where: { id: comentarioId },
    data: { destaque: true },
    select: { usuarioId: true },
  });

  const dbUser = await prisma.user.findUnique({ where: { id: comentario.usuarioId } });
  if (!dbUser) return;

  const novoXp = dbUser.xp + 10;
  const novoNivel = calcularNivel(novoXp);
  await prisma.user.update({
    where: { id: dbUser.id },
    data: { xp: novoXp, nivel: novoNivel },
  });

  const totalDestaque = await prisma.comentario.count({
    where: { usuarioId: dbUser.id, destaque: true },
  });

  if (totalDestaque >= 10) {
    const medalha = await prisma.medalha.findUnique({ where: { nome: "Estrela em Ascens\u00e3o" } });
    if (medalha) {
      await prisma.userMedalha.upsert({
        where: { userId_medalhaId: { userId: dbUser.id, medalhaId: medalha.id } },
        update: {},
        create: { userId: dbUser.id, medalhaId: medalha.id },
      });
    }
  }

  revalidatePath("/");
  return comentario;
}