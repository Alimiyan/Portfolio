import React, { createContext, useContext, ReactNode } from "react";

export const THEMES = {
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

type ThemeKey = keyof typeof THEMES;
export type { ThemeKey };

interface ThemeContextType {
  theme: typeof THEMES.dark;
  themeKey: ThemeKey;
  setTheme: (key: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme = "dark" }: { children: ReactNode; initialTheme?: ThemeKey }) {
  const [themeKey, setTheme] = React.useState<ThemeKey>(initialTheme);
  const theme = THEMES[themeKey];

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
