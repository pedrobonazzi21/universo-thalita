"use server";

import { prisma } from "@/lib/prisma";

export async function buscarObras(query: string) {
  if (!query.trim()) return [];

  return prisma.obra.findMany({
    where: {
      OR: [
        { titulo: { contains: query } },
        { sinopse: { contains: query } },
      ],
    },
    select: {
      id: true,
      titulo: true,
      slug: true,
      tipo: true,
      ano: true,
      notaEquipe: true,
    },
    take: 10,
    orderBy: { notaEquipe: "desc" },
  });
}
