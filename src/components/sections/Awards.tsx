"use client";
import { Reveal, Label } from "../CommonComponents";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES } from "@/lib/theme-context";

export function Awards({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <section
      style={{
        padding: "clamp(4rem, 10vw, 8rem) 1.5rem",
        background: theme.bg,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>
        <Label theme={theme} n={5} label="Recognition" />
        <div
          className="awards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            marginTop: "3rem",
          }}
        >
          {PORTFOLIO_DATA.awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.12}>
              <div
                style={{
                  padding: "clamp(1.5rem, 4vw, 3rem)",
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${theme.accentRgb},0.22)`;
                  el.style.background = `rgba(${theme.accentRgb},0.03)`;
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = theme.border;
                  el.style.background = theme.surface;
                }}
              >
                {/* BG letters */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1.5rem",
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "clamp(2rem, 8vw, 4.5rem)",
                    color: `rgba(${theme.accentRgb},0.04)`,
                    lineHeight: 1,
                    fontWeight: 800,
                    userSelect: "none",
                  }}
                >
                  EY
                </div>

                <p
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    color: theme.accent,
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  🏆 {a.org}
                </p>
                <h3
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: theme.text,
                    marginBottom: "0.75rem",
                  }}
                >
                  {a.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.74rem",
                    color: theme.muted,
                    lineHeight: 1.8,
                  }}
                >
                  {a.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
