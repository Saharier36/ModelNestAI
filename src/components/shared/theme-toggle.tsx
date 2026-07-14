"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full cursor-pointer"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FiSun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <FiMoon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
