"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wordmark } from "./Wordmark";
import { useDesignNotes } from "./DesignNotes";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: "How it works", href: "#system", id: "system" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Industries", href: "#industries", id: "industries" },
  { label: "Working with us", href: "#ways", id: "ways" },
  { label: "Questions", href: "#faq", id: "faq" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("system");
  const [menuOpen, setMenuOpen] = useState(false);
  const { enabled: designNotesEnabled, toggle: toggleDesignNotes } = useDesignNotes();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Scroll listener for 80px morph
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section dot indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Manage mobile sheet modal state
  useEffect(() => {
    if (!menuOpen) return;

    window.dispatchEvent(new CustomEvent("marketinc-menu-toggle", { detail: { open: true } }));
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.dispatchEvent(new CustomEvent("marketinc-menu-toggle", { detail: { open: false } }));
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Outer wrapper: fixed top-0, handles morph positioning */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none flex justify-center pt-2 md:pt-4 px-3 sm:px-4">
        <header
          className={`pointer-events-auto transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? "w-full max-w-[880px] rounded-[999px] bg-[#181F3B]/70 backdrop-blur-[18px] backdrop-saturate-[150%] [-webkit-backdrop-filter:blur(18px)_saturate(150%)] border border-white/14 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] px-4 sm:px-6 py-2.5 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.12),0_12px_40px_-12px_rgba(0,0,0,0.5)]"
              : "w-full max-w-[1320px] rounded-none bg-transparent border-transparent px-4 sm:px-8 py-3"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Wordmark (white lowercase with mint dot) */}
            <a
              href="#"
              className="text-[1.5rem] sm:text-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm select-none"
            >
              <Wordmark onDark />
            </a>

            {/* Desktop Navigation Links with animated sliding mint dot indicator */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-7 relative"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`relative font-body text-[0.9375rem] py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm ${
                      isActive ? "text-white font-medium" : "text-mist hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* The Dot indicator: slides to the active link */}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-mint transition-all duration-300"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right side: Phone number & Book button */}
            <div className="hidden lg:flex items-center gap-5">
              {!isScrolled && (
                <a
                  href="tel:+61450406450"
                  className="font-body text-[0.9375rem] text-mist hover:text-white transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
                >
                  0450 406 450
                </a>
              )}
              <a
                href="#brief"
                className={`inline-flex items-center justify-center rounded-[999px] bg-mint text-navy font-body font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                  isScrolled
                    ? "h-[40px] px-5 text-[0.875rem]"
                    : "h-[48px] px-6 text-[0.9375rem]"
                }`}
              >
                Book a strategy call
              </a>
            </div>

            {/* Mobile Header: Menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                className="font-body font-medium text-[0.9375rem] text-white min-h-[44px] px-3 py-1.5 rounded-full border border-white/20 hover:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation-sheet"
                aria-label="Open navigation menu"
              >
                Menu
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Full-Screen Sheet */}
      {menuOpen && (
        <div
          ref={sheetRef}
          id="mobile-navigation-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 bg-navy text-white flex flex-col p-6 sm:p-8"
        >
          {/* Header row in sheet */}
          <div className="flex items-center justify-between h-14">
            <a
              href="#"
              onClick={closeMenu}
              className="text-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
            >
              <Wordmark onDark />
            </a>
            <button
              type="button"
              onClick={closeMenu}
              className="font-body font-medium text-[1.0625rem] text-white min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          {/* Five links at H2 size */}
          <nav
            aria-label="Mobile navigation"
            className="flex-1 flex flex-col justify-center gap-6 my-auto"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMenu}
                className="font-display font-bold text-display-l text-white hover:text-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-4 pt-6 border-t border-line pb-safe">
            <div className="flex items-center justify-between">
              <a
                href="tel:+61450406450"
                className="font-body text-[1.125rem] text-mist hover:text-white py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              >
                0450 406 450
              </a>

              {/* Design notes switch in mobile menu */}
              <label
                htmlFor="design-notes-mobile"
                className="inline-flex items-center gap-2 cursor-pointer text-small text-mist"
              >
                <span>Design notes</span>
                <input
                  id="design-notes-mobile"
                  type="checkbox"
                  checked={designNotesEnabled}
                  onChange={toggleDesignNotes}
                  className="w-4 h-4 text-mint rounded"
                />
              </label>
            </div>

            <a
              href="#brief"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center h-[52px] rounded-[999px] bg-mint text-navy font-body font-medium text-[1rem] active:scale-[0.98]"
            >
              Book a strategy call
            </a>
          </div>
        </div>
      )}
    </>
  );
}
