import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-content">
          <p className="eyebrow">Entry-level software engineer</p>
          <h1>Learning by building small, honest, and full-stack projects.</h1>
          <p className="lead">
            I'm Eric Edwards, an entry-level engineer who loves figuring out how
            frontend, backend, and security basics fit together. I scope
            projects realistically, document what I learn, and keep shipping to
            stay sharp.
          </p>
          <div className="cta-row">
            <Link className="btn primary" to="/work">
              Browse the work
            </Link>
            <a
              className="btn ghost"
              href="/assets/Eric E Resume SDE.pdf"
              download
            >
              Download resume
            </a>
          </div>
          <ul className="hero-metrics" aria-label="Key stats">
            <li>
              <span>6</span> personal builds
            </li>
            <li>
              <span>2</span> languages in progress
            </li>
            <li>
              <span>∞</span> curiosity to learn
            </li>
          </ul>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="visual-card orbit-card">
            <p className="eyebrow subtle">Currently tinkering</p>
            <h3>RedSight</h3>
            <p>A Cybersecurity Red Teaming tool.</p>
          </div>
          <div className="visual-card stack-card">
            <p className="eyebrow subtle">Toolbox</p>
            <ul className="stack-list" aria-label="Tech stack">
              <li>
                <strong>Languages</strong>
                <span>Python · Golang · JavaScript</span>
              </li>
              <li>
                <strong>Frameworks</strong>
                <span>React · Node.js · Express</span>
              </li>
              <li>
                <strong>Frontend</strong>
                <span>HTML/CSS</span>
              </li>
              <li>
                <strong>Databases</strong>
                <span>PostgreSQL · Firebase</span>
              </li>
              <li>
                <strong>Tools</strong>
                <span>Git · GitHub · VS Code</span>
              </li>
            </ul>
          </div>
          <div className="visual-card signal-card">
            <p>Status</p>
            <strong>Open to small collaborations + guidance</strong>
            <small>Remote-friendly · Great fit for beginner-friendly teams</small>
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>
            Entry-level engineer focused on fundamentals and clear
            documentation.
          </h2>
          <p>
            I take on bite-sized projects so I can understand the basics of
            APIs, UI work, and security, then write up what I learned for the
            next build.
          </p>
        </div>
        <div className="about-grid">
          <article className="profile-card">
            <dl>
              <div>
                <dt>Focus</dt>
                <dd>Full-stack platforms, APIs, developer tooling</dd>
              </div>
              <div>
                <dt>Currently learning</dt>
                <dd>Dart</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>United States · Remote worldwide</dd>
              </div>
            </dl>
          </article>
          <div className="story" id="ShortBio">
            <p>
              Hi, I'm Eric — an entry-level engineer working toward a software
              career. I've built focused experiments such as a remote admin tool
              prototype, a lightweight invoicing API, and a browser-based
              multiplayer game to understand how production apps come together.
            </p>
            <p>
              My process is straightforward: research the essentials, sketch a
              plan, deliver the MVP, then capture next-step improvements. Every
              project teaches me something new about structure, security, or
              design.
            </p>
          </div>
        </div>
      </section>

      <section className="section focus" id="focus">
        <div className="section-heading">
          <p className="eyebrow">Where I bring leverage</p>
          <h2>What I'm practicing right now.</h2>
        </div>
        <div className="focus-grid">
          <article className="focus-card">
            <span className="badge">Security basics</span>
            <h3>Recon dashboards & port checks</h3>
            <p>
              Experimenting with scanners and visual summaries to understand how
              network services respond.
            </p>
          </article>
          <article className="focus-card">
            <span className="badge">APIs & infra</span>
            <h3>Solid beginner backends</h3>
            <p>
              Building REST APIs with Node and Python, wiring auth later, and
              writing down what to improve next time.
            </p>
          </article>
          <article className="focus-card">
            <span className="badge">Realtime UX</span>
            <h3>Lightweight socket projects</h3>
            <p>
              Trying out chat and multiplayer ideas to practice state management
              and responsive UI patterns.
            </p>
          </article>
        </div>
      </section>

      <section className="section github-section" id="github">
        <div className="section-heading">
          <p className="eyebrow">GitHub</p>
          <h2>Peek at the repos powering these projects.</h2>
          <p>
            I document progress in public so you can see how I learn, refactor,
            and iterate from one build to the next.
          </p>
        </div>
        <div className="github-panel">
          <article
            className="github-card github-profile"
            aria-label="GitHub profile spotlight"
          >
            <div className="github-handle">
              <img
                src="https://github.com/EJ-Edwards.png"
                alt="Eric Edwards GitHub avatar"
                className="github-avatar"
              />
              <div>
                <p className="eyebrow subtle">github.com</p>
                <h3>@EJ-Edwards</h3>
                <p>
                  Daily commits, writeups, and experiments in securing and
                  scaling beginner-friendly stacks.
                </p>
              </div>
            </div>
            <a
              className="btn primary"
              href="https://github.com/EJ-Edwards"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the profile
            </a>
          </article>

          <article
            className="github-card github-stats"
            aria-label="GitHub stats"
          >
            <ul className="github-stats-list">
              <li>
                <span className="stat-value" data-metric="public-repos">
                  20+
                </span>
                <small>public repos</small>
              </li>
              <li>
                <span className="stat-value" data-metric="commits">
                  300+
                </span>
                <small>commits logged</small>
              </li>
              <li>
                <span className="stat-value" data-metric="collabs">5</span>
                <small>open-source collabs</small>
              </li>
            </ul>
            <p className="eyebrow subtle">
              Always open to issues, feedback, and pair sessions.
            </p>
          </article>

          <article
            className="github-card github-repos"
            aria-label="Highlighted repositories"
          >
            <h3>Best projects</h3>
            <ul className="repo-links" aria-label="Repository links">
              <li>
                <div>
                  <strong>Remote Admin Tool</strong>
                  <span>Python automation + telemetry</span>
                </div>
                <a
                  className="inline-link"
                  href="https://github.com/EJ-Edwards/Remote-Admin-Tool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View repo
                </a>
              </li>
              <li>
                <div>
                  <strong>RedSight</strong>
                  <span>AI assisted red teaming cybersecurity tool</span>
                </div>
                <a
                  className="inline-link"
                  href="https://redsight.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Launch website
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="cta-panel" id="contact">
        <div>
          <p className="eyebrow">Next steps</p>
          <h2>Need an entry-level engineer with real project reps?</h2>
        </div>
      </section>
    </>
  );
}
