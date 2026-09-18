'use strict';
(() => {
  const catalog = window.CEIBS_LIBRARY;
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<i data-lucide="${esc(name)}" aria-hidden="true"></i>`;
  const topics = new Map(catalog.topics.map(t => [t.id, t]));
  const ids = new Set(catalog.pages.map(p => p.id));
  const formats = ['All', 'Research', 'Case study', 'Summary', 'Interactive', 'Website'];
  const formatIcons = {'Research':'scan-search','Case study':'briefcase-business','Summary':'file-text','Interactive':'mouse-pointer-2','Website':'globe'};
  const key = 'ceibs.library.v1';
  let prefs = {saved:[], opened:{}, display:'grid'};
  let storageAvailable = true;
  function readPrefs() {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || '{}');
      prefs = {
        saved: Array.isArray(raw?.saved) ? [...new Set(raw.saved.filter(id => ids.has(id)))] : [],
        opened: Object.fromEntries(Object.entries(raw?.opened || {}).filter(([id, time]) => ids.has(id) && Number.isFinite(time))),
        display: raw?.display === 'list' ? 'list' : 'grid'
      };
    } catch { storageAvailable = false; }
  }
  readPrefs();
  let toastTimer;
  function toast(message) {
    $('toast').textContent = message;
    $('toast').hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3500);
  }
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(prefs)); storageAvailable = true; }
    catch { storageAvailable = false; toast('Browser storage is unavailable. Changes last for this visit only.'); }
  }
  const refreshIcons = () => window.lucide?.createIcons();
  const isSaved = id => prefs.saved.includes(id);
  function toggleSaved(id) {
    readPrefs();
    prefs.saved = isSaved(id) ? prefs.saved.filter(x => x !== id) : [...prefs.saved, id];
    persist();
  }
  function inTopic(page, topicId) {
    let topic = topics.get(page.topic);
    while (topic) {
      if (topic.id === topicId) return true;
      topic = topics.get(topic.parent);
    }
    return false;
  }
  function topicTrail(id) {
    const names = [];
    for (let topic = topics.get(id); topic; topic = topics.get(topic.parent)) names.unshift(topic.name);
    return names.join(' / ');
  }
  const countLabel = n => `${n} ${n === 1 ? 'page' : 'pages'}`;

  if (document.body.classList.contains('reader-page')) {
    const params = new URLSearchParams(location.search);
    const page = catalog.pages.find(p => p.id === params.get('id'));
    if (!page) {
      $('reader-error').hidden = false;
      $('reader-frame').hidden = true;
      $('reader-tools').hidden = true;
      $('reader-title').textContent = 'Page not found';
      refreshIcons();
      return;
    }
    document.title = `${page.title} | CEIBS Notes`;
    $('reader-title').textContent = page.title;
    $('reader-topic').textContent = topicTrail(page.topic);
    // Only catalog paths can be loaded; the query string never supplies an iframe URL.
    $('reader-frame').src = page.path;
    $('reader-frame').title = page.title;
    $('open-original').href = page.path;
    const from = new URLSearchParams(params.get('from') || '');
    $('back-library').href = `index.html${from.size ? '?' + from.toString() : ''}`;
    prefs.opened[page.id] = Date.now();
    persist();
    const updateSave = () => {
      const saved = isSaved(page.id);
      $('reader-save').setAttribute('aria-pressed', String(saved));
      $('reader-save').setAttribute('aria-label', saved ? 'Remove from saved' : 'Save page');
      $('reader-save').title = saved ? 'Remove from saved' : 'Save page';
      $('reader-save').style.color = saved ? 'var(--green)' : '';
      $('reader-save').innerHTML = icon(saved ? 'bookmark-check' : 'bookmark');
      refreshIcons();
    };
    $('reader-save').addEventListener('click', () => { toggleSaved(page.id); updateSave(); });
    $('copy-link').addEventListener('click', async () => {
      const url = new URL(location.href);
      url.searchParams.delete('from');
      try { await navigator.clipboard.writeText(url.href); toast('Page link copied'); }
      catch { toast('Copy the page address from your browser to share it.'); }
    });
    window.addEventListener('storage', () => { readPrefs(); updateSave(); });
    updateSave();
    return;
  }

  let state;
  function readState() {
    const params = new URLSearchParams(location.search);
    state = {
      view: ['all','saved','recent'].includes(params.get('view')) ? params.get('view') : 'all',
      topic: topics.has(params.get('topic')) ? params.get('topic') : '',
      format: formats.includes(params.get('format')) ? params.get('format') : 'All',
      query: params.get('q') || '',
      sort: ['updated','title','opened'].includes(params.get('sort')) ? params.get('sort') : 'updated'
    };
    $('search').value = state.query;
  }
  readState();
  function updateURL(replace = false) {
    const params = new URLSearchParams();
    if (state.view !== 'all') params.set('view', state.view);
    if (state.topic) params.set('topic', state.topic);
    if (state.format !== 'All') params.set('format', state.format);
    if (state.query) params.set('q', state.query);
    if (state.sort !== 'updated') params.set('sort', state.sort);
    try { history[replace ? 'replaceState' : 'pushState'](null, '', location.pathname + (params.size ? '?' + params.toString() : '')); } catch { /* file previews may restrict history changes. */ }
  }
  function navigate(changes, replace = false) {
    Object.assign(state, changes);
    updateURL(replace);
    render();
  }
  function filtered(ignoreFormat = false) {
    const terms = state.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return catalog.pages.filter(page => {
      if (state.view === 'saved' && !isSaved(page.id)) return false;
      if (state.view === 'recent' && !prefs.opened[page.id]) return false;
      if (state.topic && !inTopic(page, state.topic)) return false;
      if (!ignoreFormat && state.format !== 'All' && !page.formats.includes(state.format)) return false;
      const haystack = [page.title, page.description, topicTrail(page.topic), ...page.tags, ...page.formats].join(' ').toLowerCase();
      return terms.every(term => haystack.includes(term));
    });
  }
  function readerURL(page) {
    const params = new URLSearchParams({id:page.id});
    if (location.search) params.set('from', location.search.slice(1));
    return `reader.html?${params.toString()}`;
  }
  function card(page) {
    const topic = topics.get(page.topic);
    const saved = isSaved(page.id);
    const date = new Date(page.updated + 'T12:00:00').toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'});
    const url = readerURL(page);
    return `<article class="page-card" data-id="${esc(page.id)}">
      <a class="page-preview" href="${esc(url)}" tabindex="-1" aria-hidden="true"><img src="${esc(page.thumbnail)}" alt="" width="960" height="506" loading="lazy"><span class="preview-label">${icon(formatIcons[page.formats[0]] || 'file-text')}${esc(page.formats[0])}</span></a>
      <div class="card-body"><a class="card-topline ${esc(topic.color)}" href="?topic=${esc(topic.id)}" data-topic="${esc(topic.id)}"><span class="topic-dot"></span>${esc(topic.name)}</a>
      <h2><a href="${esc(url)}">${esc(page.title)}</a></h2><p class="card-description">${esc(page.description)}</p>
      <div class="card-tags">${page.tags.map(tag => `<span>${esc(tag)}</span>`).join('')}</div>
      <div class="card-bottom"><span class="card-date">${icon('calendar-days')}<time datetime="${esc(page.updated)}">${date}</time></span><button class="icon-button ${saved ? 'saved' : ''}" data-save="${esc(page.id)}" aria-pressed="${saved}" aria-label="${saved ? 'Unsave' : 'Save'} ${esc(page.title)}" title="${saved ? 'Remove from saved' : 'Save page'}">${icon(saved ? 'bookmark-check' : 'bookmark')}</button></div></div></article>`;
  }
  function render() {
    $('all-count').textContent = catalog.pages.length;
    $('saved-count').textContent = prefs.saved.length || '';
    $('topic-count').textContent = catalog.topics.length;
    document.querySelectorAll('[data-view]').forEach(a => {
      if (a.dataset.view === state.view && !state.topic) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    $('topics').innerHTML = catalog.topics.map(t => `<a class="${t.parent ? 'nested' : ''}" href="?topic=${esc(t.id)}" data-topic="${esc(t.id)}" ${state.topic === t.id ? 'aria-current="page"' : ''}>${icon(t.icon)}<span>${esc(t.name)}</span><small>${catalog.pages.filter(p => inTopic(p, t.id)).length}</small></a>`).join('');
    $('topic-overview').hidden = Boolean(state.topic || state.view !== 'all' || state.query);
    $('topic-overview').innerHTML = catalog.topics.filter(t => !t.parent).map(t => `<a class="topic-shortcut" href="?topic=${esc(t.id)}" data-topic="${esc(t.id)}"><span class="topic-glyph ${esc(t.color)}">${icon(t.icon)}</span><div><strong>${esc(t.name)}</strong><small>${countLabel(catalog.pages.filter(p => inTopic(p, t.id)).length)}</small></div></a>`).join('');
    const title = state.topic ? topics.get(state.topic).name : {all:'All pages',saved:'Saved pages',recent:'Recently opened'}[state.view];
    $('heading').textContent = title;
    document.title = `${title} | CEIBS Notes`;
    $('heading-meta').textContent = state.topic ? topicTrail(state.topic) : {all:'Research, ideas, and things worth keeping.',saved:'Your bookmarked pages on this browser.',recent:'Your reading history on this browser.'}[state.view];
    $('breadcrumb').innerHTML = `<a href="index.html" data-view="all">Workspace</a> / ${state.topic ? '<a href="index.html" data-view="all">Library</a> / ' + esc(topicTrail(state.topic)) : 'Library'}`;
    const base = filtered(true);
    $('formats').innerHTML = formats.map(f => `<button data-format="${esc(f)}" aria-pressed="${state.format === f}">${esc(f === 'Case study' ? 'Cases' : f === 'Summary' ? 'Summaries' : f === 'Website' ? 'Websites' : f)}${f === 'All' ? `<small>${base.length}</small>` : ''}</button>`).join('');
    const pages = filtered().sort((a,b) => {
      if (state.sort === 'title') return a.title.localeCompare(b.title);
      if (state.sort === 'opened' || state.view === 'recent' && state.sort === 'updated') return (prefs.opened[b.id] || 0) - (prefs.opened[a.id] || 0);
      return b.updated.localeCompare(a.updated);
    });
    $('sort').value = state.sort;
    $('result-count').textContent = state.query ? `${countLabel(pages.length)} matching "${state.query}"` : `${countLabel(pages.length)}`;
    $('total-label').textContent = countLabel(base.length);
    $('clear-search').hidden = !state.query;
    $('reset-filters').hidden = !(state.query || state.topic || state.format !== 'All');
    $('pages').classList.toggle('list', prefs.display === 'list');
    $('grid-view').setAttribute('aria-pressed', String(prefs.display === 'grid'));
    $('list-view').setAttribute('aria-pressed', String(prefs.display === 'list'));
    $('pages').innerHTML = pages.map(card).join('');
    $('empty-state').hidden = pages.length > 0;
    const noFilters = !state.query && !state.topic && state.format === 'All';
    $('empty-title').textContent = noFilters && state.view === 'saved' ? 'No saved pages yet' : noFilters && state.view === 'recent' ? 'No recently opened pages' : 'No matching pages';
    $('empty-copy').textContent = noFilters && state.view !== 'all' ? 'Your library is ready to explore.' : 'Try another search, format, or topic.';
    $('footer-count').textContent = `${countLabel(catalog.pages.length)} across ${catalog.topics.filter(t => !t.parent).length} topics`;
    refreshIcons();
  }
  function closeMenu(restoreFocus = true) {
    const wasOpen = $('sidebar').classList.contains('open');
    $('sidebar').classList.remove('open');
    $('scrim').hidden = true;
    $('open-menu').setAttribute('aria-expanded', 'false');
    document.querySelector('.workspace').inert = false;
    document.body.style.overflow = '';
    if (wasOpen && restoreFocus) $('open-menu').focus();
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-save]');
    if (button) {
      const id = button.dataset.save;
      toggleSaved(id);
      render();
      document.querySelector(`[data-save="${CSS.escape(id)}"]`)?.focus();
      return;
    }
    const topic = event.target.closest('[data-topic]');
    const view = event.target.closest('[data-view]');
    if ((topic || view) && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      navigate({topic:topic?.dataset.topic || '',view:view?.dataset.view || 'all',format:'All',query:''});
      $('search').value = '';
      closeMenu(false);
      $('main').focus({preventScroll:true});
    }
    const format = event.target.closest('[data-format]');
    if (format) { navigate({format:format.dataset.format}); document.querySelector(`[data-format="${CSS.escape(state.format)}"]`).focus(); }
  });
  $('search-form').addEventListener('submit', e => e.preventDefault());
  $('search').addEventListener('input', e => navigate({query:e.target.value}, true));
  $('clear-search').addEventListener('click', () => { $('search').value = ''; navigate({query:''}, true); $('search').focus(); });
  $('sort').addEventListener('change', e => navigate({sort:e.target.value}));
  for (const mode of ['grid','list']) $(mode + '-view').addEventListener('click', () => { prefs.display = mode; persist(); render(); });
  for (const id of ['reset-filters','empty-reset']) $(id).addEventListener('click', () => { navigate({query:'',format:'All',topic:'',view:'all'}); $('search').value = ''; });
  $('open-menu').addEventListener('click', () => {
    $('sidebar').classList.add('open');
    $('scrim').hidden = false;
    $('open-menu').setAttribute('aria-expanded', 'true');
    document.querySelector('.workspace').inert = true;
    document.body.style.overflow = 'hidden';
    $('close-menu').focus();
  });
  $('close-menu').addEventListener('click', () => closeMenu());
  $('scrim').addEventListener('click', () => closeMenu());
  document.addEventListener('keydown', e => {
    if (!$('sidebar').classList.contains('open')) return;
    if (e.key === 'Escape') closeMenu();
    if (e.key === 'Tab') {
      const focusable = [...$('sidebar').querySelectorAll('a, button')];
      const first = focusable[0], last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia('(max-width:760px)').addEventListener('change', e => { if (!e.matches) closeMenu(false); });
  window.addEventListener('popstate', () => { readState(); render(); });
  window.addEventListener('storage', () => { readPrefs(); render(); });
  window.addEventListener('pageshow', () => { readPrefs(); render(); });
  render();
  if (!storageAvailable) toast('Browser storage is unavailable. Saved pages last for this visit only.');
})();
