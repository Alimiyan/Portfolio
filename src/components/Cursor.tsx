"use client";
import { useState, useEffect, useRef } from "react";

export function Cursor({ theme }: { theme: any }) {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const particles = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: -200, y: -200 });
  const lagged = useRef({ x: -200, y: -200 });
  const trails = useRef<Array<{x: number; y: number; age: number}>>([]);
  const isHovering = useRef(false);

  useEffect(() => {
    let raf: number;
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const grow  = () => { 
      isHovering.current = true;
      if (ring.current) { 
        ring.current.style.width="70px"; 
        ring.current.style.height="70px"; 
        ring.current.style.borderColor=theme.accent+"cc";
        ring.current.style.boxShadow=`0 0 30px ${theme.accent}88, inset 0 0 20px ${theme.accent}33`;
      } 
    };
    const shrink= () => { 
      isHovering.current = false;
      if (ring.current) { 
        ring.current.style.width="32px"; 
        ring.current.style.height="32px"; 
        ring.current.style.borderColor=theme.accent+"44";
        ring.current.style.boxShadow=`0 0 15px ${theme.accent}44`;
      } 
    };
    
    const tick  = () => {
      lagged.current.x += (mouse.current.x - lagged.current.x) * 0.1;
      lagged.current.y += (mouse.current.y - lagged.current.y) * 0.1;
      
      if (dot.current) { 
        dot.current.style.left  = `${mouse.current.x}px`; 
        dot.current.style.top  = `${mouse.current.y}px`; 
      }
      if (ring.current) { 
        ring.current.style.left = `${lagged.current.x}px`; 
        ring.current.style.top = `${lagged.current.y}px`; 
      }
      
      trails.current.push({ x: lagged.current.x, y: lagged.current.y, age: 0 });
      trails.current = trails.current.filter(t => {
        t.age++;
        return t.age < 20;
      });
      
      particles.current.forEach((p, i) => {
        if (i < trails.current.length) {
          const trail = trails.current[trails.current.length - 1 - i];
          p.style.left = `${trail.x}px`;
          p.style.top = `${trail.y}px`;
          p.style.opacity = String((1 - trail.age / 20) * 0.6);
        }
      });
      
      raf = requestAnimationFrame(tick);
    };
    const attach = () => {
      document.querySelectorAll("a,button,[data-mag]").forEach(el => {
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); obs.disconnect(); };
  }, [theme.accent]);

  const base: React.CSSProperties = {
    position:"fixed", borderRadius:"50%", pointerEvents:"none",
    transform:"translate(-50%,-50%)", zIndex:99999,
  };
  
  return (
    <>
      <style>{`
        @keyframes pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.2); } }
      `}</style>
      
      <div style={{ ...base, width:80, height:80, background:`radial-gradient(circle,${theme.accent}33 0%,transparent 70%)`, zIndex:99997, animation:"pulse 3s ease-in-out infinite" }} />
      
      <div ref={dot} style={{ ...base, width:8, height:8, background:theme.accent, boxShadow:`0 0 15px ${theme.accent}, 0 0 30px ${theme.accent}77`, zIndex:99999 }} />
      
      <div ref={ring} style={{ ...base, width:32, height:32, border:`2px solid ${theme.accent}44`, zIndex:99998,
        transition:"width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow:`0 0 15px ${theme.accent}44` }} />
      
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) particles.current[i] = el; }}
          style={{ ...base, width:4, height:4, background:theme.accent, borderRadius:"50%", 
            boxShadow:`0 0 8px ${theme.accent}`, opacity:0, zIndex:99996 - i }}
        />
      ))}
    </>
  );
}
