"use client";

interface SearchTriggerProps {
  label?: string;
  ariaLabel?: string;
}

export default function SearchTrigger({
  label = "Search tools...",
  ariaLabel = "Search tools (Cmd+K)",
}: SearchTriggerProps) {
  return (
    <button
      className="flex items-center gap-2 w-full max-w-[380px] py-2.5 px-3.5 bg-bg border border-border rounded-xl cursor-pointer font-sans text-sm text-text-muted hover:border-[#c9cdd4] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      onClick={() => document.dispatchEvent(new CustomEvent("open-search"))}
      aria-label={ariaLabel}
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
      <span className="flex-1 text-left">{label}</span>
      <kbd className="text-[0.7rem] font-medium px-2 py-0.5 bg-bg-secondary border border-border rounded-md font-sans text-text-muted leading-tight">
        <span aria-hidden="true">&#8984;</span>K
      </kbd>
    </button>
  );
}
