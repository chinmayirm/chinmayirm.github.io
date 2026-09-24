export const SITE = {
  name: "Chinmayi RM",
  email: "chinmayirm.04@gmail.com",
  linkedin: "https://linkedin.com/in/chinmayi-r-m-a85455253/",
  github: "https://github.com/chinmayirm",
  tagline: "Code · Research · Art · Curiosity",
};

export const ROLES = [
  "Software Engineer",
  "AI Researcher",
  "Creator",
];

export const STATS = [
  { value: 8.97, suffix: "", label: "GPA", decimals: 2 },
  { value: 4, suffix: "×", label: "Merit scholarships", decimals: 0 },
  { value: 10, suffix: "+", label: "Research & builds", decimals: 0 },
];

export const SKILLS = [
  { name: "NLP / NER", level: 90, signal: "GLiNER · production autosuggest · dialogue systems" },
  { name: "Computer Vision", level: 85, signal: "ViT · remote sensing · accessibility CV" },
  { name: "Deep Learning", level: 88, signal: "PyTorch · TensorFlow · transformers" },
  { name: "Research", level: 82, signal: "QViT · papers · quantum-ML experiments" },
  { name: "Data & Systems", level: 78, signal: "Spark · Kafka · SQL · production pipelines" },
  { name: "Creative craft", level: 80, signal: "Writing · painting · design sensibility" },
];

export const FLOW = ["Sense", "Model", "Ship", "Write", "Paint"];

export const TERMINAL = [
  { cmd: "whoami", out: "chinmayi — software engineer · AI researcher · creator" },
  { cmd: "cat ~/focus.env", out: 'ROLE="Software Engineer, AI Engineering @ MakeMyTrip Travelplex"\nSTACK="Python · PyTorch · NLP · CV · LLMs"\nOPEN_TO="Research collabs · thoughtful builds"' },
  { cmd: "status --live", out: "shipping production AI · writing · painting quietly" },
];

export const ABOUT = {
  short:
    "I build language and vision systems that meet people where they are — at scale on travel platforms, in satellite pipelines, and in quiet research notebooks. I care about craft as much as metrics.",
  more: `Across satellites, transformers, and travel platforms, I shape models that meet real users. At MakeMyTrip I trained a GLiNER-based NER system for autosuggest — micro F1 0.85, live on the main experience — and now continue as a Software Engineer on Travelplex.

Before that: remote-sensing at ISRO, quantum-augmented Vision Transformers at CDSAML, and recommendation systems for education. I hold a B.Tech in CSE (AI & ML) from PES University (GPA 8.97).

Outside the lab I write, paint, and notice the quiet between things — because not everything needs to be optimised.`,
  cards: [
    { label: "Education", value: "B.Tech · PES University", icon: "grad" },
    { label: "Location", value: "Bengaluru, India", icon: "pin" },
    { label: "Focus", value: "AI · CV · NLP · Research", icon: "spark" },
    { label: "Languages", value: "English · Kannada · Hindi · Français", icon: "lang" },
  ],
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Vision",
    "NLP",
    "Research",
    "Data Science",
    "Creative Art",
  ],
  quote: "A little progress each day adds up to big results.",
};

export const EDUCATION = [
  {
    id: "edu-btech",
    years: "2022 — 2026",
    institution: "PES University",
    degree: "B.Tech",
    field: "CSE (AI & ML)",
    achievement: "GPA 8.97 · Prof. C N Rao Scholarship × 4",
    detail:
      "PES MUN Co-Editor · TEDxPESU Curator · Apple Developers Group (AIML) · CDSAML Time Series SIG · Teaching Assistant for Mathematics for ML.",
  },
  {
    id: "edu-12",
    years: "2020 — 2022",
    institution: "CBSE",
    degree: "Class XII",
    field: "Science",
    achievement: "Strong foundation in mathematics & computing",
    detail: "Focused on mathematics, physics, and early programming — the groundwork for AI coursework ahead.",
  },
  {
    id: "edu-10",
    years: "2018 — 2020",
    institution: "CBSE",
    degree: "Class X",
    field: "Secondary",
    achievement: "Academic excellence",
    detail: "Where curiosity for systems and making things by hand first started to take shape.",
  },
];

