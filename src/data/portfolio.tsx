import { PortfolioItem } from "@/types/portfolio";

const yarnImages: string[] = [
  "/portfolio/yarn1.webp",
  "/portfolio/yarn2.webp",
  "/portfolio/yarn3.webp",
  "/portfolio/yarn4.webp",
];

export const portfolioItems: PortfolioItem = [
  {
    name: "Yarn",
    href: "https://yarn.family",
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
    images: yarnImages,
    links: ["https://yarn.family"],
  },
];
