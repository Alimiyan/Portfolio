"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks";

export function Reveal({
  children,
  delay = 0,
  dir = "up",
  style = {},
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  dir?: "up" | "down" | "left" | "right";
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const init: Record<string, string> = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(-44px)",
    right: "translateX(44px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0)" : init[dir],
        transition: `opacity 0.85s ease ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Label({
  theme,
  n,
  label,
}: {
  theme: any;
  n: number;
  label: string;
}) {
  return (
    <Reveal
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <div style={{ width: 36, height: 1, background: theme.accent }} />
      <span
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: theme.accent,
        }}
      >
        {String(n).padStart(2, "0")} / {label}
      </span>
    </Reveal>
  );
}

type MagBtnProps = {
  theme: any;
  href?: string;
  children: React.ReactNode;
  filled?: boolean;
  target?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function MagBtn({
  theme,
  href,
  children,
  filled = false,
  target,
  type = "button",
  ...buttonProps
}: MagBtnProps) {
  const ref = useRef<any>(null);

  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "0.85rem 2rem",
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: "0.68rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "all 0.25s ease",
    cursor: "pointer",
    fontWeight: filled ? 700 : 400,
    border: filled ? "none" : `1px solid ${theme.border}`,
    background: filled ? theme.accent : "transparent",
    color: filled ? theme.bg : theme.text,
  };

  const hoverStyle = filled
    ? { opacity: "0.85", transform: "translateY(-1px)" }
    : { borderColor: theme.accent, color: theme.accent };

  // 🔗 If href exists → render anchor
  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        style={baseStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, baseStyle)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      {...buttonProps}
      style={baseStyle}
      onMouseOver={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseOut={(e) => Object.assign(e.currentTarget.style, baseStyle)}
    >
      {children}
    </button>
  );
}
