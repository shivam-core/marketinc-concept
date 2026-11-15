"use client";

import React, { useState } from "react";
import Link from "next/link";
import { industries } from "@/content/industries";
import { DesignNoteCard } from "./DesignNotes";

export function IndustriesSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? -1 : idx));
  };

  return (
    <section
      aria-labelledby="industries-heading"
      className="container-site section-py"
    >
      <DesignNoteCard
        number={6}
        title="Four rows, not four screens"
        note="On a phone, each industry card currently fills most of a screen for two lines of text. An accordion gives the same content in a fraction of the scrolling."
      />

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
        <div className="lg:col-span-8">
          <h2
            id="industries-heading"
            className="text-display-l text-ink font-bold tracking-[-0.03em] m-0"
          >
            Built around how your customers book
          </h2>
        </div>
      </div>

      {/* Accordion Rows */}
      <div className="border-t border-line divide-y divide-line">
        {industries.map((ind, idx) => {
          const isOpen = openIndex === idx;
          const panelId = `industry-panel-${ind.slug}`;
          const buttonId = `industry-button-${ind.slug}`;

          return (
            <div key={ind.slug} className="py-6 lg:py-8">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 rounded-sm"
              >
                <span className="text-display-m text-ink font-bold tracking-[-0.03em] group-hover:text-ink/80 transition-colors">
                  {ind.name}
                </span>

                {/* Hand-written plus/minus icon */}
                <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink flex-shrink-0 ml-4 group-hover:border-ink/40 transition-colors">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="2" y1="7" x2="12" y2="7" />
                    {!isOpen && <line x1="7" y1="2" x2="7" y2="12" />}
                  </svg>
                </span>
              </button>

              {/* Collapsible panel */}
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="mt-4 pt-2 max-w-2xl transition-opacity duration-200 ease-out"
                >
                  <p className="font-body text-body-l text-ink-soft leading-[1.45] m-0 mb-4 prose-max">
                    {ind.shortText}
                  </p>
                  <div>
                    <Link
                      href={`/industries#${ind.slug}`}
                      className="font-body text-[0.9375rem] font-medium text-dot-ink underline underline-offset-4 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      How it works for {ind.name.toLowerCase()}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
