"use client";

import React, { useState, useEffect } from "react";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { LeadLineDemo } from "./LeadLineDemo";
import { DesignNoteCard } from "./DesignNotes";
import { RoughMark, HandArrow } from "./SketchPrimitives";
import { motion, useReducedMotion } from "motion/react";

interface HeroProps {
  forcedDemoTab?: string;
}

export function Hero({ forcedDemoTab }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const t = setTimeout(() => setHasStarted(true), 600);
    return () => clearTimeout(t);
  }, [prefersReduced]);

  return (
    <section
      aria-label="Hero"
      className="container-site pt-32 sm:pt-36 pb-16 lg:pt-40 lg:pb-24 relative"
    >
      <DesignNoteCard
        number={1}
        title="Predictable outcomes built to scale"
        note="Keeps MarketInc's authentic brand positioning: predictable leads, real growth, and systems built to scale for service businesses."
        arrowDirection="down-right"
      />

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column (7 of 12) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h1 className="text-[clamp(2.25rem,4.5vw,4.25rem)] text-white font-bold tracking-[-0.03em] leading-[1.05] m-0 mb-6 relative">
              <span className="block">Predictable Leads.</span>
              <span className="block">
                <span>Real Growth. Built to </span>
                <span className="relative inline-block whitespace-nowrap">
                  {/* Underline mark under 'Scale' */}
                  <RoughMark type="underline" color="#7CC8AE" iterations={2}>
                    Scale
                  </RoughMark>
                  {/* Screen reader semantic dot */}
                  <span className="sr-only">.</span>
                  {/* Static visual mint full stop */}
                  <span
                    aria-hidden="true"
                    className="inline-block w-[0.22em] h-[0.22em] rounded-full bg-mint ml-[0.05em] align-baseline translate-y-[-0.05em]"
                  />

                  {/* Animated detaching mint dot for the orchestrated moment on load */}
                  {hasStarted && !prefersReduced && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute right-0 top-0 w-[0.22em] h-[0.22em] rounded-full bg-mint pointer-events-none"
                      initial={{ x: "0%", y: "0%", opacity: 1, scale: 1 }}
                      animate={{
                        x: ["0%", "50%", "120%"],
                        y: ["0%", "-30%", "150%"],
                        opacity: [1, 1, 0],
                        scale: [1, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeIn",
                        times: [0, 0.4, 1],
                      }}
                    />
                  )}
                </span>
              </span>
            </h1>

            {/* Supporting text directly from marketinc.com.au */}
            <p className="font-body text-body-l text-mist leading-[1.45] max-w-xl m-0 mb-8">
              We help service businesses scale through strategy-led growth, not just marketing tactics. We build connected systems across websites, SEO, paid ads, and CRM to turn high-intent traffic into qualified enquiries.
            </p>
          </div>

          <DesignNoteCard
            number={2}
            title="One action, one name"
            note="The current site uses five labels for the same thing. Here it is always 'Book a strategy call', plus a phone number for people who would rather ring."
            arrowDirection="down-right"
          />

          {/* Action buttons (id="hero-buttons" for MobileActionBar visibility trigger) */}
          <div id="hero-buttons" className="flex flex-wrap items-center gap-4 pt-2">
            <PrimaryButton href="#brief">Book a strategy call</PrimaryButton>
            <SecondaryButton href="tel:+61450406450">
              Call 0450 406 450
            </SecondaryButton>
          </div>

          {/* Trust Highlights & Core Commitments (balances the 5-card vertical demo) */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-line/60 max-w-xl">
            {/* Quick stats ribbon */}
            <div className="grid grid-cols-3 gap-4 pb-6 border-b border-line/40">
              <div>
                <p className="text-[1.5rem] sm:text-[1.75rem] font-bold text-white tabular-nums m-0">
                  150+
                </p>
                <p className="text-[0.8125rem] text-mist m-0 leading-tight">
                  Service businesses
                </p>
              </div>
              <div>
                <p className="text-[1.5rem] sm:text-[1.75rem] font-bold text-mint tabular-nums m-0">
                  6+ Yrs
                </p>
                <p className="text-[0.8125rem] text-mist m-0 leading-tight">
                  Tested systems
                </p>
              </div>
              <div>
                <p className="text-[1.5rem] sm:text-[1.75rem] font-bold text-white tabular-nums m-0">
                  100%
                </p>
                <p className="text-[0.8125rem] text-mist m-0 leading-tight">
                  Attribution clarity
                </p>
              </div>
            </div>

            {/* 3 Core Assurances */}
            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-mint/15 text-mint flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2.5 6 4.8 8.5 9.5 3.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.9375rem] font-bold text-white m-0">
                    No lock-in contracts
                  </p>
                  <p className="text-[0.875rem] text-mist m-0 leading-relaxed">
                    Month-to-month accountability. We stay because the system consistently fills your job diary.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-mint/15 text-mint flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2.5 6 4.8 8.5 9.5 3.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.9375rem] font-bold text-white m-0">
                    End-to-end attribution
                  </p>
                  <p className="text-[0.875rem] text-mist m-0 leading-relaxed">
                    Every call, form enquiry, and dollar is tied directly back to the keyword and campaign that produced it.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-mint/15 text-mint flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2.5 6 4.8 8.5 9.5 3.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.9375rem] font-bold text-white m-0">
                    Local area protection
                  </p>
                  <p className="text-[0.875rem] text-mist m-0 leading-relaxed">
                    We partner exclusively with one provider per trade per primary service zone in Australia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 of 12): Vertical Lead Line Demo */}
        <div id="hero-demo-container" className="lg:col-span-5 w-full pt-4 lg:pt-0">
          <DesignNoteCard
            number={3}
            title="Show the system instead of describing it"
            note="The current site says 'integrated systems' beside a photo of a building. This shows one lead becoming one booked job, in the visitor's own industry."
            arrowDirection="down-left"
          />
          <LeadLineDemo forcedTab={forcedDemoTab} />
        </div>
      </div>
    </section>
  );
}
