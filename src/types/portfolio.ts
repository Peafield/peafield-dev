import { object, z } from "zod";
import { ReactNode } from "react";

export const PortfolioItemsSchema = z.array(
  z.object({
    name: z.string(),
    links: z.object({
      live: z.string(),
      repo: z.string().optional(),
      other: z.string().optional(),
    }),
    projectOverview: z.string(),
    technologies: z.array(z.string()),
    roles: z.any() as z.ZodType<ReactNode>,
    image: z.object({
      images: z.array(
        z.object({
          src: z.string(),
          description: z.string(),
        })
      ),
      hero: z.object({
        src: z.string(),
        description: z.string(),
      }),
    }),
  })
);

export type PortfolioItem = z.infer<typeof PortfolioItemsSchema>;
