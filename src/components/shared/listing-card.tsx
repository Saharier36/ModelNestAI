"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiStar, FiArrowUpRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Listing } from "@/types/listing";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow duration-300 hover:shadow-lg hover:shadow-orange-500/10"
    >
      {/* Logo + brand row + rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/60 p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={listing.logo}
              alt={listing.title}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {listing.category}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <FiStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
          <span className="font-medium text-foreground">
            {listing.rating.toFixed(1)}
          </span>
          <span className="text-muted-foreground">({listing.reviewCount})</span>
        </div>
      </div>

      {/* Title + price */}
      <div>
        <h3 className="line-clamp-1 font-heading text-lg font-bold">
          {listing.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {listing.shortDescription}
        </p>
        <div className="mt-2 flex items-baseline gap-1.5 font-mono">
          <span className="text-lg font-semibold text-orange-500">
            ${listing.price}
          </span>
          {listing.originalPrice ? (
            <span className="text-xs text-muted-foreground line-through">
              ${listing.originalPrice}
            </span>
          ) : null}
        </div>
      </div>

      {/* Tag pills */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="rounded-full font-normal">
          {listing.category}
        </Badge>
        {listing.discountPercent ? (
          <Badge className="rounded-full bg-orange-500 font-normal text-white hover:bg-orange-500">
            -{listing.discountPercent}% OFF
          </Badge>
        ) : null}
      </div>

      <div className="mt-auto border-t border-border pt-3">
        <Link href={`/listing/${listing._id}`}>
          <Button className="w-full rounded-full" variant="outline" size="sm">
            View Details
            <FiArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
