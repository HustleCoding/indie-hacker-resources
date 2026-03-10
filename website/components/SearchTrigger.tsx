"use client";

export default function SearchTrigger() {
  return (
    <button
      className="search-trigger"
      onClick={() => document.dispatchEvent(new CustomEvent("open-search"))}
      aria-label="Search tools (Cmd+K)"
    >
      <svg
        width="15"
        height="15"
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
      <span>Search tools...</span>
      <kbd className="search-trigger-kbd">
        <span aria-hidden="true">&#8984;</span>K
      </kbd>
    </button>
  );
}
