/* src/app/layout.tsx */
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import MotionProvider from "@/components/MotionProvider/MotionProvider";
import Navbar from "../components/Navbar/index";
import JsonLd from "../components/JsonLd/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import GoogleTranslate from "@/components/GoogleTranslate/GoogleTranslate";
import ClientCursor from "@/components/ClientCursor"; 

const manrope = Manrope({ subsets: ["latin"] });

const baseUrl = "https://vittaweb.site";

// 1. CONFIGURACIÓN VISUAL PARA MÓVILES (Barra de estado negra)
export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Vitta Web | Desarrollo Web de Alto Rendimiento",
    template: "%s | Vitta Web" 
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-AR': '/',
    },
  },
  description: "Estudio de desarrollo web especializado en Next.js, SEO técnico y experiencias digitales escalables. Diseño web premium en Argentina y el mundo.",
  
  // 2. ESTRATEGIA DE KEYWORDS MASIVA (90+)
  keywords: [
    // --- GEO-LOCALIZADAS ---
    "Diseño Web Mendoza", "Agencia SEO Mendoza", "Desarrollo Web Argentina",
    "Empresa de Software Mendoza", "Programadores en Mendoza", "Diseño de Páginas Web San Martín Mendoza",
    "Posicionamiento SEO Mendoza", "Agencia Web Argentina", "Desarrollo de Software Argentina",
    "Servicios Digitales en Mendoza", "Mejores agencias de diseño web Mendoza",
    "Creación de sitios web Mendoza", "Webmaster Mendoza", "Consultora Tecnológica Mendoza",
    
    // --- SERVICIOS ---
    "Desarrollo Web a Medida", "Diseño UX/UI Profesional", "Desarrollo de Software SaaS",
    "Creación de Landing Pages", "Tiendas Online Personalizadas", "E-commerce High Performance",
    "Desarrollo de Aplicaciones Web", "Mantenimiento Web Mensual", "Auditoría SEO Técnica",
    "Optimización de Velocidad Web", "Diseño Web Responsivo", "Desarrollo Full Stack",
    
    // --- TECNOLOGÍA ---
    "Next.js Developer", "React.js Experts", "Programación Web a Medida",
    "Desarrollo Web Headless", "Server Side Rendering (SSR)", "Optimización Core Web Vitals",
    "Google PageSpeed Insights 100", "Animaciones Web Framer Motion", "Código Limpio",
    
    // --- INTENCIÓN DE COMPRA ---
    "Contratar programador web", "Presupuesto página web", "Cuánto cuesta una página web en Argentina",
    "Mejorar ventas con mi web", "Aparecer primero en Google", "Vender más por internet",
    "Agencia para escalar negocio", "Soluciones web para empresas", "Desarrollo web premium",
    
    // --- NICHOS ---
    "Páginas web para PYMES", "Web para Startups", "Diseño web para inmobiliarias",
    "Sitios web para restaurantes", "E-commerce para ropa", "Web para consultores",
    
    // --- BRANDING ---
    "Vitta Web", "Gonzalo Sanchez Desarrollador", "Estudio Vitta"
  ],

  authors: [{ name: "Gonzalo Sanchez", url: baseUrl }],
  creator: "Vitta Web",
  publisher: "Vitta Web",
  
  // 3. OPEN GRAPH (Redes Sociales)
  openGraph: {
    title: "Vitta Web | Ingeniería Web",
    description: "Desarrollo de software a medida para empresas que buscan liderar su mercado.",
    url: baseUrl,
    siteName: "Vitta Web",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Vitta Web Preview",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  // 4. OPTIMIZACIÓN APPLE / SAFARI (Siri & iOS)
  appleWebApp: {
    capable: true,
    title: "Vitta Web",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
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

  // 5. VERIFICACIÓN (Pega aquí tu código cuando lo tengas)
  /*
  verification: {
    google: 'TU_CODIGO_DE_VERIFICACION', 
  },
  */
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