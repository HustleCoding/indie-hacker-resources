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
// Sub-components: badges, chips
// ---------------------------------------------------------------------------

function FreeTierBadge({ text }: { text: string }) {
  const plain = text.trim();
  const baseClass = "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-border-light bg-bg-secondary text-text-secondary leading-tight max-w-[14rem]";

  if (isFreeTier(plain)) {
    return (
      <span className={baseClass} title={plain} aria-label={`Free tier: ${plain}`}>
        Free tier
      </span>
    );
  }
  if (isNoFreeTier(plain)) {
    return (
      <span className={baseClass} aria-label="No free tier">
        Paid
      </span>
    );
  }
  return (
    <span className={baseClass} aria-label={`Limited: ${plain}`}>
      {plain.length > 28 ? plain.slice(0, 26) + "\u2026" : plain}
    </span>
  );
}

function PriceDisplay({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium font-mono text-text-secondary leading-snug max-w-[14rem] block">
      {children}
    </span>
  );
}

function SdkChip({ children }: { children: React.ReactNode }) {
  const text = getTextContent(children).trim();
  const label = text.replace(/^`|`$/g, "");

  return (
    <span
      className="inline-flex items-center text-xs font-mono px-2 py-0.5 rounded bg-bg-secondary border border-border-light text-text-secondary max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
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
// SVG icon helper
// ---------------------------------------------------------------------------

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
}

function ToolRow({ row, headers, columnTypes }: ToolRowProps) {
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

  const detailIndices = columnTypes
    .map((ct, i) => ({ ct, i }))
    .filter(({ ct, i }) => {
      const isTopLevel =
        ct === "name" || ct === "freeTier" || ct === "price" || ct === "sdk" || ct === "bestFor";
      const isSurfaced = ct === "type" || ct === "apiAvailable" || ct === "dimensions";
      return !isTopLevel && !isSurfaced && i < row.cells.length;
    })
    .map(({ i }) => i);

  const surfacedIndices = columnTypes
    .map((ct, i) => ({ ct, i }))
    .filter(({ ct }) =>
      ct === "type" || ct === "apiAvailable" || ct === "dimensions"
    )
    .filter(({ i }) => i < row.cells.length)
    .map(({ i }) => i);

  const hasDetails = detailIndices.length > 0 || bestForCell !== null || sdkCell !== null;

  const freeTierText = freeTierCell ? getTextContent(freeTierCell) : "";

  return (
    <div className={`tool-row ${expanded ? "tool-row-expanded" : ""}`}>
      <button
        className="tool-row-summary"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        disabled={!hasDetails}
        style={{ cursor: hasDetails ? "pointer" : "default" }}
      >
        <div className="tool-row-name-col">
          <div className="tool-row-name">{nameCell}</div>
          {bestForCell && (
            <div>
              <BestForTagline>{bestForCell}</BestForTagline>
            </div>
          )}
        </div>

        {surfacedIndices.length > 0 && (
          <div className="tool-row-surfaced">
            {surfacedIndices.map((i) => (
              <span key={i} className="text-xs font-medium text-text-secondary">
                {row.cells[i]}
              </span>
            ))}
          </div>
        )}

        {freeTierCell && (
          <div className="tool-row-free">
            <FreeTierBadge text={freeTierText} />
          </div>
        )}

        {priceCell && (
          <div className="tool-row-price">
            <PriceDisplay>{priceCell}</PriceDisplay>
          </div>
        )}

        {hasDetails && (
          <div className="tool-row-chevron" aria-hidden="true">
            <ChevronIcon open={expanded} />
          </div>
        )}
      </button>

      {expanded && (
        <div className="tool-row-detail" role="region">
          {bestForCell && (
            <div className="detail-section">
              <span className="detail-label">Best For</span>
              <div className="detail-value detail-bestfor">{bestForCell}</div>
            </div>
          )}

          {sdkCell && (
            <div className="detail-section">
              <span className="detail-label">TypeScript SDK</span>
              <div className="detail-value">
                <SdkChip>{sdkCell}</SdkChip>
              </div>
            </div>
          )}

          {freeTierCell && freeTierText.length > 10 && (
            <div className="detail-section">
              <span className="detail-label">Free Tier</span>
              <div className="detail-value">{freeTierCell}</div>
            </div>
          )}

          {priceCell && (
            <div className="detail-section">
              <span className="detail-label">Pricing</span>
              <div className="detail-value">{priceCell}</div>
            </div>
          )}

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

  const isStackTable = columnTypes.includes("layer") || columnTypes.includes("pick");

  if (isStackTable) {
    return <StackTable headers={headers} columnTypes={columnTypes} rows={rows} />;
  }

  return (
    <div className="tool-table" role="list" aria-label="Tool comparison table">
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
          />
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// StackTable
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
                {cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
