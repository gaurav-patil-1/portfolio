import styled from "styled-components";

export const Tag = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $active }) => ($active ? theme.colors.surface1 : theme.colors.surface0)};
  color: ${({ theme }) => theme.colors.text0};
  font-size: 0.92rem;

  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.surface1};
  }
`;