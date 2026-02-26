export function toOneLine(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

export function truncate(input: string, max = 160): string {
  const s = toOneLine(input);
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1).trimEnd()}…`;
}
