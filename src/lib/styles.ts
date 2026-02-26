export const getSharedStyles = (theme: any) => ({
  section: {
    padding: "clamp(4rem, 10vw, 10rem) 1.5rem",
    background: theme.bg,
    position: "relative" as const,
  },
  
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    boxSizing: "border-box" as const,
  },

  heading: {
    fontFamily: "'Syne',sans-serif",
    fontWeight: 800,
    color: theme.text,
    lineHeight: 1.1,
  },

  heading1: {
    fontFamily: "'Syne',sans-serif",
    fontWeight: 800,
    fontSize: "clamp(1.8rem, 5vw, 5rem)",
    color: theme.text,
    marginBottom: "clamp(2rem, 5vw, 4rem)",
  },

  heading2: {
    fontFamily: "'Syne',sans-serif",
    fontWeight: 800,
    fontSize: "clamp(1.2rem, 3vw, 1.4rem)",
    color: theme.text,
    marginBottom: "0.25rem",
  },

  muted: {
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: "clamp(0.7rem, 2vw, 0.78rem)",
    color: theme.muted,
    lineHeight: 1.92,
  },

  label: {
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: "0.6rem",
    letterSpacing: "0.3em",
    color: theme.accent,
    textTransform: "uppercase" as const,
    marginBottom: "1rem",
  },

  card: {
    padding: "clamp(1.5rem, 4vw, 3rem)",
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    position: "relative" as const,
    overflow: "hidden" as const,
    transition: "all 0.3s ease",
  },

  button: {
    padding: "0.85rem 2rem",
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: "0.68rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    transition: "all 0.25s ease",
    cursor: "none",
    border: "none",
    fontWeight: 700,
  },
});
