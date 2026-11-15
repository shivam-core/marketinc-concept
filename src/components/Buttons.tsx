import React from "react";
import Link from "next/link";

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  onDark?: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function PrimaryButton({
  href = "/brief",
  onClick,
  onDark = false,
  className = "",
  children = "Book a strategy call",
  type = "button",
  disabled = false,
}: PrimaryButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    h-[52px] min-h-[44px] px-7
    rounded-[999px] font-body font-medium text-[1rem] leading-none
    transition-transform duration-150 active:scale-[0.98]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none select-none
    ${
      onDark
        ? "bg-white text-ink focus-visible:ring-dot focus-visible:ring-offset-deep"
        : "bg-ink text-white focus-visible:ring-ink focus-visible:ring-offset-paper"
    }
    ${className}
  `.trim().replace(/\s+/g, " ");

  if (href) {
    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}

interface SecondaryButtonProps {
  href?: string;
  onClick?: () => void;
  onDark?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function SecondaryButton({
  href,
  onClick,
  onDark = false,
  className = "",
  children,
  type = "button",
  disabled = false,
}: SecondaryButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    h-[52px] min-h-[44px] px-7
    rounded-[999px] font-body font-medium text-[1rem] leading-none
    border-[1.5px] bg-transparent
    transition-transform duration-150 active:scale-[0.98]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none select-none
    ${
      onDark
        ? "border-white/30 text-white hover:border-white focus-visible:ring-dot focus-visible:ring-offset-deep"
        : "border-ink/30 text-ink hover:border-ink focus-visible:ring-ink focus-visible:ring-offset-paper"
    }
    ${className}
  `.trim().replace(/\s+/g, " ");

  if (href) {
    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
