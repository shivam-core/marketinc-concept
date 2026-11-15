import React from "react";

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function PrimaryButton({
  href = "#brief",
  onClick,
  className = "",
  children = "Book a strategy call",
  type = "button",
  disabled = false,
}: PrimaryButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    h-[52px] min-h-[44px] px-7
    rounded-[999px] font-body font-medium text-[1rem] leading-none
    bg-mint text-navy
    transition-transform duration-150 active:scale-[0.98]
    hover:opacity-95
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy
    disabled:opacity-50 disabled:pointer-events-none select-none
    ${className}
  `.trim().replace(/\s+/g, " ");

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {children}
      </a>
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
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function SecondaryButton({
  href,
  onClick,
  className = "",
  children,
  type = "button",
  disabled = false,
}: SecondaryButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    h-[52px] min-h-[44px] px-7
    rounded-[999px] font-body font-medium text-[1rem] leading-none
    border-[1.5px] border-white/30 text-white bg-transparent
    transition-transform duration-150 active:scale-[0.98]
    hover:border-white hover:text-white
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy
    disabled:opacity-50 disabled:pointer-events-none select-none
    ${className}
  `.trim().replace(/\s+/g, " ");

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {children}
      </a>
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
