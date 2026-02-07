/* src/app/layout.tsx */
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import MotionProvider from "@/components/MotionProvider/MotionProvider";
import Navbar from "../components/Navbar/index";
import JsonLd from "../components/JsonLd/JsonLd";
import { Analytics } from "@vercel/analytics/next";

// IMPORTAMOS EL COMPONENTE CLIENTE QUE CREAMOS EN EL PASO 1
import ClientCursor from "@/components/ClientCursor"; 

const manrope = Manrope({ subsets: ["latin"] });

const baseUrl = "https://vittaweb.site";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Vitta Studio | Ingeniería Web de Alto Rendimiento",
    template: "%s | Vitta Studio",
  },
  description: "Estudio de desarrollo web especializado en Next.js...",
  // ... (resto de tu metadata igual) ...
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

        <MotionProvider>
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}