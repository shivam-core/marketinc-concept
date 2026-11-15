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
                  <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
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
              <svg className="w-4 h-4 text-mint" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
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
