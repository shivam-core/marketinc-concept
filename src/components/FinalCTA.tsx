"use client";

import React, { useRef, useState, useEffect } from "react";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { motion, useInView, useReducedMotion } from "motion/react";

interface FinalCTAProps {
  animate?: boolean;
}

export function FinalCTA({ animate = true }: FinalCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(!animate || prefersReduced);

  useEffect(() => {
    if (animate && isInView && !prefersReduced && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [animate, isInView, prefersReduced, hasAnimated]);

  return (
    <section
      ref={ref}
      aria-label="Call to action"
      className="w-full bg-paper border-t border-line py-20 lg:py-32"
    >
      <div className="container-site">
        <div className="max-w-4xl">
          <h2 className="text-display-xl text-ink font-bold tracking-[-0.03em] leading-[0.95] m-0 mb-6">
            <span>Let&rsquo;s find your full stop</span>
            <span className="relative inline-block">
              {/* Semantic dot */}
              <span className="sr-only">.</span>
              {/* Static dot */}
              <span
                aria-hidden="true"
                className="inline-block w-[0.22em] h-[0.22em] rounded-full bg-dot ml-[0.05em] align-baseline translate-y-[-0.05em]"
              />

              {/* Third appearance of the dot: drops into place once, ~500ms when scrolled into view */}
              {animate && isInView && !prefersReduced && (
                <motion.span
                  aria-hidden="true"
                  className="absolute right-0 top-0 w-[0.22em] h-[0.22em] rounded-full bg-dot pointer-events-none"
                  initial={{ y: "-120%", opacity: 0 }}
                  animate={{ y: "0%", opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
            </span>
          </h2>

          <p className="font-body text-body-l text-ink-soft leading-[1.45] m-0 mb-10 max-w-xl">
            Tell us where leads go missing. We reply within one working day.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <PrimaryButton href="/brief">Book a strategy call</PrimaryButton>
            <SecondaryButton href="tel:+61450406450">
              Call 0450 406 450
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
