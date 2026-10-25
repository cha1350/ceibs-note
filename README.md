# CEIBS Notes

A static HTML library for research, case studies, summaries, and interactive tools.

Live site: https://cha1350.github.io/ceibs-note/

## Microeconomics final practice

The [final practice page](https://cha1350.github.io/ceibs-note/pages/economics/microeconomics-final.html)
contains 123 questions (116 MCQs and seven written exercises) selected for the
student's corrected final scope. Monopoly, the hold-up problem and Nash equilibrium
are excluded from questions, drills, the quick reference and resumed sessions.
Price customization / price discrimination is explicitly retained.

Fresh mocks contain 15 market/policy MCQs, 15 game MCQs, and two short answers.
The non-game allocation is eight market-failure/information questions and seven
customization questions, a practice choice rather than an official weighting.
Older sets keep only their in-scope questions and display their actual counts.
Game coverage includes dominance, prisoner’s dilemma, repeated interaction,
sequential decisions, visual trees and mover advantages. Named cases use original
hypothetical payoffs; lecture-case details remain unverified. Extension items
remain marked. Progress and written drafts save in the current browser.

The 192-question authored source bank is preserved for future scope changes.
`content/microeconomics-final-scope.json` controls the active subset and small
wording changes that remove incidental excluded concepts. Only the 123 selected
questions are embedded in the practice HTML. Existing saved sessions are filtered
to active IDs, retaining surviving answers and written drafts.

Edit the source bank, coverage inventory and scope manifest, then run
`python3 scripts/build_micro_final.py` and `python3 scripts/build.py`.
Run `node scripts/check_micro_final.cjs` for exclusions, balanced fresh mocks,
legacy-session migration and draft preservation.

## Uploaded past papers: final-topic selection

The [six-paper selection](https://cha1350.github.io/ceibs-note/pages/economics/microeconomics-past-papers.html)
contains 37 reviewed MCQs and one written excerpt from 2017, 2018, 2019, 2022,
2024 and 2025. It follows the same corrected scope and excludes mixed questions
requiring monopoly or Nash equilibrium. Utility, trade, labor markets and
monopolistic competition are outside this practice. Source numbers and option
order are preserved with study wording, cropped diagrams, PDF-page references
and worked explanations. The written excerpt is 2022 FRQ 2, parts a–b.

The 2017–2019 uploads include printed answer keys. The 2024 upload is scanned
and has no key; selected tables, graph labels and payoffs were checked visually
and its answers worked independently. The 2022 appended key and 2025 handwriting
are not authenticated official rubrics. The repeated 2025 MCQs are not counted
twice. Source-specific limitations and final topics needing separate practice
are identified on the page. Numerical calculations in these external papers do
not establish the professor's CEIBS requirements.

Edit `content/microeconomics-past-papers.json`, run
`python3 scripts/build_micro_papers.py`, then `python3 scripts/build.py`.
Run `node scripts/check_micro_papers.cjs` for exact selections, diagrams,
tax/subsidy arithmetic, dominant strategies, feedback, saved drafts and scoring.

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
