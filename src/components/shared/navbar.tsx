"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiCpu, FiMenu } from "react-icons/fi";

// TODO: replace with real Firebase auth state later
const isLoggedIn = false;

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
];

const loggedInLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/items/add", label: "Add Item" },
  { href: "/items/manage", label: "Manage Items" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-extrabold tracking-tight text-foreground transition-all hover:opacity-90"
        >
          <FiCpu className="h-6 w-6 text-orange-500" />
          ModelNest<span className="text-orange-500">AI</span>
        </Link>

        {/* Desktop Nav - Pill Styled container */}
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-muted/60 p-1 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
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

        {/* Right side */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          {isLoggedIn ? (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <span className="text-sm font-semibold text-muted-foreground transition-all hover:text-foreground cursor-pointer px-3 py-1.5">
                  Login
                </span>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 text-sm font-semibold text-white shadow-md shadow-orange-500/10 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 border-0 cursor-pointer"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
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
                      pathname === link.href
                        ? "text-orange-500"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                  {isLoggedIn ? (
                    <Button variant="outline" className="rounded-full cursor-pointer">
                      Logout
                    </Button>
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
                        <Button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 border-0">
                          Register
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
