import { useEffect } from "react";
import { useReducedMotion } from "./useMedia";

export function useReveal(rootRef, enabled = true) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduce) {
      rootRef.current?.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    const nodes = [...root.querySelectorAll(".reveal")];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [rootRef, enabled, reduce]);
}
