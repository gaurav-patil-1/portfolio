import React from "react";
import styled from "styled-components";
import { Container } from "@/components/layout/Container";
import { currentYear } from "@/utils/year";

const Wrap = styled.footer`
  padding: 22px 0 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
`;

const Muted = styled.div`
  color: ${({ theme }) => theme.colors.muted};
`;

const Links = styled.div`
  display: flex;
  gap: 14px;

  a {
    color: ${({ theme }) => theme.colors.muted};
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: ${({ theme }) => theme.colors.text0};
    }
  }
`;

export function Footer() {
  return (
    <Wrap>
      <Container>
        <Row>
          <Muted>© {currentYear()} · Built with React + Vite</Muted>
          <Links>
            <a href="#home">Top</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </Links>
        </Row>
      </Container>
    </Wrap>
  );
}