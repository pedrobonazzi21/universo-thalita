"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-heading text-2xl text-foreground">Algo deu errado</h1>
      <p className="text-foreground/50 mt-2 max-w-sm">
        Ocorreu um erro ao carregar esta página. Tente novamente.
      </p>
      <button
        onClick={reset}
        className="mt-8 px-6 h-10 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90 transition-colors"
      >
        Tentar novamente
      </button>
    </main>
  );
}
