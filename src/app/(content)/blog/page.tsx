import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Resenhas e conteúdos escritos sobre as obras de Thalita Rebouças.",
  openGraph: {
    title: "Blog | Universo Thalita Rebouças",
    description: "Resenhas e conteúdos escritos sobre as obras de Thalita Rebouças.",
  },
};

export default async function BlogPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: { dataPublicacao: "desc" },
      include: { tags: { include: { tag: true } } },
    });
  } catch {
    return (
      <PageTransition>
        <main className="pt-24 max-w-3xl mx-auto px-6 pb-24">
          <h1 className="font-heading text-4xl text-foreground mb-2">Blog</h1>
          <p className="text-foreground/50 mb-10">Resenhas e conte\u00fados escritos pela equipe</p>
          <p className="text-center text-sm text-foreground/30 py-12 bg-card rounded-[18px] border border-gray-light/50">
            Carregando...
          </p>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="pt-24 max-w-3xl mx-auto px-6 pb-24">
        <Reveal>
          <h1 className="font-heading text-4xl text-foreground mb-2">Blog</h1>
          <p className="text-foreground/50 mb-10">Resenhas e conteúdos escritos pela equipe</p>
        </Reveal>

        {posts.length === 0 ? (
          <Reveal delay={0.1}>
            <p className="text-center text-sm text-foreground/30 py-12 bg-card rounded-[18px] border border-gray-light/50">
              Nenhuma resenha publicada ainda. Em breve!
            </p>
          </Reveal>
        ) : (
          <div className="space-y-8">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={0.05 * i}>
                <Link href={`/blog/${post.slug}`} className="block">
                  <article className="bg-card rounded-[18px] border border-gray-light/50 p-6 hover:border-coral/20 transition-all duration-200 group">
                    <div className="flex items-center gap-2 text-xs text-foreground/40 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.dataPublicacao).toLocaleDateString("pt-BR")}</span>
                      {post.tags.length > 0 && (
                        <>
                          <span className="text-foreground/20">•</span>
                          {post.tags.map((pt: { tag: { id: string; nome: string } }) => (
                            <span key={pt.tag.id} className="px-2 py-0.5 rounded-full bg-coral/10 text-coral font-medium">
                              {pt.tag.nome}
                            </span>
                          ))}
                        </>
                      )}
                    </div>

                    <h2 className="font-heading text-xl text-foreground group-hover:text-coral transition-colors mb-2">
                      {post.titulo}
                    </h2>

                    <p className="text-sm text-foreground/50 leading-relaxed line-clamp-3">
                      {post.conteudo.slice(0, 200)}...
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-sm text-coral mt-4 font-medium">
                      Ler resenha
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 3l4 4-4 4" />
                      </svg>
                    </span>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </main>
    </PageTransition>
  );
}
