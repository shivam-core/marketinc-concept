"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";
import { PrimaryButton } from "./Buttons";

interface HeaderProps {
  minimal?: boolean;
}

export function Header({ minimal = false }: HeaderProps) {
  const pathname = usePathname();
  const isMinimal = minimal || pathname === "/brief";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key and focus trap when menu is open
  useEffect(() => {
    if (!menuOpen) return;

    // Dispatch event to inform MobileActionBar to hide
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

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-paper transition-colors duration-150 ${
          scrolled ? "border-b border-line" : "border-b border-transparent"
        }`}
      >
        <div className="container-site h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
          >
            <Wordmark />
          </Link>

          {!isMinimal ? (
            <>
              {/* Desktop Navigation */}
              <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
                <Link
                  href="/services"
                  className="font-body text-[1rem] text-ink hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
                >
                  Services
                </Link>
                <Link
                  href="/industries"
                  className="font-body text-[1rem] text-ink hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
                >
                  Industries
                </Link>
                <Link
                  href="/about"
                  className="font-body text-[1rem] text-ink hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
                >
                  About
                </Link>
              </nav>

              {/* Desktop CTA & Phone */}
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="tel:+61450406450"
                  className="font-body text-[1rem] text-ink hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
                >
                  0450 406 450
                </a>
                <PrimaryButton href="/brief">Book a strategy call</PrimaryButton>
              </div>

              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                className="md:hidden font-body font-medium text-[1.0625rem] text-ink min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label="Open menu"
              >
                Menu
              </button>
            </>
          ) : (
            /* Minimal Header (for /brief) */
            <div className="flex items-center">
              <a
                href="tel:+61450406450"
                className="font-body text-[1rem] text-ink hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
              >
                0450 406 450
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Full-Screen Menu Sheet */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 bg-deep text-white flex flex-col p-6 sm:p-8"
        >
          {/* Header row in sheet */}
          <div className="flex items-center justify-between h-14">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot rounded-sm"
            >
              <Wordmark onDark />
            </Link>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              className="font-body font-medium text-[1.0625rem] text-white min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot rounded-sm"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          {/* Links at display-l size */}
          <nav aria-label="Mobile navigation" className="flex-1 flex flex-col justify-center gap-6 my-auto">
            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className="font-display font-bold text-display-l text-white hover:text-dot transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
            >
              Services
            </Link>
            <Link
              href="/industries"
              onClick={() => setMenuOpen(false)}
              className="font-display font-bold text-display-l text-white hover:text-dot transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
            >
              Industries
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="font-display font-bold text-display-l text-white hover:text-dot transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
            >
              About
            </Link>
          </nav>

          {/* Bottom actions */}
          <div className="flex flex-col gap-4 pt-6 border-t border-line-dark pb-safe">
            <a
              href="tel:+61450406450"
              className="font-body text-[1.125rem] text-white/90 hover:text-white py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dot"
            >
              0450 406 450
            </a>
            <PrimaryButton
              href="/brief"
              onDark
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              Book a strategy call
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
}
