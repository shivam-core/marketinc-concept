"use client";

import React, { useRef } from "react";
import { RoughMark, Spark, HandArrow } from "./SketchPrimitives";
import { DesignNoteCard } from "./DesignNotes";
import { motion, useScroll, useReducedMotion } from "motion/react";

interface StopData {
  number: number;
  name: string;
  missingLead?: string;
  whatWeBuild: string;
  serviceHref: string;
  serviceLabel: string;
}

const stops: StopData[] = [
  {
    number: 1,
    name: "Found",
    missingLead: "People search for what you do and find a competitor first.",
    whatWeBuild:
      "Search and social campaigns aimed at people ready to book, plus SEO that keeps working after the ad spend stops.",
    serviceHref: "#services",
    serviceLabel: "Matching services: Google Ads, Meta Ads, SEO",
  },
  {
    number: 2,
    name: "Landed",
    missingLead: "The ad sends them to a home page that talks about everything.",
    whatWeBuild: "A page for each job you want more of, built to load fast on a phone.",
    serviceHref: "#services",
    serviceLabel: "Matching service: Website design",
  },
  {
    number: 3,
    name: "Enquired",
    missingLead:
      "The form is long, the number is hard to find, and nobody knows which ad the call came from.",
    whatWeBuild:
      "A short form, a tap-to-call button, and tracking that ties every enquiry back to its source.",
    serviceHref: "#services",
    serviceLabel: "Matching services: Website design & Tracking",
  },
  {
    number: 4,
    name: "Followed up",
    missingLead:
      "The enquiry sits in an inbox until tonight. By then they\u2019ve booked someone else.",
    whatWeBuild:
      "An instant reply by text and email, a reminder for your team, and a CRM that shows every open lead.",
    serviceHref: "#services",
    serviceLabel: "Matching service: CRM and automation",
  },
  {
    number: 5,
    name: "Booked",
    whatWeBuild: "The job is in the diary. That\u2019s the full stop.",
    serviceHref: "#brief",
    serviceLabel: "The full stop: Book a strategy call",
  },
];

export function SystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll linked animation for the path and dot
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 75%"],
  });

  return (
    <section
      id="system"
      ref={sectionRef}
      aria-labelledby="system-heading"
      className="container-site section-py scroll-mt-24 relative"
    >
      <DesignNoteCard
        number={5}
        title="One system, not five separate services"
        note="Most agencies sell you ads. Ads only do the first part. Leads go missing at every step after that, so we build all five."
        arrowDirection="down-right"
      />

      <div className="max-w-3xl mb-16 lg:mb-20">
        <h2
          id="system-heading"
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4 inline-flex items-center gap-3"
        >
          <span>
            <RoughMark type="circle" color="#8DB7FF" iterations={2}>
              One system
            </RoughMark>
            , not five separate services
          </span>
          <Spark color="sky" />
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          Most agencies sell you ads. Ads only do the first part. Leads go missing at every step after that, so we build all five.
        </p>
      </div>

      {/* The 5 Stops with Winding Path */}
      <div className="relative">
        {/* Desktop central SVG winding line */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-10 bottom-10 -translate-x-1/2 w-24 pointer-events-none z-0"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 96 1000"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Background dashed line */}
            <path
              d="M48 0 C12 100, 84 150, 48 250 C12 350, 84 400, 48 500 C12 600, 84 650, 48 750 C12 850, 84 900, 48 1000"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
            {/* Active solid mint animated path */}
            {!prefersReduced ? (
              <motion.path
                d="M48 0 C12 100, 84 150, 48 250 C12 350, 84 400, 48 500 C12 600, 84 650, 48 750 C12 850, 84 900, 48 1000"
                stroke="#7CC8AE"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                }}
              />
            ) : (
              <path
                d="M48 0 C12 100, 84 150, 48 250 C12 350, 84 400, 48 500 C12 600, 84 650, 48 750 C12 850, 84 900, 48 1000"
                stroke="#7CC8AE"
                strokeWidth="4"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>

        {/* Mobile vertical line on the left */}
        <div
          aria-hidden="true"
          className="md:hidden absolute left-5 top-8 bottom-8 w-1 pointer-events-none z-0"
        >
          <div className="w-full h-full border-l-2 border-dashed border-white/15" />
        </div>

        {/* The 5 Stops */}
        <div className="flex flex-col gap-12 md:gap-16 relative z-10">
          {stops.map((stop, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={stop.number}
                className={`flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-6 md:gap-16`}
              >
                {/* Content Card (Half Width on desktop) */}
                <div
                  className="w-full md:w-[calc(50%-48px)] pl-12 md:pl-0 text-left"
                >
                  <div className="p-6 sm:p-8 rounded-[20px] bg-navy-raised border border-line shadow-lg hover:border-mint/30 transition-colors">
                    {/* Header: Number and Stop Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy-deep border border-line text-mint font-bold text-[0.9375rem] tabular-nums">
                        {stop.number}
                      </span>
                      <h3 className="font-display font-bold text-display-m text-white m-0">
                        {stop.name}
                      </h3>
                    </div>

                    {/* Butter dot line: Where leads go missing */}
                    {stop.missingLead && (
                      <div className="flex items-start gap-3 mb-3 text-[0.9375rem] leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="w-2.5 h-2.5 rounded-full bg-butter flex-shrink-0 mt-1.5"
                        />
                        <p className="text-butter/95 font-medium m-0">
                          {stop.missingLead}
                        </p>
                      </div>
                    )}

                    {/* Mint dot line: What we build */}
                    <div className="flex items-start gap-3 mb-5 text-[0.9375rem] leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="w-2.5 h-2.5 rounded-full bg-mint flex-shrink-0 mt-1.5"
                      />
                      <p className="text-mist font-normal m-0">
                        {stop.whatWeBuild}
                      </p>
                    </div>

                    {/* Handwriting note for Stop 4 */}
                    {stop.number === 4 && (
                      <div className="my-4 p-3 rounded-[12px] bg-navy-deep/80 border border-mint/20 flex items-center gap-2 text-mint select-none">
                        <HandArrow direction="right-down" color="mint" className="w-6 h-6 flex-shrink-0 -rotate-12" />
                        <span className="font-hand text-[22px] leading-tight">
                          most leads are lost right here
                        </span>
                      </div>
                    )}

                    {/* Link to matching service in #services */}
                    <div className="pt-2 border-t border-line/60">
                      <a
                        href={stop.serviceHref}
                        className="inline-flex items-center text-small font-medium text-mint hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
                      >
                        {stop.serviceLabel}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Central Node marker (Desktop) */}
                <div
                  aria-hidden="true"
                  className="hidden md:flex w-24 justify-center items-center flex-shrink-0 self-center"
                >
                  <div className="w-7 h-7 rounded-full bg-navy-deep border-2 border-mint flex items-center justify-center shadow-[0_0_12px_rgba(124,200,174,0.3)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-mint" />
                  </div>
                </div>

                {/* Mobile absolute node marker */}
                <div
                  aria-hidden="true"
                  className="md:hidden absolute left-3 w-5 h-5 rounded-full bg-navy-deep border-2 border-mint flex items-center justify-center mt-6"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                </div>

                {/* Empty opposite column for spacing on desktop */}
                <div className="hidden md:block w-[calc(50%-48px)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
