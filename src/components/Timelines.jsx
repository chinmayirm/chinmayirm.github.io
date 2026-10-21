import { useState } from "react";
import { EDUCATION, EXPERIENCE } from "../data";

export function Education() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="section" id="education">
      <div className="section-head reveal">
        <h2 className="section-title">Education</h2>
        <p className="section-lede">An elegant path from classrooms to research labs.</p>
      </div>
      <div className="timeline reveal">
        {EDUCATION.map((e) => {
          const open = openId === e.id;
          return (
            <article
              key={e.id}
              className={`tl-item${open ? " open" : ""}`}
              tabIndex={0}
              role="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : e.id)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setOpenId(open ? null : e.id);
                }
              }}
            >
              <div className="tl-years">{e.years}</div>
              <h3 className="tl-title">
                {e.degree} · {e.field}
              </h3>
              <div className="tl-meta">{e.institution}</div>
              <div className="tl-achieve">{e.achievement}</div>
              <div className="tl-detail">{e.detail}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Experience() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="section" id="experience">
      <div className="section-head reveal">
        <h2 className="section-title">Work Experience</h2>
        <p className="section-lede">From internships to production AI — click a role to expand.</p>
      </div>
      <div className="timeline reveal">
        {EXPERIENCE.map((e) => {
          const open = openId === e.id;
          return (
            <article
              key={e.id}
              className={`tl-item${open ? " open" : ""}`}
              tabIndex={0}
              role="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : e.id)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setOpenId(open ? null : e.id);
                }
              }}
            >
              <div className="tl-years">{e.dates}</div>
              <h3 className="tl-title">{e.role}</h3>
              <div className="tl-meta">{e.org}</div>
              <div className="tl-achieve">{e.short}</div>
              <div className="tl-detail">
                <div className="tech-row">
                  {e.tech.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="contrib-list">
                  {e.contributions.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
