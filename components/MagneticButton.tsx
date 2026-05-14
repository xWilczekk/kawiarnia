"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  strength?: number;
  "data-cursor"?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export default function MagneticButton({
  children,
  className = "",
  style,
  href,
  onClick,
  strength = 0.45,
  "data-cursor": dataCursor,
  onMouseEnter: externalEnter,
  onMouseLeave: externalLeave,
}: MagneticButtonProps) {
  const elRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!elRef.current || !innerRef.current) return;
      const rect = elRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(elRef.current, { x: dx, y: dy, duration: 0.5, ease: "power3.out" });
      gsap.to(innerRef.current, { x: dx * 0.35, y: dy * 0.35, duration: 0.5, ease: "power3.out" });
    },
    [strength]
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      if (!elRef.current || !innerRef.current) return;
      gsap.to(elRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
      gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
      externalLeave?.(e);
    },
    [externalLeave]
  );

  const onMouseEnterHandler = useCallback(
    (e: React.MouseEvent) => {
      externalEnter?.(e);
    },
    [externalEnter]
  );

  const sharedProps = {
    ref: elRef,
    className: `magnetic-btn ${className}`,
    style,
    onMouseMove,
    onMouseLeave,
    onMouseEnter: onMouseEnterHandler,
    "data-magnetic": "true",
    "data-cursor": dataCursor,
  };

  const inner = <span ref={innerRef}>{children}</span>;

  if (href) {
    return (
      <a {...sharedProps} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <button {...sharedProps} onClick={onClick}>
      {inner}
    </button>
  );
}
