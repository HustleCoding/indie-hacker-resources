"use client";

import React, { useState } from "react";

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children) {
    return getTextContent(node.props.children);
  }
  return "";
}

/** Detect whether a cell value signals a free tier. */
function isFreeTier(text: string): boolean {
  const lower = text.toLowerCase();
  if (lower === "none" || lower === "-" || lower === "no") return false;
  return (
    lower.includes("free") ||
    lower.includes("open source") ||
    lower.includes("trial") ||
    lower.includes("credits")
  );
}

/** Detect whether the cell is a "None / no free tier" value. */
function isNoFreeTier(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return lower === "none" || lower === "no" || lower === "-";
}

// ---------------------------------------------------------------------------
// Sub-components: badges, chips, icons
// ---------------------------------------------------------------------------

function FreeTierBadge({ text }: { text: string }) {
  const plain = text.trim();
  if (isFreeTier(plain)) {
    return (
      <span
        className="tool-badge tool-badge-free"
        title={plain}
        aria-label={`Free tier: ${plain}`}
      >
        <CheckIcon />
        {plain.length > 28 ? plain.slice(0, 26) + "…" : plain}
      </span>
    );
  }
  if (isNoFreeTier(plain)) {
    return (
      <span className="tool-badge tool-badge-paid" aria-label="No free tier">
        <CrossIcon />
        Paid only
      </span>
    );
  }
  // Partial / limited
  return (
    <span className="tool-badge tool-badge-limited" aria-label={`Limited: ${plain}`}>
      <DotIcon />
      {plain.length > 28 ? plain.slice(0, 26) + "…" : plain}
    </span>
  );
}

/**
 * Parse a price string and color-code it.
 * - free / $0 → green
 * - < $1/MTok → yellow-green
 * - $1-10 → amber
 * - > $10 → red
 */
function PriceDisplay({ children }: { children: React.ReactNode }) {
  const text = getTextContent(children).toLowerCase();
  const hasFreeModel =
    text.includes("free") || text.includes("open source") || text === "-";

  // Pull the first dollar amount found for color hinting
  const amounts = text.match(/\$[\d.]+/g) ?? [];
  const firstRawAmount: string | undefined = amounts[0];
  const firstAmount: number | null =
    firstRawAmount !== undefined ? parseFloat(firstRawAmount.replace("$", "")) : null;

  let colorClass = "text-text-secondary";
  if (hasFreeModel) colorClass = "price-free";
  else if (firstAmount !== null && firstAmount < 1) colorClass = "price-cheap";
  else if (firstAmount !== null && firstAmount < 10) colorClass = "price-mid";
  else if (firstAmount !== null && firstAmount >= 10) colorClass = "price-expensive";

  return <span className={`price-display ${colorClass}`}>{children}</span>;
}

function SdkChip({ children }: { children: React.ReactNode }) {
  const text = getTextContent(children).trim();
  // Strip surrounding backticks from markdown code spans that remark already resolved
  const label = text.replace(/^`|`$/g, "");
  const isOpenAICompat = label.toLowerCase().includes("openai-compatible");

  return (
    <span
      className={`sdk-chip ${isOpenAICompat ? "sdk-chip-compat" : "sdk-chip-native"}`}
      title={label}
    >
      {label}
    </span>
  );
}

function BestForTagline({ children }: { children: React.ReactNode }) {
  return <span className="best-for-tagline">{children}</span>;
}

// ---------------------------------------------------------------------------
// SVG icon helpers (inline, no extra dep)
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Column detection
// ---------------------------------------------------------------------------

type KnownColumn =
  | "name"
  | "freeTier"
  | "price"
  | "sdk"
  | "bestFor"
  | "type"
  | "apiAvailable"
  | "dimensions"
  | "whatItDoes"
  | "layer"
  | "pick"
  | "why"
  | "monthlyCost"
  | "when"
  | "other";

function detectColumnType(header: string): KnownColumn {
  const h = header.toLowerCase().replace(/[^a-z]/g, "");
  if (h === "name") return "name";
  if (h.includes("free")) return "freeTier";
  if (h.startsWith("price") || h === "cost" || h.includes("monthlycost")) return "price";
  if (h === "tssdk" || h === "sdk") return "sdk";
  if (h.includes("bestfor")) return "bestFor";
  if (h === "type") return "type";
  if (h.includes("api")) return "apiAvailable";
  if (h.includes("dimension")) return "dimensions";
  if (h.includes("whatitdoes") || h.includes("whatdoes")) return "whatItDoes";
  if (h === "layer") return "layer";
  if (h === "pick") return "pick";
  if (h === "why") return "why";
  if (h === "when") return "when";
  return "other";
}

