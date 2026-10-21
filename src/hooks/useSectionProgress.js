export function sectionProgress(trackEl) {
  if (!trackEl) return 0;
  const rect = trackEl.getBoundingClientRect();
  const total = trackEl.offsetHeight - window.innerHeight;
  if (total <= 0) return 0;
  return Math.min(1, Math.max(0, -rect.top / total));
}
