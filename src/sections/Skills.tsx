import React from "react";
import styled from "styled-components";
import { profile } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    grid-template-columns: 1fr;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillChip = styled.span<{ $level: 1 | 2 | 3 }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface0};

  font-size: 0.95rem;

  &::after {
    content: "";
    width: 34px;
    height: 10px;
    border-radius: 999px;
    opacity: 0.8;
    background: ${({ theme, $level }) => {
      const c0 = theme.colors.accent0;
      const c1 = theme.colors.accent1;
      if ($level === 3) return `linear-gradient(90deg, ${c0}, ${c1})`;
      if ($level === 2) return `linear-gradient(90deg, ${c0}, rgba(255,255,255,0.15))`;
      return `linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))`;
    }};
  }
`;

function Block({
  title,
  items,
  level
}: {
  title: string;
  items: string[];
  level: 1 | 2 | 3;
}) {
  return (
    <Card>
      <h3 style={{ fontSize: "1.15rem", marginBottom: 10 }}>{title}</h3>
      <List>
        {items.length ? (
          items.map((s) => (
            <SkillChip key={s} $level={level} aria-label={`${s} proficiency level ${level}`}>
              {s}
            </SkillChip>
          ))
        ) : (
          <p style={{ margin: 0, opacity: 0.75 }}>
            Add skills in <code>src/content/profile.ts</code>.
          </p>
        )}
      </List>
    </Card>
  );
}

export function Skills() {
  return (
    <Section id="skills" title="Skills" eyebrow="What I use to ship">
      <Grid>
        <Reveal>
          <Block title="Core" items={profile.skills.core} level={3} />
        </Reveal>
        <Reveal>
          <Block title="Additional" items={profile.skills.additional} level={2} />
        </Reveal>
        <Reveal>
          <Block title="Tools" items={profile.skills.tools} level={1} />
        </Reveal>
      </Grid>
    </Section>
  );
}