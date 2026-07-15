"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  FiCpu,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
  FiCamera,
} from "react-icons/fi";
import { toast } from "sonner";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function RegisterPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImageToImgbb = async (file: File): Promise<string | null> => {
    if (!IMGBB_API_KEY) {
      toast.error("Image upload is not configured.");
      return null;
    }
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: formData },
      );
      const data = await res.json();

      if (!data.success) {
        throw new Error("Upload failed");
      }
      return data.data.url as string;
    } catch {
      toast.error("Profile picture upload failed. You can add one later.");
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    let imageUrl: string | undefined;
    if (imageFile) {
      const uploadedUrl = await uploadImageToImgbb(imageFile);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    await authClient.signUp.email(
      { name, email, password, image: imageUrl },
      {
        onSuccess: () => {
          toast.success("Account created successfully");
          router.push("/");
        },
        onError: (ctx) => {
          const message = ctx.error.message || "Could not create account.";
          setError(message);
          toast.error(message);
        },
      },
    );
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
      toast.success("Redirecting to Google sign-up");
    } catch {
      toast.error("Google sign-up failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md rounded-2xl border border-border bg-card p-8"
    >
      <div className="flex flex-col items-center text-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-bold"
        >
          <FiCpu className="h-6 w-6 text-orange-500" />
          ModelNest<span className="text-orange-500">AI</span>
        </Link>
        <h1 className="mt-6 font-heading text-2xl font-bold">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join the marketplace to buy and sell AI tools.
        </p>
      </div>

      {/* Profile picture upload */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarImage
              src={imagePreview ?? undefined}
              alt="Profile preview"
            />
            <AvatarFallback className="bg-muted">
              <FiUser className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={imageUploading}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm transition-colors hover:bg-orange-600 disabled:opacity-70"
            aria-label="Upload profile picture"
          >
            {imageUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <FiCamera className="h-3.5 w-3.5" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          Add a profile picture (optional)
        </span>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={googleLoading || loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
      >
        {googleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
        ) : (
          <FcGoogle className="h-4 w-4" />
        )}
        {googleLoading ? "Connecting..." : "Continue with Google"}
      </button>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">
          or continue with email
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleRegister} className="mt-5 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-9 focus-visible:border-orange-500 focus-visible:ring-orange-500/30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9 focus-visible:border-orange-500 focus-visible:ring-orange-500/30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-9 focus-visible:border-orange-500 focus-visible:ring-orange-500/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <FiEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-1">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
            className="mt-0.5 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
          />
          <Label
            htmlFor="terms"
            className="text-xs font-normal leading-relaxed text-muted-foreground"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-orange-500 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-orange-500 hover:underline"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>

        {error ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-orange-500 hover:underline"
        >
          Log In
        </Link>
      </p>
    </motion.div>
  );
}
