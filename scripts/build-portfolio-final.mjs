import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "app", "page.tsx");
let text = fs.readFileSync(file, "utf8");

text = text.replace(/\s*· Final result awaited/g, "");

const start = text.indexOf("const otherProjects = [");
const end = text.indexOf("\n];", start);
if (start === -1 || end === -1) throw new Error("Could not locate otherProjects array");

if (!text.includes('title: "Clinevo Smart Inbox Assistant"')) {
  const additions = `  {
    number: "08", title: "Clinevo Smart Inbox Assistant",
    description: "AI-powered healthcare shared inbox assistant for automated document processing, classification, extraction, review, and audit workflows.",
    tags: ["AI/ML", "Python", "Flask", "Angular"], symbol: "CI",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant/main/docs/screenshots/dashboard.png",
    github: "https://github.com/Ashutosh9-pan/Clinevo-smart-inbox-assistant", live: null, featured: true,
  },
  {
    number: "09", title: "RazorGuard-AI",
    description: "Payment risk management system using machine learning to identify transaction risk and surface explainable signals.",
    tags: ["Machine Learning", "Python", "Random Forest", "Flask"], symbol: "RG",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/RazorGuard-AI/main/assets/screenshots/dashboard.png",
    github: "https://github.com/Ashutosh9-pan/RazorGuard-AI", live: null, featured: true,
  },
  {
    number: "10", title: "Spring Blog API",
    description: "Production-style REST API with Spring Boot, validation, pagination, Swagger documentation, persistence, and automated tests.",
    tags: ["Java 21", "Spring Boot", "REST API", "PostgreSQL"], symbol: "SB",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/week6-spring-blog-api/main/docs/screenshots/swagger-ui.png",
    github: "https://github.com/Ashutosh9-pan/week6-spring-blog-api", live: null, featured: true,
  },
  {
    number: "11", title: "NovaCart E-commerce Frontend",
    description: "Modern e-commerce frontend with responsive UI, product browsing, filters, cart, wishlist, checkout, Redux Toolkit, and localStorage.",
    tags: ["React", "Redux Toolkit", "Vite", "JavaScript"], symbol: "NC",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/novacart-ecommerce-frontend/main/screenshots/01-home.png",
    github: "https://github.com/Ashutosh9-pan/novacart-ecommerce-frontend", live: null, featured: true,
  },
  {
    number: "12", title: "CalcPro",
    description: "Modern responsive web calculator with keyboard support, dark/light themes, and essential arithmetic operations.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"], symbol: "CP",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/Ashutosh-Panwar-Portfolio/main/public/project-thumbnails/calcpro.svg",
    github: "https://github.com/Ashutosh9-pan/CalcPro", live: null,
  },
  {
    number: "13", title: "Weather App",
    description: "Responsive weather application with real-time weather, forecasts, city search, favourites, geolocation, temperature conversion, and caching.",
    tags: ["JavaScript", "OpenWeather API", "Geolocation", "localStorage"], symbol: "WA",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/week4-weather-app/main/screenshots/01-home-page.png",
    github: "https://github.com/Ashutosh9-pan/week4-weather-app", live: null,
  },
  {
    number: "14", title: "Library Management System",
    description: "Console-based Java library system with OOP, file persistence, borrowing and returns, due dates, fine calculation, search, and statistics.",
    tags: ["Java", "OOP", "File Handling", "CLI"], symbol: "LM",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/Ashutosh-Panwar-Portfolio/main/public/project-thumbnails/library-management.svg",
    github: "https://github.com/Ashutosh9-pan/week3-library-system", live: null,
  },
  {
    number: "15", title: "Random Quote Generator",
    description: "Modern Android quote generator featuring categorized quotes, favorites, sharing, dark mode, and offline support.",
    tags: ["Java", "Android", "Material Design", "Offline App"], symbol: "RQ",
    image: "https://raw.githubusercontent.com/Ashutosh9-pan/Ashutosh-Panwar-Portfolio/main/public/project-thumbnails/random-quote.svg",
    github: "https://github.com/Ashutosh9-pan/CodeAlpha_RandomQuoteGenerator", live: null,
  },
`;
  text = text.slice(0, end) + "\n" + additions + text.slice(end);
}

const cardMarker = '<article className="project-card" key={project.title}>';
if (text.includes(cardMarker) && !text.includes('project.title + " preview"')) {
  const cardImage = String.raw`<article className="project-card" key={project.title}>
              {project.image && (
                <div style={{ margin: "-24px -24px 22px", overflow: "hidden", borderRadius: "20px 20px 0 0", background: "#e8eaf0" }}>
                  <img src={project.image} alt={project.title + " preview"} loading="lazy" style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />
                </div>
              )}`;
  text = text.replace(cardMarker, cardImage);
}

text = text.replace("{otherProjects.map((project) => (", "{otherProjects.filter((project) => !project.featured).map((project) => (");

