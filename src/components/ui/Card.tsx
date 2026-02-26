import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface0};
  overflow: hidden;

  transition: transform 140ms ease, background 140ms ease, border-color 140ms ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.surface1};
  }

  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    opacity: 0.12;
    pointer-events: none;
    background: linear-gradient(
      120deg,
      ${({ theme }) => theme.colors.accent0},
      transparent 30%,
      transparent 70%,
      ${({ theme }) => theme.colors.accent1}
    );
  }
`;