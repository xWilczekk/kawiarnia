"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useSceneAnimation } from "@/hooks/useSceneAnimation";
import MagneticButton from "./MagneticButton";

const HOURS = [
  { days: "Pon – Pt", hours: "10:00 – 19:00" },
  { days: "Sobota", hours: "10:00 – 18:00" },
  { days: "Niedziela", hours: "11:00 – 17:00" },
];

function splitWords(el: HTMLElement) {
  const words = el.innerText.trim().split(" ");
  el.innerHTML = words
    .map((w) => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
    .join(" ");
  return Array.from(el.querySelectorAll<HTMLElement>(".word-inner"));
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasPlayed = useRef(false);

  const enter = useCallback(() => {
    if (hasPlayed.current || !sectionRef.current) return;
    hasPlayed.current = true;

    const ctx = gsap.context(() => {
      const words = headingRef.current ? splitWords(headingRef.current) : [];

      const tl = gsap.timeline();

      // Restore h2 opacity — words are still clipped via CSS translateY(115%) at this point
      if (headingRef.current) tl.set(headingRef.current, { opacity: 1 }, 0);

      tl.fromTo(
        words,
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.06, duration: 1.0, ease: "expo.out" },
        0
      )
        .fromTo(
          sectionRef.current!.querySelectorAll(".ct-col"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power4.out",
          },
          0.4
        )
        .fromTo(
          sectionRef.current!.querySelector(".ct-cta"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
          0.7
        )
        .fromTo(
          sectionRef.current!.querySelector(".ct-glow"),
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: "power2.out" },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useSceneAnimation({ sceneIndex: 3, enter });

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-scene="3"
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(2rem, 8vw, 8rem)",
        background: "#040302",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric glow */}
      <div
        className="ct-glow"
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "50%",
          width: "80vmin",
          height: "80vmin",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.055) 0%, transparent 60%)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          opacity: 0,
        }}
      />

      {/* Top divider */}
      <div
        style={{
          width: "100%",
          height: 1,
          background: "linear-gradient(90deg, rgba(201,169,110,0.18), rgba(201,169,110,0.03), transparent)",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      />

      {/* Label */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.25em",
          color: "rgba(201,169,110,0.35)",
          textTransform: "uppercase",
          marginBottom: "clamp(0.8rem, 2vw, 1.5rem)",
        }}
      >
        — Znajdź nas
      </div>

      {/* Address as display heading */}
      <div style={{ overflow: "hidden", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <h2
          ref={headingRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 7vw, 7rem)",
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            color: "#f0e6d0",
            maxWidth: "85%",
            opacity: 0,
          }}
        >
          Świętojańska 80 Wyszków
        </h2>
      </div>

      {/* Info columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "1px solid rgba(201,169,110,0.07)",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {/* Phone */}
        <div
          className="ct-col"
          style={{
            opacity: 0,
            padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2.5rem) 0",
            borderRight: "1px solid rgba(201,169,110,0.07)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.52rem",
              letterSpacing: "0.2em",
              color: "rgba(201,169,110,0.3)",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
            }}
          >
            Telefon
          </div>
          <a
            href="tel:501445536"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              fontWeight: 300,
              color: "#c9a96e",
              letterSpacing: "-0.01em",
              display: "block",
              marginBottom: "0.4rem",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#e8d5a3")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#c9a96e")
            }
          >
            501 445 536
          </a>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--font-mono)",
              fontSize: "0.52rem",
              letterSpacing: "0.14em",
              color: "rgba(201,169,110,0.3)",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#ef4444",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            Zamknięte · jutro 10:00
          </div>
        </div>

        {/* Address */}
        <div
          className="ct-col"
          style={{
            opacity: 0,
            padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)",
            borderRight: "1px solid rgba(201,169,110,0.07)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.52rem",
              letterSpacing: "0.2em",
              color: "rgba(201,169,110,0.3)",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
            }}
          >
            Adres
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
              fontWeight: 300,
              color: "#f0e6d0",
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
            }}
          >
            Świętojańska 80
            <br />
            07-200 Wyszków
            <br />
            <span style={{ color: "rgba(201,169,110,0.35)", fontSize: "0.75em" }}>
              mazowieckie
            </span>
          </div>
        </div>

        {/* Hours */}
        <div
          className="ct-col"
          style={{
            opacity: 0,
            padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.52rem",
              letterSpacing: "0.2em",
              color: "rgba(201,169,110,0.3)",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
            }}
          >
            Godziny
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {HOURS.map((h) => (
              <div
                key={h.days}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)",
                    fontWeight: 300,
                    color: "rgba(240,230,208,0.38)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h.days}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.05em",
                    color: "#c9a96e",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {h.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTAs — magnetic */}
      <div
        className="ct-cta"
        style={{ opacity: 0, display: "flex", flexWrap: "wrap", gap: "1.2rem", alignItems: "center" }}
      >
        <MagneticButton
          href="https://www.google.com/maps/dir/?api=1&destination=Świętojańska+80+Wyszków"
          strength={0.5}
          data-cursor="TRASA"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "clamp(0.9rem, 1.8vw, 1.2rem) clamp(1.8rem, 3.5vw, 2.8rem)",
            background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.16em",
            color: "#0a0806",
            textTransform: "uppercase",
            border: "none",
            textDecoration: "none",
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 12px 40px rgba(201,169,110,0.28)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          Wyznacz trasę ↗
        </MagneticButton>

        <MagneticButton
          href="tel:501445536"
          strength={0.4}
          data-cursor="CALL"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "clamp(0.9rem, 1.8vw, 1.2rem) clamp(1.8rem, 3.5vw, 2.8rem)",
            background: "transparent",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.16em",
            color: "rgba(201,169,110,0.55)",
            textTransform: "uppercase",
            border: "1px solid rgba(201,169,110,0.18)",
            textDecoration: "none",
            transition: "all 0.3s ease",
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "#c9a96e";
            el.style.borderColor = "rgba(201,169,110,0.45)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "rgba(201,169,110,0.55)";
            el.style.borderColor = "rgba(201,169,110,0.18)";
          }}
        >
          Zadzwoń
        </MagneticButton>
      </div>

      {/* Footer bar — two rows, absolute bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid rgba(201,169,110,0.08)",
        }}
      >
        {/* Row 1 — kawiarnia info */}
        <div
          style={{
            padding: "0.7rem clamp(2rem, 8vw, 8rem)",
            borderBottom: "1px solid rgba(201,169,110,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              color: "rgba(201,169,110,0.35)",
              textTransform: "uppercase",
            }}
          >
            U&nbsp;Rełkowej
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.14em",
              color: "rgba(240,230,208,0.2)",
              textTransform: "uppercase",
            }}
          >
            Świętojańska 80 · 07-200 Wyszków ·{" "}
            <a
              href="tel:501445536"
              style={{
                color: "rgba(201,169,110,0.3)",
                textDecoration: "none",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(201,169,110,0.7)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(201,169,110,0.3)")
              }
            >
              501 445 536
            </a>
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.14em",
              color: "rgba(240,230,208,0.15)",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()}
          </span>
        </div>

        {/* Row 2 — credit (more visible) */}
        <div
          style={{
            padding: "0.65rem clamp(2rem, 8vw, 8rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.16em",
              color: "rgba(240,230,208,0.45)",
              textTransform: "uppercase",
            }}
          >
            Realizacja&nbsp;·&nbsp;Bartłomiej Kulesz
          </span>
          <a
            href="mailto:bartlomiej.kulesz.biznes@gmail.com"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              color: "rgba(201,169,110,0.5)",
              textDecoration: "none",
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#c9a96e")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(201,169,110,0.5)")
            }
          >
            bartlomiej.kulesz.biznes@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
