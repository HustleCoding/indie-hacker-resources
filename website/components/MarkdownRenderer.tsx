"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const components: Components = {
  h1: ({ children }) => {
    const id = slugify(String(children));
    return <h1 id={id}>{children}</h1>;
  },
  h2: ({ children }) => {
    const id = slugify(String(children));
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }) => {
    const id = slugify(String(children));
    return <h3 id={id}>{children}</h3>;
  },
  table: ({ children }) => (
    <div className="table-wrapper">
      <table>{children}</table>
    </div>
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
