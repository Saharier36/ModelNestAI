"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FiUpload, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "@/lib/auth-client";
import { API_BASE_URL } from "@/lib/api-client";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const categories = [
  "Chatbot",
  "Image Generation",
  "Video AI",
  "Coding",
  "Writing",
  "Audio & Music",
];

export default function AddModelPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in
  if (!isPending && !session) {
    router.push("/login");
    return null;
  }

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const uploadLogo = async (file: File): Promise<string | null> => {
    if (!IMGBB_API_KEY) {
      toast.error("Image upload is not configured.");
      return null;
    }
    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      if (!data.success) throw new Error("Upload failed");
      return data.data.url as string;
    } catch {
      toast.error("Logo upload failed.");
      return null;
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !name || !category || !shortDescription || !price) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!logoFile) {
      setError("Please upload a logo image.");
      return;
    }

    setSubmitting(true);

    const logoUrl = await uploadLogo(logoFile);
    if (!logoUrl) {
      setSubmitting(false);
      return;
    }

    const priceNum = Number(price);
    const originalPriceNum = originalPrice ? Number(originalPrice) : undefined;
    const discountPercent =
      originalPriceNum && originalPriceNum > priceNum
        ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
        : undefined;

    const payload = {
      title,
      name,
      category,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      price: priceNum,
      originalPrice: originalPriceNum,
      discountPercent,
      logo: logoUrl,
      features: featuresInput
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      sellerId: session?.user?.id,
      sellerName: session?.user?.name,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to create listing");
      }

      toast.success("Model listed successfully!");
      router.push("/manage");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      >
        <h1 className="font-heading text-2xl font-bold">Add a New Model</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          List your AI tool or subscription for others to buy.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Logo upload */}
          <div className="space-y-2">
            <Label>Logo Image *</Label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/50">
                {logoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <FiUpload className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-1 items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={logoUploading}
                >
                  {logoUploading ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <FiUpload className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  Choose Image
                </Button>
                {logoFile ? (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoFile(null);
                      setLogoPreview(null);
                    }}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove image"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoSelect}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Listing Title *</Label>
              <Input
                id="title"
                placeholder="e.g. ChatGPT Plus Access"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Brand / Tool Name *</Label>
              <Input
                id="name"
                placeholder="e.g. OpenAI"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-1">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value ?? "")}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="12"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <Input
                id="originalPrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="20"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description *</Label>
            <Input
              id="shortDescription"
              placeholder="One-line summary shown on the listing card"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              rows={4}
              placeholder="Detailed description shown on the details page"
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Key Features</Label>
            <Input
              id="features"
              placeholder="Comma separated, e.g. GPT-4o access, Voice mode, Priority support"
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing...
              </span>
            ) : (
              "Publish Model"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
