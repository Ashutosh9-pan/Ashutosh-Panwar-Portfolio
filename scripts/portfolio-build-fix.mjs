import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const sourcePath = path.join(root, "scripts", "build-portfolio-final.mjs");
const tempPath = path.join(root, ".portfolio-build-fixed.mjs");

let source = fs.readFileSync(sourcePath, "utf8");

// Preserve JSX template expressions for the generated page and remove the
// escaped quotes that String.raw would otherwise leave in the TSX output.
source = source.replaceAll("String.raw", "rawTemplate");
source = source.replaceAll("${project", "\\${project");
source = source.replaceAll("${tag", "\\${tag");
source = source.replace(
  'import path from "node:path";',
  'import path from "node:path";\n\nconst rawTemplate = (strings, ...values) => String.raw(strings, ...values).replaceAll(\\\'\\\\"\\\', \\\'"\\\');'
);

fs.writeFileSync(tempPath, source, "utf8");
await import(pathToFileURL(tempPath).href + `?v=${Date.now()}`);

// The original project objects do not all declare the injected optional fields.
// Use any only for those generated fields so strict TypeScript builds cleanly.
const pagePath = path.join(root, "app", "page.tsx");
let page = fs.readFileSync(pagePath, "utf8");
page = page.replaceAll("otherProjects.filter((project) => !project.featured)", "(otherProjects as any[]).filter((project: any) => !project.featured)");
page = page.replaceAll("otherProjects.filter((project) => project.featured)", "(otherProjects as any[]).filter((project: any) => project.featured)");
page = page.replaceAll("project.image", "(project as any).image");
fs.writeFileSync(pagePath, page, "utf8");

fs.rmSync(tempPath, { force: true });
console.log("Portfolio build updater completed successfully.");
