// Run with Node. Exercises selection, v1 migration, and resumable-test storage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'docs/pages/economics/microeconomics-final.html'), 'utf8');
const bank = JSON.parse(html.match(/id="question-data">\s*([\s\S]*?)<\/script>/)[1]);
const coverage = JSON.parse(html.match(/id="topic-coverage">\s*([\s\S]*?)<\/script>/)[1]);
const code = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
new vm.Script(code);
const legacy = {version:1, history:{q1:{choice:'D',checked:true}},session:{ids:bank.slice(0,32).map(q=>q.id),mode:'practice',index:30,answers:{q1:{choice:'D',checked:true},short1:{text:'My saved calculations'}},finished:false}};
const writes = new Map();
const nodes = new Map();
const context = vm.createContext({console,Math,Date,Map,Set,JSON,localStorage:{getItem(){return JSON.stringify(legacy);},setItem(k,v){writes.set(k,v);}},document:{getElementById(id){if(!nodes.has(id))nodes.set(id,{textContent:id==='question-data'?JSON.stringify(bank):id==='topic-coverage'?JSON.stringify(coverage):'',value:'mock4',options:[]});return nodes.get(id);}}});
vm.runInContext(code.split("$('set-select').addEventListener")[0],context);
const run = expression => vm.runInContext(expression,context);
assert.equal(bank.length,160);
assert.equal(coverage.length,24);
assert.equal(run('state.session.pack'),'mock1');
assert.equal(run('state.session.index'),30);
assert.equal(run('state.session.answers.short1.text'),'My saved calculations');
assert.equal(run('state.savedSessions.mock1.answers.q1.choice'),'D');
for(const set of ['mock1','mock2','mock3','mock4','mock5']){
  assert.equal(run(`chooseIds('all','${set}').length`),32);
  assert.equal(run(`chooseIds('pricing','${set}').length`),15);
  assert.equal(run(`chooseIds('games','${set}').length`),15);
  assert.equal(run(`chooseIds('short','${set}').length`),2);
}
assert.equal(run("chooseIds('all','bank').length"),160);
assert.equal(run("chooseIds('pricing','bank').length"),75);
assert.equal(run("chooseIds('games','bank').length"),75);
assert.equal(run("chooseIds('short','bank').length"),10);
assert.equal(run("chooseIds('mistakes','mock1').length"),31);
run("for(const q of QUESTIONS.filter(q=>q.set==='mock1'))state.history[q.id]={checked:true,choice:q.answer,rating:'got'}");
for(const set of ['mock4','mock5']){
  const tags=new Set(bank.filter(q=>q.set===set).flatMap(q=>q.coverage));
  assert.ok(coverage.every(t=>tags.has(t.id)),`${set} covers the supplied headings`);
}
for(let n=0;n<1000;n++){
  const selected=JSON.parse(run("JSON.stringify(chooseIds('all','random').map(id=>BY_ID.get(id)))"));
  assert.equal(new Set(selected.map(q=>q.id)).size,32);
  assert.equal(selected.filter(q=>q.section==='pricing').length,15);
  assert.equal(selected.filter(q=>q.section==='games').length,15);
  assert.equal(selected.filter(q=>q.kind==='short').length,2);
  assert.equal(selected.filter(q=>q.strand==='market-failure').length,4);
  assert.equal(selected.filter(q=>q.strand==='monopoly').length,5);
  assert.equal(selected.filter(q=>q.strand==='price-customization').length,6);
  const tags=new Set(selected.flatMap(q=>q.coverage));
  assert.ok(coverage.every(t=>tags.has(t.id)),'A mixed mock includes every supplied topic heading');
  assert.ok(['visual-tree','first-mover','second-mover'].every(t=>tags.has(t)),'Visual tree and both mover effects');
  assert.ok(selected.every(q=>q.set!=='mock1'),'Prefer unseen questions');
}
run("save();state.session={pack:'mock2',label:PACKS.mock2,ids:chooseIds('all','mock2'),mode:'practice',index:1,answers:{q33:{choice:'C',checked:true}},finished:false};save();");
const saved=JSON.parse(writes.get('ceibs-micro-final-v1'));
assert.equal(saved.savedSessions.mock1.answers.short1.text,'My saved calculations');
assert.equal(saved.savedSessions.mock2.answers.q33.choice,'C');
assert.equal(saved.history.q1.choice,'D');
assert.equal(run("normalizeSession({pack:null,label:'Retry practice',ids:['q33'],mode:'practice',index:0,answers:{}}).pack"),null,'A retry must not replace its full named test on reload');
run("state.session={pack:'mock4',label:PACKS.mock4,ids:chooseIds('all','mock4'),mode:'practice',index:0,answers:{q97:{choice:'B',checked:true}},finished:false};save();");
assert.equal(JSON.parse(writes.get('ceibs-micro-final-v1')).savedSessions.mock4.answers.q97.choice,'B');
console.log('PASS: 160 questions; 24 audited headings; five balanced tests; 1,000 topic-constrained mixed mocks; market-failure quota; visual trees and both mover effects; legacy progress and independent saved tests.');
