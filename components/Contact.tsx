"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Clock, Navigation, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  theme: "dark" | "light";
}

const HOURS = [
  { days: "Poniedziałek – Piątek", hours: "10:00 – 19:00" },
  { days: "Sobota", hours: "10:00 – 18:00" },
  { days: "Niedziela", hours: "11:00 – 17:00" },
];

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Świętojańska+80+Wyszków";

export default function Contact({ theme }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-header", start: "top 85%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".contact-card", start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cardBg = theme === "dark" ? "rgba(26,21,16,0.65)" : "rgba(253,248,237,0.85)";
  const cardBorder = theme === "dark" ? "rgba(208,169,106,0.1)" : "rgba(160,98,42,0.12)";
  const iconBg = theme === "dark" ? "rgba(160,98,42,0.15)" : "rgba(160,98,42,0.1)";

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-1/2 h-full pointer-events-none opacity-[0.04]"
        aria-hidden
        style={{ background: "radial-gradient(ellipse at right bottom, #c08040, transparent 60%)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="contact-header text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: theme === "dark" ? "rgba(160,98,42,0.15)" : "rgba(160,98,42,0.1)",
              border: `1px solid ${theme === "dark" ? "rgba(160,98,42,0.3)" : "rgba(160,98,42,0.2)"}`,
            }}
          >
            <span className="text-coffee-400 text-xs font-semibold tracking-wider uppercase">Kontakt</span>
          </div>
          <h2
            className={`font-serif text-4xl sm:text-5xl font-bold leading-tight mb-4 ${
              theme === "dark" ? "text-cream-100" : "text-dark-800"
            }`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Znajdź nas <span className="text-gradient">w Wyszkowie</span>
          </h2>
          <p className={`text-base max-w-lg mx-auto ${theme === "dark" ? "text-cream-300" : "text-dark-500"}`}>
            Zapraszamy do odwiedzenia naszej kawiarni. Czekamy na Ciebie!
          </p>
        </div>

        {/* Info grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {/* Address */}
          <div
            className="contact-card card-hover rounded-2xl p-7 cursor-default"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-coffee-400 mb-4"
              style={{ background: iconBg }}>
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className={`font-semibold text-base mb-2 ${theme === "dark" ? "text-cream-100" : "text-dark-800"}`}>
              Adres
            </h3>
            <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-cream-300" : "text-dark-500"}`}>
              Świętojańska 80
              <br />
              07-200 Wyszków
              <br />
              mazowieckie
            </p>
          </div>

          {/* Phone */}
          <div
            className="contact-card card-hover rounded-2xl p-7"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-coffee-400 mb-4"
              style={{ background: iconBg }}>
              <Phone className="w-5 h-5" />
            </div>
            <h3 className={`font-semibold text-base mb-2 ${theme === "dark" ? "text-cream-100" : "text-dark-800"}`}>
              Telefon
            </h3>
            <a
              href="tel:501445536"
              className="text-sm text-coffee-400 hover:text-coffee-300 font-semibold transition-colors duration-200 cursor-pointer"
            >
              501 445 536
            </a>
            <p className={`text-xs mt-1 ${theme === "dark" ? "text-cream-400" : "text-dark-400"}`}>
              Zapraszamy do kontaktu
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className={`text-xs ${theme === "dark" ? "text-cream-400" : "text-dark-400"}`}>
                Teraz zamknięte · jutro 10:00
              </span>
            </div>
          </div>

          {/* Hours */}
          <div
            className="contact-card card-hover rounded-2xl p-7 sm:col-span-2 lg:col-span-1 cursor-default"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-coffee-400 mb-4"
              style={{ background: iconBg }}>
              <Clock className="w-5 h-5" />
            </div>
            <h3 className={`font-semibold text-base mb-3 ${theme === "dark" ? "text-cream-100" : "text-dark-800"}`}>
              Godziny otwarcia
            </h3>
            <div className="space-y-2">
              {HOURS.map((h) => (
                <div key={h.days} className="flex justify-between items-center gap-4">
                  <span className={`text-xs ${theme === "dark" ? "text-cream-300" : "text-dark-500"}`}>{h.days}</span>
                  <span className={`text-xs font-semibold ${theme === "dark" ? "text-cream-100" : "text-dark-800"}`}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-coffee-500 hover:bg-coffee-400 text-cream-50 font-semibold text-base transition-all duration-300 cursor-pointer shadow-lg hover:shadow-coffee-500/30 hover:shadow-2xl"
          >
            <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            Wyznacz trasę
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
          <a
            href="tel:501445536"
            className={`flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 cursor-pointer ${
              theme === "dark"
                ? "text-cream-200 hover:text-cream-50 bg-white/5 hover:bg-white/8 border border-white/10"
                : "text-dark-600 hover:text-dark-900 bg-black/5 hover:bg-black/8 border border-black/10"
            }`}
          >
            <Phone className="w-4 h-4" />
            Zadzwoń teraz
          </a>
        </div>
      </div>
    </section>
  );
}
