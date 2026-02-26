import React from "react";
import styled from "styled-components";
import { profile } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const List = styled.div`
  display: grid;
  gap: 14px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const Title = styled.h3`
  font-size: 1.1rem;
`;

const Meta = styled.div`
  color: ${({ theme }) => theme.colors.muted};
`;

const Details = styled.ul`
  margin: 10px 0 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.text1};

  li {
    margin: 6px 0;
  }
`;

export function Education() {
  const items = profile.education?.items ?? [];
  if (!items.length) return null;

  return (
    <Section id="education" title="Education" eyebrow="Foundations">
      <List>
        {items.map((e, idx) => (
          <Reveal key={`${e.level}-${idx}`}>
            <Card>
              <Top>
                <div>
                  <Title>
                    {e.level}
                    {e.program ? ` · ${e.program}` : ""}
                  </Title>
                  <Meta>{e.institution || "Add institution in profile.ts"}</Meta>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Meta>{e.year || ""}</Meta>
                  {!profile.education.privacyModeHideExactScores && e.score ? (
                    <Meta style={{ marginTop: 4 }}>{e.score}</Meta>
                  ) : null}
                </div>
              </Top>

              {e.details?.length ? (
                <Details>
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </Details>
              ) : null}
            </Card>
          </Reveal>
        ))}
      </List>
    </Section>
  );
}