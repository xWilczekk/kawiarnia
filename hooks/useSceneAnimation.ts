/**
 * Hook for scene-based animation.
 * Calls `enter()` when the scene receives a scene-enter event,
 * calls `leave()` (optional) when leaving, for reset.
 *
 * The `enter` callback is called once per scene arrival —
 * no scroll scrub, no partial reveals.
 */

import { useEffect, useRef } from "react";

interface Options {
  sceneIndex: number;
  enter: () => void;
  leave?: () => void;
  /** Fire `enter` immediately on mount (for scene 0 / hero) */
  immediate?: boolean;
}

export function useSceneAnimation({ sceneIndex, enter, leave, immediate }: Options) {
  const enterRef = useRef(enter);
  const leaveRef = useRef(leave);
  enterRef.current = enter;
  leaveRef.current = leave;

  useEffect(() => {
    if (immediate) {
      // Small delay to let the component mount fully
      const t = setTimeout(() => enterRef.current(), 80);
      return () => clearTimeout(t);
    }

    const onEnter = (e: CustomEvent<{ index: number }>) => {
      if (e.detail.index === sceneIndex) enterRef.current();
    };
    const onLeave = (e: CustomEvent<{ index: number }>) => {
      if (e.detail.index === sceneIndex) leaveRef.current?.();
    };

    window.addEventListener("scene-enter", onEnter as EventListener);
    window.addEventListener("scene-leave", onLeave as EventListener);

    return () => {
      window.removeEventListener("scene-enter", onEnter as EventListener);
      window.removeEventListener("scene-leave", onLeave as EventListener);
    };
  }, [sceneIndex, immediate]);
}
