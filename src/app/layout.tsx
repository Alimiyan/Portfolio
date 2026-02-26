import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alimiyan Shukkoor — Full-Stack & Cloud-Native Engineer",
  description: "Software Engineer building intelligent systems at the intersection of cloud, real-time APIs, and AI automation.",
  openGraph: {
    title: "Alimiyan Shukkoor",
    description: "Full-Stack · Cloud-Native · AI Automation",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}