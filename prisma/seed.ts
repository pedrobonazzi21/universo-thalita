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
      { url: "/img/capa-confissoes-de-um-garoto.jpg", editora: "Pitaya", ano: 2025 },
      { url: "/img/capa-confissoes-de-um-garoto-nerd.jpg", editora: "Arqueiro", ano: 2017 },
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
    titulo: "Adultos sem filtro: só assim pode tirar",
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
  // ── 13 edições originais (adicionadas) ──────────────────────────────
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
      { url: "/img/capa-fala-serio-filha-a-vingança-dos-pais.jpg", editora: "Rocco", ano: 2011 },
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
    ano: 2011,
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
    slug: "tudo-por-um-pop-star",
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
    slug: "traicao-entre-amigas",
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

interface PostInput {
  titulo: string;
  slug: string;
  conteudo: string;
  capaUrl?: string;
  linkAfiliado?: string;
  obraSlug?: string;
  tags?: string[];
}

const posts: PostInput[] = [
  {
    titulo: "Fala Sério, Mãe!, de Thalita Rebouças: uma comédia divertida sobre a maternidade e o crescimento",
    slug: "fala-serio-mae-resenha",
    capaUrl: "/img/capa-fala-serio-mae.jpg",
    linkAfiliado: "https://www.amazon.com.br/dp/8579804574",
    obraSlug: "fala-serio-mae",
    tags: ["Resenha", "Comédia", "Maternidade"],
    conteudo: `Fala Sério, Mãe!, de Thalita Rebouças, é uma leitura leve e bem-humorada que acompanha a relação entre uma mãe e sua filha desde a gravidez até a adolescência. Em vez de narrar a história pelo olhar da filha, como costuma acontecer em livros voltados para o público jovem, a autora escolhe contar tudo pela perspectiva de Ângela, mostrando os desafios, as inseguranças e os momentos engraçados que fazem parte da maternidade.

Ao longo da narrativa, a autora reforça que ser mãe significa aprender constantemente. Cada nova fase da vida da filha traz descobertas, preocupações e desafios diferentes.

A escrita da Thalita é bastante simples e descontraída, o que faz com que a leitura seja rápida e muito envolvente. Os capítulos são curtos e apresentam episódios marcantes da vida de Malu, desde a infância até os conflitos típicos da adolescência. Essa estrutura faz o livro parecer uma coleção de memórias, deixando a leitura leve e divertida.

Grande parte do humor surge justamente das diferenças entre mãe e filha. Enquanto Ângela tenta proteger Malu de qualquer problema, a adolescente busca cada vez mais independência e liberdade. Essa diferença de perspectivas rende situações engraçadas, mas também cria momentos de reflexão sobre as mudanças que acontecem naturalmente durante o crescimento.

A relação entre mãe e filha muda conforme os anos passam. As discussões se tornam mais frequentes, mas o carinho e a preocupação continuam sendo o elo que mantém as duas unidas.

Apesar do foco na comédia, o livro também reserva espaço para momentos emocionantes. A autora mostra que nem sempre existe um jeito certo de educar um filho e que tanto os pais quanto os filhos aprendem um com o outro ao longo da vida. Isso torna a história bastante fácil de se identificar, principalmente para quem já viveu situações parecidas em família.

Por outro lado, a narrativa não apresenta um grande conflito central. Como o livro é dividido em diversos episódios do cotidiano, alguns momentos acabam sendo mais marcantes do que outros, e quem prefere histórias com uma trama mais contínua pode sentir falta de um desenvolvimento maior.

Ainda assim, esse formato funciona muito bem dentro da proposta da obra. O grande destaque não está em acontecimentos extraordinários, mas na forma divertida como Thalita Rebouças retrata situações comuns da vida em família. O humor, os diálogos e a identificação com as personagens tornam a leitura bastante agradável.

No fim, Fala Sério, Mãe! é um livro divertido, sensível e capaz de agradar leitores de diferentes idades. Sem grandes reviravoltas, a obra conquista justamente por mostrar que as relações familiares são feitas de pequenas histórias, muitos aprendizados e, acima de tudo, muito amor.`,
  },
  {
    titulo: "Confissões de uma Garota Excluída: drama e autodescoberta na adolescência",
    slug: "confissoes-garota-excluida-resenha",
    capaUrl: "/img/capa-confissoes-de-uma-garota.jpg",
    obraSlug: "confissoes-de-uma-garota-excluida",
    tags: ["Resenha", "Drama", "Adolescência"],
    conteudo: `Confissões de Uma Garota Excluída, Mal-Amada E (Um Pouco) Dramática acompanha Tetê, uma adolescente que precisa deixar sua vida confortável na Barra da Tijuca para morar com os avós em Copacabana. A mudança é abrupta e a personagem precisa lidar com a perda de privacidade, a separação do colégio e o medo de recomeçar tudo do zero.

Thalita Rebouças conseguiu retratar com muita naturalidade o sentimento de exclusão que muitos adolescentes vivenciam. Tetê se sente deslocada, mas a narrativa não se prende ao drama. A autora equilibra os momentos de insegurança com situações leves e engraçadas, criando uma leitura fluida e envolvente.

O grande ponto forte do livro é a representatividade. Tetê não é uma personagem perfeita — ela é dramática, insegura e, por vezes, egoísta. Isso a torna extremamente real e fácil de se identificar. O leitor acompanha sua evolução desde o medo inicial até a descoberta de que enfrentar os próprios medos é o único caminho para a felicidade.

A estrutura do livro em capítulos curtos permite uma leitura rápida, mas sem perder a profundidade dos temas abordados. Amizade, autoaceitação, familiaridade e o medo do desconhecido são trabalhados com sensibilidade e humor.

Para quem já passou por uma mudança de colégio ou se sentiu excluído em algum momento, este livro é uma leitura obrigatória. Thalita mostra que, mesmo nos momentos mais difíceis, sempre há espaço para novas amizades e descobertas.`,
  },
  {
    titulo: "Tudo por um Pop Star: a energia contagiante da amizade e da adolescência",
    slug: "tudo-por-um-pop-star-resenha",
    capaUrl: "/img/capa-tudo-por-um-pop-star.jpg",
    obraSlug: "tudo-por-um-pop-star",
    tags: ["Resenha", "Romance", "Amizade"],
    conteudo: `Tudo por um pop star é um daqueles livros que nos fazem reviver a intensidade da adolescência com um sorriso no rosto. A história acompanha Manu, Gabi e Ritinha, três melhores amigas completamente obcecadas pela boy band "Slava Body Disco Disco Boys".

A força do livro está na química entre as três protagonistas. Cada uma tem uma personalidade diferente, mas a amizade entre elas é inabalável. Thalita Rebouças retrata com maestria essa fase da vida em que tudo parece ser o fim do mundo — um show, um encontro, uma desavença — mas que, olhando para trás, são apenasMEMÓRIAS que nos fazem sorrir.

A escrita é leve, divertida e cheia de referências que remetem à cultura pop dos anos 2000. Os diálogos são naturais e as situações são tão absurdas que beiram a comédia. É impossível não se identificar com pelo menos uma das três amigas.

O livro não se prende apenas ao romance. Thalita explora temas como amizade, fidelidade, ciúmes e a pressão social de ser adolescente. Tudo isso de forma leve, sem sermões ou lições óbvias.

Tudo por um pop star é uma celebração da adolescência em todas as suas formas — intensa, caótica, divertida e, acima de tudo, inesquecível. Uma leitura perfeita para quem quer reviver aquela época em que um show de uma banda era o evento mais importante da vida.`,
  },
];

