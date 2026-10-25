"""Validate and embed the reviewed final-topic selections from the uploaded papers."""
import argparse,json,re,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
p=argparse.ArgumentParser();p.add_argument('--notes-root',type=Path);args=p.parse_args()
data=json.loads((ROOT/'content/microeconomics-past-papers.json').read_text());qs=data['questions']
assert len(qs)==30 and sum(q['kind']=='mcq' for q in qs)==26
assert len({q['id'] for q in qs})==30
for y,count in [('2022',12),('2025',18)]:assert sum(q['year']==y for q in qs)==count
for q in qs:
 assert q['pages'] and q['stemHtml'] and q['answerHtml'] and q['answerOrigin']
 assert q['topic'] in ['failure','monopoly','pricing','games']
 if q['kind']=='mcq':
  assert [o['letter'] for o in q['options']]==list('ABCDE')
  assert q['answer'] in 'ABCDE' and len(set(o['html'] for o in q['options']))==5
 else:assert q['parts'] and len(q['checks'])>=4
 for asset in re.findall(r'src="([^"]+)"',q['stemHtml']):assert (ROOT/'docs/pages/economics'/asset).exists(),asset
page=ROOT/'docs/pages/economics/microeconomics-past-papers.html'
payload=json.dumps(data,ensure_ascii=False,indent=2).replace('<','\\u003c')
s,n=re.subn(r'(<script type="application/json" id="paper-data">\n)[\s\S]*?(\n</script>)',lambda m:m[1]+payload+m[2],page.read_text(),count=1);assert n==1
page.write_text(s)
if args.notes_root:
 dest=args.notes_root/'01 Subjects/MicroEconomics';(dest/'Final Exam - Selected Past Papers.html').write_text(s)
 shutil.copytree(ROOT/'docs/pages/economics/past-papers-assets',dest/'past-papers-assets',dirs_exist_ok=True)
print('Built 30 final-topic items from both papers; 26 MCQs and 4 selected written exercises; all diagram paths verified.')
