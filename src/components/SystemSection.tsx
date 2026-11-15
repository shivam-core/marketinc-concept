"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { DesignNoteCard } from "./DesignNotes";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface StopData {
  number: number;
  label: string;
  missingText?: string;
  buildText: string;
  links: { name: string; href: string }[];
}

const systemStops: StopData[] = [
  {
    number: 1,
    label: "Found",
    missingText:
      "People search for what you do and find a competitor first.",
    buildText:
      "Search and social campaigns aimed at people ready to book, plus SEO that keeps working after the ad spend stops.",
    links: [
      { name: "Google Ads", href: "/services/google-ads" },
      { name: "Meta Ads", href: "/services/meta-ads" },
      { name: "SEO", href: "/services/seo" },
    ],
  },
  {
    number: 2,
    label: "Landed",
    missingText:
      "The ad sends them to a home page that talks about everything.",
    buildText:
      "A page for each job you want more of, built to load fast on a phone.",
    links: [{ name: "Website design", href: "/services/website-design" }],
  },
  {
    number: 3,
    label: "Enquired",
    missingText:
      "The form is long, the number is hard to find, and nobody knows which ad the call came from.",
    buildText:
      "A short form, a tap-to-call button, and tracking that ties every enquiry back to its source.",
    links: [{ name: "Website design", href: "/services/website-design" }],
  },
  {
    number: 4,
    label: "Followed up",
    missingText:
      "The enquiry sits in an inbox until tonight. By then they\u2019ve booked someone else.",
    buildText:
      "An instant reply by text and email, a reminder for your team, and a CRM that shows every open lead.",
    links: [{ name: "CRM and automation", href: "/services/crm-automation" }],
  },
  {
    number: 5,
    label: "Booked",
    buildText: "The job is in the diary. That\u2019s the full stop.",
    links: [],
  },
];

export function SystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="system-heading"
      className="w-full bg-deep text-white section-py"
    >
      <div className="container-site">
        <DesignNoteCard
          number={5}
          title="Five services in one picture"
          note="SEO and website design are missing from the current services section. Placing every service on one line shows how they connect and why a client needs more than ads."
        />

        {/* Section Heading & Supporting text */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24">
          <div className="lg:col-span-8">
            <h2
              id="system-heading"
              className="text-display-l text-white font-bold tracking-[-0.03em] leading-tight m-0"
            >
              One system, not five separate services
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="font-body text-body-l text-white/70 leading-[1.45] prose-max m-0">
              Most agencies sell you ads. Ads only do the first part. Leads go missing at every step after that, so we build all five.
            </p>
          </div>
        </div>

        {/* The 5 Stops with the Scroll-Linked Dot */}
        <div ref={listRef} className="relative pl-8 md:pl-12 lg:pl-16">
          {/* Vertical Track Base Line */}
          <div
            className="absolute left-[11px] md:left-[19px] top-3 bottom-8 w-[2px] bg-line-dark"
            aria-hidden="true"
          />

          {/* Mint Travelled Line */}
          <motion.div
            className="absolute left-[11px] md:left-[19px] top-3 w-[2px] bg-dot origin-top"
            style={{
              height: prefersReduced ? "100%" : lineHeight,
            }}
            aria-hidden="true"
          />

          {/* The Scroll-Linked Mint Dot (Second appearance of the dot) */}
          <motion.div
            className="absolute left-[5px] md:left-[13px] w-3.5 h-3.5 rounded-full bg-dot shadow-sm"
            style={{
              top: prefersReduced ? "calc(100% - 14px)" : dotTop,
            }}
            aria-hidden="true"
          />

          {/* Stop Rows */}
          <div className="space-y-12 md:space-y-16">
            {systemStops.map((stop) => (
              <div
                key={stop.number}
                className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start pt-1"
              >
                {/* Column 1-4: Stop Number & Name */}
                <div className="lg:col-span-3">
                  <div className="flex items-baseline gap-2">
                    <span className="tabular-nums font-bold text-dot text-[1.25rem]">
                      {stop.number}
                    </span>
                    <span className="font-display font-bold text-white text-[1.5rem] tracking-[-0.03em]">
                      {stop.label}
                    </span>
                  </div>
                </div>

                {/* Column 4-12: The missing lead text & what we build */}
                <div className="lg:col-span-9 grid md:grid-cols-2 gap-6 lg:gap-8">
                  {/* Where leads go missing (amber marker) */}
                  <div>
                    {stop.missingText ? (
                      <div className="flex items-start gap-3">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full bg-leak mt-2 flex-shrink-0"
                          aria-label="Where leads go missing"
                        />
                        <p className="font-body text-[1rem] text-white/70 leading-relaxed m-0">
                          {stop.missingText}
                        </p>
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>

                  {/* What we build (mint marker) */}
                  <div>
                    <div className="flex items-start gap-3">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full bg-dot mt-2 flex-shrink-0"
                        aria-label="What we build"
                      />
                      <div className="space-y-3">
                        <p className="font-body text-[1rem] text-white leading-relaxed m-0">
                          {stop.buildText}
                        </p>

                        {/* Service Links */}
                        {stop.links.length > 0 && (
                          <div className="flex flex-wrap gap-4 pt-1">
                            {stop.links.map((link) => (
                              <Link
                                key={link.name}
                                href={link.href}
                                className="font-body text-[0.9375rem] text-dot underline underline-offset-4 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
