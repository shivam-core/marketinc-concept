"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { industries, industryTabLabels, type HeroDemoContent } from "@/content/industries";

interface LeadLineDemoProps {
  onAnimationStateChange?: (state: { activeStop: number; dotProgress: number }) => void;
  staticMode?: boolean; // For /industries page where it's shown static and complete
  forcedIndustry?: string; // If static for a specific industry
}

export function LeadLineDemo({
  staticMode = false,
  forcedIndustry,
}: LeadLineDemoProps) {
  const [selectedTab, setSelectedTab] = useState(forcedIndustry || "trades");
  const [activeStop, setActiveStop] = useState(staticMode ? 4 : 4); // 0-indexed (0 to 4 = 1 to 5)
  const [lineProgress, setLineProgress] = useState(staticMode ? 1 : 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const currentIndustry =
    industries.find((i) => i.slug === selectedTab) || industries[0];
  const demoData = currentIndustry.heroDemo;

  const tabListRef = useRef<HTMLDivElement>(null);
  const animationTimerRef = useRef<NodeJS.Timeout[]>([]);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  const clearTimers = useCallback(() => {
    animationTimerRef.current.forEach((t) => clearTimeout(t));
    animationTimerRef.current = [];
  }, []);

  const runAnimation = useCallback((durationMs: number) => {
    if (reducedMotion || staticMode) {
      setActiveStop(4);
      setLineProgress(1);
      return;
    }

    clearTimers();
    setIsPlaying(true);
    setActiveStop(0);
    setLineProgress(0);

    const stepInterval = durationMs / 4;

    for (let i = 1; i <= 4; i++) {
      const timer = setTimeout(() => {
        setActiveStop(i);
        setLineProgress(i / 4);
        if (i === 4) {
          setIsPlaying(false);
        }
      }, stepInterval * i);
      animationTimerRef.current.push(timer);
    }
  }, [clearTimers, reducedMotion, staticMode]);

  // Initial load animation (~4.5s)
  useEffect(() => {
    if (staticMode || reducedMotion) return;

    // Small delay to ensure paint and layout stability
    const initialDelay = setTimeout(() => {
      runAnimation(4500);
    }, 600);

    return () => {
      clearTimeout(initialDelay);
      clearTimers();
    };
  }, [staticMode, reducedMotion, runAnimation, clearTimers]);

  // Handle tab change
  const handleSelectTab = (slug: string) => {
    if (slug === selectedTab && !staticMode) {
      handleReplay();
      return;
    }
    setSelectedTab(slug);
    if (!staticMode && !reducedMotion) {
      runAnimation(2500);
    }
  };

  const handleReplay = () => {
    runAnimation(2500);
  };

  // Keyboard navigation for tabs
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

    // Focus the new tab
    const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>("button[role='tab']");
    buttons?.[newIndex]?.focus();
  };

  return (
    <div
      className="w-full bg-surface rounded-[24px] border border-line p-6 md:p-8 lg:p-10 transition-shadow"
      style={{
        boxShadow: "0 24px 60px -30px rgba(22, 30, 56, 0.35)",
      }}
      aria-live="off"
    >
      {/* Header controls (Tabs + Replay button) */}
      {!staticMode && (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-10 pb-6 border-b border-line">
          {/* Tabs: horizontal scrolling on mobile */}
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
                  className={`px-4 py-2 rounded-[999px] text-[0.9375rem] font-medium transition-colors duration-150 select-none whitespace-nowrap min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                    isSelected
                      ? "bg-ink text-white"
                      : "bg-paper text-ink-soft hover:text-ink hover:bg-paper/80"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Replay Button */}
          <button
            type="button"
            onClick={handleReplay}
            disabled={isPlaying}
            className="text-[0.875rem] font-medium text-ink-soft hover:text-ink transition-colors min-h-[44px] px-2 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-sm"
            aria-label="Replay lead journey"
          >
            <span aria-hidden="true" className="text-xs">↻</span> Replay
          </button>
        </div>
      )}

      {/* Main Demo Container */}
      <div
        id={`panel-${selectedTab}`}
        role={staticMode ? undefined : "tabpanel"}
        aria-labelledby={`tab-${selectedTab}`}
      >
        {/* DESKTOP LAYOUT (Horizontal) */}
        <div className="hidden lg:block">
          {/* The Horizontal Line and 5 Stops */}
          <div className="relative pt-4 pb-8">
            {/* Base track */}
            <div className="absolute top-[22px] left-[4%] right-[4%] h-[2px] bg-line z-0" />
            {/* Travelled mint track */}
            <div
              className="absolute top-[22px] left-[4%] h-[2px] bg-dot z-0 transition-[width] duration-300 ease-out"
              style={{
                width: `${lineProgress * 92}%`,
              }}
            />

            {/* Stops Grid */}
            <div className="relative z-10 grid grid-cols-5 gap-4">
              {[
                { num: 1, label: "Found" },
                { num: 2, label: "Landed" },
                { num: 3, label: "Enquired" },
                { num: 4, label: "Followed up" },
                { num: 5, label: "Booked" },
              ].map((stop, idx) => {
                const isPassedOrCurrent = idx <= activeStop;
                return (
                  <div key={stop.num} className="flex flex-col items-start">
                    {/* Circle marker */}
                    <div className="relative flex items-center justify-center w-6 h-6 mb-3">
                      <div
                        className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 ${
                          isPassedOrCurrent ? "bg-dot" : "border-2 border-line bg-surface"
                        }`}
                      />
                    </div>

                    {/* Stop Number & Name */}
                    <div
                      className={`transition-opacity duration-300 ${
                        isPassedOrCurrent ? "opacity-100" : "opacity-35"
                      }`}
                    >
                      <span className="tabular-nums font-bold text-ink text-[1.0625rem]">
                        {stop.num} {stop.label}
                      </span>
                    </div>

                    {/* Fragment Card */}
                    <div
                      className={`w-full mt-4 transition-opacity duration-300 ${
                        isPassedOrCurrent ? "opacity-100" : "opacity-35"
                      }`}
                    >
                      <FragmentContent
                        stopIndex={idx}
                        data={demoData}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT (Vertical) */}
        <div className="lg:hidden">
          <div className="relative pl-7 space-y-8">
            {/* Vertical Base Line */}
            <div className="absolute top-2 bottom-8 left-[9px] w-[2px] bg-line z-0" />
            {/* Vertical Mint Line */}
            <div
              className="absolute top-2 left-[9px] w-[2px] bg-dot z-0 transition-[height] duration-300 ease-out"
              style={{
                height: `${lineProgress * 95}%`,
              }}
            />

            {[
              { num: 1, label: "Found" },
              { num: 2, label: "Landed" },
              { num: 3, label: "Enquired" },
              { num: 4, label: "Followed up" },
              { num: 5, label: "Booked" },
            ].map((stop, idx) => {
              const isPassedOrCurrent = idx <= activeStop;
              return (
                <div key={stop.num} className="relative">
                  {/* Circle Marker on the left line */}
                  <div className="absolute -left-7 top-1 flex items-center justify-center w-5 h-5">
                    <div
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        isPassedOrCurrent ? "bg-dot" : "border-2 border-line bg-surface"
                      }`}
                    />
                  </div>

                  {/* Stop Number and Label */}
                  <div
                    className={`transition-opacity duration-300 mb-2.5 ${
                      isPassedOrCurrent ? "opacity-100" : "opacity-35"
                    }`}
                  >
                    <span className="tabular-nums font-bold text-ink text-[1rem]">
                      {stop.num} {stop.label}
                    </span>
                  </div>

                  {/* Fragment Card */}
                  <div
                    className={`transition-opacity duration-300 ${
                      isPassedOrCurrent ? "opacity-100" : "opacity-35"
                    }`}
                  >
                    <FragmentContent
                      stopIndex={idx}
                      data={demoData}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mandatory caption */}
      <div className="mt-8 pt-4 border-t border-line text-left">
        <p className="text-[0.875rem] text-ink-soft m-0">
          Illustrative example, not client data.
        </p>
      </div>
    </div>
  );
}

// Subcomponents for the 5 hand-built interface fragments
function FragmentContent({
  stopIndex,
  data,
}: {
  stopIndex: number;
  data: HeroDemoContent;
}) {
  switch (stopIndex) {
    case 0: // Found
      return (
        <div className="bg-paper rounded-[14px] border border-line p-3.5 text-left min-h-[140px] flex flex-col justify-between">
          {/* Miniature Search Box */}
          <div className="bg-surface rounded-[8px] border border-line px-2.5 py-1.5 text-[0.8125rem] text-ink-soft mb-2.5 truncate">
            🔍 {data.found.query}
          </div>
          {/* Miniature Ad Result */}
          <div>
            <div className="inline-block px-1.5 py-0.5 rounded-[4px] border border-ink/20 text-[0.6875rem] font-bold text-ink leading-none mb-1">
              Ad
            </div>
            <p className="font-body font-medium text-[0.875rem] text-ink leading-snug line-clamp-2 m-0 mb-1">
              {data.found.adTitle}
            </p>
            <p className="text-[0.75rem] text-ink-soft leading-normal line-clamp-2 m-0">
              {data.found.adLine}
            </p>
          </div>
        </div>
      );

    case 1: // Landed
      return (
        <div className="bg-paper rounded-[14px] border border-line p-3.5 text-left min-h-[140px] flex flex-col justify-between">
          <div>
            <p className="font-body font-medium text-[0.875rem] text-ink leading-snug line-clamp-2 m-0 mb-1">
              {data.landed.headline}
            </p>
            <p className="text-[0.75rem] text-ink-soft leading-normal line-clamp-2 m-0">
              {data.landed.line}
            </p>
          </div>
          <div className="mt-2.5">
            <span className="inline-block bg-ink text-white text-[0.75rem] font-medium px-3 py-1.5 rounded-full select-none truncate max-w-full">
              {data.landed.button}
            </span>
          </div>
        </div>
      );

    case 2: // Enquired
      return (
        <div className="bg-paper rounded-[14px] border border-line p-3.5 text-left min-h-[140px] flex flex-col justify-between">
          <div>
            <span className="inline-block text-[0.6875rem] font-medium text-dot-ink uppercase tracking-wider mb-1">
              New enquiry
            </span>
            <p className="font-body font-medium text-[0.875rem] text-ink leading-snug m-0 mb-1">
              {data.enquired.name}, {data.enquired.suburb}
            </p>
            <p className="text-[0.75rem] text-ink-soft leading-normal italic line-clamp-3 m-0">
              &ldquo;{data.enquired.message}&rdquo;
            </p>
          </div>
        </div>
      );

    case 3: // Followed up
      return (
        <div className="bg-paper rounded-[14px] border border-line p-3.5 text-left min-h-[140px] flex flex-col justify-between">
          <div className="bg-surface rounded-[10px] border border-line p-2.5 text-[0.75rem] text-ink leading-relaxed">
            {data.followedUp.text}
          </div>
          <p className="text-[0.6875rem] text-ink-soft m-0 mt-2">
            Sent automatically
          </p>
        </div>
      );

    case 4: // Booked
      return (
        <div className="bg-paper rounded-[14px] border border-line p-3.5 text-left min-h-[140px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[0.6875rem] font-medium text-ink-soft uppercase tracking-wider">
                Confirmed
              </span>
              {/* Mint check SVG */}
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-dot/20 text-dot-ink">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="2.5 6 4.8 8.5 9.5 3.5" />
                </svg>
              </span>
            </div>
            <p className="font-body font-medium text-[0.875rem] text-ink leading-snug m-0 mb-0.5">
              {data.booked.day}, {data.booked.time}
            </p>
            <p className="text-[0.75rem] text-ink-soft leading-normal m-0">
              {data.booked.job}
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
