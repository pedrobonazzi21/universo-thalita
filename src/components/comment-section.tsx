"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { AuthModal } from "./auth-modal";
import { MessageSquare, Heart } from "lucide-react";

function StarRatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button key={i} type="button" onClick={() => onChange(i + 1)} className="transition-colors">
          <svg width="18" height="18" viewBox="0 0 14 14" fill={i < value ? "#FF6F61" : "none"} stroke="#FF6F61" strokeWidth="1.5">
            <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.5 3.4 12l.7-4L1 5.2l4-.6L7 1z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14" fill={i < rating ? "#FF6F61" : "none"} stroke="#FF6F61" strokeWidth="1.5">
          <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.5 3.4 12l.7-4L1 5.2l4-.6L7 1z" />
        </svg>
      ))}
    </div>
  );
}

type CommentData = {
  id: string;
  texto: string;
  nota: number | null;
  curtidasCount: number;
  createdAt: string;
  usuario: { nome: string; avatarUrl: string | null };
  respostas?: CommentData[];
};

export function CommentSection({ obraId, postId }: { obraId?: string; postId?: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [orderBy, setOrderBy] = useState<"recentes" | "melhores">("recentes");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    loadComments();
    return () => unsubscribe();
  }, []);

  async function loadComments() {
    const { listarComentarios } = await import("@/actions/comentarios");
    try {
      const data = await listarComentarios(obraId ?? null, orderBy, postId);
      setComments(data as unknown as CommentData[]);
    } catch {
      setComments([]);
    }
  }

  useEffect(() => {
    loadComments();
  }, [orderBy]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { setShowAuth(true); return; }
    if (!text.trim()) return;

    const { criarComentario } = await import("@/actions/comentarios");
    try {
      await criarComentario(obraId ?? null, text, rating > 0 ? rating : null, undefined, postId);
      setText("");
      setRating(0);
      await loadComments();
    } catch {
    }
  }

  async function handleReply(comentarioId: string) {
    if (!replyText.trim()) return;
    const { criarComentario } = await import("@/actions/comentarios");
    try {
      await criarComentario(obraId ?? null, replyText, null, comentarioId, postId);
      setReplyText("");
      setReplyTo(null);
      await loadComments();
    } catch {
    }
  }

  async function handleLike(comentarioId: string) {
    if (!user) { setShowAuth(true); return; }
    const { curtirComentario } = await import("@/actions/comentarios");
    try {
      await curtirComentario(comentarioId);
      await loadComments();
    } catch {
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-foreground/40" />
          <h2 className="font-heading text-lg text-foreground">Comunidade</h2>
        </div>
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

      <div className="flex items-center gap-2 mb-4 text-xs text-foreground/30">
        <button
          onClick={() => setOrderBy("recentes")}
          className={`transition-colors ${orderBy === "recentes" ? "text-coral" : "hover:text-foreground/50"}`}
        >
          Mais recentes
        </button>
        <span>•</span>
        <button
          onClick={() => setOrderBy("melhores")}
          className={`transition-colors ${orderBy === "melhores" ? "text-coral" : "hover:text-foreground/50"}`}
        >
          Melhor avaliação
        </button>
      </div>

      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-center text-sm text-foreground/30 py-8">
            Nenhum comentário ainda. Seja o primeiro!
          </p>
        )}
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onReply={(id) => setReplyTo(replyTo === id ? null : id)}
            onLike={handleLike}
            showReply={replyTo === comment.id}
            replyText={replyText}
            onReplyTextChange={setReplyText}
            onSubmitReply={handleReply}
            user={user}
            onAuth={() => setShowAuth(true)}
          />
        ))}
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </section>
  );
}

function CommentCard({
  comment,
  onReply,
  onLike,
  showReply,
  replyText,
  onReplyTextChange,
  onSubmitReply,
  user,
  onAuth,
}: {
  comment: CommentData;
  onReply: (id: string) => void;
  onLike: (id: string) => void;
  showReply: boolean;
  replyText: string;
  onReplyTextChange: (v: string) => void;
  onSubmitReply: (id: string) => void;
  user: User | null;
  onAuth: () => void;
}) {
  return (
    <div className="bg-card rounded-[18px] p-4 border border-gray-light/50 transition-all duration-200 hover:border-coral/20">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral/30 to-yellow/30 flex items-center justify-center text-xs font-heading text-foreground/50">
          {comment.usuario.nome.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{comment.usuario.nome}</p>
          {comment.nota && <StarDisplay rating={comment.nota} />}
        </div>
        <span className="text-[10px] text-foreground/30">
          {new Date(comment.createdAt).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <p className="text-sm text-foreground/60 mb-3">{comment.texto}</p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onLike(comment.id)}
          className="flex items-center gap-1 text-xs text-foreground/30 hover:text-coral transition-colors"
        >
          <Heart className="w-3 h-3" />
          <span>{comment.curtidasCount}</span>
        </button>
        <button
          onClick={() => { if (user) onReply(comment.id); else onAuth(); }}
          className="text-xs text-foreground/30 hover:text-foreground/50 transition-colors"
        >
          Responder
        </button>
      </div>

      {showReply && (
        <div className="mt-3 ml-4 space-y-2">
          <textarea
            placeholder="Escreva sua resposta..."
            value={replyText}
            onChange={(e) => onReplyTextChange(e.target.value)}
            rows={2}
            className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-foreground/30 focus:outline-none border-b border-gray-light/50 pb-1"
          />
          <button
            onClick={() => onSubmitReply(comment.id)}
            className="px-4 h-7 rounded-full bg-coral/80 text-white text-xs font-medium hover:bg-coral transition-colors"
          >
            Responder
          </button>
        </div>
      )}

      {comment.respostas && comment.respostas.length > 0 && (
        <div className="mt-3 ml-4 space-y-3 border-l-2 border-gray-light/30 pl-4">
          {comment.respostas.map((reply) => (
            <div key={reply.id}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-deep/30 to-coral/30 flex items-center justify-center text-[8px] font-heading text-foreground/50">
                  {reply.usuario.nome.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium text-foreground">{reply.usuario.nome}</span>
                <span className="text-[10px] text-foreground/30">
                  {new Date(reply.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <p className="text-sm text-foreground/60">{reply.texto}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}