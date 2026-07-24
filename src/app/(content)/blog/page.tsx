import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { ResenhaContent } from "@/components/resenha-content";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Resenhas e conteúdos escritos sobre as obras de Thalita Rebouças.",
  openGraph: {
    title: "Blog | Universo Thalita Rebouças",
    description: "Resenhas e conteúdos escritos sobre as obras de Thalita Rebouças.",
  },
};

export default async function BlogPage() {
  const obras = await prisma.obra.findMany({
    where: { nossaResenha: { not: null } },
    orderBy: { dataResenha: "desc" },
  });

  return (
    <PageTransition>
      <main className="pt-24 max-w-3xl mx-auto px-6 pb-24">
        <Reveal>
          <h1 className="font-heading text-4xl text-foreground mb-2">Blog</h1>
          <p className="text-foreground/50 mb-10">Resenhas e conteúdos escritos pela equipe</p>
        </Reveal>

        {obras.length === 0 ? (
          <Reveal delay={0.1}>
            <p className="text-center text-sm text-foreground/30 py-12 bg-card rounded-[18px] border border-gray-light/50">
              Nenhuma resenha publicada ainda. Em breve!
            </p>
          </Reveal>
        ) : (
          <div className="space-y-8">
            {obras.map((obra, i) => (
              <Reveal key={obra.id} delay={0.05 * i}>
                <article className="bg-card rounded-[18px] border border-gray-light/50 p-6 hover:border-coral/20 transition-all duration-200">
                  <div className="flex items-center gap-2 text-xs text-foreground/40 mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="px-2 py-0.5 rounded-full bg-coral/10 text-coral font-medium">{obra.tipo}</span>
                    {obra.dataResenha && (
                      <>
                        <Calendar className="w-3.5 h-3.5 ml-2" />
                        <span>{new Date(obra.dataResenha).toLocaleDateString("pt-BR")}</span>
                      </>
                    )}
                  </div>

                  <Link href={`/obras/${obra.slug}`}>
                    <h2 className="font-heading text-xl text-foreground hover:text-coral transition-colors mb-2">
                      {obra.titulo}
                    </h2>
                  </Link>

                  {obra.notaEquipe && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill={j < Math.floor(obra.notaEquipe!) ? "#FF6F61" : "none"} stroke="#FF6F61" strokeWidth="1.5">
                            <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.5 3.4 12l.7-4L1 5.2l4-.6L7 1z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-foreground/50">{obra.notaEquipe.toFixed(1)}</span>
                    </div>
                  )}

                  <div className="line-clamp-6">
                    <ResenhaContent content={obra.nossaResenha!} />
                  </div>

                  <Link
                    href={`/obras/${obra.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-coral hover:text-coral/80 transition-colors mt-4 font-medium"
                  >
                    Ler resenha completa
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 3l4 4-4 4" />
                    </svg>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </main>
    </PageTransition>
  );
}
