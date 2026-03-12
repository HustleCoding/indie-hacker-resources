import fs from "fs";
import path from "path";

const websiteRoot = process.cwd();
const repoRoot = path.resolve(websiteRoot, "..");
const guidesFile = path.join(websiteRoot, "lib", "guides.ts");
const guidesSource = fs.readFileSync(guidesFile, "utf8");

const dateMatches = [...guidesSource.matchAll(/date:\s*"([^"]+)"/g)].map(
  (match) => match[1]
);
const uniqueDates = [...new Set(dateMatches)];

if (uniqueDates.length !== 1) {
  console.error(
    `Expected exactly one shared guide date in guides.ts, found: ${uniqueDates.join(", ")}`
  );
  process.exit(1);
}

const expectedDate = uniqueDates[0];
const expectedVerificationLine = `Last verified: ${expectedDate}.`;

const guideFiles = [
  "ai-llm-api-landscape.md",
  "payment-billing-apis.md",
  "communication-notification-apis.md",
  "data-storage-infrastructure-apis.md",
];

let hasErrors = false;

for (const file of guideFiles) {
  const websitePath = path.join(websiteRoot, "content", file);
  const mirrorPath = path.join(repoRoot, file);

  if (!fs.existsSync(websitePath)) {
    console.error(`Missing website guide: ${websitePath}`);
    hasErrors = true;
    continue;
  }

  if (!fs.existsSync(mirrorPath)) {
    console.error(`Missing root mirror: ${mirrorPath}`);
    hasErrors = true;
    continue;
  }

  const websiteContent = fs.readFileSync(websitePath, "utf8");
  const mirrorContent = fs.readFileSync(mirrorPath, "utf8");

  if (websiteContent !== mirrorContent) {
    console.error(`Mirror drift detected for ${file}`);
    hasErrors = true;
  }

  if (!websiteContent.includes(expectedDate)) {
    console.error(`Missing shared date "${expectedDate}" in ${file}`);
    hasErrors = true;
  }

  const sections = websiteContent.split(/\n##\s+/).slice(1);

  for (const section of sections) {
    const sectionTitle = section.split("\n", 1)[0].trim();

    if (!section.includes(expectedVerificationLine)) {
      console.error(
        `Missing "${expectedVerificationLine}" in section "${sectionTitle}" of ${file}`
      );
      hasErrors = true;
    }

    if (!section.includes("Sources:")) {
      console.error(`Missing "Sources:" in section "${sectionTitle}" of ${file}`);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  process.exit(1);
}

console.log(
  `Guide freshness checks passed for ${guideFiles.length} guides on ${expectedDate}.`
);
