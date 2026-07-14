"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SiNotion } from "react-icons/si";

export function Hero() {
  const logos = [
    {
      name: "Notion",
      icon: SiNotion,
      isIcon: true,
      className: "hover:opacity-80 dark:hover:opacity-90",
    },
    {
      name: "OpenAI",
      path: "/icons/openai.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
    },
    {
      name: "Claude",
      path: "/icons/claude.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
      preserveColor: true,
    },
    {
      name: "Cursor",
      path: "/icons/cursor.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
    },
    {
      name: "DeepSeek",
      path: "/icons/deepseek.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
      preserveColor: true,
    },
    {
      name: "Google",
      path: "/icons/google-antigravity.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
      preserveColor: true,
    },
    {
      name: "Lovable",
      path: "/icons/lovable.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
      preserveColor: true,
    },
    {
      name: "Midjourney",
      path: "/icons/midjourney.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
    },
    {
      name: "Perplexity",
      path: "/icons/perplexity-ai.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
      preserveColor: true,
    },
    {
      name: "Replit",
      path: "/icons/replit.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
      preserveColor: true,
    },
    {
      name: "Gemini",
      path: "/icons/gemini-color.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
      preserveColor: true,
    },
    {
      name: "Windsurf",
      path: "/icons/windsurf.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
    },
    {
      name: "Grok",
      path: "/icons/grok.svg",
      className: "hover:opacity-80 dark:hover:opacity-90",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-16 md:pt-20 md:pb-24 transition-colors duration-300">
      {/* Background: Aurora + existing stripe texture */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-90">
        <AuroraBackground
          variant="ember"
          speed={0.6}
          blobCount={4}
          className="absolute inset-0"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:40px_100%] opacity-40 dark:opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[300px] bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-medium text-orange-500 dark:text-orange-400 backdrop-blur-md"
        >
          <span>✨ AI Powered Marketplace</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-8 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
        >
          Discover &amp; Purchase High-Quality{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            AI Models &amp; Tools
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-foreground/70 sm:text-lg md:text-xl"
        >
          Marketplace to discover, buy, and sell AI models, tools, and
          subscriptions at the best prices.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/explore">
            <Button className="h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 cursor-pointer">
              Explore Models
            </Button>
          </Link>
          <Link href="/items/add">
            <Button
              variant="outline"
              className="h-12 rounded-full border-border bg-transparent px-8 text-sm font-semibold text-foreground hover:bg-muted transition-all duration-300 cursor-pointer"
            >
              Sell AI Tools
            </Button>
          </Link>
        </motion.div>

        {/* Brand Logos (Hero Footer) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 border-t border-border pt-10"
        >
          <p className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Powered by leading AI platforms
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12 px-4 md:px-0">
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className={`cursor-pointer transition-all duration-300 ${logo.className}`}
              >
                {logo.isIcon ? (
                  <logo.icon className="h-10 w-10 fill-foreground text-foreground" />
                ) : (
                  logo.path && (
                    <Image
                      src={logo.path}
                      alt={logo.name}
                      width={40}
                      height={40}
                      className={`w-10 h-10 ${!logo.preserveColor ? "dark:invert" : ""}`}
                    />
                  )
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
