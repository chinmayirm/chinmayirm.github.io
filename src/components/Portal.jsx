import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useMedia";

export default function Portal({ onEnter }) {
  const canvasRef = useRef(null);
  const portalRef = useRef(null);
  const btnRef = useRef(null);
  const reduce = useReducedMotion();
  const state = useRef({
    mx: 0.5,
    my: 0.5,
    warp: 0,
    warping: false,
    lines: [],
    raf: 0,
  });

  useEffect(() => {
    const skip =
      sessionStorage.getItem("portalDone") === "1" ||
      new URLSearchParams(location.search).has("skip");
    if (skip) {
      onEnter();
      return;
    }

    document.body.classList.add("is-portal");
    const canvas = canvasRef.current;
    const portal = portalRef.current;
    if (!canvas || !portal) return;
    const ctx = canvas.getContext("2d");
    const s = state.current;

    function seedLines() {
      s.lines = [];
      const count = Math.min(48, Math.floor(window.innerWidth / 28));
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.08;
        s.lines.push({
          angle,
          len: 0.35 + Math.random() * 0.55,
          speed: 0.2 + Math.random() * 0.55,
          width: 0.6 + Math.random() * 1.4,
          alpha: 0.15 + Math.random() * 0.35,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      seedLines();
    }

    function draw(t) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      ctx.clearRect(0, 0, vw, vh);
      const cx = vw * (0.5 + (s.mx - 0.5) * 0.08);
      const cy = vh * (0.5 + (s.my - 0.5) * 0.08);
      const reach = Math.hypot(vw, vh) * (0.55 + s.warp * 1.4);

      const wash = ctx.createRadialGradient(cx, cy, 20, cx, cy, reach * 0.55);
      wash.addColorStop(0, `rgba(219, 110, 150, ${0.08 + s.warp * 0.25})`);
      wash.addColorStop(0.45, "rgba(196, 90, 130, 0.04)");
      wash.addColorStop(1, "rgba(5, 5, 7, 0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, vw, vh);

      for (const line of s.lines) {
        const wobble = Math.sin(t * 0.0015 * line.speed + line.pulse) * 0.04;
        const a = line.angle + wobble + (s.mx - 0.5) * 0.15;
        const start = reach * (0.08 + s.warp * 0.05);
        const end = reach * (line.len + s.warp * 0.9);
        const x1 = cx + Math.cos(a) * start;
        const y1 = cy + Math.sin(a) * start;
        const x2 = cx + Math.cos(a) * end;
        const y2 = cy + Math.sin(a) * end;
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        const alpha = Math.min(1, line.alpha + s.warp * 0.7);
        grad.addColorStop(0, `rgba(255, 180, 210, ${alpha})`);
        grad.addColorStop(0.4, `rgba(219, 110, 150, ${alpha * 0.85})`);
        grad.addColorStop(1, "rgba(196, 90, 130, 0)");
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = line.width + s.warp * 2.2;
        ctx.lineCap = "round";
        ctx.shadowColor = "rgba(219, 110, 150, 0.65)";
        ctx.shadowBlur = 8 + s.warp * 24;
        ctx.stroke();
      }

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18 + s.warp * 120);
      core.addColorStop(0, `rgba(255, 255, 255, ${0.55 + s.warp * 0.45})`);
      core.addColorStop(0.25, `rgba(219, 110, 150, ${0.45 + s.warp * 0.4})`);
      core.addColorStop(1, "rgba(196, 90, 130, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 18 + s.warp * 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    let finished = false;
    function finish(animated) {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(s.raf);
      document.body.classList.remove("is-portal");
      document.body.classList.add("entered");
      portal.classList.add("portal-exit");
      sessionStorage.setItem("portalDone", "1");
      setTimeout(() => onEnter(), animated && !reduce ? 480 : 0);
    }

    function loop(t) {
      if (s.warping) {
        s.warp += (1 - s.warp) * 0.045;
        if (s.warp > 0.98) {
          finish(true);
          return;
        }
      }
      draw(t || 0);
      s.raf = requestAnimationFrame(loop);
    }

    function startWarp() {
      if (s.warping) return;
      s.warping = true;
      portal.classList.add("is-warping");
      if (btnRef.current) btnRef.current.disabled = true;
      if (reduce) finish(false);
    }

    const onMove = (e) => {
      s.mx = e.clientX / window.innerWidth;
      s.my = e.clientY / window.innerHeight;
      portal.style.setProperty("--mx", `${e.clientX}px`);
      portal.style.setProperty("--my", `${e.clientY}px`);
    };

    portal.addEventListener("pointermove", onMove, { passive: true });
    btnRef.current?.addEventListener("click", startWarp);
    window.addEventListener("resize", resize);
    resize();
    s.raf = requestAnimationFrame(loop);
    btnRef.current?.focus();

    return () => {
      cancelAnimationFrame(s.raf);
      portal.removeEventListener("pointermove", onMove);
      btnRef.current?.removeEventListener("click", startWarp);
      window.removeEventListener("resize", resize);
      document.body.classList.remove("is-portal");
    };
  }, [onEnter, reduce]);

  return (
    <div className="portal" id="portal" ref={portalRef} role="dialog" aria-modal="true" aria-labelledby="portalName">
      <canvas className="portal-canvas" id="portalCanvas" ref={canvasRef} aria-hidden="true" />
      <div className="portal-vignette" aria-hidden="true" />
      <div className="portal-content">
        <div className="portal-photo-wrap">
          <img
            className="portal-photo"
            src="/assets/images/profile/portrait.jpg"
            alt="Portrait of Chinmayi RM"
            width={200}
            height={200}
          />
        </div>
        <p className="portal-hello">Welcome</p>
        <h1 className="portal-name" id="portalName">
          Chinmayi RM
        </h1>
        <p className="portal-roles">Software Engineer · AI Researcher · Creator</p>
        <button className="btn btn-fill portal-cta magnetic" id="portalStart" type="button" ref={btnRef}>
          Let&apos;s get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
        <p className="portal-hint">Move your cursor — then step through the light</p>
      </div>
    </div>
  );
}
