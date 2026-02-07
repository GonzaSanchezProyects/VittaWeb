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
import { Analytics } from "@vercel/analytics/next"


const manrope = Manrope({ subsets: ["latin"] });

const baseUrl = "https://vittaweb.site"; 

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), // Esto arregla los links relativos de imágenes
  title: {
    default: "Vitta Studio | Ingeniería Web de Alto Rendimiento",
    template: "%s | Vitta Studio" // Para que las otras páginas sean "Servicio X | Vitta Studio"
  },
  description: "Estudio de desarrollo web especializado en Next.js, SEO técnico y experiencias digitales escalables. Diseño web premium en Argentina y el mundo.",
  keywords: ["Desarrollo Web", "Next.js", "Agencia SEO", "Diseño Web Mendoza", "Software a Medida"],
  authors: [{ name: "Gonzalo Sanchez" }],
  creator: "Vitta Studio",
  openGraph: {
    title: "Vitta Studio | Ingeniería Web",
    description: "Desarrollo de software a medida para empresas que buscan liderar su mercado.",
    url: baseUrl,
    siteName: "Vitta Studio",
    images: [
      {
        url: "/og-image.jpg", // Asegúrate de tener una imagen 'og-image.jpg' en /public
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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