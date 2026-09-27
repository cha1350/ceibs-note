(() => {
  'use strict';

  const cases = Array.isArray(window.AI_CASES) ? window.AI_CASES : [];
  const grid = document.getElementById('case-grid');
  const search = document.getElementById('search');
  const industry = document.getElementById('industry');
  const count = document.getElementById('result-count');
  const empty = document.getElementById('empty-state');
  const dialog = document.getElementById('case-dialog');
  const detail = document.getElementById('case-detail');
  const filters = [...document.querySelectorAll('.filter')];
  let activeFilter = 'all';

  const metrics = {
    'klarna-ai-service': { value: '$59m', label: 'modeled 2025 service saving' },
    'ups-orion-routing': { value: '$410m', label: 'reported 2017 operating saving' },
    'ibm-askhr': { value: '40%', label: 'lower HR operating cost over four years' },
    'google-datacenter-cooling': { value: '40%', label: 'less cooling energy in a live test' },
    'coca-cola-store-recommendations': { value: '+36%', label: 'US online-store revenue' },
    'pomelo-fashion-personalize': { value: '+8%', label: 'incremental gross revenue reported' },
    'zurich-chile-claims': { value: '1 day', label: 'typical settlement, down from about 4.5' },
    'pg-vision-inspection': { value: '10–20%', label: 'less scrap on applicable products' },
    'dbs-change-risk': { value: '81%', label: 'fewer change-caused incidents' },
    'chimei-clinical-copilots': { value: '15 min', label: 'example report, down from about 60' },
    'walmart-supplier-negotiation': { value: '3%', label: 'average gain on negotiated spend' },
    'accenture-github-copilot': { value: '+8.69%', label: 'more pull requests per developer in trial' },
    'natwest-cora-genai': { value: '+20 pp', label: 'no-human resolution on comparable journeys' }
  };

  const outcomes = {
    cost: new Set(['klarna-ai-service', 'ups-orion-routing', 'ibm-askhr', 'google-datacenter-cooling', 'pg-vision-inspection', 'walmart-supplier-negotiation']),
    growth: new Set(['coca-cola-store-recommendations', 'pomelo-fashion-personalize']),
    speed: new Set(['zurich-chile-claims', 'dbs-change-risk', 'chimei-clinical-copilots', 'accenture-github-copilot', 'natwest-cora-genai', 'klarna-ai-service', 'ibm-askhr', 'pg-vision-inspection'])
  };

  const node = (tag, className, content) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined && content !== null) element.textContent = String(content);
    return element;
  };

  const addParagraph = (parent, className, content) => {
    if (!content) return;
    parent.append(node('p', className, content));
  };

  const addSection = (parent, heading, content) => {
    if (!content) return;
    const section = node('section', 'detail-section');
    section.append(node('h3', '', heading));
    addParagraph(section, '', content);
    parent.append(section);
  };

  const addList = (parent, items) => {
    const list = node('ul', '');
    for (const item of items || []) list.append(node('li', '', item));
    parent.append(list);
  };

  function cardFor(item) {
    const metric = metrics[item.id];
    const card = node('button', 'case-card');
    card.type = 'button';
    card.setAttribute('aria-label', `Read ${item.company} case study`);
    const top = node('div', 'card-top');
    top.append(node('span', 'card-industry', item.industry));
    top.append(node('span', 'grade', `Grade ${item.evidenceGrade}`));
    card.append(top);
    card.append(node('h3', '', item.company));
    card.append(node('p', 'case-title', item.caseTitle));
    card.append(node('p', 'case-summary', item.oneSentenceSummary));
    const bottom = node('div', 'card-bottom');
    const copy = node('div', 'metric-copy');
    copy.append(node('strong', 'metric-value', metric?.value || 'Case study'));
    copy.append(node('span', 'metric-label', metric?.label || 'Read the implementation'));
    bottom.append(copy, node('span', 'read-arrow', '↗'));
    card.append(bottom);
    card.addEventListener('click', () => openCase(item));
    return card;
  }

  function openCase(item) {
    detail.replaceChildren();
    const metric = metrics[item.id];
    const article = item.article || {};

    const head = node('div', 'detail-head');
    head.append(node('div', 'detail-eyebrow', `${item.company} · ${item.country}`));
    const title = node('h2', '', item.caseTitle);
    title.id = 'detail-title';
    head.append(title);
    addParagraph(head, '', item.oneSentenceSummary);
    const meta = node('div', 'detail-meta');
    for (const label of [item.industry, item.businessFunction, `Evidence grade ${item.evidenceGrade}`]) {
      meta.append(node('span', '', label));
    }
    head.append(meta);
    detail.append(head);

    const body = node('div', 'detail-body');
    const impact = node('div', 'detail-impact');
    impact.append(node('strong', '', metric?.value || 'Measured impact'));
    impact.append(node('p', '', metric?.label || item.oneSentenceSummary));
    body.append(impact);
    addParagraph(body, 'article-lead', article.opening || item.businessProblem);

    addSection(body, 'How they did it', article.howTheyDidIt);
    if (item.implementationSteps?.length) {
      const section = node('section', 'detail-section');
      section.append(node('h3', '', 'A practical implementation sequence'));
      addParagraph(section, 'steps-intro', 'This sequence is a practical reconstruction from public information; steps not explicitly reported by the company are not presented as its published playbook.');
      const steps = node('ol', 'method-steps');
      for (const step of item.implementationSteps) steps.append(node('li', '', step));
      section.append(steps);
      body.append(section);
    }
    addSection(body, 'What changed in the operation', article.whatChanged || item.afterAI);
    addSection(body, 'The result—and its limits', article.resultsAndLimits);

    const applicability = item.businessApplicability;
    if (applicability) {
      const section = node('section', 'detail-section');
      section.append(node('h3', '', 'Where this could work'));
      const fit = node('div', 'fit-grid');
      for (const [heading, values] of [
        ['Good fit for', applicability.goodFitFor],
        ['Probably not useful for', applicability.probablyNotUsefulFor]
      ]) {
        const box = node('div', 'fit-box');
        box.append(node('h4', '', heading));
        addList(box, values);
        fit.append(box);
      }
      section.append(fit);
      if (applicability.requirements?.length) {
        const requirements = node('p', 'requirements');
        requirements.append(node('strong', '', 'Requirements: '));
        requirements.append(document.createTextNode(applicability.requirements.join(' · ')));
        section.append(requirements);
      }
      body.append(section);
    }

    if (article.businessTakeaway) {
      const section = node('section', 'detail-section');
      section.append(node('h3', '', 'Business takeaway'));
      addParagraph(section, 'takeaway', article.businessTakeaway);
      body.append(section);
    }

    const sources = node('section', 'detail-section');
    sources.append(node('h3', '', 'Sources and evidence'));
    const sourceList = node('ul', 'source-list');
    for (const source of item.sources || []) {
      const row = node('li', '');
      const link = node('a', '', source.title);
      link.href = source.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      row.append(link);
      row.append(node('small', '', [source.publisher, source.date].filter(Boolean).join(' · ')));
      sourceList.append(row);
    }
    sources.append(sourceList);
    addParagraph(sources, 'evidence-note', `Grade ${item.evidenceGrade}: ${item.evidenceExplanation}`);
    body.append(sources);
    detail.append(body);

    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    dialog.scrollTop = 0;
    document.getElementById('close-dialog').focus();
  }

  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    const selectedIndustry = industry.value;
    const visible = cases.filter(item => {
      if (selectedIndustry !== 'all' && item.industry !== selectedIndustry) return false;
      if (activeFilter !== 'all' && !outcomes[activeFilter]?.has(item.id)) return false;
      if (!query) return true;
      const searchable = [item.company, item.industry, item.businessFunction, item.caseTitle,
        item.oneSentenceSummary, ...(item.aiType || []), ...(item.tags || [])].join(' ').toLocaleLowerCase();
      return searchable.includes(query);
    });
    grid.replaceChildren(...visible.map(cardFor));
    count.textContent = `${visible.length} of ${cases.length} cases`;
    empty.hidden = visible.length > 0;
  }

  const industries = [...new Set(cases.map(item => item.industry))].sort((a, b) => a.localeCompare(b));
  for (const label of industries) {
    const option = node('option', '', label);
    option.value = label;
    industry.append(option);
  }
  search.addEventListener('input', render);
  industry.addEventListener('change', render);
  for (const button of filters) {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      for (const other of filters) {
        const active = other === button;
        other.classList.toggle('active', active);
        other.setAttribute('aria-pressed', String(active));
      }
      render();
    });
  }
  document.getElementById('clear-filters').addEventListener('click', () => {
    search.value = '';
    industry.value = 'all';
    filters[0].click();
    search.focus();
  });
  document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  render();
})();
