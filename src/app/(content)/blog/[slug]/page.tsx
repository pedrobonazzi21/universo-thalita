import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { ResenhaContent } from "@/components/resenha-content";
import { CommentSection } from "@/components/comment-section";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Tag, BookOpen, ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { obra: { select: { titulo: true } } },
  });
  if (!post) return { title: "Post não encontrado" };
  return {
    title: post.titulo,
    description: post.conteudo.slice(0, 160),
    openGraph: {
    title: `${post.titulo} | Universo Thalita Rebouças`,
      description: post.conteudo.slice(0, 160),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      obra: { select: { titulo: true, slug: true, tipo: true } },
      tags: { include: { tag: true } },
    },
  });

  if (!post) notFound();

  const postsRelacionados = post.tags.length > 0
    ? await prisma.post.findMany({
        where: {
          id: { not: post.id },
          tags: { some: { tagId: { in: post.tags.map((t) => t.tagId) } } },
        },
        take: 3,
        orderBy: { dataPublicacao: "desc" },
        select: { titulo: true, slug: true, dataPublicacao: true },
      })
    : [];

  return (
    <PageTransition>
      <main className="pt-24 max-w-3xl mx-auto px-6 pb-24">
        <Reveal>
          <article>
            <div className="flex items-center gap-2 text-xs text-foreground/40 mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(post.dataPublicacao).toLocaleDateString("pt-BR")}</span>
              {post.obra && (
                <>
                  <span className="text-foreground/20">•</span>
                  <BookOpen className="w-3.5 h-3.5" />
                  <Link href={`/obras/${post.obra.slug}`} className="text-coral hover:text-coral/80 transition-colors">
                    {post.obra.titulo}
                  </Link>
                </>
              )}
            </div>

            <h1 className="font-heading text-4xl text-foreground mb-6">{post.titulo}</h1>

            <div className="prose prose-sm max-w-none">
              <ResenhaContent content={post.conteudo} />
            </div>

            {post.linkAfiliado && (
              <div className="mt-6 p-4 bg-card rounded-[18px] border border-gray-light/50">
                <p className="text-sm text-foreground/60">
                  Ajude o blog comprando o livro através do nosso link!
                </p>
                <a
                  href={post.linkAfiliado}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-coral hover:text-coral/80 transition-colors mt-2 font-medium"
                >
                  Comprar na Amazon <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-6 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-foreground/40" />
                {post.tags.map((pt) => (
                  <span
                    key={pt.tag.id}
                    className="px-2.5 py-0.5 rounded-full bg-coral/10 text-coral text-xs font-medium"
                  >
                    {pt.tag.nome}
                  </span>
                ))}
              </div>
            )}

            {postsRelacionados.length > 0 && (
              <section className="mt-10 pt-8 border-t border-gray-light/50">
                <h2 className="font-heading text-lg text-foreground mb-4">Posts Relacionados</h2>
                <div className="space-y-3">
                  {postsRelacionados.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="block bg-card rounded-[14px] p-4 border border-gray-light/50 hover:border-coral/20 transition-all duration-200"
                    >
                      <h3 className="font-heading text-sm text-foreground hover:text-coral transition-colors">
                        {p.titulo}
                      </h3>
                      <p className="text-xs text-foreground/40 mt-1">
                        {new Date(p.dataPublicacao).toLocaleDateString("pt-BR")}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-10 pt-8 border-t border-gray-light/50">
              <CommentSection postId={post.id} />
            </section>
          </article>
        </Reveal>
      </main>
    </PageTransition>
  );
}
