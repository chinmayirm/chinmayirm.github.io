# Seedance scroll storytelling

Drop generated films here — the site will **scroll-scrub** them automatically.

## Files to export

Put muted H.264 mp4 (or webm) files in `assets/film/`:

| File | Used for |
|------|----------|
| `public/assets/film/clip-01.mp4` | Portal / torii entrance |
| `public/assets/film/clip-02.mp4` | Corridor / project wing |
| `public/assets/film/clip-03.mp4` | Art gallery |
| `public/assets/film/story.mp4` | Optional single-file fallback |

The Story section scroll-scrubs **clip-01 → clip-02 → clip-03** as one continuous film.

```bash
# Drop / replace a beat:
cp ~/Downloads/portal.mp4 public/assets/film/clip-01.mp4
```

Then refresh locally or push to GitHub Pages.

> Note: `.gitignore` allows `assets/film/*.mp4` so you can commit the film.

## Recommended specs

- **16:9** or **9:16** (site covers either)
- **24fps**, muted, **20–40 seconds**
- Smooth one-take or soft cuts; no UI text / watermarks
- Style: dark night garden, neon pink accents, koi / moon / ink water

## Shot list (match site beats)

| Beat | Progress | Visual |
|------|----------|--------|
| 1 | 0–15% | Dark void → neon lines → your silhouette / portrait light |
| 2 | 15–35% | Night garden, pink moon, koi ripple |
| 3 | 35–55% | Drift past project “rooms” / glowing panels |
| 4 | 55–75% | Research notebook / circuit / quantum motifs |
| 5 | 75–100% | Threshold / lantern → fade to black |

## Master style (append to every Seedance prompt)

```text
Dark cinematic Japanese night garden, deep black background, subtle neon pink and magenta light, elegant not anime, soft sakura petals, reflective water, shallow depth of field, photoreal / painterly hybrid, 24fps, smooth stabilized camera, no text, no UI, no watermark
```

### Clip A — Portal settle

```text
Camera in a black void. Thin neon pink light lines streak toward a distant glowing point. Soft sakura petals drift. A circular neon frame with koi fish energy forms. Slow push-in. Continuous one-take.
```

### Clip B — Night garden

```text
Night garden with a large soft neon pink moon over dark water. Pagoda silhouette far away. Cherry blossom branch in foreground. Camera slowly dollies forward over reflective water. Petals fall. Continuous one-take.
```

### Clip C — Workshop / projects

```text
Dark studio corridor. Glowing rectangular panels like project holograms along the walls. Camera tracks sideways past them. Neon pink edge light. Continuous one-take.
```

### Clip D — Research lab

```text
Dark research desk from above. Notebook pages, faint neural-net lines, soft pink circuit glow. Camera slowly pushes into the page. Continuous one-take.
```

## How scrubbing works

While you scroll through the **Story** section, the video `currentTime` follows scroll progress (same technique as Apple product pages). No Seedance SDK needed in the browser — only the exported file.
