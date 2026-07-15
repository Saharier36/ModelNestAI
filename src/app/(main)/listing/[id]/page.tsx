"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  FiStar,
  FiCheck,
  FiArrowLeft,
  FiLock,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListingCard } from "@/components/shared/listing-card";
import { useSession } from "@/lib/auth-client";
import { API_BASE_URL } from "@/lib/api-client";
import type { Listing } from "@/types/listing";

export default function ListingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [listing, setListing] = useState<Listing | null>(null);
  const [related, setRelated] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(`${API_BASE_URL}/api/listings/${params.id}`);
        const data = await res.json();

        if (!data.success) {
          setNotFound(true);
          return;
        }
        setListing(data.data);

        // Fetch related items from same category
        const relatedRes = await fetch(
          `${API_BASE_URL}/api/listings?category=${encodeURIComponent(
            data.data.category
          )}&limit=4`
        );
        const relatedData = await relatedRes.json();
        if (relatedData.success) {
          setRelated(
            relatedData.data.filter((l: Listing) => l._id !== data.data._id).slice(0, 4)
          );
        }
      } catch (error) {
        console.error("Failed to fetch listing:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchListing();
  }, [params.id]);

  const handleBuyNow = () => {
    if (!session) {
      router.push(`/login?redirect=/listing/${params.id}`);
      return;
    }
    // TODO: Stripe checkout integration porer step e hobe
    router.push(`/listing/${params.id}?checkout=pending`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold">Model not found</h1>
        <p className="mt-2 text-muted-foreground">
          This AI model may have been removed or the link is incorrect.
        </p>
        <Link href="/explore">
          <Button className="mt-6 rounded-full">Back to Explore</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 md:py-14">
      {/* Back link */}
      <Link
        href="/explore"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <FiArrowLeft className="h-3.5 w-3.5" />
        Back to Explore
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* Left: main content */}
        <div className="lg:col-span-2">
          {/* Logo + title header */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted/60 p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={listing.logo}
                  alt={listing.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full font-normal">
                    {listing.category}
                  </Badge>
                  {listing.discountPercent ? (
                    <Badge className="rounded-full bg-orange-500 font-normal text-white hover:bg-orange-500">
                      -{listing.discountPercent}% OFF
                    </Badge>
                  ) : null}
                </div>
                <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                  {listing.title}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  by {listing.name}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-sm">
                  <FiStar className="h-4 w-4 fill-orange-500 text-orange-500" />
                  <span className="font-medium">{listing.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">
                    ({listing.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview / Description */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-heading text-lg font-semibold">Overview</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {listing.fullDescription || listing.shortDescription}
            </p>
          </div>

          {/* Key Features / Specifications */}
          {listing.features && listing.features.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-heading text-lg font-semibold">
                Key Features
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {listing.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Seller info */}
          {listing.sellerName ? (
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-heading text-lg font-semibold">Seller</h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                  <FiUser className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{listing.sellerName}</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right: sticky purchase card */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-3xl font-bold text-orange-500">
                ${listing.price}
              </span>
              {listing.originalPrice ? (
                <span className="text-base text-muted-foreground line-through">
                  ${listing.originalPrice}
                </span>
              ) : null}
            </div>
            {listing.discountPercent ? (
              <p className="mt-1 text-sm text-muted-foreground">
                You save {listing.discountPercent}% off the original price
              </p>
            ) : null}

            <Button
              onClick={handleBuyNow}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 cursor-pointer transition-all duration-300"
              size="lg"
            >
              {session ? (
                <>
                  <FiShoppingCart className="mr-1.5 h-4 w-4" />
                  Buy Now
                </>
              ) : (
                <>
                  <FiLock className="mr-1.5 h-4 w-4" />
                  Log In to Buy
                </>
              )}
            </Button>

            {!session ? (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                You must be logged in to purchase this model.
              </p>
            ) : null}

            <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Category</span>
                <span className="font-medium text-foreground">
                  {listing.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Rating</span>
                <span className="font-medium text-foreground">
                  {listing.rating.toFixed(1)} / 5
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Related items */}
      {related.length > 0 ? (
        <div className="mt-14">
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            Related Models
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ListingCard key={item._id} listing={item} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}