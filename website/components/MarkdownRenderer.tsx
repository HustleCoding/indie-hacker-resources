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

// ---------------------------------------------------------------------------
// CollapsibleSection — wraps each h2 block
// ---------------------------------------------------------------------------

interface CollapsibleSectionProps {
  headingId: string;
  headingText: string;
  children: React.ReactNode;
}

function CollapsibleSection({
  headingId,
  headingText,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <section className="cat-section" aria-label={headingText}>
      <button
        id={headingId}
        className="flex items-center gap-3 w-full p-4 bg-bg-secondary border-none cursor-pointer text-left font-sans text-base font-semibold text-text tracking-tight hover:bg-bg-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px]"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`${headingId}-body`}
      >
        <span className="flex-1 min-w-0">{headingText}</span>
        <svg
          className="shrink-0 text-text-muted"
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
    <blockquote className="border-l-3 border-border pl-4 text-text-secondary italic my-4">
      {children}
    </blockquote>
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
        return (
          <CollapsibleSection
            key={idx}
            headingId={id}
            headingText={section.headingText}
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
