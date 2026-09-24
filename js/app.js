import {
  ABOUT,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  RESEARCH,
  BLOG,
  PAINTINGS,
  OTHER_CREATIVE,
  ROLES,
  STATS,
  SKILLS,
  FLOW,
  TERMINAL,
} from "./data.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let artIndex = 0;
let lastFocus = null;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function renderAbout() {
  document.getElementById("aboutShort").textContent = ABOUT.short;
  document.getElementById("aboutMore").innerHTML = ABOUT.more
    .split(/\n\n+/)
    .map((p) => `<p>${p}</p>`)
    .join("");
  document.getElementById("quoteBox").textContent = `“${ABOUT.quote}”`;
  document.getElementById("infoCards").innerHTML = ABOUT.cards
    .map(
      (c) =>
        `<div class="info-card"><div class="label">${c.label}</div><div class="value">${c.value}</div></div>`
    )
    .join("");
  document.getElementById("interests").innerHTML = ABOUT.interests
    .map((i) => `<span>${i}</span>`)
    .join("");
}

function renderFlow() {
  const el = document.getElementById("flowStrip");
  if (!el) return;
  el.innerHTML = FLOW.map((f, i) => {
    const arrow = i < FLOW.length - 1 ? `<em>→</em>` : "";
    return `<span data-i="${i}">${f}</span>${arrow}`;
  }).join("");
  let i = 0;
  const nodes = el.querySelectorAll("span");
  const tick = () => {
    nodes.forEach((n) => n.classList.remove("active"));
    nodes[i % nodes.length].classList.add("active");
    i++;
  };
  tick();
  if (!reduceMotion) setInterval(tick, 1600);
}

function renderStats() {
  const el = document.getElementById("statsRow");
  const meters = [92, 95, 88];
  el.innerHTML = STATS.map(
    (s, i) => `
    <div class="stat-card" data-stat="${i}">
      <div class="stat-value" data-target="${s.value}" data-decimals="${s.decimals}" data-suffix="${s.suffix}">0</div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-meter" aria-hidden="true"><i style="--meter:${meters[i]}%"></i></div>
    </div>`
  ).join("");
  el.classList.add("stagger");
}

function renderSkills() {
  const el = document.getElementById("skillList");
  el.innerHTML = SKILLS.map(
    (s) => `
    <div class="skill-item">
      <div class="skill-top"><strong>${s.name}</strong><em>${s.level}%</em></div>
      <div class="skill-track"><div class="skill-fill" data-level="${s.level}"></div></div>
      <div class="skill-signal">${s.signal}</div>
    </div>`
  ).join("");
}

function renderEducation() {
  const el = document.getElementById("eduTimeline");
  el.innerHTML = EDUCATION.map(
    (e) => `
    <article class="tl-item" data-id="${e.id}" tabindex="0" role="button" aria-expanded="false">
      <div class="tl-years">${e.years}</div>
      <h3 class="tl-title">${e.degree} · ${e.field}</h3>
      <div class="tl-meta">${e.institution}</div>
      <div class="tl-achieve">${e.achievement}</div>
      <div class="tl-detail">${e.detail}</div>
    </article>`
  ).join("");
}

function renderExperience() {
  const el = document.getElementById("expTimeline");
  el.innerHTML = EXPERIENCE.map(
    (e) => `
    <article class="tl-item" data-id="${e.id}" tabindex="0" role="button" aria-expanded="false">
      <div class="tl-years">${e.dates}</div>
      <h3 class="tl-title">${e.role}</h3>
      <div class="tl-meta">${e.org}</div>
      <div class="tl-achieve">${e.short}</div>
      <div class="tl-detail">
        <div class="tech-row">${e.tech.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <ul class="contrib-list">${e.contributions.map((c) => `<li>${c}</li>`).join("")}</ul>
      </div>
    </article>`
  ).join("");
}

function renderProjects() {
  const el = document.getElementById("projectGrid");
  el.innerHTML = PROJECTS.map(
    (p) => `
    <button class="project-card" type="button" data-project="${p.id}">
      <div class="pc-img"><img src="${p.image}" alt="" loading="lazy" width="240" height="180" /></div>
      <div>
        <h3 class="pc-title">${p.title}</h3>
        <p class="pc-blurb">${p.blurb}</p>
        <div class="pc-foot">
          <div class="tech-row">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          <span class="pc-explore">Explore →</span>
        </div>
      </div>
    </button>`
  ).join("");
  el.classList.add("stagger");
}

