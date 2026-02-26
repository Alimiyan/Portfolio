"use client";
import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  meta: {
    name: "Alimiyan Shukkoor", initials: "AS",
    title: "Software Engineer", subtitle: "Full-Stack & Cloud-Native Engineer",
    tagline: "I build intelligent systems that scale, stream, and automate.",
    location: "Kochi, India", email: "alimiyan123@gmail.com",
    phone: "+91 9744327192",
    github: "https://github.com/alimiyan",
    linkedin: "https://linkedin.com/in/alimiyan",
  },
  about: {
    statement: "I engineer systems that scale, stream, and think.",
    bio: "Software Engineer with 2+ years of experience building scalable full-stack and cloud-native applications. Specialized in designing RESTful APIs, microservices architectures, and real-time systems using FastAPI, React, and PostgreSQL. Proven track record of delivering production-grade solutions on Azure, implementing CI/CD pipelines, and reducing manual effort through AI-driven automation.",
    stats: [
      { value: "2+",   label: "Years Exp"    },
      { value: "60+",  label: "API Endpoints" },
      { value: "600+", label: "Users Served"  },
      { value: "40%",  label: "Effort Reduced"},
    ],
  },
  experience: [
    {
      role: "Software Engineer", company: "EY GDS",
      period: "May 2024 — Present", location: "Kochi, India",
      bullets: [
        "Owned end-to-end development of full-stack features using FastAPI, React, PostgreSQL, and MS SQL Server, supporting enterprise-level cloud migration initiatives",
        "Architected RESTful APIs and real-time communication layers using WebSockets and Server-Sent Events, enabling live data streaming with sub-second latency",
        "Spearheaded AI-driven automation workflows using Semantic Kernel and Microsoft Agent Framework, reducing manual effort by ~40%",
        "Designed API contracts with FastAPI and Pydantic, ensuring consistent data validation across microservices",
        "Orchestrated database schema evolution and optimization using SQLAlchemy and Alembic, automating CI/CD with GitHub Actions and Azure DevOps",
        "Led technical discussions and code reviews in Agile sprints, maintaining high code quality standards",
      ],
    },
    {
      role: "Software Development Engineer", company: "Oxmics",
      period: "November 2023 — April 2024", location: "Kochi, India",
      bullets: [
        "Developed core bidding platform functionality using React.js and Django, increasing component reusability by ~40%",
        "Built and maintained Django REST APIs and React components within Docker containers, integrated with PostgreSQL",
        "Managed AWS-based deployments and coordinated database migrations, minimizing downtime and deployment errors",
      ],
    },
  ],
  projects: [
    {
      number: "01", title: "AI-Driven Cloud Migration Platform",
      description: "Architected an AI-powered platform that automates cloud resource analysis and generates migration recommendations, significantly reducing manual assessment effort across multiple client projects.",
      tech: ["FastAPI", "Python", "React.js", "Vite", "Semantic Kernel", "Microsoft Agent Framework", "OpenAI APIs", "MS SQL Server", "Cosmos DB", "WebSockets", "SSE", "Azure", "Terraform", "GitHub Actions"],
      highlights: ["Multi-agent orchestration with specialized agents", "Real-time insight streaming with WebSockets/SSE", "Hybrid DB architecture (SQL Server + Cosmos DB)", "Query optimization and async task handling"],
    },
    {
      number: "02", title: "Employee Expertise & Management Platform",
      description: "Designed and built a comprehensive talent management system enabling 600+ employees to log work hours, track skills, certifications, with manager-facing expertise search capabilities.",
      tech: ["React.js", "FastAPI", "PostgreSQL", "Pydantic", "SQLAlchemy", "Alembic", "Azure App Services", "Azure Blob Storage", "Key Vault", "Terraform"],
      highlights: ["60+ API endpoints with Pydantic validation", "Role-based access control", "Advanced skill search & project-tracking", "Azure Blob Storage & Key Vault integration"],
    },
  ],
  skills: [
    { category: "Backend",   level: 92, items: ["FastAPI", "Django", "Flask", "REST APIs", "WebSockets", "SSE", "Pydantic", "Microservices"] },
    { category: "Frontend",  level: 88, items: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "Zustand", "Context API", "Vite"]            },
    { category: "Cloud",     level: 85, items: ["Azure (App Services, ACR, Blob Storage, Key Vault, SQL)", "AWS (S3, EC2, IAM)", "Docker", "Terraform", "GitHub Actions", "CI/CD"]          },
    { category: "Databases", level: 90, items: ["PostgreSQL", "MySQL", "MS SQL Server", "Cosmos DB", "SQLAlchemy", "Alembic"]             },
    { category: "AI/Agents", level: 85, items: ["Semantic Kernel", "Microsoft Agent Framework", "OpenAI APIs"]    },
    { category: "Languages", level: 90, items: ["Python", "JavaScript", "Java"]            },
  ],
  certifications: [
    "AZ-400: Microsoft DevOps Engineer Expert",
    "AZ-104: Azure Administrator Associate",
    "GH-300: GitHub Copilot Certification",
    "HashiCorp Terraform Associate",
    "GCP Associate Cloud Engineer",
    "Microsoft AI-900: Azure AI Fundamentals",
  ],
  awards: [
    { title: "EY Impact Award",           org: "EY GDS",      desc: "Recognized for delivering high-impact contributions to enterprise cloud migration programs." },
    { title: "EY Achiever Extraordinaire Award ×3", org: "EY GDS",     desc: "Honored for exceptional ownership, innovation, and successful execution of AI-driven automation initiatives." },
  ],
  education: [
    { degree: "Bachelor of Technology in Computer Science and Engineering", school: "College of Engineering Munnar", period: "August 2020 — June 2023" },
    { degree: "Diploma in Computer Engineering", school: "Government Polytechnic College Kothamangalam", period: "June 2017 — June 2020" },
  ],
  nav: [
    { label: "About",      href: "#about"      },
    { label: "Experience", href: "#experience" },
    { label: "Projects",   href: "#projects"   },
    { label: "Skills",     href: "#skills"     },
    { label: "Contact",    href: "#contact"    },
  ],
};

