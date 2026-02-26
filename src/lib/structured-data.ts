import { PORTFOLIO_DATA } from "./portfolio-data";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PORTFOLIO_DATA.meta.name,
    jobTitle: PORTFOLIO_DATA.meta.title,
    description: PORTFOLIO_DATA.about.bio,
    url: "https://alimiyan.dev",
    email: PORTFOLIO_DATA.meta.email,
    telephone: PORTFOLIO_DATA.meta.phone,
    sameAs: [PORTFOLIO_DATA.meta.github, PORTFOLIO_DATA.meta.linkedin],
    knowsAbout: PORTFOLIO_DATA.skills.flatMap((s) => s.items),
    worksFor: {
      "@type": "Organization",
      name: "EY GDS",
    },
    homeLocation: {
      "@type": "Place",
      name: PORTFOLIO_DATA.meta.location,
    },
  };
}

export function generateProjectSchema(projectIndex: number) {
  const project = PORTFOLIO_DATA.projects[projectIndex];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: PORTFOLIO_DATA.meta.name,
    },
    applicationCategory: "DeveloperApplication",
    keywords: project.tech.join(", "),
  };
}

export function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: PORTFOLIO_DATA.nav.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://alimiyan.dev${item.href}`,
    })),
  };
}

export function generateEducationSchema() {
  return PORTFOLIO_DATA.education.map((edu) => ({
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: edu.degree,
    provider: {
      "@type": "Organization",
      name: edu.school,
    },
    startDate: edu.period.split(" — ")[0],
    endDate: edu.period.split(" — ")[1],
  }));
}

export function getAllStructuredData() {
  return {
    person: generatePersonSchema(),
    projects: PORTFOLIO_DATA.projects.map((_, index) => generateProjectSchema(index)),
    breadcrumb: generateBreadcrumbSchema(),
    education: generateEducationSchema(),
  };
}
