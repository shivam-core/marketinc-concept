import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site py-24 lg:py-36 flex flex-col items-start min-h-[50svh]">
      <h1 className="text-display-l text-ink font-bold tracking-[-0.03em] leading-tight m-0 mb-4">
        This lead went missing
      </h1>
      <p className="font-body text-body-l text-ink-soft leading-[1.45] prose-max m-0 mb-8">
        The page you&rsquo;re after isn&rsquo;t here.
      </p>

      {/* Primary button back to home labelled 'Back to home' (spec allowed exception) */}
      <Link
        href="/"
        className="inline-flex items-center justify-center h-[52px] min-h-[44px] px-7 rounded-[999px] bg-ink text-white font-body font-medium text-[1rem] leading-none active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        Back to home
      </Link>
    </div>
  );
}
