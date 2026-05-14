"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (wrapRef.current) wrapRef.current.style.display = "none";
          onComplete();
        },
      });

      // Count 0 → 100
      const obj = { val: 0 };
      tl.to(
        obj,
        {
          val: 100,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              const n = Math.round(obj.val);
              counterRef.current.textContent = n.toString().padStart(2, "0");
            }
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${obj.val / 100})`;
            }
          },
        },
        0
      );

      // Logo fades in at 50%
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.8
      );

      // Line expands
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "expo.out" },
        1.6
      );

      // Brief hold
      tl.to({}, { duration: 0.3 }, 2.2);

      // Curtains split — top up, bottom down
      tl.to(
        topRef.current,
        { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
        2.5
      );
      tl.to(
        botRef.current,
        { yPercent: 100, duration: 0.9, ease: "power4.inOut" },
        2.5
      );
      tl.to(
        [counterRef.current, barRef.current?.parentElement, logoRef.current, lineRef.current],
        { opacity: 0, duration: 0.3 },
        2.5
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9996] overflow-hidden"
      style={{ background: "#040302" }}
    >
      {/* Top curtain */}
      <div ref={topRef} className="preloader-curtain-top" />

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none"
        style={{ zIndex: 9997 }}
      >
        {/* Logo */}
        <div
          ref={logoRef}
          style={{
            opacity: 0,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 3vw, 2rem)",
            fontWeight: 300,
            letterSpacing: "0.35em",
            color: "#c9a96e",
            textTransform: "uppercase",
          }}
        >
          U&nbsp;Rełkowej
        </div>

        {/* Divider */}
        <div
          ref={lineRef}
          style={{
            width: "clamp(120px, 20vw, 280px)",
            height: 1,
            background: "linear-gradient(90deg, transparent, #c9a96e, transparent)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />

        {/* Counter */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 700,
            color: "#1c160d",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            WebkitTextStroke: "1px rgba(201,169,110,0.3)",
            userSelect: "none",
          }}
        >
          <span ref={counterRef}>00</span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "clamp(120px, 20vw, 280px)",
            height: 1,
            background: "rgba(201,169,110,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            ref={barRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #c9a96e, #e8d5a3)",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>

      {/* Bottom curtain */}
      <div ref={botRef} className="preloader-curtain-bottom" />
    </div>
  );
}
