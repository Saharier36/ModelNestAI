"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="rounded-full" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <FiMoon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
