import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL ?? "";
const authToken = process.env.TURSO_AUTH_TOKEN ?? "";
const adapter = new PrismaLibSql({ url, authToken });
const prisma = new PrismaClient({ adapter });

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ç]/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const obras = [
  {
    titulo: "Diário de uma garota esquisita",
    slug: "diario-de-uma-garota-esquisita",
    tipo: "Livro",
    ano: 2025,
    editora: "HarperKids",
    genero: "Ficção infantojuvenil",
    sinopse: "O livro 'Diário de uma garota esquisita' conta a história de Carol, uma garota de 13 anos que se sente invisível, deslocada e 'totalmente esquisita'.",
  },
  {
    titulo: "Confissões de um garoto talentoso, purpurinado e (intimamente) discriminado – Nova Edição",
    slug: "confissoes-de-um-garoto-talentoso-nova-edicao",
    tipo: "Livro",
    ano: 2025,
    editora: "Pitaya (HarperCollins)",
    genero: "Ficção Juvenil / Literatura LGBTQIA+",
    sinopse: "Confissões de um garoto talentoso, purpurinado e (intimamente) discriminado, de Thalita Rebouças, acompanha Zeca.",
  },
  {
    titulo: "Confissões de Uma Garota Excluída, Mal-Amada E (Um Pouco) Dramática – Nova Edição",
    slug: "confissoes-de-uma-garota-excluida-nova-edicao",
    tipo: "Livro",
    ano: 2025,
    editora: "Pitaya (HarperCollins)",
    genero: "Romance juvenil",
    sinopse: "A vida de Tetê vira de cabeça para baixo quando seu pai perde o emprego.",
  },
  {
    titulo: "Confissões de Um Garoto Tímido, Nerd E (Ligeiramente) Apaixonado - Nova Edição",
    slug: "confissoes-de-um-garoto-timido-nova-edicao",
    tipo: "Livro",
    ano: 2025,
    editora: "Pitaya (HarperCollins)",
    genero: "Romance juvenil/Ficção adolescente",
    sinopse: "Davi está no segundo ano do ensino médio e finalmente toma coragem para iniciar o curso de astrologia.",
  },
  {
    titulo: "Confissões de Uma Garota Linda, Popular E (Secretamente) Infeliz - Nova Edição",
    slug: "confissoes-de-uma-garota-linda-nova-edicao",
    tipo: "Livro",
    ano: 2025,
    editora: "Pitaya (HarperCollins)",
    genero: "Infantojuvenil / Ficção",
    sinopse: "Valentina tem tudo o que muitos consideram o padrão de uma vida perfeita.",
  },
  {
    titulo: "Falando sério sobre adolescência: Um guia para a família",
    slug: "falando-serio-sobre-adolescencia",
    tipo: "Livro",
    ano: 2024,
    editora: "L&PM",
    genero: "Não ficção (Autoajuda parental)",
    sinopse: "A obra nasce do fascínio compartilhado pelos autores por essa fase tão atribulada.",
  },
  {
    titulo: "Fala sério, professor! Edição revista e ampliada",
    slug: "fala-serio-professor-edicao-revista",
    tipo: "Livro",
    ano: 2023,
    editora: "Rocco",
    genero: "Crônica/ ficção",
    sinopse: "Nesta edição revista e ampliada, Thalita Rebouças retoma a trajetória de Malu.",
  },
  {
    titulo: "Felicidade inegociável e outras rimas",
    slug: "felicidade-inegociavel",
    tipo: "Livro",
    ano: 2024,
    editora: "HarperCollins Brasil",
    genero: "Não ficção/ poesia",
    sinopse: "O livro reúne mais de 60 textos que misturam prosa e poesia.",
  },
  {
    titulo: "Fala sério, amiga! Edição revista e ampliada",
    slug: "fala-serio-amiga-edicao-revista",
    tipo: "Livro",
    ano: 2023,
    editora: "Rocco",
    genero: "Crônica/ ficção",
    sinopse: "Na edição revista e ampliada de 'Fala sério, amiga!', a autora Thalita Rebouças convida o leitor a mergulhar nas memórias de sua famosa protagonista, Malu.",
  },
  {
    titulo: "Tudo por um namorado: Edição revista e ampliada",
    slug: "tudo-por-um-namorado-edicao-revista",
    tipo: "Livro",
    ano: 2022,
    editora: "Rocco",
    genero: "Romance Juvenil",
    sinopse: "Na edição revista e ampliada de 'Tudo por um namorado', a escritora Thalita Rebouças traz de volta as inseparáveis amigas Manu, Gabi e Ritinha.",
  },
  {
    titulo: "Fala sério, filha! Edição revista e ampliada",
    slug: "fala-serio-filha-edicao-revista",
    tipo: "Livro",
    ano: 2022,
    editora: "Rocco",
    genero: "Crônica/ ficção",
    sinopse: "Na edição revista e ampliada de 'Fala sério, filha!', a autora Thalita Rebouças inverte os papéis da sua famosa série literária.",
  },
  {
    titulo: "Fala sério, mãe! Edição revista e ampliada",
    slug: "fala-serio-mae-edicao-revista",
    tipo: "Livro",
    ano: 2022,
    editora: "Rocco",
    genero: "Crônica/ ficção",
    sinopse: "Na edição revista e ampliada de 'Fala sério, mãe!', a escritora Thalita Rebouças apresenta uma coletânea de crônicas bem-humoradas.",
  },
  {
    titulo: "Natali e sua vontade idiota de agradar todo mundo",
    slug: "natali",
    tipo: "Livro",
    ano: 2022,
    editora: "Rocco",
    genero: "Romance juvenil",
    sinopse: "A narrativa acompanha a jornada de autodescoberta e aceitação de Natali, uma adolescente de 15 anos.",
  },
  {
    titulo: "Confissões de um garoto talentoso, purpurinado e (intimamente) discriminado",
    slug: "confissoes-de-um-garoto-talentoso",
    tipo: "Livro",
    ano: 2022,
    editora: "Arqueiro",
    genero: "Ficção Juvenil / Literatura LGBTQIA+",
    sinopse: "A narrativa acompanha a vida de Zeca, um jovem inteligente e bem-humorado.",
  },
  {
    titulo: "Pai em Dobro",
    slug: "pai-em-dobro",
    tipo: "Livro",
    ano: 2020,
    editora: "Rocco",
    genero: "Ficção Juvenil / Comédia Dramática",
    sinopse: "Em 'Pai em Dobro', romance juvenil de Thalita Rebouças, a narrativa acompanha a jornada de Vicenza.",
  },
  {
    titulo: "Fala sério, Thalita!",
    slug: "fala-serio-thalita",
    tipo: "Livro",
    ano: 2020,
    editora: "Pixel",
    genero: "Biografia / Não-Ficção Juvenil",
    sinopse: "A escritora deixa a ficção de lado para comemorar seus 20 anos de carreira.",
  },
  {
    titulo: "Confissões de Um Garoto Tímido, Nerd E (Ligeiramente) Apaixonado",
    slug: "confissoes-de-um-garoto-timido",
    tipo: "Livro",
    ano: 2017,
    editora: "Arqueiro",
    genero: "Romance juvenil/Ficção adolescente",
    sinopse: "Confissões de Um Garoto Tímido, Nerd E (Ligeiramente) Apaixonado narra a história de Davi.",
  },
  {
    titulo: "Confissões de Uma Garota Excluída, Mal-Amada E (Um Pouco) Dramática",
    slug: "confissoes-de-uma-garota-excluida",
    tipo: "Livro",
    ano: 2016,
    editora: "Arqueiro",
    genero: "Romance juvenil",
    sinopse: "Confissões de Uma Garota Excluída acompanha Tetê, uma jovem de 15 anos.",
  },
  {
    titulo: "Fala sério, irmão! Fala sério, irmã!",
    slug: "fala-serio-irmao-irma",
    tipo: "Livro",
    ano: 2015,
    editora: "Rocco",
    genero: "Literatura infantojuvenil e crônica",
    sinopse: "É um livro duplo que pode ser lido de ponta-cabeça.",
  },
  {
    titulo: "Um ano inesquecível",
    slug: "um-ano-inesquecivel",
    tipo: "Livro",
    ano: 2015,
    editora: "Gutenberg",
    genero: "Literatura Infantojuvenil e Romance",
    sinopse: "Um Ano Inesquecível é uma antologia em que Thalita Rebouças escreveu um quarto do livro.",
  },
  {
    titulo: "Fiquei com um famoso",
    slug: "fiquei-com-um-famoso",
    tipo: "Livro",
    ano: 2014,
    editora: "Rocco",
    genero: "Literatura Infantojuvenil e Romance",
    sinopse: "Fiquei com um famoso é um conto digital conectado ao universo de seu romance '360 dias de sucesso'.",
  },
  {
    titulo: "360 dias de sucesso",
    slug: "360-dias-de-sucesso",
    tipo: "Livro",
    ano: 2014,
    editora: "Rocco",
    genero: "Literatura Infantojuvenil e Romance",
    sinopse: "360 dias de sucesso acompanha a trajetória meteórica de cinco amigos de infância.",
  },
  {
    titulo: "Bia não quer dormir",
    slug: "bia-nao-quer-dormir",
    tipo: "Livro",
    ano: 2014,
    editora: "Rocco",
    genero: "Literatura Infantojuvenil",
    sinopse: "Bia não quer dormir traz de volta a protagonista Bia em uma situação comum a muitas famílias.",
  },
  {
    titulo: "Por que só as princesas se dão bem?",
    slug: "por-que-so-as-princesas-se-dao-bem",
    tipo: "Livro",
    ano: 2013,
    editora: "Rocco",
    genero: "Ficção infantil",
    sinopse: "Por que só as princesas se dão bem? é o primeiro livro infantil de Thalita Rebouças.",
  },
  {
    titulo: "Ela disse, ele disse: o namoro",
    slug: "ela-disse-ele-disse-namoro",
    tipo: "Livro",
    ano: 2013,
    editora: "Rocco",
    genero: "Romance Adolescente",
    sinopse: "Ela disse, ele disse: o namoro é a continuação do sucesso de Thalita Rebouças.",
  },
  {
    titulo: "Adultos sem filtro: E outras crônicas",
    slug: "adultos-sem-filtro",
    tipo: "Livro",
    ano: 2012,
    editora: "Rocco",
    genero: "Crônica",
    sinopse: "Adultos sem filtro marca a transição de Thalita Rebouças para um público mais maduro.",
  },
  {
    titulo: "Fala sério, filha! A vingança dos pais",
    slug: "fala-serio-filha-vinganca",
    tipo: "Livro",
    ano: 2011,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Fala sério, filha!: A vingança dos pais é o sexto volume da famosa série de Thalita.",
  },
  {
    titulo: "Era uma vez minha primeira vez",
    slug: "era-uma-vez-minha-primeira-vez",
    tipo: "Livro",
    ano: 2011,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Era uma vez minha primeira vez afasta-se do formato de manual educativo.",
  },
  {
    titulo: "Fala sério, amor!",
    slug: "fala-serio-amor",
    tipo: "Livro",
    ano: 2011,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Fala sério, amor! foca na movimentada vida amorosa da protagonista Maria de Lourdes, a Malu.",
  },
  {
    titulo: "Ela Disse, Ele Disse",
    slug: "ela-disse-ele-disse",
    tipo: "Livro",
    ano: 2010,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Ela Disse, Ele Disse acompanha a rotina de dois adolescentes de 14 anos, Rosa e Leo.",
  },
  {
    titulo: "Fala sério, pai!",
    slug: "fala-serio-pai",
    tipo: "Livro",
    ano: 2009,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Fala sério, pai! é o terceiro livro da série Fala Sério de Thalita.",
  },
  {
    titulo: "Fala sério, amiga!",
    slug: "fala-serio-amiga",
    tipo: "Livro",
    ano: 2008,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Fala sério, amiga! coloca os holofotes sobre a intensa vida social de Maria de Lourdes, a Malu.",
  },
  {
    titulo: "Tudo por um Feriado",
    slug: "tudo-por-um-feriado",
    tipo: "Livro",
    ano: 2007,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Tudo por um feriado traz de volta as amigas Manu, Gabi e Ritinha em uma nova aventura.",
  },
  {
    titulo: "Uma fada veio me visitar",
    slug: "uma-fada-veio-me-visitar",
    tipo: "Livro",
    ano: 2007,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Uma fada veio me visitar acompanha a história de Luna, uma adolescente de 13 anos.",
  },
  {
    titulo: "Tudo por um namorado",
    slug: "tudo-por-um-namorado",
    tipo: "Livro",
    ano: 2005,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Tudo por um namorado traz de volta o trio de amigas protagonistas do sucesso Tudo por um pop star.",
  },
  {
    titulo: "Fala sério, mãe!",
    slug: "fala-serio-mae",
    tipo: "Livro",
    ano: 2004,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Fala sério, mãe! é o livro que deu início à série de maior sucesso de Thalita Rebouças.",
  },
  {
    titulo: "Tudo por um pop star",
    slug: "tudo-por-um-pop-star",
    tipo: "Livro",
    ano: 2003,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Tudo por um pop star acompanha a emocionante jornada de três melhores amigas de Resende.",
  },
  {
    titulo: "Traição entre amigas",
    slug: "traicao-entre-amigas",
    tipo: "Livro",
    ano: 2000,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse: "Traição entre amigas, primeiro livro de Thalita Rebouças, acompanha Luiza e Penélope.",
  },
  {
    titulo: "Tudo por um Popstar (Filme)",
    slug: "tudo-por-um-popstar-filme",
    tipo: "Filme",
    ano: 2018,
    editora: "",
    genero: "",
    sinopse: "Adaptação cinematográfica do best-seller sobre duas amigas.",
    dataResenha: new Date("2018-06-15"),
    notaEquipe: 4.0,
    nossaResenha: "A adaptação cinematográfica captura bem a essência do livro, com atuações carismáticas e uma trilha sonora contagiante.",
    personagens: JSON.stringify([
      { nome: "Manu", descricao: "Protagonista" },
      { nome: "Bia", descricao: "Melhor amiga" },
      { nome: "Ídolo Pop", descricao: "Artista famoso" },
    ]),
    curiosidades: JSON.stringify([
      "Estreou nos cinemas em 2018",
      "Elenco jovem de grande sucesso",
    ]),
    timeline: JSON.stringify([
      { ano: 2018, descricao: "Lançamento nos cinemas" },
      { ano: 2019, descricao: "Disponível em streaming" },
    ]),
  },
];

