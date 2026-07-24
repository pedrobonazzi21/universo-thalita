import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL ?? "";
const { PrismaLibSQL } = require("@prisma/adapter-libsql");
const { createClient } = require("@libsql/client");
const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN ?? "" });
const adapter = new PrismaLibSQL(client);
const prisma = new PrismaClient({ adapter });

const comentarios = [
  { nome: "Maria", texto: "Adorei esse livro! Li em uma tarde, muito divertido.", nota: 5, slug: "fala-serio-mae" },
  { nome: "João", texto: "A adaptação ficou muito boa, mas o livro é melhor.", nota: 4, slug: "tudo-por-um-popstar-filme" },
  { nome: "Ana", texto: "Thalita é demais! Recomendo para todas as idades.", nota: 5, slug: "tudo-por-um-popstar" },
  { nome: "Pedro", texto: "Li com minha filha, ela amou! Muito bom.", nota: 4, slug: "fala-serio-professor" },
  { nome: "Lucas", texto: "História leve e engraçada, perfeita para relaxar.", nota: 4, slug: "ela-disse-ele-disse" },
  { nome: "Julia", texto: "O filme é tão bom quanto o livro! Nostálgico demais.", nota: 5, slug: "tudo-por-um-popstar-filme" },
  { nome: "Carla", texto: "Li na adolescência e reli agora, continua especial.", nota: 5, slug: "fala-serio-amor" },
  { nome: "Rafael", texto: "Muito engraçado! Me lembrou minha época de escola.", nota: 4, slug: "fala-serio-professor" },
  { nome: "Beatriz", texto: "Um dos melhores livros da Thalita,超级 divertido!", nota: 5, slug: "tudo-por-um-popstar" },
  { nome: "Gabriel", texto: "Bom para passar o tempo, história bem escrita.", nota: 3, slug: "ela-disse-ele-disse" },
  { nome: "Larissa", texto: "Li para minha sobrinha e ela não largou o livro!", nota: 5, slug: "fala-serio-mae" },
  { nome: "Felipe", texto: "Adaptação caprichada, elenco jovem muito talentoso.", nota: 4, slug: "tudo-por-um-popstar-filme" },
];

async function main() {
  const users = new Map<string, string>();

  for (const c of comentarios) {
    if (!users.has(c.nome)) {
      const user = await prisma.user.upsert({
        where: { email: `${c.nome.toLowerCase()}@email.com` },
        update: {},
        create: {
          nome: c.nome,
          email: `${c.nome.toLowerCase()}@email.com`,
          firebaseUid: `fake-${c.nome.toLowerCase()}`,
        },
      });
      users.set(c.nome, user.id);
    }

    const obra = await prisma.obra.findUnique({ where: { slug: c.slug } });
    if (!obra) {
      console.log(`Obra não encontrada: ${c.slug}`);
      continue;
    }

    await prisma.comentario.create({
      data: {
        texto: c.texto,
        nota: c.nota,
        obraId: obra.id,
        usuarioId: users.get(c.nome)!,
        curtidasCount: Math.floor(Math.random() * 10),
      },
    });
  }

  console.log(`${comentarios.length} comentários inseridos!`);
}

main().catch(console.error);
