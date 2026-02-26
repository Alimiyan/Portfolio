"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks";

export function Reveal({ children, delay=0, dir="up", style={}, className="" }: {
  children: React.ReactNode; delay?: number; dir?: "up"|"down"|"left"|"right"; style?: React.CSSProperties; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const init: Record<string,string> = { up:"translateY(40px)", down:"translateY(-40px)", left:"translateX(-44px)", right:"translateX(44px)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translate(0)" : init[dir],
      transition: `opacity 0.85s ease ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export function Label({ theme, n, label }: { theme: any; n: number; label: string }) {
  return (
    <Reveal style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.5rem" }}>
      <div style={{ width:36, height:1, background:theme.accent }} />
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.45em", textTransform:"uppercase", color:theme.accent }}>
        {String(n).padStart(2,"0")} / {label}
      </span>
    </Reveal>
  );
}

export function MagBtn({ theme, href, children, filled=false, onClick, target }:{
  theme: any; href?: string; children: React.ReactNode;
  filled?: boolean; onClick?: ()=>void; target?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const s: React.CSSProperties = {
    display:"inline-block", padding:"0.85rem 2rem",
    fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem",
    letterSpacing:"0.2em", textTransform:"uppercase", textDecoration:"none",
    transition:"all 0.25s ease", cursor:"none", border:"none",
    fontWeight: filled ? 700 : 400,
    ...(filled
      ? { background:theme.accent, color:theme.bg }
      : { background:"transparent", color:theme.text, border:`1px solid ${theme.border}` }),
  };
  const hov = filled
    ? { opacity:"0.85", transform:"translateY(-1px)" }
    : { borderColor:theme.accent, color:theme.accent };

  if (onClick) return (
    <button ref={ref} data-mag onClick={onClick} style={s}
      onMouseOver={e=>Object.assign(e.currentTarget.style,hov)}
      onMouseOut={e=>Object.assign(e.currentTarget.style,s)}>
      {children}
    </button>
  );
  return (
    <a ref={ref} data-mag href={href} target={target} rel={target==="_blank"?"noopener noreferrer":undefined} style={s}
      onMouseOver={e=>Object.assign(e.currentTarget.style,hov)}
      onMouseOut={e=>Object.assign(e.currentTarget.style,s)}>
      {children}
    </a>
  );
}
