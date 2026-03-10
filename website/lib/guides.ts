import fs from "fs";
import path from "path";
import { extractTocItems, type TocItem } from "./toc";
import { extractTools, extractSectionCounts, type ToolEntry } from "./tools";

export interface GuideMeta {
  slug: string;
  title: string;
  subtitle: string;
  file: string;
  date: string;
}

export interface Guide extends GuideMeta {
  content: string;
  tocItems: TocItem[];
  tools: ToolEntry[];
  sectionCounts: Record<string, number>;
}

const GUIDES: GuideMeta[] = [
  {
    slug: "ai-llm-api-landscape",
    title: "AI & LLM API Landscape",
    subtitle:
      "A reference for indie hackers building with TypeScript/Next.js",
    file: "ai-llm-api-landscape.md",
    date: "March 2026",
  },
  {
    slug: "payment-billing-apis",
    title: "Payment & Billing APIs",
    subtitle:
      "Comprehensive guide for Next.js SaaS builders",
    file: "payment-billing-apis.md",
    date: "March 2026",
  },
];

export function getAllGuides(): GuideMeta[] {
  return GUIDES;
}

export function getGuide(slug: string): Guide | null {
  const meta = GUIDES.find((g) => g.slug === slug);
  if (!meta) return null;

  const filePath = path.join(process.cwd(), "content", meta.file);
  const content = fs.readFileSync(filePath, "utf-8");
  const tocItems = extractTocItems(content);
  const tools = extractTools(content);
  const sectionCounts = extractSectionCounts(content);

  return { ...meta, content, tocItems, tools, sectionCounts };
}
