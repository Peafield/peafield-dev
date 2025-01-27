import { PortfolioItem } from "@/types/portfolio";

export const portfolioItems: PortfolioItem = [
  {
    name: "Yarn",
    links: {
      live: "https://app.yarn.family",
      other: "https://yarn.family",
    },
    projectOverview:
      "Yarn is a playful storytelling platform that encourages children as young as four to co-create imaginative tales with friends and family. We employ a gentle AI layer to spark creativity and tailor the experience to each child’s unique interests.",
    technologies: [
      "React",
      "NextJS",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Framer-Motion",
      "fastAPI",
    ],
    roles: (
      <>
        I led the full-stack overhaul of yarn, migrating from legacy HTML/CSS/JS
        to a modern{" "}
        <span className="font-semibold text-purple-300">Next.js</span>{" "}
        application with{" "}
        <span className="font-semibold text-purple-300">SSR</span> for{" "}
        <span className="font-semibold text-purple-300">SEO</span> optimization
        and responsive interfaces. I managed a developer team using{" "}
        <span className="font-semibold text-purple-300">Agile</span>{" "}
        methodologies, guiding projects from ideation to deployment. Enhanced
        backend functionality by extending{" "}
        <span className="font-semibold text-purple-300">Python/fastAPI</span>{" "}
        and integrating APIs like Mailchimp. Drove strategic decisions on
        features and design to align with user needs and market demands.
        Implemented rigorous QA via Playwright (E2E) and Vitest (unit testing)
        to ensure product reliability.
      </>
    ),
    images: [
      "/portfolio/yarn1.webp",
      "/portfolio/yarn2.webp",
      "/portfolio/yarn4.webp",
    ],
  },
  {
    name: "Wendi's Worminghall Whimsies",
    links: {
      live: "https://www.wendiwhimsies.com",
      repo: "https://github.com/Peafield/poetry-site",
    },
    projectOverview:
      "Wendi's Worminghall Whimsies is a personal poetry site that showcases the work of the author.",
    technologies: [
      "React",
      "NextJS",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "MongoDB",
      "TipTap",
    ],
    roles: (
      <>
        I built a poety website for a client using{" "}
        <span className="font-semibold text-purple-300">Next.js</span>. The site
        features a custom CMS for the author to manage their content. I
        implemented server-side rendering for SEO optimization and responsive
        design for mobile users. The site is hosted on a VPS and uses a{" "}
        <span className="font-semibold text-purple-300">MongoDB</span> database
        to store the poetry content.
      </>
    ),
    images: [
      "/portfolio/www1.webp",
      "/portfolio/wwwcms.webp",
      "/portfolio/www2.webp",
    ],
  },
];
