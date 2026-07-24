import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nós",
  description: "Conheça a equipe por trás do Universo Thalita Rebouças e as fontes utilizadas.",
  openGraph: {
    title: "Sobre nós | Universo Thalita Rebouças",
    description: "Equipe e créditos do projeto.",
  },
};

export default function SobrePage() {
  return (
    <PageTransition>
      <main className="pt-24 max-w-3xl mx-auto px-6 pb-24">
        <Reveal>
          <h1 className="font-heading text-4xl text-foreground mb-6">Sobre nós</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6 text-foreground/70 leading-relaxed">
            <p>
              O <strong>Universo Thalita Rebouças</strong> é um projeto educacional desenvolvido
              por alunos do SESI CE-437, como forma de homenagear a obra de Thalita Rebouças —
              uma das autoras brasileiras mais queridas da literatura juvenil.
            </p>
            <p>
              O site reúne o acervo completo de livros e filmes de Thalita, com resenhas,
              curiosidades, personagens e linhas do tempo, além de um espaço para a comunidade
              compartilhar suas opiniões.
            </p>
            <p>
              Este projeto foi desenvolvido com Next.js, Prisma e Tailwind CSS, e está disponível
              como código aberto.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 p-6 bg-card rounded-[18px] border border-gray-light/50">
            <h2 className="font-heading text-lg text-foreground mb-3">Equipe</h2>
            <p className="text-xs text-foreground/40 mb-4">SESI CE-437</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral/20 to-yellow/20 flex items-center justify-center text-sm font-heading text-foreground/50">A</div>
                <div>
                  <p className="text-sm font-medium text-foreground">Ana Luiza Magalhães Borbalan</p>
                  <p className="text-xs text-foreground/40">Design criativo & criação de conteúdo (blogger)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-deep/20 to-coral/20 flex items-center justify-center text-sm font-heading text-foreground/50">P</div>
                <div>
                  <p className="text-sm font-medium text-foreground">Pedro dos Santos Bonazzi Pereira</p>
                  <p className="text-xs text-foreground/40">Desenvolvedor Web & auxiliar de criação de conteúdo (blogger)</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 p-6 bg-card rounded-[18px] border border-gray-light/50">
            <h2 className="font-heading text-lg text-foreground mb-3">Fontes</h2>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="https://www.thalitareboucas.com.br/" target="_blank" rel="noopener noreferrer" className="text-coral hover:text-coral/80 transition-colors">
                  Site oficial de Thalita Rebouças
                </a>
              </li>
              <li>
                <a href="https://www.intrinseca.com.br/" target="_blank" rel="noopener noreferrer" className="text-coral hover:text-coral/80 transition-colors">
                  Editora Intrínseca
                </a>
              </li>
              <li>
                <a href="https://www.record.com.br/" target="_blank" rel="noopener noreferrer" className="text-coral hover:text-coral/80 transition-colors">
                  Editora Record
                </a>
              </li>
              <li>
                Dados bibliográficos coletados dos próprios livros e fontes oficiais.
              </li>
            </ul>
          </div>
        </Reveal>
      </main>
    </PageTransition>
  );
}
