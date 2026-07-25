# Ranking de Leitores — Gamificação

## Conceito

A proposta consiste em utilizar a gamificação, ou seja, aplicar elementos comuns dos jogos em um ambiente educacional para incentivar a participação dos alunos no blog da escola. Em vez de oferecer prêmios materiais, o sistema recompensa o envolvimento dos estudantes por meio de pontos, níveis e medalhas virtuais, tornando a experiência de leitura mais dinâmica e motivadora.

O foco da gamificação não é transformar a leitura em uma competição, mas criar um ambiente em que os alunos se sintam incentivados a compartilhar suas opiniões, interagir com os colegas e acompanhar sua própria evolução dentro da comunidade escolar.

## Como funciona

O blog será alimentado pelos administradores (professores ou equipe responsável), que publicarão resenhas de livros e filmes, além de outras recomendações de leitura.

Cada aluno terá um perfil no sistema. Ao realizar determinadas ações, ele acumulará pontos de experiência (XP), como:

- Avaliar um livro ou filme utilizando estrelas.
- Escrever comentários sobre as obras publicadas.
- Participar das discussões de forma respeitosa e construtiva.

As resenhas não serão publicadas pelos visitantes. Os alunos participarão exclusivamente por meio das avaliações e dos comentários, mantendo a qualidade e a organização do conteúdo do blog.

## Sistema de pontuação

| Ação | Pontos |
|------|--------|
| Avaliar uma obra (1 a 5 estrelas) | +5 XP |
| Escrever um comentário sobre uma obra | +15 XP |
| Ter um comentário destacado pelo professor ou moderador | +10 XP (bônus) |

Para evitar o acúmulo de pontos por comentários sem conteúdo, o sistema valida apenas comentários que contribuam para a discussão sobre a obra. Mensagens muito curtas ou repetidas não recebem pontuação.

### Exemplo de funcionamento

1. Um aluno lê uma resenha publicada no blog.
2. Ele avalia o livro com 5 estrelas → **+5 XP**
3. Em seguida, escreve um comentário sobre a história e sua opinião → **+15 XP**
4. O professor considera esse comentário bem elaborado e o destaca → **+10 XP**

**Total da participação: 30 XP**

Os pontos são acumulativos. Quanto mais o aluno participa do blog ao longo do tempo, mais experiência ele conquista e maior será seu nível no Ranking de Leitores.

## Níveis

Conforme acumula pontos, o aluno sobe de nível automaticamente. Cada nível representa sua participação na comunidade e aparece ao lado de seu nome sempre que fizer um comentário.

| Nível | Pontos necessários |
|-------|-------------------|
| 🟢 Leitor Iniciante | 0 a 50 XP |
| 🔵 Leitor Assíduo | 51 a 150 XP |
| 🟣 Crítico Literário | 151 a 300 XP |
| 🟡 Mestre dos Livros | Acima de 300 XP |

## Medalhas

Além dos níveis, o sistema concede medalhas por conquistas específicas:

| Medalha | Conquista |
|---------|-----------|
| 📚 Primeira Leitura | Primeira avaliação realizada |
| 💬 Primeira Palavra | Primeiro comentário publicado |
| 🌟 Estrela em Ascensão | Dez comentários aprovados |
| 📖 Leitor Dedicado | Participação em cinco leituras diferentes |

## Impacto visual

Sempre que um comentário for exibido, o nome do aluno aparecerá acompanhado do seu nível ou medalha:

> **Ana Silva** 🟣 Crítico Literário
>
> ★★★★★
>
> “Gostei muito da forma como o autor desenvolveu os personagens.”

Esse destaque reconhece a participação dos alunos e incentiva outros estudantes a interagir também.

## Objetivos

- Incentivar o hábito da leitura
- Aumentar a participação dos alunos no blog
- Estimular a troca de opiniões sobre livros e filmes
- Valorizar contribuições de qualidade
- Criar um ambiente colaborativo e motivador
- Tornar a experiência do blog mais dinâmica e envolvente

## Implementação técnica (Prisma Schema)

```prisma
model User {
  id          String      @id @default(cuid())
  nome        String
  email       String      @unique
  avatarUrl   String?
  firebaseUid String      @unique
  xp          Int         @default(0)
  nivel       String      @default("Leitor Iniciante")
  createdAt   DateTime    @default(now())

  comentarios    Comentario[]
  avaliacoes     Avaliacao[]
  curtidas       Curtida[]
  medalhas       UserMedalha[]
}

model Comentario {
  // campos existentes...
  destaque  Boolean  @default(false)
}

model Medalha {
  id        String   @id @default(cuid())
  nome      String   @unique
  icone     String
  descricao String
  users     UserMedalha[]
}

model UserMedalha {
  id         String   @id @default(cuid())
  userId     String
  medalhaId  String
  user       User     @relation(fields: [userId], references: [id])
  medalha    Medalha  @relation(fields: [medalhaId], references: [id])
  conquistaEm DateTime @default(now())

  @@unique([userId, medalhaId])
}
```