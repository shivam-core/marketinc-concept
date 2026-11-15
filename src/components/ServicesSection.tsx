"use client";

import React, { useState } from "react";
import { RoughMark, HeadlineSpark, Spark, TapeLabel } from "./SketchPrimitives";

interface ServiceItem {
  id: string;
  tapeLabel: string;
  tapeColor: "mint" | "sky" | "butter";
  title: string;
  promise: string;
  whatYouGet: string[];
  tilt: string;
}

const services: ServiceItem[] = [
  {
    id: "google-ads",
    tapeLabel: "Paid Search",
    tapeColor: "mint",
    title: "Google Ads",
    promise: "High-intent search campaigns designed to capture demand, control spend, and generate qualified enquiries when customers are ready to convert.",
    whatYouGet: [
      "Search campaigns built for high-intent job searches.",
      "Negative keyword lists to eliminate wasted ad budget.",
      "End-to-end call and web form conversion tracking.",
      "Transparent monthly reporting on lead volume and cost-per-lead.",
    ],
    tilt: "-rotate-1",
  },
  {
    id: "meta-ads",
    tapeLabel: "Paid Social",
    tapeColor: "mint",
    title: "Meta Ads",
    promise: "Performance-driven campaigns across Facebook and Instagram, built around clear offers, tested creatives, and continuous optimisation.",
    whatYouGet: [
      "Hyper-local geographic and demographic audience targeting.",
      "Proven ad creatives and compelling service offer angles.",
      "Direct lead generation forms synced instantly with your CRM.",
      "Iterative testing rounds to scale winning ad sets.",
    ],
    tilt: "rotate-1",
  },
  {
    id: "seo",
    tapeLabel: "Organic Search",
    tapeColor: "mint",
    title: "SEO & Local SEO",
    promise: "Compounding organic visibility across Google search, Maps, and Google Business Profile so you show up without paying for every click.",
    whatYouGet: [
      "Google Business Profile setup and local map pack optimisation.",
      "Targeted service and suburb landing page architecture.",
      "Technical fixes and speed optimisations for mobile users.",
      "High-value content tailored to what your customers actively search.",
    ],
    tilt: "-rotate-1",
  },
  {
    id: "website-design",
    tapeLabel: "Web & UX",
    tapeColor: "sky",
    title: "Website Design & Development",
    promise: "High-converting, mobile-optimised websites and landing pages built to turn traffic into qualified phone calls and enquiries.",
    whatYouGet: [
      "Dedicated, focused pages for each core service you offer.",
      "Ultra-fast loading on mobile phones over 4G/5G connections.",
      "Short friction-free forms and prominent tap-to-call buttons.",
      "Full analytics integration to trace every enquiry to its traffic source.",
    ],
    tilt: "rotate-[1.5deg]",
  },
  {
    id: "crm-automation",
    tapeLabel: "Automation",
    tapeColor: "butter",
    title: "CRM + Automation",
    promise: "Lead management systems, CRM setup, and automated follow-ups that reduce missed opportunities and improve conversion rates.",
    whatYouGet: [
      "CRM pipeline custom-configured around your quoting workflow.",
      "Instant automated SMS and email confirmations to new enquiries.",
      "Immediate alert notifications for your team on high-priority leads.",
      "Automated follow-up sequences for quotes that have gone quiet.",
    ],
    tilt: "-rotate-[1.5deg]",
  },
];

export function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="container-site section-py scroll-mt-24"
    >
      <div className="max-w-3xl mb-12 lg:mb-16">
        <h2
          id="services-heading"
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4"
        >
          <RoughMark
            type="circle"
            color="#7CC8AE"
            iterations={2}
            padding={[18, 30]}
            strokeWidth={2.2}
            className="px-2 py-0.5"
          >
            Our services
          </RoughMark>
          , built for{" "}
          <span className="relative inline-block text-butter">
            measurable growth
            <HeadlineSpark
              color="mint"
              className="absolute -top-2.5 sm:-top-3.5 -right-5 sm:-right-8"
            />
          </span>
          .
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          Focused strategies. Measurable outcomes. Scalable growth. Everything we build is designed to drive measurable growth for your business.
        </p>
      </div>

      {/* On Mobile: Clean vertical stack of all 5 services */}
      <div className="flex flex-col md:hidden gap-5">
        {services.map((svc) => (
          <ServiceCard
            key={svc.id}
            service={svc}
            isExpanded={expandedId === svc.id}
            onToggle={() => toggleExpand(svc.id)}
            isMobile
          />
        ))}
      </div>

      {/* On Desktop: 3 + 2 grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {services.slice(0, 3).map((svc) => (
          <ServiceCard
            key={svc.id}
            service={svc}
            isExpanded={expandedId === svc.id}
            onToggle={() => toggleExpand(svc.id)}
          />
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-2 md:max-w-4xl md:mx-auto gap-6 mt-6">
        {services.slice(3, 5).map((svc) => (
          <ServiceCard
            key={svc.id}
            service={svc}
            isExpanded={expandedId === svc.id}
            onToggle={() => toggleExpand(svc.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  isExpanded,
  onToggle,
  isMobile = false,
}: {
  service: ServiceItem;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}) {
  return (
    <div
      className={`tilt-card rounded-[20px] bg-navy-raised border border-line p-5 sm:p-7 shadow-lg w-full md:w-auto flex flex-col justify-between relative ${
        isMobile ? "rotate-0" : service.tilt
      }`}
    >
      {/* Tape label stuck to top-left */}
      <div className="absolute -top-3.5 left-5 z-10">
        <TapeLabel color={service.tapeColor}>
          {service.tapeLabel}
        </TapeLabel>
      </div>

      <div className="pt-3">
        <h3 className="font-display font-bold text-display-m text-white m-0 mb-3">
          {service.title}
        </h3>
        <p className="font-body text-[0.9375rem] text-mist leading-relaxed m-0 mb-6">
          &ldquo;{service.promise}&rdquo;
        </p>
      </div>

      {/* Expandable "What you get" */}
      <div className="pt-4 border-t border-line/60">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`what-you-get-${service.id}`}
          className="w-full flex items-center justify-between text-small font-medium text-mint hover:text-white transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
        >
          <span>What you get</span>
          <span className="text-[1.125rem] leading-none" aria-hidden="true">
            {isExpanded ? "\u2212" : "+"}
          </span>
        </button>

        {isExpanded && (
          <ul
            id={`what-you-get-${service.id}`}
            className="mt-4 space-y-2 font-body text-[0.875rem] text-mist/90 pl-4 list-disc"
          >
            {service.whatYouGet.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
