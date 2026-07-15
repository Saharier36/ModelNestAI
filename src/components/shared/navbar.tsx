"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiCpu, FiMenu } from "react-icons/fi";
import { toast } from "sonner";

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
];

const loggedInLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/add", label: "Add Model" },
  { href: "/manage", label: "Manage Models" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isLoggedIn = !!user;
  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const handleLogout = async () => {
    try {
      await signOut();
      router.refresh();
      router.push("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  const displayName = user?.name || user?.email || "Account";
  const initials = (displayName || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/50 shadow-[0_10px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-extrabold tracking-tight text-foreground transition-all hover:opacity-90"
        >
          <FiCpu className="h-6 w-6 text-orange-500" />
          ModelNest<span className="text-orange-500">AI</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-muted/60 p-1 md:flex">
          {links.map((link) => {
            const isActive = isActiveLink(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
                  isActive
                    ? "bg-secondary text-foreground shadow-md shadow-black/10"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          {isPending ? (
            <div aria-label="Loading user data" role="status">
              <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
            </div>
          ) : isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex cursor-pointer items-center justify-center rounded-full transition hover:opacity-80 bg-transparent border-none p-0">
                <Avatar>
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={displayName}
                  />
                  <AvatarFallback className="bg-linear-to-br from-orange-500 to-amber-500 text-xs font-semibold text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push("/profile");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push("/profile");
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        className="transition hover:opacity-80 cursor-pointer rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.image ?? undefined}
                            alt={displayName}
                          />
                          <AvatarFallback className="bg-linear-to-br from-orange-500 to-amber-500 text-xs font-semibold text-white">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {displayName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer data-highlighted:bg-orange-100 data-highlighted:text-orange-700 dark:data-highlighted:bg-orange-500/20 dark:data-highlighted:text-orange-300"
                    onClick={() => router.push("/items/add")}
                  >
                    Add Model
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer data-highlighted:bg-orange-100 data-highlighted:text-orange-700 dark:data-highlighted:bg-orange-500/20 dark:data-highlighted:text-orange-300"
                    onClick={() => router.push("/items/manage")}
                  >
                    Manage Models
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <span className="cursor-pointer px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground">
                  Login
                </span>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="cursor-pointer rounded-full border-0 bg-linear-to-r from-orange-500 to-amber-500 px-5 text-sm font-semibold text-white shadow-md shadow-orange-500/10 transition-all duration-300 hover:from-orange-600 hover:to-amber-600"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          {isPending ? (
            <div aria-label="Loading user data" role="status">
              <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
            </div>
          ) : (
            <Sheet>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-full text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <FiMenu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 border-border bg-background text-foreground"
              >
                <SheetHeader>
                  <SheetTitle className="font-heading text-foreground">
                    ModelNestAI
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-4 px-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-base font-medium transition-colors",
                        isActiveLink(link.href)
                          ? "text-orange-500"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                    {isLoggedIn ? (
                      <>
                        <button
                          type="button"
                          onClick={() => router.push("/profile")}
                          className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-3 text-left transition hover:bg-muted/70"
                        >
                          <Avatar size="lg">
                            <AvatarImage
                              src={user.image ?? undefined}
                              alt={displayName}
                            />
                            <AvatarFallback className="bg-linear-to-br from-orange-500 to-amber-500 text-sm font-semibold text-white">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {displayName}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {user.email || "Signed in"}
                            </p>
                          </div>
                        </button>
                        <Button
                          variant="outline"
                          className="cursor-pointer rounded-full"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="w-full">
                          <Button
                            variant="outline"
                            className="w-full rounded-full"
                          >
                            Login
                          </Button>
                        </Link>
                        <Link href="/register" className="w-full">
                          <Button className="w-full rounded-full border-0 bg-linear-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600">
                            Register
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