// ─── THEMES ───────────────────────────────────────────────────────────────────
const THEMES: Record<string, {
  id:string; label:string; icon:string;
  bg:string; surface:string; border:string;
  text:string; muted:string; accent:string; accent2:string; accentRgb:string;
  nav:string; skillTrack:string; gradient:string;
}> = {
  dark: {
    id:"dark", label:"Dark", icon:"☀️",
    bg:"#0a0a0f", surface:"#111118", border:"rgba(255,255,255,0.07)",
    text:"#f0f0f5", muted:"rgba(240,240,245,0.42)", accent:"#e8ff47", accent2:"#ff6b6b", accentRgb:"232,255,71",
    nav:"rgba(10,10,15,0.88)", skillTrack:"rgba(255,255,255,0.07)",
    gradient:"linear-gradient(160deg,#0a0a0f 0%,#0e0e1a 60%,#0a0a0f 100%)",
  },
  light: {
    id:"light", label:"Light", icon:"🌙",
    bg:"#f4f3ee", surface:"#ffffff", border:"rgba(0,0,0,0.08)",
    text:"#0f0f14", muted:"rgba(15,15,20,0.48)", accent:"#1c1c2e", accent2:"#e63946", accentRgb:"28,28,46",
    nav:"rgba(244,243,238,0.92)", skillTrack:"rgba(0,0,0,0.06)",
    gradient:"linear-gradient(160deg,#f4f3ee 0%,#ece8de 60%,#f4f3ee 100%)",
  },
  cyber: {
    id:"cyber", label:"Cyber", icon:"🔮",
    bg:"#05050e", surface:"#09091e", border:"rgba(0,255,195,0.1)",
    text:"#ddfff7", muted:"rgba(221,255,247,0.4)", accent:"#00ffc3", accent2:"#ff2d78", accentRgb:"0,255,195",
    nav:"rgba(5,5,14,0.92)", skillTrack:"rgba(0,255,195,0.07)",
    gradient:"linear-gradient(160deg,#05050e 0%,#08051a 60%,#05050e 100%)",
  },
  ocean: {
    id:"ocean", label:"Ocean", icon:"🌊",
    bg:"#020c1a", surface:"#041628", border:"rgba(56,189,248,0.1)",
    text:"#e0f4ff", muted:"rgba(224,244,255,0.42)", accent:"#38bdf8", accent2:"#818cf8", accentRgb:"56,189,248",
    nav:"rgba(2,12,26,0.92)", skillTrack:"rgba(56,189,248,0.07)",
    gradient:"linear-gradient(160deg,#020c1a 0%,#031525 60%,#020c1a 100%)",
  },
};

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(ref: React.RefObject<Element | null>, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useMagnet(strength = 0.38) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * strength;
      const dy = (e.clientY - (r.top  + r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px,${dy}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

// ─── CURSOR ───────────────────────────────────────────────────────────────────
function Cursor({ theme }: { theme: typeof THEMES.dark }) {
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
      
      // Add trail
      trails.current.push({ x: lagged.current.x, y: lagged.current.y, age: 0 });
      trails.current = trails.current.filter(t => {
        t.age++;
        return t.age < 20;
      });
      
      // Update particle trails
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
      
      {/* Glow aura */}
      <div style={{ ...base, width:80, height:80, background:`radial-gradient(circle,${theme.accent}33 0%,transparent 70%)`, zIndex:99997, animation:"pulse 3s ease-in-out infinite" }} />
      
      {/* Main dot */}
      <div ref={dot} style={{ ...base, width:8, height:8, background:theme.accent, boxShadow:`0 0 15px ${theme.accent}, 0 0 30px ${theme.accent}77`, zIndex:99999 }} />
      
      {/* Outer ring */}
      <div ref={ring} style={{ ...base, width:32, height:32, border:`2px solid ${theme.accent}44`, zIndex:99998,
        transition:"width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow:`0 0 15px ${theme.accent}44` }} />
      
      {/* Trail particles */}
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

// ─── REVEAL ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay=0, dir="up", style={}, className="" }: {
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

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────────
function MagBtn({ theme, href, children, filled=false, onClick, target }:{
  theme: typeof THEMES.dark; href?: string; children: React.ReactNode;
  filled?: boolean; onClick?: ()=>void; target?: string;
}) {
  const ref = useMagnet(0.3) as React.RefObject<HTMLAnchorElement & HTMLButtonElement>;
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

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function Label({ theme, n, label }: { theme: typeof THEMES.dark; n: number; label: string }) {
  return (
    <Reveal style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.5rem" }}>
      <div style={{ width:36, height:1, background:theme.accent }} />
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.45em", textTransform:"uppercase", color:theme.accent }}>
        {String(n).padStart(2,"0")} / {label}
      </span>
    </Reveal>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ theme }: { theme: typeof THEMES.dark }) {
  const [mounted, setMounted] = useState(false);
  const [cycle,   setCycle]   = useState(0);
  const skewRef = useRef<HTMLDivElement>(null);
  const phrases = ["scale.", "stream.", "automate.", "think."];

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  useEffect(() => {
    const id = setInterval(() => setCycle(c => (c+1) % phrases.length), 2400);
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

  const [first, last] = DATA.meta.name.split(" ");
  const anim = (d = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(48px)",
    transition: `opacity 1s ease ${d}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  return (
    <section style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      padding:"clamp(2rem, 10vw, 7rem) 1.5rem clamp(2rem, 5vw, 4rem)", position:"relative", overflow:"hidden",
      background:theme.gradient,
    }}>
      <style>{`
        @media (max-width: 768px) {
          .mobile-hide { display: none !important; }
          .mobile-center { text-align: center !important; }
        }
      `}</style>
      
      {/* Subtle grid */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.025,
        backgroundImage:`linear-gradient(${theme.text} 1px,transparent 1px),linear-gradient(90deg,${theme.text} 1px,transparent 1px)`,
        backgroundSize:"60px 60px" }} />

      {/* Accent glow - adjusted for mobile */}
      <div style={{ position:"absolute", right:"-15%", top:"5%", width:"70vw", height:"70vw",
        background:`radial-gradient(circle,rgba(${theme.accentRgb},0.055) 0%,transparent 68%)`,
        pointerEvents:"none" }} />
      <div style={{ position:"absolute", left:"-10%", bottom:"0%", width:"60vw", height:"60vw",
        background:`radial-gradient(circle,rgba(${theme.accentRgb},0.025) 0%,transparent 70%)`,
        pointerEvents:"none" }} />

      <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", position:"relative", boxSizing:"border-box" }}>

        {/* Status dot */}
        <div style={{ ...anim(0.05), display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem", marginBottom:"clamp(1.5rem, 3vw, 2.5rem)", flexWrap:"wrap" }}>
          <div style={{ position:"relative" }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:theme.accent, boxShadow:`0 0 10px ${theme.accent}` }} />
            <div style={{ position:"absolute", inset:-3, borderRadius:"50%", border:`1px solid ${theme.accent}`, animation:"ping 2s ease-out infinite", opacity:0 }} />
            <style>{`@keyframes ping{0%{transform:scale(1);opacity:0.8}100%{transform:scale(2.2);opacity:0}}`}</style>
          </div>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.5rem, 1.5vw, 0.63rem)", letterSpacing:"0.45em", textTransform:"uppercase", color:theme.accent }}>
            Available · {DATA.meta.location}
          </span>
        </div>

        {/* Name */}
        <div style={{ overflow:"hidden", width:"100%" }}>
          <h1 style={{ ...anim(0.18), fontFamily:"'Syne',sans-serif", fontWeight:800,
            fontSize:"clamp(3rem, 10vw, 6.5rem)", lineHeight:0.88, color:theme.text,
            letterSpacing:"-0.03em", display:"block", wordBreak:"break-word" }}>
            {first.toUpperCase()}
          </h1>
        </div>
        <div style={{ overflow:"hidden", marginBottom:"2.5rem", width:"100%" }}>
          <div ref={skewRef} style={{ ...anim(0.28), transition:`transform 0.1s ease, opacity 1s ease 0.28s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.28s` }}>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
              fontSize:"clamp(3rem, 10vw, 6.5rem)", lineHeight:0.88, letterSpacing:"-0.03em",
              WebkitTextStroke:`1.5px ${theme.accent}`, color:"transparent", display:"block", wordBreak:"break-word" }}>
              {last.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ ...anim(0.42), marginBottom:"3rem" }}>
          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1rem,2.2vw,1.35rem)", color:theme.muted, maxWidth:540, lineHeight:1.55 }}>
            I build systems that{" "}
            <span key={cycle} style={{ color:theme.accent, borderBottom:`1px solid ${theme.accent}55`,
              paddingBottom:"0.05em", animation:"fadeSlide 0.35s ease forwards" }}>
              {phrases[cycle]}
            </span>
          </p>
        </div>

        {/* CTAs */}
        <div style={{ ...anim(0.52), display:"flex", gap:"1rem", flexWrap:"wrap", alignItems:"center", marginBottom:"5rem" }}>
          <MagBtn theme={theme} href="#projects" filled>View Work ↓</MagBtn>
          <MagBtn theme={theme} href="#contact">Let&apos;s Talk</MagBtn>
          {[{ l:"GitHub", h:DATA.meta.github },{ l:"LinkedIn", h:DATA.meta.linkedin }].map(lk => (
            <a key={lk.l} href={lk.h} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase",
                color:theme.muted, textDecoration:"none", transition:"color 0.2s ease" }}
              onMouseOver={e=>(e.currentTarget as HTMLElement).style.color=theme.text}
              onMouseOut={e=>(e.currentTarget as HTMLElement).style.color=theme.muted}>
              ↗ {lk.l}
            </a>
          ))}
        </div>

        {/* Stats */}
        <div style={{ ...anim(0.62), display:"flex", gap:"3.5rem", flexWrap:"wrap",
          paddingTop:"2rem", borderTop:`1px solid ${theme.border}` }}>
          {DATA.about.stats.map(s => (
            <div key={s.label}>
              <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"2.2rem",
                color:theme.accent, lineHeight:1, marginBottom:"0.3rem" }}>{s.value}</p>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem",
                letterSpacing:"0.25em", textTransform:"uppercase", color:theme.muted }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:"absolute", bottom:"2rem", left:"50%", display:"flex",
        flexDirection:"column", alignItems:"center", gap:"0.4rem", animation:"bob 2s ease-in-out infinite" }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.4em",
          color:theme.muted, textTransform:"uppercase" }}>Scroll</span>
        <div style={{ width:1, height:32, background:`linear-gradient(to bottom,${theme.accent},transparent)` }} />
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <section id="about" style={{ padding:"clamp(4rem, 10vw, 10rem) 1.5rem", background:theme.bg, position:"relative" }}>
      <style>{`
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; }
          .about-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth:1200, margin:"0 auto", boxSizing:"border-box" }}>
        <Label theme={theme} n={1} label="About" />
        <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(2rem, 5vw, 5rem)", alignItems:"center", marginTop:"1rem" }}>
          <div>
            <Reveal delay={0.05}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,3.5vw,3rem)",
                color:theme.text, lineHeight:1.1, marginBottom:"1.75rem" }}>
                {DATA.about.statement.split(" ").map((w, i) => (
                  <span key={i} style={{ color:["scale,","stream,","think."].includes(w) ? theme.accent : theme.text }}>{w} </span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.8rem", color:theme.muted,
                lineHeight:1.95, marginBottom:"2.5rem" }}>{DATA.about.bio}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                <MagBtn theme={theme} href={DATA.meta.github}   target="_blank">↗ GitHub</MagBtn>
                <MagBtn theme={theme} href={DATA.meta.linkedin} target="_blank">↗ LinkedIn</MagBtn>
              </div>
            </Reveal>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px", background:theme.border }}  className="about-stats-grid">
            {DATA.about.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.1}>
                <div style={{ background:theme.surface, padding:"clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 2rem)", transition:"background 0.3s ease" }}
                  onMouseOver={e=>(e.currentTarget as HTMLElement).style.background=`rgba(${theme.accentRgb},0.05)`}
                  onMouseOut={e=>(e.currentTarget as HTMLElement).style.background=theme.surface}>
                  <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 5vw, 3rem)",
                    color:theme.accent, lineHeight:1, marginBottom:"0.5rem" }}>{s.value}</p>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.5rem, 1.2vw, 0.58rem)",
                    letterSpacing:"0.2em", textTransform:"uppercase", color:theme.muted }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience({ theme }: { theme: typeof THEMES.dark }) {
  const [active, setActive] = useState<number|null>(null);
  return (
    <section id="experience" style={{ padding:"clamp(4rem, 10vw, 10rem) 1.5rem", background:theme.surface }}>
      <div style={{ maxWidth:1200, margin:"0 auto", boxSizing:"border-box" }}>
        <Label theme={theme} n={2} label="Experience" />
        <Reveal delay={0.05}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
            fontSize:"clamp(1.8rem, 5vw, 5rem)", color:theme.text, marginBottom:"clamp(2rem, 5vw, 4rem)" }}>
            WHERE I&apos;VE WORKED
          </h2>
        </Reveal>

        {DATA.experience.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.12} dir="left" style={{ marginBottom:"2px" }}>
            <div
              onClick={() => setActive(active === i ? null : i)}
              style={{
                background: active===i ? `rgba(${theme.accentRgb},0.04)` : theme.bg,
                border: `1px solid ${active===i ? `rgba(${theme.accentRgb},0.2)` : theme.border}`,
                padding:"2.5rem 3rem", cursor:"none",
                transition:"all 0.35s ease", position:"relative", overflow:"hidden",
              }}
              onMouseOver={e=>{ if(active!==i)(e.currentTarget as HTMLElement).style.borderColor=`rgba(${theme.accentRgb},0.14)`;}}
              onMouseOut={e=>{ if(active!==i)(e.currentTarget as HTMLElement).style.borderColor=theme.border;}}>

              {/* Left accent bar */}
              <div style={{ position:"absolute", left:0, top:0, bottom:0,
                width: active===i ? 3 : 0, background:theme.accent, transition:"width 0.35s ease" }} />

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"1rem" }}>
                <div>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"clamp(1.1rem, 2.5vw, 1.3rem)",
                    color:theme.text, marginBottom:"0.25rem" }}>{exp.role}</h3>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.65rem, 1.5vw, 0.73rem)", color:theme.accent }}>
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.63rem", color:theme.muted }}>{exp.period}</span>
                  <div style={{ width:22, height:22, borderRadius:"50%", border:`1px solid ${theme.border}`,
                    display:"flex", alignItems:"center", justifyContent:"center", color:theme.muted, fontSize:"0.85rem",
                    transform: active===i ? "rotate(45deg)" : "rotate(0)", transition:"transform 0.3s ease" }}>+</div>
                </div>
              </div>

              {/* Bullets — animated expand */}
              <div style={{ maxHeight: active===i ? "400px" : 0, overflow:"hidden",
                transition:"max-height 0.55s cubic-bezier(0.16,1,0.3,1)" }}>
                <ul style={{ marginTop:"2rem", display:"flex", flexDirection:"column", gap:"0.85rem",
                  paddingLeft:0, listStyle:"none" }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ display:"flex", gap:"0.75rem", alignItems:"flex-start" }}>
                      <span style={{ color:theme.accent, flexShrink:0, marginTop:"0.22rem", fontSize:"0.55rem" }}>◆</span>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.77rem",
                        color:theme.muted, lineHeight:1.82 }}>{b}</span>
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

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ p, i, theme }: { p: typeof DATA.projects[0]; i: number; theme: typeof THEMES.dark }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov]   = useState(false);
  const [rx, setRx]     = useState(0);
  const [ry, setRy]     = useState(0);
  const [gx, setGx]     = useState(50);
  const [gy, setGy]     = useState(50);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    setRx(((e.clientY - r.top)  / r.height - 0.5) * -6);
    setRy(((e.clientX - r.left) / r.width  - 0.5) *  6);
    setGx(((e.clientX - r.left) / r.width)  * 100);
    setGy(((e.clientY - r.top)  / r.height) * 100);
  };

  return (
    <Reveal delay={i * 0.14} style={{ marginBottom:"2px" }}>
      <div ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setRx(0); setRy(0); }}
        style={{
          background: hov
            ? `radial-gradient(circle at ${gx}% ${gy}%,rgba(${theme.accentRgb},0.05) 0%,${theme.surface} 55%)`
            : theme.surface,
          border:`1px solid ${hov ? `rgba(${theme.accentRgb},0.2)` : theme.border}`,
          padding:"clamp(1.5rem, 5vw, 3rem)",
          transform:`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${hov?1.008:1})`,
          transition:"transform 0.2s ease,border-color 0.3s ease,background 0.12s ease",
          transformStyle:"preserve-3d",
        }}>

        <div style={{ display:"flex", gap:"clamp(1.5rem, 4vw, 3rem)", alignItems:"flex-start", flexDirection:"column" }}>
          {/* Big number */}
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
            fontSize:"clamp(2rem, 5vw, 6rem)", lineHeight:1, flexShrink:0,
            WebkitTextStroke:`1px rgba(${theme.accentRgb},${hov?"0.55":"0.2"})`,
            color:"transparent", transition:"all 0.3s ease" }}>
            {p.number}
          </span>

          <div style={{ flex:1, width:"100%" }}>
            {/* Animated underline */}
            <div style={{ height:1, background:`linear-gradient(90deg,${theme.accent},transparent)`,
              marginBottom:"1.25rem", width:hov?"100%":"35%", transition:"width 0.55s ease" }} />

            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"clamp(1.1rem, 3vw, 1.4rem)",
              color:theme.text, marginBottom:"1rem" }}>{p.title}</h3>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.68rem, 2vw, 0.77rem)",
              color:theme.muted, lineHeight:1.88, marginBottom:"1.5rem" }}>{p.description}</p>

            {/* Highlights */}
            <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem", marginBottom:"1.5rem" }}>
              {p.highlights.map(h => (
                <div key={h} style={{ display:"flex", gap:"0.6rem", alignItems:"flex-start" }}>
                  <span style={{ color:theme.accent, fontSize:"0.5rem", marginTop:"0.3rem", flexShrink:0 }}>◈</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.65rem, 1.8vw, 0.72rem)", color:theme.muted }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Tech pills */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
              {p.tech.map(t => (
                <span key={t}
                  style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.55rem, 1.5vw, 0.6rem)",
                    padding:"0.22rem 0.65rem", border:`1px solid rgba(${theme.accentRgb},0.15)`,
                    color:`rgba(${theme.accentRgb},0.65)`, transition:"all 0.2s ease" }}
                  onMouseOver={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=theme.accent; el.style.color=theme.accent; el.style.background=`rgba(${theme.accentRgb},0.06)`; }}
                  onMouseOut={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=`rgba(${theme.accentRgb},0.15)`; el.style.color=`rgba(${theme.accentRgb},0.65)`; el.style.background="transparent"; }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Projects({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <section id="projects" style={{ padding:"clamp(4rem, 10vw, 10rem) 1.5rem", background:theme.bg }}>
      <div style={{ maxWidth:1200, margin:"0 auto", boxSizing:"border-box" }}>
        <Label theme={theme} n={3} label="Projects" />
        <Reveal delay={0.05}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
            fontSize:"clamp(1.8rem, 5vw, 5rem)", color:theme.text, marginBottom:"clamp(2rem, 5vw, 4rem)" }}>
            WHAT I&apos;VE BUILT
          </h2>
        </Reveal>
        {DATA.projects.map((p, i) => <ProjectCard key={p.number} p={p} i={i} theme={theme} />)}
      </div>
    </section>
  );
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────
function SkillBar({ skill, theme, i }: { skill: typeof DATA.skills[0]; theme: typeof THEMES.dark; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3);
  return (
    <div ref={ref} style={{ marginBottom:"2.2rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.6rem" }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:"0.88rem", color:theme.text }}>{skill.category}</span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem", color:theme.accent }}>{skill.level}%</span>
      </div>

      {/* Track */}
      <div style={{ height:2, background:theme.skillTrack, position:"relative", overflow:"hidden", marginBottom:"0.65rem" }}>
        <div style={{
          position:"absolute", left:0, top:0, height:"100%",
          background:`linear-gradient(90deg,${theme.accent},rgba(${theme.accentRgb},0.45))`,
          width: inView ? `${skill.level}%` : "0%",
          transition:`width 1.3s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s`,
          boxShadow:`0 0 8px ${theme.accent}88`,
        }} />
      </div>

      {/* Chips */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
        {skill.items.map(item => (
          <span key={item}
            style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem",
              color:theme.muted, padding:"0.18rem 0.55rem", border:`1px solid ${theme.border}`,
              transition:"all 0.2s ease" }}
            onMouseOver={e=>{ const el=e.currentTarget as HTMLElement; el.style.color=theme.accent; el.style.borderColor=`rgba(${theme.accentRgb},0.4)`; }}
            onMouseOut={e=>{ const el=e.currentTarget as HTMLElement; el.style.color=theme.muted; el.style.borderColor=theme.border; }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <section id="skills" style={{ padding:"clamp(4rem, 10vw, 10rem) 1.5rem", background:theme.surface }}>
      <div style={{ maxWidth:1200, margin:"0 auto", boxSizing:"border-box" }}>
        <Label theme={theme} n={4} label="Skills" />
        <Reveal delay={0.05}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
            fontSize:"clamp(1.8rem, 5vw, 5rem)", color:theme.text, marginBottom:"clamp(2rem, 5vw, 4rem)" }}>
            TECH ARSENAL
          </h2>
        </Reveal>

        <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(1.5rem, 5vw, 5rem) clamp(1.5rem, 5vw, 5rem)" }}>
          {DATA.skills.map((s, i) => (
            <Reveal key={s.category} delay={i * 0.07}>
              <SkillBar skill={s} theme={theme} i={i} />
            </Reveal>
          ))}
        </div>

        {/* Certs */}
        <Reveal delay={0.4} style={{ marginTop:"4rem", paddingTop:"3rem", borderTop:`1px solid ${theme.border}` }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.45em",
            textTransform:"uppercase", color:theme.accent, marginBottom:"1.25rem" }}>Certifications</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.65rem" }}>
            {DATA.certifications.map(c => (
              <div key={c}
                style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.55rem 1rem",
                  border:`1px solid rgba(${theme.accentRgb},0.14)`, transition:"all 0.25s ease" }}
                onMouseOver={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=theme.accent; el.style.background=`rgba(${theme.accentRgb},0.05)`; }}
                onMouseOut={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=`rgba(${theme.accentRgb},0.14)`; el.style.background="transparent"; }}>
                <span style={{ color:theme.accent, fontSize:"0.5rem" }}>✦</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.65rem", color:theme.muted }}>{c}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── AWARDS ───────────────────────────────────────────────────────────────────
