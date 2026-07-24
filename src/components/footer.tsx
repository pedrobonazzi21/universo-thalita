import Link from "next/link";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Livros", href: "/obras?tipo=livro" },
  { label: "Filmes", href: "/obras?tipo=filme" },
  { label: "Mural", href: "/mapa" },
  { label: "Resenhas", href: "/obras" },
  { label: "Sobre", href: "/sobre" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-light/50 bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-heading text-lg text-foreground mb-3">
              Universo Thalita
            </h4>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
              Explore a obra completa de Thalita Rebouças: livros, filmes, adaptações e muito mais.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm text-foreground mb-3 uppercase tracking-wider">
              Navegar
            </h4>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground/50 hover:text-coral transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-sm text-foreground mb-3 uppercase tracking-wider">
              Sobre
            </h4>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Um projeto fã dedicado à carreira da autora Thalita Rebouças.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-light/30 text-center">
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} Universo Thalita Rebouças
          </p>
        </div>
      </div>
    </footer>
  );
}
