"""Refresh the static AI Impact Library data file from its research JSON."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "research/ai-impact-library/cases.json"
TARGET = ROOT / "docs/pages/ai-impact-library/cases.js"


def main():
    cases = json.loads(SOURCE.read_text(encoding="utf-8"))
    assert isinstance(cases, list) and len(cases) >= 10
    ids = [case["id"] for case in cases]
    assert len(ids) == len(set(ids)), "Duplicate case ID"
    for case in cases:
        assert case.get("sources"), f"Missing sources: {case['id']}"
        assert case.get("article", {}).get("howTheyDidIt"), f"Missing article: {case['id']}"
        assert 3 <= len(case.get("implementationSteps", [])) <= 6, f"Missing method steps: {case['id']}"
    TARGET.write_text(
        "window.AI_CASES = " + json.dumps(cases, ensure_ascii=True, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    print(f"Built {len(cases)} AI business cases for the static site.")


if __name__ == "__main__":
    main()
