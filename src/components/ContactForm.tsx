"use client";

import { submitContactForm } from "@/app/contact/actions";
import { containerVariants, itemVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import { useActionState } from "react";

const ContactForm = () => {
  const initialState = {
    errors: {},
    values: {
      name: "",
      email: "",
      message: "",
    },
    success: undefined,
  };
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  // TODO: Style this form more
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <form action={formAction} className="max-w-2xl mx-auto space-y-6">
        <motion.div variants={itemVariants} className="relative">
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={state?.values?.name ?? ""}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 peer placeholder-transparent"
            placeholder="Name"
          />
          <label
            htmlFor="name"
            className="font-openSans absolute left-4 -top-2.5 bg-white dark:bg-black px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
          >
            Name
          </label>
          {state?.errors?.name && (
            <p className="mt-1 text-sm text-red-500" aria-live="polite">
              {state.errors.name}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            defaultValue={state?.values?.email ?? ""}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 peer placeholder-transparent"
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className="font-openSans absolute left-4 -top-2.5 bg-white dark:bg-black px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
          >
            Email
          </label>
          {state?.errors?.email && (
            <p className="mt-1 text-sm text-red-500" aria-live="polite">
              {state.errors.email}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            defaultValue={state?.values?.message ?? ""}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 peer placeholder-transparent"
            placeholder="Message"
          />
          <label
            htmlFor="message"
            className="absolute left-4 -top-2.5 bg-white dark:bg-black px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
          >
            Message
          </label>
          {state?.errors?.message && (
            <p className="mt-1 text-sm text-red-500" aria-live="polite">
              {state.errors.message}
            </p>
          )}
        </motion.div>

        {state?.success && (
          <p className="text-green-500 text-center" aria-live="polite">
            Message sent successfully!
          </p>
        )}

        <motion.div variants={itemVariants} className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 rounded-lg border-2 border-gray-200  hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
