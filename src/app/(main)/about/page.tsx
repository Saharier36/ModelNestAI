"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiShield,
  FiDollarSign,
  FiUsers,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: FiDollarSign,
    title: "Fair Pricing",
    description:
      "We believe access to AI shouldn't come with an inflated price tag. Buyers save money, sellers recover value from unused credits.",
  },
  {
    icon: FiShield,
    title: "Trust & Safety",
    description:
      "Every listing is tied to a verified seller account. Ratings and reviews from real buyers help you make informed decisions.",
  },
  {
    icon: FiUsers,
    title: "Community Driven",
    description:
      "ModelNestAI is built by and for people who use AI tools daily — from students to freelancers to small teams.",
  },
  {
    icon: FiZap,
    title: "Simple & Fast",
    description:
      "List a tool in minutes, or find and buy what you need in seconds. No unnecessary friction, no hidden fees.",
  },
];

const stats = [
  { value: "450+", label: "AI Tools Listed" },
  { value: "12K+", label: "Active Users" },
  { value: "65%", label: "Average Savings" },
  { value: "8.5K+", label: "Successful Sales" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-500">
          About Us
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Making AI Access{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Affordable for Everyone
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          ModelNestAI is a marketplace where people buy and sell AI tool
          subscriptions — from ChatGPT and Claude to Midjourney and GitHub
          Copilot — at prices that actually make sense.
        </p>
      </motion.div>

      {/* Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10"
      >
        <h2 className="font-heading text-2xl font-bold">Our Story</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            AI tools have become essential for students, developers, and
            creators — but the full-price subscriptions add up fast, especially
            when you only need a tool for a short project or a single semester.
          </p>
          <p>
            We built ModelNestAI to solve a simple problem: connecting people
            who have unused AI credits or subscription seats with people who
            need them, at a fraction of the retail price. Every listing on the
            platform is created and managed directly by its seller, and every
            purchase is protected through the same account you use to browse.
          </p>
          <p>
            Whether you&apos;re trying ChatGPT Plus for the first time or
            reselling extra Midjourney credits, ModelNestAI gives you a
            straightforward place to do it.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-6 text-center"
          >
            <p className="font-heading text-2xl font-bold text-orange-500 sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Values */}
      <div className="mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-heading text-2xl font-bold sm:text-3xl"
        >
          What We Stand For
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <value.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center"
      >
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Browse the marketplace or list your first AI tool in just a few
          minutes.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link href="/explore">
            <Button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600">
              Explore Marketplace
              <FiArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="rounded-full">
              Create Account
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
