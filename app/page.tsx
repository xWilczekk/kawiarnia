"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import SectionNavigator from "@/components/SectionNavigator";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SceneNav from "@/components/SceneNav";

const MenuSection   = dynamic(() => import("@/components/MenuSection"),    { ssr: false });
const AboutReviews  = dynamic(() => import("@/components/AboutReviews"),   { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false });

// Scene map:
//  0 → Hero
//  1 → Menu
//  2 → About + Reviews
//  3 → Contact
const TOTAL_SCENES = 4;

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Cursor />
      <Preloader onComplete={() => setReady(true)} />

      {/* Pre-render under preloader so no content flash on reveal */}
      <SectionNavigator>
        <SceneNav total={TOTAL_SCENES} />
        <Navbar />

        <main style={{ background: "#040302" }}>
          <Hero ready={ready} />
          <MenuSection />
          <AboutReviews />
          <ContactSection />
        </main>

      </SectionNavigator>
    </>
  );
}
