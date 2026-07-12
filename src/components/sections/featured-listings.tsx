"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/shared/listing-card";
import type { Listing } from "@/types/listing";

// Temporary sample data — will be replaced with real API data later
const featuredListings: Listing[] = [
  {
    _id: "1",
    title: "ChatGPT Plus — 1 Month Access",
    category: "Chatbot",
    shortDescription:
      "Full GPT-4o access with image, voice, and plugin support.",
    price: 12,
    originalPrice: 20,
    discountPercent: 40,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    rating: 4.8,
    reviewCount: 214,
  },
  {
    _id: "2",
    title: "Midjourney Pro Plan",
    category: "Image Generation",
    shortDescription:
      "Unlimited relaxed generations with commercial usage rights.",
    price: 18,
    originalPrice: 30,
    discountPercent: 40,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    rating: 4.9,
    reviewCount: 158,
  },
  {
    _id: "3",
    title: "GitHub Copilot Business",
    category: "Coding",
    shortDescription: "AI pair programmer for your team, IDE-integrated.",
    price: 9,
    originalPrice: 19,
    discountPercent: 53,
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    rating: 4.7,
    reviewCount: 302,
  },
  {
    _id: "4",
    title: "Claude Pro Subscription",
    category: "Chatbot",
    shortDescription: "Extended context window with priority access to Claude.",
    price: 11,
    originalPrice: 20,
    discountPercent: 45,
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80",
    rating: 4.9,
    reviewCount: 176,
  },
];

export function FeaturedListings() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
      >
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Featured AI Tools
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Hand-picked deals on the most popular AI subscriptions right now.
          </p>
        </div>
        <Link href="/explore" className="shrink-0">
          <Button variant="outline" className="rounded-full">
            View All
            <FiArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredListings.map((listing, index) => (
          <motion.div
            key={listing._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <ListingCard listing={listing} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
