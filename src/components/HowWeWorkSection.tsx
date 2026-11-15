import React from "react";

const steps = [
  {
    number: "01",
    title: "Discovery.",
    description:
      "We look at your market, your competitors and your numbers to find where leads are going missing.",
  },
  {
    number: "02",
    title: "Plan.",
    description:
      "We choose the channels, the offer and the path from first click to enquiry.",
  },
  {
    number: "03",
    title: "Build and launch.",
    description:
      "Campaigns, pages, tracking and CRM go live, measured from day one.",
  },
  {
    number: "04",
    title: "Optimise.",
    description:
      "We keep what works, cut what doesn\u2019t, and scale without losing lead quality.",
  },
];

export function HowWeWorkSection() {
  return (
    <section
      aria-labelledby="how-we-work-heading"
      className="container-site section-py border-t border-line"
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
        <div className="lg:col-span-8">
          <h2
            id="how-we-work-heading"
            className="text-display-l text-ink font-bold tracking-[-0.03em] m-0"
          >
            What working with us looks like
          </h2>
        </div>
      </div>

      {/* Four steps in a single row on desktop, 2x2 tablet, stacked mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col justify-start">
            <span className="tabular-nums font-display font-bold text-ink-soft text-[1.125rem] mb-3">
              {step.number}
            </span>
            <h3 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-2">
              {step.title}
            </h3>
            <p className="font-body text-[1rem] text-ink-soft leading-relaxed m-0 prose-max">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
