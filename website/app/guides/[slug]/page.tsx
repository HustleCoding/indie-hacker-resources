import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import CopyMarkdownButton from "@/components/CopyMarkdownButton";
import SearchDialog from "@/components/SearchDialog";
import SearchTrigger from "@/components/SearchTrigger";
import { getAllGuides, getGuide } from "@/lib/guides";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: `${guide.title} — Indie Hacker Resources`,
    description: `${guide.subtitle}. ${guide.tools.length} tools across ${new Set(guide.tools.map((t) => t.section)).size} categories. Updated ${guide.date}.`,
    openGraph: {
      title: `${guide.title} — Indie Hacker Resources`,
      description: guide.subtitle,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.subtitle,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const categoryCount = new Set(guide.tools.map((t) => t.section)).size;

  return (
    <div className="min-h-screen bg-bg">
      <SearchDialog tools={guide.tools} />
      <TableOfContents items={guide.tocItems} sectionCounts={guide.sectionCounts} />

      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:px-10">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-text">
              {guide.title}
            </h1>
            <p className="text-text-secondary mt-2 text-base">
              {guide.subtitle}
            </p>

            {/* Search bar */}
            <div className="mt-5">
              <SearchTrigger />
            </div>

            <p className="text-sm text-text-muted mt-3">
              {guide.tools.length} tools &middot; {categoryCount} categories &middot; {guide.date}
            </p>
          </header>

          {/* Content */}
          <MarkdownRenderer content={guide.content} />

          {/* Footer */}
          <footer className="mt-20 pt-6 border-t border-border text-text-muted text-sm flex items-center justify-between">
            <p>
              MIT License &middot;{" "}
              <a
                href="https://github.com/HustleCoding/indie-hacker-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                View on GitHub
              </a>
            </p>
            <CopyMarkdownButton content={guide.content} />
          </footer>
        </div>
      </main>
    </div>
  );
}
