"use client";

import React from "react";
import { useDesignNotes } from "./DesignNotes";

export function ConceptBar() {
  const { enabled, toggle } = useDesignNotes();

  return (
    <aside
      aria-label="Concept disclaimer and design controls"
      className="w-full bg-deep text-white text-[0.875rem] py-2 px-5 sm:px-8 lg:px-12 border-b border-white/10"
    >
      <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-white/90 text-[0.875rem] leading-snug">
          Unofficial redesign concept by Shivam Kore. Not affiliated with MarketInc.
        </p>

        <label
          htmlFor="design-notes-switch"
          className="inline-flex items-center gap-2 cursor-pointer select-none text-[0.875rem] text-white hover:text-white/90"
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
            <div className="w-9 h-5 bg-white/20 peer-focus-visible:ring-2 peer-focus-visible:ring-dot rounded-full peer peer-checked:bg-dot transition-colors duration-200">
              <div
                className={`w-3.5 h-3.5 bg-deep rounded-full absolute top-[3px] left-[3px] transition-transform duration-200 ${
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
