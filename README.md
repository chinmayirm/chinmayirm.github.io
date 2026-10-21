# Chinmayi RM — Portfolio

Dark futuristic portfolio meets Japanese night garden. Built with **React + Vite** for GitHub Pages.

## Structure

```
src/
  App.jsx
  data.js          ← edit content here
  components/      ← Portal, Story, sections, overlays
  styles/main.css
public/assets/     ← images + Seedance film (story.mp4)
```

## Local preview

```bash
npm install
npm run dev
# open http://127.0.0.1:5173/   (or the port Vite prints)
```

Do **not** use `python3 -m http.server` — this is a React/Vite app and needs `npm run dev`.

## Build / deploy

```bash
npm run build
```

Push `dist/` (or the repo with a Pages workflow) to `chinmayirm.github.io`.  
For a simple static host: deploy the contents of `dist/` to the site root.

## Seedance story

Drop `public/assets/film/story.mp4` — see `public/SEEDANCE.md` for prompts.

## Portal

First visit shows the interactive light-lines portal. Bypass with `?skip=1`.
