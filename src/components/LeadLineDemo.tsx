"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { industries, industryTabLabels, type HeroDemoContent } from "@/content/industries";
import { HandArrow } from "./SketchPrimitives";

interface LeadLineDemoProps {
  forcedTab?: string;
}

export function LeadLineDemo({ forcedTab }: LeadLineDemoProps) {
  const [selectedTab, setSelectedTab] = useState(forcedTab || "trades");
  const [activeStop, setActiveStop] = useState(0); // 0..4
  const [lineProgress, setLineProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Sync forcedTab if parent changes it
  useEffect(() => {
    if (forcedTab && forcedTab !== selectedTab) {
      setSelectedTab(forcedTab);
    }
  }, [forcedTab, selectedTab]);

  // Listen for industry selection custom events
  useEffect(() => {
    const handleCustomSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedTab(customEvent.detail);
      }
    };
    window.addEventListener("marketinc-select-industry", handleCustomSelect);
    return () => window.removeEventListener("marketinc-select-industry", handleCustomSelect);
  }, []);

  const currentIndustry =
    industries.find((i) => i.slug === selectedTab) || industries[0];
  const demoData = currentIndustry.heroDemo;

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setLineProgress(1);
        setActiveStop(4);
      }
      const handler = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
        if (e.matches) {
          setLineProgress(1);
          setActiveStop(4);
        }
      };
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  // Real-time scroll listener: tracks user's scroll speed and direction at their pace
  useEffect(() => {
    if (reducedMotion) return;

    const updateScrollProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;
      const isDesktop = window.innerWidth >= 1024;

      let progress = 0;

      if (isDesktop) {
        // On desktop: Hero is at top. Scrolling from scrollY = 0 to ~380px drives the line down
        // through all 5 cards in tandem with user scrolling through the hero section.
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const maxScroll = 380;
        progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      } else {
        // On mobile: Container enters viewport as user scrolls down.
        // Start when container top reaches 75% of viewport height; complete when near top (15%).
        const startY = windowHeight * 0.75;
        const totalDist = (rect.height * 0.7) || 400;
        const currentDist = startY - rect.top;
        progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      }

      targetProgressRef.current = progress;
    };

    // Smooth physics lerp loop with requestAnimationFrame
    const loop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.001) {
        currentProgressRef.current += diff * 0.22;
        const clamped = Math.min(Math.max(currentProgressRef.current, 0), 1);
        setLineProgress(clamped);

        // Map progress to active stops (0 to 4)
        if (clamped < 0.2) {
          setActiveStop(0);
        } else if (clamped < 0.45) {
          setActiveStop(1);
        } else if (clamped < 0.7) {
          setActiveStop(2);
        } else if (clamped < 0.9) {
          setActiveStop(3);
        } else {
          setActiveStop(4);
        }
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    updateScrollProgress();
    rafIdRef.current = requestAnimationFrame(loop);

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [reducedMotion]);

  const handleSelectTab = (slug: string) => {
    setSelectedTab(slug);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const totalTabs = industryTabLabels.length;
    let newIndex = index;

    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % totalTabs;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + totalTabs) % totalTabs;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = totalTabs - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextSlug = industryTabLabels[newIndex].slug;
    handleSelectTab(nextSlug);

    const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>("button[role='tab']");
    buttons?.[newIndex]?.focus();
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-navy-raised rounded-[20px] border border-line p-5 sm:p-7 transition-shadow"
      style={{
        boxShadow: "0 24px 60px -30px rgba(16, 22, 44, 0.7)",
      }}
      aria-live="off"
    >
      {/* Handwriting note pointing to tabs: "pick your industry" */}
      <div className="flex items-center gap-2 mb-2 text-butter select-none">
        <span className="font-hand text-[22px] leading-none">
          pick your industry
        </span>
        <HandArrow direction="down-right" color="butter" className="w-6 h-5" />
      </div>

      {/* Tabs Row */}
      <div className="relative mb-6 pb-4 border-b border-line">
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Industries"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
        >
          {industryTabLabels.map((tab, idx) => {
            const isSelected = selectedTab === tab.slug;
            return (
              <button
                key={tab.slug}
                role="tab"
                id={`tab-${tab.slug}`}
                aria-selected={isSelected}
                aria-controls={`panel-${tab.slug}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleSelectTab(tab.slug)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`px-3.5 py-1.5 rounded-[999px] text-[0.875rem] font-medium transition-colors duration-150 select-none whitespace-nowrap min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                  isSelected
                    ? "bg-mint text-navy font-bold shadow-[0_0_12px_rgba(124,200,174,0.4)]"
                    : "bg-navy-deep text-mist hover:text-white border border-line"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* VERTICAL LAYOUT FOR EVERY SCREEN SIZE */}
      <div
        id={`panel-${selectedTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${selectedTab}`}
        className="relative pl-7 space-y-6"
      >
        {/* Vertical Track Base Line */}
        <div
          className="absolute top-[10px] bottom-[28px] left-[9px] w-[2px] bg-line/80 z-0"
          aria-hidden="true"
        />

        {/* Vertical Mint Glowing Line (scroll-driven at user's pace) */}
        <div
          className="absolute top-[10px] left-[9px] w-[2px] bg-mint z-0 pointer-events-none rounded-full"
          style={{
            height: `calc(${lineProgress * 100}% - ${lineProgress * 28}px)`,
            boxShadow:
              "0 0 10px 2px rgba(124, 200, 174, 0.9), 0 0 20px 4px rgba(124, 200, 174, 0.45)",
          }}
          aria-hidden="true"
        />

        {/* Glowing Head Dot leading the line */}
        <div
          className="absolute left-[5px] w-2.5 h-2.5 rounded-full bg-mint z-10 pointer-events-none"
          style={{
            top: `calc(10px + ${lineProgress * 100}% - ${lineProgress * 28}px - 5px)`,
            boxShadow:
              "0 0 12px 4px rgba(124, 200, 174, 1), 0 0 24px 6px rgba(124, 200, 174, 0.6)",
          }}
          aria-hidden="true"
        />

        {[
          { num: 1, label: "Found", tilt: "-rotate-[1deg]" },
          { num: 2, label: "Landed", tilt: "rotate-[1deg]" },
          { num: 3, label: "Enquired", tilt: "-rotate-[1deg]" },
          { num: 4, label: "Followed up", tilt: "rotate-[1deg]" },
          { num: 5, label: "Booked", tilt: "-rotate-[1deg]" },
        ].map((stop, idx) => {
          const isPassedOrCurrent = idx <= activeStop;
          return (
            <div key={stop.num} className="relative">
              {/* Dot marker on left vertical line */}
              <div
                className="absolute -left-7 top-1 flex items-center justify-center w-5 h-5 z-10"
                aria-hidden="true"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    isPassedOrCurrent
                      ? "bg-mint ring-4 ring-mint/25 shadow-[0_0_12px_rgba(124,200,174,0.7)] scale-100"
                      : "border-2 border-line bg-navy-deep scale-90 opacity-50"
                  }`}
                />
              </div>

              {/* Stop Number and Label in Sentence Case */}
              <div
                className={`transition-all duration-300 mb-2 flex items-baseline gap-2 ${
                  isPassedOrCurrent ? "opacity-100" : "opacity-40"
                }`}
              >
                <span
                  className={`tabular-nums font-bold text-[0.875rem] transition-colors duration-300 ${
                    isPassedOrCurrent ? "text-mint" : "text-mist"
                  }`}
                >
                  {stop.num}
                </span>
                <span className="font-display font-bold text-white text-[1rem]">
                  {stop.label}
                </span>
              </div>

              {/* Fragment Card: Navy-deep background, min 14px text */}
              <div
                className={`tilt-card rounded-[14px] bg-navy-deep border p-4 transition-all duration-300 ${
                  stop.tilt
                } ${
                  isPassedOrCurrent
                    ? "border-mint/35 opacity-100 shadow-[0_12px_32px_-16px_rgba(124,200,174,0.25)]"
                    : "border-line/60 opacity-40 shadow-none"
                }`}
              >
                <VerticalFragmentContent stopIndex={idx} data={demoData} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mandatory illustrative caption */}
      <div className="mt-6 pt-4 border-t border-line text-left">
        <p className="text-[0.875rem] text-mist m-0">
          Illustrative example, not client data.
        </p>
      </div>
    </div>
  );
}

// Fragment Content for Vertical Demo (Sentence Case, min 14px text)
function VerticalFragmentContent({
  stopIndex,
  data,
}: {
  stopIndex: number;
  data: HeroDemoContent;
}) {
  switch (stopIndex) {
    case 0: // Found
      return (
        <div className="space-y-2 text-left">
          <div className="bg-navy-raised rounded-[8px] border border-line px-3 py-1.5 text-[0.875rem] text-mist truncate flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-mist flex-shrink-0"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="truncate">{data.found.query}</span>
          </div>
          <div className="pt-1">
            <span className="inline-block px-2 py-0.5 rounded-[4px] bg-white/10 text-[0.875rem] font-bold text-white leading-none mb-1">
              Ad
            </span>
            <p className="font-body font-medium text-[0.9375rem] text-white leading-snug m-0 mb-1">
              {data.found.adTitle}
            </p>
            <p className="text-[0.875rem] text-mist leading-relaxed m-0">
              {data.found.adLine}
            </p>
          </div>
        </div>
      );

    case 1: // Landed
      return (
        <div className="space-y-2 text-left">
          <p className="font-body font-medium text-[0.9375rem] text-white leading-snug m-0">
            {data.landed.headline}
          </p>
          <p className="text-[0.875rem] text-mist leading-relaxed m-0">
            {data.landed.line}
          </p>
          <div className="pt-1">
            <span className="inline-block bg-mint text-navy text-[0.875rem] font-medium px-3.5 py-1.5 rounded-full select-none">
              {data.landed.button}
            </span>
          </div>
        </div>
      );

    case 2: // Enquired (Sentence Case: "New enquiry")
      return (
        <div className="space-y-1.5 text-left">
          <span className="inline-block text-[0.875rem] font-medium text-mint">
            New enquiry
          </span>
          <p className="font-body font-medium text-[0.9375rem] text-white leading-snug m-0">
            {data.enquired.name}, {data.enquired.suburb}
          </p>
          <p className="text-[0.875rem] text-mist leading-relaxed italic m-0">
            &ldquo;{data.enquired.message}&rdquo;
          </p>
        </div>
      );

    case 3: // Followed up (Sentence Case: "Sent automatically")
      return (
        <div className="space-y-2 text-left">
          <div className="bg-navy-raised rounded-[10px] border border-line p-3 text-[0.875rem] text-white leading-relaxed">
            {data.followedUp.text}
          </div>
          <p className="text-[0.875rem] text-mist m-0">
            Sent automatically
          </p>
        </div>
      );

    case 4: // Booked (Sentence Case: "Booked")
      return (
        <div className="space-y-1.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[0.875rem] font-medium text-mist">
              Booked
            </span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-mint/20 text-mint">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="2.5 6 4.8 8.5 9.5 3.5" />
              </svg>
            </span>
          </div>
          <p className="font-body font-medium text-[0.9375rem] text-white leading-snug m-0">
            {data.booked.day}, {data.booked.time}
          </p>
          <p className="text-[0.875rem] text-mist leading-relaxed m-0">
            {data.booked.job}
          </p>
        </div>
      );

    default:
      return null;
  }
}
