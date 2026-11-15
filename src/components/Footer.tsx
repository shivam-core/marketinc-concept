import React from "react";
import { Wordmark } from "./Wordmark";
import { DesignNoteCard } from "./DesignNotes";

export function Footer() {
  return (
    <footer className="w-full bg-navy-deep text-white pt-16 lg:pt-24 pb-24 md:pb-16 overflow-hidden border-t border-line/60">
      <div className="container-site">
        <DesignNoteCard
          number={9}
          title="Clear contact details and honest attribution"
          note="A real address, real Australian phone format, and an explicit disclaimer. No hidden legal links or obscure fine print."
          arrowDirection="down-right"
        />

        {/* Very large wordmark allowed to bleed off right edge */}
        <div className="mb-16 lg:mb-20 overflow-visible select-none">
          <div className="text-[clamp(3.5rem,16vw,14rem)] leading-[0.9] tracking-[-0.03em] whitespace-nowrap opacity-90">
            <Wordmark onDark />
          </div>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-16 border-b border-line/60">
          {/* Services Column */}
          <div>
            <p className="font-display font-bold text-[1.25rem] text-white mb-6">
              Services
            </p>
            <ul className="space-y-3.5 list-none p-0 m-0">
              <li>
                <a
                  href="#services"
                  className="font-body text-[1rem] text-mist hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  Google Ads
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="font-body text-[1rem] text-mist hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  Meta Ads
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="font-body text-[1rem] text-mist hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  SEO
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="font-body text-[1rem] text-mist hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  Website design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="font-body text-[1rem] text-mist hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  CRM and automation
                </a>
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
                <a
                  href="#industries"
                  className="font-body text-[1rem] text-mist hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  Home and trade services
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  className="font-body text-[1rem] text-mist hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  Healthcare
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  className="font-body text-[1rem] text-mist hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  Professional services
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  className="font-body text-[1rem] text-mist hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  Finance and investment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <p className="font-display font-bold text-[1.25rem] text-white mb-6">
              Contact
            </p>
            <address className="not-italic space-y-3.5 font-body text-[1rem] text-mist">
              <p className="m-0">
                <a
                  href="mailto:hello@marketinc.com.au"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  hello@marketinc.com.au
                </a>
              </p>
              <p className="m-0">
                <a
                  href="tel:+61450406450"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  +61 450 406 450
                </a>
              </p>
              <p className="m-0 text-mist">
                161 Castlereagh St, Sydney NSW 2000
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/marketincau/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MarketInc on Instagram"
                  className="w-10 h-10 rounded-full border border-line bg-navy flex items-center justify-center text-mist hover:text-mint hover:border-mint hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/marketincorporated/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MarketInc on LinkedIn"
                  className="w-10 h-10 rounded-full border border-line bg-navy flex items-center justify-center text-mist hover:text-mint hover:border-mint hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.64 1.64 0 0 0-1.66 1.64 1.65 1.65 0 0 0 1.66 1.65 1.65 1.65 0 0 0 1.65-1.65A1.64 1.64 0 0 0 7.86 6.3z" />
                  </svg>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Social & Disclaimer Row */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-line/30 pb-8">
          <div className="flex items-center gap-3">
            <span className="text-[0.875rem] text-mist/70 font-medium">Connect with MarketInc:</span>
            <a
              href="https://www.instagram.com/marketincau/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MarketInc on Instagram"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-navy/60 text-[0.875rem] text-mist hover:text-white hover:border-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              <svg className="w-4 h-4 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/company/marketincorporated/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MarketInc on LinkedIn"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-navy/60 text-[0.875rem] text-mist hover:text-white hover:border-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              <svg className="w-4 h-4 text-mint" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.64 1.64 0 0 0-1.66 1.64 1.65 1.65 0 0 0 1.66 1.65 1.65 1.65 0 0 0 1.65-1.65A1.64 1.64 0 0 0 7.86 6.3z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="text-[0.875rem] text-mist/60 font-mono">
            © 2026 MarketInc Concept
          </div>
        </div>

        {/* Disclaimer Line */}
        <div className="pt-8 text-small text-mist/80 leading-relaxed">
          <p className="m-0">
            MarketInc is a registered trademark of its respective owners. This website is an independent design concept created by{" "}
            <a
              href="https://x.com/shivamcore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mint underline decoration-mint/50 underline-offset-2 hover:text-white transition-colors"
            >
              Shivam Kore
            </a>{" "}
            to explore alternative product directions and is not affiliated with, endorsed by, or sponsored by MarketInc. All company and product names are for identification purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