function Awards({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <section style={{ padding:"clamp(4rem, 10vw, 8rem) 1.5rem", background:theme.bg }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Label theme={theme} n={5} label="Recognition" />
        <div className="awards-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px", marginTop:"3rem" }}>
          {DATA.awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.12}>
              <div
                style={{ padding:"clamp(1.5rem, 4vw, 3rem)", background:theme.surface, border:`1px solid ${theme.border}`,
                  position:"relative", overflow:"hidden", transition:"all 0.3s ease" }}
                onMouseOver={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=`rgba(${theme.accentRgb},0.22)`; el.style.background=`rgba(${theme.accentRgb},0.03)`; }}
                onMouseOut={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=theme.border; el.style.background=theme.surface; }}>

                {/* BG letters */}
                <div style={{ position:"absolute", top:"1rem", right:"1.5rem", fontFamily:"'Syne',sans-serif",
                  fontSize:"clamp(2rem, 8vw, 4.5rem)", color:`rgba(${theme.accentRgb},0.04)`, lineHeight:1, fontWeight:800,
                  userSelect:"none" }}>EY</div>

                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.3em",
                  color:theme.accent, textTransform:"uppercase", marginBottom:"1rem" }}>🏆 {a.org}</p>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.2rem",
                  color:theme.text, marginBottom:"0.75rem" }}>{a.title}</h3>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.74rem",
                  color:theme.muted, lineHeight:1.8 }}>{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact({ theme }: { theme: typeof THEMES.dark }) {
  const [focused, setFocused] = useState<string|null>(null);
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1600));
    setSending(false); setSent(true);
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    width:"100%", padding:"0.9rem 1.1rem",
    background: focused===name ? `rgba(${theme.accentRgb},0.04)` : theme.bg,
    border:`1px solid ${focused===name ? theme.accent : theme.border}`,
    color:theme.text, fontFamily:"'JetBrains Mono',monospace", fontSize:"0.8rem",
    outline:"none", transition:"all 0.3s ease",
    boxShadow: focused===name ? `0 0 0 3px rgba(${theme.accentRgb},0.08)` : "none",
  });

  return (
    <section id="contact" style={{ padding:"clamp(4rem, 10vw, 10rem) 1.5rem", background:theme.surface, position:"relative", overflow:"hidden" }}>
      {/* Large bg text */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
        pointerEvents:"none", userSelect:"none" }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(3rem, 15vw, 20rem)",
          color:theme.bg, lineHeight:1, opacity:0.7 }}>HELLO</span>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
        <Label theme={theme} n={6} label="Contact" />

        <div className="about-contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(2rem, 5vw, 5rem)", alignItems:"start" }}>
          {/* Left */}
          <Reveal dir="left">
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 4vw, 4.5rem)",
              color:theme.text, lineHeight:1, marginBottom:"1.5rem" }}>
              LET&apos;S<br/>
              <span style={{ WebkitTextStroke:`1.5px ${theme.accent}`, color:"transparent" }}>BUILD IT.</span>
            </h2>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.7rem, 2vw, 0.78rem)", color:theme.muted,
              lineHeight:1.92, marginBottom:"2rem", maxWidth:400 }}>
              Open to senior engineering roles, cloud consulting, and AI product collaborations. Fast responder.
            </p>

            {[
              { icon:"✉", label:"Email",    val:DATA.meta.email,  href:`mailto:${DATA.meta.email}`  },
              { icon:"⌂", label:"Phone",    val:DATA.meta.phone,  href:`tel:${DATA.meta.phone}`     },
              { icon:"↗", label:"GitHub",   val:"github.com/alimiyan",    href:DATA.meta.github    },
              { icon:"↗", label:"LinkedIn", val:"linkedin.com/in/alimiyan",href:DATA.meta.linkedin  },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"0.85rem 1.2rem",
                  border:`1px solid ${theme.border}`, marginBottom:"1px",
                  background:theme.bg, textDecoration:"none", transition:"all 0.25s ease" }}
                onMouseOver={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=theme.accent; el.style.background=`rgba(${theme.accentRgb},0.04)`; }}
                onMouseOut={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=theme.border; el.style.background=theme.bg; }}>
                <span style={{ color:theme.accent, width:20, textAlign:"center" }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.3em",
                    textTransform:"uppercase", color:`rgba(${theme.accentRgb},0.5)` }}>{item.label}</p>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.73rem", color:theme.muted }}>{item.val}</p>
                </div>
                <span style={{ marginLeft:"auto", color:theme.muted, fontSize:"0.7rem" }}>→</span>
              </a>
            ))}
          </Reveal>

          {/* Form */}
          <Reveal delay={0.18} dir="right">
            {sent ? (
              <div style={{ padding:"clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)", border:`1px solid rgba(${theme.accentRgb},0.2)`,
                background:theme.bg, textAlign:"center" }}>
                <div style={{ fontSize:"2.5rem", marginBottom:"1.5rem" }}>✓</div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.2rem, 3vw, 1.5rem)",
                  color:theme.accent, marginBottom:"0.75rem" }}>Message Sent</h3>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.65rem, 1.8vw, 0.73rem)", color:theme.muted }}>
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"0.75rem",
                padding:"clamp(1.5rem, 5vw, 2.5rem)", background:theme.bg, border:`1px solid ${theme.border}` }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
                  {["Name","Email"].map(f => (
                    <div key={f}>
                      <label style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.45rem, 1.2vw, 0.52rem)", letterSpacing:"0.3em",
                        textTransform:"uppercase", color:`rgba(${theme.accentRgb},0.5)`, display:"block", marginBottom:"0.4rem" }}>{f}</label>
                      <input required type={f==="Email"?"email":"text"} style={fieldStyle(f)}
                        onFocus={()=>setFocused(f)} onBlur={()=>setFocused(null)} />
                    </div>
                  ))}
                </div>
                {["Subject","Message"].map(f => (
                  <div key={f}>
                    <label style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.45rem, 1.2vw, 0.52rem)", letterSpacing:"0.3em",
                      textTransform:"uppercase", color:`rgba(${theme.accentRgb},0.5)`, display:"block", marginBottom:"0.4rem" }}>{f}</label>
                    {f==="Message"
                      ? <textarea required rows={5} style={{ ...fieldStyle(f), resize:"none" }}
                          onFocus={()=>setFocused(f)} onBlur={()=>setFocused(null)} />
                      : <input required style={fieldStyle(f)} onFocus={()=>setFocused(f)} onBlur={()=>setFocused(null)} />
                    }
                  </div>
                ))}
                <MagBtn theme={theme} filled onClick={()=>{}}>
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

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ theme }: { theme: typeof THEMES.dark }) {
  return (
    <footer style={{ padding:"2.5rem 2rem", borderTop:`1px solid ${theme.border}`, background:theme.bg }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between",
        alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.15em", color:theme.muted }}>
          © {new Date().getFullYear()} {DATA.meta.name} · {DATA.meta.location}
        </p>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", color:`rgba(${theme.accentRgb},0.3)` }}>
          Press <kbd style={{ border:`1px solid rgba(${theme.accentRgb},0.2)`, padding:"0.1rem 0.35rem",
            fontSize:"0.5rem", borderRadius:2 }}>T</kbd> for terminal
        </p>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", color:theme.muted, opacity:0.35 }}>
          Next.js · TypeScript · Framer Motion
        </p>
      </div>
    </footer>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ theme, themeKey, setTheme }: {
  theme: typeof THEMES.dark; themeKey: string; setTheme: (k:string)=>void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mopen,    setMopen]    = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const cycleTheme = () => {
    const keys = Object.keys(THEMES);
    setTheme(keys[(keys.indexOf(themeKey) + 1) % keys.length]);
  };

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:1000,
      padding: scrolled ? "0.9rem 2rem" : "1.4rem 2rem",
      background: scrolled ? theme.nav : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${theme.border}` : "none",
      transition:"all 0.4s ease", display:"flex", alignItems:"center", justifyContent:"space-between",
    }}>
      <a href="#" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.05rem",
        color:theme.accent, letterSpacing:"0.05em", textDecoration:"none" }}>
        {DATA.meta.initials}<span style={{ color:theme.muted }}>.</span>
      </a>

      {/* Desktop */}
      <div className="hide-mobile" style={{ display:"flex", gap:"2.5rem", alignItems:"center" }}>
        {DATA.nav.map(l => (
          <a key={l.href} href={l.href}
            style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.63rem", letterSpacing:"0.22em",
              textTransform:"uppercase", color:theme.muted, textDecoration:"none", transition:"color 0.2s ease" }}
            onMouseOver={e=>(e.currentTarget as HTMLElement).style.color=theme.text}
            onMouseOut={e=>(e.currentTarget as HTMLElement).style.color=theme.muted}>
            {l.label}
          </a>
        ))}

        {/* Theme cycle button */}
        <button onClick={cycleTheme}
          style={{ background:`rgba(${theme.accentRgb},0.08)`, border:`1px solid rgba(${theme.accentRgb},0.22)`,
            color:theme.accent, padding:"0.38rem 0.85rem", borderRadius:"2rem",
            fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.12em",
            cursor:"none", transition:"all 0.25s ease", display:"flex", alignItems:"center", gap:"0.35rem" }}
          onMouseOver={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=`rgba(${theme.accentRgb},0.15)`; el.style.transform="scale(1.04)"; }}
          onMouseOut={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=`rgba(${theme.accentRgb},0.08)`; el.style.transform="scale(1)"; }}>
          {THEMES[themeKey].icon} {THEMES[themeKey].label}
        </button>

        <a href={`mailto:${DATA.meta.email}`} data-mag
          style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.63rem", letterSpacing:"0.18em",
            textTransform:"uppercase", color:theme.bg, background:theme.accent, padding:"0.5rem 1.2rem",
            textDecoration:"none", transition:"opacity 0.2s ease", fontWeight:700 }}
          onMouseOver={e=>(e.currentTarget as HTMLElement).style.opacity="0.82"}
          onMouseOut={e=>(e.currentTarget as HTMLElement).style.opacity="1"}>
          Hire Me
        </a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={()=>setMopen(o=>!o)} className="hide-desktop"
        style={{ background:"none", border:"none", cursor:"none", display:"flex", flexDirection:"column", gap:"5px", padding:"4px" }}>
        {[mopen?"rotate(45deg) translate(5px,5px)":"",mopen?"scaleX(0)":"",mopen?"rotate(-45deg) translate(5px,-5px)":""].map((t,i)=>(
          <span key={i} style={{ display:"block", width:22, height:1.5, background:theme.text, transition:"all 0.3s ease", transform:t, opacity:i===1&&mopen?0:1 }} />
        ))}
      </button>

      {/* Mobile menu */}
      {mopen && (
        <div style={{ position:"absolute", top:"100%", left:0, right:0, background:theme.bg,
          borderBottom:`1px solid ${theme.border}`, padding:"1.5rem 2rem",
          display:"flex", flexDirection:"column", gap:"1.5rem" }}>
          {DATA.nav.map(l=>(
            <a key={l.href} href={l.href} onClick={()=>setMopen(false)}
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.8rem", letterSpacing:"0.2em",
                textTransform:"uppercase", color:theme.muted, textDecoration:"none" }}>
              {l.label}
            </a>
          ))}
          <button onClick={()=>{cycleTheme();setMopen(false)}}
            style={{ background:"none",border:`1px solid ${theme.border}`,color:theme.accent,
              padding:"0.5rem",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.7rem",
              letterSpacing:"0.15em",cursor:"none",textAlign:"left" }}>
            {THEMES[themeKey].icon} Switch to {THEMES[Object.keys(THEMES)[(Object.keys(THEMES).indexOf(themeKey)+1)%Object.keys(THEMES).length]].label}
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── TERMINAL ─────────────────────────────────────────────────────────────────
const CMDS: Record<string, ()=>string[]> = {
  help:     ()=>['help · projects · skills · contact · whoami · clear · exit'],
  whoami:   ()=>[`${DATA.meta.name} — ${DATA.meta.title}`, `📍 ${DATA.meta.location}`],
  projects: ()=>DATA.projects.map(p=>`[${p.number}] ${p.title}`),
  skills:   ()=>DATA.skills.map(s=>`${s.category.padEnd(12)} ${s.items.join(", ")}`),
  contact:  ()=>[`email    ${DATA.meta.email}`,`github   ${DATA.meta.github}`,`linkedin ${DATA.meta.linkedin}`],
  clear:    ()=>["__CLEAR__"],
  exit:     ()=>["__EXIT__"],
};

type TermLine = { t: "sys"|"in"|"out"|"err"; v: string };

function Terminal({ theme, onClose }: { theme: typeof THEMES.dark; onClose: ()=>void }) {
  const [lines,  setLines]  = useState<TermLine[]>([{ t:"sys", v:`Terminal v1.0 — type "help"` }]);
  const [input,  setInput]  = useState("");
  const [hist,   setHist]   = useState<string[]>([]);
  const [hi,     setHi]     = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inpRef.current?.focus(); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [lines]);

  const run = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    const next: TermLine[] = [...lines, { t:"in", v:`> ${cmd}` }];
    setHist(h => [cmd,...h]); setHi(-1);
    const fn = CMDS[cmd];
    if (fn) {
      const res = fn();
      if (res[0]==="__CLEAR__") { setLines([{ t:"sys", v:"Cleared." }]); setInput(""); return; }
      if (res[0]==="__EXIT__")  { onClose(); return; }
      res.forEach(v => next.push({ t:"out", v }));
    } else {
      next.push({ t:"err", v:`Not found: "${cmd}". Try "help".` });
    }
    setLines(next); setInput("");
  };

  const clr: Record<string,string> = { sys:theme.accent, in:theme.text, out:theme.muted, err:"#ff6b6b" };

  return (
    <div style={{ position:"fixed", bottom:"1.5rem", right:"1.5rem", zIndex:99000,
      width:"min(500px,calc(100vw - 3rem))",
      background:theme.bg, border:`1px solid rgba(${theme.accentRgb},0.25)`,
      boxShadow:`0 0 60px rgba(${theme.accentRgb},0.07)`,
      animation:"slideUp 0.3s cubic-bezier(0.16,1,0.3,1)" }}>

      {/* Title bar */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.65rem 1rem",
        borderBottom:`1px solid ${theme.border}`, background:theme.surface }}>
        {["#ff5f57","#febc2e","#28c840"].map(c=>(
          <div key={c} style={{ width:9, height:9, borderRadius:"50%", background:c, opacity:0.85 }} />
        ))}
        <span style={{ flex:1, textAlign:"center", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem",
          letterSpacing:"0.25em", color:theme.muted }}>TERMINAL</span>
        <button onClick={onClose} style={{ background:"none", border:"none", color:theme.muted, fontSize:"0.7rem", cursor:"none" }}>✕</button>
      </div>

      {/* Output */}
      <div style={{ height:250, overflowY:"auto", padding:"0.75rem 1rem", display:"flex", flexDirection:"column", gap:"0.22rem" }}>
        {lines.map((l,i)=>(
          <div key={i} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem",
            color:clr[l.t], lineHeight:1.6, whiteSpace:"pre" }}>{l.v}</div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input row */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.6rem 1rem",
        borderTop:`1px solid ${theme.border}` }}>
        <span style={{ color:theme.accent, fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem" }}>›</span>
        <input ref={inpRef} value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{
            if(e.key==="Enter")    run();
            if(e.key==="Escape")   onClose();
            if(e.key==="ArrowUp"){ const ni=Math.min(hi+1,hist.length-1); setHi(ni); setInput(hist[ni]||""); }
            if(e.key==="ArrowDown"){ const ni=Math.max(hi-1,-1); setHi(ni); setInput(ni===-1?"":hist[ni]); }
          }}
          style={{ flex:1, background:"transparent", border:"none", outline:"none",
            fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem", color:theme.text, caretColor:theme.accent }}
          autoComplete="off" spellCheck={false} placeholder="type a command…" />
      </div>
    </div>
  );
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────
export function Portfolio() {
  const [themeKey, setThemeKey] = useState("dark");
  const [terminal, setTerminal] = useState(false);
  const theme = THEMES[themeKey];

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key.toLowerCase()==="t" && !["INPUT","TEXTAREA"].includes(tag)) setTerminal(p=>!p);
      if (e.key==="Escape") setTerminal(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <div style={{ background:theme.bg, color:theme.text, minHeight:"100vh",
      transition:"background 0.55s ease, color 0.55s ease" }}>

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; cursor:none !important; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; }
        ::-webkit-scrollbar { width:2px; }
        ::-webkit-scrollbar-track { background:${theme.bg}; }
        ::-webkit-scrollbar-thumb { background:${theme.accent}; }
        @media(max-width:768px){
          .grid-2 { grid-template-columns:1fr !important; gap:2.5rem !important; }
          .hide-mobile { display:none !important; }
        }
        @media(min-width:769px){ .hide-desktop { display:none !important; } }
        @keyframes fadeSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ping{0%{transform:scale(1);opacity:0.8}100%{transform:scale(2.2);opacity:0}}
        @keyframes grain{0%{transform:translate(0,0)}33%{transform:translate(-2px,1px)}66%{transform:translate(1px,-2px)}100%{transform:translate(-1px,1px)}}
      `}</style>

      {/* Film grain */}
      <div style={{ position:"fixed", inset:0, zIndex:9990, pointerEvents:"none", opacity:0.022,
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize:"180px", animation:"grain 0.4s steps(3) infinite" }} />

      <Cursor theme={theme} />
      <Nav theme={theme} themeKey={themeKey} setTheme={setThemeKey} />

      <Hero       theme={theme} />
      <About      theme={theme} />
      <Experience theme={theme} />
      <Projects   theme={theme} />
      <Skills     theme={theme} />
      <Awards     theme={theme} />
      <Contact    theme={theme} />
      <Footer     theme={theme} />

      {terminal && <Terminal theme={theme} onClose={()=>setTerminal(false)} />}

      {/* Theme indicator bottom-left */}
      <div style={{ position:"fixed", bottom:"1.5rem", left:"1.5rem", zIndex:900,
        fontFamily:"'JetBrains Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.25em",
        color:`rgba(${theme.accentRgb},0.3)`, transition:"color 0.5s ease" }}>
        THEME:{themeKey.toUpperCase()}
      </div>
    </div>
  );
}