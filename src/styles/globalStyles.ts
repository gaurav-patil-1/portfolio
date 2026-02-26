import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root{
    --nav-h: 72px;
  }

  *{ box-sizing: border-box; }
  *::before, *::after{ box-sizing: border-box; }

  html{
    color-scheme: ${({ theme }) => theme.mode};
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce){
    html{ scroll-behavior: auto; }
  }

  body{
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontSans};
    background: radial-gradient(900px 480px at 12% 0%, ${({ theme }) =>
      theme.colors.bg1} 0%, ${({ theme }) => theme.colors.bg0} 55%, ${({
      theme,
    }) => theme.colors.bg0} 100%);
    color: ${({ theme }) => theme.colors.text0};
    line-height: 1.55;
    letter-spacing: 0.01em;
    overflow-x: hidden;
  }

  /* Signature motif: subtle "blueprint" grid + diagonal lines (tasteful) */
  body::before{
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: ${({ theme }) => (theme.mode === "dark" ? 0.16 : 0.1)};
    background-image:
      repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 36px),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 36px),
      repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 72px);
    mix-blend-mode: ${({ theme }) => (theme.mode === "dark" ? "screen" : "multiply")};
  }

  #root{
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  img{
    max-width: 100%;
    display: block;
  }

  a{
    color: inherit;
    text-decoration: none;
  }

  p{ margin: 0 0 1rem; color: ${({ theme }) => theme.colors.text1}; }

  h1,h2,h3{
    margin: 0;
    letter-spacing: -0.02em;
  }

  ::selection{
    background: rgba(76,201,240,0.25);
  }

  :focus-visible{
    outline: 2px solid ${({ theme }) => theme.colors.accent0};
    outline-offset: 3px;
    border-radius: 10px;
  }

  /* Better defaults */
  button, input, textarea{
    font: inherit;
    color: inherit;
  }
`;
