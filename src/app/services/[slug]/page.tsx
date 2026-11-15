import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, servicesBySlug, stops } from "@/content/services";
import { FinalCTA } from "@/components/FinalCTA";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesBySlug[slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <div className="container-site py-12 lg:py-20">
        {/* Breadcrumb back */}
        <div className="mb-6">
          <Link
            href="/services"
            className="text-[0.875rem] text-ink-soft hover:text-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            All services
          </Link>
        </div>

        {/* 1. H1: Service name & 2. Promise */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h1 className="text-display-l text-ink font-bold tracking-[-0.03em] leading-tight m-0 mb-4">
            {service.name}
          </h1>
          <p className="font-body text-body-l text-ink-soft leading-[1.45] prose-max m-0">
            {service.promise}
          </p>
        </div>

        {/* 3. Where it sits: the five-stop line, static, with this service's stop highlighted */}
        <div className="bg-surface rounded-[24px] border border-line p-6 lg:p-8 mb-16 shadow-sm overflow-x-auto">
          <p className="text-[0.8125rem] font-medium text-ink-soft mb-4">
            Where it sits on the path
          </p>
          <div className="min-w-[600px]">
            <div className="relative pt-2 pb-4">
              <div className="absolute top-[18px] left-[5%] right-[5%] h-[2px] bg-line z-0" />

              <div className="relative z-10 grid grid-cols-5 gap-4">
                {stops.map((stop) => {
                  const isCurrentStop =
                    service.slug === "website-design"
                      ? stop.number === 2 || stop.number === 3
                      : stop.number === service.stop;

                  return (
                    <div
                      key={stop.number}
                      className={`flex flex-col items-start transition-opacity ${
                        isCurrentStop ? "opacity-100" : "opacity-35"
                      }`}
                    >
                      <div className="flex items-center justify-center w-6 h-6 mb-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full ${
                            isCurrentStop
                              ? "bg-dot ring-4 ring-dot/30"
                              : "border-2 border-line bg-surface"
                          }`}
                        />
                      </div>
                      <span className="tabular-nums font-bold text-ink text-[0.9375rem]">
                        {stop.number} {stop.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. What you get: four to five plain items in a two-column list */}
        <div className="mb-16">
          <h2 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-6">
            What you get
          </h2>
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl">
            {service.whatYouGet.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-[14px] border border-line p-5 flex items-start gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-dot mt-2 flex-shrink-0" />
                <span className="font-body text-[1rem] text-ink leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Where leads go missing without it: short paragraph with amber marker */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-4">
            Where leads go missing without it
          </h2>
          <div className="flex items-start gap-3.5 bg-surface rounded-[14px] border border-line p-5">
            <span
              className="w-3 h-3 rounded-full bg-leak mt-1.5 flex-shrink-0"
              aria-label="Lead lost warning"
            />
            <p className="font-body text-body text-ink-soft leading-relaxed m-0">
              {service.leakText}
            </p>
          </div>
        </div>

        {/* 6. Works best with: links to the two neighbouring services */}
        {service.worksBestWith.length > 0 && (
          <div className="mb-16">
            <h2 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-4">
              Works best with
            </h2>
            <div className="flex flex-wrap gap-4">
              {service.worksBestWith.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-[999px] border border-line bg-surface hover:border-ink/40 text-ink font-medium text-[0.9375rem] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <span className="w-2 h-2 rounded-full bg-dot" />
                  <span>{rel.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 7. One case-study placeholder slot */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-4">
            Case study
          </h2>
          <div className="placeholder-slot p-6 flex flex-col justify-between min-h-[220px]">
            <span className="placeholder-tag text-[0.75rem]">Placeholder</span>
            <div>
              <p className="text-[0.875rem] text-ink-soft m-0 mb-1">
                [{service.name}]
              </p>
              <p className="font-display font-bold text-[1.125rem] text-ink m-0 mb-6">
                [Client name]
              </p>
              <dl className="space-y-3 m-0 text-[0.875rem]">
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-ink-soft font-normal">The problem</dt>
                  <dd className="col-span-2 text-ink-soft/70 m-0">
                    [One sentence, in the client&rsquo;s words]
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-ink-soft font-normal">What we built</dt>
                  <dd className="col-span-2 text-ink-soft/70 m-0">
                    [Which of the five stops were fixed]
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-ink-soft font-normal">The result</dt>
                  <dd className="col-span-2 text-ink-soft/70 m-0">
                    [One number, with the time period]
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Final call to action */}
      <FinalCTA animate={false} />
    </>
  );
}
