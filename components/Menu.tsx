"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MenuProps {
  theme: "dark" | "light";
}

const CATEGORIES = [
  {
    id: "kawa",
    label: "Kawa",
    icon: "☕",
    items: [
      { name: "Espresso", desc: "Intensywna, krótka kawa z wysokiej jakości ziaren arabiki", price: "8 zł" },
      { name: "Cappuccino", desc: "Klasyczne cappuccino z aksamitną pianką mleczną", price: "13 zł" },
      { name: "Flat White", desc: "Podwójne espresso z delikatnym mlecznym akcentem", price: "15 zł" },
      { name: "Latte", desc: "Delikatna kawa z dużą porcją spienionego mleka", price: "14 zł" },
      { name: "Cold Brew", desc: "Kawa parzona na zimno przez 18 godzin – łagodna i orzeźwiająca", price: "16 zł" },
      { name: "Drip", desc: "Kawa parzona metodą przelewową – pełna aromatów", price: "12 zł" },
    ],
  },
  {
    id: "lody",
    label: "Lody",
    icon: "🍨",
    items: [
      { name: "Lody waniliowe", desc: "Kremowe lody na naturalnej wanilii Bourbon", price: "10 zł" },
      { name: "Lody czekoladowe", desc: "Intensywny smak belgijskiej ciemnej czekolady", price: "10 zł" },
      { name: "Lody truskawkowe", desc: "Sorbetowe lody z prawdziwych truskawek, bez sztucznych barwników", price: "10 zł" },
      { name: "Lody pistacjowe", desc: "Autentyczna pistacja sycylijska w kremowych lodach", price: "13 zł" },
      { name: "Affogato", desc: "Gałka wanilii zalana podwójnym espresso – włoski klasyk", price: "18 zł" },
      { name: "Deska lodów", desc: "Trzy gałki do wyboru z sosem i bita śmietaną", price: "24 zł" },
    ],
  },
  {
    id: "ciasta",
    label: "Ciasta",
    icon: "🍰",
    items: [
      { name: "Sernik wiedeński", desc: "Kremowy sernik na kruchym spodzie, pieczony według tradycyjnej receptury", price: "16 zł" },
      { name: "Szarlotka", desc: "Domowa szarlotka z cynamonem i skórką cytrynową, ciepła lub zimna", price: "14 zł" },
      { name: "Brownie", desc: "Intensywne czekoladowe brownie z orzechami włoskimi", price: "15 zł" },
      { name: "Tarta cytrynowa", desc: "Kwaskowy krem cytrynowy na maślanym cieście, z bezą", price: "17 zł" },
      { name: "Ciasto marchewkowe", desc: "Wilgotne ciasto z pieczoną marchewką i kremowym serkiem", price: "15 zł" },
      { name: "Tiramisu", desc: "Klasyczne włoskie tiramisu z mascarpone i espresso", price: "19 zł" },
    ],
  },
];

export default function Menu({ theme }: MenuProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("kawa");

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".menu-header", start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".menu-card",
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.07 }
    );
  }, [activeCategory]);

  const activeItems = CATEGORIES.find((c) => c.id === activeCategory)?.items ?? [];

  const cardBg = theme === "dark" ? "rgba(26,21,16,0.6)" : "rgba(253,248,237,0.85)";
  const cardBorder = theme === "dark" ? "rgba(208,169,106,0.1)" : "rgba(160,98,42,0.12)";

  return (
    <section id="menu" ref={sectionRef} className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden
        style={{ background: "radial-gradient(ellipse at 30% 60%, #c08040, transparent 50%)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="menu-header text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: theme === "dark" ? "rgba(160,98,42,0.15)" : "rgba(160,98,42,0.1)",
              border: `1px solid ${theme === "dark" ? "rgba(160,98,42,0.3)" : "rgba(160,98,42,0.2)"}`,
            }}
          >
            <span className="text-coffee-400 text-xs font-semibold tracking-wider uppercase">Menu</span>
          </div>
          <h2
            className={`font-serif text-4xl sm:text-5xl font-bold leading-tight mb-4 ${
              theme === "dark" ? "text-cream-100" : "text-dark-800"
            }`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Nasze <span className="text-gradient">specjalności</span>
          </h2>
          <p className={`text-base max-w-xl mx-auto ${theme === "dark" ? "text-cream-300" : "text-dark-500"}`}>
            Starannie wybrane produkty, przygotowywane z pasją każdego dnia.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-coffee-500 text-cream-50 shadow-lg"
                  : theme === "dark"
                  ? "text-cream-300 hover:text-cream-50 hover:bg-white/6"
                  : "text-dark-500 hover:text-dark-800 hover:bg-black/6"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeItems.map((item) => (
            <div
              key={item.name}
              className="menu-card card-hover rounded-2xl p-6 cursor-default"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3
                  className={`font-semibold text-base leading-snug ${
                    theme === "dark" ? "text-cream-100" : "text-dark-800"
                  }`}
                >
                  {item.name}
                </h3>
                <span className="flex-shrink-0 px-3 py-1 rounded-xl text-sm font-bold text-coffee-400 bg-coffee-500/10">
                  {item.price}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-cream-300" : "text-dark-500"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Price note */}
        <p className={`text-center mt-10 text-sm ${theme === "dark" ? "text-cream-400" : "text-dark-400"}`}>
          Ceny orientacyjne · Pełne menu dostępne w lokalu · 20–40 zł za osobę
        </p>
      </div>
    </section>
  );
}
