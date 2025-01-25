"use client";

import { containerVariants, itemVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import PortfolioSection from "./PortfolioSection";
import PortfolioContent from "./PortfolioContent";
import PortfolioCarousel from "./PortfolioCarousel";
import { PortfolioItem } from "@/types/portfolio";
import { link } from "fs";
import { RiScrollToBottomFill } from "react-icons/ri";
import PortfolioContentItem from "./PortfolioContentItem";
import { text } from "stream/consumers";

const images: string[] = [
  "https://images.unsplash.com/photo-1736297150541-89378f055b96?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1737024251796-dd751b4d9365?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1733760125032-8a8b23769a0c?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const portfolioItems: PortfolioItem = [
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
              <PortfolioContentItem item={item} />
            </PortfolioContent>
            {/* TODO: Figure out how to make this sit at the bottom and bounce */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center animate-bounce">
              <RiScrollToBottomFill className="size-12" />
            </div>
          </PortfolioSection>
          <PortfolioCarousel images={item.images} />
        </div>
      ))}
    </motion.div>
  );
};

export default Portfolio;
