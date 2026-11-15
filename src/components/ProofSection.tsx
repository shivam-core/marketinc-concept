import React from "react";
import { DesignNoteCard } from "./DesignNotes";

export function ProofSection() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="container-site section-py border-t border-line"
    >
      <DesignNoteCard
        number={7}
        title="Named results beat adjectives"
        note="The current testimonials have no name, role or business. Each slot here asks for all three, and each case study asks for one number."
      />

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
        <div className="lg:col-span-8">
          <h2
            id="proof-heading"
            className="text-display-l text-ink font-bold tracking-[-0.03em] m-0"
          >
            Results
          </h2>
        </div>
        <div className="lg:col-span-4 flex items-end">
          <p className="font-body text-body-l text-ink-soft leading-[1.45] prose-max m-0">
            This is where MarketInc&rsquo;s real client results belong. The layout is ready for them.
          </p>
        </div>
      </div>

      {/* Three Case-Study Slots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { industry: "Trade services" },
          { industry: "Healthcare" },
          { industry: "Professional services" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="placeholder-slot p-6 flex flex-col justify-between min-h-[260px]"
          >
            <span className="placeholder-tag text-[0.75rem]">Placeholder</span>

            <div>
              <p className="text-[0.875rem] text-ink-soft m-0 mb-1">
                [{item.industry}]
              </p>
              <p className="font-display font-bold text-[1.125rem] text-ink m-0 mb-6">
                [Client name]
              </p>

              <dl className="space-y-3 m-0 text-[0.875rem]">
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-ink-soft font-normal">The problem</dt>
                  <dd className="col-span-2 text-ink-soft m-0">
                    [One sentence, in the client&rsquo;s words]
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-ink-soft font-normal">What we built</dt>
                  <dd className="col-span-2 text-ink-soft m-0">
                    [Which of the five stops were fixed]
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-ink-soft font-normal">The result</dt>
                  <dd className="col-span-2 text-ink-soft m-0">
                    [One number, with the time period]
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      {/* Two Testimonial Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((idx) => (
          <div
            key={idx}
            className="placeholder-slot p-6 flex flex-col justify-between min-h-[160px]"
          >
            <span className="placeholder-tag text-[0.75rem]">Placeholder</span>

            <div>
              <p className="font-body text-[1rem] text-ink-soft italic leading-relaxed m-0 mb-4">
                &ldquo;[Client quote, two or three sentences.]&rdquo;
              </p>
              <p className="font-body text-[0.875rem] text-ink-soft m-0">
                [Full name], [Role], [Business name]
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
