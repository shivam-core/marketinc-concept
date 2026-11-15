"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function MobileActionBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleMenuToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      setMenuOpen(customEvent.detail?.open ?? false);
    };

    window.addEventListener("marketinc-menu-toggle", handleMenuToggle);
    return () => {
      window.removeEventListener("marketinc-menu-toggle", handleMenuToggle);
    };
  }, []);

  // Do not show on /brief or when mobile menu is open
  if (pathname === "/brief" || menuOpen) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-paper/95 backdrop-blur-none border-t border-line px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="grid grid-cols-2 gap-3 max-w-[500px] mx-auto">
        <a
          href="tel:+61450406450"
          className="inline-flex items-center justify-center gap-2 h-[52px] min-h-[44px] px-4 rounded-[999px] border-[1.5px] border-ink/30 text-ink bg-transparent font-body font-medium text-[0.9375rem] active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          {/* Handwritten Phone SVG icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Call</span>
        </a>

        <Link
          href="/brief"
          className="inline-flex items-center justify-center h-[52px] min-h-[44px] px-4 rounded-[999px] bg-ink text-white font-body font-medium text-[0.9375rem] active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span>Book a strategy call</span>
        </Link>
      </div>
    </div>
  );
}
