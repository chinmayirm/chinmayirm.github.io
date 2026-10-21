import { useEffect, useState } from "react";
import { SITE } from "../data";

const NAV = [
  { href: "#home", id: "home", tip: "Home" },
  { href: "#story", id: "story", tip: "Story" },
  { href: "#about", id: "about", tip: "About" },
  { href: "#education", id: "education", tip: "Education" },
  { href: "#experience", id: "experience", tip: "Experience" },
  { href: "#projects", id: "projects", tip: "Projects" },
  { href: "#research", id: "research", tip: "Research" },
  { href: "#creative", id: "creative", tip: "Creative" },
  { href: "#contact", id: "contact", tip: "Contact" },
];

export function ScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector("#scrollProgress i");
    if (!bar) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${p.toFixed(2)}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="scroll-progress" id="scrollProgress" aria-hidden="true">
      <i />
    </div>
  );
}

export function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = document.getElementById("cursorGlow");
    if (!el) return;
    const move = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div className="cursor-glow" id="cursorGlow" aria-hidden="true" />;
}

export function Topbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    if (open) {
      document.querySelectorAll(".mobile-nav a").forEach((a) => a.addEventListener("click", close));
    }
    return () => {
      document.querySelectorAll(".mobile-nav a").forEach((a) => a.removeEventListener("click", close));
    };
  }, [open]);

  return (
    <>
      <header className="topbar">
        <a className="topbar-brand" href="#home">
          Chinmayi RM
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="mobileNav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </header>
      <nav className={`mobile-nav${open ? " open" : ""}`} id="mobileNav" aria-label="Mobile">
        {NAV.map((n) => (
          <a key={n.id} href={n.href} onClick={() => setOpen(false)}>
            {n.tip}
          </a>
        ))}
      </nav>
    </>
  );
}

export function Rail() {
  const [active, setActive] = useState("home");
  const [egg, setEgg] = useState(false);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.5, 0.8] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("egg-mode", egg);
  }, [egg]);

  return (
    <aside className="rail" aria-label="Primary">
      <button
        className={`rail-seal${egg ? " egg-active" : ""}`}
        type="button"
        title="A small secret"
        aria-label="Easter egg"
        onClick={() => setEgg((v) => !v)}
      >
        C
      </button>
      <nav className="rail-nav" id="railNav">
        {NAV.map((n) => (
          <a key={n.id} href={n.href} data-section={n.id} className={active === n.id ? "active" : ""}>
            <span className="tip">{n.tip}</span>
          </a>
        ))}
      </nav>
      <div className="rail-social">
        <a href={SITE.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" rx="0" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a href={SITE.github} target="_blank" rel="noopener" aria-label="GitHub">
          <svg viewBox="0 0 24 24">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
        <a href={`mailto:${SITE.email}`} aria-label="Email">
          <svg viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
      </div>
    </aside>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-line" aria-hidden="true" />
      <p className="footer-name">Chinmayi RM</p>
      <p className="footer-tag">{SITE.tagline}</p>
      <div className="footer-links">
        <a href={SITE.resume} target="_blank" rel="noopener">
          Resume
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
        <a href={SITE.github} target="_blank" rel="noopener">
          GitHub
        </a>
        <a href={`mailto:${SITE.email}`}>Email</a>
      </div>
      <p className="footer-copy">© 2026 Chinmayi RM</p>
    </footer>
  );
}

export function BackTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`back-top${show ? " show" : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