if (!text.includes('aria-label="Featured major projects"')) {
  const selectedStart = text.indexOf('      <section className="section more-projects">');
  if (selectedStart === -1) throw new Error("Could not locate Selected Work section");

  const featuredSection = String.raw`      <section className="section" aria-label="Featured major projects" style={{ padding: 0 }}>
        {otherProjects.filter((project) => project.featured).map((project, index) => (
          <div key={project.title} style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minHeight: "min(760px, 78vw)", background: index % 2 === 0 ? "#11152b" : "#f5f4fb", color: index % 2 === 0 ? "#fff" : "#11152b" }}>
            {index % 2 === 0 ? (
              <>
                <div style={{ padding: "clamp(48px, 7vw, 110px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div className="section-kicker light">03 / Featured project</div>
                  <p className="project-number">{project.number}</p>
                  <h2 style={{ fontSize: "clamp(46px, 6vw, 88px)", lineHeight: 0.98, margin: "16px 0" }}>{project.title}</h2>
                  <h3 style={{ fontSize: "clamp(22px, 2.2vw, 34px)", fontWeight: 500, marginBottom: 24 }}>{project.description}</h3>
                  <div className="project-tags">{project.tags.map((tag: string) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-actions" style={{ marginTop: 30 }}><a className="button button-light" href={project.github} target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(24px, 4vw, 64px)", background: "#201d4c" }}>
                  <img src={project.image} alt={project.title + " project screenshot"} style={{ width: "100%", height: "auto", objectFit: "contain", display: "block", borderRadius: 22, boxShadow: "0 24px 70px rgba(0,0,0,.28)" }} />
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(24px, 4vw, 64px)", background: "#e9e7f5" }}>
                  <img src={project.image} alt={project.title + " project screenshot"} style={{ width: "100%", height: "auto", objectFit: "contain", display: "block", borderRadius: 22, boxShadow: "0 24px 70px rgba(22,20,55,.16)" }} />
                </div>
                <div style={{ padding: "clamp(48px, 7vw, 110px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div className="section-kicker">03 / Featured project</div>
                  <p className="project-number">{project.number}</p>
                  <h2 style={{ fontSize: "clamp(46px, 6vw, 88px)", lineHeight: 0.98, margin: "16px 0" }}>{project.title}</h2>
                  <h3 style={{ fontSize: "clamp(22px, 2.2vw, 34px)", fontWeight: 500, marginBottom: 24 }}>{project.description}</h3>
                  <div className="project-tags">{project.tags.map((tag: string) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-actions" style={{ marginTop: 30 }}><a className="button button-primary" href={project.github} target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a></div>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

`;
  text = text.slice(0, selectedStart) + featuredSection + text.slice(selectedStart);
}

const journeyStart = text.indexOf('        <div className="timeline">');
const journeyEnd = text.indexOf('        </div>\n      </section>', journeyStart);
if (journeyStart !== -1 && journeyEnd !== -1 && !text.includes('The Developers Arena · Full Stack Java')) {
  const journeyTimeline = String.raw`        <div className="timeline">
          <article className="timeline-item current">
            <span className="timeline-date">Aug 2026 — Present</span>
            <div><p>Experience</p><h3>Full Stack Java Developer Intern</h3><span>The Developers Arena · Java, Spring Boot &amp; Full-Stack Development</span></div>
          </article>
          <article className="timeline-item current">
            <span className="timeline-date">Aug 2026 — Present</span>
            <div><p>Experience</p><h3>Web Development and Designing Intern</h3><span>Oasis Infobyte · Web Development &amp; Designing</span></div>
          </article>
          <article className="timeline-item">
            <span className="timeline-date">Aug 2026</span>
            <div><p>Experience</p><h3>Artificial Intelligence Intern</h3><span>CodeAlpha · Applied AI/ML &amp; Android Development</span></div>
          </article>
          <article className="timeline-item">
            <span className="timeline-date">Jul 2024 — Aug 2024</span>
            <div><p>Experience</p><h3>Programming Trainee</h3><span>SLOG Solutions Pvt. Ltd. · C++ &amp; Java Programming</span></div>
          </article>
          <article className="timeline-item">
            <span className="timeline-date">2023 — 2026</span>
            <div><p>Education</p><h3>B.Tech · Computer Science &amp; Engineering</h3><span>Institute of Technology, Gopeshwar · Graduate</span></div>
          </article>
          <article className="timeline-item">
            <span className="timeline-date">Completed 2023</span>
            <div><p>Foundation</p><h3>Diploma · Civil Engineering</h3><span>Government Polytechnic, Srinagar Garhwal</span></div>
          </article>
        </div>`;
  text = text.slice(0, journeyStart) + journeyTimeline + text.slice(journeyEnd + '        </div>'.length);
}

const certStart = text.indexOf('const certifications = [');
const certEnd = text.indexOf('\n];', certStart);
if (certStart !== -1 && certEnd !== -1 && !text.includes('["AI Tools & Claude Workshop", "Be10x"]')) {
  const certifications = `const certifications = [
  ["AI Tools & Claude Workshop", "Be10x"],
  ["Artificial Intelligence Internship", "CodeAlpha"],
  ["Data Analytics Professional Certificate", "Unified Mentor"],
  ["Generative AI, LLM & RAG", "GeeksforGeeks Skill Up"],
  ["Full Stack Web Development", "GeeksforGeeks Skill Up"],
  ["C Programming for Beginners – Master the C Language", "Udemy"],
  ["C++ Training Program", "SLOG Solutions Pvt. Ltd."],
  ["Java Training Program", "SLOG Solutions Pvt. Ltd."],
  ["C# Programming", "Udemy"],
`;
  text = text.slice(0, certStart) + certifications + text.slice(certEnd + 1);
}

// Sync the portfolio's public contact/profile links with the current resume.
const linkedinUrl = "https://www.linkedin.com/in/ashutosh-panwar-5192951b8/";
text = text.replace(/https?:\/\/(?:www\.)?linkedin\.com\/in\/[^"'\s<)]+/gi, linkedinUrl);
text = text.replace(/(?:www\.)?linkedin\.com\/in\/[^"'\s<)]+/gi, linkedinUrl);

fs.writeFileSync(file, text, "utf8");
console.log("Portfolio build updater completed.");