function renderResearch() {
  const el = document.getElementById("researchGrid");
  el.innerHTML = RESEARCH.map(
    (r) => `
    <button class="research-card" type="button" data-research="${r.id}">
      <div class="rc-domain">${r.domain}</div>
      <h3 class="rc-title">${r.title}</h3>
      <p class="rc-abstract">${r.abstract}</p>
      <div class="rc-status">${r.status}</div>
    </button>`
  ).join("");
  el.classList.add("stagger");
}

function renderBlog() {
  const el = document.getElementById("blogGrid");
  el.innerHTML = BLOG.map(
    (b) => `
    <button class="blog-card" type="button" data-blog="${b.id}">
      <div class="bc-img"><img src="${b.cover}" alt="" loading="lazy" width="640" height="360" /></div>
      <div class="bc-body">
        <div class="bc-meta">${formatDate(b.date)} · ${b.readTime}</div>
        <h3 class="bc-title">${b.title}</h3>
        <p class="bc-excerpt">${b.excerpt}</p>
        <span class="bc-read">Read article →</span>
      </div>
    </button>`
  ).join("");
}

function renderArt() {
  const el = document.getElementById("artMasonry");
  el.innerHTML = PAINTINGS.map(
    (a, i) => `
    <button class="art-item" type="button" data-art="${i}" aria-label="${a.title}">
      <img src="${a.image}" alt="${a.title} — ${a.medium}" loading="lazy" />
      <span class="art-cap">${a.title}</span>
    </button>`
  ).join("");
}

function renderOther() {
  document.getElementById("otherList").innerHTML = OTHER_CREATIVE.map(
    (o) => `<div class="other-item"><h4>${o.title}</h4><p>${o.note}</p></div>`
  ).join("");
}

function formatDate(iso) {
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

async function initTyping() {
  const el = document.getElementById("typedRole");
  if (!el) return;
  if (reduceMotion) {
    el.textContent = ROLES[0];
    return;
  }
  let ri = 0;
  while (true) {
    const word = ROLES[ri % ROLES.length];
    for (let i = 0; i <= word.length; i++) {
      el.textContent = word.slice(0, i);
      await sleep(42);
    }
    await sleep(1600);
    for (let i = word.length; i >= 0; i--) {
      el.textContent = word.slice(0, i);
      await sleep(24);
    }
    await sleep(280);
    ri++;
  }
}

function appendTerm(html) {
  const body = document.getElementById("terminalBody");
  body.insertAdjacentHTML("beforeend", html);
  body.scrollTop = body.scrollHeight;
}

async function bootTerminal() {
  const body = document.getElementById("terminalBody");
  if (!body) return;
  body.innerHTML = "";
  for (const line of TERMINAL) {
    appendTerm(`<div class="line-cmd">$ ${line.cmd}</div>`);
    if (reduceMotion) {
      appendTerm(`<div class="line-out">${line.out}</div>`);
    } else {
      const out = document.createElement("div");
      out.className = "line-out";
      body.appendChild(out);
      for (let i = 0; i < line.out.length; i++) {
        out.textContent = line.out.slice(0, i + 1);
        body.scrollTop = body.scrollHeight;
        await sleep(8);
      }
    }
    await sleep(reduceMotion ? 0 : 400);
  }
}

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  appendTerm(`<div class="line-cmd">$ ${raw.trim()}</div>`);
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
    clear: "__CLEAR__",
    ls: "about/  education/  experience/  projects/  research/  creative/",
  };
  if (cmd === "clear") {
    document.getElementById("terminalBody").innerHTML = "";
    return;
  }
  const out = replies[cmd] || `command not found: ${cmd} — try help`;
  appendTerm(`<div class="line-out">${out}</div>`);
}

function initTerminal() {
  const input = document.getElementById("terminalInput");
  if (!input) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        bootTerminal();
        io.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  io.observe(document.getElementById("terminal"));

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runCommand(input.value);
      input.value = "";
    }
  });
}

function animateValue(el, target, decimals, suffix, duration = 1200) {
  if (reduceMotion) {
    el.textContent = target.toFixed(decimals) + suffix;
    return;
  }
  const start = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function initCounters() {
  const row = document.getElementById("statsRow");
  if (!row) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      row.querySelectorAll(".stat-card").forEach((card) => card.classList.add("in-view"));
      row.querySelectorAll(".stat-value").forEach((el) => {
        animateValue(
          el,
          parseFloat(el.dataset.target),
          parseInt(el.dataset.decimals, 10),
          el.dataset.suffix || ""
        );
      });
      io.disconnect();
    },
    { threshold: 0.4 }
  );
  io.observe(row);
}

