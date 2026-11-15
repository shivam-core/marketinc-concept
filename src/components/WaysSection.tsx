"use client";

import React from "react";
import { Spark, TapeLabel } from "./SketchPrimitives";

const processSteps = [
  {
    num: 1,
    title: "Discovery",
    desc: "We look at your market, your competitors and your numbers to find where leads are going missing.",
  },
  {
    num: 2,
    title: "Plan",
    desc: "We choose the channels, the offer and the path from first click to enquiry.",
  },
  {
    num: 3,
    title: "Build and launch",
    desc: "Campaigns, pages, tracking and CRM go live, measured from day one.",
  },
  {
    num: 4,
    title: "Optimise",
    desc: "We keep what works, cut what doesn't, and scale without losing lead quality.",
  },
];

export function WaysSection() {
  return (
    <section
      id="ways"
      aria-labelledby="ways-heading"
      className="container-site section-py scroll-mt-24"
    >
      <div className="max-w-3xl mb-12 lg:mb-16">
        <h2
          id="ways-heading"
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4 inline-flex items-center gap-3"
        >
          <span>Two ways to work with us</span>
          <Spark color="sky" />
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          Whether you need a complete outsourced growth team or targeted expertise for your existing setup.
        </p>
      </div>

      {/* Two Large Cards side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16 lg:mb-20">
        {/* Card 1: Done for you */}
        <div className="tilt-card -rotate-1 rounded-[24px] bg-navy-raised border border-line p-7 sm:p-9 shadow-xl relative">
          <div className="absolute -top-3.5 left-6 z-10">
            <TapeLabel color="mint">Done for you</TapeLabel>
          </div>

          <div className="pt-2">
            <h3 className="font-display font-bold text-display-m text-white m-0 mb-3">
              We run the lot
            </h3>
            <p className="font-body text-[1rem] text-mist leading-relaxed m-0 mb-6">
              We build and run your whole lead system, end to end.
            </p>

            <ul className="space-y-3 font-body text-[0.9375rem] text-white/90 pt-4 border-t border-line/60">
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-mint" />
                <span>All five stops.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-mint" />
                <span>One team.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-mint" />
                <span>One monthly report.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Alongside you */}
        <div className="tilt-card rotate-1 rounded-[24px] bg-navy-raised border border-line p-7 sm:p-9 shadow-xl relative">
          <div className="absolute -top-3.5 left-6 z-10">
            <TapeLabel color="sky">Alongside you</TapeLabel>
          </div>

          <div className="pt-2">
            <h3 className="font-display font-bold text-display-m text-white m-0 mb-3">
              We work with your team
            </h3>
            <p className="font-body text-[1rem] text-mist leading-relaxed m-0 mb-6">
              We slot in beside your in-house people and the partners you already have.
            </p>

            <ul className="space-y-3 font-body text-[0.9375rem] text-white/90 pt-4 border-t border-line/60">
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-sky" />
                <span>The stops you need help with.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-sky" />
                <span>Your tools, your team.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-sky" />
                <span>Clear handover.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Process: 4 steps on one hand-drawn line with mint dots */}
      <div className="pt-8">
        <h3 className="font-display font-bold text-display-m text-white m-0 mb-8">
          The four-step process
        </h3>

        <div className="relative">
          {/* Hand-drawn SVG connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-4 left-6 right-6 h-1 pointer-events-none z-0"
          >
            <svg
              className="w-full h-4 overflow-visible"
              viewBox="0 0 1000 16"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 8 Q 250 2, 500 8 T 1000 8"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Process steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step) => (
              <div key={step.num} className="flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-navy-deep border-2 border-mint flex items-center justify-center text-mint font-bold text-[0.875rem] tabular-nums shadow-[0_0_10px_rgba(124,200,174,0.25)]">
                    {step.num}
                  </div>
                  <h4 className="font-display font-bold text-[1.125rem] text-white m-0">
                    {step.title}.
                  </h4>
                </div>
                <p className="font-body text-[0.9375rem] text-mist leading-relaxed m-0">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
