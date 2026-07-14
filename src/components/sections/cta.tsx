"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 md:py-28">
      {/* Glow background — theme-aware, echoes hero */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:40px_100%] opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to Access AI at the{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Right Price?
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Join thousands of buyers and sellers already trading AI tools on
          ModelNestAI.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/explore">
            <Button className="h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600 cursor-pointer">
              Explore Marketplace
              <FiArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/register">
            <Button
              variant="outline"
              className="h-12 rounded-full border-border px-8 text-sm font-semibold hover:bg-muted cursor-pointer"
            >
              Create Free Account
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
