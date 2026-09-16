import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "app", "page.tsx");
let text = fs.readFileSync(file, "utf8");

// Keep the education timeline current.
text = text.replace(/\s*· Final result awaited/g, "");

const marker = 'title: "Clinevo Smart Inbox Assistant"';
const start = text.indexOf("const otherProjects = [");
const end = text.indexOf("\n];", start);
if (start === -1 || end === -1) {
  throw new Error("Could not locate otherProjects array in app/page.tsx");
}

if (!text.includes(marker)) {
  const additions = `  {
    number: "08",
    title: "Clinevo Smart Inbox Assistant",
    description: "AI-powered healthcare shared inbox assistant for email classification, PDF/OCR review, structured case extraction, reviewer validation, and audit-ready processing.",
    tags: ["Python", "Java", "Flask", "Machine Learning", "Angular", "TypeScript"],
    symbol: "CI",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant/main/docs/screenshots/dashboard.png",
    github: "https://github.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant",
    live: null,
  },
  {
    number: "09",
    title: "RazorGuard-AI",
    description: "AI-powered payment risk manager that detects risky transactions using a Random Forest model with explainable risk signals and automated defensive actions.",
    tags: ["Python", "Flask", "Machine Learning", "Random Forest", "Scikit-learn"],
    symbol: "RG",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/RazorGuard-AI/main/assets/screenshots/dashboard.png",
    github: "https://github.com/Ashutosh9-pan/RazorGuard-AI",
    live: null,
  },
  {
    number: "10",
    title: "Spring Blog API",
    description: "RESTful Blog API built with Java 21 and Spring Boot featuring posts, categories, comments, pagination, validation, Swagger documentation, H2/PostgreSQL, JUnit, and Mockito.",
    tags: ["Java 21", "Spring Boot", "REST API", "PostgreSQL", "Swagger", "JUnit"],
    symbol: "SB",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/week6-spring-blog-api/main/docs/screenshots/swagger-ui.png",
    github: "https://github.com/Ashutosh9-pan/week6-spring-blog-api",
    live: null,
  },
  {
    number: "11",
    title: "NovaCart E-commerce Frontend",
    description: "Modern responsive e-commerce frontend built with React, Redux Toolkit, React Router, Vite, and localStorage for a smooth shopping experience.",
    tags: ["React", "Redux Toolkit", "JavaScript", "React Router", "Vite"],
    symbol: "NC",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/novacart-ecommerce-frontend/main/screenshots/01-home.png",
    github: "https://github.com/Ashutosh9-pan/novacart-ecommerce-frontend",
    live: null,
  },
  {
    number: "12",
    title: "CalcPro",
    description: "Modern responsive web calculator with keyboard support, dark/light themes, and essential arithmetic operations built with HTML, CSS, and JavaScript.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    symbol: "CP",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/CalcPro/main/screenshots/calculator-dark.png",
    github: "https://github.com/Ashutosh9-pan/CalcPro",
    live: null,
  },
  {
    number: "13",
    title: "Weather App",
    description: "Responsive weather application with real-time weather, forecasts, city search, favourites, geolocation, temperature conversion, and localStorage caching using OpenWeather API.",
    tags: ["JavaScript", "OpenWeather API", "Geolocation", "localStorage", "Responsive UI"],
    symbol: "WA",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/week4-weather-app/main/screenshots/01-home-page.png",
    github: "https://github.com/Ashutosh9-pan/week4-weather-app",
    live: null,
  },
  {
    number: "14",
    title: "Library Management System",
    description: "Console-based Library Management System built in Java with OOP, file persistence, borrowing and returns, due dates, fine calculation, search, and library statistics.",
    tags: ["Java", "OOP", "File Handling", "Persistence", "CLI"],
    symbol: "LM",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/week3-library-system/main/screenshots/01-main-menu.png",
    github: "https://github.com/Ashutosh9-pan/week3-library-system",
    live: null,
  },
  {
    number: "15",
    title: "Random Quote Generator",
    description: "Modern Android quote generator featuring 80 categorized quotes, favorites, sharing, dark mode, and offline support.",
    tags: ["Java", "Android", "Material Design", "SharedPreferences", "Offline App"],
    symbol: "RQ",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/CodeAlpha_RandomQuoteGenerator/main/screenshots/03-quotespark-home-dark-mode.jpg",
    github: "https://github.com/Ashutosh9-pan/CodeAlpha_RandomQuoteGenerator",
    live: null,
  },
`;
  text = text.slice(0, end) + "\n" + additions + text.slice(end);
}

