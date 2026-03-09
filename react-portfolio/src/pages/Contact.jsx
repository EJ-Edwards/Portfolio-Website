export default function Contact() {
  return (
    <>
      <section className="section contact-section">
        <div className="section-heading">
          <p className="eyebrow">Get in touch</p>
          <h1>Contact Eric</h1>
          <p>
            Share a repo, Figma, or simple idea brief. I respond fast with a
            lightweight plan, timeline, and next steps.
          </p>
        </div>
        <div className="contact-list">
          <article className="contact-card">
            <h2>LinkedIn</h2>
            <a
              href="https://www.linkedin.com/in/eric-edwards-6b63b22ba/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eric Edwards on LinkedIn"
            >
              Eric Edwards
            </a>
          </article>
          <article className="contact-card">
            <h2>Email</h2>
            <a href="mailto:ee1912136@gmail.com" aria-label="Email Eric Edwards">
              ee1912136@gmail.com
            </a>
          </article>
          <article className="contact-card">
            <h2>Bluesky</h2>
            <a
              href="https://bsky.app/profile/ejwebhacks.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eric Edwards on Bluesky"
            >
              @ejwebhacks
            </a>
          </article>
          <article className="contact-card">
            <h2>Phone</h2>
            <p className="contact-detail">+1 (716) 248-8510</p>
          </article>
        </div>
      </section>
    </>
  );
}
