import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${pressStart.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
