import { useEffect, useState } from "react";

export function useMedia(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function useReducedMotion() {
  return useMedia("(prefers-reduced-motion: reduce)");
}

export function usePinEnabled() {
  const reduce = useReducedMotion();
  const desktop = useMedia("(min-width: 769px)");
  return !reduce && desktop;
}
