import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { CommentSection } from "@/components/comment-section";
import { notFound } from "next/navigation";

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

export default async function ObraPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const obra = await prisma.obra.findUnique({ where: { slug } });

  if (!obra) notFound();

  return (
    <PageTransition>
      <main className="pt-24 max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
          <Reveal>
            <div className="aspect-[3/4] bg-gradient-to-br from-coral/10 to-yellow/10 rounded-[18px] flex items-center justify-center">
              <span className="font-heading text-foreground/20">Capa</span>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div>
                <h1 className="font-heading text-4xl text-foreground">{obra.titulo}</h1>
                <p className="text-foreground/40 mt-1">
                  {obra.ano} • {obra.tipo}
                </p>
                {obra.notaEquipe && (
                  <div className="mt-2">
                    <StarRating rating={obra.notaEquipe} />
                  </div>
                )}
                {obra.sinopse && (
                  <p className="mt-4 text-foreground/60 leading-relaxed">
                    {obra.sinopse}
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <section>
                <h2 className="font-heading text-lg text-foreground mb-3">
                  Nossa Resenha
                </h2>
                <div className="bg-card rounded-[18px] p-6 border border-gray-light/50">
                  {obra.nossaResenha ? (
                    <p className="text-foreground/70 leading-relaxed font-serif">
                      {obra.nossaResenha}
                    </p>
                  ) : (
                    <p className="text-foreground/40 italic">
                      Resenha em breve...
                    </p>
                  )}
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.3}>
              <CommentSection obraId={obra.id} />
            </Reveal>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
