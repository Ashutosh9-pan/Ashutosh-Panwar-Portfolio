import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "app", "page.tsx");

let page = fs.readFileSync(file, "utf8");

const skillsStart = page.indexOf("const skillGroups = [");
const skillsEnd = skillsStart === -1 ? -1 : page.indexOf("\n];", skillsStart);
if (skillsStart !== -1 && skillsEnd !== -1) {
  const skills = `const skillGroups = [
  { label: "AI, ML & Data", skills: ["Python", "Generative AI", "LLM & RAG", "Machine Learning", "scikit-learn", "NLP", "Pandas", "NumPy", "Data Analytics", "Data Visualization"] },
  { label: "Languages", skills: ["Java", "Python", "JavaScript", "C", "C++", "SQL", "Kotlin"] },
  { label: "Web & Backend", skills: ["HTML5", "CSS3", "React", "Next.js", "TypeScript", "Node.js", "Express.js", "Spring Boot", "REST APIs", "JWT", "RBAC"] },
  { label: "Android & Cloud", skills: ["Android Development", "XML", "Firebase", "SQLite", "Material Design", "Vite", "Redux Toolkit"] },
  { label: "Databases & Tools", skills: ["MySQL", "MongoDB", "PostgreSQL", "Git", "GitHub", "VS Code", "Android Studio", "Postman", "Swagger"] },
  { label: "Engineering", skills: ["Data Structures", "OOP", "CRUD", "Problem Solving", "Debugging", "Testing", "API Integration", "Responsive UI"] },
];`;
  page = page.slice(0, skillsStart) + skills + page.slice(skillsEnd + 3);
}

const aboutMarker = page.indexOf('id="about"');
if (aboutMarker !== -1) {
  const paragraphStart = page.indexOf("<p", aboutMarker);
  const paragraphEnd = paragraphStart === -1 ? -1 : page.indexOf("</p>", paragraphStart);
  if (paragraphStart !== -1 && paragraphEnd !== -1) {
    const openingEnd = page.indexOf(">", paragraphStart) + 1;
    const professionalAbout = "I’m a B.Tech Computer Science & Engineering graduate focused on building practical software across AI/ML, data analytics, full-stack web development, and Android. I enjoy turning real-world problems into reliable, user-focused products—from machine-learning workflows and REST APIs to responsive web applications and mobile experiences. My toolkit includes Python, Java, SQL, JavaScript, Spring Boot, React, Node.js, Firebase, and modern AI technologies such as Generative AI, LLMs, and RAG. I’m continuously strengthening my engineering fundamentals while building and shipping projects that demonstrate clean problem solving, strong API integration, and production-minded development.";
    page = page.slice(0, openingEnd) + professionalAbout + page.slice(paragraphEnd);
  }
}

const linkedinUrl = "https://www.linkedin.com/in/ashutosh-panwar-5192951b8/";
page = page.replace(/https?:\/\/(?:www\.)?linkedin\.com\/in\/[^"'\s<)]+/gi, linkedinUrl);

fs.writeFileSync(file, page, "utf8");
console.log("Profile content updated safely.");
