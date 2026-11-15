import React from "react";
import { ScallopedBadge, PhoneDoodle, MagnifierDoodle, DiaryDoodle } from "./SketchPrimitives";
import { DesignNoteCard } from "./DesignNotes";

export function FactsSection() {
  return (
    <section aria-label="Core pillars of MarketInc" className="container-site py-12 lg:py-16 border-t border-line">
      <DesignNoteCard
        number={4}
        title="Service-focused growth"
        note="MarketInc works exclusively with service businesses, building integrated systems across search, social, web, and CRM."
        arrowDirection="down-right"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
        {/* Fact 1: Service-Focused */}
        <div className="flex flex-col gap-3 p-6 rounded-[20px] bg-navy-raised/60 border border-line/60">
          <div className="flex items-center gap-3">
            <ScallopedBadge color="mint">
              <PhoneDoodle className="w-10 h-10" />
            </ScallopedBadge>
            <h3 className="font-display font-bold text-[1.25rem] text-white m-0">
              Service-Focused
            </h3>
          </div>
          <p className="font-body text-[0.9375rem] text-mist leading-relaxed m-0">
            We work exclusively with service-based businesses. Strategies built around real customer behaviour, local demand, and lead-driven growth.
          </p>
        </div>

        {/* Fact 2: Integrated Systems */}
        <div className="flex flex-col gap-3 p-6 rounded-[20px] bg-navy-raised/60 border border-line/60">
          <div className="flex items-center gap-3">
            <ScallopedBadge color="sky">
              <MagnifierDoodle className="w-10 h-10" />
            </ScallopedBadge>
            <h3 className="font-display font-bold text-[1.25rem] text-white m-0">
              Integrated Systems
            </h3>
          </div>
          <p className="font-body text-[0.9375rem] text-mist leading-relaxed m-0">
            Growth doesn&apos;t come from one channel alone. Your website, ads, SEO, and CRM work together to attract leads and improve conversion.
          </p>
        </div>

        {/* Fact 3: Proven Results */}
        <div className="flex flex-col gap-3 p-6 rounded-[20px] bg-navy-raised/60 border border-line/60">
          <div className="flex items-center gap-3">
            <ScallopedBadge color="butter">
              <DiaryDoodle className="w-10 h-10" />
            </ScallopedBadge>
            <h3 className="font-display font-bold text-[1.25rem] text-white m-0">
              Proven Results
            </h3>
          </div>
          <p className="font-body text-[0.9375rem] text-mist leading-relaxed m-0">
            Shaped by real campaigns and data. We focus on what consistently delivers results over time, not trends or vanity metrics.
          </p>
        </div>
      </div>
    </section>
  );
}
