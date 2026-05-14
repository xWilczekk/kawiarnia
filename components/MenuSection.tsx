"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useSceneAnimation } from "@/hooks/useSceneAnimation";

const MENU_ITEMS = [
  {
    category: "Kawa",
    tag: "01",
    items: [
      { name: "Espresso", price: "8", note: "Single origin arabika" },
      { name: "Cappuccino", price: "13", note: "Aksamitna pianka" },
      { name: "Flat White", price: "15", note: "Podwójne ristretto" },
      { name: "Cold Brew", price: "16", note: "18h ekstrakcja" },
    ],
  },
  {
    category: "Lody",
    tag: "02",
    items: [
      { name: "Wanilia Bourbon", price: "10", note: "Naturalna wanilia" },
      { name: "Pistacja", price: "13", note: "Sycylijska pistacja" },
      { name: "Affogato", price: "18", note: "Espresso + wanilia" },
      { name: "Deska lodów", price: "24", note: "3 gałki do wyboru" },
    ],
  },
  {
    category: "Ciasta",
    tag: "03",
    items: [
      { name: "Sernik wiedeński", price: "16", note: "Codzienny wypiek" },
      { name: "Tiramisu", price: "19", note: "Mascarpone · espresso" },
      { name: "Tarta cytrynowa", price: "17", note: "Bezy · krem citron" },
      { name: "Brownie", price: "15", note: "Orzechy włoskie" },
    ],
  },
];

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);

  const enter = useCallback(() => {
    if (hasPlayed.current || !sectionRef.current) return;
    hasPlayed.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        sectionRef.current!.querySelectorAll(".mh-word"),
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.06, duration: 0.9, ease: "expo.out" },
        0
      )
        .fromTo(
          sectionRef.current!.querySelectorAll(".menu-col-header"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power4.out" },
          0.3
        )
        .fromTo(
          sectionRef.current!.querySelectorAll(".menu-row"),
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.045,
            duration: 0.55,
            ease: "power3.out",
          },
          0.45
        )
        .fromTo(
          sectionRef.current!.querySelectorAll(".menu-divider"),
          { scaleX: 0 },
          { scaleX: 1, stagger: 0.03, duration: 0.5, ease: "expo.out" },
          0.5
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useSceneAnimation({ sceneIndex: 1, enter });

  return (
    <section
      ref={sectionRef}
      id="menu"
      data-scene="1"
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
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "45vw",
          height: "45vw",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.03), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 1000 }}>
        {/* Header */}
        <div style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.25em",
              color: "rgba(201,169,110,0.35)",
              textTransform: "uppercase",
              marginBottom: "0.7rem",
            }}
          >
            — Nasze menu
          </div>
          <div style={{ overflow: "hidden" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 0.92,
                color: "#f0e6d0",
                margin: 0,
              }}
            >
              {["Smak", "który", "pamiętasz"].map((w) => (
                <span
                  key={w}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    verticalAlign: "bottom",
                    marginRight: "0.25em",
                  }}
                >
                  <span className="mh-word" style={{ display: "inline-block", transform: "translateY(110%)" }}>
                    {w}
                  </span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Top divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, rgba(201,169,110,0.25), rgba(201,169,110,0.06), transparent)",
            marginBottom: "clamp(1.2rem, 2.5vw, 2rem)",
          }}
        />

        {/* Three-column menu grid */}
        <div
          className="menu-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(1.5rem, 3vw, 3rem)",
          }}
        >
          {MENU_ITEMS.map((group) => (
            <div key={group.category}>
              {/* Category header */}
              <div
                className="menu-col-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "clamp(0.8rem, 1.5vw, 1.2rem)",
                  opacity: 0,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: "#f0e6d0",
                    margin: 0,
                  }}
                >
                  {group.category}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.14em",
                    color: "rgba(201,169,110,0.28)",
                  }}
                >
                  {group.tag}
                </span>
              </div>

              {/* Items */}
              {group.items.map((item, i) => (
                <div key={item.name}>
                  <div
                    className="menu-divider"
                    style={{
                      height: 1,
                      background: "rgba(201,169,110,0.07)",
                      transformOrigin: "left center",
                      transform: "scaleX(0)",
                    }}
                  />
                  <div
                    className="menu-row"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "clamp(0.55rem, 1vw, 0.8rem) 0",
                      gap: "0.75rem",
                      opacity: 0,
                      transition: "padding-left 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.paddingLeft = "0.35rem")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.paddingLeft = "0")
                    }
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
                          fontWeight: 400,
                          color: "#e8d5a3",
                          marginBottom: "0.12em",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.5rem",
                          letterSpacing: "0.1em",
                          color: "rgba(201,169,110,0.28)",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.note}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
                        fontWeight: 300,
                        color: "#c9a96e",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {item.price} zł
                    </div>
                  </div>
                  {i === group.items.length - 1 && (
                    <div
                      className="menu-divider"
                      style={{
                        height: 1,
                        background: "rgba(201,169,110,0.07)",
                        transformOrigin: "left center",
                        transform: "scaleX(0)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.18em",
            color: "rgba(201,169,110,0.16)",
            textTransform: "uppercase",
            marginTop: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          Ceny orientacyjne · 20–40 zł / osoba
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .menu-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1024px) and (min-width: 681px) {
          .menu-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </section>
  );
}
