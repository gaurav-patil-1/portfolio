import React from "react";
import styled from "styled-components";
import { profile } from "@/content/profile";

import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1.2fr 0.8fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`;

const Summary = styled.div`
  p:last-child {
    margin-bottom: 0;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Hint = styled.p`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;

export function About() {
  const highlights = [
    "Product-focused engineering",
    "Clean UI + strong fundamentals",
    "Type-safe React + TS",
    ".NET + GraphQL experience"
  ];

  return (
    <Section id="about" title="About" eyebrow="Curious. Learning. Building.">
      <Grid>
        <Reveal>
          <Card>
            <Summary>
              {(profile.person.summary || "").split("\n").filter(Boolean).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {!profile.person.summary ? (
                <p>
                  Add your summary in <code>src/content/profile.ts</code>.
                </p>
              ) : null}
            </Summary>
          </Card>
        </Reveal>

        <Reveal>
          <Card>
            <h3 style={{ fontSize: "1.15rem", marginBottom: 12 }}>Highlights</h3>
            <Chips>
              {highlights.map((h) => (
                <Tag key={h}>{h}</Tag>
              ))}
            </Chips>
            <Hint>
              Tip: keep this section short and specific. 3–5 strong statements beat a long bio.
            </Hint>
          </Card>
        </Reveal>
      </Grid>
    </Section>
  );
}