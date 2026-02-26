"use client";
import { useState, useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { THEMES } from "@/lib/theme-context";

const CMDS: Record<string, () => string[]> = {
  help: () => [
    "help · projects · skills · contact · whoami · clear · exit",
  ],
  whoami: () => [
    `${PORTFOLIO_DATA.meta.name} — ${PORTFOLIO_DATA.meta.title}`,
    `📍 ${PORTFOLIO_DATA.meta.location}`,
  ],
  projects: () =>
    PORTFOLIO_DATA.projects.map((p) => `[${p.number}] ${p.title}`),
  skills: () =>
    PORTFOLIO_DATA.skills.map(
      (s) => `${s.category.padEnd(12)} ${s.items.join(", ")}`
    ),
  contact: () => [
    `email    ${PORTFOLIO_DATA.meta.email}`,
    `github   ${PORTFOLIO_DATA.meta.github}`,
    `linkedin ${PORTFOLIO_DATA.meta.linkedin}`,
  ],
  clear: () => ["__CLEAR__"],
  exit: () => ["__EXIT__"],
};

type TermLine = { t: "sys" | "in" | "out" | "err"; v: string };

export function Terminal({
  theme,
  onClose,
}: {
  theme: typeof THEMES.dark;
  onClose: () => void;
}) {
  const [lines, setLines] = useState<TermLine[]>([
    { t: "sys", v: `Terminal v1.0 — type "help"` },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inpRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    const next: TermLine[] = [...lines, { t: "in", v: `> ${cmd}` }];
    setHist((h) => [cmd, ...h]);
    setHi(-1);
    const fn = CMDS[cmd];
    if (fn) {
      const res = fn();
      if (res[0] === "__CLEAR__") {
        setLines([{ t: "sys", v: "Cleared." }]);
        setInput("");
        return;
      }
      if (res[0] === "__EXIT__") {
        onClose();
        return;
      }
      res.forEach((v) => next.push({ t: "out", v }));
    } else {
      next.push({ t: "err", v: `Not found: "${cmd}". Try "help".` });
    }
    setLines(next);
    setInput("");
  };

  const clr: Record<string, string> = {
    sys: theme.accent,
    in: theme.text,
    out: theme.muted,
    err: "#ff6b6b",
  };

  return (
    <div
      role="dialog"
      aria-label="Command terminal"
      aria-modal="true"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 99000,
        width: "min(500px,calc(100vw - 3rem))",
        background: theme.bg,
        border: `1px solid rgba(${theme.accentRgb},0.25)`,
        boxShadow: `0 0 60px rgba(${theme.accentRgb},0.07)`,
        animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.65rem 1rem",
          borderBottom: `1px solid ${theme.border}`,
          background: theme.surface,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: c,
              opacity: 0.85,
            }}
          />
        ))}
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            color: theme.muted,
          }}
        >
          TERMINAL
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: theme.muted,
            fontSize: "0.7rem",
            cursor: "none",
          }}
        >
          ✕
        </button>
      </div>

      {/* Output */}
      <div
        style={{
          height: 250,
          overflowY: "auto",
          padding: "0.75rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.22rem",
        }}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.68rem",
              color: clr[l.t],
              lineHeight: 1.6,
              whiteSpace: "pre",
            }}
          >
            {l.v}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.6rem 1rem",
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <span
          style={{
            color: theme.accent,
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.68rem",
          }}
        >
          ›
        </span>
        <input
          ref={inpRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowUp") {
              const ni = Math.min(hi + 1, hist.length - 1);
              setHi(ni);
              setInput(hist[ni] || "");
            }
            if (e.key === "ArrowDown") {
              const ni = Math.max(hi - 1, -1);
              setHi(ni);
              setInput(ni === -1 ? "" : hist[ni]);
            }
          }}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.68rem",
            color: theme.text,
            caretColor: theme.accent,
          }}
          autoComplete="off"
          spellCheck={false}
          placeholder="type a command…"
        />
      </div>
    </div>
  );
}
