import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { MentalMap } from "@/components/mapa/mental-map";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mural",
  description: "Mapa mental interativo das obras de Thalita Rebouças.",
};

export default async function MapaPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let obras: any[] = [];
  try {
    obras = await prisma.obra.findMany({
      select: { id: true, titulo: true, slug: true, tipo: true, ano: true, notaEquipe: true },
      orderBy: { titulo: "asc" },
    });
  } catch {
    return (
      <PageTransition>
        <main className="pt-24 max-w-6xl mx-auto px-6 pb-24">
          <h1 className="font-heading text-4xl text-foreground mb-2">Mural</h1>
          <p className="text-foreground/50 mb-8">
            Mapa mental interativo conectando todas as obras de Thalita Rebou\u00e7as
          </p>
          <p className="text-center text-foreground/30 py-20">Carregando...</p>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="pt-24 max-w-6xl mx-auto px-6 pb-24">
        <Reveal>
          <h1 className="font-heading text-4xl text-foreground mb-2">Mural</h1>
          <p className="text-foreground/50 mb-8">
            Mapa mental interativo conectando todas as obras de Thalita Rebouças
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <MentalMap obras={obras} />
        </Reveal>
      </main>
    </PageTransition>
  );
}
