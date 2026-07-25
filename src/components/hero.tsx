"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroCover {
  titulo: string;
  url: string;
  tipo: string;
}

const coverPositions = [
  { x: "10%", y: "15%", rotate: -8, duration: 25 },
  { x: "75%", y: "10%", rotate: 6, duration: 30 },
  { x: "5%", y: "55%", rotate: 12, duration: 28 },
  { x: "80%", y: "60%", rotate: -10, duration: 22 },
  { x: "65%", y: "75%", rotate: 4, duration: 35 },
  { x: "20%", y: "80%", rotate: -6, duration: 26 },
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

export function Hero({ covers = [] }: { covers?: HeroCover[] }) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const floatingCovers = coverPositions.map((pos, i) => ({
    ...pos,
    cover: covers[i] ?? null,
  }));

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
        {floatingCovers.map((item, i) => (
          <div
            key={i}
            id={`floating-cover-${i}`}
            className="absolute aspect-[3/4] w-28 sm:w-36 md:w-44 rounded-xl overflow-hidden border border-white/10 shadow-xl"
            style={{
              left: item.x,
              top: item.y,
              rotate: `${item.rotate}deg`,
              opacity: 0.15,
              animation: `coverFloat ${item.duration}s ease-in-out infinite alternate`,
              animationDelay: `${i * 2}s`,
            }}
          >
            {item.cover ? (
              <img
                src={item.cover.url}
                alt={item.cover.titulo}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-coral/25 to-yellow/15" />
            )}
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
