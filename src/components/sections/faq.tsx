"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I know a Model is legitimate?",
    answer:
      "Every seller creates an account and models are tied to their profile. Reviews and ratings from past buyers help you judge trustworthiness before purchasing.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Payments are processed securely through Stripe, supporting major debit and credit cards.",
  },
  {
    question: "Can I sell my unused AI subscription credits?",
    answer:
      'Yes. Once logged in, go to "Add Item" and list your tool with pricing, description, and category. It will appear in the marketplace immediately.',
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Refunds depend on the individual seller's terms, listed on each product page. Contact the seller directly for purchase-specific issues.",
  },
  {
    question: "Do I need a separate account to buy and sell?",
    answer:
      "No, a single ModelNestAI account lets you both buy and list AI tools from the same dashboard.",
  },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Everything you need to know before buying or selling on ModelNestAI.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-10"
      >
        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-heading text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
