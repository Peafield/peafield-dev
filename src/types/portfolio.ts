import { z } from "zod";

export const PortfolioItemsSchema = z.array(
  z.object({
    name: z.string(),
    projectOverview: z.string(),
    technologies: z.array(z.string()),
    images: z.array(z.string()),
    links: z.array(z.string()),
  })
);

export type PortfolioItem = z.infer<typeof PortfolioItemsSchema>;
