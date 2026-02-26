import React from "react";
import styled from "styled-components";

const Skip = styled.a`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface1};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text0};
  transform: translateY(-160%);
  transition: transform 140ms ease;
  z-index: 9999;

  &:focus {
    transform: translateY(0);
  }
`;

export function SkipToContent() {
  return <Skip href="#main">Skip to content</Skip>;
}