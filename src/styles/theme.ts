import type { ThemeMode } from "@/content/profile";

const radii = {
  sm: "10px",
  md: "16px",
  lg: "22px",
};

const shadow = {
  sm: "0 10px 30px rgba(0,0,0,0.25)",
  md: "0 18px 50px rgba(0,0,0,0.35)",
};

const breakpoints = {
  sm: 520,
  md: 820,
  lg: 1120,
};

export type AppTheme = {
  mode: ThemeMode;
  radii: typeof radii;
  shadow: typeof shadow;
  breakpoints: typeof breakpoints;
  typography: {
    fontSans: string;
    fontMono: string;
    maxWidth: string;
  };
  colors: {
    bg0: string;
    bg1: string;
    surface0: string;
    surface1: string;
    text0: string;
    text1: string;
    muted: string;
    border: string;

    accent0: string;
    accent1: string;

    good: string;
    warn: string;
  };
};

const typography = {
  fontSans:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  fontMono:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  maxWidth: "1120px",
};

const dark: AppTheme = {
  mode: "dark",
  radii,
  shadow,
  breakpoints,
  typography,
  colors: {
    bg0: "#0b1220",
    bg1: "#091a2c",
    surface0: "rgba(255,255,255,0.06)",
    surface1: "rgba(255,255,255,0.09)",
    text0: "#eaf2ff",
    text1: "rgba(234,242,255,0.82)",
    muted: "rgba(234,242,255,0.64)",
    border: "rgba(234,242,255,0.14)",

    accent0: "#4cc9f0",
    accent1: "#4361ee",

    good: "#2dd4bf",
    warn: "#fbbf24",
  },
};

const light: AppTheme = {
  mode: "light",
  radii,
  shadow,
  breakpoints,
  typography,
  colors: {
    bg0: "#f7f9ff",
    bg1: "#eef3ff",
    surface0: "rgba(15,23,42,0.06)",
    surface1: "rgba(15,23,42,0.09)",
    text0: "#0b1220",
    text1: "rgba(11,18,32,0.78)",
    muted: "rgba(11,18,32,0.60)",
    border: "rgba(11,18,32,0.14)",

    accent0: "#2563eb",
    accent1: "#06b6d4",

    good: "#0f766e",
    warn: "#b45309",
  },
};

export const themes = { dark, light } as const;

export function getTheme(mode: ThemeMode): AppTheme {
  return mode === "light" ? themes.light : themes.dark;
}
