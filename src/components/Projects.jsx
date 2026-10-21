import { useEffect, useRef } from "react";
import { PROJECTS, SITE } from "../data";
import { usePinEnabled } from "../hooks/useMedia";
import { sectionProgress } from "../hooks/useSectionProgress";

export default function Projects({ onOpen }) {
  const trackRef = useRef(null);
  const reelRef = useRef(null);
  const barRef = useRef(null);
  const pin = usePinEnabled();

  useEffect(() => {
    const track = trackRef.current;
    const reel = reelRef.current;
    if (!track || !reel) return;

    let current = 0;
    let target = 0;
    let raf = 0;

    const measureMax = () => {
      const wrap = reel.parentElement;
      return Math.max(0, reel.scrollWidth - wrap.clientWidth);
    };

    const apply = (p) => {
      if (!pin) {
        reel.style.transform = "none";
        if (barRef.current) barRef.current.style.width = "0%";
        return;
      }
      const maxX = measureMax();
      reel.style.transform = `translate3d(${-p * maxX}px, 0, 0)`;
      if (barRef.current) barRef.current.style.width = `${(p * 100).toFixed(2)}%`;
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.001) current = target;
      apply(current);
      if (Math.abs(target - current) > 0.001) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const onScroll = () => {
      target = sectionProgress(track);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      target = sectionProgress(track);
      current = target;
      apply(current);
    });
    apply(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pin]);

  return (
    <section className="pin-section" id="projects">
      <div className="pin-track" id="projectTrack" ref={trackRef}>
        <div className="pin-stage">
          <div className="pin-inner">
            <div className="section-head">
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-lede">Scroll to move through the reel — open a card for the full story.</p>
            </div>
            <div className="reel-wrap">
              <div className="reel" id="projectReel" ref={reelRef}>
                {PROJECTS.map((p) => (
                  <button
                    className="project-card"
                    type="button"
                    key={p.id}
                    onClick={() => onOpen(p)}
                  >
                    <div className="pc-img">
                      <img src={p.image} alt="" loading="lazy" width={400} height={240} />
                    </div>
                    <div>
                      <h3 className="pc-title">{p.title}</h3>
                      <p className="pc-blurb">{p.blurb}</p>
                      <div className="pc-foot">
                        <div className="tech-row">
                          {p.tags.map((t) => (
                            <span className="tag" key={t}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="pc-explore">Explore →</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="pin-meta">
              <div className="reel-progress" aria-hidden="true">
                <i ref={barRef} id="reelProgress" />
              </div>
              <a className="btn" href={SITE.github} target="_blank" rel="noopener">
                View all projects{" "}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
