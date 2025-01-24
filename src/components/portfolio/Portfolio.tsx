"use client";

import { containerVariants, itemVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import PortfolioSection from "./PortfolioSection";
import PortfolioContent from "./PortfolioContent";
import PortfolioCarousel from "./PortfolioCarousel";
import { PortfolioItem } from "@/types/portfolio";
import { link } from "fs";

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
      "Framer Motion",
    ],
    images: images,
    links: ["https://yarn.family"],
  },
];

const Portfolio = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {portfolioItems.map((item, index) => (
        <>
          <PortfolioSection key={index}>
            <PortfolioContent>
              <h1 className="text-4xl text-center font-bold">{item.name}</h1>
              <div className="prose dark:prose-invert flex items-center mb-8">
                <p>{item.projectOverview}</p>
              </div>
              <div className="prose dark:prose-invert gap-4">
                {item.technologies.map((tech, index) => (
                  <p key={index} className="text-center">
                    {tech}
                  </p>
                ))}
              </div>
            </PortfolioContent>
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
        </>
      ))}
    </motion.div>
  );
};

export default Portfolio;
