export interface ToolEntry {
  name: string;
  url: string;
  section: string;
  sectionId: string;
  bestFor: string;
  guideSlug: string;
  guideTitle: string;
  searchText: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function cleanCellText(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

/**
 * Parse all tools from markdown table rows.
 * Matches rows with bold linked names: | **[Name](url)** | ... |
 */
export function extractTools(
  markdown: string,
  context?: { guideSlug?: string; guideTitle?: string; guideSubtitle?: string }
): ToolEntry[] {
  const tools: ToolEntry[] = [];
  let currentSection = "";
  let currentSectionId = "";

  for (const line of markdown.split("\n")) {
    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      currentSection = h2Match[1].replace(/^\d+\.\s*/, "").trim();
      currentSectionId = slugify(h2Match[1].trim());
      continue;
    }

    const toolMatch = line.match(/\|\s*\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/);
    if (toolMatch && currentSectionId) {
      const cells = line
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      const searchText = [
        toolMatch[1],
        currentSection,
        context?.guideTitle,
        context?.guideSubtitle,
        ...cells.map(cleanCellText),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      tools.push({
        name: toolMatch[1],
        url: toolMatch[2],
        section: currentSection,
        sectionId: currentSectionId,
        bestFor: cleanCellText(cells[cells.length - 1] || ""),
        guideSlug: context?.guideSlug || "",
        guideTitle: context?.guideTitle || "",
        searchText,
      });
    }
  }

  return tools;
}

/**
 * Count tools (table data rows) per section.
 * Returns a map of sectionId → count.
 */
export function extractSectionCounts(
  markdown: string
): Record<string, number> {
  const counts: Record<string, number> = {};
  let currentSectionId = "";

  for (const line of markdown.split("\n")) {
    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      currentSectionId = slugify(h2Match[1].trim());
      if (!counts[currentSectionId]) counts[currentSectionId] = 0;
      continue;
    }

    if (currentSectionId && /\|\s*\*\*\[/.test(line)) {
      counts[currentSectionId]++;
    }
  }

  return counts;
}
