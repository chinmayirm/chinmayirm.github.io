import { useEffect } from "react";
import { PAINTINGS } from "../data";
import { formatDate } from "../utils";

function OverlayShell({ open, onClose, labelledBy, children, className = "modal" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="overlay open"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={className}>
        <button className="modal-close" type="button" aria-label="Close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export function DetailOverlay({ project, research, onClose }) {
  const open = Boolean(project || research);
  if (project) {
    return (
      <OverlayShell open={open} onClose={onClose} labelledBy="modalTitle">
        <img className="modal-img" src={project.image} alt="" />
        <h3 id="modalTitle">{project.title}</h3>
        <div className="tech-row" style={{ marginBottom: "1rem" }}>
          {project.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <div className="modal-block">
          <h4>Overview</h4>
          <p>{project.overview}</p>
        </div>
        <div className="modal-block">
          <h4>Problem</h4>
          <p>{project.problem}</p>
        </div>
        <div className="modal-block">
          <h4>Approach</h4>
          <p>{project.approach}</p>
        </div>
        <div className="modal-block">
          <h4>Results</h4>
          <p>{project.results}</p>
        </div>
        {project.links?.length ? (
          <div className="btn-row">
            {project.links.map((l) => (
              <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener">
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </OverlayShell>
    );
  }

  if (research) {
    return (
      <OverlayShell open={open} onClose={onClose} labelledBy="modalTitle">
        <h3 id="modalTitle">{research.title}</h3>
        <div className="rc-domain" style={{ marginBottom: "0.75rem" }}>
          {research.domain}
        </div>
        <div className="tech-row" style={{ marginBottom: "1rem" }}>
          {research.tech.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <div className="modal-block">
          <h4>Abstract</h4>
          <p>{research.abstract}</p>
        </div>
        <div className="modal-block">
          <h4>Methodology</h4>
          <p>{research.methodology}</p>
        </div>
        <div className="modal-block">
          <h4>Status</h4>
          <p>{research.status}</p>
        </div>
      </OverlayShell>
    );
  }

  return null;
}

export function ReaderOverlay({ post, onClose }) {
  return (
    <OverlayShell open={Boolean(post)} onClose={onClose} labelledBy="readerTitle" className="reader">
      {post ? (
        <div>
          <div className="bc-meta" style={{ marginBottom: "0.5rem" }}>
            {formatDate(post.date)} · {post.readTime}
          </div>
          <h2 id="readerTitle">{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      ) : null}
    </OverlayShell>
  );
}

export function Lightbox({ index, onClose, onPrev, onNext }) {
  const art = index != null ? PAINTINGS[index] : null;
  useEffect(() => {
    if (index == null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onPrev, onNext]);

  return (
    <OverlayShell open={Boolean(art)} onClose={onClose} className="lightbox" labelledBy={undefined}>
      {art ? (
        <>
          <button className="lb-nav lb-prev" type="button" aria-label="Previous" onClick={onPrev}>
            ‹
          </button>
          <button className="lb-nav lb-next" type="button" aria-label="Next" onClick={onNext}>
            ›
          </button>
          <img className="lightbox-img" src={art.image} alt={art.title} />
          <div className="lightbox-meta">
            <strong>{art.title}</strong>
            <span>
              {art.medium} · {art.date}
            </span>
            <p>{art.caption}</p>
          </div>
        </>
      ) : null}
    </OverlayShell>
  );
}
