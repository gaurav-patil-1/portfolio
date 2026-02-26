import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages base path notes:
// - User/Org pages repo (username.github.io) => base: "/"
// - Project pages repo (username.github.io/<repo-name>/) => base: "/<repo-name>/"
//
// This config:
// - uses "/" in dev (so local dev is clean)
// - uses VITE_BASE_PATH (set by GitHub Actions) for build
// - falls back to "/<REPO_NAME>/" if you build locally without env
export default defineConfig(({ command }) => {
  const base =
    command === "serve" ? "/" : (process.env.VITE_BASE_PATH ?? "/<REPO_NAME>/");

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
