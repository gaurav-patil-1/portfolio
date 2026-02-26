import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { withBase } from "@/utils/withBase";

const Wrap = styled.div<{ $ratio?: string }>`
  position: relative;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface0};

  ${({ $ratio }) =>
    $ratio
      ? `
    aspect-ratio: ${$ratio};
  `
      : ""}
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Fallback = styled.div`
  width: 100%;
  height: 100%;
  padding: 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.bg1},
    ${({ theme }) => theme.colors.bg0}
  );
`;

const FallbackText = styled.div`
  color: ${({ theme }) => theme.colors.text0};
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const AccentBar = styled.div`
  width: 56px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent0},
    ${({ theme }) => theme.colors.accent1}
  );
  opacity: 0.9;
`;

type Props = {
  src: string;
  alt: string;
  ratio?: string;
  label?: string;
};

export function ImageWithFallback({ src, alt, ratio = "16/10", label }: Props) {
  const [error, setError] = useState(false);

  const resolved = useMemo(() => withBase(src), [src]);

  return (
    <Wrap $ratio={ratio}>
      {error || !src ? (
        <Fallback>
          <FallbackText>{label ?? "Preview"}</FallbackText>
          <AccentBar />
        </Fallback>
      ) : (
        <Img src={resolved} alt={alt} onError={() => setError(true)} loading="lazy" />
      )}
    </Wrap>
  );
}