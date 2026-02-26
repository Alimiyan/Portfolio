"use client";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES } from "@/lib/theme-context";

export function Footer({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <footer
      style={{
        padding: "clamp(1.5rem, 3vw, 2.5rem) 1.5rem",
        borderTop: `1px solid ${theme.border}`,
        background: theme.bg,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "clamp(0.5rem, 1.2vw, 0.58rem)",
            letterSpacing: "0.15em",
            color: theme.muted,
          }}
        >
          © {new Date().getFullYear()} {PORTFOLIO_DATA.meta.name} ·{" "}
          {PORTFOLIO_DATA.meta.location}
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "clamp(0.5rem, 1.2vw, 0.58rem)",
            color: `rgba(${theme.accentRgb},0.3)`,
          }}
        >
          Press{" "}
          <kbd
            style={{
              border: `1px solid rgba(${theme.accentRgb},0.2)`,
              padding: "0.1rem 0.35rem",
              fontSize: "0.5rem",
              borderRadius: 2,
            }}
          >
            T
          </kbd>{" "}
          for terminal
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.58rem",
            color: theme.muted,
            opacity: 0.35,
          }}
        >
          Next.js · TypeScript · Framer Motion
        </p>
      </div>
    </footer>
  );
}
