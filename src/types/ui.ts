import { z } from "zod";
import { PortfolioItemSchema } from "./portfolio";

const uiStoreSchema = z.object({
  isMobile: z.boolean(),
  isCardClicked: z.boolean(),
  clickedCard: PortfolioItemSchema,
  setUiState: z
    .function()
    .args(
      z.object({
        isMobile: z.boolean().optional(),
        isCardClicked: z.boolean().optional(),
        clickedCard: PortfolioItemSchema.optional(),
      })
    )
    .returns(z.void()),
});

export type UiStore = z.infer<typeof uiStoreSchema>;
