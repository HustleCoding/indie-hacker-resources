import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Indie Hacker Resources",
  description:
    "Curated tool guides for solo developers building SaaS with TypeScript/Next.js. AI APIs, payment processing, billing, and more.",
  openGraph: {
    title: "Indie Hacker Resources",
    description:
      "Curated tool guides for solo developers building SaaS with TypeScript/Next.js.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indie Hacker Resources",
    description:
      "Curated tool guides for solo developers building SaaS with TypeScript/Next.js.",
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
