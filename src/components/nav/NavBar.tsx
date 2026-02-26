import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { profile, type ThemeMode } from "@/content/profile";
import { withBase } from "@/utils/withBase";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { IconMenu } from "@/components/icons/IconMenu";
import { IconX } from "@/components/icons/IconX";

const Bar = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 999;
  height: var(--nav-h);
  display: flex;
  align-items: center;

  background: ${({ theme, $scrolled }) =>
    $scrolled ? `rgba(0,0,0,0.25)` : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(10px)" : "none")};
  border-bottom: 1px solid
    ${({ theme, $scrolled }) => ($scrolled ? theme.colors.border : "transparent")};

  transition: background 140ms ease, border-color 140ms ease;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;

  &:hover {
    opacity: 0.95;
  }
`;

const Mark = styled.div`
  height: 38px;
  width: 38px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent0},
    ${({ theme }) => theme.colors.accent1}
  );
  color: ${({ theme }) => (theme.mode === "dark" ? "#07101f" : "#061018")};
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;

  strong {
    font-size: 0.98rem;
  }
  span {
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    span {
      display: none;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: none;
  }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  padding: 10px 10px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.text0};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.border : "transparent")};
  background: ${({ theme, $active }) => ($active ? theme.colors.surface0 : "transparent")};
  font-size: 0.95rem;

  transition: background 120ms ease, border-color 120ms ease, transform 120ms ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.surface0};
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MobileTrigger = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: inline-flex;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: grid;
  place-items: start center;
  padding: 14px;
`;

const MobilePanel = styled.div`
  width: min(520px, 100%);
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg0};
  padding: 14px;
`;

const MobileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const MobileNav = styled.nav`
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
`;

const MobileLink = styled.a`
  padding: 12px 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface0};

  &:hover {
    background: ${({ theme }) => theme.colors.surface1};
  }
`;

type Props = {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
};

export function NavBar({ themeMode, onToggleTheme }: Props) {
  const activeId = useActiveSection();
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);

  const panelRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(panelRef, open, () => setOpen(false));

  const links = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "education", label: "Education" },
      { id: "achievements", label: "Achievements" },
      { id: "contact", label: "Contact" }
    ],
    []
  );

  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resumeHref = withBase(profile.links.resumePdfPath);

  return (
    <>
      <Bar $scrolled={scrolled}>
        <Container>
          <Row>
            <Brand href="#home" aria-label="Go to top">
              <Mark>GP</Mark>
              <BrandText>
                <strong>{profile.person.fullName}</strong>
                <span>{profile.person.roleTitle}</span>
              </BrandText>
            </Brand>

            <Nav aria-label="Primary navigation">
              {links.map((l) => (
                <NavLink key={l.id} href={`#${l.id}`} $active={activeId === l.id}>
                  {l.label}
                </NavLink>
              ))}
            </Nav>

            <Actions>
              <Button
                href={resumeHref}
                $variant="ghost"
                target="_blank"
                rel="noreferrer"
                aria-label="Download resume"
              >
                Resume
              </Button>

              <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />

              <MobileTrigger>
                <IconButton
                  onClick={() => setOpen(true)}
                  aria-label="Open mobile menu"
                >
                  <IconMenu />
                </IconButton>
              </MobileTrigger>
            </Actions>
          </Row>
        </Container>
      </Bar>

      {open ? (
        <MobileOverlay role="presentation" onMouseDown={() => setOpen(false)}>
          <MobilePanel ref={panelRef} onMouseDown={(e) => e.stopPropagation()}>
            <MobileTop>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Mark style={{ height: 34, width: 34, borderRadius: 12 }}>GP</Mark>
                <div style={{ lineHeight: 1.1 }}>
                  <div style={{ fontWeight: 800 }}>{profile.person.fullName}</div>
                  <div style={{ opacity: 0.7, fontSize: 13 }}>{profile.person.roleTitle}</div>
                </div>
              </div>
              <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
                <IconX />
              </IconButton>
            </MobileTop>

            <MobileNav aria-label="Mobile navigation">
              {links.map((l) => (
                <MobileLink
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </MobileLink>
              ))}
            </MobileNav>

            <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
              <Button
                href={resumeHref}
                $variant="ghost"
                target="_blank"
                rel="noreferrer"
                style={{ flex: 1 }}
              >
                Resume
              </Button>
              <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />
            </div>
          </MobilePanel>
        </MobileOverlay>
      ) : null}
    </>
  );
}