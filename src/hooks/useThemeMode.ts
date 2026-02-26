import { useEffect, useMemo, useState } from "react";
import type { ThemeMode } from "@/content/profile";

const KEY = "portfolio_theme_mode";

function getSystemMode(): ThemeMode | null {
  if (typeof window === "undefined" || !window.matchMedia) return null;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredMode(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (raw === "dark" || raw === "light") return raw;
  return null;
}

export function useThemeMode(preferred: ThemeMode) {
  const initial = useMemo<ThemeMode>(() => {
    return getStoredMode() ?? getSystemMode() ?? preferred;
  }, [preferred]);

  const [mode, setMode] = useState<ThemeMode>(initial);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, mode);
    } catch {
      // ignore
    }
  }, [mode]);

  const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  return { mode, setMode, toggle };
}
