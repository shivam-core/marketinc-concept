"use client";

import React, { useState } from "react";

const faqs = [
  {
    q: "What kind of businesses do you work with?",
    a: "Service businesses. Mostly home and trade services, healthcare, professional services, and finance.",
    placeholder: false,
  },
  {
    q: "Do you manage everything, or work with our existing team?",
    a: "Either. We can run the whole system end to end, or work alongside your team and the partners you already have.",
    placeholder: false,
  },
  {
    q: "Is there a cost for the first call?",
    a: "[MarketInc to confirm]",
    placeholder: true,
  },
];

export function QuestionsSection() {
  const [openIndex, setOpenIndex] = useState<number>(-1); // All closed by default

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? -1 : idx));
  };

  return (
    <section
      aria-labelledby="questions-heading"
      className="container-site section-py border-t border-line"
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
        <div className="lg:col-span-8">
          <h2
            id="questions-heading"
            className="text-display-l text-ink font-bold tracking-[-0.03em] m-0"
          >
            Questions
          </h2>
        </div>
      </div>

      {/* Accordion List */}
      <div className="border-t border-line divide-y divide-line max-w-3xl">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const panelId = `faq-panel-${idx}`;
          const buttonId = `faq-button-${idx}`;

          return (
            <div key={idx} className="py-6">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 rounded-sm"
              >
                <span className="font-display font-bold text-[1.25rem] text-ink tracking-[-0.03em] group-hover:text-ink/80 transition-colors">
                  {faq.q}
                </span>

                {/* Plus / Minus icon */}
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

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="mt-4 pt-1 transition-opacity duration-200 ease-out"
                >
                  {faq.placeholder ? (
                    <span className="inline-block border-[1.5px] border-dashed border-line rounded-[14px] px-3 py-1 text-[0.875rem] text-ink-soft bg-surface">
                      {faq.a}
                    </span>
                  ) : (
                    <p className="font-body text-[1.0625rem] text-ink-soft leading-relaxed m-0 prose-max">
                      {faq.a}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
