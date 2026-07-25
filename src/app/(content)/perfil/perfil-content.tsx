"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthModal } from "@/components/auth-modal";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { User, MessageSquare, Star, Award, Zap, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";

type ProfileData = {
  id: string;
  nome: string;
  email: string;
  avatarUrl: string | null;
  xp: number;
  nivel: string;
  totalComentarios: number;
  totalAvaliacoes: number;
  comentariosDestaque: number;
  medalhas: { nome: string; icone: string; descricao: string; conquistadaEm: string }[];
  proximoNivel: { nome: string; xpNecessario: number } | null;
};

const nivelCores: Record<string, string> = {
  "Leitor Iniciante": "from-gray-light to-foreground/20",
  "Leitor Ass\u00edduo": "from-blue-deep/40 to-coral/30",
  "Cr\u00edtico Liter\u00e1rio": "from-yellow/40 to-coral/40",
  "Mestre dos Livros": "from-coral to-yellow",
};

export function PerfilContent() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setLoadingProfile(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoadingProfile(true);
    fetch("/api/perfil")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setLoadingProfile(false);
      })
      .catch(() => setLoadingProfile(false));
  }, [user]);

  if (!user) {
    return (
      <PageTransition>
        <main className="pt-24 max-w-2xl mx-auto px-6 pb-24 text-center">
          <Reveal>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral/20 to-yellow/20 flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-foreground/40" />
            </div>
            <h1 className="font-heading text-2xl text-foreground mb-2">Meu Perfil</h1>
            <p className="text-foreground/50 text-sm mb-8">Fa\u00e7a login para ver seu perfil</p>
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

  const xpProgress = profile
    ? profile.proximoNivel
      ? (profile.xp / profile.proximoNivel.xpNecessario) * 100
      : 100
    : 0;

  return (
    <PageTransition>
      <main className="pt-24 max-w-2xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral to-yellow flex items-center justify-center text-white font-heading text-lg">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                user.email?.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h1 className="font-heading text-2xl text-foreground">{profile?.nome || user.email}</h1>
              <p className="text-sm text-foreground/50">{user.email}</p>
            </div>
          </div>
        </Reveal>

        {loadingProfile ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-card rounded-[18px] p-6 border border-gray-light/50 animate-pulse h-24" />
            ))}
          </div>
        ) : profile ? (
          <>
            <Reveal delay={0.05}>
              <div className="bg-card rounded-[18px] p-6 border border-gray-light/50 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow" />
                    <h2 className="font-heading text-lg text-foreground">{profile.nivel}</h2>
                  </div>
                  <span className="text-sm font-medium text-coral">{profile.xp} XP</span>
                </div>
                <div className="w-full h-2 rounded-full bg-foreground/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-coral to-yellow transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                {profile.proximoNivel && (
                  <p className="text-xs text-foreground/40 mt-2">
                    {profile.proximoNivel.xpNecessario - profile.xp} XP para{" "}
                    <span className="text-foreground/60">{profile.proximoNivel.nome}</span>
                  </p>
                )}
                {!profile.proximoNivel && (
                  <p className="text-xs text-coral mt-2">N\u00edvel m\u00e1ximo alcan\u00e7ado!</p>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-card rounded-[18px] p-4 border border-gray-light/50 text-center">
                  <MessageSquare className="w-5 h-5 text-coral mx-auto mb-2" />
                  <span className="font-heading text-2xl text-foreground">{profile.totalComentarios}</span>
                  <p className="text-xs text-foreground/40 mt-1">Coment\u00e1rios</p>
                </div>
                <div className="bg-card rounded-[18px] p-4 border border-gray-light/50 text-center">
                  <Star className="w-5 h-5 text-yellow mx-auto mb-2" />
                  <span className="font-heading text-2xl text-foreground">{profile.totalAvaliacoes}</span>
                  <p className="text-xs text-foreground/40 mt-1">Avalia\u00e7\u00f5es</p>
                </div>
                <div className="bg-card rounded-[18px] p-4 border border-gray-light/50 text-center">
                  <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2" />
                  <span className="font-heading text-2xl text-foreground">{profile.comentariosDestaque}</span>
                  <p className="text-xs text-foreground/40 mt-1">Destaques</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <section className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow" />
                  <h2 className="font-heading text-lg text-foreground">Medalhas</h2>
                </div>
                {profile.medalhas.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {profile.medalhas.map((m) => (
                      <div
                        key={m.nome}
                        className="bg-card rounded-[18px] p-4 border border-yellow/20 bg-gradient-to-br from-yellow/5 to-transparent"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{m.icone}</span>
                          <div>
                            <p className="text-sm font-medium text-foreground">{m.nome}</p>
                            <p className="text-xs text-foreground/40">{m.descricao}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-card rounded-[18px] p-6 border border-gray-light/50 text-center">
                    <Award className="w-8 h-8 text-foreground/20 mx-auto mb-2" />
                    <p className="text-sm text-foreground/30">
                      Participe para conquistar medalhas! Avalie obras e fa\u00e7a coment\u00e1rios.
                    </p>
                  </div>
                )}
              </section>
            </Reveal>

            <Reveal delay={0.2}>
              <section>
                <h2 className="font-heading text-lg text-foreground mb-4">N\u00edveis</h2>
                <div className="bg-card rounded-[18px] p-5 border border-gray-light/50 space-y-3">
                  {[
                    { nome: "Leitor Iniciante", xp: "0 XP", ativo: profile.xp < 51 },
                    { nome: "Leitor Ass\u00edduo", xp: "51 XP", ativo: profile.xp >= 51 && profile.xp < 150 },
                    { nome: "Cr\u00edtico Liter\u00e1rio", xp: "150 XP", ativo: profile.xp >= 150 && profile.xp < 300 },
                    { nome: "Mestre dos Livros", xp: "300 XP", ativo: profile.xp >= 300 },
                  ].map((nivel) => (
                    <div
                      key={nivel.nome}
                      className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                        nivel.ativo
                          ? "bg-gradient-to-r from-coral/10 to-yellow/10 border border-coral/20"
                          : "opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                            nivelCores[nivel.nome] || "from-gray-light to-foreground/20"
                          } flex items-center justify-center`}
                        >
                          <span className="text-xs text-white font-bold">{nivel.nome.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{nivel.nome}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-foreground/40">{nivel.xp}</span>
                        {nivel.ativo && (
                          <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-coral/20 text-coral">
                            Voc\u00ea
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <div className="mt-8">
              <Link
                href="/obras"
                className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90 transition-colors"
              >
                Explorar obras
              </Link>
            </div>
          </>
        ) : null}
      </main>
    </PageTransition>
  );
}