async function main() {
  for (const obra of obras) {
    await prisma.obra.upsert({
      where: { slug: obra.slug },
      update: obra,
      create: obra,
    });
  }
  console.log(`${obras.length} obras inseridas com sucesso!`);

  const tagNames = [
    "resenha",
    "rocco",
    "harpercollins",
    "harperkids",
    "pitaya",
    "l&pm",
    "pixel",
    "gutenberg",
    "arqueiro",
    "intrínseca",
  ];
  for (const nome of tagNames) {
    await prisma.tag.upsert({
      where: { nome },
      update: {},
      create: { nome },
    });
  }
  console.log(`${tagNames.length} tags criadas!`);

  const postObraMap: Record<string, number> = {
    "fala-serio-mae-edicao-revista": 12,
  };

  let postIdx = 1;
  for (const [slug, obraIdx] of Object.entries(postObraMap)) {
    const obra = obras[obraIdx - 1];
    const { id: obraId } = await prisma.obra.findUnique({ where: { slug: obra.slug }, select: { id: true } }) as { id: string };
    const tituloPost = `Fala sério, mãe! Edição revista e ampliada, de Thalita Rebouças`;
    const conteudo = `Fala sério, mãe! Edição revista e ampliada é a mais nova oportunidade de mergulhar no universo de Thalita Rebouças e na relação entre mães e filhas. Na primeira metade do livro, Ângela Cristina narra com desespero e doçura as fraldas, as primeiras palavras e as festinhas infantis de Maria de Lourdes. Já na segunda metade, Malu assume a voz para relatar as dores de cabeça da adolescência com a mesma irreverência que conquistou gerações de leitores.

A edição revista e ampliada atualiza as trapalhadas da protagonista para a realidade da geração hiperconectada dos anos 2020, mas mantém a essência do humor ácido e afetuoso que define a obra. Thalita consegue equilibrar momentos de pura risada com reflexões profundas sobre a maternidade e o crescimento.

É daqueles livros que a gente lê e pensa: "Olha Ana Borboa!" A personagem é tão real que dói de tão identificável. A narrativa flui com facilidade e a leitura é absolutamente viciante. Em poucos dias já tinha devorado boa parte do livro.`;
    await prisma.post.upsert({
      where: { slug: `${slug}-resenha` },
      update: {},
      create: {
        titulo: tituloPost,
        slug: `${slug}-resenha`,
        conteudo,
        dataPublicacao: new Date("2025-07-20"),
        obra: { connect: { id: obraId } },
        parceria: false,
      },
    });
    const postId = (await prisma.post.findUnique({
      where: { slug: `${slug}-resenha` },
      select: { id: true },
    }))?.id;
    if (postId) {
      const resenhaTag = await prisma.tag.findUnique({ where: { nome: "resenha" } });
      const roccoTag = await prisma.tag.findUnique({ where: { nome: "rocco" } });
      if (resenhaTag) {
        await prisma.postTag.upsert({ where: { postId_tagId: { postId, tagId: resenhaTag.id } }, update: {}, create: { postId, tagId: resenhaTag.id } });
      }
      if (roccoTag && roccoTag.id !== resenhaTag?.id) {
        await prisma.postTag.upsert({ where: { postId_tagId: { postId, tagId: roccoTag.id } }, update: {}, create: { postId, tagId: roccoTag.id } });
      }
    }
    postIdx++;
  }
  console.log(`${postIdx - 1} posts inseridos!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });