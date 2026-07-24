"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthModal } from "@/components/auth-modal";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { User, MessageSquare, Star } from "lucide-react";
import Link from "next/link";

export function PerfilContent() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <PageTransition>
        <main className="pt-24 max-w-2xl mx-auto px-6 pb-24 text-center">
          <Reveal>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral/20 to-yellow/20 flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-foreground/40" />
            </div>
            <h1 className="font-heading text-2xl text-foreground mb-2">Meu Perfil</h1>
            <p className="text-foreground/50 text-sm mb-8">Faça login para ver seu perfil</p>
            <button
              onClick={() => setShowAuth(true)}
              className="px-6 h-10 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90 transition-colors"
            >
              Fazer login
            </button>
          </Reveal>
          <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="pt-24 max-w-2xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral to-yellow flex items-center justify-center text-white font-heading text-lg">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-heading text-2xl text-foreground">Meu Perfil</h1>
              <p className="text-sm text-foreground/50">{user.email}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-card rounded-[18px] p-5 border border-gray-light/50 text-center">
              <MessageSquare className="w-5 h-5 text-coral mx-auto mb-2" />
              <span className="font-heading text-2xl text-foreground">0</span>
              <p className="text-xs text-foreground/40 mt-1">Comentários</p>
            </div>
            <div className="bg-card rounded-[18px] p-5 border border-gray-light/50 text-center">
              <Star className="w-5 h-5 text-yellow mx-auto mb-2" />
              <span className="font-heading text-2xl text-foreground">0</span>
              <p className="text-xs text-foreground/40 mt-1">Avaliações</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <section>
            <h2 className="font-heading text-lg text-foreground mb-4">Meus Comentários</h2>
            <p className="text-sm text-foreground/30 text-center py-8">
              Você ainda não fez nenhum comentário.
            </p>
            <Link
              href="/obras"
              className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90 transition-colors"
            >
              Explorar obras
            </Link>
          </section>
        </Reveal>
      </main>
    </PageTransition>
  );
}
