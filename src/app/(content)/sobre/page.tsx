import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";

export default function SobrePage() {
  return (
    <PageTransition>
      <main className="pt-24 max-w-3xl mx-auto px-6 pb-24">
        <Reveal>
          <h1 className="font-heading text-4xl text-foreground mb-6">Sobre</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6 text-foreground/70 leading-relaxed">
            <p>
              Thalita Rebouças é uma das autoras brasileiras mais queridas da literatura
              juvenil. Com uma escrita divertida, espontânea e emocionante, ela conquistou
              milhões de leitores ao redor do Brasil.
            </p>
            <p>
              Seus livros ganharam adaptações para o cinema e continuam inspirando novas
              gerações de leitores. Este site é uma homenagem ao seu universo, reunindo
              suas obras, resenhas e a comunidade de fãs.
            </p>
          </div>
        </Reveal>
      </main>
    </PageTransition>
  );
}
