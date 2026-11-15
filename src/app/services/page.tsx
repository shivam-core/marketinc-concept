import React from "react";
import Link from "next/link";
import { services, stops } from "@/content/services";
import { FinalCTA } from "@/components/FinalCTA";

export default function ServicesPage() {
  return (
    <>
      <div className="container-site py-12 lg:py-20">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h1 className="text-display-l text-ink font-bold tracking-[-0.03em] leading-tight m-0 mb-4">
            Five services, one system
          </h1>
          <p className="font-body text-body-l text-ink-soft leading-[1.45] prose-max m-0">
            Most agencies sell you isolated services. We build the whole path, connecting each part so leads don&rsquo;t slip through.
          </p>
        </div>

        {/* The five-stop line shown horizontally at the top (static, dot resting at stop 5) */}
        <div className="bg-surface rounded-[24px] border border-line p-6 lg:p-8 mb-16 shadow-sm overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="relative pt-4 pb-8">
              {/* Mint line fully across */}
              <div className="absolute top-[22px] left-[5%] right-[5%] h-[2px] bg-dot z-0" />

              <div className="relative z-10 grid grid-cols-5 gap-4">
                {stops.map((stop, idx) => {
                  const isLast = idx === stops.length - 1;
                  return (
                    <div key={stop.number} className="flex flex-col items-start">
                      {/* Circle marker */}
                      <div className="flex items-center justify-center w-6 h-6 mb-3">
                        <div
                          className={`w-3.5 h-3.5 rounded-full bg-dot ${
                            isLast ? "ring-4 ring-dot/30" : ""
                          }`}
                        />
                      </div>

                      <span className="tabular-nums font-bold text-ink text-[1rem] mb-1">
                        {stop.number} {stop.label}
                      </span>

                      {/* Services listed under stop */}
                      <div className="text-[0.8125rem] text-ink-soft space-y-0.5">
                        {stop.services.map((s) => (
                          <div key={s} className="truncate">
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Five rows, one per service */}
        <div className="border-t border-line divide-y divide-line">
          {services.map((srv) => (
            <div
              key={srv.slug}
              className="py-8 lg:py-10 grid lg:grid-cols-12 gap-4 lg:gap-8 items-baseline"
            >
              <div className="lg:col-span-5">
                <Link
                  href={`/services/${srv.slug}`}
                  className="group inline-flex items-baseline gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
                >
                  <h2 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 group-hover:text-ink/80 transition-colors">
                    {srv.name}
                  </h2>
                </Link>
                <div className="text-[0.875rem] text-ink-soft mt-1">
                  Stop {srv.stop}: {srv.stopLabel}
                </div>
              </div>

              <div className="lg:col-span-5">
                <p className="font-body text-body text-ink-soft leading-relaxed m-0 prose-max">
                  {srv.promise}
                </p>
              </div>

              <div className="lg:col-span-2 lg:text-right">
                <Link
                  href={`/services/${srv.slug}`}
                  className="font-body text-[0.9375rem] font-medium text-dot-ink underline underline-offset-4 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  View service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA animate={false} />
    </>
  );
}
