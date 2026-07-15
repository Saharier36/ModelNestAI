"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiCpu, FiEye, FiEyeOff, FiLock, FiMail, FiZap } from "react-icons/fi";
import { toast } from "sonner";

const DEMO_EMAIL = "demo@modelnestai.com";
const DEMO_PASSWORD = "demo12345";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Logged in successfully");
          router.push("/");
        },
        onError: (ctx) => {
          const message = ctx.error.message || "Invalid email or password.";
          setError(message);
          toast.error(message);
        },
      },
    );
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
      toast.success("Redirecting to Google sign-in");
    } catch {
      toast.error("Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    toast.success("Demo credentials filled in");
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
        <h1 className="mt-6 font-heading text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Log in to buy or sell AI tools on the marketplace.
        </p>
      </div>

      <button
        type="button"
        onClick={handleDemoLogin}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2.5 text-sm font-medium text-orange-500 transition-colors hover:bg-orange-500/15 cursor-pointer"
      >
        <FiZap className="h-4 w-4" />
        Use Demo Credentials
      </button>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading || loading}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
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

      <form onSubmit={handleLogin} className="mt-5 space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-orange-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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
              Logging in...
            </span>
          ) : (
            "Log In"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-orange-500 hover:underline"
        >
          Register
        </Link>
      </p>
    </motion.div>
  );
}
