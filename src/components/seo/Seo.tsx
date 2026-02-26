import React from "react";
import { Helmet } from "react-helmet-async";
import { profile } from "@/content/profile";
import { truncate } from "@/utils/text";
import { withBase } from "@/utils/withBase";

export function Seo() {
  const title = `${profile.person.fullName} — ${profile.person.roleTitle}`;
  const description =
    truncate(profile.person.summary || profile.person.tagline || "Developer portfolio", 180);

  const siteUrl =
    typeof window !== "undefined" ? window.location.origin + import.meta.env.BASE_URL : "";

  const ogImage = withBase("/og-image.svg");

  const sameAs = [profile.links.linkedin, profile.links.github, profile.links.portfolio]
    .filter(Boolean)
    .filter((x) => x.startsWith("http"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.person.fullName,
    jobTitle: profile.person.roleTitle,
    url: siteUrl,
    image: withBase(profile.person.headshotPath),
    sameAs,
    email: profile.person.email ? `mailto:${profile.person.email}` : undefined,
    homeLocation: profile.person.location || undefined
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Icons */}
      <link rel="icon" type="image/svg+xml" href={withBase("/favicon.svg")} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}