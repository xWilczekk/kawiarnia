"use client";

import { useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { useSceneAnimation } from "@/hooks/useSceneAnimation";

const REVIEWS = [
  {
    author: "Anna K.",
    rating: 5,
    text: "So happy! Cudowne miejsce, kawa znakomita, obsługa miła i szybka. Będę wracać regularnie!",
  },
  {
    author: "Tomasz W.",
    rating: 5,
    text: "Duże porcje lodów i ciast, bardzo smaczne. Sernik i tiramisu to absolutne hity.",
  },
  {
    author: "Marta S.",
    rating: 3,
    text: "Obsługa miła, ale lody niezjadliwe dla niektórych. Kawa bardzo dobra, ciasta pyszne.",
  },
];

const MARQUEE_TEXTS = [
  "Najlepsza kawa w Wyszkowie",
  "★★★★★",
  "Lody i ciasta na poziomie",
  "★★★★",
  "Klimatyczne wnętrze",
  "★★★★★",
  "Obsługa na medal",
  "★★★★",
];

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  const enter = useCallback(() => {
    if (hasPlayed.current || !sectionRef.current) return;
    hasPlayed.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        sectionRef.current!.querySelector(".rv-quote"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
        0
      )
        .fromTo(
          sectionRef.current!.querySelector(".rv-meta"),
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          0.5
        )
        .fromTo(
          sectionRef.current!.querySelectorAll(".rv-card"),
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: "power4.out",
          },
          0.35
        )
        .fromTo(
          sectionRef.current!.querySelectorAll(".rv-bar"),
          { scaleX: 0 },
          {
            scaleX: 1,
            stagger: 0.08,
            duration: 1,
            ease: "expo.out",
          },
          0.4
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useSceneAnimation({ sceneIndex: 5, enter });

  // Infinite marquee — starts on mount, runs independently
  useEffect(() => {
    const inner = marqueeRef.current;
    if (!inner) return;
    const ctx = gsap.context(() => {
      gsap.to(inner, {
        x: "-50%",
        duration: 38,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const RATING_DIST = [
    { stars: 5, pct: 0.4 },
    { stars: 4, pct: 0.2 },
    { stars: 3, pct: 0.2 },
    { stars: 2, pct: 0 },
    { stars: 1, pct: 0 },
  ];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      data-scene="5"
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#040302",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.04), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ padding: "0 clamp(2rem, 6vw, 6rem)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Section label */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            color: "rgba(201,169,110,0.35)",
            textTransform: "uppercase",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          — Opinie gości
        </div>

        {/* Main row: quote + rating */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
            marginBottom: "clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          {/* Featured quote */}
          <div>
            <div
              className="rv-quote"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 4vw, 3.8rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.15,
                color: "#f0e6d0",
                letterSpacing: "-0.01em",
                maxWidth: 680,
                opacity: 0,
              }}
            >
              &ldquo;Duże porcje lodów i ciast, bardzo smaczne. Sernik i tiramisu to absolutne hity.&rdquo;
            </div>
            <div
              className="rv-meta"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1.2rem",
                opacity: 0,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: "rgba(201,169,110,0.4)",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  color: "rgba(201,169,110,0.5)",
                  textTransform: "uppercase",
                }}
              >
                Tomasz W. · ★★★★★
              </div>
            </div>
          </div>

          {/* Rating breakdown */}
          <div
            style={{
              borderLeft: "1px solid rgba(201,169,110,0.1)",
              paddingLeft: "clamp(1.5rem, 3vw, 2.5rem)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 300,
                color: "#f0e6d0",
                lineHeight: 1,
              }}
            >
              4.2
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                color: "rgba(201,169,110,0.35)",
                marginBottom: "1rem",
                marginTop: "0.2rem",
                textTransform: "uppercase",
              }}
            >
              z 5 opinii
            </div>
            {RATING_DIST.map(({ stars, pct }) => (
              <div
                key={stars}
                style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.52rem",
                    color: "rgba(201,169,110,0.35)",
                    width: 10,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {stars}
                </span>
                <div
                  style={{
                    width: 80,
                    height: 2,
                    background: "rgba(201,169,110,0.08)",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <div
                    className="rv-bar"
                    style={{
                      height: "100%",
                      width: `${pct * 100}%`,
                      background: "linear-gradient(90deg, #c9a96e, #e8d5a3)",
                      transformOrigin: "left center",
                      transform: "scaleX(0)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(0.8rem, 1.5vw, 1.2rem)",
          }}
        >
          {REVIEWS.map((r) => (
            <div
              key={r.author}
              className="rv-card"
              style={{
                opacity: 0,
                padding: "clamp(1rem, 2vw, 1.5rem)",
                border: "1px solid rgba(201,169,110,0.08)",
                background: "linear-gradient(145deg, rgba(18,14,8,0.7), rgba(8,6,3,0.85))",
                transition: "border-color 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,169,110,0.22)";
                el.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,169,110,0.08)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={{ marginBottom: "0.75rem" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.65rem",
                      color: i < r.rating ? "#c9a96e" : "rgba(201,169,110,0.12)",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
                  fontWeight: 300,
                  color: "rgba(240,230,208,0.6)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                }}
              >
                {r.text}
              </p>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.14em",
                  color: "rgba(201,169,110,0.38)",
                  textTransform: "uppercase",
                }}
              >
                {r.author}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid rgba(201,169,110,0.05)",
          padding: "0.8rem 0",
          flexShrink: 0,
        }}
      >
        <div
          ref={marqueeRef}
          style={{ display: "flex", width: "max-content", gap: "3rem", alignItems: "center" }}
        >
          {[...MARQUEE_TEXTS, ...MARQUEE_TEXTS].map((text, i) => (
            <span
              key={i}
              style={{
                fontFamily: i % 2 === 1 ? "var(--font-display)" : "var(--font-mono)",
                fontSize: i % 2 === 1 ? "1.6rem" : "0.58rem",
                fontStyle: i % 2 === 1 ? "italic" : "normal",
                fontWeight: i % 2 === 1 ? 300 : 400,
                letterSpacing: i % 2 === 1 ? "-0.01em" : "0.2em",
                color:
                  i % 2 === 1
                    ? "rgba(240,230,208,0.1)"
                    : "rgba(201,169,110,0.25)",
                whiteSpace: "nowrap",
                textTransform: i % 2 === 1 ? "none" : "uppercase",
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
