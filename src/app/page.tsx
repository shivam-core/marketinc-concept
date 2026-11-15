import { Hero } from "@/components/Hero";
import { ClientsSection } from "@/components/ClientsSection";
import { SystemSection } from "@/components/SystemSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ProofSection } from "@/components/ProofSection";
import { HowWeWorkSection } from "@/components/HowWeWorkSection";
import { FinalCTA } from "@/components/FinalCTA";
import { QuestionsSection } from "@/components/QuestionsSection";
import { DesignNoteCard } from "@/components/DesignNotes";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsSection />
      <SystemSection />
      <IndustriesSection />
      <ProofSection />
      <HowWeWorkSection />
      <FinalCTA animate={true} />
      <QuestionsSection />
      <div className="container-site pb-8">
        <DesignNoteCard
          number={9}
          title="The phone number is always one tap away"
          note="Trades and clinics get most of their own leads by phone, so their agency's site should work the same way."
        />
      </div>
    </>
  );
}
