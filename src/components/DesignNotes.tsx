"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

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

interface DesignNoteCardProps {
  number: number;
  title: string;
  note: string;
}

export function DesignNoteCard({ number, title, note }: DesignNoteCardProps) {
  const { enabled } = useDesignNotes();

  if (!enabled) return null;

  return (
    <div
      className="my-4 max-w-[360px] rounded-[14px] border-2 border-dot bg-surface p-4 transition-opacity duration-200"
      role="note"
      aria-label={`Design note ${number}: ${title}`}
    >
      <div className="mb-1 flex items-center gap-2">
        <span
          className="tabular-nums inline-flex h-6 w-6 items-center justify-center rounded-full bg-dot text-sm font-medium text-deep"
        >
          {number}
        </span>
        <span className="text-sm font-medium text-ink">{title}</span>
      </div>
      <p className="text-small text-ink-soft m-0">{note}</p>
    </div>
  );
}
