import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "app", "page.tsx");
let text = fs.readFileSync(file, "utf8");

// Replace the portfolio skill groups with a broader, recruiter-friendly stack.
const skillsStart = text.indexOf("const skillGroups = [");
const skillsEnd = text.indexOf("\n];", skillsStart);
if (skillsStart !== -1 && skillsEnd !== -1) {
  const skillGroups = `const skillGroups = [
  {
    label: "AI, ML & Data",
    skills: ["Python", "Generative AI", "LLM & RAG", "Machine Learning", "scikit-learn", "NLP", "Pandas", "NumPy", "Data Analytics", "Data Visualization"],
  },
  {
    label: "Languages",
    skills: ["Java", "Python", "JavaScript", "C", "C++", "C#", "SQL", "Kotlin"],
  },
  {
    label: "Web & Backend",
    skills: ["HTML5", "CSS3", "React", "Next.js", "Node.js", "Express.js", "Spring Boot", "REST APIs"],
  },
  {
    label: "Android & Cloud",
    skills: ["Android Development", "Java", "XML", "Firebase", "Material Design", "Vite", "Redux Toolkit"],
  },
  {
    label: "Databases & Tools",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Git", "GitHub", "VS Code", "Android Studio", "Postman", "Swagger"],
  },
  {
    label: "Engineering",
    skills: ["Data Structures", "OOP", "Problem Solving", "Debugging", "File Handling", "Responsive UI", "API Integration", "Testing"],
  },
];`;
  text = text.slice(0, skillsStart) + skillGroups + text.slice(skillsEnd + 3);
}

// Upgrade the main About paragraph while preserving the existing layout and styling.
const aboutStart = text.search(/<section\\b[^>]*\\bid=["']about["'][^>]*>/i);
if (aboutStart !== -1) {
  const aboutEnd = text.indexOf("</section>", aboutStart);
  if (aboutEnd !== -1) {
    const section = text.slice(aboutStart, aboutEnd);
    const professionalAbout = `I’m a B.Tech Computer Science & Engineering graduate focused on building practical software across AI/ML, data analytics, full-stack web development, and Android. I enjoy turning real-world problems into reliable, user-focused products—from machine-learning workflows and REST APIs to responsive web applications and mobile experiences. My current toolkit includes Python, Java, SQL, JavaScript, Spring Boot, React, Node.js, Firebase, and modern AI technologies such as Generative AI, LLMs, and RAG. I’m continuously improving my engineering fundamentals while building and shipping projects that demonstrate clean problem solving, strong API integration, and production-minded development.`;

    const paragraphPattern = /<p([^>]*)>([\\s\\S]*?)(?:B\.Tech|BTech|I am|I’m)([\\s\\S]*?)<\\/p>/i;
    if (paragraphPattern.test(section)) {
      const updatedSection = section.replace(paragraphPattern, '<p$1>' + professionalAbout + '</p>');
      text = text.slice(0, aboutStart) + updatedSection + text.slice(aboutEnd);
    }
  }
}

fs.writeFileSync(file, text, "utf8");
console.log("About and Skills sections updated successfully.");
