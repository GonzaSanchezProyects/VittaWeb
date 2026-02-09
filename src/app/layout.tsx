/* src/app/layout.tsx */
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import MotionProvider from "@/components/MotionProvider/MotionProvider";
import Navbar from "../components/Navbar/index";
import JsonLd from "../components/JsonLd/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import GoogleTranslate from "@/components/GoogleTranslate/GoogleTranslate";

// IMPORTAMOS EL COMPONENTE CLIENTE QUE CREAMOS EN EL PASO 1
import ClientCursor from "@/components/ClientCursor"; 

const manrope = Manrope({ subsets: ["latin"] });

const baseUrl = "https://vittaweb.site";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Vitta Studio | Ingeniería Web de Alto Rendimiento",
    template: "%s | Vitta Studio" 
  },
  alternates: {
    canonical: '/',
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
        url: "/og-image.jpg", 
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={manrope.className}>
        <JsonLd />
        <Analytics />

        {/* Aquí usamos el componente puente, sin configuraciones extra */}
        <ClientCursor />
        <GoogleTranslate />
        <MotionProvider>
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}