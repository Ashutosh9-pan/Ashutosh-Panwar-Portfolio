"use client";

import { useEffect, useState } from "react";

const navItems = ["About", "Skills", "Projects", "Journey", "Contact"];

const skillGroups = [
  {
    label: "AI & Data",
    skills: ["Applied AI/ML", "Generative AI", "LLM & RAG", "MySQL", "MongoDB"],
  },
  {
    label: "Languages",
    skills: ["Python", "Java", "C", "C++", "JavaScript", "C#"],
  },
  {
    label: "Engineering",
    skills: ["Data Structures", "OOP", "Firebase", "Git", "Android", "Debugging"],
  },
];

const otherProjects = [
  {
    number: "05",
    title: "Campus Complaint System",
    description: "A structured digital workflow for students to raise hostel and campus issues, follow their status, and help administrators respond with clearer accountability.",
    tags: ["Java", "Database", "Workflow"],
    symbol: "CC",
    href: null,
  },
  {
    number: "06",
    title: "Smart Waste Monitoring",
    description: "A CCTV-assisted waste management concept that identifies actionable events and triggers timely notifications for faster response and cleaner shared spaces.",
    tags: ["Computer Vision", "Notifications", "Smart City"],
    symbol: "WM",
    href: null,
  },
];

const certifications = [
  ["Generative AI, LLM & RAG", "GeeksforGeeks Skill Up"],
  ["Full Stack Web Development", "GeeksforGeeks Skill Up"],
  ["Java Programming", "SLOG Solutions"],
  ["C++ Programming", "SLOG Solutions"],
  ["C# Programming", "Udemy"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Ashutosh Panwar home">
          <span className="brand-mark">AP</span>
          <span>Ashutosh Panwar</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>
              {item}
            </a>
          ))}
          <a className="nav-cta" href="/assets/ashutosh-panwar-resume.pdf" target="_blank" rel="noreferrer">
            Resume <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-copy reveal">
          <div className="eyebrow"><span /> Available for AI/ML opportunities</div>
          <p className="intro">Hello, I&apos;m</p>
          <h1>Ashutosh<br /><span>Panwar.</span></h1>
          <h2>AI &amp; Machine Learning Developer</h2>
          <p className="hero-text">
            Computer Science Engineering graduate building practical, human-centered digital products at the intersection of AI, data, and software engineering.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my work <span>↓</span></a>
            <a className="button button-secondary" href="mailto:ashutoshpanwar07@gmail.com">Let&apos;s connect <span>↗</span></a>
          </div>
          <div className="hero-links" aria-label="Social links">
            <a href="https://github.com/Ashutosh9-pan" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ashutosh-panwar-5192951b8" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <span>Srinagar Garhwal, Uttarakhand</span>
          </div>
        </div>

        <div className="hero-visual reveal delay-one">
          <div className="portrait-frame">
            <div className="portrait-grid" />
            <img src="/assets/ashutosh-panwar.png" alt="Portrait of Ashutosh Panwar" />
            <div className="portrait-tag portrait-tag-top"><strong>AI / ML</strong><span>Applied systems</span></div>
            <div className="portrait-tag portrait-tag-bottom"><strong>Java + Python</strong><span>Product-minded builder</span></div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Professional highlights">
        <div><strong>01</strong><span>AI &amp; ML<br />Focus</span></div>
        <div><strong>05+</strong><span>Programming<br />Languages</span></div>
        <div><strong>04</strong><span>Applied<br />Projects</span></div>
        <div><strong>05</strong><span>Professional<br />Certifications</span></div>
      </section>

      <section className="section about" id="about">
        <div className="section-kicker">01 / About</div>
        <div className="about-layout">
          <h2>I turn structured thinking into <span>useful digital experiences.</span></h2>
          <div className="about-copy">
            <p>
              I&apos;m a Computer Science Engineering graduate with a foundation in Python, data structures, databases, and full-stack development. My current focus is applied AI—understanding how intelligent systems can solve real, everyday problems.
            </p>
            <p>
              From transitioning from Civil Engineering into Computer Science to independently building end-to-end projects, I bring adaptability, ownership, and a practical approach to every challenge.
            </p>
            <a className="text-link" href="#journey">More about my journey <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="section skills" id="skills">
        <div className="section-heading">
          <div>
            <div className="section-kicker">02 / Skills</div>
            <h2>Tools I use to move from idea to implementation.</h2>
          </div>
          <p>Growing depth across AI, software engineering, and structured data—supported by strong fundamentals and a habit of learning by building.</p>
        </div>

        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <article className="skill-card" key={group.label}>
              <span className="card-index">0{index + 1}</span>
              <h3>{group.label}</h3>
              <div className="skill-list">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="project-preview" id="projects">
        <div className="project-copy">
          <div className="section-kicker light">03 / Featured project</div>
          <p className="project-number">01</p>
          <h2>VitaFit</h2>
          <h3>AI-powered fitness tracking for Android</h3>
          <p>
            A complete Android experience combining secure authentication, activity tracking, analytics, exports, reminders, dark mode, and a five-tool AI fitness assistant.
          </p>
          <div className="project-tags"><span>Java</span><span>Firebase</span><span>Gemini AI</span><span>Android</span></div>
          <div className="project-actions">
            <a className="button button-light" href="https://github.com/Ashutosh9-pan/VitaFit-AI-Fitness-Tracker" target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a>
            <a className="button button-outline-light" href="https://github.com/Ashutosh9-pan/VitaFit-AI-Fitness-Tracker/releases/latest" target="_blank" rel="noreferrer">Get APK <span>↓</span></a>
          </div>
        </div>
        <div className="project-phones" aria-label="VitaFit application screenshots">
          <div className="phone phone-back"><img src="/assets/vitafit-dashboard.jpg" alt="VitaFit dashboard in dark mode" /></div>
          <div className="phone phone-front"><img src="/assets/vitafit-ai-hub.jpg" alt="VitaFit AI Fitness Assistant hub" /></div>
        </div>
      </section>

      <section className="flashcard-feature" aria-label="Featured Flashcard Quiz App project">
        <div className="flashcard-visual">
          <div className="flashcard-glow" />
          <div className="flashcard-phone flashcard-phone-back">
            <img src="/assets/flashcard-splash-screen.jpg" alt="Flashcard Quiz App splash screen" />
          </div>
          <div className="flashcard-phone flashcard-phone-front">
            <img src="/assets/flashcard-quiz-screen.jpg" alt="Flashcard Quiz question and card management screen" />
          </div>
          <div className="floating-card floating-card-one"><span>QUESTION</span><strong>Tap to reveal</strong></div>
          <div className="floating-card floating-card-two"><span>ANSWER</span><strong>Learn · Quiz · Remember</strong></div>
        </div>
        <div className="flashcard-copy">
          <div className="section-kicker">03 / Featured project</div>
          <p className="project-number">02</p>
          <h2>Flashcard<br />Quiz App</h2>
          <h3>Interactive learning, built for Android</h3>
          <p>
            A focused study companion with question-and-answer flashcards, smooth next and previous navigation, SQLite-backed create, edit and delete operations, and a comfortable Dark Mode.
          </p>
          <div className="project-tags flashcard-tags"><span>Java</span><span>SQLite</span><span>Android</span><span>CRUD</span></div>
          <a className="button button-primary" href="https://github.com/Ashutosh9-pan/CodeAlpha_FlashcardQuizApp" target="_blank" rel="noreferrer">View project on GitHub <span>↗</span></a>
        </div>
      </section>

      <section className="language-feature" aria-label="Featured LanguageLearn project">
        <div className="language-copy">
          <div className="section-kicker light">03 / Featured project</div>
          <p className="project-number">03</p>
          <h2>Language<br />Learn</h2>
          <h3>Multilingual learning that fits into every day</h3>
          <p>
            A polished Android learning experience combining vocabulary, daily phrases, grammar lessons, interactive quizzes, pronunciation, concise dictionary lookup, multilingual content, progress tracking, and dark mode.
          </p>
          <div className="project-tags">
            <span>Java</span><span>Android</span><span>Text to Speech</span><span>REST API</span><span>Material UI</span>
          </div>
          <div className="project-actions">
            <a className="button button-light" href="https://github.com/Ashutosh9-pan/CodeAlpha_LanguageLearningApp" target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a>
            <a className="button button-outline-light" href="https://github.com/Ashutosh9-pan/CodeAlpha_LanguageLearningApp/releases/latest" target="_blank" rel="noreferrer">Get APK <span>↓</span></a>
          </div>
        </div>
        <div className="language-phones" aria-label="LanguageLearn application screenshots">
          <div className="language-phone language-phone-back">
            <img src="/assets/languagelearn-dashboard.jpg" alt="LanguageLearn dashboard and progress" />
          </div>
          <div className="language-phone language-phone-front">
            <img src="/assets/languagelearn-dictionary.jpg" alt="LanguageLearn English to Hindi dictionary" />
          </div>
        </div>
      </section>

      <section className="quotespark-feature" aria-label="Featured QuoteSpark project">
        <div className="quotespark-visual" aria-label="QuoteSpark Android application screenshot">
          <div className="quotespark-orb quotespark-orb-one" />
          <div className="quotespark-orb quotespark-orb-two" />
          <div className="quotespark-phone">
            <img src="/assets/quotespark-home.jpg" alt="QuoteSpark random quote generator home screen" />
          </div>
          <div className="quotespark-badge quotespark-badge-top">
            <span>80</span>
            <small>CURATED QUOTES</small>
          </div>
          <div className="quotespark-badge quotespark-badge-bottom">
            <span>8</span>
            <small>CATEGORIES</small>
          </div>
        </div>

        <div className="quotespark-copy">
          <div className="section-kicker quote-kicker">03 / Featured project</div>
          <p className="project-number">04</p>
          <h2>Quote<br />Spark</h2>
          <h3>Thoughtful words, beautifully delivered</h3>
          <p>
            A modern offline-first Android quote experience with 80 curated quotes across eight categories, instant generation, favorites, saved quotes, copy and native sharing, plus polished light and dark modes.
          </p>
          <div className="project-tags quotespark-tags">
            <span>Java</span><span>Android</span><span>Material UI</span><span>SharedPreferences</span><span>Offline</span>
          </div>
          <div className="project-actions">
            <a className="button quotespark-button" href="https://github.com/Ashutosh9-pan/CodeAlpha_RandomQuoteGenerator" target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a>
            <a className="button quotespark-button-outline" href="https://github.com/Ashutosh9-pan/CodeAlpha_RandomQuoteGenerator/releases/latest" target="_blank" rel="noreferrer">Get APK <span>↓</span></a>
          </div>
        </div>
      </section>

      <section className="section more-projects">
        <div className="section-heading compact-heading">
          <div>
            <div className="section-kicker">04 / Selected work</div>
            <h2>Problem-solving beyond a single platform.</h2>
          </div>
          <p>Academic and applied concepts designed around real users, clear workflows, and measurable outcomes.</p>
        </div>
        <div className="project-card-grid">
          {otherProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-card-top">
                <span className="project-symbol">{project.symbol}</span>
                <span className="project-card-number">{project.number}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags dark-tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              {project.href && (
                <a className="project-card-link" href={project.href} target="_blank" rel="noreferrer">
                  View project on GitHub <span>↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section journey" id="journey">
        <div className="journey-intro">
          <div className="section-kicker light">05 / Journey</div>
          <h2>A path defined by curiosity and reinvention.</h2>
          <p>My background connects engineering discipline with software thinking—giving me a practical lens for learning new systems and turning ideas into working products.</p>
        </div>
        <div className="timeline">
          <article className="timeline-item current">
            <span className="timeline-date">Current</span>
            <div><p>Experience</p><h3>Artificial Intelligence Intern</h3><span>CodeAlpha · Applied AI/ML</span></div>
          </article>
          <article className="timeline-item">
            <span className="timeline-date">2023—2026</span>
            <div><p>Education</p><h3>B.Tech · Computer Science &amp; Engineering</h3><span>Institute of Technology, Gopeshwar · Final result awaited</span></div>
          </article>
          <article className="timeline-item">
            <span className="timeline-date">Completed 2023</span>
            <div><p>Foundation</p><h3>Diploma · Civil Engineering</h3><span>Government Polytechnic, Srinagar Garhwal</span></div>
          </article>
        </div>
      </section>

      <section className="section credentials">
        <div className="section-heading compact-heading">
          <div>
            <div className="section-kicker">06 / Credentials</div>
            <h2>Continuous learning, documented.</h2>
          </div>
          <p>Focused learning across modern AI concepts, full-stack development, and core programming languages.</p>
        </div>
        <div className="certificate-list">
          {certifications.map(([title, provider], index) => (
            <article className="certificate-row" key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{provider}</p><b aria-hidden="true">✓</b>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-kicker">Have a project, internship, or opportunity in mind?</div>
        <h2>Let&apos;s build something<br /><span>meaningful.</span></h2>
        <p>I&apos;m open to AI/ML internships, entry-level software roles, and thoughtful collaborations.</p>
        <div className="contact-actions">
          <a className="button button-light" href="mailto:ashutoshpanwar07@gmail.com">Email me <span>↗</span></a>
          <a className="button contact-outline" href="https://www.linkedin.com/in/ashutosh-panwar-5192951b8" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
        </div>
        <a className="contact-email" href="mailto:ashutoshpanwar07@gmail.com">ashutoshpanwar07@gmail.com</a>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-mark">AP</span><strong>Ashutosh Panwar</strong></div>
        <span>AI &amp; Machine Learning Developer · Uttarakhand, India</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