export const EXPERIENCE = [
  {
    id: "exp-mmt-ft",
    role: "Software Engineer — AI Engineering",
    org: "MakeMyTrip · Travelplex",
    dates: "Sep 2026 — Present",
    short: "Production AI for travel experiences — models, data, and platform integration.",
    tech: ["Python", "NLP", "LLMs", "Spark"],
    contributions: [
      "AI engineering on Travelplex production systems",
      "Model, data, and platform integration for travel experiences",
      "Continuing autosuggest / conversational quality work from internship",
    ],
  },
  {
    id: "exp-mmt-int",
    role: "Data Science Intern",
    org: "MakeMyTrip",
    dates: "Jan 2026 — Aug 2026",
    short: "GLiNER NER for autosuggest — micro F1 0.85, live on main-page search.",
    tech: ["GLiNER", "NER", "PyTorch", "Python"],
    contributions: [
      "Trained GLiNER NER on large real-user travel queries",
      "Shipped endpoint at micro F1 0.85 across the platform",
      "Improved conversational depth; authored research paper on the project",
    ],
  },
  {
    id: "exp-isro",
    role: "Summer Intern",
    org: "ISRO — RRSC South, Bengaluru",
    dates: "Jun 2025 — Jul 2025",
    short: "Remote-sensing crop monitoring on 13-band, 10m satellite imagery.",
    tech: ["Deep Learning", "Remote Sensing", "Streamlit"],
    contributions: [
      "End-to-end agricultural monitoring pipeline",
      "Crop distribution prediction from 13-band imagery",
      "Interactive Streamlit dashboard for seasonal maps",
    ],
  },
  {
    id: "exp-tropes",
    role: "Machine Learning Intern",
    org: "Tropes and Pivots Learning Systems",
    dates: "May 2024 — Aug 2024",
    short: "NLP query interpretation and ranked course retrieval.",
    tech: ["NLP", "Recommendations", "Python"],
    contributions: [
      "NLP query interpretation for course search",
      "Dynamic recommendation engine with personalisation",
    ],
  },
  {
    id: "exp-cdsaml",
    role: "Research Intern",
    org: "CDSAML, PES University",
    dates: "Jun 2024 — Jul 2024",
    short: "Quantum elements in Vision Transformer attention via Qiskit.",
    tech: ["Qiskit", "ViT", "PyTorch"],
    contributions: [
      "Quantum multi-head attention & FFN experiments",
      "Custom decoder for object detection",
      "Research paper in progress",
    ],
  },
];

export const PROJECTS = [
  {
    id: "proj-gliner",
    title: "GLiNER Autosuggest NER",
    image: "assets/images/projects/gliner.jpg",
    blurb: "Entity-aware autosuggest on real travel traffic — live at scale.",
    tags: ["GLiNER", "NER", "PyTorch", "Production"],
    overview:
      "Production NER for MakeMyTrip autosuggest, trained on large real-user travel queries.",
    problem: "Vague search queries fail to surface the right destinations, hotels, and intents.",
    approach:
      "Fine-tuned GLiNER for travel entities; evaluated with micro F1; shipped as a live endpoint on the main experience.",
    results: "Micro F1 0.85 · live across the platform · research paper from the internship.",
    links: [],
  },
  {
    id: "proj-yoda",
    title: "Yoda Bot",
    image: "assets/images/projects/yoda.jpg",
    blurb: "Emotion-aware DialoGPT with sentiment-conditioned replies.",
    tags: ["NLP", "DialoGPT", "Dialogue"],
    overview: "A character dialogue bot that conditions replies on detected sentiment.",
    problem: "Flat chatbot replies ignore emotional tone.",
    approach: "Fine-tuned DialoGPT on Yoda dialogue; sentiment conditioning for reply style.",
    results: "Playful, tone-aware conversations with a distinct voice.",
    links: [{ label: "GitHub", href: "https://github.com/chinmayirm/Yoda-Bot" }],
  },
  {
    id: "proj-chroma",
    title: "Chroma Vision",
    image: "assets/images/projects/chroma.jpg",
    blurb: "CNN colour correction for protanopia accessibility.",
    tags: ["CV", "OpenCV", "Accessibility"],
    overview: "Vision pipeline that detects and corrects colours for protanopia.",
    problem: "Standard images are hard to parse for people with red-green colour blindness.",
    approach: "CNN correction + OpenCV / K-Means detection evaluated on CIFAR-10.",
    results: "Improved perceptual clarity for protanopia simulation tests.",
    links: [{ label: "GitHub", href: "https://github.com/chinmayirm/Chroma-Vision" }],
  },
  {
    id: "proj-qvit",
    title: "Quantum ViT Detection",
    image: "assets/images/projects/qvit.jpg",
    blurb: "Quantum attention inside Vision Transformers for detection.",
    tags: ["Qiskit", "ViT", "Research"],
    overview: "Exploring quantum circuits in ViT attention and FFN blocks for object detection.",
    problem: "Can quantum-inspired layers enrich representation learning in vision transformers?",
    approach: "IBM Qiskit circuits woven into attention/FFN; custom decoder for detection.",
    results: "Prototype architecture · paper in progress with industry mentor.",
    links: [],
  },
  {
    id: "proj-isro",
    title: "Crop Distribution Model",
    image: "assets/images/projects/isro.jpg",
    blurb: "13-band satellite pipeline for seasonal agricultural maps.",
    tags: ["ISRO", "Remote Sensing", "DL"],
    overview: "End-to-end remote sensing for crop monitoring at RRSC South.",
    problem: "Need scalable crop distribution maps from multispectral imagery.",
    approach: "Deep learning on 10m, 13-band imagery + Streamlit seasonal dashboard.",
    results: "Interactive maps of predicted crop distribution across seasons.",
    links: [],
  },
  {
    id: "proj-rag",
    title: "Geopolitical Advisory",
    image: "assets/images/projects/rag.jpg",
    blurb: "Context-aware RAG over UN resolutions and socioeconomic data.",
    tags: ["RAG", "LlamaIndex", "LLM"],
    overview: "RAG system grounding geopolitical questions in structured and document sources.",
    problem: "Open-ended geopolitical queries need grounded, multi-source answers.",
    approach: "LlamaIndex RAG over UN resolutions + socioeconomic data; graph insight views.",
    results: "Context-aware advisory responses with source-linked reasoning.",
    links: [],
  },
];

