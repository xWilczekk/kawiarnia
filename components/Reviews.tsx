"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ReviewsProps {
  theme: "dark" | "light";
}

const REVIEWS = [
  {
    author: "Anna K.",
    initials: "AK",
    rating: 5,
    text: "So happy! Cudowne miejsce, kawa znakomita, obsługa miła i szybka. Będę wracać regularnie!",
    color: "#c08040",
  },
  {
    author: "Tomasz W.",
    initials: "TW",
    rating: 5,
    text: "Duże porcje lodów i ciast, bardzo smaczne. Sernik i tiramisu to absolutne hity – polecam każdemu!",
    color: "#7d4a1e",
  },
  {
    author: "Marta S.",
    initials: "MS",
    rating: 3,
    text: "Obsługa miła, ale lody niezjadliwe dla niektórych. Kawa bardzo dobra, ciasta pyszne. Przyjemna atmosfera.",
    color: "#a0622a",
  },
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena: ${rating} z ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-amber-400/30"}`}
        />
      ))}
    </div>
  );
}

export default function Reviews({ theme }: ReviewsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reviews-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".reviews-header", start: "top 85%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".review-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".review-card", start: "top 88%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".rating-bar",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".rating-bar", start: "top 90%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cardBg = theme === "dark" ? "rgba(26,21,16,0.65)" : "rgba(253,248,237,0.85)";
  const cardBorder = theme === "dark" ? "rgba(208,169,106,0.1)" : "rgba(160,98,42,0.12)";

  return (
    <section id="reviews" ref={sectionRef} className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none opacity-[0.04]"
        aria-hidden
        style={{ background: "radial-gradient(ellipse at left center, #c08040, transparent 60%)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="reviews-header text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: theme === "dark" ? "rgba(160,98,42,0.15)" : "rgba(160,98,42,0.1)",
              border: `1px solid ${theme === "dark" ? "rgba(160,98,42,0.3)" : "rgba(160,98,42,0.2)"}`,
            }}
          >
            <span className="text-coffee-400 text-xs font-semibold tracking-wider uppercase">Opinie</span>
          </div>
          <h2
            className={`font-serif text-4xl sm:text-5xl font-bold leading-tight mb-6 ${
              theme === "dark" ? "text-cream-100" : "text-dark-800"
            }`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Co mówią <span className="text-gradient">goście</span>
          </h2>

          {/* Overall rating */}
          <div className="inline-flex flex-col items-center gap-3 p-6 rounded-2xl"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
          >
            <div className={`text-5xl font-bold font-serif ${theme === "dark" ? "text-cream-100" : "text-dark-800"}`}
              style={{ fontFamily: "var(--font-playfair)" }}>
              4.2
            </div>
            <StarRating rating={4} />
            <p className={`text-sm ${theme === "dark" ? "text-cream-400" : "text-dark-400"}`}>
              Średnia z 5 opinii Google
            </p>
            <div className="w-full space-y-1.5 mt-1">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stars === 5 ? 2 : stars === 4 ? 1 : stars === 3 ? 1 : 0;
                const pct = (count / 5) * 100;
                return (
                  <div key={stars} className="flex items-center gap-2 text-xs">
                    <span className={`w-3 text-right ${theme === "dark" ? "text-cream-300" : "text-dark-500"}`}>{stars}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                      style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                      <div
                        className="rating-bar h-full rounded-full origin-left"
                        style={{ width: `${pct}%`, background: "linear-gradient(90deg, #c08040, #e8c99a)" }}
                      />
                    </div>
                    <span className={`w-4 ${theme === "dark" ? "text-cream-400" : "text-dark-400"}`}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.author}
              className="review-card card-hover rounded-2xl p-7 flex flex-col gap-5 cursor-default"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <Quote className="w-6 h-6 text-coffee-400 opacity-60" />
              <p className={`text-base leading-relaxed flex-1 ${theme === "dark" ? "text-cream-200" : "text-dark-600"}`}>
                {review.text}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-cream-50 text-xs font-bold"
                    style={{ background: `linear-gradient(135deg, ${review.color}, #1a1510)` }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${theme === "dark" ? "text-cream-100" : "text-dark-800"}`}>
                      {review.author}
                    </div>
                    <div className={`text-xs ${theme === "dark" ? "text-cream-400" : "text-dark-400"}`}>Gość kawiarni</div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
