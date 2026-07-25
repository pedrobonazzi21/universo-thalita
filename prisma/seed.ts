import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL ?? "";
const authToken = process.env.TURSO_AUTH_TOKEN ?? "";
const adapter = new PrismaLibSql({ url, authToken });
const prisma = new PrismaClient({ adapter });

interface CapaInput {
  url: string;
  editora: string;
  ano: number;
  descricao?: string;
}

interface ObraInput {
  titulo: string;
  slug: string;
  tipo: string;
  ano: number;
  editora: string;
  genero: string;
  sinopse: string | null;
  depoimentos: string | null;
  capas: CapaInput[];
}

const obras: ObraInput[] = [
  // ── Originais (edições atuais) ──────────────────────────────────────
  {
    titulo: "Diário de uma garota esquisita",
    slug: "diario-de-uma-garota-esquisita",
    tipo: "Livro",
    ano: 2025,
    editora: "HarperKids",
    genero: "Ficção infantojuvenil",
    sinopse:
      'O livro "Diário de uma garota esquisita" conta a história de Carol, uma garota de 13 anos que se sente invisível, deslocada e "totalmente esquisita". Encarando a separação dos pais, a nova rotina com uma madrasta, a falta de amigos e problemas de autoestima, ela encontra no seu diário uma válvula de escape para desabafar seus sentimentos sem filtros ou receios. A obra mescla prosa e poesia para narrar de forma sensível e bem-humorada os dilemas da pré-adolescência.',
    depoimentos:
      '"O diário de uma garota esquisita vai te envolver, alertar e inspirar, principalmente se você, assim como eu, se sente ou já se sentiu \'esquisita\'. Este livro nos faz refletir e escrever nossas próprias confissões. Porque escrever alivia!" — Luluca.',
    capas: [
      { url: "/img/capa-diario-de-uma-garota-esquisita.jpg", editora: "HarperKids", ano: 2025 },
    ],
  },
  {
    titulo:
      "Confissões de um garoto talentoso, purpurinado e (intimamente) discriminado",
    slug: "confissoes-de-um-garoto-talentoso",
    tipo: "Livro",
    ano: 2025,
    editora: "Pitaya (HarperCollins)",
    genero: "Ficção Juvenil / Literatura LGBTQIA+",
    sinopse:
      "Confissões de um garoto talentoso, purpurinado e (intimamente) discriminado, de Thalita Rebouças, acompanha Zeca, um jovem homossexual confiante e bem-sucedido nas redes sociais que enfrenta o preconceito do pai ao voltar para o Rio de Janeiro. Com o apoio da mãe e amigos, ele busca manter sua identidade e perseguir seus sonhos enquanto lida com as dificuldades da vida adulta.",
    depoimentos:
      '"Se na adolescência eu tivesse tido a oportunidade de ler esta obra, muito sofrimento poderia ter sido poupado. Então leia o livro, indique, compre e dê de presente. Talvez ele possa salvar uma vida." – Lulu Santos',
    capas: [
      { url: "/img/capa-confissoes-de-um-garoto.jpg", editora: "Pitaya", ano: 2025 },
      { url: "/img/capa-confissoes-de-um-garoto-nerd.jpg", editora: "Arqueiro", ano: 2022 },
    ],
  },
  {
    titulo:
      "Confissões de Uma Garota Excluída, Mal-Amada E (Um Pouco) Dramática",
    slug: "confissoes-de-uma-garota-excluida",
    tipo: "Livro",
    ano: 2025,
    editora: "Pitaya (HarperCollins)",
    genero: "Romance juvenil",
    sinopse:
      "A vida de Tetê vira de cabeça para baixo quando seu pai perde o emprego e sua família precisa vender o apartamento na Barra da Tijuca para morar com os avós em Copacabana, no Rio de Janeiro. Dividindo o espaço com cinco parentes barulhentos, ela perde suas referências e sua privacidade, encontrando conforto apenas na cozinha. Embora esteja aliviada por deixar o antigo colégio onde sofria bullying por seu jeito peculiar, Tetê fica apavorada com a ideia de recomeçar o ensino médio em uma nova escola sem conhecer ninguém. Sentindo-se excluída e insegura, ela logo percebe que suas preocupações podem ter um toque de drama, pois o novo ambiente traz encontros inesperados, amizades verdadeiras e a chance de descobrir que enfrentar os próprios medos é o único caminho para ser feliz.",
    depoimentos:
      '"A combinação de turquesa com rosa ficou um charme! Além disso, o livro tem algumas ilustrações fofas e também conta com as receitinhas da Tetê, que me deram água na boca! Recomendo esse livro não só para adolescentes, mas também para quem gosta de livros leves e divertidos!" — Daniela Colaci, do blog Daniela Colaci.',
    capas: [
      { url: "/img/capa-confissoes-de-uma-garota.jpg", editora: "Pitaya", ano: 2025 },
      { url: "/img/capa-confissoes-de-uma-garota-linda.jpg", editora: "Arqueiro", ano: 2016 },
    ],
  },
  {
    titulo:
      "Confissões de Um Garoto Tímido, Nerd E (Ligeiramente) Apaixonado",
    slug: "confissoes-de-um-garoto-timido",
    tipo: "Livro",
    ano: 2025,
    editora: "Pitaya (HarperCollins)",
    genero: "Romance juvenil/Ficção adolescente",
    sinopse:
      "Davi está no segundo ano do ensino médio e finalmente toma coragem para iniciar o curso de astrologia que sempre quis fazer, superando o medo de sofrer preconceitos. Entre signos e mapas astrais, ele conhece Milena, uma menina incrível que o deixa encantado com seu jeito apaixonante. Embora sua melhor amiga, Tetê, o incentive a investir no relacionamento, vencer a timidez extrema e a falta de experiência amorosa são grandes desafios para o jovem. Enquanto tenta lidar com seus próprios sentimentos e ajudar seu amigo Zeca em seus problemas afetivos, a rotina da turma sofre uma reviravolta com a chegada de Gonçalo, um estudante português que veio passar as férias no Rio de Janeiro. A presença do estrangeiro traz efeitos inesperados, forçando Davi e seus amigos a quebrarem tabus, enfrentarem preconceitos e lidarem com questões profundas de autoconhecimento que nunca imaginaram ter de encarar.",
    depoimentos:
      '"...é um livro que gera bastante reflexão, especialmente em relação a nossa necessidade de rotular as coisas. A autora aborda temas bem interessantes como a homossexualidade, o primeiro amor, homofobia e principalmente a amizade, o que faz do livro uma obra que sensibiliza ao mesmo tempo que diverte. E pelo amor de Getúlio, as cenas finais são lindas, fiquei com os olhos cheios de lágrimas! Difícil não ter empatia por Davi e não se comover com a narrativa da Thalita Rebouças." – Michele Lima, do Blog Na Nossa Estante.',
    capas: [
      { url: "/img/capa-confissoes-de-um-garoto-nerd.jpg", editora: "Pitaya", ano: 2025 },
      { url: "/img/capa-confissoes-de-um-garoto-timido-nerd.jpg", editora: "Arqueiro", ano: 2017 },
    ],
  },
  {
    titulo:
      "Confissões de uma Garota Llinda, Popular e (Secretamente) Infeliz",
    slug: "confissoes-de-uma-garota-linda",
    tipo: "Livro",
    ano: 2025,
    editora: "Pitaya (HarperCollins)",
    genero: "Infantojuvenil / Ficção",
    sinopse:
      "Valentina tem tudo o que muitos consideram o padrão de uma vida perfeita: é loira, linda, rica, mora em uma mansão e é a garota mais popular e invejada da escola. No entanto, por trás dessa fachada ideal, ela esconde uma realidade dolorosa e uma profunda infelicidade. Com uma estrutura familiar complicada e cheia de traumas, ela lida com a ausência do pai, que vive viajando, e enfrenta uma convivência difícil com sua avó mesquinha. Além disso, a jovem sofre silenciosamente com a pressão estética imposta pela sociedade e pela própria família, desenvolvendo sérios distúrbios alimentares na busca por um padrão de magreza inalcançável.",
    depoimentos:
      '"Entre os tantos elogios que tenho a esse livro, o principal é quanto aos temas abordados pela Thalita Rebouças. A autora nos traz temas frequentes da realidade adolescente... Além disso tudo, a terapia ainda é trazida como auxílio a Valentina, sendo esse um dos pontos altos, afinal, o suporte psicológico é, por muitas vezes, negligenciado." – Gabriela, do Blog Menina da Bahia',
    capas: [
      { url: "/img/capa-confissoes-de-uma-garota-linda.jpg", editora: "Pitaya", ano: 2025 },
      { url: "/img/capa-confissoes-de-uma-garota-linda-arqueiro.jpg", editora: "Arqueiro", ano: 2019 },
    ],
  },
  {
    titulo: "Falando sério sobre adolescência: Um guia para a família",
    slug: "falando-serio-sobre-adolescencia",
    tipo: "Livro",
    ano: 2024,
    editora: "L&PM",
    genero: "Não ficção (Autoajuda parental)",
    sinopse:
      "A obra nasce do fascínio compartilhado pelos autores por essa fase tão atribulada quanto fundamental na formação humana. É muito comum que os pais sintam que aquela criança doce e amorosa foi subitamente substituída por um 'estranho' que bate portas e revira os olhos. Para socorrer as famílias, os autores unem a ciência da psicologia ao lúdico e à sensibilidade de quem conversa com jovens há décadas, traduzindo o que acontece na mente e no corpo dos adolescentes. Dividido em 44 capítulos de leitura rápida e direta, o livro aborda de forma acolhedora os sentimentos à flor da pele, os hormônios em polvorosa e o cérebro em plena expansão dos jovens.",
    depoimentos:
      '"A ciência e o lúdico de mãos e corações dados numa obra esclarecedora." — Heloísa Périssé, atriz.',
    capas: [
      { url: "/img/capa-falando-serio-sobre-adolecencia.jpg", editora: "L&PM", ano: 2024 },
    ],
  },
  {
    titulo: "Felicidade inegociável e outras rimas",
    slug: "felicidade-inegociavel",
    tipo: "Livro",
    ano: 2024,
    editora: "HarperCollins Brasil",
    genero: "Não ficção/ poesia",
    sinopse:
      'O livro reúne mais de 60 textos que misturam prosa e poesia (as "rimas" do título) para construir um manifesto sobre amor-próprio e autoconhecimento. Escrita a partir das vivências da própria autora após os 45 anos, a narrativa funciona como um diálogo aberto sobre as dores, as libertações e as belezas do envelhecimento feminino. Thalita propõe que a felicidade não deve ser moldada por expectativas sociais, transformando a autoaceitação em um valor absoluto e inegociável.',
    depoimentos:
      '"Thalita é das minhas. Mulher que veio pra contestar com poesia os olhares errados... Nosso envelhecer é ouro, maturidade e tempo bem gastos." — Ingrid Guimarães, atriz do Elenco do filme Fala Sério, Mãe!, à HarperCollins.',
    capas: [
      { url: "/img/capa-felicidade-inegociavel.png", editora: "HarperCollins Brasil", ano: 2024 },
      { url: "/img/capa-felicidade-inegociavel.webp", editora: "HarperCollins Brasil", ano: 2024 },
    ],
  },
  {
    titulo: "Fala sério, professor! Edição revista e ampliada",
    slug: "fala-serio-professor",
    tipo: "Livro",
    ano: 2023,
    editora: "Rocco",
    genero: "Crônica/ ficção",
    sinopse:
      "Nesta edição revista e ampliada, Thalita Rebouças retoma a trajetória de Malu, abordando de forma bem-humorada as memórias escolares e a influência de professores marcantes em sua vida dos 3 aos 22 anos, através de crônicas sobre os desafios do crescimento. A obra, lançada pela Editora Rocco, atualiza as trapalhadas da protagonista para a realidade da geração hiperconectada dos anos 2020.",
    depoimentos:
      '"Nós nos identificamos com a Malu porque várias coisas que ela vive nós também já vivemos ou conhecemos alguém que já passou por aquela situação, então a leitura se torna fluida e muito divertida." – Beatriz Gosmin, do WordPress',
    capas: [
      { url: "/img/capa-fala-serio-professor.jpg", editora: "Rocco", ano: 2023 },
    ],
  },
  {
    titulo: "Fala sério, amiga! Edição revista e ampliada",
    slug: "fala-serio-amiga-edicao-revista",
    tipo: "Livro",
    ano: 2023,
    editora: "Rocco",
    genero: "Crônica/ ficção",
    sinopse:
      "Na edição revista e ampliada de 'Fala sério, amiga!', a autora Thalita Rebouças convida o leitor a mergulhar nas memórias de sua famosa protagonista, Malu (Maria de Lourdes), focando exclusivamente em suas relações de amizade dos 3 aos 21 anos de idade. Por meio de crônicas leves e bem-humoradas, o livro aborda situações universais que moldam os laços afetivos na juventude, como apelidos bizarros, ciúmes, brigas bobas, sinceridade excessiva e a convivência com namorados 'chatinhos' de amigas queridas.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-amiga.jpg", editora: "Rocco", ano: 2023 },
      { url: "/img/capa-fala-serio-amiga-capa-2.jpg", editora: "Rocco", ano: 2023 },
    ],
  },
  {
    titulo: "Tudo por um namorado: Edição revista e ampliada",
    slug: "tudo-por-um-namorado-edicao-revista",
    tipo: "Livro",
    ano: 2022,
    editora: "Rocco",
    genero: "Romance Juvenil",
    sinopse:
      "Na edição revista e ampliada de 'Tudo por um namorado', a escritora Thalita Rebouças traz de volta as inseparáveis amigas Manu, Gabi e Ritinha, trio de protagonistas que conquistou o público no sucesso 'Tudo por um pop star'. Se antes as adolescentes eram capazes de qualquer loucura para chegar perto de seus ídolos musicais, desta vez elas enfrentam as dores e as delícias do primeiro amor quando Gabi se apaixona por Diogo, um jovem surfista e músico amador.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-tudo-por-um-namorado.jpg", editora: "Rocco", ano: 2022 },
      { url: "/img/capa-tudo-por-um-namorado-capa-2.jpg", editora: "Rocco", ano: 2022 },
    ],
  },
  {
    titulo: "Fala sério, filha! Edição revista e ampliada",
    slug: "fala-serio-filha-edicao-revista",
    tipo: "Livro",
    ano: 2022,
    editora: "Rocco",
    genero: "Crônica/ ficção",
    sinopse:
      "Na edição revista e ampliada de 'Fala sério, filha!', subtitulada originalmente como 'A vingança dos pais', a autora Thalita Rebouças inverte os papéis da sua famosa série literária para dar voz aos pensamentos de Ângela Cristina e Armando, os pais da carismática protagonista Malu (Maria de Lourdes). Afastando-se do tradicional ponto de vista da jovem, a obra reúne crônicas bem-humoradas que cobrem a trajetória de Malu dos seis meses aos 21 anos de idade, mas sob a perspectiva madura, protetora e muitas vezes desesperada de seus genitores.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-filha.jpg", editora: "Rocco", ano: 2022 },
    ],
  },
  {
    titulo: "Fala sério, mãe! Edição revista e ampliada",
    slug: "fala-serio-mae-edicao-revista",
    tipo: "Livro",
    ano: 2022,
    editora: "Rocco",
    genero: "Crônica/ ficção",
    sinopse:
      "Na edição revista e ampliada de 'Fala sério, mãe!', a escritora Thalita Rebouças apresenta uma coletânea de crônicas bem-humoradas que mapeiam a intensa, afetiva e turbulenta relação entre a mãe coruja Ângela Cristina e sua filha Maria de Lourdes, a Malu. A estrutura narrativa se divide de forma única: a primeira metade do livro reflete o ponto de vista e as angústias da mãe desde a gravidez e a infância da menina; já a partir dos 12 anos, logo após o primeiro beijo, Malu assume a voz da história para relatar suas próprias teimosias e descobertas juvenis. Esta versão expande a linha do tempo original — que ia até os 21 anos — para incluir as aventuras inéditas da protagonista até os 23 anos.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-mae.jpg", editora: "Rocco", ano: 2022 },
      { url: "/img/capa-fala-serio-mae-capa-2.jpg", editora: "Rocco", ano: 2022 },
    ],
  },
  {
    titulo: "Natali e sua vontade idiota de agradar todo mundo",
    slug: "natali-e-sua-vontade-idiota-de-agradar-todo-mundo",
    tipo: "Livro",
    ano: 2022,
    editora: "Rocco",
    genero: "Romance juvenil",
    sinopse:
      "A narrativa acompanha a jornada de autodescoberta e aceitação de Natali, uma adolescente de 15 anos que enfrenta o dilema de se assumir sáfica para sua família barulhenta e tradicional. Nascida em pleno dia 25 de dezembro, a jovem planeja aproveitar a ceia natalina e a reunião dos parentes para revelar que gosta de meninas. No entanto, o medo de decepcionar as pessoas e a sua mania de colocar o bem-estar dos outros acima do próprio fazem com que ela adie constantemente o momento.",
    depoimentos:
      '"Nesta linda história de descobertas e amor, me vi — como mulher, gay, filha, mãe e irmã — inúmeras vezes não só na Natali, mas em várias personagens da vida dela. O nome disso é \'representatividade\'. Aprendi que essa palavrinha salva vidas." — Fernanda Gentil',
    capas: [
      { url: "/img/capa-natali.jpg", editora: "Rocco", ano: 2022 },
    ],
  },
  {
    titulo: "Pai em Dobro",
    slug: "pai-em-dobro",
    tipo: "Livro",
    ano: 2020,
    editora: "Rocco",
    genero: "Ficção Juvenil / Comédia Dramática/ Romance de Formação",
    sinopse:
      "Em 'Pai em Dobro', romance juvenil de Thalita Rebouças publicado pela Editora Rocco, a narrativa acompanha a jornada de Vicenza, uma jovem doce e superespiritualizada que passou a vida inteira em uma comunidade ecológica isolada, sem sinal de celular ou poluição. Apesar de amar sua rotina, ela sente um vazio enorme por nunca ter conhecido a identidade de seu pai biológico, um mistério guardado a sete chaves por sua mãe. Ao completar 18 anos e aproveitar uma viagem da mãe, a protagonista encontra pistas antigas e decide fugir para o Rio de Janeiro em pleno Carnaval para desvendar o seu passado.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-pai-em-dobro.jpg", editora: "Rocco", ano: 2020 },
    ],
  },
  {
    titulo: "Fala sério, Thalita!",
    slug: "fala-serio-thalita",
    tipo: "Livro",
    ano: 2020,
    editora: "Pixel",
    genero: "Biografia / Não-Ficção Juvenil",
    sinopse:
      "a escritora deixa a ficção de lado para comemorar seus 20 anos de carreira assumindo, pela primeira vez, o papel de protagonista de sua própria história. Afastando-se dos dilemas de Malu e de seus outros personagens clássicos, Thalita Rebouças abre o seu mundo para os leitores em um formato interativo repleto de memórias, fotos pessoais e revelações inéditas desde a sua infância até a consagração como um fenômeno da literatura infantojuvenil.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-thalita.jpg", editora: "Pixel", ano: 2020 },
    ],
  },
  {
    titulo: "Fala sério, irmão! Fala sério, irmã!",
    slug: "fala-serio-irmao-irma",
    tipo: "Livro",
    ano: 2015,
    editora: "Rocco",
    genero: "Literatura infantojuvenil e crônica",
    sinopse:
      "É um livro duplo que pode ser lido de ponta-cabeça. A obra reúne crônicas bem-humoradas sobre a relação da protagonista Malu com seus dois irmãos mais novos. De um lado, acompanhamos a convivência recheada de ciúmes e brigas com o irmão do meio, Mamá. Do outro lado, virando o livro, estão as histórias focadas nas confusões e confidências com a irmã caçula, Malena.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-irma-irmao.jpg", editora: "Rocco", ano: 2015 },
    ],
  },
  {
    titulo: "Um ano inesquecível",
    slug: "um-ano-inesquecivel",
    tipo: "Livro",
    ano: 2015,
    editora: "Gutenberg",
    genero: "Literatura Infantojuvenil e Romance",
    sinopse:
      "Um Ano Inesquecível é uma antologia em que Thalita Rebouças escreveu apenas um quarto do livro, sendo responsável pelo conto de Verão. A obra reúne quatro histórias de amor adolescente escritas por diferentes autoras nacionais, divididas pelas estações do ano.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-um-ano-inesquecivel.jpg", editora: "Gutenberg", ano: 2015 },
    ],
  },
  {
    titulo: "Fiquei com um famoso",
    slug: "fiquei-com-um-famoso",
    tipo: "Livro",
    ano: 2014,
    editora: "Rocco",
    genero: "Literatura Infantojuvenil e Romance",
    sinopse:
      "Fiquei com um famoso é um conto digital de Thalita Rebouças conectado ao universo de seu romance 360 dias de sucesso. A história acompanha Camila Fernanda, uma fã dedicada que realiza o sonho de se envolver com Pedro, o guitarrista de sua banda favorita. No entanto, o romance idílico rapidamente se transforma em dor de cabeça, já que o músico é comprometido e namora outra garota chamada Babi.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fiquei-com-um-famoso.jpg", editora: "Rocco", ano: 2014 },
    ],
  },
  {
    titulo: "360 dias de sucesso",
    slug: "360-dias-de-sucesso",
    tipo: "Livro",
    ano: 2014,
    editora: "Rocco",
    genero: "Literatura Infantojuvenil e Romance",
    sinopse:
      '360 dias de sucesso acompanha a trajetória meteórica e os bastidores da fama de cinco amigos de infância — Gualter, Pedro, Demétrio, Ícaro e Théo — que formam a banda de pop rock "Filhos de Ben". O grupo sai das garagens e alcança o topo das paradas de sucesso em menos de um ano, mas a rápida ascensão traz consequências avassaladoras.',
    depoimentos: null,
    capas: [
      { url: "/img/capa-360-dias.jpg", editora: "Rocco", ano: 2014 },
    ],
  },
  {
    titulo: "Bia não quer dormir",
    slug: "bia-nao-quer-dormir",
    tipo: "Livro",
    ano: 2014,
    editora: "Rocco",
    genero: "Literatura Infantojuvenil",
    sinopse:
      "Bia não quer dormir, segundo livro infantil de Thalita Rebouças, traz de volta a carismática e questionadora protagonista Bia em uma situação comum a muitas famílias. Na história, a garotinha precisa ir para a cama porque tem aula no dia seguinte, mas o sono simplesmente não vem.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-bia-nao-quer-dormir.jpg", editora: "Rocco", ano: 2014 },
    ],
  },
  {
    titulo: "Por que só as princesas se dão bem?",
    slug: "por-que-so-as-princesas-se-dao-bem",
    tipo: "Livro",
    ano: 2013,
    editora: "Rocco",
    genero: "Ficção infantil",
    sinopse:
      "Por que só as princesas se dão bem? é o primeiro livro infantil de Thalita Rebouças, funcionando como um divertido 'conto de fadas às avessas'. A história começa na hora de dormir, quando a mãe de Bia termina de ler uma fábula tradicional e a garotinha, curiosa, questiona por que apenas as princesas são felizes, bonitas e terminam com um príncipe nas histórias.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-pq-so-as-princesas.jpg", editora: "Rocco", ano: 2013 },
    ],
  },
  {
    titulo: "Ela disse, ele disse: o namoro",
    slug: "ela-disse-ele-disse-o-namoro",
    tipo: "Livro",
    ano: 2013,
    editora: "Rocco",
    genero: "Romance Adolescente",
    sinopse:
      "Ela disse, ele disse: o namoro é a continuação do sucesso de Thalita Rebouças, trazendo de volta os protagonistas Leo e Rosa após dez meses juntos. A trama expõe que, embora amar seja ótimo, o cotidiano a dois na adolescência é cheio de desafios. O livro ganha um diferencial único: a participação especial de Mauricio de Sousa. Os integrantes da Turma da Mônica Jovem, como Mônica e Cebola, aparecem em cenas ilustradas ao longo do enredo.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-ela-disse-ele-disse.jpg", editora: "Rocco", ano: 2013 },
      { url: "/img/capa-ela-disse-ele-disse-o-namoro.jpg", editora: "Rocco", ano: 2013 },
    ],
  },
  {
    titulo: "Adultos sem filtro",
    slug: "adultos-sem-filtro",
    tipo: "Livro",
    ano: 2024,
    editora: "Rocco",
    genero: "Não ficção",
    sinopse: null,
    depoimentos: null,
    capas: [
      { url: "/img/capa-adultos-sem-filtro.jpg", editora: "Rocco", ano: 2024 },
    ],
  },
  {
    titulo: "Traição entre amigas",
    slug: "traicao-entre-amigas",
    tipo: "Livro",
    ano: 2012,
    editora: "Rocco",
    genero: "Romance juvenil",
    sinopse: null,
    depoimentos: null,
    capas: [
      { url: "/img/capa-traicao-entre-amigas.jpg", editora: "Rocco", ano: 2012 },
      { url: "/img/capa-traicao-entre-amigas-capa-2.jpg", editora: "Rocco", ano: 2012 },
    ],
  },
  {
    titulo: "Tudo por um pop star",
    slug: "tudo-por-um-pop-star",
    tipo: "Livro",
    ano: 2011,
    editora: "Rocco",
    genero: "Romance juvenil",
    sinopse: null,
    depoimentos: null,
    capas: [
      { url: "/img/capa-tudo-por-um-pop-star.jpg", editora: "Rocco", ano: 2011 },
      { url: "/img/capa-tudo-por-um-pop-star-capa-2.jpg", editora: "Rocco", ano: 2011 },
    ],
  },
  {
    titulo: "Uma fada veio me visitar",
    slug: "uma-fada-me-visitou",
    tipo: "Livro",
    ano: 2013,
    editora: "Rocco",
    genero: "Ficção infantil",
    sinopse: null,
    depoimentos: null,
    capas: [
      { url: "/img/capa-uma-fada-me-visitou.jpg", editora: "Rocco", ano: 2013 },
    ],
  },
  // ── 13 edições originais (adicionadas) ──────────────────────────────
  {
    titulo: "Adultos sem filtro: E outras crônicas",
    slug: "adultos-sem-filtro-outras-cronicas",
    tipo: "Livro",
    ano: 2012,
    editora: "Rocco",
    genero: "Crônica",
    sinopse:
      "Adultos sem filtro marca a transição de Thalita Rebouças para um público mais maduro, reunindo crônicas bem-humoradas originalmente escritas para sua coluna na Veja Rio. A autora debater, com sua habitual cumplicidade e leveza, as dores e delícias do cotidiano adulto.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-adultos-sem-filtro.jpg", editora: "Rocco", ano: 2012 },
    ],
  },
  {
    titulo: "Fala sério, filha! A vingança dos pais",
    slug: "fala-serio-filha",
    tipo: "Livro",
    ano: 2011,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      'Fala sério, filha! é o sexto volume da famosa série de Thalita e funciona como o aguardado "troco" dos pais contra as reclamações da primogênita, Maria de Lourdes (Malu). Após darem seus depoimentos nos livros anteriores, a superprotetora Ângela Cristina e o paizão Armando assumem os holofotes.',
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-filha-a-vinganca-dos-pais.jpg", editora: "Rocco", ano: 2011 },
    ],
  },
  {
    titulo: "Era uma vez minha primeira vez",
    slug: "era-uma-vez-minha-primeira-vez",
    tipo: "Livro",
    ano: 2011,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      "Era uma vez minha primeira vez afasta-se do formato de manual educativo para tratar da iniciação sexual adolescente através do afeto e do humor. Seis amigas de infância reunidas em uma festa começam a recordar o passado.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-era-uma-vez-minha-primeira-vez.jpg", editora: "Rocco", ano: 2011 },
    ],
  },
  {
    titulo: "Fala sério, amor!",
    slug: "fala-serio-amor",
    tipo: "Livro",
    ano: 2011,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      "Fala sério, amor! foca na movimentada vida amorosa da protagonista Maria de Lourdes, a Malu. Crônicas cronológicas que vão dos seus 8 anos até a maturidade dos 21.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-amor.jpg", editora: "Rocco", ano: 2011 },
      { url: "/img/capa-fala-serio-amor-capa-2.jpg", editora: "Rocco", ano: 2011 },
    ],
  },
  {
    titulo: "Ela Disse, Ele Disse",
    slug: "ela-disse-ele-disse",
    tipo: "Livro",
    ano: 2010,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      "Ela Disse, Ele Disse acompanha a rotina de dois adolescentes de 14 anos, Rosa e Leo, que não se conhecem, mas compartilham o mesmo desafio: encarar o primeiro dia de aula em um colégio novo no Rio de Janeiro. A estrutura inovadora do livro apresenta a mesma história sob dois pontos de vista alternados.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-ela-disse-ele-disse.jpg", editora: "Rocco", ano: 2010 },
    ],
  },
  {
    titulo: "Fala sério, pai!",
    slug: "fala-serio-pai",
    tipo: "Livro",
    ano: 2009,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      "Fala sério, pai! é o terceiro livro da série Fala Sério de Thalita e traz, desta vez, a perspectiva de Armando, o pai da protagonista Maria de Lourdes (Malu). Crônicas que cobrem desde o nascimento de Malu até ela atingir a maioridade.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-pai.jpg", editora: "Rocco", ano: 2009 },
      { url: "/img/capa-fala-serio-pai-capa-2.jpg", editora: "Rocco", ano: 2009 },
      { url: "/img/capa-fala-serio-pai-capa-3.jpg", editora: "Rocco", ano: 2009 },
    ],
  },
  {
    titulo: "Fala sério, amiga!",
    slug: "fala-serio-amiga",
    tipo: "Livro",
    ano: 2008,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      "Fala sério, amiga! coloca os holofotes sobre a intensa vida social de Maria de Lourdes, a Malu. Organizada em crônicas cronológicas desde os 3 aninhos até os 21 anos.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-amiga.jpg", editora: "Rocco", ano: 2008 },
      { url: "/img/capa-fala-serio-amiga-capa-2.jpg", editora: "Rocco", ano: 2008 },
    ],
  },
  {
    titulo: "Tudo por um Feriado",
    slug: "tudo-por-um-feriado",
    tipo: "Livro",
    ano: 2007,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      "Tudo por um feriado traz de volta as amigas Manu, Gabi e Ritinha em uma nova aventura. Decididas a aproveitar o feriado de Carnaval para descansar, o trio viaja para Porto das Rosas.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-tudo-por-um-feriado.jpg", editora: "Rocco", ano: 2007 },
    ],
  },
  {
    titulo: "Uma fada veio me visitar",
    slug: "uma-fada-veio-me-visitou",
    tipo: "Livro",
    ano: 2007,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse:
      "Uma fada veio me visitar acompanha a história de Luna, uma adolescente de 13 anos que está insatisfaita com sua rotina. Sua vida vira de cabeça para baixo quando ela recebe a visita de Tatu, uma fada tagarela e atrapalhada que passou os últimos quarenta anos congelada.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-uma-fada-me-visitou.jpg", editora: "Rocco", ano: 2007 },
    ],
  },
  {
    titulo: "Tudo por um namorado",
    slug: "tudo-por-um-namorado",
    tipo: "Livro",
    ano: 2005,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      "Tudo por um namorado traz de volta o trio de amigas Manu, Gabi e Ritinha. Durante as férias de verão em Macaé, as meninas decidem que é a hora certa de desencalhar.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-tudo-por-um-namorado.jpg", editora: "Rocco", ano: 2005 },
      { url: "/img/capa-tudo-por-um-namorado-capa-2.jpg", editora: "Rocco", ano: 2005 },
    ],
  },
  {
    titulo: "Fala sério, mãe!",
    slug: "fala-serio-mae",
    tipo: "Livro",
    ano: 2004,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      "Fala sério, mãe! é o livro que deu início à série de maior sucesso de Thalita Rebouças. A obra é dividida em crônicas que acompanham a vida de Malu desde antes de seu nascimento até ela atingir os 21 anos. Primeira metade: ponto de vista de Ângela Cristina. Segunda metade: Malu assume a voz.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-fala-serio-mae.jpg", editora: "Rocco", ano: 2004 },
      { url: "/img/capa-fala-serio-mae-capa-2.jpg", editora: "Rocco", ano: 2004 },
    ],
  },
  {
    titulo: "Tudo por um pop star",
    slug: "tudo-por-um-pop-star-original",
    tipo: "Livro",
    ano: 2003,
    editora: "Rocco",
    genero: "literatura infantojuvenil",
    sinopse:
      'Tudo por um pop star acompanha a jornada de três melhores amigas de Resende — Manu, Gabi e Ritinha — que são completamente obcecadas pela boy band americana "Slava Body Disco Disco Boys".',
    depoimentos: null,
    capas: [
      { url: "/img/capa-tudo-por-um-pop-star.jpg", editora: "Rocco", ano: 2003 },
      { url: "/img/capa-tudo-por-um-pop-star-capa-2.jpg", editora: "Rocco", ano: 2003 },
    ],
  },
  {
    titulo: "Traição entre amigas",
    slug: "traicao-entre-amigas-original",
    tipo: "Livro",
    ano: 2000,
    editora: "Rocco",
    genero: "Literatura infantojuvenil",
    sinopse:
      "Traição entre amigas, primeiro livro de Thalita Rebouças, acompanha Luiza e Penélope, duas jovens com personalidades opostas que se conhecem em um curso de teatro e se tornam inseparáveis.",
    depoimentos: null,
    capas: [
      { url: "/img/capa-traicao-entre-amigas.jpg", editora: "Rocco", ano: 2000 },
      { url: "/img/capa-traicao-entre-amigas-capa-2.jpg", editora: "Rocco", ano: 2000 },
    ],
  },
];

async function main() {
  await prisma.capa.deleteMany();
  await prisma.obra.deleteMany();
  console.log("Registros antigos removidos.");

  let totalObras = 0;
  let totalCapas = 0;

  for (const obra of obras) {
    const { capas, ...obraData } = obra;

    const created = await prisma.obra.upsert({
      where: { slug: obraData.slug },
      update: obraData,
      create: obraData,
    });

    for (let i = 0; i < capas.length; i++) {
      const capa = capas[i];
      await prisma.capa.upsert({
        where: {
          id: `${created.id}-capa-${i}`,
        },
        update: {
          url: capa.url,
          editora: capa.editora,
          ano: capa.ano,
          descricao: capa.descricao ?? null,
          ordem: i,
        },
        create: {
          id: `${created.id}-capa-${i}`,
          url: capa.url,
          editora: capa.editora,
          ano: capa.ano,
          descricao: capa.descricao ?? null,
          ordem: i,
          obraId: created.id,
        },
      });
      totalCapas++;
    }

    totalObras++;
  }

  console.log(`${totalObras} obras criadas com sucesso!`);
  console.log(`${totalCapas} capas criadas com sucesso!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
