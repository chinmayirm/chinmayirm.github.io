import { useCallback, useRef, useState } from "react";
import Portal from "./components/Portal";
import {
  BackTop,
  CursorGlow,
  Footer,
  Rail,
  ScrollProgress,
  Topbar,
} from "./components/Chrome";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Story from "./components/Story";
import About from "./components/About";
import { Education, Experience } from "./components/Timelines";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Creative from "./components/Creative";
import Contact from "./components/Contact";
import { DetailOverlay, Lightbox, ReaderOverlay } from "./components/Overlays";
import { PAINTINGS } from "./data";
import { useReveal } from "./hooks/useReveal";
import { useMagnetic } from "./hooks/useMagnetic";

export default function App() {
  const [entered, setEntered] = useState(() => {
    try {
      return (
        sessionStorage.getItem("portalDone") === "1" ||
        new URLSearchParams(location.search).has("skip")
      );
    } catch {
      return false;
    }
  });
  const siteRef = useRef(null);
  const [project, setProject] = useState(null);
  const [research, setResearch] = useState(null);
  const [blog, setBlog] = useState(null);
  const [artIndex, setArtIndex] = useState(null);

  useReveal(siteRef, entered);
  useMagnetic(siteRef, entered);

  const onEnter = useCallback(() => setEntered(true), []);

  return (
    <>
      {!entered && <Portal onEnter={onEnter} />}

      <div
        className="site"
        id="site"
        ref={siteRef}
        {...(!entered ? { inert: true, "aria-hidden": true } : {})}
        style={!entered ? { visibility: "hidden" } : undefined}
      >
        <a className="skip-link" href="#home">
          Skip to content
        </a>
        <CursorGlow />
        <ScrollProgress />
        <Topbar />
        <Rail />

        <main className="main">
          <Hero />
          <Story />
          <Stats />
          <About />
          <Education />
          <Experience />
          <Projects
            onOpen={(p) => {
              setResearch(null);
              setProject(p);
            }}
          />
          <Research
            onOpen={(r) => {
              setProject(null);
              setResearch(r);
            }}
          />
          <Creative onBlog={setBlog} onArt={setArtIndex} />
          <Contact />
        </main>

        <Footer />
        <BackTop />

        <DetailOverlay
          project={project}
          research={research}
          onClose={() => {
            setProject(null);
            setResearch(null);
          }}
        />
        <ReaderOverlay post={blog} onClose={() => setBlog(null)} />
        <Lightbox
          index={artIndex}
          onClose={() => setArtIndex(null)}
          onPrev={() =>
            setArtIndex((i) => (i == null ? i : (i + PAINTINGS.length - 1) % PAINTINGS.length))
          }
          onNext={() => setArtIndex((i) => (i == null ? i : (i + 1) % PAINTINGS.length))}
        />
      </div>
    </>
  );
}
