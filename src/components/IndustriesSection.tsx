"use client";

import React from "react";
import { HeadlineSpark, Spark, VanDoodle, ToothDoodle, CalculatorDoodle, KeyDoodle } from "./SketchPrimitives";

interface IndustryCardData {
  slug: string;
  name: string;
  text: string;
  icon: React.ReactNode;
}

const industryList: IndustryCardData[] = [
  {
    slug: "trades",
    name: "Home & Trade Services",
    text: "We help service-based businesses strengthen their local presence, attract high-intent customers, and convert enquiries consistently.",
    icon: <VanDoodle className="w-12 h-12" />,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    text: "Strategic digital marketing solutions focused on trust, compliance, and attracting the right audience.",
    icon: <ToothDoodle className="w-12 h-12" />,
  },
  {
    slug: "professional",
    name: "Professional Services",
    text: "Authority-driven marketing designed to build credibility and generate high-quality enquiries.",
    icon: <CalculatorDoodle className="w-12 h-12" />,
  },
  {
    slug: "finance",
    name: "Finance & Investment",
    text: "Compliance-aware digital strategies that support education, trust-building, and long-term growth.",
    icon: <KeyDoodle className="w-12 h-12" />,
  },
];

export function IndustriesSection() {
  const handleSeeExample = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("marketinc-select-industry", { detail: slug })
    );

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
        <span className="block text-mist text-[0.875rem] font-medium tracking-wide uppercase mb-3">
          Industries we serve
        </span>
        <h2
          id="industries-heading"
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4"
        >
          Built for industries that need{" "}
          <span className="relative inline-block text-butter">
            consistent leads
            <HeadlineSpark
              color="mint"
              className="absolute -top-2.5 sm:-top-3.5 -right-5 sm:-right-8"
            />
          </span>
          , not just visibility.
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          No matter the size of your business or industry, we help you generate consistent, qualified enquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
        {industryList.map((item) => (
          <div
            key={item.slug}
            className="rounded-[20px] bg-navy-raised border border-line p-6 sm:p-7 shadow-lg flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-mint/40 hover:shadow-xl"
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
