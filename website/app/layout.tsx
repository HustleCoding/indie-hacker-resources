import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
