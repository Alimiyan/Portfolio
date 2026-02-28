export const PORTFOLIO_DATA = {
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
      { value: "5+",   label: "Tech Stack"   },
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
    {
      number: "03", title: "Mindly.io — AI Mental Health Companion",
      description: "Built a full-stack mental health companion web app leveraging Google Generative AI (Gemini) with advanced agentic architecture. Features real-time streaming chat, mood tracking, guided breathing exercises, conversation history with session persistence, and intelligent crisis detection using LangGraph state machines.",
      tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Radix UI", "FastAPI", "Python", "Google Generative AI", "LangGraph", "Server-Sent Events/SSE", "CORS Middleware", "Session Management"],
      highlights: ["LangGraph state machine agent with intent classification & crisis detection", "Real-time streaming responses via Server-Sent Events (SSE)", "Conversation memory management (10-turn context window)", "Multi-node agent graph: classify → respond/crisis → END", "Mood tracker with 1-10 scale & sentiment-aware emoji", "4-7-8 breathing technique with cycle tracking", "Streak system with consecutive day tracking", "Dark/Light theme persistence with localStorage", "Responsive design with touch-optimized UI", "Session-based user context via UUID"],
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
