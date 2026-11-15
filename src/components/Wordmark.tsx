import React from "react";

interface WordmarkProps {
  onDark?: boolean;
  className?: string;
  size?: "default" | "large" | "hero";
}

export function Wordmark({
  onDark = false,
  className = "",
  size = "default",
}: WordmarkProps) {
  const textColor = onDark ? "text-white" : "text-ink";

  return (
    <span
      className={`font-display font-bold tracking-[-0.03em] leading-none inline-flex items-baseline select-none ${textColor} ${className}`}
      aria-label="MarketInc"
      role="img"
    >
      <span aria-hidden="true" className="inline-flex items-baseline">
        <span>market</span>
        {/* Dotless ı with mint circle above */}
        <span className="relative inline-block">
          <span>ı</span>
          <span
            className="absolute left-1/2 -translate-x-1/2 top-[0.12em] w-[0.22em] h-[0.22em] rounded-full bg-mint"
            aria-hidden="true"
          />
        </span>
        <span>nc</span>
        {/* Mint full stop following the 'c' */}
        <span
          className="inline-block w-[0.22em] h-[0.22em] rounded-full bg-mint ml-[0.05em] translate-y-[-0.05em]"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
