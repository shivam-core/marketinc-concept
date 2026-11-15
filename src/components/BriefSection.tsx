"use client";

import React, { useState, useRef, useEffect } from "react";
import { RoughMark, HandArrow } from "./SketchPrimitives";
import { SecondaryButton } from "./Buttons";
import { DesignNoteCard } from "./DesignNotes";
import { motion, useInView, useReducedMotion } from "motion/react";

type BusinessType =
  | "Home or trade services"
  | "Healthcare"
  | "Professional services"
  | "Finance or investment"
  | "Something else";

type LeakOption =
  | "Not enough people find us"
  | "People visit the site but don't enquire"
  | "Enquiries come in but we're slow to reply"
  | "We send quotes and never follow up"
  | "Not sure, that's why I'm here";

interface FormData {
  businessType: BusinessType | "";
  leaks: LeakOption[];
  name: string;
  businessName: string;
  phone: string;
  email: string;
}

const businessOptions: BusinessType[] = [
  "Home or trade services",
  "Healthcare",
  "Professional services",
  "Finance or investment",
  "Something else",
];

const leakOptions: LeakOption[] = [
  "Not enough people find us",
  "People visit the site but don't enquire",
  "Enquiries come in but we're slow to reply",
  "We send quotes and never follow up",
  "Not sure, that's why I'm here",
];

