"use client";

import React, { useState, useEffect } from "react";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { LeadLineDemo } from "./LeadLineDemo";
import { DesignNoteCard } from "./DesignNotes";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
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
      className="container-site pt-8 pb-16 lg:pt-16 lg:pb-24 flex flex-col justify-between min-h-[min(100svh-80px,960px)]"
    >
      <DesignNoteCard
        number={1}
        title="Says who it's for in five seconds"
        note="The current headline could belong to any agency. This one names the outcome a service business owner cares about, and the line beside it names the audience."
      />

      {/* Top half: H1, supporting line, buttons */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 lg:mb-16">
        {/* Columns 1-8: H1 */}
        <div className="lg:col-span-7 xl:col-span-8">
          <h1 className="text-display-xl text-ink font-bold tracking-[-0.03em] leading-[0.95]">
            <span className="block">More booked</span>
            <span className="relative inline-block">
              <span>jobs</span>
              {/* Semantic full stop for AT */}
              <span className="sr-only">.</span>
              {/* Static visual mint full stop */}
              <span
                aria-hidden="true"
                className="inline-block w-[0.22em] h-[0.22em] rounded-full bg-dot ml-[0.05em] align-baseline translate-y-[-0.05em]"
              />

              {/* Detaching mint dot for the one orchestrated moment on load */}
              {hasStarted && !prefersReduced && (
                <motion.span
                  aria-hidden="true"
                  className="absolute right-0 top-0 w-[0.22em] h-[0.22em] rounded-full bg-dot pointer-events-none"
                  initial={{ x: "0%", y: "0%", opacity: 1, scale: 1 }}
                  animate={{
                    x: ["0%", "40%", "80%"],
                    y: ["0%", "-40%", "120%"],
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
          </h1>
        </div>

        {/* Columns 8-12 on desktop: Supporting text & Buttons */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:pb-2">
          <p className="font-body text-body-l text-ink-soft leading-[1.45] prose-max m-0">
            Marketing for service businesses. We build the whole path from the first search to a job in the diary.
          </p>

          <DesignNoteCard
            number={2}
            title="One action, one name"
            note="The current site uses five labels for the same thing. Here it is always 'Book a strategy call', plus a phone number for people who would rather ring."
          />

          <div className="flex flex-wrap items-center gap-4">
            <PrimaryButton href="/brief">Book a strategy call</PrimaryButton>
            <SecondaryButton href="tel:+61450406450">
              Call 0450 406 450
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Bottom half: Lead Line Demo */}
      <div className="w-full">
        <DesignNoteCard
          number={3}
          title="Show the system instead of describing it"
          note="The current site says 'integrated systems' beside a photo of a building. This shows one lead becoming one booked job, in the visitor's own industry."
        />
        <LeadLineDemo />
      </div>
    </section>
  );
}
