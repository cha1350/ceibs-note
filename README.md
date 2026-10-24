# CEIBS Notes

A static HTML library for research, case studies, summaries, and interactive tools.

Live site: https://cha1350.github.io/ceibs-note/

## Microeconomics final practice

The [final practice page](https://cha1350.github.io/ceibs-note/pages/economics/microeconomics-final.html)
contains 160 questions across five complete mock tests. Each test has 15 market/policy
MCQs, 15 game theory MCQs, and two short questions with worked answers and rubrics.
Tests 4–5 follow the student’s supplied topic list, including market failure and
negative externalities; Tests 1–3 keep their earlier monopoly/pricing emphasis.
The topic panel provides drills for all 24 supplied headings and reports which
were already covered, expanded, or added. AI launch, underdog, and giant applications
use clearly labeled original hypothetical scenarios; lecture-case stories and
payoffs have not been verified.

Fresh mixed mocks contain four market-failure questions, five monopoly questions,
and six price-customization questions, plus 15 games and two short answers. This is
a practice allocation, not a claimed official weighting within the 15 non-game questions.
The game selection covers the supplied game headings, including a visual tree,
first- and second-mover examples, hold-up, and the named-topic applications.
Each named test keeps its own resumable session and drafts in the current browser.
The HTML is self-contained and can also be opened as a local file.

Edit `content/microeconomics-final.json` and
`content/microeconomics-final-coverage.json`, then run
`python3 scripts/build_micro_final.py` and `python3 scripts/build.py`.
Run `node scripts/check_micro_final.cjs` to check 1,000 mixed selections,
topic coverage, original saved-progress migration, and independent test sessions.

## AI Impact Library

The [AI Impact Library](https://cha1350.github.io/ceibs-note/pages/ai-impact-library/index.html)
is a static showcase of 13 real company AI implementations. It appears in the
library under **AI in business**. Each case includes the business problem, how the
implementation worked, measured results, evidence limits, applicability, and
original sources.

The research source is `research/ai-impact-library/cases.json`; the accompanying
`research-summary.md` and `case-articles.md` are in the same folder. After editing
the JSON, run `python3 scripts/build_ai_impact.py` to refresh the browser-ready
`cases.js`, then `python3 scripts/build.py` to refresh the CEIBS Notes catalog.
The site needs no backend or external runtime packages.
Its member-feedback demo lets visitors like a case, vote for a related speaker
event, and write or remove comments. Feedback is stored only in that browser's
local storage; it is not shared between members or sent to club organizers.

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
