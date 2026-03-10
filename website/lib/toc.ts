export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export function extractTocItems(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)/);
    if (match) {
      const depth = match[1].length;
      const text = match[2].replace(/\*\*/g, "").replace(/`/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      if (depth >= 2) {
        items.push({ id, text, depth });
      }
    }
  }
  return items;
}
