import { Link } from 'react-router-dom';

export default function Works() {
  return (
    <>
      <section id="Works" className="works-hero section">
        <p className="eyebrow">Selected work</p>
        <h1>Hands-on builds for security, automation, and realtime products.</h1>
        <p>
          Every project gets a purposeful design system, guardrails for scale,
          and instrumentation so teams can iterate. Here's a curated slice of
          what I've shipped recently.
        </p>
        <div className="cta-row">
          <Link className="btn primary" to="/contact">
            Start a project
          </Link>
          <Link className="btn ghost" to="/">
            Back to overview
          </Link>
        </div>
      </section>

      <section className="section project-gallery">
        <div className="section-heading works-subheading">
          <p className="eyebrow">Product & dev builds</p>
          <h2>Realtime UX, payments, and polished web apps.</h2>
          <p>
            SDE-style projects that sharpen frontend structure, socket state,
            and API design while shipping usable tools.
          </p>
          <div className="section-links">
            <a className="btn primary" href="/dev.html">
              Browse dev portfolio
            </a>
            <a
              className="inline-link"
              href="https://github.com/EJ-Edwards"
              target="_blank"
              rel="noopener noreferrer"
            >
              See everything on GitHub
            </a>
          </div>
        </div>
        <div className="projects-grid">
          <article className="project-card">
            <div className="project-meta">
              <span className="badge">Web Development</span>
              <span className="timeline">2025</span>
            </div>
            <h2>Portfolio-Website</h2>
            <p>
              A personal portfolio website showcasing projects, skills, and
              experience in software and cybersecurity.
            </p>
            <ul className="tech-list">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <a
              className="inline-link"
              href="https://github.com/EJ-Edwards/Portfolio-Website"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Portfolio-Website project"
            >
              View repository
            </a>
          </article>

          <article className="project-card">
            <div className="project-meta">
              <span className="badge">Java CLI</span>
              <span className="timeline">2026</span>
            </div>
            <h2>EJ Student System</h2>
            <p className="project-description">
              A CLI Java application that manages students.
            </p>
            <ul className="tech-list">
              <li>Java</li>
            </ul>
            <a
              className="inline-link"
              href="https://github.com/EJ-Edwards/EJ-Student-System"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View EJ Student System project"
            >
              View repository
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
