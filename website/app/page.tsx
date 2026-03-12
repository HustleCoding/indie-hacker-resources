import Link from "next/link";
import SearchDialog from "@/components/SearchDialog";
import SearchTrigger from "@/components/SearchTrigger";
import { getAllGuideTools, getAllGuides, getGuide } from "@/lib/guides";

export default function Home() {
  const guides = getAllGuides().map((meta) => {
    const guide = getGuide(meta.slug);
    const toolCount = guide?.tools.length ?? 0;
    const categoryCount = guide
      ? new Set(guide.tools.map((t) => t.section)).size
      : 0;
    return { ...meta, toolCount, categoryCount };
  });
  const allTools = getAllGuideTools();
  const totalTools = guides.reduce((sum, guide) => sum + guide.toolCount, 0);

  return (
    <div className="min-h-screen bg-bg">
      <SearchDialog tools={allTools} />
      <main className="max-w-3xl mx-auto px-6 py-20 lg:px-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-text">
            Indie Hacker Resources
          </h1>
          <p className="text-text-secondary mt-2 text-base">
            Curated tool guides for solo developers building SaaS with
            TypeScript/Next.js
          </p>
          <div className="mt-5">
            <SearchTrigger
              label="Search all guides, tools, pricing..."
              ariaLabel="Search all guides (Cmd+K)"
            />
          </div>
          <p className="text-text-muted text-sm mt-3">
            {guides.length} guides &middot; {totalTools} tools &middot; updated March 2026
          </p>
        </header>

        <div className="space-y-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block border border-border rounded-lg p-5 hover:border-accent/40 hover:bg-bg-secondary transition-colors no-underline"
            >
              <h2 className="text-lg font-semibold text-text">
                {guide.title}
              </h2>
              <p className="text-text-secondary text-sm mt-1">
                {guide.subtitle}
              </p>
              <p className="text-text-muted text-xs mt-3">
                {guide.toolCount} tools &middot; {guide.categoryCount}{" "}
                categories &middot; {guide.date}
              </p>
            </Link>
          ))}
        </div>

        <footer className="mt-16 pt-6 border-t border-border text-text-muted text-sm">
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
        </footer>
      </main>
    </div>
  );
}
