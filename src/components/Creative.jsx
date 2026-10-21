import { useState } from "react";
import { BLOG, OTHER_CREATIVE, PAINTINGS } from "../data";
import { formatDate } from "../utils";

export default function Creative({ onBlog, onArt }) {
  const [tab, setTab] = useState("blog");

  return (
    <section className="section" id="creative">
      <div className="section-head reveal">
        <h2 className="section-title">Beyond the Code</h2>
        <p className="section-lede">Not everything needs to be optimised.</p>
      </div>
      <div className="tabs reveal" role="tablist" aria-label="Creative space">
        {[
          { id: "blog", label: "Blog" },
          { id: "paint", label: "Art Gallery" },
          { id: "other", label: "Other" },
        ].map((t) => (
          <button
            key={t.id}
            className="tab"
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={`tab-panel${tab === "blog" ? " active" : ""}`} role="tabpanel" hidden={tab !== "blog"}>
        <div className="blog-grid">
          {BLOG.map((b) => (
            <button className="blog-card" type="button" key={b.id} onClick={() => onBlog(b)}>
              <div className="bc-img">
                <img src={b.cover} alt="" loading="lazy" width={640} height={360} />
              </div>
              <div className="bc-body">
                <div className="bc-meta">
                  {formatDate(b.date)} · {b.readTime}
                </div>
                <h3 className="bc-title">{b.title}</h3>
                <p className="bc-excerpt">{b.excerpt}</p>
                <span className="bc-read">Read article →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={`tab-panel${tab === "paint" ? " active" : ""}`} role="tabpanel" hidden={tab !== "paint"}>
        <div className="masonry">
          {PAINTINGS.map((a, i) => (
            <button
              className="art-item"
              type="button"
              key={a.id}
              aria-label={a.title}
              onClick={() => onArt(i)}
            >
              <img src={a.image} alt={`${a.title} — ${a.medium}`} loading="lazy" />
              <span className="art-cap">{a.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`tab-panel${tab === "other" ? " active" : ""}`} role="tabpanel" hidden={tab !== "other"}>
        <div className="other-list">
          {OTHER_CREATIVE.map((o) => (
            <div className="other-item" key={o.title}>
              <h4>{o.title}</h4>
              <p>{o.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
