"use client";

import React, { useState } from "react";
import { RoughMark, Spark, TapeLabel } from "./SketchPrimitives";

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
    tapeLabel: "Stop 1",
    tapeColor: "mint",
    title: "Google Ads",
    promise: "Be the first business people see when they search for what you do.",
    whatYouGet: [
      "Campaigns built around the jobs you want more of.",
      "Keywords chosen for intent to book.",
      "Call and form tracking.",
      "Clear monthly reporting.",
    ],
    tilt: "-rotate-1",
  },
  {
    id: "meta-ads",
    tapeLabel: "Stop 1",
    tapeColor: "mint",
    title: "Meta Ads",
    promise: "Reach people in your area before they start searching.",
    whatYouGet: [
      "Facebook and Instagram campaigns.",
      "Offers built for your service area.",
      "Creative tested in rounds.",
      "Lead forms connected to your CRM.",
    ],
    tilt: "rotate-1",
  },
  {
    id: "seo",
    tapeLabel: "Stop 1",
    tapeColor: "mint",
    title: "SEO",
    promise: "Show up without paying for every click.",
    whatYouGet: [
      "Local search and Google Business Profile.",
      "Pages for each service and suburb.",
      "Technical fixes.",
      "Content that answers what customers ask.",
    ],
    tilt: "-rotate-1",
  },
  {
    id: "website-design",
    tapeLabel: "Stops 2 & 3",
    tapeColor: "sky",
    title: "Website design",
    promise: "A site that turns visitors into enquiries, on a phone, in seconds.",
    whatYouGet: [
      "A page per job type.",
      "Fast load on mobile.",
      "Short forms and tap-to-call.",
      "Tracking on every enquiry.",
    ],
    tilt: "rotate-[1.5deg]",
  },
  {
    id: "crm-automation",
    tapeLabel: "Stop 4",
    tapeColor: "butter",
    title: "CRM and automation",
    promise: "Every enquiry answered in minutes, even when you're on the tools.",
    whatYouGet: [
      "CRM set up around how you quote and book.",
      "Instant text and email replies.",
      "Reminders for your team.",
      "Follow-ups for quotes that go quiet.",
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
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4 inline-flex items-center gap-3"
        >
          <span>
            <RoughMark type="circle" color="#7CC8AE" iterations={2}>
              Five
            </RoughMark>{" "}
            services, one line
          </span>
          <Spark color="mint" />
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          Everything we build fits into one continuous path from click to booking.
        </p>
      </div>

      {/* Services Grid (3 then 2 on desktop, horizontal scrolling row with peek on mobile) */}
      <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 snap-x snap-mandatory">
        {/* Top 3 cards */}
        {services.slice(0, 3).map((svc) => (
          <ServiceCard
            key={svc.id}
            service={svc}
            isExpanded={expandedId === svc.id}
            onToggle={() => toggleExpand(svc.id)}
          />
        ))}

        {/* Bottom 2 cards (centred in 3-col on desktop: col-span-1 md:col-start-1 or layout in 2-col wrapper) */}
      </div>

      <div className="flex md:grid md:grid-cols-2 md:max-w-4xl md:mx-auto gap-6 mt-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 snap-x snap-mandatory">
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
}: {
  service: ServiceItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`tilt-card rounded-[20px] bg-navy-raised border border-line p-6 sm:p-7 shadow-lg flex-shrink-0 w-[290px] sm:w-[320px] md:w-auto snap-center flex flex-col justify-between relative ${service.tilt}`}
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
