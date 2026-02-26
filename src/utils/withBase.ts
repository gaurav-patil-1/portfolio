export function withBase(path: string): string {
  if (!path) return "";

  // Keep absolute URLs and data URIs unchanged.
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  // Vite injects BASE_URL ("/" in dev; "/repo/" on GitHub Pages project sites).
  const base = import.meta.env.BASE_URL || "/";

  // Normalize to avoid double slashes.
  if (path.startsWith("/")) return `${base}${path.slice(1)}`;
  return `${base}${path}`;
}
