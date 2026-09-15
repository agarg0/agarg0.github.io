import type { Metadata } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${pixelify.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