// ---------------------------------------------------------------------------
// Row rendering
// ---------------------------------------------------------------------------

interface ParsedRow {
  cells: React.ReactNode[];
}

interface ToolRowProps {
  row: ParsedRow;
  headers: string[];
  columnTypes: KnownColumn[];
  index: number;
}

function ToolRow({ row, headers, columnTypes, index }: ToolRowProps) {
  const [expanded, setExpanded] = useState(false);

  const nameIdx = columnTypes.indexOf("name");
  const freeTierIdx = columnTypes.indexOf("freeTier");
  const priceIdx = columnTypes.indexOf("price");
  const sdkIdx = columnTypes.indexOf("sdk");
  const bestForIdx = columnTypes.indexOf("bestFor");

  const nameCell = nameIdx >= 0 ? row.cells[nameIdx] : null;
  const freeTierCell = freeTierIdx >= 0 ? row.cells[freeTierIdx] : null;
  const priceCell = priceIdx >= 0 ? row.cells[priceIdx] : null;
  const bestForCell = bestForIdx >= 0 ? row.cells[bestForIdx] : null;
  const sdkCell = sdkIdx >= 0 ? row.cells[sdkIdx] : null;

  // All columns that are NOT name/freeTier/price/sdk/bestFor go into expanded detail
  const detailIndices = columnTypes
    .map((ct, i) => ({ ct, i }))
    .filter(({ ct, i }) => {
      const isTopLevel =
        ct === "name" || ct === "freeTier" || ct === "price" || ct === "sdk" || ct === "bestFor";
      // Always surface 'type' and 'apiAvailable' inline for speech/image/video tables
      const isSurfaced = ct === "type" || ct === "apiAvailable" || ct === "dimensions";
      return !isTopLevel && !isSurfaced && i < row.cells.length;
    })
    .map(({ i }) => i);

  const surfacedIndices = columnTypes
    .map((ct, i) => ({ ct, i }))
    .filter(({ ct, i }) =>
      (ct === "type" || ct === "apiAvailable" || ct === "dimensions") &&
      i < row.cells.length
    )
    .map(({ i }) => i);

  const hasDetails = detailIndices.length > 0 || bestForCell !== null || sdkCell !== null;

  const freeTierText = freeTierCell ? getTextContent(freeTierCell) : "";

  return (
    <div
      className={`tool-row ${expanded ? "tool-row-expanded" : ""}`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Summary bar (always visible) */}
      <button
        className="tool-row-summary"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        disabled={!hasDetails}
        style={{ cursor: hasDetails ? "pointer" : "default" }}
      >
        {/* Name + best-for tagline */}
        <div className="tool-row-name-col">
          <div className="tool-row-name">{nameCell}</div>
          {bestForCell && (
            <div className="tool-row-tagline">
              <BestForTagline>{bestForCell}</BestForTagline>
            </div>
          )}
        </div>

        {/* Surfaced metadata chips (type, api, dimensions) */}
        {surfacedIndices.length > 0 && (
          <div className="tool-row-surfaced">
            {surfacedIndices.map((i) => (
              <span key={i} className="tool-meta-chip">
                {row.cells[i]}
              </span>
            ))}
          </div>
        )}

        {/* Free tier badge */}
        {freeTierCell && (
          <div className="tool-row-free">
            <FreeTierBadge text={freeTierText} />
          </div>
        )}

        {/* Price */}
        {priceCell && (
          <div className="tool-row-price">
            <PriceDisplay>{priceCell}</PriceDisplay>
          </div>
        )}

        {/* Expand chevron */}
        {hasDetails && (
          <div className="tool-row-chevron" aria-hidden="true">
            <ChevronIcon open={expanded} />
          </div>
        )}
      </button>

      {/* Expanded detail panel */}
      {expanded && (
        <div className="tool-row-detail" role="region">
          {/* Best For as a full-width highlight if there's content */}
          {bestForCell && (
            <div className="detail-section">
              <span className="detail-label">Best For</span>
              <div className="detail-value detail-bestfor">{bestForCell}</div>
            </div>
          )}

          {/* SDK */}
          {sdkCell && (
            <div className="detail-section">
              <span className="detail-label">TypeScript SDK</span>
              <div className="detail-value">
                <SdkChip>{sdkCell}</SdkChip>
              </div>
            </div>
          )}

          {/* Free Tier full text */}
          {freeTierCell && freeTierText.length > 10 && (
            <div className="detail-section">
              <span className="detail-label">Free Tier</span>
              <div className="detail-value">{freeTierCell}</div>
            </div>
          )}

          {/* Price full text */}
          {priceCell && (
            <div className="detail-section">
              <span className="detail-label">Pricing</span>
              <div className="detail-value">{priceCell}</div>
            </div>
          )}

          {/* All other columns */}
          {detailIndices.map((i) => (
            <div key={i} className="detail-section">
              <span className="detail-label">{headers[i]}</span>
              <div className="detail-value">{row.cells[i]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main ToolTable
// ---------------------------------------------------------------------------

interface ToolTableProps {
  children: React.ReactNode;
}

export default function ToolTable({ children }: ToolTableProps) {
  const headers: string[] = [];
  const rows: ParsedRow[] = [];

  // Walk the <table> children (thead, tbody)
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) return;
    const tag = child.type as string;

    if (tag === "thead") {
      React.Children.forEach(child.props.children, (tr) => {
        if (!React.isValidElement<{ children?: React.ReactNode }>(tr)) return;
        React.Children.forEach(tr.props.children, (th) => {
          if (!React.isValidElement<{ children?: React.ReactNode }>(th)) return;
          headers.push(getTextContent(th.props.children));
        });
      });
    }

    if (tag === "tbody") {
      React.Children.forEach(child.props.children, (tr) => {
        if (!React.isValidElement<{ children?: React.ReactNode }>(tr)) return;
        const cells: React.ReactNode[] = [];
        React.Children.forEach(tr.props.children, (td) => {
          if (!React.isValidElement<{ children?: React.ReactNode }>(td)) return;
          cells.push(td.props.children);
        });
        rows.push({ cells });
      });
    }
  });

  const columnTypes = headers.map(detectColumnType);

  // Detect if this is a "stack" table (Layer / Pick / Why) vs a tool comparison table
  const isStackTable = columnTypes.includes("layer") || columnTypes.includes("pick");

  if (isStackTable) {
    return <StackTable headers={headers} columnTypes={columnTypes} rows={rows} />;
  }

  return (
    <div className="tool-table" role="list" aria-label="Tool comparison table">
      {/* Column header hint strip (desktop only) */}
      <div className="tool-table-header-strip" aria-hidden="true">
        <div className="tool-header-name">Tool</div>
        <div className="tool-header-right">
          {columnTypes.includes("freeTier") && (
            <div className="tool-header-free">Free tier</div>
          )}
          {columnTypes.includes("price") && (
            <div className="tool-header-price">Price</div>
          )}
        </div>
      </div>

      {rows.map((row, i) => (
        <div key={i} role="listitem">
          <ToolRow
            row={row}
            headers={headers}
            columnTypes={columnTypes}
            index={i}
          />
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// StackTable — for the "Must-Have Stack" tables (Layer / Pick / Why / Cost)
// ---------------------------------------------------------------------------

interface StackTableProps {
  headers: string[];
  columnTypes: KnownColumn[];
  rows: ParsedRow[];
}

function StackTable({ headers, columnTypes, rows }: StackTableProps) {
  return (
    <div className="stack-table" role="table" aria-label="Recommended stack">
      <div className="stack-table-header" role="row">
        {headers.map((h, i) => (
          <div key={i} className="stack-col-header" role="columnheader">
            {h}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} className="stack-table-row" role="row">
          {row.cells.map((cell, j) => {
            const ct = columnTypes[j] ?? "other";
            return (
              <div
                key={j}
                className={`stack-cell stack-cell-${ct}`}
                role="cell"
              >
                {ct === "price" || ct === "monthlyCost" ? (
                  <PriceDisplay>{cell}</PriceDisplay>
                ) : (
                  cell
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
