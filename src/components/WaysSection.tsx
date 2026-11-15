"use client";

import React from "react";
import { HeadlineSpark, Spark, TapeLabel } from "./SketchPrimitives";

const processSteps = [
  {
    num: "01",
    title: "Discovery & Research",
    desc: "We start by understanding your business, goals, and current performance. Analysing your market, competitors, customer behaviour, and existing data to identify where the biggest growth opportunities lie.",
  },
  {
    num: "02",
    title: "Strategy & Funnel Planning",
    desc: "Using insights from discovery, we design a tailored growth strategy and funnel. Defining the right channels, messaging, offers, and conversion paths needed to guide leads from first click to enquiry.",
  },
  {
    num: "03",
    title: "Build, Launch & Track",
    desc: "We build and launch the required assets — campaigns, landing pages, tracking, and CRM integrations. Everything is set up to capture, track, and measure leads accurately from day one.",
  },
  {
    num: "04",
    title: "Optimise & Scale Performance",
    desc: "Once live, we monitor performance across channels and optimise continuously. By doubling down on what works, we scale results while maintaining lead quality and cost control over time.",
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
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4"
        >
          Two ways to{" "}
          <span className="relative inline-block text-butter">
            work with us
            <HeadlineSpark
              color="mint"
              className="absolute -top-3.5 -right-7 sm:-right-8 w-7 h-7 sm:w-8 sm:h-8"
            />
          </span>
          .
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          Scaling a service business requires more than running ads or redesigning a website. We partner with you to deliver consistent, measurable results.
        </p>
      </div>

      {/* Two Large Cards side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16 lg:mb-20">
        {/* Card 1: End-to-End */}
        <div className="tilt-card -rotate-1 rounded-[24px] bg-navy-raised border border-line p-7 sm:p-9 shadow-xl relative">
          <div className="absolute -top-3.5 left-6 z-10">
            <TapeLabel color="mint">End-to-End</TapeLabel>
          </div>

          <div className="pt-2">
            <h3 className="font-display font-bold text-display-m text-white m-0 mb-3">
              Full growth system management
            </h3>
            <p className="font-body text-[1rem] text-mist leading-relaxed m-0 mb-6">
              We manage your entire growth system end-to-end — from ads and SEO to web design and CRM.
            </p>

            <ul className="space-y-3 font-body text-[0.9375rem] text-white/90 pt-4 border-t border-line/60">
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-mint" />
                <span>Strategy, design, and performance marketing working as one.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-mint" />
                <span>Single dedicated growth partner for your business.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-mint" />
                <span>Clear monthly reporting on leads, revenue, and ROI.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Collaborative */}
        <div className="tilt-card rotate-1 rounded-[24px] bg-navy-raised border border-line p-7 sm:p-9 shadow-xl relative">
          <div className="absolute -top-3.5 left-6 z-10">
            <TapeLabel color="sky">Collaborative</TapeLabel>
          </div>

          <div className="pt-2">
            <h3 className="font-display font-bold text-display-m text-white m-0 mb-3">
              Collaborate with your existing team
            </h3>
            <p className="font-body text-[1rem] text-mist leading-relaxed m-0 mb-6">
              We slot in beside your in-house people and existing partners to strengthen specific channels and conversion paths.
            </p>

            <ul className="space-y-3 font-body text-[0.9375rem] text-white/90 pt-4 border-t border-line/60">
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-sky" />
                <span>Targeted expertise for the channels where leads feel stuck.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-sky" />
                <span>Integrated into your existing software and workflows.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-sky" />
                <span>Transparent collaboration and knowledge sharing.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Process: 4 steps on one hand-drawn line */}
      <div className="pt-8">
        <h3 className="font-display font-bold text-display-m text-white m-0 mb-2">
          A proven process to build and scale lead generation systems
        </h3>
        <p className="font-body text-[0.9375rem] text-mist leading-relaxed m-0 mb-8 max-w-2xl">
          We follow a clear, structured approach to plan, build, and optimise systems that deliver consistent, measurable results.
        </p>

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
                    {step.title}
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
