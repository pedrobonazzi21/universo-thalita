import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const obras = [
    {
      titulo: "Fala Sério, Mãe!",
      slug: "fala-serio-mae",
      tipo: "Livro",
      ano: 2004,
      sinopse:
        "Uma divertida história sobre o dia a dia de uma adolescente e sua relação com a mãe.",
      notaEquipe: 4.5,
    },
    {
      titulo: "Fala Sério, Professor!",
      slug: "fala-serio-professor",
      tipo: "Livro",
      ano: 2005,
      sinopse:
        "As aventuras e confusões de uma aluna e seus professores.",
      notaEquipe: 4.0,
    },
    {
      titulo: "Tudo por um Popstar",
      slug: "tudo-por-um-popstar",
      tipo: "Livro",
      ano: 2006,
      sinopse:
        "Duas amigas fazem de tudo para realizar o sonho de encontrar seu ídolo pop.",
      notaEquipe: 4.5,
    },
    {
      titulo: "Fala Sério, Amor",
      slug: "fala-serio-amor",
      tipo: "Livro",
      ano: 2008,
      sinopse:
        "As desventuras amorosas de uma adolescente em busca do verdadeiro amor.",
      notaEquipe: 4.0,
    },
    {
      titulo: "Ela Disse, Ele Disse",
      slug: "ela-disse-ele-disse",
      tipo: "Livro",
      ano: 2010,
      sinopse:
        "Dois pontos de vista sobre as confusões típicas da adolescência.",
      notaEquipe: 4.5,
    },
    {
      titulo: "Tudo por um Popstar (Filme)",
      slug: "tudo-por-um-popstar-filme",
      tipo: "Filme",
      ano: 2018,
      sinopse:
        "Adaptação cinematográfica do best-seller sobre duas amigas em busca do ídolo pop.",
      notaEquipe: 4.0,
    },
  ];

  for (const obra of obras) {
    await prisma.obra.create({ data: obra });
  }

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