export const RESEARCH = [
  {
    id: "res-qvit",
    title: "QViT Object Detection",
    domain: "Quantum ML · Computer Vision",
    abstract:
      "Integrating quantum circuits into Vision Transformer attention and feed-forward blocks for object detection.",
    methodology: "Qiskit circuits · custom decoder · comparative baselines on detection tasks.",
    status: "Paper in progress",
    tech: ["Qiskit", "PyTorch", "ViT"],
    links: [],
  },
  {
    id: "res-gliner",
    title: "Entity-Aware Autosuggest",
    domain: "NLP · Production ML",
    abstract:
      "Large-scale GLiNER NER for travel autosuggest — vague queries as unfinished intent, not noise.",
    methodology: "Supervised NER on real-user traffic · micro F1 evaluation · production endpoint.",
    status: "Deployed · paper authored",
    tech: ["GLiNER", "NER", "PyTorch"],
    links: [],
  },
  {
    id: "res-remote",
    title: "Crops from Thirteen Bands",
    domain: "Remote Sensing · Agriculture",
    abstract:
      "Predicting crop distribution from 10m-resolution, 13-band imagery with interactive seasonal maps.",
    methodology: "Spectral library · deep learning pipeline · Streamlit visualisation.",
    status: "Completed · ISRO RRSC South",
    tech: ["Remote Sensing", "DL", "Streamlit"],
    links: [],
  },
  {
    id: "res-lung",
    title: "Lung Pathology with Vision Transformers",
    domain: "Medical Imaging · ViT",
    abstract:
      "Exploring Vision Transformers versus detection baselines for pathology-oriented visual tasks.",
    methodology: "ViT architectures · comparative study framing · medical imaging considerations.",
    status: "Exploratory",
    tech: ["ViT", "PyTorch", "Medical CV"],
    links: [],
  },
];

