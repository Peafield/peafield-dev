// A simple contact form using next form
"use client";

import { submitContactForm } from "@/app/contact/actions";
import { useActionState } from "react";

const ContactForm = () => {
  const [state, formAction, pending] = useActionState(submitContactForm, null);
  return (
    <form action={formAction}>
      <fieldset>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </fieldset>
      <fieldset>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </fieldset>
      <button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send"}
      </button>
    </form>
  );
};
