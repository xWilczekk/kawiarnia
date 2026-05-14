"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NAV = [
  { label: "Menu",    sceneIndex: 1 },
  { label: "O nas",   sceneIndex: 2 },
  { label: "Kontakt", sceneIndex: 3 },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-item",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.75, ease: "power3.out", delay: 3.4 }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{ height: 72, padding: "0 clamp(1.5rem, 5vw, 4rem)" }}
    >
      {/* Logo */}
      <button
        onClick={() => window.__goToScene?.(0)}
        className="nav-item"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontWeight: 400,
          letterSpacing: "0.26em",
          color: "#c9a96e",
          textTransform: "uppercase",
          background: "none",
          border: "none",
          padding: 0,
          opacity: 0,
          transition: "color 0.25s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e8d5a3")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a96e")}
      >
        U&nbsp;Rełkowej
      </button>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV.map((item) => (
          <button
            key={item.label}
            onClick={() => window.__goToScene?.(item.sceneIndex)}
            className="nav-item"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              fontWeight: 400,
              letterSpacing: "0.16em",
              color: "rgba(240,230,208,0.4)",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              padding: "4px 0",
              opacity: 0,
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a96e")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,230,208,0.4)")}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Phone */}
      <a
        href="tel:501445536"
        className="nav-item"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.1em",
          color: "rgba(201,169,110,0.55)",
          border: "1px solid rgba(201,169,110,0.16)",
          padding: "7px 14px",
          opacity: 0,
          textDecoration: "none",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = "#c9a96e";
          el.style.borderColor = "rgba(201,169,110,0.45)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = "rgba(201,169,110,0.55)";
          el.style.borderColor = "rgba(201,169,110,0.16)";
        }}
      >
        501 445 536
      </a>
    </nav>
  );
}
