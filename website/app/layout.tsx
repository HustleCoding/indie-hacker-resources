import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Indie Hacker Resources — AI & LLM API Landscape",
  description:
    "Comprehensive reference of AI APIs, LLM providers, and tools for solo developers building AI-powered SaaS with TypeScript/Next.js. Updated March 2026.",
  openGraph: {
    title: "Indie Hacker Resources — AI & LLM API Landscape",
    description:
      "Every AI API an indie hacker needs in 2026. LLMs, embeddings, speech, images, agents — pricing, SDKs, and gotchas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & LLM API Landscape for Indie Hackers",
    description:
      "Every AI API you need to build an AI-powered SaaS. Pricing, SDKs, gotchas, and a $15-100/mo starter stack.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
