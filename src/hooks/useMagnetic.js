import { useEffect } from "react";
import { useReducedMotion } from "./useMedia";

export function useMagnetic(rootRef, enabled = true) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const root = rootRef.current;
    if (!root) return;
    const buttons = [...root.querySelectorAll(".magnetic")];
    const cleanups = buttons.map((btn) => {
      const move = (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      };
      const leave = () => {
        btn.style.transform = "";
      };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      return () => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [rootRef, enabled, reduce]);
}
