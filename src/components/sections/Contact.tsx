"use client";
import { useState } from "react";
import { Reveal, Label, MagBtn } from "../CommonComponents";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES } from "@/lib/theme-context";

export function Contact({ theme }: { theme: typeof THEMES.dark }) {
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSending(false);
    setSent(true);
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "0.9rem 1.1rem",
    background:
      focused === name ? `rgba(${theme.accentRgb},0.04)` : theme.bg,
    border: `1px solid ${focused === name ? theme.accent : theme.border}`,
    color: theme.text,
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: "0.8rem",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: focused === name ? `0 0 0 3px rgba(${theme.accentRgb},0.08)` : "none",
  });

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(4rem, 10vw, 10rem) 1.5rem",
        background: theme.surface,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large bg text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 15vw, 20rem)",
            color: theme.bg,
            lineHeight: 1,
            opacity: 0.7,
          }}
        >
          HELLO
        </span>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <Label theme={theme} n={6} label="Contact" />

        <div
          className="about-contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <Reveal dir="left">
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 4.5rem)",
                color: theme.text,
                lineHeight: 1,
                marginBottom: "1.5rem",
              }}
            >
              LET&apos;S<br />
              <span
                style={{
                  WebkitTextStroke: `1.5px ${theme.accent}`,
                  color: "transparent",
                }}
              >
                BUILD IT.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "clamp(0.7rem, 2vw, 0.78rem)",
                color: theme.muted,
                lineHeight: 1.92,
                marginBottom: "2rem",
                maxWidth: 400,
              }}
            >
              Open to senior engineering roles, cloud consulting, and AI product
              collaborations. Fast responder.
            </p>

            {[
              {
                icon: "✉",
                label: "Email",
                val: PORTFOLIO_DATA.meta.email,
                href: `mailto:${PORTFOLIO_DATA.meta.email}`,
              },
              {
                icon: "⌂",
                label: "Phone",
                val: PORTFOLIO_DATA.meta.phone,
                href: `tel:${PORTFOLIO_DATA.meta.phone}`,
              },
              {
                icon: "↗",
                label: "GitHub",
                val: "github.com/alimiyan",
                href: PORTFOLIO_DATA.meta.github,
              },
              {
                icon: "↗",
                label: "LinkedIn",
                val: "linkedin.com/in/alimiyan",
                href: PORTFOLIO_DATA.meta.linkedin,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.85rem 1.2rem",
                  border: `1px solid ${theme.border}`,
                  marginBottom: "1px",
                  background: theme.bg,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = theme.accent;
                  el.style.background = `rgba(${theme.accentRgb},0.04)`;
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = theme.border;
                  el.style.background = theme.bg;
                }}
              >
                <span
                  style={{
                    color: theme.accent,
                    width: 20,
                    textAlign: "center",
                  }}
                >
                  {item.icon}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "0.52rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: `rgba(${theme.accentRgb},0.5)`,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "0.73rem",
                      color: theme.muted,
                    }}
                  >
                    {item.val}
                  </p>
                </div>
                <span
                  style={{
                    marginLeft: "auto",
                    color: theme.muted,
                    fontSize: "0.7rem",
                  }}
                >
                  →
                </span>
              </a>
            ))}
          </Reveal>

          {/* Form */}
          <Reveal delay={0.18} dir="right">
            {sent ? (
              <div
                style={{
                  padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)",
                  border: `1px solid rgba(${theme.accentRgb},0.2)`,
                  background: theme.bg,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                    color: theme.accent,
                    marginBottom: "0.75rem",
                  }}
                >
                  Message Sent
                </h3>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "clamp(0.65rem, 1.8vw, 0.73rem)",
                    color: theme.muted,
                  }}
                >
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  padding: "clamp(1.5rem, 5vw, 2.5rem)",
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {["Name", "Email"].map((f) => (
                    <div key={f}>
                      <label
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: "clamp(0.45rem, 1.2vw, 0.52rem)",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: `rgba(${theme.accentRgb},0.5)`,
                          display: "block",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {f}
                      </label>
                      <input
                        required
                        type={f === "Email" ? "email" : "text"}
                        style={fieldStyle(f)}
                        onFocus={() => setFocused(f)}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  ))}
                </div>
                {["Subject", "Message"].map((f) => (
                  <div key={f}>
                    <label
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: "clamp(0.45rem, 1.2vw, 0.52rem)",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: `rgba(${theme.accentRgb},0.5)`,
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {f}
                    </label>
                    {f === "Message" ? (
                      <textarea
                        required
                        rows={5}
                        style={{
                          ...fieldStyle(f),
                          resize: "none",
                        }}
                        onFocus={() => setFocused(f)}
                        onBlur={() => setFocused(null)}
                      />
                    ) : (
                      <input
                        required
                        style={fieldStyle(f)}
                        onFocus={() => setFocused(f)}
                        onBlur={() => setFocused(null)}
                      />
                    )}
                  </div>
                ))}
                <MagBtn theme={theme} filled onClick={() => {}}>
                  {sending ? "Sending..." : "Send Message →"}
                </MagBtn>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
