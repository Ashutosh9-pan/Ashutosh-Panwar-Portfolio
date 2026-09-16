import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "app", "page.tsx");
let text = fs.readFileSync(file, "utf8");

// Keep the education timeline current.
text = text.replace(/\s*· Final result awaited/g, "");

const marker = 'title: "Clinevo Smart Inbox Assistant"';
const start = text.indexOf("const otherProjects = [");
const end = text.indexOf("\n];", start);
if (start === -1 || end === -1) throw new Error("Could not locate otherProjects array in app/page.tsx");

if (!text.includes(marker)) {
  const additions = `  {
    number: "08",
    title: "Clinevo Smart Inbox Assistant",
    description: "AI-powered healthcare shared inbox assistant for automated document processing, classification, extraction, review, and audit workflows.",
    tags: ["AI/ML", "Python", "Flask", "Angular"],
    symbol: "CI",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant/main/docs/screenshots/dashboard.png",
    github: "https://github.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant",
    live: null,
    featured: true,
  },
  {
    number: "09",
    title: "RazorGuard-AI",
    description: "Payment risk management system using machine learning to identify transaction risk and surface explainable signals.",
    tags: ["Machine Learning", "Python", "Random Forest", "Flask"],
    symbol: "RG",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/RazorGuard-AI/main/assets/screenshots/dashboard.png",
    github: "https://github.com/Ashutosh9-pan/RazorGuard-AI",
    live: null,
    featured: true,
  },
  {
    number: "10",
    title: "Spring Blog API",
    description: "Production-style REST API with Spring Boot, validation, pagination, Swagger documentation, persistence, and automated tests.",
    tags: ["Java 21", "Spring Boot", "REST API", "PostgreSQL"],
    symbol: "SB",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/week6-spring-blog-api/main/docs/screenshots/swagger-ui.png",
    github: "https://github.com/Ashutosh9-pan/week6-spring-blog-api",
    live: null,
    featured: true,
  },
  {
    number: "11",
    title: "NovaCart E-commerce Frontend",
    description: "Modern e-commerce frontend with responsive UI, product browsing, filters, cart, wishlist, checkout, Redux Toolkit, and localStorage.",
    tags: ["React", "Redux Toolkit", "Vite", "JavaScript"],
    symbol: "NC",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/novacart-ecommerce-frontend/main/screenshots/01-home.png",
    github: "https://github.com/Ashutosh9-pan/novacart-ecommerce-frontend",
    live: null,
    featured: true,
  },
  {
    number: "12",
    title: "CalcPro",
    description: "Modern responsive web calculator with keyboard support, dark/light themes, and essential arithmetic operations.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    symbol: "CP",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/CalcPro/main/screenshots/calculator-dark.png",
    github: "https://github.com/Ashutosh9-pan/CalcPro",
    live: null,
  },
  {
    number: "13",
    title: "Weather App",
    description: "Responsive weather application with real-time weather, forecasts, city search, favourites, geolocation, temperature conversion, and caching.",
    tags: ["JavaScript", "OpenWeather API", "Geolocation", "localStorage"],
    symbol: "WA",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/week4-weather-app/main/screenshots/01-home-page.png",
    github: "https://github.com/Ashutosh9-pan/week4-weather-app",
    live: null,
  },
  {
    number: "14",
    title: "Library Management System",
    description: "Console-based Java library system with OOP, file persistence, borrowing and returns, due dates, fine calculation, search, and statistics.",
    tags: ["Java", "OOP", "File Handling", "CLI"],
    symbol: "LM",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/week3-library-system/main/screenshots/01-main-menu.png",
    github: "https://github.com/Ashutosh9-pan/week3-library-system",
    live: null,
  },
  {
    number: "15",
    title: "Random Quote Generator",
    description: "Modern Android quote generator featuring categorized quotes, favorites, sharing, dark mode, and offline support.",
    tags: ["Java", "Android", "Material Design", "Offline App"],
    symbol: "RQ",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/CodeAlpha_RandomQuoteGenerator/main/screenshots/03-quotespark-home-dark-mode.jpg",
    github: "https://github.com/Ashutosh9-pan/CodeAlpha_RandomQuoteGenerator",
    live: null,
  },
`;
  text = text.slice(0, end) + "\n" + additions + text.slice(end);
}

