import { z } from "zod";

export const PortfolioItemsSchema = z.array(
  z.object({
    name: z.string(),
    images: z.array(z.string()),
  })
);

export type PortfolioItem = z.infer<typeof PortfolioItemsSchema>;
