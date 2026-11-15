import React from "react";
import { Hero } from "@/components/Hero";
import { FactsSection } from "@/components/FactsSection";
import { SearchTicker } from "@/components/SearchTicker";
import { SoundFamiliarSection } from "@/components/SoundFamiliarSection";
import { SystemSection } from "@/components/SystemSection";
import { ServicesSection } from "@/components/ServicesSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { WaysSection } from "@/components/WaysSection";
import { ResultsSection } from "@/components/ResultsSection";
import { FounderReelsSection } from "@/components/FounderReelsSection";
import { FAQSection } from "@/components/FAQSection";
import { BriefSection } from "@/components/BriefSection";
import { DesignNoteCard } from "@/components/DesignNotes";

export default function HomePage() {
  return (
    <>
      {/* Design Note 10 for Navigation */}
      <div className="container-site">
        <DesignNoteCard
          number={10}
          title="One page, one path"
          note="Every link scrolls down the same story, so a visitor never lands on a thin inner page with no way forward."
          arrowDirection="right-down"
          className="pt-24 -mb-20"
        />
      </div>

      {/* 9.2 Hero & 9.3 Lead line demo */}
      <Hero />

      {/* 9.4 Three facts */}
      <FactsSection />

      {/* 9.5 Search ticker */}
      <SearchTicker />

      {/* 9.6 Sound familiar? */}
      <SoundFamiliarSection />

      {/* 9.7 How it works (#system) */}
      <SystemSection />

      {/* 9.8 Services (#services) */}
      <ServicesSection />

      {/* 9.9 Industries (#industries) */}
      <IndustriesSection />

      {/* 9.10 Working with us (#ways) */}
      <WaysSection />

      {/* 9.11 Results */}
      <ResultsSection />

      {/* Meet the Founder (Instagram Reels) */}
      <FounderReelsSection />

      {/* 9.12 Questions (#faq) */}
      <FAQSection />

      {/* 9.13 Brief (#brief) */}
      <BriefSection />
    </>
  );
}
