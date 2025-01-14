"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

export async function submitContactForm(formData: FormData) {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const { success, error, data } = contactFormSchema.safeParse(formValues);

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      values: formValues,
    };
  }
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  return response.json();
}
