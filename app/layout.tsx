import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melvin Petit ~ Technicien Cloud Junior",
  description:
    "Portfolio de Melvin Petit — Technicien Cloud Junior spécialisé dans l'automatisation d'infrastructure et les solutions Cloud. Passionné par le scripting et l'intégration continue.",
};

export const viewport: Viewport = {
  themeColor: "#f5f4f0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased min-h-dvh overflow-x-hidden text-base sm:text-lg">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
