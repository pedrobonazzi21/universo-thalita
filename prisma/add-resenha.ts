import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

async function main() {
  const url = process.env.DATABASE_URL ?? "";
  const authToken = process.env.TURSO_AUTH_TOKEN ?? "";
  const adapter = new PrismaLibSql({ url, authToken });
  const prisma = new PrismaClient({ adapter });

  await prisma.obra.update({
    where: { slug: "fala-serio-mae" },
    data: {
      notaEquipe: 4.5,
      dataResenha: new Date("2026-05-11"),
      nossaResenha:
        'Fala sério, mãe! é o livro que inaugurou a série de maior sucesso de Thalita Rebouças, e já na estreia fica claro o talento da autora para traduzir os conflitos familiares com humor e sensibilidade. A estrutura narrativa dupla — primeiro sob a ótica da mãe superprotetora, depois pela perspectiva da filha adolescente — é um acerto que torna a leitura dinâmica e surpreendente. Ângela Cristina e Malu são personagens tão autênticas que é impossível não se identificar com alguma das duas. Thalita consegue equilibrar perfeitamente o cômico e o emocionante, entregando cenas que arrancam gargalhadas e também apertam o coração. É uma obra que atravessa gerações: mães se veem em Ângela Cristina, filhas se reconhecem em Malu. Uma leitura obrigatória para quem quer começar a explorar o universo Thalita Rebouças.\n\nA narrativa consegue capturar com precisão os pequenos grandes conflitos do dia adia familiar — desde as brigas por causa do quarto bagunçado até as discussões sobre horários de festas. O que torna o livro especial é a forma como Thalita dá voz a ambos os lados, mostrando que não existe certo ou errado, apenas perspectivas diferentes movidas por amor e preocupação.\n\nOs personagens secundários também são um ponto forte. A avó bizarre, o pai pacificador e os irmãos enxeridos adicionam camadas de humor e identificação. É daqueles livros que você termina com um sorriso no rosto e vontade de ligar para sua mãe.',
    },
  });

  console.log("Resenha adicionada com sucesso!");
}

main().catch(console.error);
