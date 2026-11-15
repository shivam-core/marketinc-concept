export interface Industry {
  slug: string;
  name: string;
  shortText: string;
  heroDemo: HeroDemoContent;
}

export interface HeroDemoContent {
  found: {
    query: string;
    adTitle: string;
    adLine: string;
  };
  landed: {
    headline: string;
    line: string;
    button: string;
  };
  enquired: {
    name: string;
    suburb: string;
    message: string;
  };
  followedUp: {
    text: string;
  };
  booked: {
    day: string;
    time: string;
    job: string;
  };
}

export const industries: Industry[] = [
  {
    slug: "trades",
    name: "Home and trade services",
    shortText:
      "People search when something breaks. The business that answers first usually gets the job. We build for speed: found fast, called back fast.",
    heroDemo: {
      found: {
        query: "emergency plumber near me",
        adTitle: "Blocked drain? Licensed plumber, on site today",
        adLine: "Harbourside Plumbing. Upfront pricing. Inner West and City.",
      },
      landed: {
        headline: "Blocked drain fixed today.",
        line: "Tell us the suburb and we\u2019ll call you back.",
        button: "Request a call back",
      },
      enquired: {
        name: "Sam",
        suburb: "Marrickville",
        message:
          "Kitchen sink backing up, need someone today if possible.",
      },
      followedUp: {
        text: "Hi Sam, thanks for getting in touch with Harbourside Plumbing. Jake will call you in the next few minutes.",
      },
      booked: {
        day: "Today",
        time: "2:30\u202Fpm",
        job: "Blocked drain, Marrickville",
      },
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    shortText:
      "Patients choose on trust and convenience. We build clear pages, simple booking, and advertising that stays inside the rules for health services.",
    heroDemo: {
      found: {
        query: "physio near me open saturday",
        adTitle: "Physio in Surry Hills, Saturday appointments",
        adLine: "Crown Street Physio. Book online in a minute.",
      },
      landed: {
        headline: "See a physio this week.",
        line: "Pick a time that suits you.",
        button: "Check available times",
      },
      enquired: {
        name: "Priya",
        suburb: "Surry Hills",
        message:
          "Sore shoulder after the gym, anything on Saturday morning?",
      },
      followedUp: {
        text: "Hi Priya, we have 9:15 or 10:45 this Saturday at Crown Street Physio. Reply with the time you\u2019d like.",
      },
      booked: {
        day: "Saturday",
        time: "9:15\u202Fam",
        job: "Initial consult, Priya",
      },
    },
  },
  {
    slug: "professional",
    name: "Professional services",
    shortText:
      "Clients are choosing a person, not a product. We build credibility first, then make it easy to book a first conversation.",
    heroDemo: {
      found: {
        query: "small business accountant sydney",
        adTitle: "Accountant for small business owners",
        adLine: "Castle & Rowe Accounting. Fixed monthly fee.",
      },
      landed: {
        headline: "An accountant who picks up the phone.",
        line: "Book a 20-minute intro call.",
        button: "Book an intro call",
      },
      enquired: {
        name: "Daniel",
        suburb: "Parramatta",
        message:
          "Cafe owner, two locations, need help before BAS is due.",
      },
      followedUp: {
        text: "Hi Daniel, thanks for contacting Castle & Rowe. Here\u2019s a link to pick a time for your intro call this week.",
      },
      booked: {
        day: "Thursday",
        time: "11:00\u202Fam",
        job: "Intro call, Daniel",
      },
    },
  },
  {
    slug: "finance",
    name: "Finance and investment",
    shortText:
      "Longer decisions, more questions. We build education, careful follow-up, and messaging written with compliance in mind.",
    heroDemo: {
      found: {
        query: "mortgage broker refinance",
        adTitle: "Thinking of refinancing? Talk to a broker",
        adLine: "Northline Finance. Compare lenders in one call.",
      },
      landed: {
        headline: "See if refinancing makes sense.",
        line: "Answer four questions and we\u2019ll call you.",
        button: "Start the questions",
      },
      enquired: {
        name: "Mei",
        suburb: "Chatswood",
        message:
          "Fixed rate ends in March, want to know my options.",
      },
      followedUp: {
        text: "Hi Mei, thanks for reaching out to Northline Finance. Alex will call you tomorrow morning. Reply if another time suits better.",
      },
      booked: {
        day: "Wednesday",
        time: "8:45\u202Fam",
        job: "Refinance call, Mei",
      },
    },
  },
];

export const industriesBySlug = Object.fromEntries(
  industries.map((i) => [i.slug, i])
);

/** Short tab labels for the hero demo */
export const industryTabLabels = [
  { slug: "trades", label: "Trades" },
  { slug: "healthcare", label: "Healthcare" },
  { slug: "professional", label: "Professional" },
  { slug: "finance", label: "Finance" },
] as const;
