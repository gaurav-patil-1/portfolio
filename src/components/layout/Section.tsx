import React from "react";
import styled from "styled-components";
import { Container } from "./Container";

type Props = {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
};

const Wrap = styled.section`
  scroll-margin-top: var(--nav-h);
  padding: clamp(56px, 6vw, 96px) 0;
`;

const Header = styled.header`
  margin-bottom: clamp(18px, 2.4vw, 28px);
`;

const Eyebrow = styled.p`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 1.2rem + 1.6vw, 2.2rem);
  line-height: 1.15;
`;

const Underline = styled.div`
  margin-top: 14px;
  width: 84px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent0},
    ${({ theme }) => theme.colors.accent1}
  );
  opacity: 0.9;
`;

export function Section({ id, title, eyebrow, children }: Props) {
  return (
    <Wrap id={id} data-section="true">
      <Container>
        <Header>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Title>{title}</Title>
          <Underline />
        </Header>
        {children}
      </Container>
    </Wrap>
  );
}