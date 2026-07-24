import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Painel",
  description: "Comentários da comunidade sobre as obras de Thalita Rebouças.",
  openGraph: {
    title: "Painel | Universo Thalita Rebouças",
    description: "Comentários da comunidade sobre as obras de Thalita Rebouças.",
  },
};

export default async function MuralPage() {
  const comentariosRecentes = await prisma.comentario.findMany({
    where: { parentId: null },
    include: {
      usuario: { select: { nome: true } },
      obra: { select: { titulo: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <PageTransition>
      <main className="pt-24 max-w-7xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-6 h-6 text-coral" />
            <div>
              <h1 className="font-heading text-4xl text-foreground">Painel de Comentários</h1>
              <p className="text-foreground/50 mt-1">
                Comentários da comunidade
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {comentariosRecentes.length === 0 ? (
            <p className="text-center text-sm text-foreground/30 py-12 bg-card rounded-[18px] border border-gray-light/50">
              Nenhum comentário ainda. Seja o primeiro!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comentariosRecentes.map((c) => (
                <Link
                  key={c.id}
                  href={`/obras/${c.obra?.slug}`}
                  className="bg-card rounded-[18px] p-5 border border-gray-light/50 hover:border-coral/20 transition-all duration-200 hover:-translate-y-0.5 block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-coral/30 to-yellow/30 flex items-center justify-center text-[10px] font-heading text-foreground/50">
                      {c.usuario.nome.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{c.usuario.nome}</p>
                      <p className="text-[10px] text-foreground/30 truncate">{c.obra?.titulo}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/60 line-clamp-3">{c.texto}</p>
                  {c.nota && (
                    <div className="flex items-center gap-0.5 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="10" height="10" viewBox="0 0 14 14" fill={i < c.nota! ? "#FF6F61" : "none"} stroke="#FF6F61" strokeWidth="1.5">
                          <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.5 3.4 12l.7-4L1 5.2l4-.6L7 1z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </Reveal>
      </main>
    </PageTransition>
  );
}
