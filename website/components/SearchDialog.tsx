"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ToolEntry } from "@/lib/tools";

interface SearchDialogProps {
  tools: ToolEntry[];
}

export default function SearchDialog({ tools }: SearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? tools.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.section.toLowerCase().includes(q) ||
          t.bestFor.toLowerCase().includes(q)
        );
      })
    : tools;

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const navigateToTool = useCallback(
    (tool: ToolEntry) => {
      close();
      const el = document.getElementById(tool.sectionId);
      if (el) {
        if (el.getAttribute("aria-expanded") === "false") {
          el.click();
        }
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    },
    [close]
  );

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
  }, [isOpen, open, close]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      navigateToTool(filtered[selectedIndex]);
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.children[selectedIndex] as HTMLElement;
      selected?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

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
            placeholder="Search tools, providers, features..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
                key={`${tool.name}-${tool.section}`}
                className={`search-result ${i === selectedIndex ? "search-result-active" : ""}`}
                onClick={() => navigateToTool(tool)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="search-result-left">
                  <span className="search-result-name">{tool.name}</span>
                </div>
                <span className="search-result-section">{tool.section}</span>
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
