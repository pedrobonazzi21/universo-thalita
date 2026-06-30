"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthModal } from "./auth-modal";
import type { User } from "@supabase/supabase-js";
import { MessageSquare } from "lucide-react";

function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className="transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill={i < value ? "#FF6F61" : "none"}
            stroke="#FF6F61"
            strokeWidth="1.5"
          >
            <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.5 3.4 12l.7-4L1 5.2l4-.6L7 1z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export function CommentSection({ obraId }: { obraId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<
    { id: string; texto: string; nota: number | null; usuario: { nome: string } }[]
  >([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      setShowAuth(true);
      return;
    }
  }

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-4 h-4 text-foreground/40" />
        <h2 className="font-heading text-lg text-foreground">Comunidade</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-[18px] p-5 border border-gray-light/50 mb-6">
        {user ? (
          <div className="space-y-3">
            <p className="text-sm text-foreground/60">
              Comentando como <strong className="text-foreground">{user.email}</strong>
            </p>
            <StarRatingInput value={rating} onChange={setRating} />
            <textarea
              placeholder="Escreva sua resenha..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-foreground/30 focus:outline-none border-b border-gray-light/50 pb-2"
            />
            <button
              type="submit"
              className="px-5 h-9 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90 transition-colors"
            >
              Publicar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAuth(true)}
            className="w-full flex items-center justify-center gap-2 py-4 text-sm text-foreground/40 hover:text-foreground/60 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 1a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM2 15v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
            </svg>
            Faça login para comentar
          </button>
        )}
      </form>

      <div className="space-y-4">
        {["João", "Maria", "Pedro"].map((nome) => (
          <div
            key={nome}
            className="bg-card rounded-[18px] p-4 border border-gray-light/50 transition-all duration-200 hover:border-coral/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral/30 to-yellow/30" />
              <div>
                <p className="text-sm font-medium text-foreground">{nome}</p>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      fill={i < 4 ? "#FF6F61" : "none"}
                      stroke="#FF6F61"
                      strokeWidth="1.5"
                    >
                      <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.5 3.4 12l.7-4L1 5.2l4-.6L7 1z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground/60">Resenha do usuário...</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-foreground/30">
        <button className="hover:text-foreground/50 transition-colors">Mais recentes</button>
        <span>•</span>
        <button className="hover:text-foreground/50 transition-colors">Melhor avaliação</button>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </section>
  );
}
