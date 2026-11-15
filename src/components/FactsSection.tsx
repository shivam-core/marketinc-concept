import React from "react";
import { ScallopedBadge, PhoneDoodle, MagnifierDoodle, DiaryDoodle } from "./SketchPrimitives";
import { DesignNoteCard } from "./DesignNotes";

export function FactsSection() {
  return (
    <section aria-label="Three facts about MarketInc" className="container-site py-12 lg:py-16 border-t border-line">
      <DesignNoteCard
        number={4}
        title="Honest facts instead of invented numbers"
        note="The page shows three true things about MarketInc. Real results go in one clearly marked section until the team supplies them."
        arrowDirection="down-right"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
        {/* Fact 1: Mint / Ringing phone */}
        <div className="flex items-center md:flex-col md:text-center gap-4 lg:gap-5 p-4 rounded-[16px] bg-navy-raised/50 border border-line/60">
          <ScallopedBadge color="mint">
            <PhoneDoodle className="w-10 h-10" />
          </ScallopedBadge>
          <p className="font-display font-bold text-[1.125rem] sm:text-[1.25rem] text-white m-0">
            Service businesses only
          </p>
        </div>

        {/* Fact 2: Sky / Magnifying glass */}
        <div className="flex items-center md:flex-col md:text-center gap-4 lg:gap-5 p-4 rounded-[16px] bg-navy-raised/50 border border-line/60">
          <ScallopedBadge color="sky">
            <MagnifierDoodle className="w-10 h-10" />
          </ScallopedBadge>
          <p className="font-display font-bold text-[1.125rem] sm:text-[1.25rem] text-white m-0">
            Based in Sydney
          </p>
        </div>

        {/* Fact 3: Butter / Diary with tick */}
        <div className="flex items-center md:flex-col md:text-center gap-4 lg:gap-5 p-4 rounded-[16px] bg-navy-raised/50 border border-line/60">
          <ScallopedBadge color="butter">
            <DiaryDoodle className="w-10 h-10" />
          </ScallopedBadge>
          <p className="font-display font-bold text-[1.125rem] sm:text-[1.25rem] text-white m-0">
            A reply within one working day
          </p>
        </div>
      </div>
    </section>
  );
}
