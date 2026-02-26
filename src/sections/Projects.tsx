import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { profile, type ProjectItem } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Modal } from "@/components/ui/Modal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/Button";

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(12, 1fr);
`;

const ProjectCard = styled(Card)`
  grid-column: span 6;
  display: grid;
  gap: 12px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-column: span 12;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
`;

const Title = styled.h3`
  font-size: 1.15rem;
`;

const Status = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface0};
`;

const Desc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text1};
`;

const Tech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ModalBody = styled.div`
  padding: 0 16px 18px;
`;

const ModalGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 1.1fr 0.9fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.35rem;
  margin: 6px 0 8px;
`;

const Block = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface0};
  padding: 14px;
`;

const List = styled.ul`
  margin: 8px 0 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.text1};

  li {
    margin: 6px 0;
  }
`;

function tagsFor(project: ProjectItem): string[] {
  const base = [project.type, ...project.techStack];
  return Array.from(new Set(base.filter(Boolean)));
}

function topTags(projects: ProjectItem[]): string[] {
  const freq = new Map<string, number>();
  for (const p of projects) {
    for (const t of tagsFor(p)) freq.set(t, (freq.get(t) ?? 0) + 1);
  }
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([t]) => t);
}

export function Projects() {
  const projects = profile.projects ?? [];
  if (!projects.length) return null;

  const tags = useMemo(() => topTags(projects), [projects]);
  const [active, setActive] = useState<string>("All");
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => tagsFor(p).includes(active));
  }, [projects, active]);

  return (
    <Section id="projects" title="Projects" eyebrow="Selected work">
      <Bar>
        <Filters aria-label="Project filters">
          <Tag as="button" $active={active === "All"} onClick={() => setActive("All")}>
            All
          </Tag>
          {tags.map((t) => (
            <Tag
              as="button"
              key={t}
              $active={active === t}
              onClick={() => setActive(t)}
            >
              {t}
            </Tag>
          ))}
        </Filters>

        <div style={{ color: "rgba(234,242,255,0.7)" }}>
          Showing <strong style={{ color: "inherit" }}>{filtered.length}</strong>
        </div>
      </Bar>

      <Grid>
        {filtered.map((p) => (
          <Reveal key={p.name}>
            <ProjectCard
              role="button"
              tabIndex={0}
              aria-label={`Open project ${p.name}`}
              onClick={() => setSelected(p)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelected(p);
              }}
            >
              <ImageWithFallback
                src={p.media?.coverImage}
                alt={`${p.name} cover`}
                ratio="16/10"
                label={p.name}
              />

              <Row>
                <Title>{p.name}</Title>
                <Status>{p.status}</Status>
              </Row>

              <Desc>{p.shortDescription}</Desc>

              <Tech>
                {p.techStack.slice(0, 6).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </Tech>
            </ProjectCard>
          </Reveal>
        ))}
      </Grid>

      <Modal
        open={!!selected}
        title={selected ? selected.name : "Project details"}
        onClose={() => setSelected(null)}
      >
        {selected ? (
          <ModalBody>
            <ImageWithFallback
              src={selected.media?.coverImage}
              alt={`${selected.name} cover`}
              ratio="16/8"
              label={selected.name}
            />

            <ModalTitle>{selected.name}</ModalTitle>
            <p style={{ marginTop: 0, opacity: 0.8 }}>
              {selected.type} • <span style={{ opacity: 0.8 }}>{selected.status}</span>
            </p>

            <ModalGrid>
              <Block>
                <h4 style={{ margin: 0 }}>Problem → Approach</h4>
                {selected.longDescription
                  .split("\n")
                  .filter(Boolean)
                  .map((line, i) => (
                    <p key={i} style={{ marginTop: 10, marginBottom: 0 }}>
                      {line}
                    </p>
                  ))}
              </Block>

              <Block>
                <h4 style={{ margin: 0 }}>Role</h4>
                <p style={{ marginTop: 10, marginBottom: 0 }}>{selected.role}</p>

                <h4 style={{ margin: "14px 0 0" }}>Key features</h4>
                <List>
                  {selected.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </List>

                <h4 style={{ margin: "14px 0 8px" }}>Tech</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {selected.techStack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                  {selected.links.playstore ? (
                    <Button
                      href={selected.links.playstore}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Play Store
                    </Button>
                  ) : null}
                  {selected.links.demo ? (
                    <Button href={selected.links.demo} target="_blank" rel="noreferrer">
                      Live Demo
                    </Button>
                  ) : null}
                  {selected.links.github ? (
                    <Button
                      href={selected.links.github}
                      target="_blank"
                      rel="noreferrer"
                      $variant="ghost"
                    >
                      GitHub
                    </Button>
                  ) : null}

                  {!selected.links.playstore && !selected.links.demo && !selected.links.github ? (
                    <span style={{ opacity: 0.75 }}>
                      Add links in <code>src/content/profile.ts</code>
                    </span>
                  ) : null}
                </div>
              </Block>
            </ModalGrid>

            {selected.media?.screenshots?.length ? (
              <div style={{ marginTop: 14 }}>
                <h4 style={{ margin: "0 0 10px" }}>Screenshots</h4>
                <div
                  style={{
                    display: "grid",
                    gap: 12,
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
                  }}
                >
                  {selected.media.screenshots.map((s) => (
                    <ImageWithFallback key={s} src={s} alt="Project screenshot" ratio="16/10" />
                  ))}
                </div>
              </div>
            ) : null}
          </ModalBody>
        ) : null}
      </Modal>
    </Section>
  );
}