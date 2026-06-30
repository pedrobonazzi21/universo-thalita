import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";

const obras = [
  { slug: "fala-serio-mae", title: "Fala Sério, Mãe!", year: 2004, type: "Livro", rating: 4.5 },
  { slug: "tudo-por-um-popstar", title: "Tudo por um Popstar", year: 2006, type: "Livro", rating: 4.5 },
  { slug: "fala-serio-amor", title: "Fala Sério, Amor", year: 2008, type: "Livro", rating: 4 },
  { slug: "ela-disse-ele-disse", title: "Ela Disse, Ele Disse", year: 2010, type: "Livro", rating: 4.5 },
  { slug: "fala-serio-professor", title: "Fala Sério, Professor!", year: 2005, type: "Livro", rating: 4 },
];

export default function ObrasPage() {
  return (
    <PageTransition>
      <main className="pt-24 max-w-7xl mx-auto px-6 pb-24">
        <Reveal>
          <h1 className="font-heading text-4xl text-foreground mb-2">Obras</h1>
          <p className="text-foreground/50 mb-10">Todos os livros e filmes de Thalita Rebouças</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex gap-2 mb-10">
            {["Todos", "Livros", "Filmes"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-gray-light hover:border-coral/30 transition-colors duration-200"
              >
                {filter}
              </button>
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
                    <span className="font-heading text-xs text-foreground/40 text-center px-2">
                      {obra.title}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground/40 uppercase tracking-wider">{obra.type}</span>
                    <span className="text-xs text-foreground/40">{obra.year}</span>
                  </div>
                  <h2 className="font-heading text-sm text-foreground">{obra.title}</h2>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
