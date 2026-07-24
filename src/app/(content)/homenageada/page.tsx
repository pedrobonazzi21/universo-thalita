import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";
import { BookOpen, Film, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Homenageada",
  description: "Thalita Rebouças — a autora que inspira milhões de leitores.",
  openGraph: {
    title: "Homenageada | Universo Thalita Rebouças",
    description: "Conheça a trajetória de Thalita Rebouças.",
  },
};

export default function HomenageadaPage() {
  return (
    <PageTransition>
      <main className="pt-24 max-w-3xl mx-auto px-6 pb-24">
        <Reveal>
          <h1 className="font-heading text-4xl text-foreground mb-6">Thalita Rebouças</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-10">
            <div className="w-40 h-40 rounded-[18px] bg-gradient-to-br from-coral/20 to-yellow/20 flex items-center justify-center text-5xl font-heading text-coral/40 shrink-0">
              TR
            </div>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Thalita Rebouças é uma das autoras brasileiras mais queridas da literatura juvenil.
                Com uma escrita divertida, espontânea e emocionante, ela conquistou milhões de leitores
                ao redor do Brasil.
              </p>
              <p>
                Nascida no Rio de Janeiro, Thalita começou sua carreira como jornalista antes de se
                dedicar integralmente à literatura. Seu primeiro livro, <em>Fala sério, mãe!</em>, foi
                um sucesso imediato e deu origem à série que a consagrou.
              </p>
              <p>
                Suas obras abordam temas do universo juvenil com humor, sensibilidade e autenticidade,
                criando personagens com os quais os leitores se identificam profundamente.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <section className="bg-card rounded-[18px] p-6 border border-gray-light/50 mb-8">
            <h2 className="font-heading text-lg text-foreground mb-4">Carreira</h2>
            <div className="space-y-4 text-sm text-foreground/60 leading-relaxed">
              <div className="flex gap-3">
                <BookOpen className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                <p><strong className="text-foreground">2004</strong> — Publica seu primeiro livro, <em>Fala sério, mãe!</em>, marcando o início de sua trajetória na literatura juvenil.</p>
              </div>
              <div className="flex gap-3">
                <BookOpen className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                <p><strong className="text-foreground">2005–2010</strong> — Expande a série "Fala sério" com títulos como <em>Fala sério, amor!</em>, <em>Fala sério, professor!</em> e <em>Fala sério, irmão!</em>.</p>
              </div>
              <div className="flex gap-3">
                <Film className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                <p><strong className="text-foreground">2018</strong> — <em>Tudo por um Popstar</em> ganha adaptação cinematográfica, levando sua obra para as telonas.</p>
              </div>
              <div className="flex gap-3">
                <Award className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                <p><strong className="text-foreground">Atualmente</strong> — Com dezenas de livros publicados e milhões de exemplares vendidos, Thalita continua escrevendo e inspirando novas gerações de leitores.</p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section className="bg-gradient-to-br from-coral/5 to-yellow/5 rounded-[18px] p-6 border border-coral/10">
            <h2 className="font-heading text-lg text-foreground mb-3">Legado</h2>
            <p className="text-foreground/70 leading-relaxed">
              Thalita Rebouças é mais do que uma autora de best-sellers. Ela é uma porta de entrada
              para o hábito da leitura, especialmente entre jovens. Seu estilo acessível, bem-humorado
              e emocionante cria uma conexão genuína com os leitores, tornando a leitura uma experiência
              prazerosa e transformadora. Este site é uma homenagem ao seu universo e ao impacto que
              sua obra tem na vida de tantas pessoas.
            </p>
          </section>
        </Reveal>
      </main>
    </PageTransition>
  );
}
