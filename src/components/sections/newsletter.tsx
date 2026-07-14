"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiCheck, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to real newsletter API later
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Full-bleed gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_100%]" />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
            <FiMail className="h-5 w-5" />
          </div>

          <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get Deals Before Anyone Else
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/85">
            Subscribe to hear about new discounted AI tool listings the moment
            they go live.
          </p>

          {submitted ? (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm">
              <FiCheck className="h-4 w-4" />
              You&apos;re subscribed! Check your inbox soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-full border-white/30 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white/40"
              />
              <Button
                type="submit"
                className="h-12 shrink-0 rounded-full bg-white px-6 text-orange-600 hover:bg-white/90 cursor-pointer"
              >
                Subscribe
                <FiArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
