import { useEffect, useRef, useState } from "react";
import { ABOUT, PROJECTS, RESEARCH, SKILLS, TERMINAL } from "../data";
import { useReducedMotion } from "../hooks/useMedia";
import { sleep } from "../utils";

function Terminal() {
  const bodyRef = useRef(null);
  const [lines, setLines] = useState([]);
  const reduce = useReducedMotion();
  const booted = useRef(false);

  useEffect(() => {
    const root = document.getElementById("terminal");
    if (!root) return;
    const io = new IntersectionObserver(
      async (entries) => {
        if (!entries.some((e) => e.isIntersecting) || booted.current) return;
        booted.current = true;
        io.disconnect();
        const acc = [];
        for (const line of TERMINAL) {
          acc.push({ type: "cmd", text: `$ ${line.cmd}` });
          setLines([...acc]);
          if (reduce) {
            acc.push({ type: "out", text: line.out });
            setLines([...acc]);
          } else {
            const out = { type: "out", text: "" };
            acc.push(out);
            for (let i = 0; i < line.out.length; i++) {
              out.text = line.out.slice(0, i + 1);
              setLines([...acc]);
              await sleep(8);
            }
          }
          await sleep(reduce ? 0 : 400);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const next = [...lines, { type: "cmd", text: `$ ${raw.trim()}` }];
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const replies = {
      help: "commands: whoami · skills · projects · research · contact · clear · help",
      whoami: "chinmayi rm — software engineer @ makemytrip · AI researcher · creator",
      skills: SKILLS.map(
        (s) =>
          `${s.name.padEnd(18)} ${"▰".repeat(Math.round(s.level / 10))}${"▱".repeat(10 - Math.round(s.level / 10))} ${s.level}%`
      ).join("\n"),
      projects: PROJECTS.map((p) => `→ ${p.title}`).join("\n"),
      research: RESEARCH.map((r) => `→ ${r.title} [${r.status}]`).join("\n"),
      contact: "email chinmayirm.04@gmail.com · github.com/chinmayirm · linkedin",
      ls: "about/  education/  experience/  projects/  research/  creative/",
    };
    next.push({ type: "out", text: replies[cmd] || `command not found: ${cmd} — try help` });
    setLines(next);
  };

  return (
    <div className="terminal" id="terminal" aria-label="Interactive terminal">
      <div className="terminal-bar">
        <span />
        <span />
        <span />
        <em>chinmayi — session</em>
      </div>
      <div className="terminal-body" id="terminalBody" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className={l.type === "cmd" ? "line-cmd" : "line-out"} style={{ whiteSpace: "pre-wrap" }}>
            {l.text}
          </div>
        ))}
      </div>
      <div className="terminal-input-row">
        <span className="prompt">$</span>
        <input
          className="terminal-input"
          type="text"
          autoComplete="off"
          spellCheck={false}
          aria-label="Try a command: whoami, skills, projects, help"
          placeholder="try: whoami · skills · projects · help"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              runCommand(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const listRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="skill-panel">
      <h3 className="skill-heading">Skill matrix</h3>
      <p className="skill-sub">Scan in progress — hover a bar for signal.</p>
      <div className="skill-list" id="skillList" ref={listRef}>
        {SKILLS.map((s) => (
          <div className="skill-item" key={s.name}>
            <div className="skill-top">
              <strong>{s.name}</strong>
              <em>{s.level}%</em>
            </div>
            <div className="skill-track">
              <div className="skill-fill" style={{ width: on ? `${s.level}%` : "0%" }} />
            </div>
            <div className="skill-signal">{s.signal}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <section className="section" id="about">
      <div className="section-head reveal">
        <h2 className="section-title">About Me</h2>
        <p className="section-lede">Three sides of the same practice — tech, research, and making.</p>
      </div>
      <div className="about-grid">
        <div className="about-portrait reveal">
          <img
            src="/assets/images/profile/portrait.jpg"
            alt="Portrait of Chinmayi RM"
            width={440}
            height={586}
            loading="lazy"
          />
        </div>
        <div className="about-body reveal">
          <h3>A builder who still looks up</h3>
          <p>{ABOUT.short}</p>
          <div className={`about-more${open ? " open" : ""}`}>
            {ABOUT.more.split(/\n\n+/).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <button
            className="btn magnetic"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Show less" : "More about me"}{" "}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
          <div className="info-cards">
            {ABOUT.cards.map((c) => (
              <div className="info-card" key={c.label}>
                <div className="label">{c.label}</div>
                <div className="value">{c.value}</div>
              </div>
            ))}
          </div>
          <div className="interests" aria-label="Interests">
            {ABOUT.interests.map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
          <blockquote className="quote-box">“{ABOUT.quote}”</blockquote>
        </div>
      </div>

      <div className="interact-grid reveal">
        <Terminal />
        <Skills />
      </div>
    </section>
  );
}
