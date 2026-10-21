import { useEffect, useRef, useState } from "react";
import { RESEARCH } from "../data";
import { usePinEnabled, useReducedMotion } from "../hooks/useMedia";
import { sectionProgress } from "../hooks/useSectionProgress";

export default function Research({ onOpen }) {
  const trackRef = useRef(null);
  const pin = usePinEnabled();
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (!pin) {
        if (barRef.current) barRef.current.style.width = "0%";
        return;
      }
      const p = sectionProgress(track);
      if (barRef.current) barRef.current.style.width = `${(p * 100).toFixed(2)}%`;
      const i = Math.min(RESEARCH.length - 1, Math.floor(p * RESEARCH.length * 0.999));
      setIdx(i);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pin]);

  const goDot = (i) => {
    const track = trackRef.current;
    if (!track || !pin) return;
    const total = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY + ((i + 0.15) / RESEARCH.length) * total;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="pin-section research-pin" id="research">
      <div className="pin-track" id="researchTrack" ref={trackRef}>
        <div className="pin-stage research-stage">
          <div className="lab-layout">
            <aside className="lab-sticky">
              <p className="lab-kicker">Research Lab</p>
              <h2 className="lab-title">Lab notes</h2>
              <p className="lab-lede">Sticky notebook — scroll to advance each experiment.</p>
              <div className="lab-dots" aria-hidden="true">
                {RESEARCH.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === idx ? "active" : ""}
                    aria-label={`Note ${i + 1}`}
                    onClick={() => goDot(i)}
                  />
                ))}
              </div>
              <div className="lab-progress" aria-hidden="true">
                <i ref={barRef} id="labProgress" />
              </div>
              <p className="lab-index">
                {String(idx + 1).padStart(2, "0")} / {String(RESEARCH.length).padStart(2, "0")}
              </p>
            </aside>
            <div className="lab-pages" id="researchPages">
              {RESEARCH.map((r, i) => (
                <div key={r.id} className={`lab-page${i === idx ? " active" : ""}`}>
                  <button className="research-card" type="button" onClick={() => onOpen(r)}>
                    <div className="rc-domain">{r.domain}</div>
                    <h3 className="rc-title">{r.title}</h3>
                    <p className="rc-abstract">{r.abstract}</p>
                    <div className="tech-row" style={{ margin: "0.75rem 0" }}>
                      {r.tech.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="rc-status">{r.status}</div>
                    <p className="pc-explore" style={{ marginTop: "0.85rem" }}>
                      Open notes →
                    </p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
