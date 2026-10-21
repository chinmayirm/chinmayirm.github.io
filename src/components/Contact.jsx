import { SITE } from "../data";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="section-head reveal">
        <h2 className="section-title">Let&apos;s Connect</h2>
      </div>
      <div className="contact-wrap reveal">
        <div className="contact-copy">
          <p>Interested in collaborating, researching, or just saying hello? The door stays open.</p>
          <div className="btn-row">
            <a className="btn btn-fill" href={`mailto:${SITE.email}`}>
              Get in Touch{" "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a className="btn" href={SITE.resume} target="_blank" rel="noopener">
              Resume
            </a>
            <a className="btn" href={SITE.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a className="btn" href={SITE.github} target="_blank" rel="noopener">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
