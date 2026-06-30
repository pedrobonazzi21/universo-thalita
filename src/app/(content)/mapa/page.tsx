import { prisma } from "@/lib/prisma";
import { MentalMap } from "@/components/mapa/mental-map";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";

export default async function MapaPage() {
  const obras = await prisma.obra.findMany({
    select: {
      id: true,
      titulo: true,
      slug: true,
      tipo: true,
      ano: true,
      notaEquipe: true,
    },
  });

  return (
    <PageTransition>
      <main className="pt-24 max-w-7xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-4xl text-foreground">
                Universo Thalita
              </h1>
              <p className="text-foreground/50 mt-1">
                Explore as conexões entre obras, personagens e temas
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <MentalMap obras={obras} />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-foreground/50">
            <span className="font-medium text-foreground/70">Legenda:</span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-0.5" style={{ background: "#8B5CF6" }} />
              Adaptação
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-0.5" style={{ background: "#10B981" }} />
              Personagem
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-0.5" style={{ background: "#3B82F6" }} />
              Coleção
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-0.5" style={{ background: "#F59E0B" }} />
              Tema
            </span>
          </div>
        </Reveal>
      </main>
    </PageTransition>
  );
}
