import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "That's a short name, maybe add a few more characters?",
    })
    .max(100, {
      message: "That's a long name, maybe remove a few characters?",
    }),
  email: z.string().email(),
  message: z
    .string()
    .min(10, {
      message: "Nothing else you want to say? Go on, add a few more words",
    })
    .max(5000, { message: "That's probably enough right? Maybe shorten it?" }),
});
