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
            </address>
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
