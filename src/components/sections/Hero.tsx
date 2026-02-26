"use client";
import { useState, useEffect, useRef } from "react";
import { Reveal, MagBtn } from "../CommonComponents";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES } from "@/lib/theme-context";

export function Hero({ theme }: { theme: typeof THEMES.dark }) {
  const [mounted, setMounted] = useState(false);
  const [cycle, setCycle] = useState(0);
  const skewRef = useRef<HTMLDivElement>(null);
  const phrases = ["scale.", "stream.", "automate.", "think."];

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => (c + 1) % phrases.length), 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!skewRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      skewRef.current.style.transform = `skewX(${x}deg)`;
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const [first, last] = PORTFOLIO_DATA.meta.name.split(" ");
  const anim = (d = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(48px)",
    transition: `opacity 1s ease ${d}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  return (
    <section
      id="hero"
      aria-label="Hero section with introduction"
      role="region"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(2rem, 10vw, 7rem) 1.5rem clamp(2rem, 5vw, 4rem)",
        position: "relative",
        overflow: "hidden",
        background: theme.gradient,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .mobile-hide { display: none !important; }
          .mobile-center { text-align: center !important; }
        }
      `}</style>

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.025,
          backgroundImage: `linear-gradient(${theme.text} 1px,transparent 1px),linear-gradient(90deg,${theme.text} 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent glow - adjusted for mobile */}
      <div
        style={{
          position: "absolute",
          right: "-15%",
          top: "5%",
          width: "70vw",
          height: "70vw",
          background: `radial-gradient(circle,rgba(${theme.accentRgb},0.055) 0%,transparent 68%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-10%",
          bottom: "0%",
          width: "60vw",
          height: "60vw",
          background: `radial-gradient(circle,rgba(${theme.accentRgb},0.025) 0%,transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Status dot */}
        <div
          style={{
            ...anim(0.05),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: theme.accent,
                boxShadow: `0 0 10px ${theme.accent}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                border: `1px solid ${theme.accent}`,
                animation: "ping 2s ease-out infinite",
                opacity: 0,
              }}
            />
            <style>{`@keyframes ping{0%{transform:scale(1);opacity:0.8}100%{transform:scale(2.2);opacity:0}}`}</style>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "clamp(0.5rem, 1.5vw, 0.63rem)",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: theme.accent,
            }}
          >
            Available · {PORTFOLIO_DATA.meta.location}
          </span>
        </div>

        {/* Name */}
        <div style={{ width: "100%", overflow: "visible" }}>
          <h1
            aria-label={`${first} ${last}`}
            style={{
              ...anim(0.18),
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 10vw, 6.5rem)",
              lineHeight: 0.88,
              color: theme.text,
              letterSpacing: "-0.03em",
              display: "block",
              wordBreak: "break-word",
            }}
          >
            {first.toUpperCase()}
          </h1>
        </div>
        <div style={{ marginBottom: "2.5rem", width: "100%", overflow: "visible" }}>
          <div
            ref={skewRef}
            style={{
              ...anim(0.28),
              transition: `transform 0.1s ease, opacity 1s ease 0.28s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.28s`,
            }}
            role="presentation"
          >
            <h1
              aria-hidden="true"
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 10vw, 6.5rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                WebkitTextStroke: `1.5px ${theme.accent}`,
                color: "transparent",
                display: "block",
                wordBreak: "break-word",
              }}
            >
              {last.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ ...anim(0.42), marginBottom: "3rem" }}>
          <p
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(1rem,2.2vw,1.35rem)",
              color: theme.muted,
              maxWidth: 540,
              lineHeight: 1.55,
            }}
          >
            I build systems that{" "}
            <span
              key={cycle}
              style={{
                color: theme.accent,
                borderBottom: `1px solid ${theme.accent}55`,
                paddingBottom: "0.05em",
                animation: "fadeSlide 0.35s ease forwards",
              }}
            >
              {phrases[cycle]}
            </span>
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            ...anim(0.52),
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "5rem",
          }}
        >
          <MagBtn theme={theme} href="#projects" filled>
            View Work ↓
          </MagBtn>
          <MagBtn theme={theme} href="#contact">
            Let&apos;s Talk
          </MagBtn>
          {[
            { l: "GitHub", h: PORTFOLIO_DATA.meta.github },
            { l: "LinkedIn", h: PORTFOLIO_DATA.meta.linkedin },
          ].map((lk) => (
            <a
              key={lk.l}
              href={lk.h}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
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
              ↗ {lk.l}
            </a>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            ...anim(0.62),
            display: "flex",
            gap: "3.5rem",
            flexWrap: "wrap",
            paddingTop: "2rem",
            borderTop: `1px solid ${theme.border}`,
          }}
        >
          {PORTFOLIO_DATA.about.stats.map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "2.2rem",
                  color: theme.accent,
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: theme.muted,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          animation: "bob 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.4em",
            color: theme.muted,
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 32,
            background: `linear-gradient(to bottom,${theme.accent},transparent)`,
          }}
        />
      </div>
    </section>
  );
}
