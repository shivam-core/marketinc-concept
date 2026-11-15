"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { DesignNoteCard } from "@/components/DesignNotes";
import { SecondaryButton } from "@/components/Buttons";

// Types
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

export default function BriefPage() {
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

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Move focus to heading on step change
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

  const handleNext = () => {
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

  // Mapping answers to stops & services for the Result Screen
  const getMappedStopsAndServices = () => {
    const amberStops: number[] = [];
    const recommendedServices: { name: string; href: string }[] = [];

    if (formData.leaks.includes("Not enough people find us")) {
      amberStops.push(1);
      recommendedServices.push(
        { name: "Google Ads", href: "/services/google-ads" },
        { name: "Meta Ads", href: "/services/meta-ads" },
        { name: "SEO", href: "/services/seo" }
      );
    }
    if (formData.leaks.includes("People visit the site but don't enquire")) {
      amberStops.push(2, 3);
      recommendedServices.push({
        name: "Website design",
        href: "/services/website-design",
      });
    }
    if (
      formData.leaks.includes("Enquiries come in but we're slow to reply") ||
      formData.leaks.includes("We send quotes and never follow up")
    ) {
      amberStops.push(4);
      recommendedServices.push({
        name: "CRM and automation",
        href: "/services/crm-automation",
      });
    }
    if (formData.leaks.includes("Not sure, that's why I'm here")) {
      amberStops.push(1, 2, 3, 4);
      recommendedServices.push(
        { name: "Full system review", href: "/services" },
        { name: "Google Ads & Meta Ads", href: "/services/google-ads" },
        { name: "Website design", href: "/services/website-design" },
        { name: "CRM and automation", href: "/services/crm-automation" }
      );
    }

    // Deduplicate
    const uniqueServices = Array.from(
      new Map(recommendedServices.map((s) => [s.name, s])).values()
    );

    return {
      amberStops: Array.from(new Set(amberStops)),
      services: uniqueServices,
    };
  };

  const { amberStops, services: recommendedServices } = getMappedStopsAndServices();

  return (
    <div className="container-site py-12 lg:py-20 min-h-[calc(100svh-80px)]">
      <DesignNoteCard
        number={8}
        title="Ask about the problem, not the service"
        note="Owners know where it hurts, not which service fixes it. The form asks where leads go missing and recommends the services for them."
      />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* On mobile: form comes FIRST. On desktop: left column is cols 1-5, form is cols 6-12. */}

        {/* LEFT COLUMN (Desktop order: 1, Mobile order: 2) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col gap-8">
          <div>
            <h1 className="text-display-l text-ink font-bold tracking-[-0.03em] leading-tight m-0 mb-4">
              Tell us where leads go missing
            </h1>
            <p className="font-body text-body-l text-ink-soft leading-[1.45] prose-max m-0">
              Three quick questions. We reply within one working day.
            </p>
          </div>

          <div className="border-t border-line pt-6">
            <p className="font-display font-bold text-[1.125rem] text-ink m-0 mb-4">
              What happens next
            </p>
            <ol className="space-y-4 m-0 p-0 list-none text-body text-ink-soft font-body">
              <li className="flex items-baseline gap-3">
                <span className="tabular-nums font-bold text-ink">1.</span>
                <span>We read your answers.</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="tabular-nums font-bold text-ink">2.</span>
                <span>We call or email to set a time.</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="tabular-nums font-bold text-ink">3.</span>
                <span>You leave the call with clear next steps.</span>
              </li>
            </ol>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM PANEL (Desktop order: 2, Mobile order: 1) */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="bg-surface rounded-[24px] border border-line p-6 sm:p-8 lg:p-10 shadow-sm">
            {step < 4 ? (
              <div>
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-small text-ink-soft mb-2.5">
                    <span className="tabular-nums font-medium text-ink">
                      Step {step} of 3
                    </span>
                    <span>
                      {step === 1 && "Business type"}
                      {step === 2 && "Missing leads"}
                      {step === 3 && "Contact details"}
                    </span>
                  </div>
                  {/* Progress Line */}
                  <div className="w-full h-1.5 bg-paper rounded-full overflow-hidden">
                    <div
                      className="h-full bg-dot transition-all duration-300 ease-out"
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  noValidate
                >
                  {/* STEP 1: What kind of business do you run? */}
                  {step === 1 && (
                    <fieldset className="border-none p-0 m-0">
                      <legend className="sr-only">Business type</legend>
                      <h2
                        ref={stepHeadingRef}
                        tabIndex={-1}
                        className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-6 focus:outline-none"
                      >
                        What kind of business do you run?
                      </h2>

                      {errors.businessType && (
                        <p
                          role="alert"
                          className="text-small text-red-600 font-medium mb-4"
                        >
                          {errors.businessType}
                        </p>
                      )}

                      <div className="space-y-3">
                        {businessOptions.map((opt) => {
                          const isSelected = formData.businessType === opt;
                          return (
                            <label
                              key={opt}
                              className={`flex items-center justify-between min-h-[56px] px-5 py-3.5 rounded-[14px] border cursor-pointer select-none transition-colors duration-150 ${
                                isSelected
                                  ? "border-2 border-ink bg-paper/50"
                                  : "border-line bg-surface hover:border-ink/40"
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <input
                                  type="radio"
                                  name="businessType"
                                  value={opt}
                                  checked={isSelected}
                                  onChange={() => handleBusinessTypeChange(opt)}
                                  className="w-4 h-4 text-ink focus:ring-ink focus:ring-offset-2"
                                />
                                <span className="font-body text-[1rem] text-ink font-medium">
                                  {opt}
                                </span>
                              </div>

                              {/* Mint check when selected */}
                              {isSelected && (
                                <span className="text-dot flex-shrink-0">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <polyline points="4 10 8 14 16 6" />
                                  </svg>
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  {/* STEP 2: Where do leads go missing? */}
                  {step === 2 && (
                    <fieldset className="border-none p-0 m-0">
                      <legend className="sr-only">Missing leads</legend>
                      <h2
                        ref={stepHeadingRef}
                        tabIndex={-1}
                        className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-2 focus:outline-none"
                      >
                        Where do leads go missing?
                      </h2>
                      <p className="text-small text-ink-soft m-0 mb-6">
                        Choose all that apply
                      </p>

                      {errors.leaks && (
                        <p
                          role="alert"
                          className="text-small text-red-600 font-medium mb-4"
                        >
                          {errors.leaks}
                        </p>
                      )}

                      <div className="space-y-3">
                        {leakOptions.map((opt) => {
                          const isSelected = formData.leaks.includes(opt);
                          return (
                            <label
                              key={opt}
                              className={`flex items-center justify-between min-h-[56px] px-5 py-3.5 rounded-[14px] border cursor-pointer select-none transition-colors duration-150 ${
                                isSelected
                                  ? "border-2 border-ink bg-paper/50"
                                  : "border-line bg-surface hover:border-ink/40"
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <input
                                  type="checkbox"
                                  name="leaks"
                                  value={opt}
                                  checked={isSelected}
                                  onChange={() => handleLeakToggle(opt)}
                                  className="w-4 h-4 text-ink rounded focus:ring-ink focus:ring-offset-2"
                                />
                                <span className="font-body text-[1rem] text-ink font-medium">
                                  {opt}
                                </span>
                              </div>

                              {isSelected && (
                                <span className="text-dot flex-shrink-0">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <polyline points="4 10 8 14 16 6" />
                                  </svg>
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  {/* STEP 3: Where should we reach you? */}
                  {step === 3 && (
                    <fieldset className="border-none p-0 m-0">
                      <legend className="sr-only">Contact information</legend>
                      <h2
                        ref={stepHeadingRef}
                        tabIndex={-1}
                        className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-6 focus:outline-none"
                      >
                        Where should we reach you?
                      </h2>

                      <div className="space-y-4">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="brief-name"
                            className="block text-small font-medium text-ink mb-1.5"
                          >
                            Your name
                          </label>
                          <input
                            ref={firstInputRef}
                            id="brief-name"
                            type="text"
                            autoComplete="name"
                            enterKeyHint="next"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full h-12 px-4 rounded-[14px] border border-line bg-surface text-[1rem] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                          />
                        </div>

                        {/* Business Name */}
                        <div>
                          <label
                            htmlFor="brief-business"
                            className="block text-small font-medium text-ink mb-1.5"
                          >
                            Business name
                          </label>
                          <input
                            id="brief-business"
                            type="text"
                            autoComplete="organization"
                            enterKeyHint="next"
                            value={formData.businessName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessName: e.target.value,
                              })
                            }
                            className="w-full h-12 px-4 rounded-[14px] border border-line bg-surface text-[1rem] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                          />
                        </div>

                        {/* Phone (required) */}
                        <div>
                          <label
                            htmlFor="brief-phone"
                            className="block text-small font-medium text-ink mb-1.5"
                          >
                            Phone number <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="brief-phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            enterKeyHint="next"
                            required
                            aria-required="true"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (errors.phone) setErrors({ ...errors, phone: "" });
                            }}
                            className={`w-full h-12 px-4 rounded-[14px] border bg-surface text-[1rem] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                              errors.phone ? "border-red-500" : "border-line"
                            }`}
                          />
                          {errors.phone && (
                            <p
                              role="alert"
                              className="text-small text-red-600 mt-1"
                            >
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* Email (required) */}
                        <div>
                          <label
                            htmlFor="brief-email"
                            className="block text-small font-medium text-ink mb-1.5"
                          >
                            Email address <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="brief-email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            enterKeyHint="done"
                            required
                            aria-required="true"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (errors.email) setErrors({ ...errors, email: "" });
                            }}
                            className={`w-full h-12 px-4 rounded-[14px] border bg-surface text-[1rem] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                              errors.email ? "border-red-500" : "border-line"
                            }`}
                          />
                          {errors.email && (
                            <p
                              role="alert"
                              className="text-small text-red-600 mt-1"
                            >
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </fieldset>
                  )}

                  {/* Form Action Buttons */}
                  <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-line">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="font-body font-medium text-[1rem] text-ink-soft hover:text-ink min-h-[44px] px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-sm"
                      >
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center h-[52px] min-h-[44px] px-8 rounded-[999px] bg-ink text-white font-body font-medium text-[1rem] active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      {step === 3 ? "See recommendation" : "Continue"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* RESULT SCREEN */
              <div role="region" aria-label="Recommendation results">
                <h2
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className="text-display-m text-ink font-bold tracking-[-0.03em] m-0 mb-6 focus:outline-none"
                >
                  Here&rsquo;s where we&rsquo;d start
                </h2>

                {/* The five-stop line with matched stops marked amber */}
                <div className="relative pt-4 pb-8 mb-8 border-b border-line">
                  <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-line z-0" />
                  <div className="grid grid-cols-5 gap-2 relative z-10">
                    {[
                      { num: 1, label: "Found" },
                      { num: 2, label: "Landed" },
                      { num: 3, label: "Enquired" },
                      { num: 4, label: "Followed up" },
                      { num: 5, label: "Booked" },
                    ].map((s) => {
                      const isAmber = amberStops.includes(s.num);
                      return (
                        <div key={s.num} className="flex flex-col items-center text-center">
                          <div
                            className={`w-4 h-4 rounded-full mb-2 ${
                              isAmber
                                ? "bg-leak ring-4 ring-leak/20"
                                : "bg-paper border-2 border-line"
                            }`}
                          />
                          <span
                            className={`tabular-nums text-[0.75rem] font-medium leading-tight ${
                              isAmber ? "text-ink font-bold" : "text-ink-soft"
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
                  <p className="font-display font-bold text-[1.125rem] text-ink m-0 mb-3">
                    Recommended services for your business
                  </p>
                  <ul className="space-y-2.5 p-0 m-0 list-none font-body text-[1rem]">
                    {recommendedServices.map((srv) => (
                      <li key={srv.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-dot" />
                        <Link
                          href={srv.href}
                          className="text-ink font-medium underline underline-offset-4 hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                        >
                          {srv.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mandatory Concept Notice in Dashed Panel */}
                <div className="placeholder-slot p-5 mb-8">
                  <p className="text-small text-ink-soft m-0 leading-relaxed">
                    This is a design concept. Nothing was sent and nothing was saved. On the live site, this brief would go straight to the MarketInc team.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <SecondaryButton onClick={handleRestart}>
                    Start again
                  </SecondaryButton>
                  <SecondaryButton href="tel:+61450406450">
                    Call 0450 406 450
                  </SecondaryButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
