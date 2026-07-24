"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Film, Loader2 } from "lucide-react";

type ObraResult = {
  id: string;
  titulo: string;
  slug: string;
  tipo: string;
  ano: number;
  notaEquipe: number | null;
};

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ObraResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try {
      const { buscarObras } = await import("@/actions/busca");
      const data = await buscarObras(q);
      setResults(data as unknown as ObraResult[]);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => doSearch(query), 250);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [query, doSearch]);

  function handleSelect() {
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg mx-4 bg-card rounded-[18px] border border-gray-light/50 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-light/30">
          <Search className="w-4 h-4 text-foreground/30 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar livros, filmes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/30 focus:outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-coral animate-spin shrink-0" />}
          <button onClick={onClose} className="shrink-0">
            <X className="w-4 h-4 text-foreground/30 hover:text-foreground/60 transition-colors" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[300px] overflow-y-auto p-2">
            {results.map((obra) => (
              <Link
                key={obra.id}
                href={`/obras/${obra.slug}`}
                onClick={handleSelect}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-light/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-coral/10 to-yellow/10 flex items-center justify-center shrink-0">
                  {obra.tipo === "Filme" ? (
                    <Film className="w-4 h-4 text-foreground/30" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-foreground/30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-coral transition-colors">
                    {obra.titulo}
                  </p>
                  <p className="text-xs text-foreground/40">
                    {obra.tipo} • {obra.ano}
                  </p>
                </div>
                {obra.notaEquipe && (
                  <span className="text-xs text-foreground/30 shrink-0">
                    ★ {obra.notaEquipe.toFixed(1)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}

        {query && !loading && results.length === 0 && (
          <p className="text-center text-sm text-foreground/30 py-8">
            Nenhum resultado para &ldquo;{query}&rdquo;
          </p>
        )}

        {!query && (
          <p className="text-center text-xs text-foreground/20 py-6">
            Digite para buscar obras de Thalita Rebouças
          </p>
        )}
      </div>
    </div>
  );
}