function initSkillBars() {
  const list = document.getElementById("skillList");
  if (!list) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      list.querySelectorAll(".skill-fill").forEach((bar) => {
        bar.style.width = bar.dataset.level + "%";
      });
      io.disconnect();
    },
    { threshold: 0.25 }
  );
  io.observe(list);
}

function initScrollProgress() {
  const bar = document.querySelector("#scrollProgress i");
  if (!bar) return;
  window.addEventListener(
    "scroll",
    () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = p.toFixed(2) + "%";
    },
    { passive: true }
  );
}

function initMagnetic() {
  if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

function openOverlay(id) {
  const el = document.getElementById(id);
  lastFocus = document.activeElement;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("open"));
  document.body.style.overflow = "hidden";
  const closeBtn = el.querySelector("[data-close]");
  if (closeBtn) closeBtn.focus();
}

function closeOverlay(id) {
  const el = document.getElementById(id);
  el.classList.remove("open");
  setTimeout(() => {
    el.hidden = true;
    if (![...document.querySelectorAll(".overlay.open")].length) {
      document.body.style.overflow = "";
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }, 280);
}

function closeAllOverlays() {
  ["detailOverlay", "readerOverlay", "lightboxOverlay"].forEach((id) => {
    const el = document.getElementById(id);
    if (el.classList.contains("open")) closeOverlay(id);
  });
}

function openProject(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  document.getElementById("detailContent").innerHTML = `
    <img class="modal-img" src="${p.image}" alt="" />
    <h3 id="modalTitle">${p.title}</h3>
    <div class="tech-row" style="margin-bottom:1rem">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    <div class="modal-block"><h4>Overview</h4><p>${p.overview}</p></div>
    <div class="modal-block"><h4>Problem</h4><p>${p.problem}</p></div>
    <div class="modal-block"><h4>Approach</h4><p>${p.approach}</p></div>
    <div class="modal-block"><h4>Results</h4><p>${p.results}</p></div>
    ${
      p.links.length
        ? `<div class="modal-links">${p.links
            .map((l) => `<a class="btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`)
            .join("")}</div>`
        : ""
    }`;
  openOverlay("detailOverlay");
}

function openResearch(id) {
  const r = RESEARCH.find((x) => x.id === id);
  if (!r) return;
  document.getElementById("detailContent").innerHTML = `
    <h3 id="modalTitle">${r.title}</h3>
    <div class="rc-domain" style="margin-bottom:1rem">${r.domain}</div>
    <div class="modal-block"><h4>Abstract</h4><p>${r.abstract}</p></div>
    <div class="modal-block"><h4>Methodology</h4><p>${r.methodology}</p></div>
    <div class="modal-block"><h4>Status</h4><p>${r.status}</p></div>
    <div class="modal-block"><h4>Technologies</h4>
      <div class="tech-row">${r.tech.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    </div>`;
  openOverlay("detailOverlay");
}

function openBlog(id) {
  const b = BLOG.find((x) => x.id === id);
  if (!b) return;
  document.getElementById("readerContent").innerHTML = `
    <img class="reader-cover" src="${b.cover}" alt="" />
    <div class="reader-meta">${formatDate(b.date)} · ${b.readTime}</div>
    <h2 id="readerTitle">${b.title}</h2>
    <div class="reader-body">${b.body}</div>`;
  openOverlay("readerOverlay");
}

function openArt(i) {
  artIndex = ((i % PAINTINGS.length) + PAINTINGS.length) % PAINTINGS.length;
  const a = PAINTINGS[artIndex];
  const img = document.getElementById("lbImg");
  img.src = a.image;
  img.alt = `${a.title} — ${a.medium}`;
  document.getElementById("lbMeta").innerHTML = `
    <h3>${a.title}</h3>
    <p>${a.medium} · ${a.date}</p>
    <p>${a.caption}</p>`;
  openOverlay("lightboxOverlay");
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const panelId = tab.getAttribute("aria-controls");
      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      document.querySelectorAll(".tab-panel").forEach((p) => {
        const on = p.id === panelId;
        p.classList.toggle("active", on);
        p.hidden = !on;
      });
    });
  });
}

function initTimelines() {
  document.querySelectorAll(".timeline").forEach((tl) => {
    tl.addEventListener("click", (e) => {
      const item = e.target.closest(".tl-item");
      if (!item) return;
      toggleTl(item);
    });
    tl.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const item = e.target.closest(".tl-item");
      if (!item) return;
      e.preventDefault();
      toggleTl(item);
    });
  });
}

