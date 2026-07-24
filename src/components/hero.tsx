"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const floatingCovers = [
  { title: "Fala Sério, Mãe!", type: "Livro", x: "10%", y: "15%", rotate: -8, duration: 25, gradient: "from-coral/25 to-yellow/15", aspect: "aspect-[3/4]" },
  { title: "Tudo por um Popstar", type: "Livro", x: "75%", y: "10%", rotate: 6, duration: 30, gradient: "from-yellow/25 to-blue-deep/15", aspect: "aspect-[3/4]" },
  { title: "Fala Sério, Amor", type: "Livro", x: "5%", y: "55%", rotate: 12, duration: 28, gradient: "from-blue-deep/25 to-coral/15", aspect: "aspect-[3/4]" },
  { title: "Tudo por um Popstar (Filme)", type: "Filme", x: "80%", y: "60%", rotate: -10, duration: 22, gradient: "from-coral/25 to-yellow/15", aspect: "aspect-[16/9]" },
  { title: "Ela Disse, Ele Disse", type: "Livro", x: "65%", y: "75%", rotate: 4, duration: 35, gradient: "from-yellow/20 to-coral/15", aspect: "aspect-[3/4]" },
  { title: "Fala Sério, Professor!", type: "Livro", x: "20%", y: "80%", rotate: -6, duration: 26, gradient: "from-blue-deep/25 to-yellow/15", aspect: "aspect-[3/4]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const bg = bgRef.current;
    if (!hero || !content || !bg) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(content, {
      scale: 0.85,
      opacity: 0.4,
      duration: 1,
      ease: "power2.out",
    });

    floatingCovers.forEach((_, i) => {
      const el = document.getElementById(`floating-cover-${i}`);
      if (el) {
        tl.to(el, { scale: 1.15, filter: "blur(6px)", duration: 1, ease: "power2.out" }, 0);
      }
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div ref={bgRef} className="absolute inset-0">
        {floatingCovers.map((cover, i) => (
          <div
            key={i}
            id={`floating-cover-${i}`}
            className={`absolute ${cover.aspect} w-28 sm:w-36 md:w-44 rounded-xl bg-gradient-to-br ${cover.gradient} backdrop-blur-sm border border-white/10 shadow-xl`}
            style={{
              left: cover.x,
              top: cover.y,
              rotate: `${cover.rotate}deg`,
              opacity: 0.15,
              animation: `coverFloat ${cover.duration}s ease-in-out infinite alternate`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-3">
              <span className="text-[8px] sm:text-[10px] font-medium text-foreground/40 uppercase tracking-wider">
                {cover.type}
              </span>
              <span className="text-[10px] sm:text-xs font-heading text-foreground/50 text-center leading-tight mt-1">
                {cover.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      <motion.div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-coral to-yellow mb-8 shadow-2xl ring-4 ring-white/20"
        />

        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none"
          style={{ color: "#F25C69" }}
        >
          THALITA
          <br />
          REBOUÇAS
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-base sm:text-lg text-foreground/60 tracking-wide"
        >
          Livros • Filmes • Resenhas
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center gap-2 text-foreground/40 animate-bounce"
        >
          <span className="text-xs tracking-widest uppercase">Descubra</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
