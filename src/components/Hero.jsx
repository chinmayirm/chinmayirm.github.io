import { useEffect, useRef, useState } from "react";
import { FLOW, ROLES, SITE } from "../data";
import { useReducedMotion } from "../hooks/useMedia";
import { sleep } from "../utils";

export default function Hero() {
  const reduce = useReducedMotion();
  const [role, setRole] = useState(ROLES[0]);
  const [flowIdx, setFlowIdx] = useState(0);
  const visualRef = useRef(null);

  useEffect(() => {
    if (reduce) {
      setRole(ROLES[0]);
      return;
    }
    let cancelled = false;
    (async () => {
      let ri = 0;
      while (!cancelled) {
        const word = ROLES[ri % ROLES.length];
        for (let i = 0; i <= word.length; i++) {
          if (cancelled) return;
          setRole(word.slice(0, i));
          await sleep(42);
        }
        await sleep(1600);
        for (let i = word.length; i >= 0; i--) {
          if (cancelled) return;
          setRole(word.slice(0, i));
          await sleep(24);
        }
        await sleep(280);
        ri++;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setFlowIdx((i) => (i + 1) % FLOW.length), 1600);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || reduce) return;
    const img = visual.querySelector(".parallax");
    if (!img) return;
    const depth = Number(img.dataset.depth || 0.06);
    const move = (e) => {
      const r = visual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      img.style.transform = `translate(${x * depth * 40}px, ${y * depth * 40}px)`;
    };
    visual.addEventListener("pointermove", move);
    return () => visual.removeEventListener("pointermove", move);
  }, [reduce]);

  return (
    <section className="section" id="home">
      <div className="hero-copy reveal">
        <p className="hero-hello">Hello, I&apos;m</p>
        <h1 className="hero-name">Chinmayi RM</h1>
        <p className="hero-roles" aria-live="polite">
          <span className="typed-role">{role}</span>
          <span className="caret" aria-hidden="true">
            |
          </span>
        </p>
        <p className="hero-intro">
          Building intelligent systems, exploring new frontiers, and finding beauty in the little things.
        </p>
        <div className="flow-strip" aria-hidden="true">
          {FLOW.map((f, i) => (
            <span key={f} className={i === flowIdx ? "active" : ""} data-i={i}>
              {f}
              {i < FLOW.length - 1 ? <em>→</em> : null}
            </span>
          ))}
        </div>
        <div className="btn-row">
          <a className="btn btn-fill magnetic" href="#story">
            Watch the story{" "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a className="btn magnetic" href="#projects">
            Projects
          </a>
          <a className="btn magnetic" href={SITE.resume} target="_blank" rel="noopener">
            Resume
          </a>
        </div>
      </div>

      <div className="hero-visual reveal" ref={visualRef}>
        <img
          className="hero-koi parallax"
          data-depth="0.06"
          src="/assets/images/decorative/koi-circle.jpg"
          alt="Two koi fish in a neon-pink circular composition"
          width={800}
          height={800}
        />
        <div className="scroll-cue">
          <div className="mouse" />
          scroll
        </div>
      </div>
    </section>
  );
}
