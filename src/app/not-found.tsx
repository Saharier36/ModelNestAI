"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiHome, FiSearch, FiCpu } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background glow, consistent with hero */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:40px_100%] opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-bold"
        >
          <FiCpu className="h-6 w-6 text-orange-500" />
          ModelNest<span className="text-orange-500">AI</span>
        </Link>

        <h1 className="mt-8 font-heading text-7xl font-extrabold tracking-tight sm:text-8xl">
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600">
              <FiHome className="mr-1.5 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline" className="rounded-full">
              <FiSearch className="mr-1.5 h-4 w-4" />
              Explore Marketplace
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
