import React from "react";
import { ThemeProvider } from "styled-components";

import { profile } from "@/content/profile";
import { GlobalStyles } from "@/styles/globalStyles";
import { getTheme } from "@/styles/theme";
import { useThemeMode } from "@/hooks/useThemeMode";

import { Seo } from "@/components/seo/Seo";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { NavBar } from "@/components/nav/NavBar";

import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Education } from "@/sections/Education";
import { Achievements } from "@/sections/Achievements";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function App() {
  const { mode, toggle } = useThemeMode(profile.branding.preferredTheme);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Seo />

      <SkipToContent />

      <NavBar themeMode={mode} onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}