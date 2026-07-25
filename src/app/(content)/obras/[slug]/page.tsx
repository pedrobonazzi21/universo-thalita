import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { CommentSection } from "@/components/comment-section";
import { ResenhaContent } from "@/components/resenha-content";
import { notFound } from "next/navigation";
import { getMediaAvaliacoes } from "@/actions/avaliacoes";
import Link from "next/link";
import { BookOpen, Film } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const obra = await prisma.obra.findUnique({
      where: { slug },
      include: { capas: { orderBy: { ordem: "asc" }, take: 1 } },
    });
    if (!obra) return { title: "Obra n\u00e3o encontrada" };
    return {
      title: obra.titulo,
      description: obra.sinopse ?? `${obra.tipo} de Thalita Rebou\u00e7as (${obra.ano}).`,
      openGraph: {
        title: `${obra.titulo} | Universo Thalita Rebou\u00e7as`,
        description: obra.sinopse ?? undefined,
        images: obra.capas[0] ? [obra.capas[0].url] : undefined,
      },
    };
  } catch {
    return { title: "Obra" };
  }
}

function StarRating({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
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

export default async function ObraPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let obra: any = null;
  try {
    obra = await prisma.obra.findUnique({
      where: { slug },
      include: {
        capas: { orderBy: { ordem: "asc" } },
        relacoesDe: { include: { obraPara: { select: { titulo: true, slug: true, tipo: true } } } },
        relacoesPara: { include: { obraDe: { select: { titulo: true, slug: true, tipo: true } } } },
      },
    });
  } catch {
    notFound();
  }

  if (!obra) notFound();

  let mediaComunidade = { media: 0, total: 0 };
  try {
    mediaComunidade = await getMediaAvaliacoes(obra.id);
  } catch {}

  const adaptacao = obra.relacoesDe.find((r: { tipo: string }) => r.tipo === "adaptacao")?.obraPara
    ?? obra.relacoesPara.find((r: { tipo: string }) => r.tipo === "adaptacao")?.obraDe;

  return (
    <PageTransition>
      <main className="pt-24 max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
          <div className="md:sticky md:top-24 self-start">
            <Reveal>
              {obra.capas.length > 0 ? (
                <div className="space-y-3">
                  <div className="aspect-[3/4] rounded-[18px] overflow-hidden border border-gray-light/30 bg-card">
                    <img
                      src={obra.capas[0].url}
                      alt={obra.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {obra.capas.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {obra.capas.map((capa: { id: string; url: string }, i: number) => (
                        <div key={capa.id} className="shrink-0 w-16 h-22 rounded-lg overflow-hidden border border-gray-light/30 opacity-70 hover:opacity-100 transition-opacity">
                          <img
                            src={capa.url}
                            alt={`${obra.titulo} - Capa ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[3/4] bg-gradient-to-br from-coral/10 to-yellow/10 rounded-[18px] flex items-center justify-center border border-gray-light/30">
                  {obra.tipo === "Filme" ? (
                    <Film className="w-12 h-12 text-foreground/20" />
                  ) : (
                    <BookOpen className="w-12 h-12 text-foreground/20" />
                  )}
                </div>
              )}
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div>
                <div className="flex items-center gap-2 text-xs text-foreground/40 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-coral/10 text-coral font-medium">{obra.tipo}</span>
                </div>
                <h1 className="font-heading text-4xl text-foreground">{obra.titulo}</h1>

                <div className="mt-3 space-y-1 text-sm text-foreground/50">
                  {obra.editora && <p>Editora: <span className="text-foreground/70">{obra.editora}</span></p>}
                  <p>Ano de publicação: <span className="text-foreground/70">{obra.ano}</span></p>
                  {obra.genero && <p>Gênero: <span className="text-foreground/70">{obra.genero}</span></p>}
                </div>

                <div className="mt-4 flex items-center gap-6">
                  {mediaComunidade.total > 0 && (
                    <div>
                      <span className="text-xs text-foreground/40 block mb-1">Comunidade</span>
                      <div className="flex items-center gap-2">
                        <StarRating rating={mediaComunidade.media} />
                        <span className="text-sm text-foreground/60">
                          {mediaComunidade.media.toFixed(1)}
                        </span>
                        <span className="text-xs text-foreground/30">
                          ({mediaComunidade.total} {mediaComunidade.total === 1 ? "avaliação" : "avaliações"})
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {obra.sinopse && (
                  <p className="mt-6 text-foreground/60 leading-relaxed">{obra.sinopse}</p>
                )}
              </div>
            </Reveal>

            {adaptacao && (
              <Reveal delay={0.15}>
                <section className="bg-gradient-to-br from-coral/5 to-yellow/5 rounded-[18px] p-6 border border-coral/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Film className="w-4 h-4 text-coral" />
                    <h2 className="font-heading text-lg text-foreground">Adaptação</h2>
                  </div>
                  <p className="text-sm text-foreground/60 mb-3">
                    {obra.tipo === "Livro"
                      ? "Este livro foi adaptado para o cinema:"
                      : "Este filme é baseado no livro:"}
                  </p>
                  <Link
                    href={`/obras/${adaptacao.slug}`}
                    className="inline-flex items-center gap-2 text-coral hover:text-coral/80 transition-colors font-medium"
                  >
                    {adaptacao.titulo}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 3l4 4-4 4" />
                    </svg>
                  </Link>
                </section>
              </Reveal>
            )}

            <Reveal delay={0.35}>
              <CommentSection obraId={obra.id} />
            </Reveal>

            {obra.depoimentos && (
              <Reveal delay={0.4}>
                <section className="bg-card rounded-[18px] p-6 border border-coral/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-yellow flex items-center justify-center text-white text-sm font-heading">
                      NT
                    </div>
                    <div>
                      <h2 className="font-heading text-lg text-foreground">Nota pessoal</h2>
                      {obra.dataResenha && (
                        <p className="text-xs text-foreground/40 mt-0.5">
                          {new Date(obra.dataResenha).toLocaleDateString("pt-BR")}
                        </p>
                      )}
                      {obra.notaEquipe && (
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={obra.notaEquipe} />
                          <span className="text-sm text-foreground/60">{obra.notaEquipe.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ResenhaContent content={obra.depoimentos} />
                </section>
              </Reveal>
            )}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
