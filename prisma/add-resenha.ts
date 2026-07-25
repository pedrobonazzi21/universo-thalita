import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

async function main() {
  const url = process.env.DATABASE_URL ?? "";
  const authToken = process.env.TURSO_AUTH_TOKEN ?? "";
  const adapter = new PrismaLibSql({ url, authToken });
  const prisma = new PrismaClient({ adapter });

  await prisma.obra.update({
    where: { slug: "fala-serio-mae-edicao-revista" },
    data: {
      notaEquipe: 4.5,
      dataResenha: new Date("2026-05-11"),
    },
  });

  console.log("Resenha adicionada com sucesso!");
}

main().catch(console.error);
