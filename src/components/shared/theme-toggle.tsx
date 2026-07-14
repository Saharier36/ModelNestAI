"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import * as React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

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
      className="rounded-full cursor-pointer"
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
