import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { BookOpen, Film } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obras",
  description: "Todos os livros e filmes de Thalita Rebouças.",
  openGraph: {
    title: "Obras | Universo Thalita Rebouças",
    description: "Todos os livros e filmes de Thalita Rebouças.",
  },
};

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

export default async function ObrasPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { tipo } = await searchParams;
  const filtro = tipo?.toLowerCase() === "livro" ? "Livro" : tipo?.toLowerCase() === "filme" ? "Filme" : null;

  let obras = await prisma.obra.findMany();

  if (filtro) {
    obras = obras.filter((o) => o.tipo === filtro);
  }

  return (
    <PageTransition>
      <main className="pt-24 max-w-7xl mx-auto px-6 pb-24">
        <Reveal>
          <h1 className="font-heading text-4xl text-foreground mb-2">Obras</h1>
          <p className="text-foreground/50 mb-10">Todos os livros e filmes de Thalita Rebouças</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex gap-2 mb-10">
            {[
              { label: "Todos", href: "/obras" },
              { label: "Livros", href: "/obras?tipo=livro" },
              { label: "Filmes", href: "/obras?tipo=filme" },
            ].map((filter) => (
              <Link
                key={filter.label}
                href={filter.href}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                  (filter.label === "Todos" && !filtro) || 
                  (filter.label === "Livros" && filtro === "Livro") ||
                  (filter.label === "Filmes" && filtro === "Filme")
                    ? "bg-coral text-white border-coral"
                    : "bg-card border-gray-light/50 hover:border-coral/30 text-foreground/60"
                }`}
              >
                {filter.label}
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {obras.map((obra, i) => (
            <Reveal key={obra.slug} delay={0.1 + i * 0.06}>
              <Link
                href={`/obras/${obra.slug}`}
                className="group bg-card rounded-[18px] overflow-hidden border border-gray-light/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg block"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-coral/10 to-yellow/10 flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="w-full h-full rounded-lg bg-white/60 flex items-center justify-center">
                    {obra.tipo === "Filme" ? (
                      <Film className="w-8 h-8 text-foreground/20" />
                    ) : (
                      <BookOpen className="w-8 h-8 text-foreground/20" />
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground/40 uppercase tracking-wider">{obra.tipo}</span>
                    <span className="text-xs text-foreground/40">{obra.ano}</span>
                  </div>
                  <h2 className="font-heading text-sm text-foreground">{obra.titulo}</h2>
                  {obra.notaEquipe && <StarRating rating={obra.notaEquipe} />}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {obras.length === 0 && (
          <p className="text-center text-foreground/30 py-12">Nenhuma obra encontrada.</p>
        )}
      </main>
    </PageTransition>
  );
}
