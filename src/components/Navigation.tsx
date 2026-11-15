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
  { label: "Work with us", href: "#ways", id: "ways" },
  { label: "Questions", href: "#faq", id: "faq" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("system");
  const [menuOpen, setMenuOpen] = useState(false);
  const { enabled: designNotesEnabled, toggle: toggleDesignNotes } = useDesignNotes();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Guarantee landing on homepage without a hash starts firmly at the top
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
    }
  }, []);

  // Scroll listener with requestAnimationFrame and hysteresis for silky smooth morphing
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolled((prev) => {
            if (!prev && y > 60) return true;
            if (prev && y < 25) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
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

    // Move focus to close button upon opening
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

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
      {/* Outer wrapper: smoothly transitions between landing position (below concept bar) and floating pill position */}
      <div
        className={`fixed left-0 right-0 z-40 pointer-events-none flex justify-center px-3 sm:px-4 transition-[top,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "top-3 md:top-4 pt-0"
            : "top-[34px] sm:top-[36px] pt-1 sm:pt-2"
        }`}
      >
        <header
          className={`pointer-events-auto transition-[max-width,padding,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[999px] ${
            isScrolled
              ? "w-fit max-w-[calc(100vw-24px)] bg-[#181F3B]/85 backdrop-blur-[20px] backdrop-saturate-[160%] border border-white/14 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.12),0_12px_40px_-12px_rgba(0,0,0,0.6)] px-5 sm:px-6 py-2"
              : "w-full max-w-[1320px] bg-transparent border border-transparent shadow-none px-4 sm:px-8 py-3"
          }`}
          style={{ willChange: "max-width, transform" }}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? "gap-4 xl:gap-6" : "gap-5 sm:gap-8"
            }`}
          >
            {/* Wordmark (white lowercase with mint dot) */}
            <a
              href="#"
              className="text-[1.5rem] sm:text-[1.625rem] flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm select-none"
            >
              <Wordmark onDark />
            </a>

            {/* Desktop Navigation Links with animated sliding mint dot indicator */}
            <nav
              aria-label="Main navigation"
              className={`hidden lg:flex items-center flex-shrink-0 transition-all duration-500 ${
                isScrolled ? "gap-4 xl:gap-6" : "gap-6 xl:gap-8"
              }`}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`relative font-body text-[0.9375rem] py-1 whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm ${
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

            {/* Right side: Smoothly collapsing phone number & Book button */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
              <div
                className={`transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex items-center ${
                  isScrolled
                    ? "max-w-0 opacity-0 -translate-x-3 pointer-events-none"
                    : "max-w-[140px] opacity-100 translate-x-0"
                }`}
              >
                <a
                  href="tel:+61450406450"
                  tabIndex={isScrolled ? -1 : 0}
                  className="font-body text-[0.9375rem] text-mist hover:text-white whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm pr-2"
                >
                  0450 406 450
                </a>
              </div>

              <a
                href="#brief"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-[999px] bg-mint text-navy font-body font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint leading-none h-[42px] px-5 text-[0.9375rem]"
              >
                Book a strategy call
              </a>
            </div>

            {/* Mobile Header: Menu button */}
            <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                className="font-body font-medium text-[0.9375rem] text-white min-h-[44px] px-3.5 py-1.5 rounded-full border border-white/20 hover:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
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
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-navy p-6 flex flex-col justify-between overflow-y-auto"
        >
          {/* Header row in sheet */}
          <div className="flex items-center justify-between pb-6 border-b border-line">
            <a
              href="#"
              onClick={closeMenu}
              className="text-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
            >
              <Wordmark onDark />
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              className="font-body font-medium text-[1rem] text-white min-h-[44px] px-3.5 py-1.5 rounded-full border border-white/20 hover:border-mint flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              aria-label="Close menu"
            >
              <span>Close</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
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
