"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const dotXSet = gsap.quickSetter(dot, "x", "px");
    const dotYSet = gsap.quickSetter(dot, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotXSet(mouseX);
      dotYSet(mouseY);
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      gsap.set(ring, { x: ringX, y: ringY });
      raf = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", onMouseMove);

    // Hover states
    const onEnterLink = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const dataLabel = el.getAttribute("data-cursor");
      gsap.to(ring, { scale: 2.5, opacity: 0.6, duration: 0.4, ease: "power3.out" });
      gsap.to(dot, { scale: 0.3, duration: 0.3, ease: "power3.out" });
      if (dataLabel && label) {
        label.textContent = dataLabel;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" });
      }
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
    };

    const onEnterMagnetic = () => {
      gsap.to(ring, { scale: 3, borderColor: "rgba(201,169,110,0.8)", duration: 0.4, ease: "power3.out" });
    };

    const registerHovers = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterMagnetic);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    // Re-register on DOM changes
    const observer = new MutationObserver(registerHovers);
    observer.observe(document.body, { childList: true, subtree: true });
    registerHovers();

    // Show cursor
    gsap.set([dot, ring], { opacity: 0 });
    const showCursor = () => gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
    window.addEventListener("mousemove", showCursor, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#c9a96e",
          }}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid rgba(201, 169, 110, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center",
          }}
        >
          <div
            ref={labelRef}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              color: "#c9a96e",
              opacity: 0,
              transform: "scale(0.8)",
              whiteSpace: "nowrap",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          />
        </div>
      </div>
    </>
  );
}
