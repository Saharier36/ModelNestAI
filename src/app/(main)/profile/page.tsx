"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiMail, FiUser } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const displayName = user?.name || user?.email || "Account";
  const initials = (displayName || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-sm text-muted-foreground">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="font-heading text-2xl font-semibold">
            You are not signed in
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please log in to view your profile details.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={() => router.push("/login")}>Login</Button>
            <Button variant="outline" onClick={() => router.push("/register")}>
              Register
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="w-fit rounded-full"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-background p-8 sm:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 rounded-full border-4 border-background">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={displayName}
                  />
                  <AvatarFallback className="bg-linear-to-br from-orange-500 to-amber-500 text-xl font-semibold text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-orange-500">
                    Profile
                  </p>
                  <h1 className="font-heading text-3xl font-semibold text-foreground">
                    {displayName}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Personal account details and preferences
                  </p>
                </div>
              </div>
              <Link href="/dashboard">
                <Button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-500/10 p-2 text-orange-500">
                  <FiUser className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full name</p>
                  <p className="font-medium text-foreground">{displayName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-500/10 p-2 text-orange-500">
                  <FiMail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email address</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <h2 className="font-heading text-xl font-semibold">
                Account status
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your account is active and ready to use.
              </p>
              <div className="mt-5 rounded-2xl bg-orange-500/10 p-4 text-sm text-orange-700 dark:text-orange-300">
                Keep your profile updated to make models and conversations
                smoother.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
