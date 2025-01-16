"use client";

import { submitContactForm } from "@/app/contact/actions";
import {
  buttonVariants,
  containerVariants,
  errorVariants,
  itemVariants,
} from "@/constants/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useActionState } from "react";
import DOMPurify from "isomorphic-dompurify";

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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <form
        action={formAction}
        className="max-w-2xl mx-auto space-y-6"
        noValidate
      >
        <motion.div variants={itemVariants} className="text-start">
          <h1 className="font-openSans font-bold text-lg">Ask me anything</h1>
        </motion.div>
        <motion.div variants={itemVariants} className="relative">
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={DOMPurify.sanitize(state?.values?.name || "")}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 dark:bg-gray-800 dark:border-none peer placeholder-transparent"
            placeholder="Name"
          />
          <label
            htmlFor="name"
            className="font-openSans absolute left-4 -top-2.5 dark:rounded-lg bg-white dark:bg-gray-800  px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
          >
            Name
          </label>
          <AnimatePresence mode="wait">
            {state?.errors?.name && (
              <motion.p
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-1 text-sm text-error overflow-hidden"
                aria-live="polite"
              >
                {state.errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            defaultValue={DOMPurify.sanitize(state?.values?.email || "")}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 dark:bg-gray-800 dark:border-none peer placeholder-transparent"
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className="font-openSans absolute left-4 -top-2.5 dark:rounded-lg bg-white dark:bg-gray-800 px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
          >
            Email
          </label>
          <AnimatePresence mode="wait">
            {state?.errors?.email && (
              <motion.p
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-1 text-sm text-error overflow-hidden"
                aria-live="polite"
              >
                {state.errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <textarea
            id="message"
            name="message"
            required
            rows={10}
            defaultValue={DOMPurify.sanitize(state?.values?.message || "")}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 dark:bg-gray-800 dark:border-none peer placeholder-transparent"
            placeholder="Message"
          />
          <label
            htmlFor="message"
            className="absolute left-4 -top-2.5 dark:rounded-lg bg-white dark:bg-gray-800 px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
          >
            Message
          </label>
          <AnimatePresence mode="wait">
            {state?.errors?.message && (
              <motion.p
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-1 text-sm text-error overflow-hidden"
                aria-live="polite"
              >
                {state.errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {state?.success && (
            <motion.p
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="font-openSans mt-1 text-sm front-bold text-terminal overflow-hidden text-center"
              aria-live="polite"
            >
              Thank you for your message!
            </motion.p>
          )}
        </AnimatePresence>
        <motion.div variants={itemVariants} className="flex justify-end">
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            type="submit"
            disabled={isPending}
            className="font-openSans px-6 py-2 rounded-lg bg-terminal text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
