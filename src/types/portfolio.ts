import { z } from "zod";
import { ReactNode } from "react";

export const PortfolioItemsSchema = z.array(
  z.object({
    name: z.string(),
    href: z.string(),
    projectOverview: z.string(),
    technologies: z.array(z.string()),
    roles: z.any() as z.ZodType<ReactNode>,
    images: z.array(z.string()),
    links: z.array(z.string()),
  })
);

export type PortfolioItem = z.infer<typeof PortfolioItemsSchema>;
