import fs from "fs";
import path from "path";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import CopyMarkdownButton from "@/components/CopyMarkdownButton";
import SearchDialog from "@/components/SearchDialog";
import SearchTrigger from "@/components/SearchTrigger";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { extractTocItems } from "@/lib/toc";
import { extractTools, extractSectionCounts } from "@/lib/tools";

export default function Home() {
  const filePath = path.join(process.cwd(), "content", "ai-llm-api-landscape.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const tocItems = extractTocItems(content);
  const tools = extractTools(content);
  const sectionCounts = extractSectionCounts(content);

  const categoryCount = new Set(tools.map((t) => t.section)).size;

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />
      <SearchDialog tools={tools} />
      <TableOfContents items={tocItems} sectionCounts={sectionCounts} />

      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:px-10">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-text">
              AI & LLM API Landscape
            </h1>
            <p className="text-text-secondary mt-2 text-base">
              A reference for indie hackers building with TypeScript/Next.js
            </p>

            {/* Search bar */}
            <div className="mt-5">
              <SearchTrigger />
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4">
              <span className="stat-chip">
                <strong>{tools.length}</strong>&nbsp;Tools
              </span>
              <span className="stat-chip">
                <strong>{categoryCount}</strong>&nbsp;Categories
              </span>
              <span className="text-text-muted text-sm">
                Updated March 2026
              </span>
              <CopyMarkdownButton content={content} />
            </div>
          </header>

          {/* Content */}
          <MarkdownRenderer content={content} />

          {/* Footer */}
          <footer className="mt-20 pt-6 border-t border-border text-text-muted text-sm">
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
        </div>
      </main>

      <BackToTop />
    </div>
  );
}
