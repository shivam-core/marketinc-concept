"use client";

import React, { useEffect, useRef, useState } from "react";
import { annotate } from "rough-notation";

// ── 6.1 Annotation mark wrapper ──
interface RoughMarkProps {
  children: React.ReactNode;
  type: "underline" | "circle";
  color: string;
  iterations?: number;
  strokeWidth?: number;
  padding?: number | [number, number] | [number, number, number, number];
  className?: string;
}

export function RoughMark({
  children,
  type,
  color,
  iterations = 1,
  strokeWidth = 2.2,
  padding,
  className = "",
}: RoughMarkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  // Default padding: generous for circles so words are completely unobstructed and readable
  const circleDefault: [number, number] = [18, 30];
  const resolvedPadding: number | [number, number] | [number, number, number, number] =
    padding !== undefined
      ? padding
      : type === "circle"
      ? circleDefault
      : 4;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const annotation = annotate(el, {
      type,
      color,
      iterations,
      strokeWidth,
      padding: resolvedPadding,
      animationDuration: prefersReduced ? 0 : 700,
    });

    annotation.show();

    return () => {
      annotation.remove();
    };
  }, [inView, type, color, iterations, strokeWidth, resolvedPadding]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
    </span>
  );
}

// ── 6.2 Sparks, arrows, squiggles ──

/**
 * HeadlineSpark: Three continuous, radiating curved strokes fanning out at the
 * top-right corner of headline accent words (inspired by Metro Media House).
 */
