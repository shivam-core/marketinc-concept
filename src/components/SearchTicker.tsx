"use client";

import React from "react";

const searches = [
  "emergency plumber near me",
  "physio open saturday",
  "small business accountant sydney",
  "mortgage broker refinance",
  "electrician inner west",
  "dentist taking new patients",
  "air con repair today",
  "conveyancer near me",
  "roof leak repair",
  "bookkeeper for tradies",
];

export function SearchTicker() {
  return (
    <div
      aria-label="Popular search queries ticker"
      className="w-full bg-navy-raised py-6 overflow-hidden border-t border-b border-line select-none"
    >
      <div className="relative w-full overflow-hidden">
        {/* Animated marquee row (duplicated for seamless looping) */}
        <div className="animate-ticker flex items-center gap-4">
          {[...searches, ...searches].map((query, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-navy-deep border border-line text-[0.875rem] text-mist whitespace-nowrap shadow-sm hover:border-mint/60 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-mist flex-shrink-0"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="font-body">{query}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-site mt-3 text-left">
        <p className="text-[0.875rem] text-mist m-0">
          Examples of what high-intent service customers search when they are ready to book.
        </p>
      </div>
    </div>
  );
}