// Project cards: show the entire screenshot, never crop it.
const cardMarker = '<article className="project-card" key={project.title}>';
const cardImage = `<article className="project-card" key={project.title}>\n              {project.image && (\n                <div style={{ margin: "-24px -24px 22px", overflow: "hidden", borderRadius: "20px 20px 0 0", background: "#e8eaf0" }}>\n                  <img src={project.image} alt={project.title + " preview"} loading="lazy" style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />\n                </div>\n              )}`;
if (text.includes(cardMarker) && !text.includes('project.title + " preview"')) text = text.replace(cardMarker, cardImage);
text = text.replace('height: 190, objectFit: "cover"', 'height: "auto", objectFit: "contain"');

// Keep the four major projects out of the small Selected Work grid.
text = text.replace("{otherProjects.map((project) => (", "{otherProjects.filter((project) => !project.featured).map((project) => (");

// Replace the previous compact featured-project block with four large, VitaFit-style sections.
const sectionStart = text.indexOf('      <section className="section" aria-label="Featured major projects">');
const selectedStart = text.indexOf('      <section className="section more-projects">');
if (sectionStart !== -1 && selectedStart !== -1 && sectionStart < selectedStart) {
  const featuredSection = `      <section className="section" aria-label="Featured major projects" style={{ padding: 0 }}>\n        {otherProjects.filter((project) => project.featured).map((project, index) => (\n          <div key={project.title} style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minHeight: "min(760px, 78vw)", background: index % 2 === 0 ? "#11152b" : "#f5f4fb", color: index % 2 === 0 ? "#fff" : "#11152b" }}>\n            {index % 2 === 0 ? (\n              <>\n                <div style={{ padding: "clamp(48px, 7vw, 110px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>\n                  <div className="section-kicker light">03 / Featured project</div>\n                  <p className="project-number">{project.number}</p>\n                  <h2 style={{ fontSize: "clamp(46px, 6vw, 88px)", lineHeight: 0.98, margin: "16px 0" }}>{project.title}</h2>\n                  <h3 style={{ fontSize: "clamp(22px, 2.2vw, 34px)", fontWeight: 500, marginBottom: 24 }}>{project.description}</h3>\n                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>\n                  <div className="project-actions" style={{ marginTop: 30 }}><a className="button button-light" href={project.github} target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a></div>\n                </div>\n                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(24px, 4vw, 64px)", background: "#201d4c" }}>\n                  <img src={project.image} alt={project.title + " project screenshot"} style={{ width: "100%", height: "auto", maxHeight: "720px", objectFit: "contain", display: "block", borderRadius: 22, boxShadow: "0 24px 70px rgba(0,0,0,.28)" }} />\n                </div>\n              </>\n            ) : (\n              <>\n                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(24px, 4vw, 64px)", background: "#e9e7f5" }}>\n                  <img src={project.image} alt={project.title + " project screenshot"} style={{ width: "100%", height: "auto", maxHeight: "720px", objectFit: "contain", display: "block", borderRadius: 22, boxShadow: "0 24px 70px rgba(22,20,55,.16)" }} />\n                </div>\n                <div style={{ padding: "clamp(48px, 7vw, 110px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>\n                  <div className="section-kicker">03 / Featured project</div>\n                  <p className="project-number">{project.number}</p>\n                  <h2 style={{ fontSize: "clamp(46px, 6vw, 88px)", lineHeight: 0.98, margin: "16px 0" }}>{project.title}</h2>\n                  <h3 style={{ fontSize: "clamp(22px, 2.2vw, 34px)", fontWeight: 500, marginBottom: 24 }}>{project.description}</h3>\n                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>\n                  <div className="project-actions" style={{ marginTop: 30 }}><a className="button button-primary" href={project.github} target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a></div>\n                </div>\n              </>\n            )}\n          </div>\n        ))}\n      </section>\n\n`;
  text = text.slice(0, sectionStart) + featuredSection + text.slice(selectedStart);
}

// Make the featured layout stack cleanly on mobile.
if (!text.includes('aria-label="Featured major projects" style={{ padding: 0 }}')) throw new Error("Featured section was not inserted");

fs.writeFileSync(file, text, "utf8");
console.log("Updated full project screenshots, featured layouts, and Journey text.");
