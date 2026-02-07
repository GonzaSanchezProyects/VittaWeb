/* src/components/MotionProvider/MotionProvider.tsx */
'use client';

import { LazyMotion, domAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function MotionProvider({ children }: Props) {
  // 'domAnimation' pesa ~30KB menos que la librería completa.
  // Solo carga lo básico (fade, slide, scale). Si usas layoutId o drag, avísame.
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}