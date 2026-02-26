import React from "react";
import styled from "styled-components";
import { profile } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { formatRange } from "@/utils/formatDate";

const Timeline = styled.div`
  display: grid;
  gap: 14px;
`;

const Item = styled(Card)`
  display: grid;
  gap: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
`;

const Left = styled.div`
  display: grid;
  gap: 4px;
`;

const Role = styled.div`
  font-weight: 900;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
`;

const Meta = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;

const Bullets = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.text1};

  li {
    margin: 6px 0;
  }
`;

const Tech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export function Experience() {
  if (!profile.experience?.length) return null;

  return (
    <Section id="experience" title="Experience" eyebrow="Timeline">
      <Timeline>
        {profile.experience.map((e) => (
          <Reveal key={`${e.company}-${e.title}-${e.start}`}>
            <Item>
              <Top>
                <Left>
                  <Role>
                    {e.title} · {e.company}
                  </Role>
                  <Meta>
                    {formatRange(e.start, e.end)} · {e.location}
                  </Meta>
                </Left>
              </Top>

              {e.bullets?.length ? (
                <Bullets>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </Bullets>
              ) : null}

              {e.tech?.length ? (
                <Tech aria-label="Technologies used">
                  {e.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </Tech>
              ) : null}
            </Item>
          </Reveal>
        ))}
      </Timeline>
    </Section>
  );
}