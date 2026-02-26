"use client";
import { useState } from "react";
import { Reveal, Label } from "../CommonComponents";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES } from "@/lib/theme-context";

export function Experience({ theme }: { theme: typeof THEMES.dark }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="experience"
      style={{
        padding: "clamp(4rem, 10vw, 10rem) 1.5rem",
        background: theme.surface,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>
        <Label theme={theme} n={2} label="Experience" />
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
            WHERE I&apos;VE WORKED
          </h2>
        </Reveal>

        {PORTFOLIO_DATA.experience.map((exp, i) => (
          <Reveal
            key={exp.company}
            delay={i * 0.12}
            dir="left"
            style={{ marginBottom: "2px" }}
          >
            <div
              onClick={() => setActive(active === i ? null : i)}
              style={{
                background:
                  active === i ? `rgba(${theme.accentRgb},0.04)` : theme.bg,
                border: `1px solid ${
                  active === i
                    ? `rgba(${theme.accentRgb},0.2)`
                    : theme.border
                }`,
                padding: "2.5rem 3rem",
                cursor: "none",
                transition: "all 0.35s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                if (active !== i)
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `rgba(${theme.accentRgb},0.14)`;
              }}
              onMouseOut={(e) => {
                if (active !== i)
                  (e.currentTarget as HTMLElement).style.borderColor =
                    theme.border;
              }}
            >
              {/* Left accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: active === i ? 3 : 0,
                  background: theme.accent,
                  transition: "width 0.35s ease",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                      color: theme.text,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "clamp(0.65rem, 1.5vw, 0.73rem)",
                      color: theme.accent,
                    }}
                  >
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "0.63rem",
                      color: theme.muted,
                    }}
                  >
                    {exp.period}
                  </span>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: `1px solid ${theme.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme.muted,
                      fontSize: "0.85rem",
                      transform: active === i ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    +
                  </div>
                </div>
              </div>

              {/* Bullets — animated expand */}
              <div
                style={{
                  maxHeight: active === i ? "400px" : 0,
                  overflow: "hidden",
                  transition: "max-height 0.55s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <ul
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                    paddingLeft: 0,
                    listStyle: "none",
                  }}
                >
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          color: theme.accent,
                          flexShrink: 0,
                          marginTop: "0.22rem",
                          fontSize: "0.55rem",
                        }}
                      >
                        ◆
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: "0.77rem",
                          color: theme.muted,
                          lineHeight: 1.82,
                        }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
