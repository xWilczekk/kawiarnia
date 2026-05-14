"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LABELS: Record<number, string> = {
  0: "Start",
  1: "Menu",
  2: "O nas",
  3: "Kontakt",
};

export default function SceneNav({ total }: { total: number }) {
  const [current, setCurrent] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onChange = (e: CustomEvent<{ index: number }>) =>
      setCurrent(e.detail.index);
    window.addEventListener("scene-change", onChange as EventListener);
    return () => window.removeEventListener("scene-change", onChange as EventListener);
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 3.6 }
    );
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        right: "clamp(1rem, 2.5vw, 2rem)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        opacity: 0,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => window.__goToScene?.(i)}
          aria-label={LABELS[i] ?? `Scena ${i + 1}`}
          title={LABELS[i] ?? `Scena ${i + 1}`}
          style={{
            width: i === current ? 22 : 4,
            height: 4,
            borderRadius: 2,
            background:
              i === current
                ? "linear-gradient(90deg, #c9a96e, #e8d5a3)"
                : "rgba(201,169,110,0.22)",
            border: "none",
            padding: 0,
            transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
            flexShrink: 0,
          }}
        />
      ))}

      <div
        style={{
          marginTop: 10,
          fontFamily: "var(--font-mono)",
          fontSize: "0.5rem",
          letterSpacing: "0.18em",
          color: "rgba(201,169,110,0.3)",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        {LABELS[current] ?? ""}
      </div>
    </div>
  );
}
