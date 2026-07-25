import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/firebase-admin";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return NextResponse.json({ step: "token", error: "no token" }, { status: 401 });
    }

    const firebaseUser = await getUserFromToken(token);
    if (!firebaseUser) {
      return NextResponse.json({ step: "firebase", error: "invalid token" }, { status: 401 });
    }

    let dbUser;
    try {
      dbUser = await prisma.user.findUnique({
        where: { firebaseUid: firebaseUser.uid },
        include: {
          medalhas: {
            include: { medalha: true },
          },
        },
      });
    } catch (e) {
      return NextResponse.json({
        step: "prisma-findUser",
        error: e instanceof Error ? e.message : String(e),
        uid: firebaseUser.uid,
      }, { status: 500 });
    }

    if (!dbUser) {
      return NextResponse.json({
        step: "user-not-found",
        uid: firebaseUser.uid,
        email: firebaseUser.email,
      }, { status: 404 });
    }

    let counts;
    try {
      counts = await Promise.all([
        prisma.comentario.count({ where: { usuarioId: dbUser.id, parentId: null } }),
        prisma.comentario.count({ where: { usuarioId: dbUser.id, nota: { not: null } } }),
        prisma.comentario.count({ where: { usuarioId: dbUser.id, destaque: true } }),
      ]);
    } catch (e) {
      return NextResponse.json({
        step: "prisma-counts",
        error: e instanceof Error ? e.message : String(e),
      }, { status: 500 });
    }

    const [totalComentarios, totalAvaliacoes, comentariosDestaque] = counts;

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
    return NextResponse.json({ step: "unknown", error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