async function main() {
  await prisma.postTag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
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

  const obraTags: Record<string, string> = {};
  for (const obra of obras) {
    const tag = await prisma.tag.upsert({
      where: { nome: obra.titulo },
      update: {},
      create: { nome: obra.titulo },
    });
    obraTags[obra.slug] = tag.id;
  }
  console.log(`${Object.keys(obraTags).length} tags de obras criadas!`);

  let totalPosts = 0;
  let totalPostTags = 0;

  for (const post of posts) {
    const { tags, obraSlug, ...postData } = post;

    const obra = obraSlug
      ? await prisma.obra.findUnique({ where: { slug: obraSlug } })
      : null;

    const created = await prisma.post.upsert({
      where: { slug: postData.slug },
      update: { ...postData, obraId: obra?.id ?? null },
      create: { ...postData, obraId: obra?.id ?? null },
    });

    const tagNames = [...(tags ?? [])];
    if (obraSlug && obraTags[obraSlug]) {
      const obra = obras.find((o) => o.slug === obraSlug);
      if (obra && !tagNames.includes(obra.titulo)) {
        tagNames.push(obra.titulo);
      }
    }

    for (const tagNome of tagNames) {
      const tag = await prisma.tag.upsert({
        where: { nome: tagNome },
        update: {},
        create: { nome: tagNome },
      });

      await prisma.postTag.upsert({
        where: { postId_tagId: { postId: created.id, tagId: tag.id } },
        update: {},
        create: { postId: created.id, tagId: tag.id },
      });
      totalPostTags++;
    }

    totalPosts++;
  }

  console.log(`${totalPosts} posts criados com sucesso!`);
  console.log(`${totalPostTags} post-tags criadas com sucesso!`);

  const medalhas = [
    { nome: "Primeira Leitura", icone: "\ud83d\udcda", descricao: "Primeira avalia\u00e7\u00e3o realizada" },
    { nome: "Primeira Palavra", icone: "\ud83d\udcac", descricao: "Primeiro coment\u00e1rio publicado" },
    { nome: "Estrela em Ascens\u00e3o", icone: "\ud83c\udf1f", descricao: "Dez coment\u00e1rios aprovados" },
    { nome: "Leitor Dedicado", icone: "\ud83d\udcd6", descricao: "Participa\u00e7\u00e3o em cinco leituras diferentes" },
  ];

  for (const medalha of medalhas) {
    await prisma.medalha.upsert({
      where: { nome: medalha.nome },
      update: {},
      create: medalha,
    });
  }
  console.log(`${medalhas.length} medalhas criadas com sucesso!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