export function HeadlineSpark({
  color = "mint",
  className = "",
}: {
  color?: "mint" | "sky" | "butter" | "white";
  className?: string;
}) {
  const strokeColor =
    color === "mint"
      ? "var(--mint)"
      : color === "sky"
      ? "var(--sky)"
      : color === "butter"
      ? "var(--butter)"
      : "#FFFFFF";

  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className={`inline-block select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Ray 1 (left): graceful upward curve */}
      <path
        d="M6 24 C 7 16, 10 9, 15 3"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Ray 2 (middle): upward-right burst */}
      <path
        d="M16 26 C 20 18, 25 11, 31 5"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Ray 3 (right): outward flare */}
      <path
        d="M21 28 C 26 24, 30 20, 33 17"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Spark: alias to HeadlineSpark for backward compatibility */
export function Spark({
  color = "mint",
  className = "",
}: {
  color?: "mint" | "sky" | "butter" | "white";
  className?: string;
}) {
  return <HeadlineSpark color={color} className={className} />;
}

/** Loose curved hand-drawn arrow */
export function HandArrow({
  direction = "down-right",
  color = "mint",
  className = "",
}: {
  direction?: "down-right" | "down-left" | "right-down" | "up-right";
  color?: "mint" | "sky" | "butter" | "white" | "navy";
  className?: string;
}) {
  const strokeColor =
    color === "mint"
      ? "var(--mint)"
      : color === "sky"
      ? "var(--sky)"
      : color === "butter"
      ? "var(--butter)"
      : color === "navy"
      ? "var(--navy)"
      : "#FFFFFF";

  if (direction === "down-right") {
    return (
      <svg
        width="44"
        height="36"
        viewBox="0 0 44 36"
        fill="none"
        className={`inline-block select-none pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <path
          d="M4 6C14 5 28 10 36 26"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M26 26C31 27 36 26 36 26L35 17"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === "down-left") {
    return (
      <svg
        width="44"
        height="36"
        viewBox="0 0 44 36"
        fill="none"
        className={`inline-block select-none pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <path
          d="M40 6C30 5 16 10 8 26"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M18 26C13 27 8 26 8 26L9 17"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="40"
      height="30"
      viewBox="0 0 40 30"
      fill="none"
      className={`inline-block select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M6 10C16 12 28 14 34 22"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 23L34 22L33 14"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Squiggle: loopy divider line between sections */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center py-8 select-none ${className}`}>
      <svg
        width="140"
        height="24"
        viewBox="0 0 140 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 12C14 4 22 20 32 12C42 4 50 20 60 12C70 4 78 20 88 12C98 4 106 20 116 12C124 6 130 14 136 12"
          stroke="var(--sky)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// ── 6.5 Scalloped Badge (12 scallops) ──
export function ScallopedBadge({
  color = "mint",
  children,
  className = "",
}: {
  color?: "mint" | "sky" | "butter";
  children: React.ReactNode;
  className?: string;
}) {
  const fillColor =
    color === "mint"
      ? "var(--mint)"
      : color === "sky"
      ? "var(--sky)"
      : "var(--butter)";

  return (
    <div className={`relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 ${className}`}>
      {/* 12-scallop flower background rotating slowly (1 turn / 30s) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full animate-badge-spin"
        aria-hidden="true"
      >
        <path
          fill={fillColor}
          d="M50 0 
             C56 0 60 7 65 9 
             C71 11 77 11 81 16 
             C85 20 86 26 89 31 
             C92 36 98 40 99 46 
             C100 52 96 58 95 64 
             C94 70 95 77 91 82 
             C87 87 80 88 75 92 
             C70 95 65 100 59 100 
             C53 100 48 95 42 94 
             C36 93 29 95 24 91 
             C19 87 18 80 14 75 
             C11 70 4 66 2 60 
             C1 54 5 48 5 42 
             C5 36 1 30 4 24 
             C8 19 15 18 19 14 
             C24 10 28 3 34 2 
             C40 0 44 0 50 0 Z"
        />
      </svg>
      {/* Content inside badge (in Navy) */}
      <div className="relative z-10 text-navy flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// ── Tape Label ──
export function TapeLabel({
  children,
  color = "mint",
  tilt = "none",
  className = "",
}: {
  children: React.ReactNode;
  color?: "mint" | "sky" | "butter";
  tilt?: "-3" | "-1.5" | "1.5" | "2" | "3" | "none";
  className?: string;
}) {
  const bg =
    color === "mint"
      ? "bg-mint text-navy"
      : color === "sky"
      ? "bg-sky text-navy"
      : "bg-butter text-navy";

  const tiltClass =
    tilt === "-3"
      ? "-rotate-3"
      : tilt === "-1.5"
      ? "-rotate-[1.5deg]"
      : tilt === "1.5"
      ? "rotate-[1.5deg]"
      : tilt === "2"
      ? "rotate-2"
      : tilt === "3"
      ? "rotate-3"
      : "";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-[6px] font-display font-bold text-[0.875rem] select-none shadow-sm ${bg} ${tiltClass} ${className}`}
    >
      {children}
    </span>
  );
}

// ── Sticky Note ──
export function StickyNote({
  children,
  color = "butter",
  tilt = "-2",
  className = "",
}: {
  children: React.ReactNode;
  color?: "butter" | "sky" | "mint";
  tilt?: "-3" | "-2" | "2" | "3";
  className?: string;
}) {
  const bg =
    color === "butter"
      ? "bg-butter text-navy"
      : color === "sky"
      ? "bg-sky text-navy"
      : "bg-mint text-navy";

  const tiltClass =
    tilt === "-3"
      ? "-rotate-3"
      : tilt === "-2"
      ? "-rotate-2"
      : tilt === "2"
      ? "rotate-2"
      : "rotate-3";

  return (
    <div
      className={`tilt-card rounded-[4px] p-6 shadow-md select-none ${bg} ${tiltClass} ${className}`}
    >
      {children}
    </div>
  );
}

// ── 6.4 Doodles (Line doodles as inline SVG, 2.5px white stroke, off-register pastel shape) ──

/** 1. Tradie's van */
export function VanDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="72"
      height="52"
      viewBox="0 0 72 52"
      fill="none"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      {/* Pastel off-register background blob */}
      <rect x="7" y="11" width="52" height="26" rx="4" fill="var(--mint)" opacity="0.35" />
      {/* White line van */}
      <path
        d="M6 34V16C6 14 7 13 9 13H42V34H6Z"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 19H55L64 28V34H42V19Z"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Front window */}
      <path
        d="M46 22H53L59 28H46V22Z"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="19" cy="36" r="6" stroke="#FFFFFF" strokeWidth="2.5" fill="var(--navy)" />
      <circle cx="51" cy="36" r="6" stroke="#FFFFFF" strokeWidth="2.5" fill="var(--navy)" />
    </svg>
  );
}

