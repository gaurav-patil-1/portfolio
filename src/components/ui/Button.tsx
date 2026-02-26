import styled from "styled-components";

export const Button = styled.a<{ $variant?: "primary" | "ghost" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 46px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  background: ${({ theme, $variant }) =>
    $variant === "ghost"
      ? theme.colors.surface0
      : `linear-gradient(90deg, ${theme.colors.accent0}, ${theme.colors.accent1})`};

  color: ${({ theme, $variant }) =>
    $variant === "ghost" ? theme.colors.text0 : theme.mode === "dark" ? "#07101f" : "#061018"};

  font-weight: 700;
  letter-spacing: -0.01em;
  transition: transform 130ms ease, filter 130ms ease, background 130ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
  }
`;