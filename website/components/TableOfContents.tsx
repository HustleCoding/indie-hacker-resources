"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

export default function TableOfContents({
  items,
}: {
  items: TocItem[];
}) {
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

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden px-3 py-1.5 text-xs border rounded
          bg-terminal-bg border-terminal-border text-terminal-green hover:border-terminal-green
          transition-colors cursor-pointer"
      >
        {isOpen ? "[x] close" : "[=] nav"}
      </button>

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-screen w-64 bg-terminal-bg border-r border-terminal-border
          overflow-y-auto z-40 pt-16 pb-8 px-4 transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="mb-4 pb-3 border-b border-terminal-border">
          <a href="#" className="text-terminal-green text-sm font-bold no-underline hover:text-terminal-amber transition-colors">
            &gt; indie-hacker-resources
          </a>
          <p className="text-terminal-text-dim text-[0.65rem] mt-1">AI & LLM API Landscape</p>
        </div>

        <div className="space-y-0.5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`toc-link w-full text-left cursor-pointer bg-transparent border-none font-[inherit]
                ${item.depth === 3 ? "depth-3" : ""}
                ${activeId === item.id ? "active" : ""}
              `}
            >
              {item.text}
            </button>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-terminal-border">
          <a
            href="https://github.com/HustleCoding/indie-hacker-resources"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-text-dim text-[0.65rem] hover:text-terminal-amber transition-colors no-underline"
          >
            github.com/HustleCoding
          </a>
        </div>
      </nav>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
