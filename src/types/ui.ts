import { z } from "zod";

const uiStoreSchema = z.object({
  isMobile: z.boolean(),
  setUiState: z
    .function()
    .args(
      z.object({
        isMobile: z.boolean(),
      })
    )
    .returns(z.void()),
});

export type UiStore = z.infer<typeof uiStoreSchema>;