export const BLOG = [
  {
    id: "blog-quiet",
    title: "The Quiet Between",
    date: "2026-03-12",
    readTime: "6 min",
    cover: "assets/images/blog/quiet-between.jpg",
    excerpt: "On pauses, unfinished queries, and why silence is part of the signal.",
    body: `<p>Vague queries are not noise — they are unfinished intent. Somewhere between keystroke and suggestion, there is a quiet where meaning is still forming.</p>
<p>Working on autosuggest taught me to listen for that quiet. Models that rush to fill every gap often miss the point. The ones that wait — that leave room for the user to finish the thought — feel more human.</p>
<p>The quiet between is also where research happens. Between experiments. Between papers. Between the version of yourself that ships and the one that still wonders.</p>
<p>I am learning to protect that space.</p>`,
  },
  {
    id: "blog-building",
    title: "Things I Learned While Building",
    date: "2025-11-02",
    readTime: "5 min",
    cover: "assets/images/blog/building.jpg",
    excerpt: "Production lessons from NER endpoints, dashboards, and nearly-working demos.",
    body: `<p>Shipping is a different sport from prototyping. Metrics that look clean in a notebook can wobble under real traffic. Edge cases are not edge cases — they are the product.</p>
<p>I learned to prefer boring reliability over clever architecture, to write the eval before the flourish, and to treat every dashboard as a conversation with the next person who will inherit it.</p>
<p>Also: name your branches kindly. Future-you is reading them at midnight.</p>`,
  },
  {
    id: "blog-curious",
    title: "Notes From a Curious Mind",
    date: "2025-07-18",
    readTime: "4 min",
    cover: "assets/images/blog/curious.jpg",
    excerpt: "Fragments on quantum circuits, satellite bands, and asking better questions.",
    body: `<p>Curiosity is not a mood — it is a practice. Some weeks it looks like Qiskit circuits. Some weeks it looks like thirteen spectral bands over farmland.</p>
<p>The common thread is asking questions that do not fit neatly into a sprint ticket. What if attention were entangled? What if crop maps could speak in seasons?</p>
<p>I keep a notebook for those questions. Most will never become projects. That is fine. Curiosity compounds anyway.</p>`,
  },
  {
    id: "blog-hand",
    title: "Why I Still Make Things by Hand",
    date: "2025-02-09",
    readTime: "5 min",
    cover: "assets/images/blog/by-hand.jpg",
    excerpt: "Paint, paper, and the relief of work that does not need an F1 score.",
    body: `<p>Not everything needs to be optimised. A brushstroke cannot be A/B tested into sincerity.</p>
<p>When I paint, I am not chasing a leaderboard. I am learning to see — edges, negative space, when to stop. Those muscles quietly help me design better systems too.</p>
<p>Making by hand is how I remember that intelligence is not only artificial.</p>`,
  },
];

export const PAINTINGS = [
  {
    id: "art-1",
    title: "Ink Mountains",
    date: "2024",
    medium: "Ink on paper",
    caption: "Mist settling between ridges — a study in restraint.",
    image: "assets/images/paintings/p1.jpg",
  },
  {
    id: "art-2",
    title: "Lacquer Light",
    date: "2024",
    medium: "Digital study",
    caption: "Gold catching on dark lacquer.",
    image: "assets/images/paintings/p2.jpg",
  },
  {
    id: "art-3",
    title: "Temple Quiet",
    date: "2025",
    medium: "Mixed media",
    caption: "Wood, stone, and the pause before prayer.",
    image: "assets/images/paintings/p3.jpg",
  },
  {
    id: "art-4",
    title: "Silk Study",
    date: "2025",
    medium: "Watercolour",
    caption: "Soft folds, soft light.",
    image: "assets/images/paintings/p4.jpg",
  },
  {
    id: "art-5",
    title: "Peony Hour",
    date: "2025",
    medium: "Acrylic",
    caption: "One bloom, full attention.",
    image: "assets/images/paintings/p5.jpg",
  },
  {
    id: "art-6",
    title: "Mountain Mist",
    date: "2026",
    medium: "Ink wash",
    caption: "Where the path disappears on purpose.",
    image: "assets/images/paintings/p6.jpg",
  },
  {
    id: "art-7",
    title: "Night Garden",
    date: "2026",
    medium: "Oil study",
    caption: "Pink light on black water.",
    image: "assets/images/paintings/p7.jpg",
  },
  {
    id: "art-8",
    title: "Stone Room",
    date: "2026",
    medium: "Digital",
    caption: "A quiet corner kept for looking.",
    image: "assets/images/paintings/p8.jpg",
  },
];

export const OTHER_CREATIVE = [
  { title: "TEDxPESU Curator", note: "Shaping conversations worth sitting still for." },
  { title: "PES MUN Co-Editor", note: "Words, diplomacy, and late-night drafts." },
  { title: "DELF B2", note: "Français — another way to see." },
  { title: "Junior CTO Valedictorian", note: "Leading with curiosity, not just titles." },
];
