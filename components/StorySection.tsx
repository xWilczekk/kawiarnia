"use client";

/**
 * StorySection — 3 full-screen scenes (scenes 1, 2, 3).
 * Each scene animates completely on arrive via `scene-enter` event.
 * NO pin. NO scrub. Text reveals instantly on scene enter.
 */

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useSceneAnimation } from "@/hooks/useSceneAnimation";

// ── Helpers ──────────────────────────────────────────────
function splitWords(el: HTMLElement) {
  const words = el.innerText.trim().split(" ");
  el.innerHTML = words
    .map((w) => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
    .join(" ");
  return Array.from(el.querySelectorAll<HTMLElement>(".word-inner"));
}

// ════════════════════════════════════════════════════════
// Scene 1 — The Quote
// ════════════════════════════════════════════════════════
function SceneQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);

  const enter = useCallback(() => {
    if (hasPlayed.current || !sectionRef.current) return;
    hasPlayed.current = true;

    const ctx = gsap.context(() => {
      const line1El = sectionRef.current!.querySelector<HTMLElement>(".sq-line1");
      const line2El = sectionRef.current!.querySelector<HTMLElement>(".sq-line2");
      const meta = sectionRef.current!.querySelector<HTMLElement>(".sq-meta");
      const hr = sectionRef.current!.querySelector<HTMLElement>(".sq-hr");

      const w1 = line1El ? splitWords(line1El) : [];
      const w2 = line2El ? splitWords(line2El) : [];

      const tl = gsap.timeline();

      tl.fromTo(
        w1,
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.07, duration: 1, ease: "expo.out" },
        0
      )
        .fromTo(
          w2,
          { y: "115%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.05, duration: 0.9, ease: "expo.out" },
          0.2
        )
        .fromTo(
          hr,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "expo.out" },
          0.55
        )
        .fromTo(
          meta,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useSceneAnimation({ sceneIndex: 1, enter });

  return (
    <section
      ref={sectionRef}
      id="about"
      data-scene="1"
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(2rem, 10vw, 10rem)",
        background: "#040302",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: "rgba(201,169,110,0.35)",
          textTransform: "uppercase",
          marginBottom: "clamp(2rem, 5vw, 4rem)",
        }}
      >
        Nasza historia
      </div>

      <div style={{ overflow: "hidden" }}>
        <h2
          className="sq-line1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 10vw, 10rem)",
            fontWeight: 300,
            lineHeight: 0.88,
            letterSpacing: "-0.025em",
            color: "#f0e6d0",
            overflow: "hidden",
          }}
        >
          Każda filiżanka
        </h2>
      </div>

      <div style={{ overflow: "hidden" }}>
        <h2
          className="sq-line2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 10vw, 10rem)",
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 0.88,
            letterSpacing: "-0.015em",
            background: "linear-gradient(135deg, #e8d5a3 0%, #c9a96e 55%, #8b6914 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            overflow: "hidden",
          }}
        >
          to historia.
        </h2>
      </div>

      <div
        className="sq-hr"
        style={{
          width: "clamp(80px, 12vw, 180px)",
          height: 1,
          background: "linear-gradient(90deg, #c9a96e, transparent)",
          margin: "clamp(2rem, 4vw, 3.5rem) 0",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          opacity: 0,
        }}
      />

      <div
        className="sq-meta"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.22em",
          color: "rgba(201,169,110,0.45)",
          textTransform: "uppercase",
          opacity: 0,
        }}
      >
        Est. Wyszków · Świętojańska 80
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════
// Scene 2 — The Pillars
// ════════════════════════════════════════════════════════
const PILLARS = [
  {
    num: "01",
    label: "Kawa parzona z pasją",
    desc: "Arabika single-origin, idealna temperatura, każdy szczegół dopracowany",
  },
  {
    num: "02",
    label: "Desery tworzone codziennie",
    desc: "Świeże ciasta i lody, żadnych kompromisów w jakości składników",
  },
  {
    num: "03",
    label: "Klimat który zatrzymuje czas",
    desc: "Centrum Wyszkowa, miejsce na chwilę poza codziennością",
  },
];

function ScenePillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);

  const enter = useCallback(() => {
    if (hasPlayed.current || !sectionRef.current) return;
    hasPlayed.current = true;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".pillar-item"),
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.18,
        duration: 0.85,
        ease: "expo.out",
      }
    );
    gsap.fromTo(
      sectionRef.current.querySelector(".sp-label"),
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  useSceneAnimation({ sceneIndex: 2, enter });

  return (
    <section
      ref={sectionRef}
      data-scene="2"
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(2rem, 10vw, 10rem)",
        background: "#040302",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="sp-label"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: "rgba(201,169,110,0.35)",
          textTransform: "uppercase",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
          opacity: 0,
        }}
      >
        Czym jesteśmy
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          borderTop: "1px solid rgba(201,169,110,0.08)",
        }}
      >
        {PILLARS.map((p) => (
          <div
            key={p.num}
            className="pillar-item"
            style={{
              opacity: 0,
              display: "grid",
              gridTemplateColumns: "3rem 1fr clamp(2rem, 6vw, 5rem)",
              alignItems: "start",
              gap: "clamp(1rem, 3vw, 2.5rem)",
              padding: "clamp(1.8rem, 3.5vw, 2.8rem) 0",
              borderBottom: "1px solid rgba(201,169,110,0.08)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                color: "rgba(201,169,110,0.3)",
                paddingTop: "0.5em",
              }}
            >
              {p.num}
            </span>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 4.5vw, 3.8rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: "#f0e6d0",
                  lineHeight: 1.05,
                  marginBottom: "0.5em",
                }}
              >
                {p.label}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                  fontWeight: 300,
                  color: "rgba(240,230,208,0.38)",
                  lineHeight: 1.6,
                }}
              >
                {p.desc}
              </p>
            </div>

            <div
              style={{
                height: 1,
                background: "rgba(201,169,110,0.18)",
                alignSelf: "center",
                marginTop: "0.5rem",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════
// Scene 3 — The Numbers
// ════════════════════════════════════════════════════════
const STATS = [
  { value: "4.2", unit: "★", label: "Średnia ocena" },
  { value: "20–40", unit: "zł", label: "Za osobę" },
  { value: "5", unit: "opinii", label: "Gości" },
  { value: "10:00", unit: "–", label: "Otwieramy jutro" },
];

function SceneStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);

  const enter = useCallback(() => {
    if (hasPlayed.current || !sectionRef.current) return;
    hasPlayed.current = true;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".stat-item"),
      { opacity: 0, y: 60, scale: 0.88 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: "expo.out",
      }
    );
    gsap.fromTo(
      sectionRef.current.querySelector(".sn-label"),
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  useSceneAnimation({ sceneIndex: 3, enter });

  return (
    <section
      ref={sectionRef}
      data-scene="3"
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 clamp(2rem, 10vw, 10rem)",
        background: "#040302",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "70vmin",
          height: "70vmin",
          borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.04)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="sn-label"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: "rgba(201,169,110,0.35)",
          textTransform: "uppercase",
          marginBottom: "clamp(4rem, 8vw, 6rem)",
          opacity: 0,
        }}
      >
        W liczbach
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(2.5rem, 6vw, 6rem) clamp(4rem, 10vw, 10rem)",
          width: "100%",
          maxWidth: 900,
        }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            className="stat-item"
            style={{
              opacity: 0,
              borderLeft: "1px solid rgba(201,169,110,0.1)",
              paddingLeft: "clamp(1.2rem, 2.5vw, 2rem)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                fontWeight: 300,
                lineHeight: 1,
                color: "#f0e6d0",
                letterSpacing: "-0.025em",
              }}
            >
              {s.value}
              <span
                style={{
                  color: "#c9a96e",
                  fontSize: "0.45em",
                  marginLeft: "0.12em",
                  fontStyle: "italic",
                }}
              >
                {s.unit}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                color: "rgba(201,169,110,0.38)",
                textTransform: "uppercase",
                marginTop: "0.6rem",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════
// Export — all 3 story scenes together
// ════════════════════════════════════════════════════════
export default function StorySection() {
  return (
    <>
      <SceneQuote />
      <ScenePillars />
      <SceneStats />
    </>
  );
}
