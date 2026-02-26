"use client";
import { Reveal, Label, MagBtn } from "../CommonComponents";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES } from "@/lib/theme-context";

export function About({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <section
      id="about"
      style={{
        padding: "clamp(4rem, 10vw, 10rem) 1.5rem",
        background: theme.bg,
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; }
          .about-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>
        <Label theme={theme} n={1} label="About" />
        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <div>
            <Reveal delay={0.05}>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem,3.5vw,3rem)",
                  color: theme.text,
                  lineHeight: 1.1,
                  marginBottom: "1.75rem",
                }}
              >
                {PORTFOLIO_DATA.about.statement.split(" ").map((w, i) => (
                  <span
                    key={i}
                    style={{
                      color: ["scale,", "stream,", "think."].includes(w)
                        ? theme.accent
                        : theme.text,
                    }}
                  >
                    {w}{" "}
                  </span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.8rem",
                  color: theme.muted,
                  lineHeight: 1.95,
                  marginBottom: "2.5rem",
                }}
              >
                {PORTFOLIO_DATA.about.bio}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <MagBtn
                  theme={theme}
                  href={PORTFOLIO_DATA.meta.github}
                  target="_blank"
                >
                  ↗ GitHub
                </MagBtn>
                <MagBtn
                  theme={theme}
                  href={PORTFOLIO_DATA.meta.linkedin}
                  target="_blank"
                >
                  ↗ LinkedIn
                </MagBtn>
              </div>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              background: theme.border,
            }}
            className="about-stats-grid"
          >
            {PORTFOLIO_DATA.about.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.1}>
                <div
                  style={{
                    background: theme.surface,
                    padding:
                      "clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 2rem)",
                    transition: "background 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      `rgba(${theme.accentRgb},0.05)`)
                  }
                  onMouseOut={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      theme.surface)
                  }
                >
                  <p
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(1.8rem, 5vw, 3rem)",
                      color: theme.accent,
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "clamp(0.5rem, 1.2vw, 0.58rem)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: theme.muted,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
