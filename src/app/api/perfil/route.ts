import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/firebase-admin";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return NextResponse.json(null, { status: 401 });
    }

    const firebaseUser = await getUserFromToken(token);
    if (!firebaseUser) {
      return NextResponse.json(null, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: firebaseUser.uid },
      include: {
        medalhas: {
          include: { medalha: true },
        },
      },
    });
    if (!dbUser) {
      return NextResponse.json(null, { status: 401 });
    }

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

    return NextResponse.json({
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
    });
  } catch (e) {
    console.error("[api/perfil] unexpected error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
