"""Validate the library and build its browser catalog. No third-party packages."""

import argparse
import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"


class LocalLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ("src", "href") and value:
                parsed = urlsplit(value)
                if not parsed.scheme and not parsed.netloc and parsed.path:
                    self.links.append(unquote(parsed.path))


def inside(root, relative):
    target = (root / relative).resolve()
    if not target.is_relative_to(root.resolve()):
        raise ValueError(f"Path leaves its root: {relative}")
    return target


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-root", type=Path, help="Import catalog sources from this local notes folder")
    args = parser.parse_args()
    catalog = json.loads((ROOT / "library.json").read_text())
    topics = {t["id"]: t for t in catalog["topics"]}
    assert len(topics) == len(catalog["topics"]), "Duplicate topic ID"
    for topic in topics.values():
        seen = {topic["id"]}
        while topic.get("parent"):
            assert topic["parent"] in topics, "Unknown parent topic"
            assert topic["parent"] not in seen, "Topic hierarchy contains a cycle"
            seen.add(topic["parent"])
            topic = topics[topic["parent"]]
    ids, paths, public_pages = set(), set(), []
    for page in catalog["pages"]:
        assert re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", page["id"]), "Use a kebab-case page ID"
        assert page["id"] not in ids and page["path"] not in paths, "Duplicate page ID or path"
        ids.add(page["id"])
        paths.add(page["path"])
        assert page["topic"] in topics, f"Unknown topic: {page['topic']}"
        assert page["formats"] and set(page["formats"]) <= {"Research", "Case study", "Summary", "Interactive", "Website"}
        assert page["path"].startswith("pages/") and page["path"].endswith(".html")
        destination = inside(DOCS, page["path"])
        if args.source_root and page.get("source"):
            source = inside(args.source_root, page["source"])
            content = source.read_text(encoding="utf-8")
            # The reading PDF stays in the notes vault; only the summary is published.
            if page["id"] == "perfect-diary":
                content = content.replace(
                    '<a class="pill" href="Materials/Readings/Perfect%20Diary.pdf">Open Source PDF</a>',
                    '<span class="pill">Source: Perfect Diary case reading</span>',
                )
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(content, encoding="utf-8")
        assert destination.is_file(), f"Missing page: {page['path']}"
        links = LocalLinks()
        links.feed(destination.read_text(encoding="utf-8"))
        for link in links.links:
            assert not link.startswith("/"), f"Use relative links for GitHub project sites: {link}"
            target = (destination.parent / link).resolve()
            assert target.is_relative_to(DOCS.resolve()) and target.exists(), f"Missing local asset in {page['id']}: {link}"
        public = {k: v for k, v in page.items() if k != "source"}
        public["thumbnail"] = page.get("thumbnail", f"assets/previews/{page['id']}.jpg")
        public_pages.append(public)
    public_catalog = {"name": catalog["name"], "topics": catalog["topics"], "pages": public_pages}
    payload = json.dumps(public_catalog, ensure_ascii=True, indent=2).replace("<", "\\u003c")
    (DOCS / "catalog.js").write_text("window.CEIBS_LIBRARY = " + payload + ";\n")
    fallback = '<noscript><p>Open a page directly:</p><ul>' + ''.join(
        f'<li><a href="{html.escape(p["path"], quote=True)}">{html.escape(p["title"])}</a></li>' for p in public_pages
    ) + '</ul></noscript>'
    index = DOCS / "index.html"
    index.write_text(re.sub(r"<noscript>.*?</noscript>", lambda _: fallback, index.read_text(), flags=re.S))
    print(f"Built {len(public_pages)} pages across {len(topics)} topics. All local page links resolved.")


if __name__ == "__main__":
    main()
