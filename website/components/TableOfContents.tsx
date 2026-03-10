"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
  sectionCounts: Record<string, number>;
}

export default function TableOfContents({
  items,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openSearch = () => {
    setIsOpen(false);
    document.dispatchEvent(new CustomEvent("open-search"));
  };

  return (
    <>
      {/* Mobile buttons */}
      <div className="fixed top-4 left-4 z-50 lg:hidden flex gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-9 h-9 bg-bg border border-border rounded-lg text-text-secondary cursor-pointer shadow-sm hover:bg-bg-secondary hover:border-[#c9cdd4]"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
        <button
          onClick={openSearch}
          className="flex items-center justify-center w-9 h-9 bg-bg border border-border rounded-lg text-text-secondary cursor-pointer shadow-sm hover:bg-bg-secondary hover:border-[#c9cdd4]"
          aria-label="Search"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-screen w-64 bg-bg border-r border-border
          overflow-y-auto z-40 pt-14 pb-8 px-5 transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
        aria-label="Table of contents"
      >
        <div className="mb-5 pb-4 border-b border-border">
          <a
            href="#"
            className="text-text text-sm font-semibold no-underline hover:text-accent transition-colors"
          >
            Indie Hacker Resources
          </a>
        </div>

        {/* Sidebar search shortcut */}
        <button
          onClick={openSearch}
          className="flex items-center gap-2 w-full py-2 px-2.5 bg-bg-secondary border border-border rounded-lg cursor-pointer font-sans text-xs text-text-muted hover:border-[#c9cdd4] hover:bg-bg-hover"
          aria-label="Search tools"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="flex-1 text-left">Search...</span>
          <kbd className="text-[0.65rem] font-medium px-1.5 py-0.5 bg-bg border border-border rounded font-sans text-text-muted">&#8984;K</kbd>
        </button>

        <div className="space-y-0.5 mt-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`toc-link w-full text-left cursor-pointer bg-transparent border-none font-[inherit]
                ${item.depth === 3 ? "depth-3" : ""}
                ${activeId === item.id ? "active" : ""}
              `}
            >
              <span className="toc-link-text">{item.text}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-border">
          <a
            href="https://github.com/HustleCoding/indie-hacker-resources"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted text-xs hover:text-accent transition-colors no-underline"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
