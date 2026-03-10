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
        className="fixed top-4 left-4 z-50 lg:hidden px-3 py-1.5 text-sm
          bg-bg border border-border text-text-secondary rounded-md shadow-sm
          hover:bg-bg-secondary transition-colors cursor-pointer"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-screen w-64 bg-bg border-r border-border
          overflow-y-auto z-40 pt-14 pb-8 px-5 transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="mb-6 pb-4 border-b border-border">
          <a
            href="#"
            className="text-text text-sm font-semibold no-underline hover:text-accent transition-colors"
          >
            Indie Hacker Resources
          </a>
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
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
