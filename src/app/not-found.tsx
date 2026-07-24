import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <span className="text-8xl font-heading text-coral/30">404</span>
      <h1 className="font-heading text-2xl text-foreground mt-4">Página não encontrada</h1>
      <p className="text-foreground/50 mt-2 max-w-sm">
        A obra ou página que você procura não existe ou foi removida.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 h-10 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90 transition-colors inline-flex items-center"
      >
        Voltar ao início
      </Link>
    </main>
  );
}
