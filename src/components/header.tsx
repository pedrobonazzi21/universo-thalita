"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Início", href: "/" },
  { label: "Obras", href: "/obras" },
  { label: "Mapa", href: "/mapa" },
  { label: "Sobre", href: "/sobre" },
];

export function Header() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.set(header, { y: 0, opacity: 1 });

    ScrollTrigger.create({
      trigger: document.body,
      start: "top -80vh",
      onUpdate: (self) => {
        const progress = Math.min(self.progress, 1);
        gsap.to(header, {
          backgroundColor: `rgba(255, 255, 255, ${0.5 + progress * 0.4})`,
          borderBottomColor: `rgba(234, 234, 234, ${progress})`,
          duration: 0.1,
        });
      },
    });
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 bg-white/50 backdrop-blur-md border-b border-transparent"
      >
        <Link
          href="/"
          className="font-heading text-xl tracking-tight text-foreground"
        >
          Thalita Rebouças
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-coral transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Pesquisar"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-light/50 transition-colors duration-200"
          >
            <Search className="w-4 h-4 text-foreground/60" />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-light/50 transition-colors duration-200"
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-foreground/60" />
            ) : (
              <Menu className="w-4 h-4 text-foreground/60" />
            )}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav className="fixed inset-0 z-40 pt-16 bg-white/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center gap-6 pt-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-2xl text-foreground/70 hover:text-coral transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
