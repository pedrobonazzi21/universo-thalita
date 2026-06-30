import type { Metadata } from "next";
import { inter, poppins, playfair } from "./fonts";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "Universo Thalita Rebouças",
    template: "%s | Universo Thalita Rebouças",
  },
  description:
    "Explore o universo de Thalita Rebouças: livros, filmes, adaptações e resenhas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn("h-full", "antialiased", inter.variable, poppins.variable, playfair.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
