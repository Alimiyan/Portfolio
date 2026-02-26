"use client";
import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES, type ThemeKey } from "@/lib/theme-context";

export function Nav({
  theme,
  themeKey,
  setTheme,
}: {
  theme: typeof THEMES.dark;
  themeKey: ThemeKey;
  setTheme: (k: ThemeKey) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mopen, setMopen] = useState(false);
  const THEMES_MAP = THEMES;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const cycleTheme = () => {
    const keys = Object.keys(THEMES_MAP) as ThemeKey[];
    setTheme(keys[(keys.indexOf(themeKey) + 1) % keys.length]);
  };

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "0.9rem 2rem" : "1.4rem 2rem",
        background: scrolled ? theme.nav : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${theme.border}` : "none",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <a
        href="#hero"
        aria-label="Portfolio home"
        style={{
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: "1.05rem",
          color: theme.accent,
          letterSpacing: "0.05em",
          textDecoration: "none",
        }}
      >
        {PORTFOLIO_DATA.meta.initials}
        <span style={{ color: theme.muted }}>.</span>
      </a>

      {/* Desktop */}
      <div
        className="hide-mobile"
        role="menubar"
        style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        {PORTFOLIO_DATA.nav.map((l) => (
          <a
            key={l.href}
            href={l.href}
            role="menuitem"
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.63rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: theme.muted,
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLElement).style.color = theme.text)
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLElement).style.color = theme.muted)
            }
          >
            {l.label}
          </a>
        ))}

        {/* Theme cycle button */}
        <button
          onClick={cycleTheme}
          style={{
            background: `rgba(${theme.accentRgb},0.08)`,
            border: `1px solid rgba(${theme.accentRgb},0.22)`,
            color: theme.accent,
            padding: "0.38rem 0.85rem",
            borderRadius: "2rem",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            cursor: "none",
            transition: "all 0.25s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
          onMouseOver={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = `rgba(${theme.accentRgb},0.15)`;
            el.style.transform = "scale(1.04)";
          }}
          onMouseOut={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = `rgba(${theme.accentRgb},0.08)`;
            el.style.transform = "scale(1)";
          }}
        >
          {THEMES_MAP[themeKey as keyof typeof THEMES_MAP].icon}{" "}
          {THEMES_MAP[themeKey as keyof typeof THEMES_MAP].label}
        </button>

        <a
          href={`mailto:${PORTFOLIO_DATA.meta.email}`}
          data-mag
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.63rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: theme.bg,
            background: theme.accent,
            padding: "0.5rem 1.2rem",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
            fontWeight: 700,
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.82")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          Hire Me
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMopen((o) => !o)}
        aria-label="Toggle mobile menu"
        aria-expanded={mopen}
        className="hide-desktop"
        style={{
          background: "none",
          border: "none",
          cursor: "none",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "4px",
        }}
      >
        {[
          mopen ? "rotate(45deg) translate(5px,5px)" : "",
          mopen ? "scaleX(0)" : "",
          mopen ? "rotate(-45deg) translate(5px,-5px)" : "",
        ].map((t, i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 22,
              height: 1.5,
              background: theme.text,
              transition: "all 0.3s ease",
              transform: t,
              opacity: i === 1 && mopen ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {mopen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: theme.bg,
            borderBottom: `1px solid ${theme.border}`,
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {PORTFOLIO_DATA.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMopen(false)}
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: theme.muted,
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              cycleTheme();
              setMopen(false);
            }}
            style={{
              background: "none",
              border: `1px solid ${theme.border}`,
              color: theme.accent,
              padding: "0.5rem",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              cursor: "none",
              textAlign: "left",
            }}
          >
            {THEMES_MAP[themeKey as keyof typeof THEMES_MAP].icon} Switch to{" "}
            {
              THEMES_MAP[
                Object.keys(THEMES_MAP)[
                  (Object.keys(THEMES_MAP).indexOf(themeKey) + 1) %
                    Object.keys(THEMES_MAP).length
                ] as keyof typeof THEMES_MAP
              ].label
            }
          </button>
        </div>
      )}
    </nav>
  );
}
