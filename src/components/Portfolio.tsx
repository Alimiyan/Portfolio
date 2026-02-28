"use client";
import { useState } from "react";
import { Cursor } from "./Cursor";
import { THEMES, type ThemeKey } from "@/lib/theme-context";
import { generatePersonSchema, generateProjectSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Awards } from "./sections/Awards";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { Nav } from "./sections/Nav";

export function Portfolio() {
  const [themeKey, setThemeKey] = useState<ThemeKey>("dark");

  const theme = THEMES[themeKey];

  return (
    <div style={{ background: theme.bg, color: theme.text }}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonSchema()),
        }}
      />

      {/* Main styles */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.accent}; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hide-mobile { display: none !important; }
        }
        @media (min-width: 769px) { .hide-desktop { display: none !important; } }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bob { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes grain { 0% { transform: translate(0, 0); } 33% { transform: translate(-2px, 1px); } 66% { transform: translate(1px, -2px); } 100% { transform: translate(-1px, 1px); } }
      `}</style>

      {/* Film grain */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9990,
          pointerEvents: "none",
          opacity: 0.022,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
          animation: "grain 0.4s steps(3) infinite",
        }}
      />

      {/* Cursor & Navigation */}
      <Cursor theme={theme} />
      <Nav theme={theme} themeKey={themeKey} setTheme={setThemeKey} />

      {/* Main sections */}
      <Hero theme={theme} />
      <About theme={theme} />
      <Experience theme={theme} />
      <Projects theme={theme} />
      <Skills theme={theme} />
      <Awards theme={theme} />
      <Contact theme={theme} />
      <Footer theme={theme} />

      {/* Theme indicator */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "1.5rem",
          zIndex: 900,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.52rem",
          letterSpacing: "0.25em",
          color: `rgba(${theme.accentRgb}, 0.3)`,
          transition: "color 0.5s ease",
        }}
      >
        THEME: {themeKey.toUpperCase()}
      </div>
    </div>
  );
}
