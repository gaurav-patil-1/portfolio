import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeId, setActiveId] = useState<string>("home");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-section='true']"),
    );

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry with highest intersection ratio among intersecting entries.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0.08, 0.15, 0.25, 0.4],
      },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return activeId;
}
