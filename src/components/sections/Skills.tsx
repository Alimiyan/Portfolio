"use client";
import { useRef } from "react";
import { Reveal, Label } from "../CommonComponents";
import { useInView } from "@/hooks";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES } from "@/lib/theme-context";

function SkillBar({
  skill,
  theme,
  i,
}: {
  skill: (typeof PORTFOLIO_DATA.skills)[0];
  theme: typeof THEMES.dark;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });

  return (
    <div ref={ref} style={{ marginBottom: "2.2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.6rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 600,
            fontSize: "0.88rem",
            color: theme.text,
          }}
        >
          {skill.category}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.68rem",
            color: theme.accent,
          }}
        >
          {skill.level}%
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          height: 2,
          background: theme.skillTrack,
          position: "relative",
          overflow: "hidden",
          marginBottom: "0.65rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            background: `linear-gradient(90deg,${theme.accent},rgba(${theme.accentRgb},0.45))`,
            width: inView ? `${skill.level}%` : "0%",
            transition: `width 1.3s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            boxShadow: `0 0 8px ${theme.accent}88`,
          }}
        />
      </div>

      {/* Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {skill.items.map((item) => (
          <span
            key={item}
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.6rem",
              color: theme.muted,
              padding: "0.18rem 0.55rem",
              border: `1px solid ${theme.border}`,
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = theme.accent;
              el.style.borderColor = `rgba(${theme.accentRgb},0.4)`;
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = theme.muted;
              el.style.borderColor = theme.border;
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <section
      id="skills"
      style={{
        padding: "clamp(4rem, 10vw, 10rem) 1.5rem",
        background: theme.surface,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>
        <Label theme={theme} n={4} label="Skills" />
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
            TECH ARSENAL
          </h2>
        </Reveal>

        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(1.5rem, 5vw, 5rem) clamp(1.5rem, 5vw, 5rem)",
          }}
        >
          {PORTFOLIO_DATA.skills.map((s, i) => (
            <Reveal key={s.category} delay={i * 0.07}>
              <SkillBar skill={s} theme={theme} i={i} />
            </Reveal>
          ))}
        </div>

        {/* Certs */}
        <Reveal
          delay={0.4}
          style={{
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: `1px solid ${theme.border}`,
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: theme.accent,
              marginBottom: "1.25rem",
            }}
          >
            Certifications
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
            {PORTFOLIO_DATA.certifications.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.55rem 1rem",
                  border: `1px solid rgba(${theme.accentRgb},0.14)`,
                  transition: "all 0.25s ease",
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = theme.accent;
                  el.style.background = `rgba(${theme.accentRgb},0.05)`;
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${theme.accentRgb},0.14)`;
                  el.style.background = "transparent";
                }}
              >
                <span style={{ color: theme.accent, fontSize: "0.5rem" }}>
                  ✦
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.65rem",
                    color: theme.muted,
                  }}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
