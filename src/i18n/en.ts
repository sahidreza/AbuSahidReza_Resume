/**
 * English copy — the source of truth for the dictionary shape.
 * Every fact here comes from the Global and India resumes. Do not add claims that are not in them.
 */
export const en = {
  meta: {
    title: "Abu Sahid Reza — Technical AI Product Manager",
    description:
      "Technical AI Product Manager with about 10 years in software, combining hands-on engineering with product leadership. Built Loominote, an AI voice-notes app with 1,500 paying subscribers, and leads enterprise delivery at TCS.",
    ogAlt: "Abu Sahid Reza — Technical AI Product Manager",
  },

  nav: {
    skip: "Skip to content",
    about: "About",
    experience: "Experience",
    work: "Work",
    expertise: "Expertise",
    contact: "Contact",
    resume: "Resume",
    menu: "Open menu",
    close: "Close menu",
    language: "Language",
    home: "Abu Sahid Reza — home",
  },

  hero: {
    eyebrow: "Technical AI Product Manager · LLM & Voice AI Products",
    titleA: "Building Intelligent Products.",
    titleB: "Creating Meaningful Impact.",
    sub: "I'm Abu Sahid Reza — a Technical AI Product Manager passionate about transforming complex technology into intelligent, human-centred products.",
    ctaPrimary: "Explore My Work",
    ctaSecondary: "Let's Connect",
    scroll: "Scroll",
    portraitAlt: "Portrait of Abu Sahid Reza",
    availability: "Open to global opportunities",
    caption: "Abu Sahid Reza",
    captionRole: "AI Product · Engineering · Delivery",
  },

  about: {
    label: "About",
    title: "Technology is my foundation. Product thinking is my strength.",
    lead: "For about ten years I have worked where software meets the people who depend on it. I started as an iOS engineer, grew into technical leadership, and now lead AI products end to end — from the first prompt to the first paying customer.",
    chaptersTitle: "The path so far",
    chapters: [
      {
        year: "2016",
        title: "Engineer",
        text: "Started as an iOS developer, delivering client products and reviewing requirements, wireframes and designs for technical feasibility.",
      },
      {
        year: "2018",
        title: "Builder",
        text: "Designed and built more than ten iOS apps in Swift, Objective-C, SwiftUI and UIKit, and managed a nine-member Android team.",
      },
      {
        year: "2021",
        title: "Lead",
        text: "As Module Lead, delivered mobile app modules for the Delta Air Lines app and supported solution design for Virgin Atlantic.",
      },
      {
        year: "2022",
        title: "Product",
        text: "At TCS, Delivery SPOC for the Ultimatix Reimagine program and Team Lead and Scrum Master for an iOS team.",
      },
      {
        year: "Today",
        title: "AI",
        text: "Built and launched Loominote, an LLM-based voice-notes app, as its only product manager and developer.",
      },
    ],
    pillars: [
      {
        title: "Engineering depth",
        text: "Hands-on software work from Swift and UIKit to speech-to-text and LLM APIs — so product decisions rest on how things are really built.",
      },
      {
        title: "Product judgement",
        text: "Vision, roadmaps, PRDs, user stories and acceptance criteria, each tied to success metrics that matter to the business.",
      },
      {
        title: "Enterprise delivery",
        text: "One delivery plan shared by the CIO, business unit head, delivery head and product owner — and carried through to release.",
      },
    ],
  },

  experience: {
    label: "Experience",
    title: "A career built from the code up.",
    sub: "From shipping iOS apps to leading enterprise delivery and AI products.",
    listLabel: "Roles",
    jobs: [
      {
        id: "tcs",
        company: "Tata Consultancy Services",
        short: "TCS",
        role: "AI Product Manager & Delivery Lead",
        period: "Aug 2022 – Present",
        location: "Kolkata, India",
        summary:
          "Delivery SPOC for Ultimatix Reimagine and, in parallel, Team Lead and Scrum Master for an iOS team.",
        highlights: [
          "Delivery SPOC for the Ultimatix Reimagine program, aligning the CIO, business unit head, delivery head and product owner on one delivery plan.",
          "Delivered 423 items across four workstreams.",
          "In parallel, Team Lead and Scrum Master for the Major Incidents & Communication (MIC) iOS team: sprint planning, backlog refinement, retrospectives and production support.",
          "Write PRDs, user stories and acceptance criteria; run requirement workshops and change-impact analysis with engineering, design and QA.",
          "Run a recurring team session on how LLMs, AI agents and APIs work.",
        ],
        tags: ["Product ownership", "Delivery", "Scrum", "PRDs & backlog"],
      },
      {
        id: "mindtree",
        company: "Mindtree (now LTIMindtree)",
        short: "Mindtree",
        role: "Module Lead",
        period: "Aug 2021 – Jul 2022",
        location: "Kolkata, India",
        summary: "Mobile delivery for global airline clients.",
        highlights: [
          "Delivered mobile app modules for the Delta Air Lines app, used by millions of travellers.",
          "Supported requirement gathering and solution design for Virgin Atlantic's digital product suite.",
          "Coordinated component delivery, testing and releases to keep timelines on track.",
        ],
        tags: ["Mobile", "Solution design", "Release coordination"],
      },
      {
        id: "genius",
        company: "Genius Consultants Limited",
        short: "Genius",
        role: "iOS Developer",
        period: "Aug 2018 – Aug 2021",
        location: "Kolkata, India",
        summary: "Built iOS apps and led a cross-platform team.",
        highlights: [
          "Designed and built 10+ iOS apps in Swift, Objective-C, SwiftUI and UIKit.",
          "Managed a 9-member team delivering an Android app.",
          "Led discovery and high-level design for medium-to-large projects.",
        ],
        tags: ["Swift", "SwiftUI", "UIKit", "Team leadership"],
      },
      {
        id: "rplanx",
        company: "Rplanx Private Limited",
        short: "Rplanx",
        role: "iOS Developer",
        period: "Nov 2016 – May 2018",
        location: "Kolkata, India",
        summary: "Where it started: client-facing iOS products.",
        highlights: [
          "Delivered client iOS products on schedule, coordinating directly with clients and project managers.",
          "Reviewed requirements, wireframes and designs for technical feasibility.",
        ],
        tags: ["iOS", "Client delivery"],
      },
    ],
  },

  work: {
    label: "Selected Work",
    title: "Products with a story. Results with a number.",
    problem: "Problem",
    approach: "What I did",
    quality: "Quality",
    result: "Result",
    role: "Role",
    loominote: {
      eyebrow: "Case study 01 · AI product",
      name: "Loominote",
      tagline: "AI voice intelligence.",
      description:
        "An AI-powered voice-notes app that transforms recordings into structured transcripts, summaries and actionable insights.",
      role: "Product Manager and sole developer",
      platformsLabel: "Built for",
      platforms: ["iPhone", "Apple Watch", "iPad", "Mac"],
      stats: [
        { value: 1500, prefix: "", suffix: "", label: "paying subscribers" },
        { value: 25, prefix: "US$", suffix: "K", label: "net revenue" },
        { value: 4, prefix: "", suffix: "", label: "months to get there" },
      ],
      modesTitle: "One app. Three ways to listen.",
      modesSub: "Each mode has its own prompting, tuned to what that recording is for.",
      modes: [
        {
          id: "meeting",
          name: "Meeting",
          text: "Turns a meeting into a transcript, a summary and the action items that came out of it.",
          sample: {
            title: "Weekly product sync",
            summary: "Agreed the release scope and moved two items to the next sprint.",
            items: ["Confirm release date with QA", "Share updated roadmap", "Review onboarding copy"],
          },
        },
        {
          id: "lecture",
          name: "Lecture",
          text: "Captures long talks and lectures as searchable transcripts with clear summaries.",
          sample: {
            title: "Lecture 4 · Neural networks",
            summary: "Covered how layers learn representations, and why training needs lots of data.",
            items: ["Key idea: layered representations", "Re-watch: backpropagation", "Reading for next week"],
          },
        },
        {
          id: "journal",
          name: "Journal",
          text: "Turns personal voice journals into short summaries you can come back to.",
          sample: {
            title: "Evening reflection",
            summary: "A focused day. Felt good about finishing the draft early.",
            items: ["Keep mornings for deep work", "Call home on Sunday", "Start the new book"],
          },
        },
      ],
      mockLabel: "Illustrative interface",
      mockTranscript: "Transcript",
      mockSummary: "Summary",
      mockActions: "Action items",
      mockRecording: "Recording",
      pipelineTitle: "How it works",
      pipeline: [
        { title: "Record", text: "On iPhone, Apple Watch, iPad or Mac." },
        { title: "Transcribe", text: "Real-time transcription on speech-to-text APIs." },
        { title: "Understand", text: "Summaries and action items from LLM APIs, prompted per mode." },
        { title: "Improve", text: "An evaluation framework and in-app feedback refine the prompts." },
      ],
      problem: "Recordings of meetings, lectures and journals are hard to search and act on.",
      approach:
        "Defined the vision and roadmap; built real-time transcription, summarisation and action-item extraction on speech-to-text and LLM APIs; shipped Meeting, Lecture and Journal modes, each with its own prompting.",
      quality:
        "Chose AI providers on transcription accuracy, summary quality, latency, cost and data privacy; built an evaluation framework for summary quality, relevance and accuracy; used in-app feedback to refine prompts.",
      result: "1,500 paying subscribers and US$25K net revenue within four months.",
      appStore: "View on the App Store",
    },
    ultimatix: {
      eyebrow: "Case study 02 · Enterprise transformation",
      name: "Ultimatix Reimagine",
      tagline: "Enterprise change, delivered item by item.",
      description:
        "The program reimagining Ultimatix, the enterprise platform used by hundreds of thousands of TCS associates.",
      role: "AI Product Manager and Delivery SPOC",
      stakeholdersLabel: "One plan, four stakeholders",
      planLabel: "One delivery plan",
      stakeholders: ["CIO", "Business unit head", "Delivery head", "Product owner"],
      totalLabel: "items delivered across four workstreams",
      breakdownLabel: "Delivered by workstream",
      workstreams: [
        {
          name: "Email rationalisation",
          count: 342,
          problem: "342 system emails, each with its own owner and audience, had to be rationalised.",
          approach: "Reviewed the emails with their owners, agreed the outcome for each one, and scheduled the changes into releases.",
        },
        {
          name: "IACT",
          count: 35,
          problem: "35 IACT items had to close within the Reimagine delivery plan.",
          approach: "Tracked each item's owner, dependencies and status, and escalated blockers early.",
        },
        {
          name: "Sender ID change",
          count: 34,
          problem: "34 live sender IDs had to change without disrupting mail delivery or associates' trust in Ultimatix mail.",
          approach: "Planned each change, sequenced releases with engineering and QA, and took every change through business sign-off to closure.",
        },
        {
          name: "Recommendations",
          count: 12,
          problem: "Reimagine stakeholders needed recommendations they could act on.",
          approach: "Owned each recommendation through stakeholder review to a decision-ready hand-off.",
        },
      ],
      mic: {
        eyebrow: "Alongside · Major Incidents & Communication (MIC)",
        title: "Quality you can count on. Literally.",
        role: "Team Lead and Scrum Master",
        statLabel: "post-production iOS defects across 3 years of releases, acknowledged by the product owner.",
        note: "3 post-production defects across the whole team in the same period (2 backend, 1 Android), none needing an emergency fix.",
      },
    },
  },

  expertise: {
    label: "Expertise",
    title: "Where engineering meets product leadership.",
    groups: [
      {
        name: "AI & Product",
        items: [
          "AI Product Strategy",
          "LLM Integration",
          "Prompt Engineering",
          "AI Evaluation",
          "AI Agents",
          "Product Roadmaps",
          "Product Discovery",
          "Product Analytics",
        ],
      },
      {
        name: "Technology",
        items: ["Swift", "SwiftUI", "UIKit", "iOS Development", "REST APIs", "Speech-to-Text APIs", "LLM APIs"],
      },
      {
        name: "Leadership",
        items: [
          "Product Ownership",
          "Stakeholder Management",
          "Agile Delivery",
          "Scrum",
          "Cross-functional Leadership",
          "Enterprise Program Management",
        ],
      },
    ],
  },

  achievements: {
    label: "Impact",
    title: "The numbers behind the work.",
    items: [
      { value: 10, prefix: "", suffix: "+", label: "Years", detail: "Software and product experience" },
      { value: 1500, prefix: "", suffix: "", label: "Subscribers", detail: "Paying Loominote subscribers" },
      { value: 25, prefix: "$", suffix: "K", label: "Revenue", detail: "Net revenue in four months" },
      { value: 423, prefix: "", suffix: "", label: "Delivered", detail: "Enterprise delivery items" },
      { value: 0, prefix: "", suffix: "", label: "Defects", detail: "Post-production iOS defects across three years" },
    ],
  },

  education: {
    label: "Education & Learning",
    title: "Always learning. Especially now.",
    degreeLabel: "Education",
    degree: "B.Tech. in Computer Science and Engineering",
    school: "Calcutta Institute of Engineering and Management",
    place: "Kolkata, India",
    year: "2015",
    certsLabel: "Certifications",
    completed: "Completed",
    inProgress: "In progress",
    certs: [
      { name: "Claude 101", issuer: "Anthropic", status: "completed" },
      { name: "Claude Certified Associate – Foundations", issuer: "Anthropic", status: "inProgress" },
      { name: "Claude Code certification", issuer: "Anthropic", status: "inProgress" },
    ],
    learningLabel: "Continuous AI learning",
    learning: "Alongside certifications, I run a recurring team session at TCS on how LLMs, AI agents and APIs work.",
    languagesLabel: "Languages",
    languages: ["English", "German · A1–A2, learning"],
  },

  contact: {
    label: "Contact",
    title: "Have an interesting challenge? Let's build something meaningful.",
    sub: "Open to global opportunities and collaboration — AI product leadership, product management and enterprise programs.",
    availabilityLabel: "Availability",
    availability: "Open to international roles — remote, hybrid or relocation.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    resumeLabel: "Download resume",
    resumeButton: "Resume",
    pdf: "PDF",
    form: {
      title: "Send a message",
      name: "Name",
      email: "Email",
      company: "Company",
      optional: "optional",
      message: "Message",
      placeholder: "Tell me about the role, product or challenge.",
      send: "Send message",
      sending: "Sending…",
      success: "Thank you. Your message is on its way, and I'll reply soon.",
      mailtoSuccess: "Your email app should now be open with the message ready to send.",
      error: "Something went wrong. Please email me directly instead.",
      required: "Please fill in this field.",
      invalidEmail: "Please enter a valid email address.",
      privacy: "Your details are used only to reply to you.",
      subject: "Hello from your website",
    },
  },

  footer: {
    tagline: "Technical AI Product Manager",
    rights: "All rights reserved.",
    top: "Back to top",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : T extends object
        ? { [K in keyof T]: Widen<T[K]> }
        : T;

export type Dictionary = Widen<typeof en>;
