"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Leaf, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  theme: "dark" | "light";
}

const PILLARS = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Z pasją",
    desc: "Każda kawa parzona z dbałością o każdy szczegół – od doboru ziaren po idealną temperaturę.",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Świeże składniki",
    desc: "Ciasta i lody przygotowywane codziennie, z naturalnych składników od lokalnych dostawców.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Wyjątkowy klimat",
    desc: "Przytulne wnętrze, w którym czas płynie wolniej. Miejsce na chwilę wytchnienia.",
  },
];

export default function About({ theme }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-tag",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".about-tag", start: "top 85%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".about-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".about-heading", start: "top 85%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".about-text", start: "top 88%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".about-pillar",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".about-pillar", start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardBg = theme === "dark"
    ? "rgba(26,21,16,0.6)"
    : "rgba(253,248,237,0.8)";
  const cardBorder = theme === "dark"
    ? "1px solid rgba(208,169,106,0.1)"
    : "1px solid rgba(160,98,42,0.12)";

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-36 px-6 overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-[0.04]"
        aria-hidden
        style={{ background: "radial-gradient(ellipse at right center, #c08040, transparent 60%)" }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <div>
            <div className="about-tag inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                background: theme === "dark" ? "rgba(160,98,42,0.15)" : "rgba(160,98,42,0.1)",
                border: `1px solid ${theme === "dark" ? "rgba(160,98,42,0.3)" : "rgba(160,98,42,0.2)"}`,
              }}
            >
              <span className="text-coffee-400 text-xs font-semibold tracking-wider uppercase">O nas</span>
            </div>

            <h2
              className={`about-heading font-serif text-4xl sm:text-5xl font-bold leading-tight mb-6 ${
                theme === "dark" ? "text-cream-100" : "text-dark-800"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Serce Wyszkowa
              <br />
              <span className="text-gradient">przy filiżance</span>
            </h2>

            <div className={`about-text space-y-4 text-base leading-relaxed ${theme === "dark" ? "text-cream-300" : "text-dark-500"}`}>
              <p>
                Kawiarnia U Rełkowej to więcej niż miejsce – to spotkanie z prawdziwą kawą,
                domowymi ciastami i lodami, które smakują jak u babci.
              </p>
              <p>
                Zlokalizowana w samym centrum Wyszkowa, przy Świętojańskiej 80, jest ulubionym
                miejscem spotkań mieszkańców – od porannej kawy po popołudniowy deser.
              </p>
              <p>
                Ceny w przedziale <strong className={theme === "dark" ? "text-cream-100" : "text-dark-800"}>20–40 zł za osobę</strong> sprawiają,
                że każda wizyta to przystępna przyjemność.
              </p>
            </div>
          </div>

          {/* Right: pillars */}
          <div className="space-y-4">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="about-pillar card-hover rounded-2xl p-6 cursor-default"
                style={{ background: cardBg, border: cardBorder }}
              >
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-coffee-500/20 flex items-center justify-center text-coffee-400 flex-shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-base mb-1 ${theme === "dark" ? "text-cream-100" : "text-dark-800"}`}>
                      {pillar.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-cream-300" : "text-dark-500"}`}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
