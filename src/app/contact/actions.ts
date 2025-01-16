"use server";

import { contactFormSchema } from "@/types/contact";

export type SubmitContactFormState = {
  name?: string;
  email?: string;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  _prevState: SubmitContactFormState,
  formData: FormData
) {
  const formValues = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const { success, error, data } = contactFormSchema.safeParse(formValues);

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      values: formValues,
    };
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  return { success: true };
}
