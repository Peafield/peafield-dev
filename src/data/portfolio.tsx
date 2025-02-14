import { PortfolioItem } from "@/types/portfolio";
import image from "next/image";

export const portfolioItems: PortfolioItem[] = [
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
        <span className="font-semibold text-purple-400">Next.js</span>{" "}
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
    achievements: [
      {
        description:
          "📚️ Rapidly building new features to allow school kids to create books from their yarns.",
        link: "https://dayofai.org/day-of-ai-partners-with-yarn-media/",
      },
      {
        description:
          "🎠 Building a custom 'carousel' component for smooth transitions between story snippets.",
      },
      {
        description:
          "🤚 Implementing draggable elements for a playful user experience.",
      },
      {
        description:
          "📋️ Creating a multi-step profile creation process to allow users to share more of their personality.",
      },
      { description: "🕹️ Improving the wait experience with a fun mini-game." },
      { description: "🐌 Adding joy to the app with quirky SVG animations." },
    ],
    image: {
      images: [
        {
          src: "/portfolio/yarn1.webp",
          description: "Profile selection and creation",
        },
        {
          src: "/portfolio/yarn2.webp",
          description: "A user library",
        },
        {
          src: "/portfolio/yarn3.webp",
          description: "A collection of sharable stories",
        },
        {
          src: "/portfolio/yarn4.webp",
          description: "Listening to a story",
        },
      ],
      hero: {
        src: "/portfolio/yarnhero.webp",
        description: "Yarn homepage with dynamic background",
      },
    },
  },
  {
    name: "Wendi's Worminghall Whimsies",
    links: {
      live: "https://www.wendisworminghallwhimsies.uk/",
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
        features a custom CMS utlising TipTap for the author to manage their
        content. I implemented server-side rendering for SEO optimization and
        responsive design for mobile users. The site is self-hosted on a VPS and
        uses a <span className="font-semibold text-purple-300">MongoDB</span>{" "}
        database to store the poetry data, with the images hosted on Cloudflare
        R2 Object Storage.
      </>
    ),
    achievements: [],
    image: {
      images: [
        {
          src: "/portfolio/www1.webp",
          description: "Homepage with latest stories and custom carousel",
        },
        {
          src: "/portfolio/wwwcms.webp",
          description: "CMS for creating poems with preview pane",
        },
        {
          src: "/portfolio/www2.webp",
          description: "Secure authentification with JWT",
        },
      ],
      hero: {
        src: "/portfolio/wwwhero.webp",
        description: "Archive page with custom cards",
      },
    },
  },
];
