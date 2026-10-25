// Selection and saved-session regressions for the user's corrected final scope.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/pages/economics/microeconomics-final.html'),'utf8');
const bank=JSON.parse(html.match(/id="question-data">\s*([\s\S]*?)<\/script>/)[1]),coverage=JSON.parse(html.match(/id="topic-coverage">\s*([\s\S]*?)<\/script>/)[1]);
const scope=JSON.parse(fs.readFileSync(path.join(root,'content/microeconomics-final-scope.json'),'utf8'));
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];new vm.Script(code);
assert.equal(bank.length,123);assert.equal(coverage.length,32);
assert.equal(bank.filter(q=>q.kind==='mcq').length,116);assert.equal(bank.filter(q=>q.kind==='short').length,7);
for(const q of bank){assert.ok(!scope.excludedQuestionIds.includes(q.id),q.id);assert.ok(!scope.excludedTopics.includes(q.topic));assert.ok(!q.coverage.some(t=>scope.excludedCoverage.includes(t)));assert.ok(!/\bnash\b|hold[ -]?up|monopol\w*|lerner/i.test(JSON.stringify(q)),q.id);}
assert.ok(bank.some(q=>q.topic==='discrimination'),'Keep confirmed customization topic');
for(const t of coverage){assert.ok(!scope.excludedCoverage.includes(t.id));assert.ok(t.questionIds.length&&t.questionIds.every(id=>bank.some(q=>q.id===id)));}
const legacy={version:1,history:{q1:{choice:'D',checked:true}},session:{ids:['q1','q6','short1','q17'],mode:'practice',index:2,answers:{q1:{choice:'D',checked:true},short1:{text:'My saved calculations'}},finished:false}};
const nodes=new Map(),writes=new Map();const context=vm.createContext({Math,Date,Map,Set,JSON,localStorage:{getItem(){return JSON.stringify(legacy)},setItem(k,v){writes.set(k,v)}},document:{getElementById(id){if(!nodes.has(id))nodes.set(id,{textContent:id==='question-data'?JSON.stringify(bank):id==='topic-coverage'?JSON.stringify(coverage):'',value:'random',options:[]});return nodes.get(id)}}});
vm.runInContext(code.split("$('set-select').addEventListener")[0],context);const run=s=>vm.runInContext(s,context);
assert.deepEqual(JSON.parse(run('JSON.stringify(state.session.ids)')),['q6','short1']);assert.equal(run('state.session.index'),1);assert.equal(run('state.session.answers.short1.text'),'My saved calculations');assert.equal(run('state.session.pack'),'mock1');
for(const pack of ['mock1','mock2','mock3','mock4','mock5','market-review','bank']){const ids=JSON.parse(run(`JSON.stringify(chooseIds('all','${pack}'))`));assert.ok(ids.length);assert.ok(ids.every(id=>bank.some(q=>q.id===id)));if(pack.startsWith('mock'))assert.ok(ids.length<32,'Older sets are correctly labeled as filtered');}
for(let n=0;n<100;n++){
 const selected=JSON.parse(run("JSON.stringify(setPool('random'))"));assert.equal(selected.length,32);assert.equal(new Set(selected.map(q=>q.id)).size,32);
 assert.equal(selected.filter(q=>q.section==='pricing').length,15);assert.equal(selected.filter(q=>q.section==='games').length,15);assert.equal(selected.filter(q=>q.kind==='short').length,2);
 assert.equal(selected.filter(q=>q.section==='pricing'&&q.topic==='market-failure').length,8);assert.ok(selected.every(q=>!scope.excludedQuestionIds.includes(q.id)));
 const tags=new Set(selected.flatMap(q=>q.coverage));assert.ok(['visual-tree','first-mover','second-mover','dominant-strategies','repeated-games'].every(t=>tags.has(t)));
 const shorts=selected.filter(q=>q.kind==='short');assert.equal(shorts.filter(q=>q.coverage.some(t=>['market-failure','price-customization'].includes(t))).length,1);
}
run('save()');const saved=JSON.parse(writes.get('ceibs-micro-final-v1'));assert.equal(saved.savedSessions.mock1.answers.short1.text,'My saved calculations');assert.equal(saved.history.q1.choice,'D');assert.ok(saved.savedSessions.mock1.ids.every(id=>bank.some(q=>q.id===id)));
for(const title of ['Hold-up problem','Nash equilibrium','Monopoly','Lerner index and monopoly horizons'])assert.ok(!html.includes('<strong>'+title+'</strong>'),'Excluded quick-reference rule');
console.log('PASS: 123 active questions; 32 topic drills; excluded topics absent from every selection; 100 balanced 15+15+2 mocks; legacy sessions filtered while preserving written drafts and history.');
