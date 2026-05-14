---
name: project-kawiarnia-u-relkowej
description: Next.js coffee shop website for Kawiarnia U Rełkowej, Wyszków
metadata:
  type: project
---

Premium coffee shop website built with Next.js 16 (App Router), Tailwind CSS v4, GSAP.

**Why:** User requested a modern, premium single-page website for a real coffee shop.

**How to apply:** When making changes, maintain the dark-by-default theme system (`theme` prop threaded through all components), GSAP ScrollTrigger animations, and the color tokens defined in `app/globals.css` (`@theme` block: coffee-*, cream-*, dark-*).

Key files:
- `app/page.tsx` — root page, theme state & toggle
- `app/globals.css` — all Tailwind v4 theme tokens, custom classes
- `app/layout.tsx` — fonts (Inter + Playfair Display), metadata
- `components/Navbar.tsx` — floating pill navbar, theme toggle, mobile menu
- `components/Hero.tsx` — full-screen hero, parallax orbs, GSAP entrance
- `components/About.tsx` — pillars grid, GSAP scroll-trigger
- `components/Menu.tsx` — tabbed menu (kawa/lody/ciasta), animated card swap
- `components/Reviews.tsx` — review cards + rating breakdown bar chart
- `components/Contact.tsx` — address, phone, hours, Google Maps CTA
- `components/Footer.tsx` — minimal footer

Business data:
- Name: Kawiarnia U Rełkowej
- Address: Świętojańska 80, 07-200 Wyszków
- Phone: 501 445 536
- Rating: 4.2 / 5 opinions
- Price range: 20–40 zł/person
- Status at build time: Closed, reopens next day at 10:00
