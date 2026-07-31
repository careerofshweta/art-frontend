import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArtCompete - International Art Championship 2026",
  description: "Art competition platform public website.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
