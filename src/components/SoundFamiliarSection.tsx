import React from "react";
import { HeadlineSpark, StickyNote } from "./SketchPrimitives";
import { DesignNoteCard } from "./DesignNotes";

const painPoints = [
  {
    note: "We get clicks. The phone still doesn\u2019t ring.",
    fix: "Fixed at stop 2: a page built for that one job",
    tilt: "-rotate-2",
  },
  {
    note: "No idea which ad that call came from.",
    fix: "Fixed at stop 3: tracking on every enquiry",
    tilt: "rotate-[2.5deg]",
  },
  {
    note: "Someone filled in the form on Friday. We saw it Monday.",
    fix: "Fixed at stop 4: an instant reply",
    tilt: "-rotate-[1.5deg]",
  },
  {
    note: "We sent the quote and never heard back.",
    fix: "Fixed at stop 4: automatic follow-ups",
    tilt: "rotate-2",
  },
];

export function SoundFamiliarSection() {
  return (
    <section aria-labelledby="sound-familiar-heading" className="container-site section-py">
      <DesignNoteCard
        number={6}
        title="Problems in the owner's own words"
        note="The sticky notes say what a business owner would say out loud. Each one points to the step that fixes it."
        arrowDirection="down-right"
      />

      <div className="max-w-3xl mb-12 lg:mb-16">
        <h2
          id="sound-familiar-heading"
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4"
        >
          Does this{" "}
          <span className="relative inline-block text-butter">
            sound familiar?
            <HeadlineSpark
              color="mint"
              className="absolute -top-3.5 -right-7 sm:-right-8 w-7 h-7 sm:w-8 sm:h-8"
            />
          </span>
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          Four places service businesses lose leads.
        </p>
      </div>

      {/* Four butter sticky notes, tilted, loose staggered row on desktop / 2x2 grid on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start">
        {painPoints.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div
              className={`tilt-card rounded-[4px] bg-butter text-navy p-6 shadow-md select-none min-h-[170px] flex flex-col justify-between ${item.tilt}`}
            >
              <p className="font-hand text-[26px] font-semibold text-navy leading-[1.2] m-0">
                &ldquo;{item.note}&rdquo;
              </p>
            </div>
            <p className="font-body text-[0.875rem] text-mist leading-normal m-0 px-1">
              {item.fix}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
