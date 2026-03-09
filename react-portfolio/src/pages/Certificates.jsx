export default function Certificates() {
  return (
    <>
      <section className="section certificates-section">
        <div className="section-heading">
          <p className="eyebrow">Recognition</p>
          <h1>My Certificates</h1>
          <p>Proof that I put as much rigor into learning as I do into building.</p>
        </div>
        <ul className="certificates-list">
          <li className="certificate-item">
            <div className="certificate-title">All Star Code Certificate</div>
            <div className="certificate-date">Date Awarded: 08-18-2025</div>
            <a className="inline-link" href="/assets/-d237.png" target="_blank">
              View Certificate
            </a>
          </li>

          <li className="certificate-item">
            <div className="certificate-title">
              Google Cybersecurity Certificate
            </div>
            <div className="certificate-date">Date Awarded: 08-15-2025</div>
            <a
              className="inline-link"
              href="/assets/Coursera Google cert.png"
              target="_blank"
            >
              View Certificate
            </a>
            <p className="certificate-note">
              I no longer have access to the Coursera account for this course,
              but the linked confirmation email documents my completion and is
              available for verification.
            </p>
          </li>
        </ul>
      </section>
    </>
  );
}
