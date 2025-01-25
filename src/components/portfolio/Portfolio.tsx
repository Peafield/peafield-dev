"use client";

import { containerVariants, itemVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import PortfolioSection from "./PortfolioSection";
import PortfolioContent from "./PortfolioContent";
import PortfolioCarousel from "./PortfolioCarousel";
import { PortfolioItem } from "@/types/portfolio";
import { link } from "fs";
import { RiScrollToBottomFill } from "react-icons/ri";

const images: string[] = [
  "https://images.unsplash.com/photo-1736297150541-89378f055b96?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1737024251796-dd751b4d9365?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1733760125032-8a8b23769a0c?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const portfolioItems: PortfolioItem = [
  {
    name: "Yarn",
    projectOverview:
      "Yarn is a playful storytelling platform that encourages children as young as four to co-create imaginative tales with friends and family. We employ a gentle AI layer to spark creativity and tailor the experience to each child’s unique interests. This friendly, light-touch approach makes storytelling both engaging and safe, promoting self-expression, collaboration, and the strengthening of bonds between loved ones",
    technologies: [
      "React",
      "NextJS",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Framer-Motion",
      "fastAPI",
    ],
    roles:
      "Led the full-stack overhaul of a core product, migrating from legacy HTML/CSS/JS to a modern Next.js application with SSR for SEO optimization and responsive interfaces. Managed a developer team using Agile methodologies, guiding projects from ideation to deployment. Enhanced backend functionality by extending Python/FastAPI and integrating APIs like Mailchimp. Drove strategic decisions on features and design to align with user needs and market demands. Implemented rigorous QA via Playwright (E2E) and Vitest (unit testing) to ensure product reliability.",
    images: images,
    links: ["https://yarn.family"],
  },
];

const Portfolio = () => {
  // TODO: Add opaque background image of yarn
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {portfolioItems.map((item, index) => (
        <div key={index}>
          <PortfolioSection>
            <PortfolioContent>
              <h1 className="text-4xl text-start font-bold">{item.name}</h1>
              <div className="prose dark:prose-invert flex items-center justify-start gap-4">
                <p className="text-start font-light pt-1 text-lime-700 dark:text-lime-300">
                  <span className="text-black dark:text-white font-medium">
                    Made with:
                  </span>{" "}
                  {item.technologies.join("   ")}
                </p>
              </div>
              <div className="prose dark:prose-invert font-light flex items-center">
                <p>{item.projectOverview}</p>
              </div>
              <div className="prose dark:prose-invert flex items-center justify-start gap-4">
                <p className="text-start font-light pt-1">
                  <span className="text-black dark:text-white font-medium">
                    Role:
                  </span>{" "}
                  {item.roles}
                </p>
              </div>
            </PortfolioContent>
            {/* TODO: Figure out how to make this sit at the bottom and bounce */}
            <div className="w-full flex items-center justify-center">
              <RiScrollToBottomFill className="size-6" />
            </div>
          </PortfolioSection>
          <PortfolioCarousel images={item.images} />
          <PortfolioSection>
            <PortfolioContent>
              <div className="prose dark:prose-invert flex items-center mb-8">
                {item.links.map((link, index) => (
                  <p key={index}>{link}</p>
                ))}
              </div>
            </PortfolioContent>
          </PortfolioSection>
        </div>
      ))}
    </motion.div>
  );
};

export default Portfolio;
