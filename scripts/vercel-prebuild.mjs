import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const sourcePath = path.join(root, "scripts", "build-portfolio-final.mjs");
const tempPath = path.join(root, ".portfolio-build-vercel.mjs");

let source = fs.readFileSync(sourcePath, "utf8");

// build-portfolio-final uses String.raw template literals to generate TSX that
// intentionally contains ${project.*} / ${tag}. Escape only those raw templates
// before importing the build script so Node does not evaluate them early.
source = source.replace(/String\.raw`([\s\S]*?)`/g, (_, body) => {
  const escaped = body.replaceAll("${", "\\${");
  return `rawTemplate\`${escaped}\``;
});

const helper = `import path from "node:path";\n\nconst rawTemplate = (strings) => strings.join("");`;
source = source.replace('import path from "node:path";', helper);

fs.writeFileSync(tempPath, source, "utf8");
await import(pathToFileURL(tempPath).href + `?v=${Date.now()}`);

const pagePath = path.join(root, "app", "page.tsx");
let page = fs.readFileSync(pagePath, "utf8");

page = page.replaceAll("otherProjects.filter((project) => !project.featured)", "(otherProjects as any[]).filter((project: any) => !project.featured)");
page = page.replaceAll("otherProjects.filter((project) => project.featured)", "(otherProjects as any[]).filter((project: any) => project.featured)");
page = page.replaceAll("project.image", "(project as any).image");
page = page.replaceAll("project.tags.map((tag) =>", "project.tags.map((tag: string) =>");

const projectImages = {
  "Clinevo Smart Inbox Assistant": "https://raw.githubusercontent.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant/main/docs/screenshots/dashboard.png",
  "TaskFlow": "https://raw.githubusercontent.com/Ashutosh9-pan/week2-task-manager/main/screenshots/light-dashboard.png",
  "Smart Waste Monitoring": "https://raw.githubusercontent.com/Ashutosh9-pan/Ashutosh-Panwar-Portfolio/main/public/project-thumbnails/smart-waste-ai.svg",
  "CalcPro": "https://raw.githubusercontent.com/Ashutosh9-pan/Ashutosh-Panwar-Portfolio/main/public/project-thumbnails/calcpro.svg",
  "Library Management System": "https://raw.githubusercontent.com/Ashutosh9-pan/Ashutosh-Panwar-Portfolio/main/public/project-thumbnails/library-management.svg",
  "Random Quote Generator": "https://raw.githubusercontent.com/Ashutosh9-pan/Ashutosh-Panwar-Portfolio/main/public/project-thumbnails/random-quote.svg",
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
for (const [title, image] of Object.entries(projectImages)) {
  const escapedTitle = escapeRegExp(title);
  const objectPattern = new RegExp(`(\\{[\\s\\S]*?title: "${escapedTitle}",[\\s\\S]*?symbol: "[^"]+",)([\\s\\S]*?)(\\n\\s*\\},)`);
  page = page.replace(objectPattern, (match, prefix, middle, suffix) => {
    const withoutOldImage = middle.replace(/\n\s*image: "[^"]*",?/g, "");
    return `${prefix}\n    image: "${image}",${withoutOldImage}${suffix}`;
  });
}

const projectsStart = page.indexOf("const otherProjects = [");
const projectsEnd = page.indexOf("\n];", projectsStart);
if (projectsStart !== -1 && projectsEnd !== -1) {
  const projectsBlock = page.slice(projectsStart, projectsEnd);
  const smartMatch = projectsBlock.match(/\n\s*(\{[\s\S]*?title: "Smart Waste Monitoring",[\s\S]*?\n\s*\},)\s*/);
  if (smartMatch) {
    const withoutSmart = projectsBlock.replace(smartMatch[0], "\n");
    const reordered = `${withoutSmart}\n  ${smartMatch[1].trim()}\n`;
    page = page.slice(0, projectsStart) + reordered + page.slice(projectsEnd);
  }
}

page = page.replaceAll(
  'style={{ margin: "-24px -24px 22px", overflow: "hidden", borderRadius: "20px 20px 0 0", background: "#e8eaf0" }}',
  'style={{ margin: "-24px -24px 22px", height: 300, overflow: "hidden", borderRadius: "20px 20px 0 0", background: "#e8eaf0", display: "flex", alignItems: "center", justifyContent: "center" }}'
);
page = page.replaceAll(
  'loading="lazy" style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}',
  'loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}'
);
page = page.replace(/(<strong>)\d+(<\/strong>\s*<span>\s*APPLIED\s*<br\s*\/?>\s*PROJECTS)/i, "$15$2");
page = page.replace(/(<strong>)\d+(<\/strong>\s*<span>\s*PROFESSIONAL\s*<br\s*\/?>\s*CERTIFICATIONS)/i, "$19$2");

fs.writeFileSync(pagePath, page, "utf8");
fs.rmSync(tempPath, { force: true });
console.log("Vercel-safe portfolio prebuild completed.");
