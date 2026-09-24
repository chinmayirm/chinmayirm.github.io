# Chinmayi RM — Portfolio

Dark futuristic portfolio meets Japanese night garden. Static site for GitHub Pages.

## Structure

```
index.html
css/main.css
js/data.js      ← edit content here
js/app.js
assets/images/
  hero/ profile/ projects/ research/ paintings/ blog/ decorative/
```

## Sections

Home · About · Education · Experience · Projects · Research · Creative (Blog / Art Gallery / Other) · Contact

## Local preview

Because the app uses ES modules, serve over HTTP (not `file://`):

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Push to `chinmayirm.github.io` on `main`, then enable Pages from that branch.

## Edit content

Update `js/data.js` for education, experience, projects, research, blog posts, and paintings.
