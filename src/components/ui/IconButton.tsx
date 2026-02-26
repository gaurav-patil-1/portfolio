import styled from "styled-components";

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface0};
  color: ${({ theme }) => theme.colors.text0};
  cursor: pointer;
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.surface1};
    border-color: ${({ theme }) => theme.colors.border};
  }

  &:active {
    transform: translateY(0);
  }
`;