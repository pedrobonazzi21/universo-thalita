"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { X } from "lucide-react";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/callback`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setSent(true);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Erro ao enviar link";
      alert(msg);
    }

    setLoading(false);
  }

  async function handleGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Erro ao entrar com Google";
      alert(msg);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card rounded-[18px] p-8 max-w-sm w-full mx-4 shadow-2xl border border-gray-light/50"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl text-foreground">
                Entrar
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-light/50 transition-colors"
              >
                <X className="w-4 h-4 text-foreground/60" />
              </button>
            </div>

            {sent ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6F61" strokeWidth="2">
                    <path d="M22 12h-6l-2 3-4-6-2 3H2" />
                  </svg>
                </div>
                <p className="text-foreground/70">
                  Link enviado para <strong>{email}</strong>
                </p>
                <p className="text-foreground/40 text-sm mt-2">
                  Verifique sua caixa de entrada
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={handleGoogle}
                  className="w-full h-11 rounded-[18px] border border-gray-light flex items-center justify-center gap-3 text-sm font-medium text-foreground/70 hover:bg-gray-light/30 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continuar com Google
                </button>

                <div className="flex items-center gap-3">
                  <span className="flex-1 h-px bg-gray-light" />
                  <span className="text-xs text-foreground/40">ou</span>
                  <span className="flex-1 h-px bg-gray-light" />
                </div>

                <form onSubmit={handleMagicLink} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-11 px-4 rounded-[18px] border border-gray-light bg-transparent text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-coral/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 rounded-[18px] bg-coral text-white text-sm font-medium hover:bg-coral/90 disabled:opacity-50 transition-colors"
                  >
                    {loading ? "Enviando..." : "Enviar link mágico"}
                  </button>
                </form>

                <p className="text-xs text-foreground/30 text-center">
                  Ao entrar, você concorda com nossos termos de uso.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}