"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import React from "react";
import ToolTable from "./ToolTable";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getTextFromChildren).join("");
  if (
    React.isValidElement<{ children?: React.ReactNode }>(children) &&
    children.props.children !== undefined
  ) {
    return getTextFromChildren(children.props.children);
  }
  return "";
}

/** Count tool rows in a raw markdown section (lines matching | **[ pattern) */
function countToolsInSection(rawMarkdown: string): number {
  return (rawMarkdown.match(/\|\s*\*\*\[/g) || []).length;
}

// ---------------------------------------------------------------------------
// Category color mapping — keyed on lowercase substrings of the h2 text
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: [string, string][] = [
  ["llm provider",      "var(--cat-blue)"],
  ["llm orchestration", "var(--cat-purple)"],
  ["orchestration",     "var(--cat-purple)"],
  ["routing",           "var(--cat-purple)"],
  ["embedding",         "var(--cat-teal)"],
  ["vector",            "var(--cat-teal)"],
  ["speech",            "var(--cat-orange)"],
  ["audio",             "var(--cat-orange)"],
  ["image",             "var(--cat-pink)"],
  ["video",             "var(--cat-red)"],
  ["agent",             "var(--cat-indigo)"],
  ["ai-powered",        "var(--cat-green)"],
  ["feature",           "var(--cat-green)"],
  ["stack",             "var(--cat-amber)"],
  ["principle",         "var(--cat-gray)"],
];

function getCategoryColor(heading: string): string {
  const lower = heading.toLowerCase();
  for (const [key, value] of CATEGORY_COLORS) {
    if (lower.includes(key)) return value;
  }
  return "var(--cat-blue)";
}

// ---------------------------------------------------------------------------
// CollapsibleSection — wraps each h2 block
// ---------------------------------------------------------------------------

interface CollapsibleSectionProps {
  headingId: string;
  headingText: string;
  color: string;
  toolCount: number;
  children: React.ReactNode;
}

function CollapsibleSection({
  headingId,
  headingText,
  color,
  toolCount,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <section
      className="cat-section"
      style={{ "--cat-color": color } as React.CSSProperties}
      aria-label={headingText}
    >
      <button
        id={headingId}
        className="cat-section-heading"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`${headingId}-body`}
      >
        <span className="cat-section-dot" aria-hidden="true" />
        <span className="cat-section-title">{headingText}</span>
        {toolCount > 0 && (
          <span className="cat-section-count" aria-label={`${toolCount} tools`}>
            {toolCount}
          </span>
        )}
        <span className="cat-section-toggle" aria-hidden="true">
          {open ? "Hide" : "Show"}
        </span>
        <svg
          className="cat-section-chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        id={`${headingId}-body`}
        className="cat-section-body"
        hidden={!open}
      >
        {children}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Markdown pre-split
// ---------------------------------------------------------------------------

interface RawSection {
  headingText: string;
  rawMarkdown: string;
}

function splitMarkdownBySections(md: string): {
  preamble: string;
  sections: RawSection[];
} {
  const lines = md.split("\n");
  const sections: RawSection[] = [];
  const preambleLines: string[] = [];
  let currentSection: RawSection | null = null;

  for (const line of lines) {
    const h2Match = line.match(/^#{2}\s+(.+)/);
    if (h2Match) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        headingText: h2Match[1].trim(),
        rawMarkdown: "",
      };
    } else if (currentSection) {
      currentSection.rawMarkdown += line + "\n";
    } else {
      preambleLines.push(line);
    }
  }
  if (currentSection) sections.push(currentSection);

  return {
    preamble: preambleLines.join("\n"),
    sections,
  };
}

// ---------------------------------------------------------------------------
// Shared component map passed to every ReactMarkdown instance
// ---------------------------------------------------------------------------

const sharedComponents: Components = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  table: ({ children }) => <ToolTable>{children}</ToolTable>,
  h1: ({ children }) => {
    const id = slugify(getTextFromChildren(children));
    return <h1 id={id}>{children}</h1>;
  },
  h3: ({ children }) => {
    const id = slugify(getTextFromChildren(children));
    return <h3 id={id}>{children}</h3>;
  },
  blockquote: ({ children }) => (
    <blockquote className="md-blockquote">{children}</blockquote>
  ),
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export default function MarkdownRenderer({ content }: { content: string }) {
  const { preamble, sections } = React.useMemo(
    () => splitMarkdownBySections(content),
    [content]
  );

  return (
    <div className="markdown-body">
      {/* Content before the first ## heading */}
      {preamble.trim() && (
        <div className="md-preamble">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={sharedComponents}>
            {preamble}
          </ReactMarkdown>
        </div>
      )}

      {/* One CollapsibleSection per ## heading */}
      {sections.map((section, idx) => {
        const id = slugify(section.headingText);
        const color = getCategoryColor(section.headingText);
        const toolCount = countToolsInSection(section.rawMarkdown);
        return (
          <CollapsibleSection
            key={idx}
            headingId={id}
            headingText={section.headingText}
            color={color}
            toolCount={toolCount}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={sharedComponents}
            >
              {section.rawMarkdown}
            </ReactMarkdown>
          </CollapsibleSection>
        );
      })}
    </div>
  );
}
