import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TokenSync } from "@/components/token-sync";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TokenSync />
      <Header />
      {children}
      <Footer />
    </>
  );
}
