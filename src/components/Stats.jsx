import { useEffect, useRef, useState } from "react";
import { STATS } from "../data";
import { useReducedMotion } from "../hooks/useMedia";

const METERS = [92, 95, 88];

function useCountUp(target, decimals, suffix, active) {
  const reduce = useReducedMotion();
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setText(target.toFixed(decimals) + suffix);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const frame = (now) => {
      const t = Math.min(1, (now - start) / 1200);
      const eased = 1 - Math.pow(1 - t, 3);
      setText((target * eased).toFixed(decimals) + suffix);
      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active, target, decimals, suffix, reduce]);

  return text;
}

function StatCard({ stat, meter, active }) {
  const value = useCountUp(stat.value, stat.decimals, stat.suffix, active);
  return (
    <div className={`stat-card${active ? " in-view" : ""}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-meter" aria-hidden="true">
        <i style={{ "--meter": `${meter}%` }} />
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section stats-section" id="pulse" aria-label="Highlights">
      <div className="stats-row reveal stagger" ref={ref}>
        {STATS.map((s, i) => (
          <StatCard key={s.label} stat={s} meter={METERS[i]} active={active} />
        ))}
      </div>
    </section>
  );
}
