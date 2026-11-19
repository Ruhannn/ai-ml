"use client";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const subscribeToHydration = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-11 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Toggle color theme"
      aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="inline-flex items-center gap-1.5 dark:hidden">
        <HugeiconsIcon icon={Moon02Icon} size={16} strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="hidden items-center gap-1.5 dark:inline-flex">
        <HugeiconsIcon icon={Sun03Icon} size={16} strokeWidth={2} aria-hidden="true" />
      </span>
    </Button>
  );
}