export function BriefSection() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 4 = Result screen
  const [formData, setFormData] = useState<FormData>({
    businessType: "",
    leaks: [],
    name: "",
    businessName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const prefersReduced = useReducedMotion();
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  const handleBusinessTypeChange = (val: BusinessType) => {
    setFormData((prev) => ({ ...prev, businessType: val }));
    setErrors((prev) => ({ ...prev, businessType: "" }));
  };

  const handleLeakToggle = (val: LeakOption) => {
    setFormData((prev) => {
      const exists = prev.leaks.includes(val);
      const updated = exists
        ? prev.leaks.filter((l) => l !== val)
        : [...prev.leaks, val];
      return { ...prev, leaks: updated };
    });
    setErrors((prev) => ({ ...prev, leaks: "" }));
  };

  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.businessType) {
        errs.businessType = "Please select what kind of business you run.";
      }
    } else if (currentStep === 2) {
      if (formData.leaks.length === 0) {
        errs.leaks = "Please choose at least one option where leads go missing.";
      }
    } else if (currentStep === 3) {
      if (!formData.phone.trim()) {
        errs.phone = "Please enter your phone number so we can reach you.";
      }
      if (!formData.email.trim()) {
        errs.email = "Please enter your email address.";
      } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
        errs.email = "Please enter a valid email address.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
      setErrors({});
    }
  };

  const handleRestart = () => {
    setFormData({
      businessType: "",
      leaks: [],
      name: "",
      businessName: "",
      phone: "",
      email: "",
    });
    setErrors({});
    setStep(1);
  };

  // Mapped stops and services for Result screen
  const getMappedStopsAndServices = () => {
    const butterStops: number[] = [];
    const recommendedServices: { name: string; href: string }[] = [];

    if (formData.leaks.includes("Not enough people find us")) {
      butterStops.push(1);
      recommendedServices.push(
        { name: "Google Ads", href: "#services" },
        { name: "Meta Ads", href: "#services" },
        { name: "SEO", href: "#services" }
      );
    }
    if (formData.leaks.includes("People visit the site but don't enquire")) {
      butterStops.push(2);
      butterStops.push(3);
      recommendedServices.push({ name: "Website design", href: "#services" });
    }
    if (formData.leaks.includes("Enquiries come in but we're slow to reply")) {
      butterStops.push(4);
      recommendedServices.push({
        name: "CRM and automation",
        href: "#services",
      });
    }
    if (formData.leaks.includes("We send quotes and never follow up")) {
      if (!butterStops.includes(4)) butterStops.push(4);
      if (!recommendedServices.some((s) => s.name === "CRM and automation")) {
        recommendedServices.push({
          name: "CRM and automation",
          href: "#services",
        });
      }
    }

    // Deduplicate
    const uniqueServices = recommendedServices.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );

    return {
      butterStops,
      recommendedServices:
        uniqueServices.length > 0
          ? uniqueServices
          : [{ name: "One system review", href: "#services" }],
    };
  };

  const { butterStops, recommendedServices } = getMappedStopsAndServices();

  return (
    <section
      id="brief"
      aria-labelledby="brief-heading"
      className="container-site section-py scroll-mt-24"
    >
      <DesignNoteCard
        number={8}
        title="Form that respects the user's time"
        note="Three quick questions that diagnose where leads go missing before asking for contact details. Instant feedback shows which services address the leaks."
        arrowDirection="down-right"
      />

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column (Heading, Text, Phone Button) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2
              id="brief-heading"
              ref={headingRef}
              className="text-display-l text-white font-bold tracking-[-0.03em] leading-[1.05] m-0 mb-6"
            >
              <span>Start with a useful </span>
              {/* Keep full stop strictly inline with last word so it never wraps alone */}
              <span className="whitespace-nowrap inline-block relative">
                <RoughMark type="underline" color="#7CC8AE" iterations={2}>
                  conversation
                </RoughMark>
                {/* Semantic screen reader dot */}
                <span className="sr-only">.</span>
                {/* Visual Mint Dot with drop-in animation */}
                {!prefersReduced ? (
                  <motion.span
                    aria-hidden="true"
                    initial={{ y: -30, opacity: 0 }}
                    animate={
                      headingInView
                        ? { y: 0, opacity: 1 }
                        : { y: -30, opacity: 0 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="inline-block w-[0.22em] h-[0.22em] rounded-full bg-mint ml-[0.06em] align-baseline translate-y-[-0.05em]"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-block w-[0.22em] h-[0.22em] rounded-full bg-mint ml-[0.06em] align-baseline translate-y-[-0.05em]"
                  />
                )}
              </span>
            </h2>

            <p className="font-body text-body-l text-mist leading-[1.45] max-w-md m-0 mb-8">
              Tell us where growth feels stuck. A focused three-step brief helps us prepare practical ideas before we speak. One working day response — no pressure, no recycled pitch deck.
            </p>

            <div className="mb-8">
              <SecondaryButton href="tel:+61450406450">
                Call 0450 406 450
              </SecondaryButton>
            </div>
          </div>

          {/* Handwriting note pointing to the panel */}
          <div className="hidden lg:flex items-center gap-2 text-mint select-none pt-4">
            <span className="font-hand text-[24px]">takes about a minute</span>
            <HandArrow direction="right-down" color="mint" className="w-7 h-6 rotate-12" />
          </div>
        </div>

        {/* Right Column (The 3-Step Form Panel) */}
        <div className="lg:col-span-7 w-full">
          {/* Mobile note above panel */}
          <div className="lg:hidden flex items-center gap-2 text-mint select-none mb-3">
            <span className="font-hand text-[22px]">takes about a minute</span>
            <HandArrow direction="down-right" color="mint" className="w-5 h-5" />
          </div>

          <div className="rounded-[20px] bg-navy-raised border border-line p-6 sm:p-8 lg:p-10 shadow-2xl relative">
            {step < 4 ? (
              <form onSubmit={handleNext} noValidate>
                {/* Mint Progress Line */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-small font-medium text-mist mb-2">
                    <span>Step {step} of 3</span>
                    <span>
                      {step === 1
                        ? "Your business"
                        : step === 2
                        ? "Where leads go missing"
                        : "Contact details"}
                    </span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full bg-navy-deep overflow-hidden"
                    role="progressbar"
                    aria-label="Brief submission progress"
                    aria-valuenow={step}
                    aria-valuemin={1}
                    aria-valuemax={3}
                  >
                    <div
                      className="h-full bg-mint transition-all duration-300 ease-out"
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* STEP 1: Business Type */}
                {step === 1 && (
                  <fieldset
                    className="border-0 p-0 m-0"
                    aria-describedby={errors.businessType ? "businessType-error" : undefined}
                  >
                    <legend className="sr-only">Step 1: Your business type</legend>
                    <h3
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="font-display font-bold text-display-m text-white m-0 mb-6 focus:outline-none"
                    >
                      What kind of business do you run?
                    </h3>

                    <div className="space-y-3 mb-6">
                      {businessOptions.map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors ${
                            formData.businessType === opt
                              ? "bg-navy-deep border-mint text-white"
                              : "bg-navy-deep/60 border-line text-mist hover:border-white/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="businessType"
                            value={opt}
                            checked={formData.businessType === opt}
                            onChange={() => handleBusinessTypeChange(opt)}
                            className="w-5 h-5 text-mint border-line focus:ring-mint focus:ring-offset-navy-deep accent-mint"
                          />
                          <span className="font-body text-[1rem] font-medium">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>

                    {errors.businessType && (
                      <p
                        id="businessType-error"
                        role="alert"
                        className="text-butter text-[0.875rem] font-medium mb-4"
                      >
                        {errors.businessType}
                      </p>
                    )}
                  </fieldset>
                )}

                {/* STEP 2: Leaks */}
                {step === 2 && (
                  <fieldset
                    className="border-0 p-0 m-0"
                    aria-describedby={errors.leaks ? "leaks-error" : undefined}
                  >
                    <legend className="sr-only">Step 2: Where leads go missing</legend>
                    <h3
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="font-display font-bold text-display-m text-white m-0 mb-2 focus:outline-none"
                    >
                      Where do you feel leads are going missing?
                    </h3>
                    <p className="font-body text-small text-mist m-0 mb-6">
                      Select all that apply.
                    </p>

                    <div className="space-y-3 mb-6">
                      {leakOptions.map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center gap-3 p-4 rounded-[12px] border cursor-pointer transition-colors ${
                            formData.leaks.includes(opt)
                              ? "bg-navy-deep border-mint text-white"
                              : "bg-navy-deep/60 border-line text-mist hover:border-white/30"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={opt}
                            checked={formData.leaks.includes(opt)}
                            onChange={() => handleLeakToggle(opt)}
                            className="w-5 h-5 text-mint rounded border-line focus:ring-mint focus:ring-offset-navy-deep accent-mint"
                          />
                          <span className="font-body text-[1rem] font-medium">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>

                    {errors.leaks && (
                      <p
                        id="leaks-error"
                        role="alert"
                        className="text-butter text-[0.875rem] font-medium mb-4"
                      >
                        {errors.leaks}
                      </p>
                    )}
                  </fieldset>
                )}

                {/* STEP 3: Contact Details */}
                {step === 3 && (
                  <div>
                    <h3
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="font-display font-bold text-display-m text-white m-0 mb-2 focus:outline-none"
                    >
                      Where should we send your plan?
                    </h3>
                    <p className="font-body text-small text-mist m-0 mb-6">
                      We reply within one working day. No sales calls, no automated follow-up bombardment.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-small font-medium text-mist mb-1.5"
                        >
                          Your name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-[10px] bg-navy-deep border border-line text-white placeholder-mist/40 text-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:border-transparent"
                          placeholder="Jane Smith"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="businessName"
                          className="block text-small font-medium text-mist mb-1.5"
                        >
                          Business name
                        </label>
                        <input
                          type="text"
                          id="businessName"
                          name="organization"
                          autoComplete="organization"
                          value={formData.businessName}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              businessName: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-[10px] bg-navy-deep border border-line text-white placeholder-mist/40 text-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:border-transparent"
                          placeholder="Smith Electrical"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-small font-medium text-mist mb-1.5"
                        >
                          Phone number <span className="text-butter">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="tel"
                          autoComplete="tel"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, phone: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-[10px] bg-navy-deep border border-line text-white placeholder-mist/40 text-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:border-transparent"
                          placeholder="0400 000 000"
                        />
                        {errors.phone && (
                          <p
                            id="phone-error"
                            role="alert"
                            className="text-butter text-[0.875rem] font-medium mt-1"
                          >
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-small font-medium text-mist mb-1.5"
                        >
                          Email address <span className="text-butter">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="email"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, email: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-[10px] bg-navy-deep border border-line text-white placeholder-mist/40 text-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:border-transparent"
                          placeholder="jane@smithelectrical.com.au"
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            role="alert"
                            className="text-butter text-[0.875rem] font-medium mt-1"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-line/60">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="font-body text-small font-medium text-mist hover:text-white min-h-[44px] px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center h-[52px] min-h-[44px] px-8 rounded-[999px] bg-mint text-navy font-body font-medium text-[1rem] active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  >
                    {step === 3 ? "See recommendation" : "Continue"}
                  </button>
                </div>
              </form>
            ) : (
              /* RESULT SCREEN */
              <div role="region" aria-label="Recommendation results">
                <h3
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className="font-display font-bold text-display-m text-white m-0 mb-6 focus:outline-none"
                >
                  Here&apos;s where we&apos;d start
                </h3>

                {/* The five-stop line with matched stops marked */}
                <div className="relative pt-4 pb-8 mb-8 border-b border-line/60">
                  <div className="grid grid-cols-5 gap-2 relative z-10">
                    {[
                      { num: 1, label: "Found" },
                      { num: 2, label: "Landed" },
                      { num: 3, label: "Enquired" },
                      { num: 4, label: "Followed up" },
                      { num: 5, label: "Booked" },
                    ].map((s) => {
                      const isAffected = butterStops.includes(s.num);
                      return (
                        <div
                          key={s.num}
                          className="flex flex-col items-center text-center"
                        >
                          <div
                            className={`w-4 h-4 rounded-full mb-2 ${
                              isAffected
                                ? "bg-butter ring-4 ring-butter/20"
                                : "bg-navy-deep border-2 border-line"
                            }`}
                          />
                          <span
                            className={`tabular-nums text-[0.875rem] font-medium leading-tight ${
                              isAffected ? "text-butter font-bold" : "text-mist"
                            }`}
                          >
                            {s.num}. {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommended Services List */}
                <div className="mb-8">
                  <p className="font-display font-bold text-[1.125rem] text-white m-0 mb-3">
                    Recommended services for your business
                  </p>
                  <ul className="space-y-2.5 p-0 m-0 list-none font-body text-[1rem]">
                    {recommendedServices.map((srv) => (
                      <li key={srv.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-mint" />
                        <a
                          href={srv.href}
                          className="text-mint font-medium underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                        >
                          {srv.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mandatory Concept Notice */}
                <div className="p-5 mb-8 rounded-[12px] bg-navy-deep border-2 border-dashed border-white/20">
                  <p className="font-body text-small text-mist m-0 leading-relaxed">
                    This is a design concept. Nothing was sent and nothing was saved. On the live site, this brief would go straight to the MarketInc team.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center justify-center h-[48px] px-6 rounded-[999px] border border-white/20 text-white font-body text-[0.9375rem] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  >
                    Start again
                  </button>
                  <SecondaryButton href="tel:+61450406450">
                    Call 0450 406 450
                  </SecondaryButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
