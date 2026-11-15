"use client";

import React, { useState } from "react";
import { Spark } from "./SketchPrimitives";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What kind of businesses do you work with?",
    answer:
      "Service businesses. Mostly home and trade services, healthcare, professional services, and finance.",
  },
  {
    id: "faq-2",
    question: "Do you manage everything, or work with our existing team?",
    answer:
      "Either. We can run the whole system end to end, or work alongside your team and the partners you already have.",
  },
];

export function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0].id]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="container-site section-py scroll-mt-24"
    >
      <div className="max-w-3xl mb-12 lg:mb-16">
        <h2
          id="faq-heading"
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4 inline-flex items-center gap-3"
        >
          <span>Questions</span>
          <Spark color="sky" />
        </h2>
      </div>

      <div className="max-w-3xl space-y-4">
        {faqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);

          return (
            <div
              key={faq.id}
              className="rounded-[16px] bg-navy-raised border border-line overflow-hidden transition-colors"
            >
              <button
                type="button"
                id={`btn-${faq.id}`}
                aria-expanded={isOpen}
                aria-controls={`panel-${faq.id}`}
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between text-left p-6 sm:p-7 font-display font-bold text-[1.125rem] sm:text-[1.25rem] text-white hover:text-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              >
                <span>{faq.question}</span>
                <span
                  className="w-8 h-8 rounded-full bg-navy-deep border border-line flex items-center justify-center text-mint flex-shrink-0 ml-4 font-mono text-lg"
                  aria-hidden="true"
                >
                  {isOpen ? "\u2212" : "+"}
                </span>
              </button>

              {isOpen && (
                <div
                  id={`panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`btn-${faq.id}`}
                  className="px-6 pb-6 sm:px-7 sm:pb-7 font-body text-[1rem] text-mist leading-relaxed border-t border-line/40 pt-4"
                >
                  <p className="m-0">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
