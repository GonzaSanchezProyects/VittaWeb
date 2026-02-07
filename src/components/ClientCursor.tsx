/* src/components/ClientCursor.tsx */
"use client"; // Esto es vital

import dynamic from "next/dynamic";

// Asumiendo que tu archivo real está en src/components/Cursor/Cursor.tsx
// Si te da error de ruta, ajusta este import para que apunte a tu archivo real
const Cursor = dynamic(() => import("./Cursor/Cursor"), {
  ssr: false,
});

export default function ClientCursor() {
  return <Cursor />;
}