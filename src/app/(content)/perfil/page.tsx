import { Metadata } from "next";
import { PerfilContent } from "./perfil-content";

export const metadata: Metadata = {
  title: "Meu Perfil",
};

export default function PerfilPage() {
  return <PerfilContent />;
}
