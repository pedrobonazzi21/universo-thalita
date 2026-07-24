export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-coral/30 border-t-coral animate-spin" />
        <span className="text-sm text-foreground/40">Carregando...</span>
      </div>
    </div>
  );
}
