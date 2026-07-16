"use client";

import { useEffect, useState } from "react";
import { ListingCard } from "@/components/shared/listing-card";
import { ListingCardSkeleton } from "@/components/shared/listing-card-skeleton";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api-client";
import type { Listing } from "@/types/listing";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/listings?sort=ratingHighToLow&limit=4`,
        );
        const data = await res.json();
        if (data.success) {
          setListings(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch featured listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

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
          <Button variant="outline" className="rounded-full cursor-pointer">
            View All
            <FiArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))
          : listings.map((listing, index) => (
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

      {!loading && listings.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">
          No models available yet. Be the first to add one!
        </p>
      ) : null}
    </section>
  );
}
