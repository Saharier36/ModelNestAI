"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMessageSquare,
  FiImage,
  FiVideo,
  FiCode,
  FiEdit3,
  FiMusic,
} from "react-icons/fi";

const categories = [
  {
    name: "Chatbots",
    description: "Conversational AI assistants",
    icon: FiMessageSquare,
    count: "120+ tools",
  },
  {
    name: "Image Generation",
    description: "Art, design & visual AI",
    icon: FiImage,
    count: "85+ tools",
  },
  {
    name: "Video AI",
    description: "Editing & video generation",
    icon: FiVideo,
    count: "40+ tools",
  },
  {
    name: "Coding",
    description: "Dev tools & code assistants",
    icon: FiCode,
    count: "95+ tools",
  },
  {
    name: "Writing",
    description: "Content & copywriting AI",
    icon: FiEdit3,
    count: "70+ tools",
  },
  {
    name: "Audio & Music",
    description: "Voice, music & sound AI",
    icon: FiMusic,
    count: "35+ tools",
  },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Browse by Category
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Find the right AI tool for your workflow, from chatbots to full
          creative suites.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Link
              href={`/explore?category=${encodeURIComponent(cat.name)}`}
              className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition-transform duration-300 group-hover:scale-110">
                <cat.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {cat.count}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
