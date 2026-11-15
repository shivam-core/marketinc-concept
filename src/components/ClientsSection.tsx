import React from "react";
import { DesignNoteCard } from "./DesignNotes";

export function ClientsSection() {
  return (
    <section
      aria-label="Who we work with"
      className="w-full border-t border-line border-b border-line py-12 lg:py-16"
    >
      <div className="container-site">
        <DesignNoteCard
          number={4}
          title="Proof belongs above everything else"
          note="There are no client names or results on the current home page. These slots show where they should go."
        />

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-baseline mb-8">
          <div className="lg:col-span-6">
            <h2 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0">
              We only work with service businesses.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="font-body text-body text-ink-soft leading-normal m-0 prose-max">
              Trades, clinics, firms and brokers. Businesses that grow when the phone rings, not when a cart fills up.
            </p>
          </div>
        </div>

        {/* Five placeholder slots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className="placeholder-slot h-20 flex items-center justify-center p-4"
            >
              <span className="font-body text-[0.875rem] text-ink-soft">
                Client logo
              </span>
              <span className="placeholder-tag text-[0.6875rem]">
                Placeholder
              </span>
            </div>
          ))}
        </div>

        <p className="text-small text-ink-soft mt-3 mb-0">
          Placeholder. Real client logos go here.
        </p>
      </div>
    </section>
  );
}
