"use client";

/**
 * Scene-based navigation system.
 *
 * Philosophy: scroll = discrete navigation between scenes.
 * Each [data-scene] element is a full-viewport scene.
 * One wheel tick → one scene transition → animation plays on arrive.
 * No scrub. No partial reveals.
 */

import {
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// ─── Types ───────────────────────────────────────────────
export type SceneEnterEvent = CustomEvent<{ index: number }>;
export type SceneLeaveEvent = CustomEvent<{ index: number }>;

declare global {
  interface WindowEventMap {
    "scene-enter": SceneEnterEvent;
    "scene-leave": SceneLeaveEvent;
    "scene-change": CustomEvent<{ index: number; total: number }>;
  }
  interface Window {
    __goToScene?: (index: number) => void;
  }
}

// ─── Context ─────────────────────────────────────────────
interface NavCtx {
  goTo: (index: number) => void;
}
const Ctx = createContext<NavCtx>({ goTo: () => {} });
export const useSceneNav = () => useContext(Ctx);

// ─── Component ───────────────────────────────────────────
export default function SectionNavigator({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentIdx = useRef(0);
  const navigating = useRef(false);
  const lastWheelTime = useRef(0);

  const getScenes = useCallback(
    () => Array.from(document.querySelectorAll<HTMLElement>("[data-scene]")),
    []
  );

  const goTo = useCallback(
    (index: number) => {
      const scenes = getScenes();
      if (index < 0 || index >= scenes.length) return;
      if (navigating.current) return;
      if (index === currentIdx.current && index !== 0) return;

      const prev = currentIdx.current;
      currentIdx.current = index;
      navigating.current = true;

      // Notify old scene
      window.dispatchEvent(
        new CustomEvent("scene-leave", { detail: { index: prev } })
      );

      gsap.to(window, {
        scrollTo: { y: scenes[index].offsetTop, autoKill: false },
        duration: 1.1,
        ease: "power4.inOut",
        overwrite: true,
        onComplete: () => {
          navigating.current = false;
          // Notify new scene — animations fire here
          window.dispatchEvent(
            new CustomEvent("scene-enter", { detail: { index } })
          );
          window.dispatchEvent(
            new CustomEvent("scene-change", {
              detail: { index, total: scenes.length },
            })
          );
        },
      });
    },
    [getScenes]
  );

  useEffect(() => {
    // Fire first scene enter immediately (hero plays on load via its own timeline)
    window.__goToScene = goTo;

    const THROTTLE_MS = 1150; // slightly longer than scroll duration

    // ── Wheel ──────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime.current < THROTTLE_MS) return;
      if (Math.abs(e.deltaY) < 8) return;
      lastWheelTime.current = now;
      goTo(currentIdx.current + (e.deltaY > 0 ? 1 : -1));
    };

    // ── Keyboard ───────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key))
        goTo(currentIdx.current + 1);
      if (["ArrowUp", "PageUp"].includes(e.key)) goTo(currentIdx.current - 1);
    };

    // ── Touch ──────────────────────────────────────────
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 55) goTo(currentIdx.current + (dy > 0 ? 1 : -1));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      delete window.__goToScene;
    };
  }, [goTo]);

  return <Ctx.Provider value={{ goTo }}>{children}</Ctx.Provider>;
}
