import React from "react";
import styled from "styled-components";
import { profile } from "@/content/profile";
import { withBase } from "@/utils/withBase";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { IconGitHub } from "@/components/icons/IconGitHub";
import { IconLinkedIn } from "@/components/icons/IconLinkedIn";
import { IconMail } from "@/components/icons/IconMail";
import { IconButton } from "@/components/ui/IconButton";

const Wrap = styled.section`
  padding: clamp(64px, 7vw, 110px) 0;
  scroll-margin-top: var(--nav-h);
`;

const Grid = styled.div`
  display: grid;
  gap: 22px;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.1rem, 1.5rem + 2.8vw, 3.6rem);
  line-height: 1.05;
`;

const Sub = styled.p`
  font-size: clamp(1.05rem, 0.95rem + 0.6vw, 1.22rem);
  color: ${({ theme }) => theme.colors.text1};
  margin-top: 14px;
  max-width: 62ch;
`;

const Accent = styled.span`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent0},
    ${({ theme }) => theme.colors.accent1}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const CTA = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
`;

const Social = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 18px;
`;

const RightCard = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface0};
  padding: 16px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    opacity: 0.14;
    background: radial-gradient(
      400px 220px at 70% 10%,
      ${({ theme }) => theme.colors.accent0},
      transparent 60%
    );
    pointer-events: none;
  }
`;

const Headshot = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface0};
`;

const Mini = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 8px;

  strong {
    font-size: 1.05rem;
    letter-spacing: -0.02em;
  }
  span {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Chips = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export function Hero() {
  const socials = [
    { label: "LinkedIn", href: profile.links.linkedin, icon: <IconLinkedIn /> },
    { label: "GitHub", href: profile.links.github, icon: <IconGitHub /> },
    profile.person.email
      ? { label: "Email", href: `mailto:${profile.person.email}`, icon: <IconMail /> }
      : null
  ].filter(Boolean) as Array<{ label: string; href: string; icon: React.ReactNode }>;

  return (
    <Wrap id="home" data-section="true">
      <Container>
        <Grid>
          <Reveal>
            <div>
              <Title>
                {profile.person.fullName.split(" ")[0]} <Accent>{profile.person.fullName.split(" ").slice(1).join(" ")}</Accent>
              </Title>
              <Sub>
                <strong style={{ color: "inherit" }}>{profile.person.roleTitle}</strong>{" "}
                • {profile.person.location}
                <br />
                {profile.person.tagline}
              </Sub>

              <CTA>
                <Button href="#projects">View Projects</Button>
                <Button href="#contact" $variant="ghost">
                  Contact
                </Button>
              </CTA>

              <Social aria-label="Social links">
                {socials.length ? (
                  socials.map((s) => (
                    <IconButton
                      as="a"
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={s.label}
                      style={{ textDecoration: "none" }}
                    >
                      {s.icon}
                    </IconButton>
                  ))
                ) : (
                  <span style={{ opacity: 0.75 }}>
                    Add your GitHub/email in <code>src/content/profile.ts</code>
                  </span>
                )}
              </Social>
            </div>
          </Reveal>

          <Reveal>
            <RightCard>
              <Headshot
                src={withBase(profile.person.headshotPath)}
                alt={`${profile.person.fullName} headshot`}
                onError={(e) => {
                  // If you replace headshotPath with a JPG and it 404s, the SVG placeholder still exists.
                  (e.currentTarget as HTMLImageElement).src = withBase("/headshot.svg");
                }}
              />
              <Mini>
                <strong>Currently</strong>
                <span>
                  {profile.experience?.[0]?.title
                    ? `${profile.experience[0].title} @ ${profile.experience[0].company}`
                    : "Add your current role in profile.ts"}
                </span>
              </Mini>
              <Chips>
                {profile.skills.core.slice(0, 6).map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </Chips>
            </RightCard>
          </Reveal>
        </Grid>
      </Container>
    </Wrap>
  );
}