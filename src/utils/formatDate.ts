const monthFmt = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

function parseYYYYMM(value: string): Date | null {
  // Expected: YYYY-MM
  const m = /^(\d{4})-(\d{2})$/.exec(value);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  if (month < 1 || month > 12) return null;
  return new Date(year, month - 1, 1);
}

export function formatRange(start: string, end: string): string {
  const s = parseYYYYMM(start);
  const e = end === "Present" ? null : parseYYYYMM(end);

  const startLabel = s ? monthFmt.format(s) : start;
  const endLabel = end === "Present" ? "Present" : e ? monthFmt.format(e) : end;

  return `${startLabel} — ${endLabel}`;
}
