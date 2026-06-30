import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { PageTransition } from "@/components/page-transition";

const featuredWorks = [
  {
    title: "Fala Sério, Mãe!",
    year: 2004,
    type: "Livro" as const,
    rating: 4.5,
    gradient: "from-coral/20 to-yellow/20",
  },
  {
    title: "Tudo por um Popstar",
    year: 2006,
    type: "Livro" as const,
    rating: 4.5,
    gradient: "from-yellow/20 to-blue-deep/20",
  },
  {
    title: "Fala Sério, Amor",
    year: 2008,
    type: "Livro" as const,
    rating: 4,
    gradient: "from-blue-deep/20 to-coral/20",
  },
  {
    title: "Tudo por um Popstar (Filme)",
    year: 2018,
    type: "Filme" as const,
    rating: 4,
    gradient: "from-coral/20 to-blue-deep/20",
  },
  {
    title: "Ela Disse, Ele Disse",
    year: 2010,
    type: "Livro" as const,
    rating: 4.5,
    gradient: "from-yellow/20 to-coral/20",
  },
  {
    title: "Fala Sério, Professor!",
    year: 2005,
    type: "Livro" as const,
    rating: 4,
    gradient: "from-blue-deep/20 to-yellow/20",
  },
];

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

function WorkCard({
  title,
  year,
  type,
  rating,
  gradient,
}: {
  title: string;
  year: number;
  type: "Livro" | "Filme";
  rating: number;
  gradient: string;
}) {
  return (
    <div className="group relative bg-card rounded-[18px] overflow-hidden border border-gray-light/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-coral/5">
      <div
        className={`aspect-[3/4] bg-gradient-to-br ${gradient} flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-[1.02]`}
      >
        <div className="w-full h-full rounded-lg bg-white/40 backdrop-blur-sm flex items-center justify-center">
          <span className="font-heading text-xs text-foreground/40 text-center px-2 leading-relaxed">
            {title}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground/40 uppercase tracking-wider">
            {type}
          </span>
          <span className="text-xs text-foreground/40">{year}</span>
        </div>

        <h3 className="font-heading text-sm leading-tight text-foreground">
          {title}
        </h3>

        <StarRating rating={rating} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <Reveal>
          <section className="mt-24">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
                  Obras em Destaque
                </h2>
                <p className="mt-2 text-foreground/50 text-sm">
                  Explore a coleção completa de livros e filmes
                </p>
              </div>
              <a
                href="/obras"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-coral hover:text-coral/80 transition-colors"
              >
                Ver todas
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
              {featuredWorks.map((work, i) => (
                <Reveal key={work.title} delay={i * 0.08}>
                  <WorkCard {...work} />
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>
      </main>
    </PageTransition>
  );
}
