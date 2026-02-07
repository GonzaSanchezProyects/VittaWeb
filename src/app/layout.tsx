/* src/app/layout.tsx */
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import MotionProvider from "@/components/MotionProvider/MotionProvider";
import Navbar from "../components/Navbar/index"; // Asumo que tienes el Navbar aquí
// 1. IMPORTAR EL COMPONENTE JSON-LD
import JsonLd from "../components/JsonLd/JsonLd";
import Cursor from '@/components/Cursor/Cursor';


const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vitta Studio | Ingeniería Web de Alto Rendimiento",
  description: "Estudio de desarrollo web especializado en Next.js, SEO técnico y experiencias digitales escalables.",
  // Opcional: Configuración básica de OpenGraph para compartir en redes
  openGraph: {
    title: "Vitta Studio | Ingeniería Web",
    description: "Desarrollo de software a medida para empresas que buscan liderar su mercado.",
    type: "website",
    locale: "es_AR",
    url: "https://vitaweb.com",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={manrope.className}>
        
        <JsonLd />
        
        <MotionProvider>
          <Navbar />
          <SmoothScroll>
             {children}
          </SmoothScroll>
        </MotionProvider>

        <Cursor />
      </body>
    </html>
  );
}