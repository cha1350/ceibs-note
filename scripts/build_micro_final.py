"""Validate and embed the authored final-exam bank in its standalone HTML page."""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--notes-root', type=Path, help='Also refresh the local standalone notes copy')
    args = parser.parse_args()
    bank = json.loads((ROOT / 'content/microeconomics-final.json').read_text())
    assert len(bank) == 96, 'Expected three complete 32-question tests'
    assert len({q['id'] for q in bank}) == len(bank), 'Duplicate question IDs'
    assert len({q['number'] for q in bank}) == len(bank), 'Duplicate question numbers'
    for test in ('mock1', 'mock2', 'mock3'):
        items = [q for q in bank if q['set'] == test]
        assert len(items) == 32, (test, len(items))
        assert sum(q['section'] == 'pricing' and q['kind'] == 'mcq' for q in items) == 15
        assert sum(q['section'] == 'games' and q['kind'] == 'mcq' for q in items) == 15
        assert sum(q['kind'] == 'short' for q in items) == 2
    for q in bank:
        assert q['stemHtml'] and q['answerHtml'] and q['title'] and q['topic'], q['id']
        if q['kind'] == 'mcq':
            assert [o['letter'] for o in q['options']] == list('ABCD'), q['id']
            assert q['answer'] in 'ABCD', q['id']
            assert len({o['html'] for o in q['options']}) == 4, q['id']
        else:
            assert len(q['checks']) >= 4, q['id']
    payload = json.dumps(bank, ensure_ascii=False, indent=2).replace('<', '\\u003c')
    page = ROOT / 'docs/pages/economics/microeconomics-final.html'
    content, count = re.subn(
        r'(<script type="application/json" id="question-data">\n)[\s\S]*?(\n</script>)',
        lambda match: match[1] + payload + match[2], page.read_text(), count=1,
    )
    assert count == 1, 'Question-data slot not found'
    page.write_text(content)
    if args.notes_root:
        (args.notes_root / '01 Subjects/MicroEconomics/Final Exam Practice.html').write_text(content)
    print('Built 96 questions: three tests, each with 15 pricing + 15 game theory + 2 short answers.')


if __name__ == '__main__':
    main()
