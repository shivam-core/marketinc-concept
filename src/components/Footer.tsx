import React from "react";
import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="w-full bg-deep text-white pt-16 lg:pt-24 pb-20 md:pb-16 overflow-hidden">
      <div className="container-site">
        {/* Very large wordmark allowed to bleed off right edge */}
        <div className="mb-16 lg:mb-24 overflow-visible">
          <div className="text-[clamp(4rem,18vw,16rem)] leading-[0.9] tracking-[-0.03em] whitespace-nowrap">
            <Wordmark onDark />
          </div>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-16 border-b border-line-dark">
          {/* Services Column */}
          <div>
            <p className="font-display font-bold text-[1.25rem] text-white mb-6">
              Services
            </p>
            <ul className="space-y-3.5 list-none p-0 m-0">
              <li>
                <Link
                  href="/services/google-ads"
                  className="font-body text-[1rem] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  Google Ads
                </Link>
              </li>
              <li>
                <Link
                  href="/services/meta-ads"
                  className="font-body text-[1rem] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  Meta Ads
                </Link>
              </li>
              <li>
                <Link
                  href="/services/seo"
                  className="font-body text-[1rem] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  SEO
                </Link>
              </li>
              <li>
                <Link
                  href="/services/website-design"
                  className="font-body text-[1rem] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  Website design
                </Link>
              </li>
              <li>
                <Link
                  href="/services/crm-automation"
                  className="font-body text-[1rem] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  CRM and automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <p className="font-display font-bold text-[1.25rem] text-white mb-6">
              Industries
            </p>
            <ul className="space-y-3.5 list-none p-0 m-0">
              <li>
                <Link
                  href="/industries#trades"
                  className="font-body text-[1rem] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  Home and trade services
                </Link>
              </li>
              <li>
                <Link
                  href="/industries#healthcare"
                  className="font-body text-[1rem] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  Healthcare
                </Link>
              </li>
              <li>
                <Link
                  href="/industries#professional"
                  className="font-body text-[1rem] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  Professional services
                </Link>
              </li>
              <li>
                <Link
                  href="/industries#finance"
                  className="font-body text-[1rem] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  Finance and investment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <p className="font-display font-bold text-[1.25rem] text-white mb-6">
              Contact
            </p>
            <div className="space-y-3.5 font-body text-[1rem] text-white/70">
              <p className="m-0">
                <a
                  href="mailto:hello@marketinc.com.au"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  hello@marketinc.com.au
                </a>
              </p>
              <p className="m-0">
                <a
                  href="tel:+61450406450"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
                >
                  +61 450 406 450
                </a>
              </p>
              <p className="m-0 text-white/60">
                161 Castlereagh St, Sydney NSW 2000
              </p>
            </div>
          </div>
        </div>

        {/* Bottom disclaimer line */}
        <div className="pt-8 text-[0.875rem] text-white/60 leading-relaxed">
          <p className="m-0">
            Unofficial redesign concept by Shivam Kore, made for MarketInc. Not affiliated with or endorsed by MarketInc. No data is collected on this site.
          </p>
        </div>
      </div>
    </footer>
  );
}
