"""Validate and embed the reviewed final-topic selections from the uploaded papers."""
import argparse,json,re,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
p=argparse.ArgumentParser();p.add_argument('--notes-root',type=Path);args=p.parse_args()
data=json.loads((ROOT/'content/microeconomics-past-papers.json').read_text());qs=data['questions']
assert len(qs)==38 and sum(q['kind']=='mcq' for q in qs)==37
assert len({q['id'] for q in qs})==len(qs)
for year, numbers in data['selection'].items():
 assert [int(q['originalNumber']) for q in qs if q['year']==year and q['kind']=='mcq']==numbers
for q in qs:
 assert q['pages'] and q['stemHtml'] and q['answerHtml'] and q['answerOrigin']
 assert q['topic'] in ['failure','pricing','games']
 assert not re.search(r'\bnash\b|hold[ -]?up',q['title']+' '+q['stemHtml']+' '+q['answerHtml']+' '.join(o['html'] for o in q.get('options',[])),re.I),q['id']
 if q['kind']=='mcq':
  assert [o['letter'] for o in q['options']]==list('ABCDE')
  assert q['answer'] in 'ABCDE' and len(set(o['html'] for o in q['options']))==5
 else:assert q['parts'] and len(q['checks'])>=4
 for asset in re.findall(r'src="([^"]+)"',q['stemHtml']):assert (ROOT/'docs/pages/economics'/asset).exists(),asset
page=ROOT/'docs/pages/economics/microeconomics-past-papers.html'
payload=json.dumps(data,ensure_ascii=False,indent=2).replace('<','\\u003c')
s,n=re.subn(r'(<script type="application/json" id="paper-data">\n)[\s\S]*?(\n</script>)',lambda m:m[1]+payload+m[2],page.read_text(),count=1);assert n==1
options=[f'<option value="all">Six papers · {len(qs)} selected items</option>']
selected=[]
for year,numbers in data['selection'].items():
 items=[q for q in qs if q['year']==year]
 written=[q for q in items if q['kind']=='short']
 label=f'{year} · {len(numbers)} MCQs'+(f' + {len(written)} written excerpt' if written else '')
 options.append(f'<option value="{year}">{label}</option>')
 line=f'<p><strong>{year} MCQs:</strong> '+', '.join(map(str,numbers))+'.'
 if written:line+=' <strong>Written:</strong> '+'; '.join(q['originalNumber']+' '+q['parts'] for q in written)+'.'
 selected.append(line+'</p>')
s=re.sub(r'(<select id="year">)[\s\S]*?(</select>)',lambda m:m[1]+''.join(options)+m[2],s,count=1)
s=re.sub(r'(<div id="selected-sources">)[\s\S]*?(</div>)',lambda m:m[1]+''.join(selected)+m[2],s,count=1)
page.write_text(s)
if args.notes_root:
 dest=args.notes_root/'01 Subjects/MicroEconomics';(dest/'Final Exam - Selected Past Papers.html').write_text(s)
 shutil.copytree(ROOT/'docs/pages/economics/past-papers-assets',dest/'past-papers-assets',dirs_exist_ok=True)
print('Built 38 selected items from six papers; 37 MCQs and one written excerpt; confirmed exclusions and diagram paths verified.')