// Add project screenshots to every card that supplies an image.
const cardMarker = '<article className="project-card" key={project.title}>';
const cardImage = `<article className="project-card" key={project.title}>\n              {project.image && (\n                <div style={{ margin: "-24px -24px 22px", overflow: "hidden", borderRadius: "20px 20px 0 0", background: "#e8eaf0" }}>\n                  <img src={project.image} alt={project.title + " preview"} loading="lazy" style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }} />\n                </div>\n              )}`;
if (text.includes(cardMarker) && !text.includes('project.title + " preview"')) {
  text = text.replace(cardMarker, cardImage);
}

// Add the four major new projects to a dedicated featured section once.
const featuredMarker = "aria-label=\"Featured major projects\"";
if (!text.includes(featuredMarker)) {
  const featuredSection = `\n      <section className="section" aria-label="Featured major projects">\n        <div className="section-heading compact-heading">\n          <div>\n            <div className="section-kicker">03B / Featured projects</div>\n            <h2>Major builds, built for real workflows.</h2>\n          </div>\n          <p>Selected projects highlighting applied AI, full-stack engineering, backend systems, and modern frontend development.</p>\n        </div>\n        <div className="project-card-grid">\n          {[\n            { title: "Clinevo Smart Inbox Assistant", number: "01", symbol: "CI", image: "https://raw.githubusercontent.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant/main/docs/screenshots/dashboard.png", description: "AI-powered healthcare shared inbox assistant for automated document processing, classification, extraction, review, and audit workflows.", tags: ["AI/ML", "Python", "Flask", "Angular"], github: "https://github.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant" },\n            { title: "RazorGuard-AI", number: "02", symbol: "RG", image: "https://raw.githubusercontent.com/Ashutosh9-pan/RazorGuard-AI/main/assets/screenshots/dashboard.png", description: "Payment risk management system using machine learning to identify transaction risk and surface explainable signals.", tags: ["Machine Learning", "Python", "Random Forest", "Flask"], github: "https://github.com/Ashutosh9-pan/RazorGuard-AI" },\n            { title: "Spring Blog API", number: "03", symbol: "SB", image: "https://raw.githubusercontent.com/Ashutosh9-pan/week6-spring-blog-api/main/docs/screenshots/swagger-ui.png", description: "Production-style REST API with Spring Boot, validation, pagination, Swagger documentation, persistence, and automated tests.", tags: ["Java 21", "Spring Boot", "REST API", "PostgreSQL"], github: "https://github.com/Ashutosh9-pan/week6-spring-blog-api" },\n            { title: "NovaCart E-commerce Frontend", number: "04", symbol: "NC", image: "https://raw.githubusercontent.com/Ashutosh9-pan/novacart-ecommerce-frontend/main/screenshots/01-home.png", description: "Modern e-commerce frontend with responsive UI, product browsing, filters, cart, wishlist, checkout, Redux Toolkit, and localStorage.", tags: ["React", "Redux Toolkit", "Vite", "JavaScript"], github: "https://github.com/Ashutosh9-pan/novacart-ecommerce-frontend" },\n          ].map((project) => (\n            <article className="project-card" key={project.title}>\n              <div style={{ margin: "-24px -24px 22px", overflow: "hidden", borderRadius: "20px 20px 0 0", background: "#e8eaf0" }}>\n                <img src={project.image} alt={project.title + " preview"} loading="lazy" style={{ width: "100%", height: 210, objectFit: "cover", display: "block" }} />\n              </div>\n              <div className="project-card-top">\n                <span className="project-symbol">{project.symbol}</span>\n                <span className="project-card-number">{project.number}</span>\n              </div>\n              <h3>{project.title}</h3>\n              <p>{project.description}</p>\n              <div className="project-tags dark-tags">\n                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}\n              </div>\n              <div className="project-actions">\n                <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>\n              </div>\n            </article>\n          ))}\n        </div>\n      </section>\n`;
  const insertBefore = '      <section className="section more-projects">';
  if (text.includes(insertBefore)) {
    text = text.replace(insertBefore, featuredSection + insertBefore);
  }
}

fs.writeFileSync(file, text, "utf8");
console.log("Portfolio projects, education status, screenshots, and featured projects updated.");