function toggleTl(item) {
  const open = item.classList.contains("open");
  item.parentElement.querySelectorAll(".tl-item").forEach((i) => {
    i.classList.remove("open");
    i.setAttribute("aria-expanded", "false");
  });
  if (!open) {
    item.classList.add("open");
    item.setAttribute("aria-expanded", "true");
  }
}

function initNav() {
  const sections = ["home", "about", "education", "experience", "projects", "research", "creative", "contact"];
  const railLinks = [...document.querySelectorAll("#railNav a")];
  const mobileLinks = [...document.querySelectorAll("#mobileNav a")];

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        [...railLinks, ...mobileLinks].forEach((a) => {
          const match = a.getAttribute("href") === `#${id}`;
          if (match) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  menuBtn.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "Close" : "Menu";
  });
  mobileLinks.forEach((a) =>
    a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "Menu";
    })
  );
}

function initReveal() {
  if (reduceMotion) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

function initHero() {
  const visual = document.getElementById("heroVisual");
  if (!visual || reduceMotion) return;

  for (let i = 0; i < 10; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = `${8 + Math.random() * 84}%`;
    p.style.animationDuration = `${10 + Math.random() * 14}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    p.style.width = `${6 + Math.random() * 6}px`;
    p.style.height = `${8 + Math.random() * 6}px`;
    p.style.opacity = String(0.2 + Math.random() * 0.25);
    visual.appendChild(p);
  }

  const layers = visual.querySelectorAll(".parallax");
  visual.addEventListener("mousemove", (e) => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    layers.forEach((layer) => {
      const d = parseFloat(layer.dataset.depth || "0.1");
      layer.style.transform = `translate(${x * d * 40}px, ${y * d * 28}px)`;
    });
  });
  visual.addEventListener("mouseleave", () => {
    layers.forEach((layer) => {
      layer.style.transform = "translate(0,0)";
    });
  });
}

function initCursor() {
  if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
  document.body.classList.add("has-pointer");
  const glow = document.getElementById("cursorGlow");
  let mx = 0,
    my = 0,
    gx = 0,
    gy = 0;
  window.addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true }
  );
  function tick() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + "px";
    glow.style.top = gy + "px";
    requestAnimationFrame(tick);
  }
  tick();
}

function initMisc() {
  const aboutToggle = document.getElementById("aboutToggle");
  const aboutMore = document.getElementById("aboutMore");
  aboutToggle.addEventListener("click", () => {
    const open = aboutMore.classList.toggle("open");
    aboutToggle.setAttribute("aria-expanded", String(open));
    aboutToggle.innerHTML = open
      ? `Show less <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>`
      : `More about me <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>`;
  });

  document.getElementById("projectGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project]");
    if (btn) openProject(btn.dataset.project);
  });
  document.getElementById("researchGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-research]");
    if (btn) openResearch(btn.dataset.research);
  });
  document.getElementById("blogGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-blog]");
    if (btn) openBlog(btn.dataset.blog);
  });
  document.getElementById("artMasonry").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-art]");
    if (btn) openArt(Number(btn.dataset.art));
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const overlay = btn.closest(".overlay");
      if (overlay) closeOverlay(overlay.id);
    });
  });
  document.querySelectorAll(".overlay").forEach((ov) => {
    ov.addEventListener("click", (e) => {
      if (e.target === ov) closeOverlay(ov.id);
    });
  });

  document.getElementById("lbPrev").addEventListener("click", () => openArt(artIndex - 1));
  document.getElementById("lbNext").addEventListener("click", () => openArt(artIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllOverlays();
    const lb = document.getElementById("lightboxOverlay");
    if (!lb.classList.contains("open")) return;
    if (e.key === "ArrowLeft") openArt(artIndex - 1);
    if (e.key === "ArrowRight") openArt(artIndex + 1);
  });

  const back = document.getElementById("backTop");
  window.addEventListener(
    "scroll",
    () => back.classList.toggle("show", window.scrollY > 600),
    { passive: true }
  );
  back.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  );

  document.getElementById("eggBtn").addEventListener("click", () => {
    document.body.classList.toggle("egg-mode");
    document.getElementById("eggBtn").classList.toggle("egg-active");
  });
}

/* —— Boot —— */
document.querySelectorAll(".beam-spin, .stat-beam, .scan-line").forEach((el) => el.remove());

renderAbout();
renderFlow();
renderStats();
renderSkills();
renderEducation();
renderExperience();
renderProjects();
renderResearch();
renderBlog();
renderArt();
renderOther();
initTabs();
initTimelines();
initNav();
initReveal();
initHero();
initCursor();
initMisc();
initTyping();
initTerminal();
initCounters();
initSkillBars();
initScrollProgress();
initMagnetic();
