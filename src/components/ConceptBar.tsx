"use client";

import React from "react";
import { useDesignNotes } from "./DesignNotes";

export function ConceptBar() {
  const { enabled, toggle } = useDesignNotes();

  return (
    <aside
      id="concept-bar"
      aria-label="Concept disclaimer and design controls"
      className="w-full bg-navy-deep text-white text-[0.8125rem] py-1.5 px-4 sm:px-8 lg:px-12 border-b border-line/60 relative z-50 transition-colors"
    >
      <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-2">
        <p className="m-0 text-mist text-[0.75rem] sm:text-[0.8125rem] leading-snug">
          Unofficial concept by{" "}
          <a
            href="https://x.com/shivamcore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mint font-semibold underline decoration-mint/60 underline-offset-[3px] hover:text-white hover:decoration-mint transition-colors"
          >
            Shivam Kore
          </a>
          <span className="hidden sm:inline">. Not affiliated with MarketInc</span>.
        </p>

        <label
          htmlFor="design-notes-switch"
          className="inline-flex items-center gap-2 cursor-pointer select-none text-[0.75rem] sm:text-[0.8125rem] text-mist hover:text-white transition-colors flex-shrink-0"
        >
          <span>Design notes</span>
          <div className="relative inline-flex items-center">
            <input
              id="design-notes-switch"
              type="checkbox"
              checked={enabled}
              onChange={toggle}
              className="sr-only peer"
              aria-label="Toggle design notes mode"
            />
            <div className="w-8 h-4 bg-white/20 peer-focus-visible:ring-2 peer-focus-visible:ring-mint rounded-full peer peer-checked:bg-mint transition-colors duration-200">
              <div
                className={`w-3 h-3 bg-navy-deep rounded-full absolute top-[2px] left-[2px] transition-transform duration-200 ${
                  enabled ? "translate-x-4" : ""
                }`}
              />
            </div>
          </div>
        </label>
      </div>
    </aside>
  );
}
