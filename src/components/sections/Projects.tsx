"use client";
import { useState, useRef } from "react";
import { Reveal, Label } from "../CommonComponents";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES } from "@/lib/theme-context";

function ProjectCard({
  p,
  i,
  theme,
}: {
  p: (typeof PORTFOLIO_DATA.projects)[0];
  i: number;
  theme: typeof THEMES.dark;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const [gx, setGx] = useState(50);
  const [gy, setGy] = useState(50);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    setRx(((e.clientY - r.top) / r.height - 0.5) * -6);
    setRy(((e.clientX - r.left) / r.width - 0.5) * 6);
    setGx(((e.clientX - r.left) / r.width) * 100);
    setGy(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <Reveal delay={i * 0.14} style={{ marginBottom: "2px" }}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => {
          setHov(false);
          setRx(0);
          setRy(0);
        }}
        style={{
          background: hov
            ? `radial-gradient(circle at ${gx}% ${gy}%,rgba(${theme.accentRgb},0.05) 0%,${theme.surface} 55%)`
            : theme.surface,
          border: `1px solid ${
            hov ? `rgba(${theme.accentRgb},0.2)` : theme.border
          }`,
          padding: "clamp(1.5rem, 5vw, 3rem)",
          transform: `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${
            hov ? 1.008 : 1
          })`,
          transition:
            "transform 0.2s ease,border-color 0.3s ease,background 0.12s ease",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "clamp(1.5rem, 4vw, 3rem)",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          {/* Big number */}
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 6rem)",
              lineHeight: 1,
              flexShrink: 0,
              WebkitTextStroke: `1px rgba(${theme.accentRgb},${
                hov ? "0.55" : "0.2"
              })`,
              color: "transparent",
              transition: "all 0.3s ease",
            }}
          >
            {p.number}
          </span>

          <div style={{ flex: 1, width: "100%" }}>
            {/* Animated underline */}
            <div
              style={{
                height: 1,
                background: `linear-gradient(90deg,${theme.accent},transparent)`,
                marginBottom: "1.25rem",
                width: hov ? "100%" : "35%",
                transition: "width 0.55s ease",
              }}
            />

            <h3
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                color: theme.text,
                marginBottom: "1rem",
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "clamp(0.68rem, 2vw, 0.77rem)",
                color: theme.muted,
                lineHeight: 1.88,
                marginBottom: "1.5rem",
              }}
            >
              {p.description}
            </p>

            {/* Highlights */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
                marginBottom: "1.5rem",
              }}
            >
              {p.highlights.map((h) => (
                <div
                  key={h}
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      color: theme.accent,
                      fontSize: "0.5rem",
                      marginTop: "0.3rem",
                      flexShrink: 0,
                    }}
                  >
                    ◈
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "clamp(0.65rem, 1.8vw, 0.72rem)",
                      color: theme.muted,
                    }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "clamp(0.55rem, 1.5vw, 0.6rem)",
                    padding: "0.22rem 0.65rem",
                    border: `1px solid rgba(${theme.accentRgb},0.15)`,
                    color: `rgba(${theme.accentRgb},0.65)`,
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = theme.accent;
                    el.style.color = theme.accent;
                    el.style.background = `rgba(${theme.accentRgb},0.06)`;
                  }}
                  onMouseOut={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `rgba(${theme.accentRgb},0.15)`;
                    el.style.color = `rgba(${theme.accentRgb},0.65)`;
                    el.style.background = "transparent";
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Projects({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <section
      id="projects"
      style={{
        padding: "clamp(4rem, 10vw, 10rem) 1.5rem",
        background: theme.bg,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>
        <Label theme={theme} n={3} label="Projects" />
        <Reveal delay={0.05}>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 5vw, 5rem)",
              color: theme.text,
              marginBottom: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            WHAT I&apos;VE BUILT
          </h2>
        </Reveal>
        {PORTFOLIO_DATA.projects.map((p, i) => (
          <ProjectCard key={p.number} p={p} i={i} theme={theme} />
        ))}
      </div>
    </section>
  );
}
