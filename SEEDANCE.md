# Seedance walkthrough for chinmayirm.github.io

Yes — **Seedance is the right tool** for the reel effect. The site now **scroll-scrubs a video** (`assets/walkthrough.mp4`). Canvas can’t match a real camera path; Seedance can generate one.

## Workflow

1. Generate clips in **Jimeng / CapCut / Doubao / BytePlus Seedance** (2.0 or 2.5).
2. Stitch into one continuous **16:9 or 9:16**, **24fps**, muted film (~20–40s).
3. Export **H.264 mp4** (or webm).
4. Save as:

```text
assets/walkthrough.mp4
```

5. Push / refresh the site. Scroll = scrub.

Until that file exists, the page shows a setup card instead of a black screen.

## Shot list (match the reel)

| Beat | What to generate |
|------|------------------|
| 1 | Dark museum hall, gold frame, oriental/renaissance painting, visitor silhouettes |
| 2 | Camera dollies into the frame until painting fills the view |
| 3 | Fly through arches / vanishing point inside the painting |
| 4 | Emerge in a new gallery room with a different painting |
| 5 | Repeat for Codex → Workshop → Studio → Parchment → Threshold |

Use your stills as **first-frame / reference images**:

- `assets/oriental-1.jpg` — Entrance  
- `assets/athens.jpg` — Codex doorway (School of Athens energy)  
- `assets/oriental-2.jpg` — Workshop  
- `assets/socrates.jpg` — Studio  
- `assets/oriental-3.jpg` — Parchment  
- `assets/death-socrates.jpg` — Threshold  

## Copy-paste Seedance prompts

### Master style (append to every clip)

```text
Dark cinematic museum gallery, oriental lacquer and gold leaf accents, dramatic spotlight on a large ornate gold picture frame, soft visitor silhouettes in foreground, stone walls, shallow depth of field, photoreal, 24fps, smooth stabilized camera, no text, no UI, no watermark
```

### Clip A — Entrance settle → dive

```text
First frame: museum room looking at a large gold-framed oriental painting on a dark stone wall. Slow push-in toward the painting. Camera accelerates into the gold frame until the artwork fills the entire screen. Continuous one-take, no cuts.
```

### Clip B — Fly through painting

```text
First frame: inside a renaissance architectural fresco with deep arches and a bright vanishing point. Camera flies forward through successive arches toward the center light, subtle motion blur, immersive first-person walkthrough, continuous one-take.
```

### Clip C — Arrive next room

```text
Camera decelerates out of darkness into a new dark museum room. A different gold-framed classical painting hangs on the wall under a spotlight. Visitor silhouettes stand at the bottom. Settle on a centered composition, continuous one-take.
```

### Clip D — Repeat for each chamber

Same as A→B→C with the next reference painting as first frame / image reference.

## Stitching tips

- Keep **same lens feel** across clips (Seedance reference-to-video helps).
- Prefer **one long take** or extend with Seedance 2.5 multi-round extension.
- Disable audio (site mutes scrub video anyway).
- Target **720p or 1080p**; keep file under ~30–40MB for GitHub Pages if possible (or host on CDN / Git LFS).

## After export

```bash
# from website folder
cp ~/Downloads/your-seedance-export.mp4 assets/walkthrough.mp4
git add assets/walkthrough.mp4 index.html SEEDANCE.md
git commit -m "Add Seedance scroll walkthrough film"
git push
```

## Why this beats canvas

| Approach | Feel |
|----------|------|
| Canvas zoom/crop | Approximate, can go black, not true 3D |
| **Seedance + scroll scrub** | Same technique as the Instagram reel |

The site is already wired for scrubbing. Generate the film, drop it in, done.
