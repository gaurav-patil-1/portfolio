export type ThemeMode = "dark" | "light";

export type ExperienceItem = {
  company: string;
  title: string;
  location: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM | Present
  bullets: string[];
  tech: string[];
};

export type ProjectItem = {
  name: string;
  type: string;
  status: string;
  shortDescription: string;
  longDescription: string;
  role: string;
  features: string[];
  techStack: string[];
  links: { playstore: string; github: string; demo: string };
  media: {
    coverImage: string;
    screenshots: string[];
  };
};

export type EducationItem = {
  level: string;
  institution: string;
  program: string;
  score: string;
  year: string;
  details: string[];
};

export type AchievementItem = {
  title: string;
  issuer: string;
  year?: string;
  link?: string;
  details?: string;
};

export type Profile = {
  person: {
    fullName: string;
    roleTitle: string;
    location: string;
    email: string;
    phone: string;
    tagline: string;
    summary: string;
    headshotPath: string;
  };
  links: {
    linkedin: string;
    github: string;
    instagram: string;
    portfolio: string;
    resumePdfPath: string;
  };
  branding: {
    preferredTheme: ThemeMode; // dark | light
    accentVibe: string;
  };
  experience: ExperienceItem[];
  skills: {
    core: string[];
    additional: string[];
    tools: string[];
  };
  projects: ProjectItem[];
  education: {
    privacyModeHideExactScores: boolean;
    items: EducationItem[];
  };
  achievements: AchievementItem[];
  contact: {
    formspreeEndpoint: string; // if blank, hide form
  };
};

// Keep the object shape/keys stable: the UI is driven by this single file.
export const profile = {
  person: {
    fullName: "Gaurav Patil",
    roleTitle: "Software Engineer II",
    location: "Bengaluru, Karnataka, India",
    email: "", // ← add if you want a public email (recommended: a dedicated alias)
    phone: "",
    tagline:
      "Building fast, reliable product experiences with React + TypeScript.",
    summary: `Curious. Learning. Building.

I’m a Software Engineer at Catchpoint, focused on crafting clean UI, reliable APIs, and maintainable systems. I enjoy strong engineering fundamentals, thoughtful UX, and shipping work that stays fast as products scale.`,
    headshotPath: "/headshot.svg",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/patil-gaurav-dinesh",
    github: "", // https://github.com/.....
    instagram: "",
    portfolio: "",
    resumePdfPath: "/resume.pdf",
  },
  branding: {
    preferredTheme: "dark", // dark | light
    accentVibe: "modern-premium-blueprint",
  },
  experience: [
    {
      company: "Catchpoint",
      title: "Software Engineer II",
      location: "Remote (Bengaluru)",
      start: "2025-03",
      end: "Present",
      bullets: [
        "Delivering product features with a focus on performance, accessibility, and maintainable UI architecture.",
        "Collaborating cross-functionally to turn ambiguous requirements into shippable increments with clean interfaces.",
      ],
      tech: [".NET", "React", "TypeScript", "GraphQL", "C#", "SQL"],
    },
    {
      company: "Catchpoint",
      title: "Software Engineer I",
      location: "Hybrid (Bengaluru)",
      start: "2023-10",
      end: "2025-03",
      bullets: [
        "Built and maintained UI components and backend endpoints with a strong emphasis on correctness and developer ergonomics.",
        "Improved reliability via better validation, safer releases, and clearer telemetry/diagnostics.",
      ],
      tech: [".NET", "React", "TypeScript", "GraphQL", "C#", "SQL"],
    },
  ],
  skills: {
    core: ["React", "TypeScript", ".NET", "C#", "GraphQL", "SQL"],
    additional: [
      "React Native",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "MySQL",
      "Core Java",
      "C++",
      "Embedded JavaScript (EJS)",
    ],
    tools: ["Git", "GitHub", "Postman", "Docker", "Linux"],
  },
  projects: [
    {
      name: "CivilCalc Pro",
      type: "Mobile App",
      status: "Internal testing on Play Store",
      shortDescription:
        "A field-friendly civil engineering calculator app focused on speed, clarity, and offline-first usability.",
      longDescription: `Problem:
Civil calculations in the field are often slow, error-prone, and scattered across multiple tools.

What I built:
CivilCalc Pro consolidates common calculations into a clean, fast experience designed for quick verification and repeat use.

Notes:
This entry includes placeholders for the Play Store link and screenshots until public release.`,
      role: "Owner / Developer",
      features: [
        "Clean calculation flows with input validation",
        "Offline-friendly experience",
        "Fast navigation + favorites for frequent formulas",
        "Consistent units and readable results",
      ],
      techStack: ["React Native", "TypeScript", "JavaScript"],
      links: { playstore: "", github: "", demo: "" },
      media: {
        coverImage: "/projects/civilcalc/cover.svg",
        screenshots: ["/projects/civilcalc/shot1.svg"],
      },
    },
    {
      name: "Blueprint UI Kit",
      type: "Web UI",
      status: "Prototype",
      shortDescription:
        "A small set of reusable UI primitives focused on spacing rhythm, tokens, and accessible interactions.",
      longDescription: `A token-first UI kit exploring premium UI patterns:
- subtle borders + gradient accents
- accessible focus states
- responsive grid and typographic scale`,
      role: "Designer / Engineer",
      features: ["Design tokens", "Accessible components", "Responsive layout"],
      techStack: ["React", "TypeScript", "styled-components"],
      links: { playstore: "", github: "", demo: "" },
      media: {
        coverImage: "/og-image.svg",
        screenshots: ["/og-image.svg"],
      },
    },
    {
      name: "GraphQL Console (Demo)",
      type: "Developer Tool",
      status: "Concept",
      shortDescription:
        "A lightweight interface concept for exploring GraphQL schemas and documenting operations.",
      longDescription: `A concept project to demonstrate information architecture and UI clarity for complex schemas.`,
      role: "Frontend Engineer",
      features: ["Schema browsing", "Operation templates", "Searchable docs"],
      techStack: ["GraphQL", "React", "TypeScript"],
      links: { playstore: "", github: "", demo: "" },
      media: {
        coverImage: "/og-image.svg",
        screenshots: ["/og-image.svg"],
      },
    },
  ],
  education: {
    privacyModeHideExactScores: false,
    items: [
      {
        level: "Engineering",
        institution:
          "Sandip Foundation’s Sandip Institute of Engineering and Management, Nashik",
        program: "Bachelor of Engineering (BE)",
        score: "CGPA 9.01",
        year: "2022",
        details: ["Add relevant coursework / projects here"],
      },
      {
        level: "CDAC",
        institution: "CDAC Bangalore",
        program: "PG Diploma in Advanced Computing",
        score: "",
        year: "2023",
        details: ["Add key modules: DSA, Web, Databases, etc."],
      },
      {
        level: "12th",
        institution: "",
        program: "",
        score: "",
        year: "",
        details: [],
      },
      {
        level: "10th",
        institution: "",
        program: "",
        score: "",
        year: "",
        details: [],
      },
    ],
  },
  achievements: [
    {
      title: "React.js Skill Assessment — Passed",
      issuer: "LinkedIn",
      year: "",
      link: "",
      details: "",
    },
    {
      title: "JavaScript Skill Assessment — Passed",
      issuer: "LinkedIn",
      year: "",
      link: "",
      details: "",
    },
    {
      title: "C++ Skill Assessment — Passed",
      issuer: "LinkedIn",
      year: "",
      link: "",
      details: "",
    },
  ],
  contact: {
    formspreeEndpoint: "", // if blank, hide form
  },
} satisfies Profile;
