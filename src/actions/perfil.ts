"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/firebase-admin";

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebase_token")?.value;
  if (!token) return null;
  return getUserFromToken(token);
}

export async function getPerfilData() {
  const user = await getAuthUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { firebaseUid: user.uid },
    include: {
      medalhas: {
        include: { medalha: true },
      },
    },
  });
  if (!dbUser) return null;

  const totalComentarios = await prisma.comentario.count({
    where: { usuarioId: dbUser.id, parentId: null },
  });

  const totalAvaliacoes = await prisma.comentario.count({
    where: { usuarioId: dbUser.id, nota: { not: null } },
  });

  const comentariosDestaque = await prisma.comentario.count({
    where: { usuarioId: dbUser.id, destaque: true },
  });

  const proximoNivel =
    dbUser.xp >= 300
      ? null
      : dbUser.xp >= 150
        ? { nome: "Mestre dos Livros", xpNecessario: 300 }
        : dbUser.xp >= 51
          ? { nome: "Cr\u00edtico Liter\u00e1rio", xpNecessario: 150 }
          : { nome: "Leitor Ass\u00edduo", xpNecessario: 51 };

  return {
    id: dbUser.id,
    nome: dbUser.nome,
    email: user.email ?? "",
    avatarUrl: dbUser.avatarUrl,
    xp: dbUser.xp,
    nivel: dbUser.nivel,
    totalComentarios,
    totalAvaliacoes,
    comentariosDestaque,
    medalhas: dbUser.medalhas.map((m) => ({
      nome: m.medalha.nome,
      icone: m.medalha.icone,
      descricao: m.medalha.descricao,
      conquistadaEm: m.conquistaEm,
    })),
    proximoNivel,
  };
}
