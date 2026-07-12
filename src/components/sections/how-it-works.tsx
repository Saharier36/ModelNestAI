"use client";

import { motion } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiUpload,
  FiDollarSign,
} from "react-icons/fi";

const steps = [
  {
    icon: FiSearch,
    title: "Browse Listings",
    description:
      "Explore hundreds of AI tools and subscriptions across every category.",
  },
  {
    icon: FiShoppingCart,
    title: "Buy Instantly",
    description:
      "Purchase securely with Stripe and get access details right away.",
  },
  {
    icon: FiUpload,
    title: "List Your Tool",
    description:
      "Have unused AI credits or subscriptions? List them in minutes.",
  },
  {
    icon: FiDollarSign,
    title: "Earn From Sales",
    description: "Get paid directly when buyers purchase your listed AI tools.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            How ModelNestAI Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Whether you&apos;re buying or selling, getting started takes just a
            few minutes.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-mono text-xs text-muted-foreground">
                0{index + 1}
              </span>
              <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
