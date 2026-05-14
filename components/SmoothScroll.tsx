"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import type Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null });
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let lenis: Lenis;

    const init = async () => {
      const LenisClass = (await import("lenis")).default;

      lenis = new LenisClass({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", () => ScrollTrigger.update());

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      gsap.ticker.remove((time) => {
        if (lenisRef.current) lenisRef.current.raf(time * 1000);
      });
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
