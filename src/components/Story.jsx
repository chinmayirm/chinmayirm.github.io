import { useEffect, useRef, useState } from "react";
import { usePinEnabled } from "../hooks/useMedia";
import { sectionProgress } from "../hooks/useSectionProgress";

const CLIPS = [
  { src: "/assets/film/clip-01.mp4", label: "Portal" },
  { src: "/assets/film/clip-02.mp4", label: "Corridor" },
  { src: "/assets/film/clip-03.mp4", label: "Gallery" },
];

export default function Story() {
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const videosRef = useRef([]);
  const pin = usePinEnabled();
  const [ready, setReady] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [beat, setBeat] = useState(CLIPS[0].label);
  const [playing, setPlaying] = useState(false);
  const metaRef = useRef({ durations: [0, 0, 0], total: 0 });
  const playRaf = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    const waitForVideos = () =>
      new Promise((resolve) => {
        const tryGrab = () => {
          const vids = videosRef.current.filter(Boolean);
          if (vids.length === CLIPS.length) resolve(vids);
          else timers.push(setTimeout(tryGrab, 50));
        };
        tryGrab();
      });

    (async () => {
      const videos = await waitForVideos();
      if (cancelled) return;

      const durations = [0, 0, 0];

      await Promise.all(
        videos.map(
          (video, i) =>
            new Promise((resolve) => {
              const done = () => {
                durations[i] =
                  video.duration && Number.isFinite(video.duration) ? video.duration : 0;
                resolve();
              };
              if (video.readyState >= 1) done();
              else {
                video.addEventListener("loadedmetadata", done, { once: true });
                video.addEventListener("error", done, { once: true });
                video.load();
              }
            })
        )
      );

      if (cancelled) return;
      const total = durations.reduce((a, b) => a + b, 0);
      if (total < 0.5) {
        setReady(false);
        return;
      }
      metaRef.current = { durations, total };
      videos.forEach((v) => {
        v.pause();
        v.currentTime = 0;
      });
      setReady(true);
      setActiveIdx(0);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const videos = videosRef.current.filter(Boolean);
    if (videos.length !== CLIPS.length) return;

    let target = 0;
    let current = 0;
    let raf = 0;
    let lastClip = -1;

    const resolve = (t) => {
      const { durations, total } = metaRef.current;
      let remaining = Math.min(Math.max(t, 0), Math.max(total - 0.05, 0));
      for (let i = 0; i < durations.length; i++) {
        if (remaining <= durations[i] || i === durations.length - 1) {
          return {
            index: i,
            local: Math.min(remaining, Math.max(durations[i] - 0.05, 0)),
          };
        }
        remaining -= durations[i];
      }
      return { index: 0, local: 0 };
    };

    const apply = (p) => {
      if (barRef.current) barRef.current.style.width = `${(p * 100).toFixed(2)}%`;
      const { total } = metaRef.current;
      if (!total) return;
      const { index, local } = resolve(p * total);
      if (index !== lastClip) {
        lastClip = index;
        setActiveIdx(index);
        setBeat(CLIPS[index].label);
        videos.forEach((v, i) => {
          if (i !== index) v.pause();
        });
      }
      const video = videos[index];
      if (!video) return;
      if (Math.abs(video.currentTime - local) > 0.05) {
        try {
          video.currentTime = local;
        } catch {
          /* seek race */
        }
      }
    };

    const tick = () => {
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.001) current = target;
      apply(current);
      if (Math.abs(target - current) > 0.001) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const onScroll = () => {
      if (!pin) {
        // Mobile / reduced-motion: scrub within the section by scroll position of the block
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const view = window.innerHeight;
        const start = view * 0.7;
        const end = -rect.height + view * 0.3;
        const span = start - end || 1;
        const p = Math.min(1, Math.max(0, (start - rect.top) / span));
        target = p;
        if (!raf) raf = requestAnimationFrame(tick);
        return;
      }
      target = sectionProgress(trackRef.current);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ready, pin]);

  useEffect(() => {
    if (!playing || !ready) return;
    const videos = videosRef.current.filter(Boolean);
    let clip = activeIdx;
    let cancelled = false;

    const run = async () => {
      for (let i = clip; i < videos.length && !cancelled; i++) {
        setActiveIdx(i);
        setBeat(CLIPS[i].label);
        videos.forEach((v, idx) => {
          if (idx !== i) {
            v.pause();
          }
        });
        const v = videos[i];
        try {
          v.currentTime = 0;
          await v.play();
        } catch {
          /* autoplay blocked */
        }
        await new Promise((resolve) => {
          const onEnd = () => {
            v.removeEventListener("ended", onEnd);
            resolve();
          };
          v.addEventListener("ended", onEnd);
        });
      }
      if (!cancelled) setPlaying(false);
    };
    run();
    return () => {
      cancelled = true;
      videos.forEach((v) => v.pause());
      cancelAnimationFrame(playRaf.current);
    };
  }, [playing, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      className={`pin-section story-pin${ready ? " has-film" : " is-empty"}`}
      id="story"
      aria-label="Story film"
    >
      <div className="pin-track" id="storyTrack" ref={trackRef}>
        <div className="pin-stage story-stage">
          {CLIPS.map((clip, i) => (
            <video
              key={clip.src}
              className={`story-video${ready && i === activeIdx ? " is-active" : ""}`}
              ref={(el) => {
                videosRef.current[i] = el;
              }}
              src={clip.src}
              muted
              playsInline
              preload="auto"
              poster={i === 0 ? "/assets/film/clip-01.mp4.png" : undefined}
            />
          ))}
          <div className="story-shade" aria-hidden="true" />
          {ready && (
            <button
              className="btn btn-fill story-play"
              type="button"
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? "Pause film" : "Play film"}
            </button>
          )}
          <div className="story-ui">
            <p className="story-kicker">Story · {beat}</p>
            <h2 className="story-title">Through the night garden</h2>
            <p className="story-hint">
              {ready
                ? playing
                  ? "Playing portal → corridor → gallery"
                  : "Scroll to scrub — or hit Play film"
                : "Loading film…"}
            </p>
            <div className="story-beats" aria-hidden="true">
              {CLIPS.map((c, i) => (
                <span key={c.src} className={i === activeIdx ? "active" : ""}>
                  {c.label}
                </span>
              ))}
            </div>
            <div className="story-progress" aria-hidden="true">
              <i ref={barRef} id="storyProgress" />
            </div>
          </div>
          {!ready && (
            <div className="story-empty">
              <p className="story-empty-title">Loading story film…</p>
              <p>Open http://127.0.0.1:8765/?skip=1 and hard-refresh</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
