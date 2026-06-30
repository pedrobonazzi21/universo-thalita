"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bookCovers = [
  "bg-gradient-to-br from-coral/20 to-yellow/20",
  "bg-gradient-to-br from-blue-deep/20 to-coral/20",
  "bg-gradient-to-br from-yellow/20 to-blue-deep/20",
  "bg-gradient-to-br from-coral/30 to-blue-deep/10",
  "bg-gradient-to-br from-blue-deep/30 to-yellow/10",
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
    tl.to(
      bg,
      {
        scale: 1.1,
        filter: "blur(4px)",
        duration: 1,
        ease: "power2.out",
      },
      0
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {bookCovers.map((gradient, i) => (
          <div
            key={i}
            className={`absolute inset-0 ${gradient} blur-3xl opacity-20`}
            style={{
              animation: `slide ${15 + i * 3}s ease-in-out infinite alternate`,
              animationDelay: `${i * 2}s`,
            }}
          />
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
          className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-coral to-yellow mb-8 shadow-2xl"
        />

        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight text-foreground leading-none"
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
