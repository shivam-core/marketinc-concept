"use client";

import React from "react";
import { Spark, VanDoodle, ToothDoodle, CalculatorDoodle, KeyDoodle } from "./SketchPrimitives";

interface IndustryCardData {
  slug: string;
  name: string;
  text: string;
  tilt: string;
  icon: React.ReactNode;
}

const industryList: IndustryCardData[] = [
  {
    slug: "trades",
    name: "Home and trade services",
    text: "People search when something breaks. The business that answers first usually gets the job. We build for speed.",
    tilt: "-rotate-1",
    icon: <VanDoodle className="w-12 h-12" />,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    text: "Patients choose on trust and convenience. We build clear pages, simple booking, and advertising that stays inside the rules for health services.",
    tilt: "rotate-1",
    icon: <ToothDoodle className="w-12 h-12" />,
  },
  {
    slug: "professional",
    name: "Professional services",
    text: "Clients are choosing a person, not a product. We build credibility first, then make it easy to book a first conversation.",
    tilt: "-rotate-[1.5deg]",
    icon: <CalculatorDoodle className="w-12 h-12" />,
  },
  {
    slug: "finance",
    name: "Finance and investment",
    text: "Longer decisions, more questions. We build education, careful follow-up, and messaging written with compliance in mind.",
    tilt: "rotate-[1.5deg]",
    icon: <KeyDoodle className="w-12 h-12" />,
  },
];

export function IndustriesSection() {
  const handleSeeExample = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    // Dispatch custom event to switch the tab
    window.dispatchEvent(
      new CustomEvent("marketinc-select-industry", { detail: slug })
    );

    // Scroll to the hero demo container smoothly
    const el = document.getElementById("hero-demo-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="container-site section-py scroll-mt-24"
    >
      <div className="max-w-3xl mb-12 lg:mb-16">
        <h2
          id="industries-heading"
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4 inline-flex items-center gap-3"
        >
          <span>Built around how your customers book</span>
          <Spark color="mint" />
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          Different industries lose leads at different points on the line.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
        {industryList.map((item) => (
          <div
            key={item.slug}
            className={`tilt-card rounded-[20px] bg-navy-raised border border-line p-6 sm:p-7 shadow-lg flex flex-col justify-between ${item.tilt}`}
          >
            <div>
              {/* Doodle at top */}
              <div className="mb-5 flex items-center justify-start text-mint">
                {item.icon}
              </div>

              <h3 className="font-display font-bold text-display-m text-white m-0 mb-3">
                {item.name}
              </h3>
              <p className="font-body text-[0.9375rem] text-mist leading-relaxed m-0 mb-6">
                {item.text}
              </p>
            </div>

            <div className="pt-4 border-t border-line/60">
              <a
                href="#hero-demo-container"
                onClick={(e) => handleSeeExample(item.slug, e)}
                className="inline-flex items-center text-small font-medium text-mint hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
              >
                See the example
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
