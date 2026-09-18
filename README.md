# CEIBS Notes

A static HTML library for research, case studies, summaries, and interactive tools.

Live site: https://cha1350.github.io/ceibs-note/

## Open and publish

Open `docs/index.html` directly for a local preview. No server or npm build is needed.
GitHub Pages should publish from the `main` branch's `/docs` folder. Commit and push
this repository to update the live site. The existing `.nojekyll` stays in place.

## Add another HTML page

1. Put the complete page in `docs/pages/<topic>/<page>.html`. Keep any local assets
   beside it and use relative links. Standalone HTML with inline assets is easiest.
2. Add an entry to `library.json`, using a stable ID, title, description, topic,
   formats, tags, date (`YYYY-MM-DD`), and a path relative to `docs/`.
3. Add a preview image at `docs/assets/previews/<id>.jpg`, or set `thumbnail` to an
   existing image path relative to `docs/`.
4. Run `python3 scripts/build.py` to validate the pages and refresh `docs/catalog.js`.
5. Commit and push. GitHub Pages publishes the updated collection.

Example entry:

```json
{
  "id": "pricing-summary",
  "title": "Pricing and market power",
  "description": "Key concepts and worked examples from the pricing session.",
  "topic": "economics",
  "formats": ["Summary"],
  "tags": ["Pricing", "Market power"],
  "detail": "Session summary",
  "path": "pages/economics/pricing-summary.html",
  "updated": "2026-09-18"
}
```

Supported formats: `Research`, `Case study`, `Summary`, `Interactive`, `Website`.
A page can belong to multiple formats. Add topics in `library.json`; an optional
`parent` ID creates nesting. Topic filters include their descendants. IDs stay
stable when titles or file locations change, preserving reader links and bookmarks.

## Ask Codex to maintain it

> Add this HTML to my CEIBS Notes library under [topic]. Include its local assets,
> update library.json, generate a preview, run the build and browser checks, then
> publish to GitHub Pages.

To refresh the cataloged pages from the notes folder:

```sh
python3 scripts/build.py --source-root '/absolute/path/to/Material - Obsidian'
```

`source` fields are used only by that import command. Normal builds work on another
computer or GitHub checkout without access to the notes folder. Only cataloged HTML
pages are imported.

## Optional preview generation and browser checks

`scripts/previews.cjs` and `scripts/check.cjs` use Playwright. Install Playwright in
your development environment, or point `NODE_PATH` at an existing installation.
Set `CHROMIUM_PATH` if using an existing Chromium binary.

```sh
node scripts/previews.cjs
node scripts/check.cjs
```

The live website has no external runtime dependencies. Lucide icons are vendored
in `docs/assets/`; see `docs/assets/LUCIDE-LICENSE`.

Saved pages, recently opened pages, and quiz progress are stored in that browser.
They do not sync between devices. Search covers titles, descriptions, tags, topics,
and formats. The reader supports hosted static HTML and JavaScript; server-backed
apps need their own backend and deployment. Catalog changes take effect after a
commit and push, not through an in-browser upload.
