import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { PageTransition } from "@/components/page-transition";
import Link from "next/link";
import { BookOpen, Film } from "lucide-react";

export const dynamic = "force-dynamic";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < Math.floor(rating) ? "#FF6F61" : "none"}
          stroke="#FF6F61"
          strokeWidth="1.5"
        >
          <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.5 3.4 12l.7-4L1 5.2l4-.6L7 1z" />
        </svg>
      ))}
    </div>
  );
}

export default async function Home() {
  let obras = await prisma.obra.findMany({ take: 6 });

  return (
    <PageTransition>
      <Hero />

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <Reveal>
          <section className="mt-24 max-w-3xl mx-auto text-center">
            <p className="text-foreground/70 leading-relaxed text-lg">
              Oii pessoal, tudo bem? Criamos esse blog a fim de homenagear uma das maiores
              jornalistas, escritoras, roteiristas, repórteres e atrizes do nosso Brasil:{" "}
              <strong className="text-foreground">Thalita Rebouças</strong>.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 max-w-3xl mx-auto space-y-8">
            <div className="bg-card rounded-[18px] p-6 border border-gray-light/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral/20 to-yellow/20 flex items-center justify-center text-sm font-heading text-foreground/50">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Ana Borbalan</p>
                  <p className="text-xs text-foreground/40">autora e desenvolvedora do blog</p>
                </div>
              </div>
              <p className="text-foreground/60 leading-relaxed text-sm">
                &ldquo;Eu adoro os livros dela. O jeito que ela escreve, os filmes... chegam a serem
                aconchegantes de tanto carinho e nostalgia que tenho. Ela aborda os assuntos de um
                jeito natural, que dá você se sente dentro das obras, ou até mesmo dos personagens.
                Jornalista, os livros Fala Sério!, Confissões, Tudo por um popstar, Pai em dobro...
                falei tantos sucessos dela (Thalita)... e olha que nem terminei.&rdquo;
              </p>
            </div>

            <div className="bg-card rounded-[18px] p-6 border border-gray-light/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-deep/20 to-coral/20 flex items-center justify-center text-sm font-heading text-foreground/50">
                  P
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Pedro Bonazzi</p>
                  <p className="text-xs text-foreground/40">autor e desenvolvedor do blog</p>
                </div>
              </div>
              <p className="text-foreground/60 leading-relaxed text-sm">
                &ldquo;Thalita tem uma capacidade única de transformar situações cotidianas em
                histórias inesquecíveis. Cada livro dela é como um abraço apertado — a gente se
                identifica, ri, se emociona e, no final, fica com aquela sensação boa de ter
                vivido algo especial. Poder criar esse espaço pra compartilhar esse universo com
                vocês é uma realização.&rdquo;
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-foreground/50 text-sm max-w-xl mx-auto leading-relaxed">
            Contamos com vocês para interagirem bastante na aba Comunidade e propagar nosso blog.
            Um abraço dos autores, e bom entretenimento na nossa página :)
          </p>
        </Reveal>

        <Reveal>
          <section className="mt-24">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
                  Obras em Destaque
                </h2>
                <p className="mt-2 text-foreground/50 text-sm">
                  Explore a coleção completa de livros e filmes
                </p>
              </div>
              <Link
                href="/obras"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-coral hover:text-coral/80 transition-colors"
              >
                Ver todas
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
              {obras.map((work, i) => (
                <Reveal key={work.slug} delay={i * 0.08}>
                  <Link
                    href={`/obras/${work.slug}`}
                    className="group relative bg-card rounded-[18px] overflow-hidden border border-gray-light/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-coral/5 block"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-coral/10 to-yellow/10 flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="w-full h-full rounded-lg bg-white/40 backdrop-blur-sm flex items-center justify-center">
                        {work.tipo === "Filme" ? (
                          <Film className="w-8 h-8 text-foreground/20" />
                        ) : (
                          <BookOpen className="w-8 h-8 text-foreground/20" />
                        )}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground/40 uppercase tracking-wider">
                          {work.tipo}
                        </span>
                        <span className="text-xs text-foreground/40">{work.ano}</span>
                      </div>
                      <h3 className="font-heading text-sm leading-tight text-foreground">
                        {work.titulo}
                      </h3>
                      {work.notaEquipe && <StarRating rating={work.notaEquipe} />}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>
      </main>
    </PageTransition>
  );
}
