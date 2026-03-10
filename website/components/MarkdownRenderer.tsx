"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import React from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface ElProps {
  children?: React.ReactNode;
}

function TableCard({ children }: { children: React.ReactNode }) {
  const headers: string[] = [];
  const rows: React.ReactNode[][] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<ElProps>(child)) return;
    const tag = child.type as string;

    if (tag === "thead") {
      React.Children.forEach(child.props.children, (tr) => {
        if (!React.isValidElement<ElProps>(tr)) return;
        React.Children.forEach(tr.props.children, (th) => {
          if (!React.isValidElement<ElProps>(th)) return;
          headers.push(getTextContent(th.props.children));
        });
      });
    }

    if (tag === "tbody") {
      React.Children.forEach(child.props.children, (tr) => {
        if (!React.isValidElement<ElProps>(tr)) return;
        const cells: React.ReactNode[] = [];
        React.Children.forEach(tr.props.children, (td) => {
          if (!React.isValidElement<ElProps>(td)) return;
          cells.push(td.props.children);
        });
        rows.push(cells);
      });
    }
  });

  return (
    <div className="table-cards">
      {rows.map((row, i) => (
        <div key={i} className="table-card">
          {row.map((cell, j) => (
            <div key={j} className={`table-card-field ${j === 0 ? "field-name" : ""}`}>
              {headers[j] && <span className="field-label">{headers[j]}</span>}
              <span className="field-value">{cell}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement<ElProps>(node) && node.props.children) {
    return getTextContent(node.props.children);
  }
  return "";
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
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  table: ({ children }) => <TableCard>{children}</TableCard>,
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
