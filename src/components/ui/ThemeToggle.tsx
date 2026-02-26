import React from "react";
import type { ThemeMode } from "@/content/profile";
import { IconMoon } from "@/components/icons/IconMoon";
import { IconSun } from "@/components/icons/IconSun";
import { IconButton } from "./IconButton";

type Props = {
  mode: ThemeMode;
  onToggle: () => void;
};

export function ThemeToggle({ mode, onToggle }: Props) {
  return (
    <IconButton onClick={onToggle} aria-label="Toggle theme">
      {mode === "dark" ? <IconSun /> : <IconMoon />}
    </IconButton>
  );
}