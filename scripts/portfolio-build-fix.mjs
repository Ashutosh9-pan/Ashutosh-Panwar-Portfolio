import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const sourcePath = path.join(root, "scripts", "build-portfolio-final.mjs");
const tempPath = path.join(root, ".portfolio-build-fixed.mjs");

let source = fs.readFileSync(sourcePath, "utf8");
source = source.replaceAll("String.raw", "rawTemplate");
source = source.replaceAll("${project", "\\${project");
source = source.replaceAll("${tag", "\\${tag");

const helper = `import path from "node:path";\n\nconst rawTemplate = (strings, ...values) => String.raw(strings, ...values).replace(/\\\\"/g, '"');`;
source = source.replace('import path from "node:path";', helper);

fs.writeFileSync(tempPath, source, "utf8");
await import(pathToFileURL(tempPath).href + `?v=${Date.now()}`);

const pagePath = path.join(root, "app", "page.tsx");
let page = fs.readFileSync(pagePath, "utf8");
page = page.replaceAll("otherProjects.filter((project) => !project.featured)", "(otherProjects as any[]).filter((project: any) => !project.featured)");
page = page.replaceAll("otherProjects.filter((project) => project.featured)", "(otherProjects as any[]).filter((project: any) => project.featured)");
page = page.replaceAll("project.image", "(project as any).image");
page = page.replaceAll("project.tags.map((tag) =>", "project.tags.map((tag: string) =>");

// Keep the Selected Work cards visually consistent while preserving the full screenshot.
page = page.replaceAll(
  'className="project-card" key={project.title}',
  'className="project-card" key={project.title} style={{ minHeight: 610 }}'
);
page = page.replaceAll(
  'style={{ margin: "-24px -24px 22px", overflow: "hidden", borderRadius: "20px 20px 0 0", background: "#e8eaf0" }}',
  'style={{ margin: "-24px -24px 22px", height: 300, overflow: "hidden", borderRadius: "20px 20px 0 0", background: "#e8eaf0", display: "flex", alignItems: "center", justifyContent: "center" }}'
);
page = page.replaceAll(
  'style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}',
  'style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}'
);

// Portfolio counters: 15 total projects and 9 professional certifications.
page = page.replace(/(<strong>)\d+(<\/strong>\s*<span>\s*APPLIED\s*<br\s*\/>\s*PROJECTS)/i, "$115$2");
page = page.replace(/(<strong>)\d+(<\/strong>\s*<span>\s*PROFESSIONAL\s*<br\s*\/>\s*CERTIFICATIONS)/i, "$19$2");

fs.writeFileSync(pagePath, page, "utf8");
fs.rmSync(tempPath, { force: true });
console.log("Portfolio build updater completed successfully.");
