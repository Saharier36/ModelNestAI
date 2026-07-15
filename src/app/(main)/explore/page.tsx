"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ListingCard } from "@/components/shared/listing-card";
import { ListingCardSkeleton } from "@/components/shared/listing-card-skeleton";
import { API_BASE_URL } from "@/lib/api-client";
import type { Listing } from "@/types/listing";

const categories = [
  "All",
  "Chatbot",
  "Image Generation",
  "Video AI",
  "Coding",
  "Writing",
  "Audio & Music",
];

const priceRanges = [
  { label: "Any Price", value: "any" },
  { label: "Under $10", value: "0-10" },
  { label: "$10 - $15", value: "10-15" },
  { label: "$15 - $25", value: "15-25" },
  { label: "$25+", value: "25-9999" },
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "priceLowToHigh" },
  { label: "Price: High to Low", value: "priceHighToLow" },
  { label: "Highest Rated", value: "ratingHighToLow" },
];

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "All";
  const priceRange = searchParams.get("priceRange") || "any";
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page") || "1");

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "All" && value !== "any") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      if (!("page" in updates)) params.delete("page");
      router.push(`/explore?${params.toString()}`);
    },
    [router, searchParams],
  );

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchParams.get("search"))
          params.set("search", searchParams.get("search")!);
        if (category !== "All") params.set("category", category);
        if (priceRange !== "any") {
          const [min, max] = priceRange.split("-");
          params.set("minPrice", min);
          params.set("maxPrice", max);
        }
        params.set("sort", sort);
        params.set("page", page.toString());
        params.set("limit", "12");

        const res = await fetch(
          `${API_BASE_URL}/api/listings?${params.toString()}`,
        );
        const data = await res.json();

        if (data.success) {
          setListings(data.data);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams, category, priceRange, sort, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: searchInput });
  };

  const clearFilters = () => {
    setSearchInput("");
    router.push("/explore");
  };

  const hasActiveFilters =
    searchParams.get("search") || category !== "All" || priceRange !== "any";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 md:py-14">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Explore AI Tools
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Browse every AI subscription and tool listed on the marketplace.
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearchSubmit} className="mx-auto mt-8 max-w-xl">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search AI tools..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-12 rounded-full pl-11 pr-4 focus-visible:border-orange-500 focus-visible:ring-orange-500/30"
          />
        </div>
      </form>

      {/* Filters + Sort */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Select
          value={category}
          onValueChange={(v) => updateParams({ category: v ?? "All" })}
        >
          <SelectTrigger className="w-[160px] rounded-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={priceRange}
          onValueChange={(v) => updateParams({ priceRange: v ?? "any" })}
        >
          <SelectTrigger className="w-[150px] rounded-full">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(v) => updateParams({ sort: v ?? "newest" })}
        >
          <SelectTrigger className="w-[170px] rounded-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters ? (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            <FiX className="h-3.5 w-3.5" />
            Clear
          </button>
        ) : null}
      </div>

      {/* Results grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))
          : listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
      </div>

      {!loading && listings.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No AI tools found matching your filters.
        </p>
      ) : null}

      {/* Pagination */}
      {!loading && totalPages > 1 ? (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) updateParams({ page: (page - 1).toString() });
                }}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    updateParams({ page: (i + 1).toString() });
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages)
                    updateParams({ page: (page + 1).toString() });
                }}
                className={
                  page >= totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
