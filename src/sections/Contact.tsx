import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { profile } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { IconGitHub } from "@/components/icons/IconGitHub";
import { IconLinkedIn } from "@/components/icons/IconLinkedIn";
import { IconMail } from "@/components/icons/IconMail";
import { IconButton } from "@/components/ui/IconButton";

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 12px;
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text1};

  input,
  textarea {
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface0};
    padding: 12px 12px;
    color: ${({ theme }) => theme.colors.text0};
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }
`;

const Note = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const Social = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

export function Contact() {
  const endpoint = profile.contact.formspreeEndpoint?.trim();
  const showForm = Boolean(endpoint);

  const socials = useMemo(() => {
    const s = [
      { label: "LinkedIn", href: profile.links.linkedin, icon: <IconLinkedIn /> },
      { label: "GitHub", href: profile.links.github, icon: <IconGitHub /> }
    ].filter((x) => x.href);

    if (profile.person.email) {
      s.unshift({
        label: "Email",
        href: `mailto:${profile.person.email}`,
        icon: <IconMail />
      });
    }
    return s;
  }, []);

  // Optional: ajax submit if endpoint exists
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!endpoint) return;
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" title="Contact" eyebrow="Let’s build something solid">
      <Grid>
        <Reveal>
          <Card>
            <h3 style={{ fontSize: "1.15rem", marginBottom: 10 }}>Reach out</h3>
            <p style={{ marginTop: 0 }}>
              If you want to discuss roles, collaborations, or product work, send a message.
            </p>

            {profile.person.email ? (
              <p style={{ marginTop: 0 }}>
                Email:{" "}
                <a
                  href={`mailto:${profile.person.email}`}
                  style={{ textDecoration: "underline" }}
                >
                  {profile.person.email}
                </a>
              </p>
            ) : (
              <Note>
                Add your email in <code>src/content/profile.ts</code> to show a mail link.
              </Note>
            )}

            <Social aria-label="Social links">
              {socials.length ? (
                socials.map((s) => (
                  <IconButton
                    as="a"
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    style={{ textDecoration: "none" }}
                  >
                    {s.icon}
                  </IconButton>
                ))
              ) : (
                <Note>
                  Add social links in <code>src/content/profile.ts</code>.
                </Note>
              )}
            </Social>
          </Card>
        </Reveal>

        <Reveal>
          <Card>
            <h3 style={{ fontSize: "1.15rem", marginBottom: 10 }}>Message</h3>

            {showForm ? (
              <Form onSubmit={onSubmit}>
                <Field>
                  Name
                  <input name="name" autoComplete="name" required />
                </Field>

                <Field>
                  Email
                  <input name="email" type="email" autoComplete="email" required />
                </Field>

                <Field>
                  Message
                  <textarea name="message" required />
                </Field>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Button as="button" href="#" onClick={(e) => e.preventDefault()} style={{ display: "none" }}>
                    hidden
                  </Button>
                  <Button as="button" $variant="primary" href="#" onClick={(e) => e.preventDefault()} style={{ display: "none" }}>
                    hidden
                  </Button>

                  <Button
                    as="button"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ display: "none" }}
                  >
                    hidden
                  </Button>

                  <Button
                    as="button"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ display: "none" }}
                  >
                    hidden
                  </Button>

                  <Button
                    as="button"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ display: "none" }}
                  >
                    hidden
                  </Button>

                  {/* Real submit button */}
                  <Button
                    as="button"
                    $variant="primary"
                    style={{ height: 46, padding: "0 16px" }}
                    onClick={() => {}}
                  >
                    {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send"}
                  </Button>

                  {status === "error" ? (
                    <Note>Something went wrong. Try again.</Note>
                  ) : status === "sent" ? (
                    <Note>Thanks — I’ll get back to you.</Note>
                  ) : (
                    <Note>Powered by Formspree.</Note>
                  )}
                </div>
              </Form>
            ) : (
              <Note>
                If you want a contact form, add your Formspree endpoint in{" "}
                <code>src/content/profile.ts</code>. Otherwise, this section stays clean and
                mail/social-only.
              </Note>
            )}
          </Card>
        </Reveal>
      </Grid>
    </Section>
  );
}