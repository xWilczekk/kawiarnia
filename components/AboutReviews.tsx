"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useSceneAnimation } from "@/hooks/useSceneAnimation";

const PILLARS = [
  {
    num: "01",
    label: "Kawa z pasją",
    desc: "Ziarna single origin od małych plantacji. Palone lokalnie, parzone z precyzją.",
  },
  {
    num: "02",
    label: "Domowe wypieki",
    desc: "Serniki, tarty i ciasta przygotowywane każdego ranka przez naszą cukiernię.",
  },
  {
    num: "03",
    label: "Klimat miejsca",
    desc: "Przytulna przestrzeń w centrum Wyszkowa – idealna do pracy i spotkań.",
  },
];

const REVIEWS = [
  {
    text: "Najlepsza kawa w Wyszkowie. Cappuccino idealne – aksamitna pianka, wyrazisty smak. Wracam tu co tydzień.",
    author: "Karolina W.",
    stars: 5,
  },
  {
    text: "Sernik wiedeński to osobna kategoria. Tiramisu też wybitne. Obsługa miła i szybka.",
    author: "Marek T.",
    stars: 5,
  },
  {
    text: "Piękne wnętrze, świetna muzyka. Affogato zrobione perfekcyjnie. Polecam każdemu.",
    author: "Anna K.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: "0.6rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="#c9a96e"
          style={{ flexShrink: 0 }}
        >
          <polygon points="5,1 6.18,3.82 9.27,4.09 7,6.08 7.63,9.09 5,7.5 2.37,9.09 3,6.08 0.73,4.09 3.82,3.82" />
        </svg>
      ))}
    </div>
  );
}

export default function AboutReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);

  const enter = useCallback(() => {
    if (hasPlayed.current || !sectionRef.current) return;
    hasPlayed.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        sectionRef.current!.querySelectorAll(".ab-label"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0
      )
        .fromTo(
          sectionRef.current!.querySelectorAll(".ab-headline"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, ease: "expo.out" },
          0.1
        )
        .fromTo(
          sectionRef.current!.querySelectorAll(".ab-body"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.3
        )
        .fromTo(
          sectionRef.current!.querySelectorAll(".ab-pillar"),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "power3.out" },
          0.45
        )
        .fromTo(
          sectionRef.current!.querySelector(".ab-rating-block"),
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" },
          0.25
        )
        .fromTo(
          sectionRef.current!.querySelectorAll(".ab-review"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" },
          0.5
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useSceneAnimation({ sceneIndex: 2, enter });

  return (
    <section
      ref={sectionRef}
      id="about"
      data-scene="2"
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        background: "#040302",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.035), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2.5rem, 5vw, 5rem)",
          alignItems: "start",
        }}
        className="ab-layout"
      >
        {/* LEFT — About */}
        <div>
          <div
            className="ab-label"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.25em",
              color: "rgba(201,169,110,0.35)",
              textTransform: "uppercase",
              marginBottom: "0.9rem",
              opacity: 0,
            }}
          >
            — O kawiarni
          </div>

          <h2
            className="ab-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "#f0e6d0",
              margin: "0 0 clamp(1rem, 2vw, 1.6rem)",
              opacity: 0,
            }}
          >
            Kawiarnia z&nbsp;duszą,<br />
            <em style={{ fontStyle: "italic", color: "#c9a96e" }}>w samym centrum</em>
          </h2>

          <p
            className="ab-body"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(240,230,208,0.52)",
              maxWidth: 420,
              margin: "0 0 clamp(1.5rem, 3vw, 2.5rem)",
              opacity: 0,
            }}
          >
            Od lat tworzymy przestrzeń, gdzie dobra kawa spotyka się z domowym
            wypiekiem i spokojem chwili. Znajdziesz nas przy Świętojańskiej 80
            w Wyszkowie – przychodź sam lub z bliskimi.
          </p>

          {/* Pillars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.9rem, 1.8vw, 1.4rem)" }}>
            {PILLARS.map((p) => (
              <div
                key={p.num}
                className="ab-pillar"
                style={{
                  display: "flex",
                  gap: "clamp(0.8rem, 1.5vw, 1.2rem)",
                  alignItems: "flex-start",
                  opacity: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.1em",
                    color: "rgba(201,169,110,0.3)",
                    paddingTop: "0.35em",
                    flexShrink: 0,
                  }}
                >
                  {p.num}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(0.78rem, 1vw, 0.88rem)",
                      fontWeight: 500,
                      color: "#e8d5a3",
                      marginBottom: "0.25em",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {p.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(0.72rem, 0.9vw, 0.8rem)",
                      fontWeight: 300,
                      color: "rgba(240,230,208,0.38)",
                      lineHeight: 1.6,
                    }}
                  >
                    {p.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Rating + Reviews */}
        <div>
          {/* Rating block */}
          <div
            className="ab-rating-block"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(1rem, 2vw, 1.8rem)",
              padding: "clamp(1rem, 2vw, 1.4rem) 0",
              borderBottom: "1px solid rgba(201,169,110,0.08)",
              marginBottom: "clamp(1.2rem, 2.5vw, 2rem)",
              opacity: 0,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "#c9a96e",
                  letterSpacing: "-0.03em",
                }}
              >
                4.2
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 3,
                  marginTop: "0.3rem",
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <svg
                    key={i}
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="#c9a96e"
                  >
                    <polygon points="5,1 6.18,3.82 9.27,4.09 7,6.08 7.63,9.09 5,7.5 2.37,9.09 3,6.08 0.73,4.09 3.82,3.82" />
                  </svg>
                ))}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="0.7">
                  <polygon points="5,1 6.18,3.82 9.27,4.09 7,6.08 7.63,9.09 5,7.5 2.37,9.09 3,6.08 0.73,4.09 3.82,3.82" />
                </svg>
              </div>
            </div>
            <div
              style={{
                width: 1,
                height: 44,
                background: "rgba(201,169,110,0.12)",
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.78rem, 1vw, 0.88rem)",
                  fontWeight: 300,
                  color: "rgba(240,230,208,0.55)",
                  lineHeight: 1.5,
                }}
              >
                Ocena Google Maps
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.12em",
                  color: "rgba(201,169,110,0.3)",
                  textTransform: "uppercase",
                  marginTop: "0.2em",
                }}
              >
                Ponad 80 opinii
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.8rem, 1.5vw, 1.2rem)" }}>
            {REVIEWS.map((r) => (
              <div
                key={r.author}
                className="ab-review"
                style={{
                  padding: "clamp(0.9rem, 1.5vw, 1.2rem)",
                  border: "1px solid rgba(201,169,110,0.07)",
                  background: "linear-gradient(145deg, rgba(22,17,10,0.7), rgba(10,7,3,0.85))",
                  opacity: 0,
                }}
              >
                <Stars count={r.stars} />
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(0.75rem, 0.95vw, 0.85rem)",
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: "rgba(240,230,208,0.58)",
                    margin: "0 0 0.6rem",
                  }}
                >
                  &ldquo;{r.text}&rdquo;
                </p>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.12em",
                    color: "rgba(201,169,110,0.3)",
                    textTransform: "uppercase",
                  }}
                >
                  {r.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ab-layout {
            grid-template-columns: 1fr !important;
            overflow-y: auto;
          }
        }
      `}</style>
    </section>
  );
}
