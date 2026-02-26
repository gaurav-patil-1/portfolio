import React from "react";
import styled from "styled-components";
import { profile } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(12, 1fr);
`;

const Item = styled(Card)`
  grid-column: span 6;
  display: grid;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-column: span 12;
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
`;

const Meta = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;

export function Achievements() {
  const items = profile.achievements ?? [];
  if (!items.length) return null;

  return (
    <Section id="achievements" title="Achievements" eyebrow="Certifications / wins">
      <Grid>
        {items.map((a) => (
          <Reveal key={a.title}>
            <Item>
              <div>
                <Title>{a.title}</Title>
                <Meta>
                  {a.issuer}
                  {a.year ? ` · ${a.year}` : ""}
                </Meta>
              </div>

              {a.details ? <p style={{ margin: 0 }}>{a.details}</p> : null}

              {a.link ? (
                <div>
                  <Button href={a.link} target="_blank" rel="noreferrer" $variant="ghost">
                    View
                  </Button>
                </div>
              ) : null}
            </Item>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}