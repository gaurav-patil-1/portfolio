import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const Wrap = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(10px)")};
  transition: opacity 420ms ease, transform 420ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
`;

type Props = {
  children: React.ReactNode;
};

export function Reveal({ children }: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <Wrap ref={ref} $visible={visible}>
      {children}
    </Wrap>
  );
}