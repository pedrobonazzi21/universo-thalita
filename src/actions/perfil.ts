"use server";

import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/firebase-admin";

export async function getPerfilData(token?: string) {
  try {
    let firebaseUser = null;
    if (token) {
      firebaseUser = await getUserFromToken(token);
    }
    if (!firebaseUser) return null;

    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: firebaseUser.uid },
      include: {
        medalhas: {
          include: { medalha: true },
        },
      },
    });
    if (!dbUser) return null;

    const [totalComentarios, totalAvaliacoes, comentariosDestaque] =
      await Promise.all([
        prisma.comentario.count({
          where: { usuarioId: dbUser.id, parentId: null },
        }),
        prisma.comentario.count({
          where: { usuarioId: dbUser.id, nota: { not: null } },
        }),
        prisma.comentario.count({
          where: { usuarioId: dbUser.id, destaque: true },
        }),
      ]);

    const proximoNivel =
      dbUser.xp >= 300
        ? null
        : dbUser.xp >= 150
          ? { nome: "Cr\u00edtico Liter\u00e1rio", xpNecessario: 150 }
          : dbUser.xp >= 51
            ? { nome: "Mestre dos Livros", xpNecessario: 300 }
            : { nome: "Leitor Ass\u00edduo", xpNecessario: 51 };

    return {
      id: dbUser.id,
      nome: dbUser.nome,
      email: firebaseUser.email ?? "",
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
  } catch (e) {
    console.error("[getPerfilData]", e);
    return null;
  }
}
