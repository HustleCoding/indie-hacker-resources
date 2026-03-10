import fs from "fs";
import path from "path";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import { extractTocItems } from "@/lib/toc";

export default function Home() {
  const filePath = path.join(process.cwd(), "content", "ai-llm-api-landscape.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const tocItems = extractTocItems(content);

  return (
    <div className="min-h-screen bg-terminal-bg">
      <TableOfContents items={tocItems} />

      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12">
          {/* Header */}
          <header className="mb-8 pb-6 border-b border-terminal-border">
            <p className="text-terminal-green-dim text-xs mb-2">
              $ cat ai-llm-api-landscape.md
            </p>
            <h1 className="text-2xl font-bold text-terminal-green mb-2" style={{ textShadow: "0 0 10px #33ff3322" }}>
              AI & LLM API Landscape
            </h1>
            <p className="text-terminal-text-dim text-sm">
              for indie hackers building with TypeScript/Next.js — March 2026
            </p>
          </header>

          {/* Content */}
          <MarkdownRenderer content={content} />

          {/* Footer */}
          <footer className="mt-16 pt-6 border-t border-terminal-border text-terminal-text-dim text-xs">
            <p>
              MIT License &middot;{" "}
              <a
                href="https://github.com/HustleCoding/indie-hacker-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-amber-dim hover:text-terminal-amber transition-colors no-underline"
              >
                github.com/HustleCoding/indie-hacker-resources
              </a>
            </p>
            <p className="mt-1 text-terminal-text-dim opacity-50">
              Last updated: March 2026. Prices change frequently.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
