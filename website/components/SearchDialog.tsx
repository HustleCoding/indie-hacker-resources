"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { ToolEntry } from "@/lib/tools";
import { usePathname } from "next/navigation";

interface SearchDialogProps {
  tools: ToolEntry[];
}

export default function SearchDialog({ tools }: SearchDialogProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter((tool) => tool.searchText.includes(q));
  }, [query, tools]);

  const selectedItem =
    filtered.length === 0
      ? null
      : filtered[Math.min(selectedIndex, filtered.length - 1)];

  const open = () => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  };

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  const navigateToTool = (tool: ToolEntry) => {
    close();
    const targetPath = `/guides/${tool.guideSlug}`;

    if (pathname !== targetPath) {
      window.location.href = `${targetPath}#${tool.sectionId}`;
      return;
    }

    const el = document.getElementById(tool.sectionId);
    if (!el) return;
    if (el.getAttribute("aria-expanded") === "false") {
      el.click();
    }
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    function handleOpenSearch() {
      if (isOpen) close();
      else open();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpenSearch();
      }
      if (e.key === "Escape" && isOpen) {
        close();
      }
    }

    document.addEventListener("open-search", handleOpenSearch);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("open-search", handleOpenSearch);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, pathname]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && selectedItem) {
      e.preventDefault();
      navigateToTool(selectedItem);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.children[
        Math.min(selectedIndex, Math.max(filtered.length - 1, 0))
      ] as HTMLElement;
      selected?.scrollIntoView({ block: "nearest" });
    }
  }, [filtered.length, selectedIndex]);

  if (!isOpen) return null;

  return (
    <>
      <div className="search-backdrop" onClick={close} aria-hidden="true" />
      <div
        className="search-dialog"
        role="dialog"
        aria-label="Search tools"
        aria-modal="true"
      >
        <div className="search-input-wrapper">
          <svg
            className="search-input-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search guides, tools, pricing, features..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            aria-label="Search"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="text-[0.65rem] font-medium px-1.5 py-0.5 bg-bg-secondary border border-border rounded font-sans text-text-muted shrink-0">esc</kbd>
        </div>

        <div className="search-results" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="search-empty">
              No tools found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((tool, i) => (
              <button
                key={`${tool.guideSlug}-${tool.section}-${tool.name}`}
                className={`search-result ${selectedItem === tool ? "search-result-active" : ""}`}
                onClick={() => navigateToTool(tool)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="search-result-left">
                  <span className="search-result-name">{tool.name}</span>
                  <span className="search-result-section">
                    {tool.guideTitle} · {tool.section}
                  </span>
                </div>
                <span className="search-result-section">{tool.bestFor}</span>
              </button>
            ))
          )}
        </div>

        <div className="search-footer" aria-hidden="true">
          <span>
            <kbd>&uarr;&darr;</kbd> navigate
          </span>
          <span>
            <kbd>&crarr;</kbd> go to section
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </>
  );
}