/** 2. Tap with a drip */
export function TapDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="36" cy="24" r="14" fill="var(--sky)" opacity="0.35" />
      {/* Pipe and Tap handle */}
      <path d="M12 28H36V38H26V42H22V38" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 16H36" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 16V28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      {/* Water drip */}
      <path d="M24 50C24 50 21 54 21 56C21 57.6 22.3 59 24 59C25.7 59 27 57.6 27 56C27 54 24 50 24 50Z" fill="var(--sky)" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  );
}

/** 3. Tooth */
export function ToothDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="60"
      height="64"
      viewBox="0 0 60 64"
      fill="none"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      <ellipse cx="32" cy="26" rx="16" ry="14" fill="var(--sky)" opacity="0.35" />
      <path
        d="M18 14C12 16 10 24 12 32C14 40 18 54 22 54C26 54 25 42 30 42C35 42 34 54 38 54C42 54 46 40 48 32C50 24 48 16 42 14C36 12 34 16 30 16C26 16 24 12 18 14Z"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 4. Calculator */
export function CalculatorDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="56"
      height="64"
      viewBox="0 0 56 64"
      fill="none"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      <rect x="12" y="10" width="34" height="46" rx="4" fill="var(--butter)" opacity="0.35" />
      <rect x="10" y="8" width="36" height="48" rx="5" stroke="#FFFFFF" strokeWidth="2.5" />
      <rect x="16" y="14" width="24" height="10" rx="2" stroke="#FFFFFF" strokeWidth="2" />
      {/* 4 keypad dots */}
      <circle cx="20" cy="32" r="2" fill="#FFFFFF" />
      <circle cx="28" cy="32" r="2" fill="#FFFFFF" />
      <circle cx="36" cy="32" r="2" fill="#FFFFFF" />
      <circle cx="20" cy="40" r="2" fill="#FFFFFF" />
      <circle cx="28" cy="40" r="2" fill="#FFFFFF" />
      <circle cx="36" cy="40" r="2" fill="#FFFFFF" />
      <circle cx="28" cy="47" r="2" fill="#FFFFFF" />
    </svg>
  );
}

/** 5. House key */
export function KeyDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="14" fill="var(--butter)" opacity="0.35" />
      <circle cx="22" cy="22" r="10" stroke="#FFFFFF" strokeWidth="2.5" />
      <circle cx="22" cy="22" r="4" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M29 29L52 52" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M44 44L48 40" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M49 49L53 45" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** 6. Ringing phone */
export function PhoneDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="26" cy="28" r="14" fill="var(--mint)" opacity="0.35" />
      {/* Phone receiver */}
      <path
        d="M17 19C17 19 19 23 21 23C23 23 24 21 26 22C28 23 33 28 34 30C35 32 33 33 33 35C33 37 37 39 37 39C39 37 42 34 40 30C38 24 32 18 26 16C22 14 19 17 17 19Z"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sound waves */}
      <path d="M37 15C41 19 41 25 39 29" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M43 11C49 17 49 27 45 33" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** 7. Diary page with a tick */
export function DiaryDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="56"
      height="60"
      viewBox="0 0 56 60"
      fill="none"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      <rect x="14" y="10" width="32" height="40" rx="3" fill="var(--butter)" opacity="0.35" />
      <rect x="10" y="8" width="34" height="42" rx="4" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M16 4V10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 4V10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 18H44" stroke="#FFFFFF" strokeWidth="2" />
      {/* Tick mark */}
      <path d="M20 32L26 38L36 26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 8. Magnifying glass */
export function MagnifierDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="25" cy="23" r="14" fill="var(--sky)" opacity="0.35" />
      <circle cx="23" cy="21" r="12" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M32 30L47 45" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
