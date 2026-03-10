import fs from "fs";
import path from "path";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import CopyMarkdownButton from "@/components/CopyMarkdownButton";
import { extractTocItems } from "@/lib/toc";

export default function Home() {
  const filePath = path.join(process.cwd(), "content", "ai-llm-api-landscape.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const tocItems = extractTocItems(content);

  return (
    <div className="min-h-screen bg-bg">
      <TableOfContents items={tocItems} />

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
            <div className="flex items-center gap-3 mt-3">
              <p className="text-text-muted text-sm">
                Updated March 2026
              </p>
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
    </div>
  );
}
