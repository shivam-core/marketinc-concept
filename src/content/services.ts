export interface Service {
  slug: string;
  name: string;
  stop: number;
  stopLabel: string;
  promise: string;
  whatYouGet: string[];
  leakText: string;
  worksBestWith: { slug: string; name: string }[];
}

export const services: Service[] = [
  {
    slug: "google-ads",
    name: "Google Ads",
    stop: 1,
    stopLabel: "Found",
    promise:
      "Be the first business people see when they search for what you do.",
    whatYouGet: [
      "Campaigns built around jobs you want more of.",
      "Keywords chosen for intent to book.",
      "Call and form tracking.",
      "Clear monthly reporting.",
      "Ongoing testing of ads and offers.",
    ],
    leakText:
      "People search for what you do and find a competitor first.",
    worksBestWith: [
      { slug: "meta-ads", name: "Meta Ads" },
      { slug: "seo", name: "SEO" },
    ],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    stop: 1,
    stopLabel: "Found",
    promise:
      "Reach people in your area before they start searching.",
    whatYouGet: [
      "Facebook and Instagram campaigns.",
      "Offers built for your service area.",
      "Creative tested in rounds.",
      "Lead forms connected to your CRM.",
      "Clear monthly reporting.",
    ],
    leakText:
      "People search for what you do and find a competitor first.",
    worksBestWith: [
      { slug: "google-ads", name: "Google Ads" },
      { slug: "seo", name: "SEO" },
    ],
  },
  {
    slug: "seo",
    name: "SEO",
    stop: 1,
    stopLabel: "Found",
    promise: "Show up without paying for every click.",
    whatYouGet: [
      "Local search and Google Business Profile.",
      "Pages for each service and suburb.",
      "Technical fixes.",
      "Content that answers what customers ask.",
      "Progress reporting.",
    ],
    leakText:
      "People search for what you do and find a competitor first.",
    worksBestWith: [
      { slug: "google-ads", name: "Google Ads" },
      { slug: "website-design", name: "Website design" },
    ],
  },
  {
    slug: "website-design",
    name: "Website design",
    stop: 2,
    stopLabel: "Landed",
    promise:
      "A site that turns visitors into enquiries, on a phone, in seconds.",
    whatYouGet: [
      "A page per job type.",
      "Fast load on mobile.",
      "Short forms and tap-to-call.",
      "Tracking on every enquiry.",
      "Built so your team can update it.",
    ],
    leakText:
      "The ad sends them to a home page that talks about everything.",
    worksBestWith: [
      { slug: "seo", name: "SEO" },
      { slug: "crm-automation", name: "CRM and automation" },
    ],
  },
  {
    slug: "crm-automation",
    name: "CRM and automation",
    stop: 4,
    stopLabel: "Followed up",
    promise:
      "Every enquiry answered in minutes, even when you\u2019re on the tools.",
    whatYouGet: [
      "CRM set up around how you quote and book.",
      "Instant text and email replies.",
      "Reminders for your team.",
      "A pipeline view of every open lead.",
      "Follow-ups for quotes that go quiet.",
    ],
    leakText:
      "The enquiry sits in an inbox until tonight. By then they\u2019ve booked someone else.",
    worksBestWith: [
      { slug: "website-design", name: "Website design" },
      { slug: "google-ads", name: "Google Ads" },
    ],
  },
];

export const servicesBySlug = Object.fromEntries(
  services.map((s) => [s.slug, s])
);

/** The five-stop sequence */
export const stops = [
  { number: 1, label: "Found", services: ["Google Ads", "Meta Ads", "SEO"] },
  { number: 2, label: "Landed", services: ["Website design"] },
  { number: 3, label: "Enquired", services: ["Website design", "Tracking"] },
  { number: 4, label: "Followed up", services: ["CRM and automation"] },
  { number: 5, label: "Booked", services: [] },
] as const;
