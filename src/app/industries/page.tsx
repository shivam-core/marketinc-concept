import React from "react";
import { industries } from "@/content/industries";
import { LeadLineDemo } from "@/components/LeadLineDemo";
import { FinalCTA } from "@/components/FinalCTA";

export default function IndustriesPage() {
  return (
    <>
      <div className="container-site py-12 lg:py-20">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <h1 className="text-display-l text-ink font-bold tracking-[-0.03em] leading-tight m-0 mb-4">
            Built around how your customers book
          </h1>
          <p className="font-body text-body-l text-ink-soft leading-[1.45] prose-max m-0">
            Different industries have completely different buying cycles. We adapt the lead system to match how your customers actually decide.
          </p>
        </div>

        {/* Four sections with anchors */}
        <div className="space-y-24">
          {industries.map((ind) => (
            <section
              key={ind.slug}
              id={ind.slug}
              className="scroll-mt-24 border-t border-line pt-12"
            >
              <div className="max-w-2xl mb-8">
                <h2 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-3">
                  {ind.name}
                </h2>
                <p className="font-body text-body-l text-ink-soft leading-[1.45] m-0">
                  {ind.shortText}
                </p>
              </div>

              {/* Lead line demo shown static and complete */}
              <div className="w-full">
                <LeadLineDemo staticMode={true} forcedIndustry={ind.slug} />
              </div>
            </section>
          ))}
        </div>
      </div>

      <FinalCTA animate={false} />
    </>
  );
}
