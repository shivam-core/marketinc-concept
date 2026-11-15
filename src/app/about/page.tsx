import React from "react";
import { FinalCTA } from "@/components/FinalCTA";

export default function AboutPage() {
  return (
    <>
      <div className="container-site py-12 lg:py-20">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <h1 className="text-display-l text-ink font-bold tracking-[-0.03em] leading-tight m-0 mb-8">
            We do one thing: lead systems for service businesses
          </h1>

          <div className="space-y-6 text-body-l text-ink-soft leading-[1.45] prose-max font-body">
            <p className="m-0">
              MarketInc is a growth marketing agency based in Sydney. We work with service businesses, and only service businesses, because that&rsquo;s where we know how customers search, choose and book.
            </p>
            <p className="m-0">
              We don&rsquo;t sell channels on their own. We build the whole path, from the first search to the job in the diary, and we measure it by enquiries and bookings.
            </p>
          </div>
        </div>

        {/* Team block with three dashed placeholder slots: [Photo] [Name] [Role] */}
        <div className="border-t border-line pt-12 lg:pt-16 mb-16 lg:mb-24">
          <h2 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-8">
            Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="placeholder-slot p-6 flex flex-col justify-between min-h-[200px]"
              >
                <span className="placeholder-tag text-[0.75rem]">Placeholder</span>

                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-[14px] border border-dashed border-line flex items-center justify-center text-[0.75rem] text-ink-soft/70 bg-paper">
                    [Photo]
                  </div>
                  <div>
                    <p className="font-display font-bold text-[1.125rem] text-ink m-0">
                      [Name]
                    </p>
                    <p className="text-[0.875rem] text-ink-soft m-0">
                      [Role]
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact details */}
        <div className="border-t border-line pt-12 max-w-2xl">
          <h2 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-6">
            Contact
          </h2>

          <div className="space-y-4 font-body text-body text-ink">
            <p className="m-0">
              <span className="text-ink-soft block text-[0.875rem] mb-0.5">Address</span>
              161 Castlereagh St, Sydney NSW 2000
            </p>
            <p className="m-0">
              <span className="text-ink-soft block text-[0.875rem] mb-0.5">Phone</span>
              <a
                href="tel:+61450406450"
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                +61 450 406 450
              </a>
            </p>
            <p className="m-0">
              <span className="text-ink-soft block text-[0.875rem] mb-0.5">Email</span>
              <a
                href="mailto:hello@marketinc.com.au"
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                hello@marketinc.com.au
              </a>
            </p>
          </div>
        </div>
      </div>

      <FinalCTA animate={false} />
    </>
  );
}
