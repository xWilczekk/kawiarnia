"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function splitIntoWords(el: HTMLElement) {
  const words = el.innerText.split(" ");
  el.innerHTML = words
    .map(
      (w) =>
        `<span class="word-wrap"><span class="word-inner">${w}</span></span>`
    )
    .join(" ");
  return Array.from(el.querySelectorAll<HTMLElement>(".word-inner"));
}

function splitIntoChars(el: HTMLElement) {
  const chars = el.innerText.split("");
  el.innerHTML = chars
    .map(
      (c) =>
        `<span class="char-wrap"><span class="char-inner">${c === " " ? "&nbsp;" : c}</span></span>`
    )
    .join("");
  return Array.from(el.querySelectorAll<HTMLElement>(".char-inner"));
}

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const layer0Ref = useRef<HTMLDivElement>(null); // bg
  const layer1Ref = useRef<HTMLDivElement>(null); // mid
  const layer2Ref = useRef<HTMLDivElement>(null); // fg
  const titleLineARef = useRef<HTMLHeadingElement>(null);
  const titleLineBRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  // Master entrance timeline
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const titleWordsA = titleLineARef.current
        ? splitIntoChars(titleLineARef.current)
        : [];
      const titleWordsB = titleLineBRef.current
        ? splitIntoWords(titleLineBRef.current)
        : [];
      const subWords = subRef.current ? splitIntoWords(subRef.current) : [];

      const tl = gsap.timeline({ delay: 0.2 });

      // Restore container visibility — children are invisible via CSS translateY clip
      tl.set([titleLineARef.current, titleLineBRef.current, subRef.current], { opacity: 1 }, 0);

      // ① Video + background layer
      tl.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 0.42, duration: 2.2, ease: "power2.out" },
        0
      );
      tl.fromTo(
        layer0Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: "power2.out" },
        0
      );

      // ② Decorative lines draw
      tl.fromTo(
        [line1Ref.current, line2Ref.current],
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.out", stagger: 0.15 },
        0.3
      );

      // ③ Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power4.out" },
        0.6
      );

      // ④ Title line A — char by char
      tl.fromTo(
        titleWordsA,
        { y: "110%", rotate: 6, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.025,
        },
        0.85
      );

      // ⑤ Title line B — word by word
      tl.fromTo(
        titleWordsB,
        { y: "115%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
        },
        1.15
      );

      // ⑥ Subtitle
      tl.fromTo(
        subWords,
        { y: "110%" },
        { y: "0%", duration: 0.9, ease: "power4.out", stagger: 0.04 },
        1.5
      );

      // ⑦ CTA row
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        1.85
      );

      // ⑧ Side details
      tl.fromTo(
        detailsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        2.0
      );

      // ⑨ Scroll hint
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        2.2
      );

      // Scroll hint pulse
      const scrollLine = scrollHintRef.current?.querySelector<HTMLElement>(".scroll-line");
      if (scrollLine) {
        gsap.to(scrollLine, {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 1.2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: 3,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  // No scroll-scrub parallax — scene stays pinned visually while hero is active.

  // Mouse parallax
  useEffect(() => {
    let mouse = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      cur.x = lerp(cur.x, mouse.x, 0.04);
      cur.y = lerp(cur.y, mouse.y, 0.04);

      if (layer0Ref.current)
        gsap.set(layer0Ref.current, { x: cur.x * 14, y: cur.y * 8 });
      if (layer1Ref.current)
        gsap.set(layer1Ref.current, { x: cur.x * 28, y: cur.y * 16 });
      if (layer2Ref.current)
        gsap.set(layer2Ref.current, { x: cur.x * 10, y: cur.y * 5 });

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-scene="0"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 700,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Video background ────────────────────────── */}
      <div
        ref={layer0Ref}
        style={{
          position: "absolute",
          inset: "-10%",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        {/* Cinematic video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0,
            filter: "contrast(1.08) saturate(0.7) brightness(0.62)",
            willChange: "transform",
            pointerEvents: "none",
          }}
        >
          <source src="/coffee.mp4" type="video/mp4" />
        </video>

        {/* Radial glow accents (layer on top of video) */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "55%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "20%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* ── Gradient overlay — keeps text readable ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(4,3,2,0.86) 0%, rgba(4,3,2,0.58) 50%, rgba(4,3,2,0.78) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 1: Mid — decorative geometry ───── */}
      <div
        ref={layer1Ref}
        style={{
          position: "absolute",
          inset: 0,
          willChange: "transform",
          pointerEvents: "none",
        }}
      >
        {/* Large circle outline */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-8%",
            width: "min(55vw, 700px)",
            height: "min(55vw, 700px)",
            borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.06)",
            transform: "translateY(-50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-4%",
            width: "min(40vw, 520px)",
            height: "min(40vw, 520px)",
            borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.04)",
            transform: "translateY(-50%)",
          }}
        />
        {/* Corner mark */}
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            right: "8%",
            width: 80,
            height: 80,
            borderBottom: "1px solid rgba(201,169,110,0.2)",
            borderRight: "1px solid rgba(201,169,110,0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "8%",
            width: 60,
            height: 60,
            borderTop: "1px solid rgba(201,169,110,0.15)",
            borderLeft: "1px solid rgba(201,169,110,0.15)",
          }}
        />
      </div>

      {/* ── Layer 2: Foreground — content ───────── */}
      <div
        ref={layer2Ref}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          padding: "0 clamp(2rem, 8vw, 7rem)",
          willChange: "transform, opacity",
        }}
      >
        {/* Top line */}
        <div
          ref={line1Ref}
          className="line-h"
          style={{
            height: 1,
            background: "linear-gradient(90deg, rgba(201,169,110,0.5), transparent)",
            marginBottom: "clamp(2rem, 4vw, 3.5rem)",
            maxWidth: 500,
          }}
        />

        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            opacity: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#c9a96e",
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(201,169,110,0.7)",
              textTransform: "uppercase",
            }}
          >
            Zamknięte · Otwieramy jutro 10:00
          </span>
        </div>

        {/* Title A */}
        <h1
          ref={titleLineARef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 9vw, 9rem)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: "#f0e6d0",
            marginBottom: "0.08em",
            overflow: "hidden",
            opacity: 0,
          }}
        >
          KAWIARNIA
        </h1>

        {/* Title B */}
        <h1
          ref={titleLineBRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 9vw, 9rem)",
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            background: "linear-gradient(135deg, #e8d5a3 0%, #c9a96e 50%, #8b6914 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "clamp(1.5rem, 3.5vw, 3rem)",
            overflow: "hidden",
            opacity: 0,
          }}
        >
          U Rełkowej
        </h1>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Subtitle */}
          <p
            ref={subRef}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
              fontWeight: 300,
              color: "rgba(240,230,208,0.55)",
              lineHeight: 1.6,
              maxWidth: 380,
              overflow: "hidden",
              opacity: 0,
            }}
          >
            Najlepsza kawa i desery w Wyszkowie — każda wizyta to chwila poza czasem.
          </p>

          {/* CTA */}
          <div ref={ctaRef} style={{ opacity: 0, display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => window.__goToScene?.(1)}
              data-cursor="MENU"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                color: "#0a0806",
                background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
                border: "none",
                padding: "14px 32px",
                textTransform: "uppercase",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(201,169,110,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Zobacz menu
            </button>
            <a
              href="tel:501445536"
              data-cursor="CALL"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                color: "rgba(201,169,110,0.75)",
                background: "transparent",
                border: "1px solid rgba(201,169,110,0.25)",
                padding: "14px 32px",
                textTransform: "uppercase",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#c9a96e";
                el.style.borderColor = "rgba(201,169,110,0.6)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(201,169,110,0.75)";
                el.style.borderColor = "rgba(201,169,110,0.25)";
              }}
            >
              Zadzwoń
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div
          ref={line2Ref}
          className="line-h"
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent)",
            marginTop: "clamp(2rem, 4vw, 3.5rem)",
          }}
        />
      </div>

      {/* Bottom info bar — key business details */}
      <div
        ref={detailsRef}
        style={{
          opacity: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 clamp(2rem, 8vw, 7rem)",
          borderTop: "1px solid rgba(201,169,110,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
          height: 56,
        }}
      >
        {[
          { label: "Adres", value: "Świętojańska 80, Wyszków" },
          { label: "Ocena", value: "4.2 ★  ·  5 opinii" },
          { label: "Ceny", value: "20 – 40 zł / osoba" },
          { label: "Status", value: "Zamknięte · jutro 10:00" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5rem",
                letterSpacing: "0.18em",
                color: "rgba(201,169,110,0.3)",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                width: 1,
                height: 10,
                background: "rgba(201,169,110,0.2)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 300,
                color: "rgba(240,230,208,0.5)",
                letterSpacing: "0.02em",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        style={{
          opacity: 0,
          position: "absolute",
          right: "clamp(2rem, 5vw, 5rem)",
          bottom: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.22em",
            color: "rgba(240,230,208,0.2)",
            textTransform: "uppercase",
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </div>
        <div
          className="scroll-line"
          style={{
            width: 1,
            height: 44,
            background: "linear-gradient(180deg, rgba(201,169,110,0.4), transparent)",
            transformOrigin: "bottom center",
          }}
        />
      </div>
    </section>
  );
}
