"use client";

import React from "react";
import { HeadlineSpark, TapeLabel } from "./SketchPrimitives";
import { DesignNoteCard } from "./DesignNotes";

export function ResultsSection() {
  return (
    <section aria-labelledby="results-heading" className="container-site section-py">
      <DesignNoteCard
        number={7}
        title="A single honest placeholder"
        note="We have no verified client data for MarketInc. Inventing case studies would be dishonest, so this row marks the space until real numbers can replace it."
        arrowDirection="down-right"
      />

      <div className="max-w-3xl mb-12 lg:mb-16">
        <h2
          id="results-heading"
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4"
        >
          Proven outcomes,{" "}
          <span className="relative inline-block text-butter">
            real results
            <HeadlineSpark
              color="mint"
              className="absolute -top-2.5 sm:-top-3.5 -right-5 sm:-right-8"
            />
          </span>
          .
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          This is where MarketInc&apos;s real client results belong.
        </p>
      </div>

      {/* Three tilted frames with dashed white border like empty photo frames taped to a wall */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {/* Frame 1 */}
        <div className="tilt-card sm:-rotate-2 rotate-0 rounded-[20px] border-2 border-dashed border-white/20 p-6 sm:p-8 flex flex-col justify-between items-center text-center bg-navy-deep/50 shadow-md relative min-h-[180px] sm:min-h-[200px]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <TapeLabel color="butter">Placeholder</TapeLabel>
          </div>
          <div className="my-auto pt-3">
            <p className="font-hand text-[26px] sm:text-[28px] font-semibold text-white/90 leading-tight m-0 mb-2">
              A real result goes here
            </p>
            <p className="font-body text-[0.875rem] text-mist m-0">
              Client, industry, one number, time period.
            </p>
          </div>
        </div>

        {/* Frame 2 */}
        <div className="tilt-card sm:rotate-1 rotate-0 rounded-[20px] border-2 border-dashed border-white/20 p-6 sm:p-8 flex flex-col justify-between items-center text-center bg-navy-deep/50 shadow-md relative min-h-[180px] sm:min-h-[200px]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <TapeLabel color="butter">Placeholder</TapeLabel>
          </div>
          <div className="my-auto pt-3">
            <p className="font-hand text-[26px] sm:text-[28px] font-semibold text-white/90 leading-tight m-0 mb-2">
              A real result goes here
            </p>
            <p className="font-body text-[0.875rem] text-mist m-0">
              Client, industry, one number, time period.
            </p>
          </div>
        </div>

        {/* Frame 3 */}
        <div className="tilt-card sm:-rotate-[1.5deg] rotate-0 rounded-[20px] border-2 border-dashed border-white/20 p-6 sm:p-8 flex flex-col justify-between items-center text-center bg-navy-deep/50 shadow-md relative min-h-[180px] sm:min-h-[200px]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <TapeLabel color="butter">Placeholder</TapeLabel>
          </div>
          <div className="my-auto pt-3">
            <p className="font-hand text-[28px] font-semibold text-white/90 leading-tight m-0 mb-2">
              A real result goes here
            </p>
            <p className="font-body text-[0.875rem] text-mist m-0">
              Client, industry, one number, time period.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
