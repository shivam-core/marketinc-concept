"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { HandArrow } from "./SketchPrimitives";

interface DesignNotesContextValue {
  enabled: boolean;
  toggle: () => void;
}

const DesignNotesContext = createContext<DesignNotesContextValue>({
  enabled: false,
  toggle: () => {},
});

export function DesignNotesProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return (
    <DesignNotesContext.Provider value={{ enabled, toggle }}>
      {children}
    </DesignNotesContext.Provider>
  );
}

export function useDesignNotes() {
  return useContext(DesignNotesContext);
}

// ── Floating pill at bottom-left on desktop ──
export function FloatingDesignNotesButton() {
  const { enabled, toggle } = useDesignNotes();

  return (
    <div className="hidden lg:block fixed bottom-6 left-6 z-40">
      <button
        type="button"
        onClick={toggle}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.875rem] font-medium transition-all duration-200 border shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
          enabled
            ? "bg-sky text-navy border-sky"
            : "bg-navy-raised/90 backdrop-blur-md text-mist border-white/14 hover:text-white"
        }`}
        aria-label="Toggle design notes mode"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            enabled ? "bg-navy animate-pulse" : "bg-mist"
          }`}
        />
        <span>Design notes {enabled ? "ON" : "OFF"}</span>
      </button>
    </div>
  );
}

// ── Restyled Design Note Card (Sky sticky note, Caveat title, DM Sans body, hand-drawn arrow) ──
interface DesignNoteCardProps {
  number: number;
  title: string;
  note: string;
  arrowDirection?: "down-right" | "down-left" | "right-down" | "up-right";
  className?: string;
}

const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-[1deg]", "rotate-2", "-rotate-[2.5deg]"];

export function DesignNoteCard({
  number,
  title,
  note,
  arrowDirection = "down-right",
  className = "",
}: DesignNoteCardProps) {
  const { enabled } = useDesignNotes();

  if (!enabled) return null;

  const tiltClass = tilts[(number - 1) % tilts.length];
  const delayMs = number * 60;

  return (
    <aside
      className={`my-4 max-w-[380px] z-20 select-none ${className}`}
      role="note"
      aria-label={`Design note ${number}: ${title}`}
      style={{
        animation: `note-settle 300ms ease-out ${delayMs}ms both`,
      }}
    >
      <div
        className={`tilt-card rounded-[4px] bg-sky text-navy p-5 shadow-lg border border-navy/10 ${tiltClass}`}
      >
        <div className="flex items-start gap-2.5 mb-1.5">
          <span className="tabular-nums inline-flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[0.875rem] font-bold text-sky flex-shrink-0 mt-0.5">
            {number}
          </span>
          <p className="font-hand text-[26px] font-semibold text-navy leading-[1.1] m-0">
            {title}
          </p>
        </div>
        <p className="font-body text-[15px] text-navy/90 leading-relaxed m-0 pl-8">
          {note}
        </p>

        {/* Hand-drawn arrow pointing to content */}
        <div className="flex justify-end pt-2 pr-2">
          <HandArrow direction={arrowDirection} color="navy" />
        </div>
      </div>

      <style jsx>{`
        @keyframes note-settle {
          0% {
            opacity: 0;
            transform: scale(0.9) rotate(-6deg);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </aside>
  );
}
