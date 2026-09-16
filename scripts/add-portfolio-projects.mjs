import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "app", "page.tsx");
const text = fs.readFileSync(file, "utf8");
const marker = 'title: "Clinevo Smart Inbox Assistant"';

if (text.includes(marker)) {
  console.log("Portfolio projects already present.");
  process.exit(0);
}

const start = text.indexOf("const otherProjects = [");
const end = text.indexOf("\n];", start);
if (start === -1 || end === -1) {
  throw new Error("Could not locate otherProjects array in app/page.tsx");
}

const additions = `  {
    number: "08",
    title: "Clinevo Smart Inbox Assistant",
    description: "AI-powered healthcare shared inbox assistant for email classification, PDF/OCR review, structured case extraction, reviewer validation, and audit-ready processing.",
    tags: ["Python", "Java", "Flask", "Machine Learning", "Angular", "TypeScript"],
    symbol: "CI",
    github: "https://github.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant",
    live: null,
  },
  {
    number: "09",
    title: "RazorGuard-AI",
    description: "AI-powered payment risk manager that detects risky transactions using a Random Forest model with explainable risk signals and automated defensive actions.",
    tags: ["Python", "Flask", "Machine Learning", "Random Forest", "Scikit-learn"],
    symbol: "RG",
    github: "https://github.com/Ashutosh9-pan/RazorGuard-AI",
    live: null,
  },
  {
    number: "10",
    title: "Spring Blog API",
    description: "RESTful Blog API built with Java 21 and Spring Boot featuring posts, categories, comments, pagination, validation, Swagger documentation, H2/PostgreSQL, JUnit, and Mockito.",
    tags: ["Java 21", "Spring Boot", "REST API", "PostgreSQL", "Swagger", "JUnit"],
    symbol: "SB",
    github: "https://github.com/Ashutosh9-pan/week6-spring-blog-api",
    live: null,
  },
  {
    number: "11",
    title: "NovaCart E-commerce Frontend",
    description: "Modern responsive e-commerce frontend built with React, Redux Toolkit, React Router, Vite, and localStorage for a smooth shopping experience.",
    tags: ["React", "Redux Toolkit", "JavaScript", "React Router", "Vite"],
    symbol: "NC",
    github: "https://github.com/Ashutosh9-pan/novacart-ecommerce-frontend",
    live: null,
  },
  {
    number: "12",
    title: "CalcPro",
    description: "Modern responsive web calculator with keyboard support, dark/light themes, and essential arithmetic operations built with HTML, CSS, and JavaScript.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    symbol: "CP",
    github: "https://github.com/Ashutosh9-pan/CalcPro",
    live: null,
  },
  {
    number: "13",
    title: "Weather App",
    description: "Responsive weather application with real-time weather, forecasts, city search, favourites, geolocation, temperature conversion, and localStorage caching using OpenWeather API.",
    tags: ["JavaScript", "OpenWeather API", "Geolocation", "localStorage", "Responsive UI"],
    symbol: "WA",
    github: "https://github.com/Ashutosh9-pan/week4-weather-app",
    live: null,
  },
  {
    number: "14",
    title: "Library Management System",
    description: "Console-based Library Management System built in Java with OOP, file persistence, borrowing and returns, due dates, fine calculation, search, and library statistics.",
    tags: ["Java", "OOP", "File Handling", "Persistence", "CLI"],
    symbol: "LM",
    github: "https://github.com/Ashutosh9-pan/week3-library-system",
    live: null,
  },
  {
    number: "15",
    title: "Random Quote Generator",
    description: "Modern Android quote generator featuring 80 categorized quotes, favorites, sharing, dark mode, and offline support.",
    tags: ["Java", "Android", "Material Design", "SharedPreferences", "Offline App"],
    symbol: "RQ",
    github: "https://github.com/Ashutosh9-pan/CodeAlpha_RandomQuoteGenerator",
    live: null,
  },
`;

fs.writeFileSync(file, text.slice(0, end) + "\n" + additions + text.slice(end), "utf8");
console.log("Added 8 latest portfolio projects.");
