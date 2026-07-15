"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_BASE_URL } from "@/lib/api-client";
import { getAuthToken, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types/listing";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEye, FiPlus, FiStar, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

export default function ManageModelsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    const fetchMyListings = async () => {
      if (!session?.user?.id) return;
      setLoading(true);
      try {
        const url = `${API_BASE_URL}/api/listings?sellerId=${session.user.id}&limit=100`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.success) {
          setListings(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch your listings:", error);
        toast.error("Could not load your listings.");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) fetchMyListings();
  }, [session?.user?.id]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const token = await getAuthToken();
      const res = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sellerId: session?.user?.id }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to delete listing");
      }

      setListings((prev) => prev.filter((l) => l._id !== id));
      toast.success("Listing deleted successfully.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-heading text-2xl font-bold">Manage Models</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage the AI tools you&apos;ve listed for sale.
            </p>
          </div>
          <Link href="/add">
            <Button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600">
              <FiPlus className="mr-1.5 h-4 w-4" />
              Add New Model
            </Button>
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              You haven&apos;t listed any AI models yet.
            </p>
            <Link href="/add">
              <Button className="mt-4 rounded-full" variant="outline">
                List Your First Model
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/60 p-1.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={listing.logo}
                              alt={listing.title}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span className="line-clamp-1 max-w-[180px] font-medium sm:max-w-xs">
                            {listing.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="rounded-full font-normal"
                        >
                          {listing.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-orange-500">
                        ${listing.price}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <FiStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                          {listing.rating.toFixed(1)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/listing/${listing._id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full"
                            >
                              <FiEye className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">View</span>
                            </Button>
                          </Link>

                          <AlertDialog>
                            <AlertDialogTrigger
                              disabled={deletingId === listing._id}
                              className={cn(
                                buttonVariants({
                                  variant: "outline",
                                  size: "sm",
                                }),
                                "rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive",
                              )}
                            >
                              {deletingId === listing._id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <FiTrash2 className="h-3.5 w-3.5" />
                              )}
                              <span className="hidden sm:inline">Delete</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete this model?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove &ldquo;
                                  {listing.title}
                                  &rdquo; from the marketplace. This action
                                  cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-full">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(listing._id)}
                                  className="rounded-full bg-destructive text-white hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
