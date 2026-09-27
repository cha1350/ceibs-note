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
  const feedbackKey = 'ai-impact-library-member-feedback-v1';
  const feedback = Object.create(null);
  let canSaveFeedback = true;

  let savedFeedback = {};
  try {
    savedFeedback = JSON.parse(localStorage.getItem(feedbackKey) || '{}') || {};
  } catch {
    try { localStorage.removeItem(feedbackKey); } catch { canSaveFeedback = false; }
  }
  for (const item of cases) {
    const entry = savedFeedback?.[item.id];
    if (!entry || typeof entry !== 'object') continue;
    feedback[item.id] = {
      liked: entry.liked === true,
      speakerVote: entry.speakerVote === true,
      comments: Array.isArray(entry.comments) ? entry.comments.filter(comment =>
        comment && typeof comment.id === 'string' && typeof comment.body === 'string' &&
        typeof comment.createdAt === 'string'
      ).map(comment => ({
        id: comment.id.slice(0, 80),
        body: comment.body.slice(0, 500),
        createdAt: comment.createdAt
      })).slice(-30) : []
    };
  }

  function feedbackFor(id) {
    if (!feedback[id]) feedback[id] = { liked: false, speakerVote: false, comments: [] };
    return feedback[id];
  }

  function saveFeedback() {
    if (!canSaveFeedback) return false;
    try {
      localStorage.setItem(feedbackKey, JSON.stringify(feedback));
      return true;
    } catch {
      canSaveFeedback = false;
      return false;
    }
  }

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
    const memberFeedback = feedbackFor(item.id);
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
    if (memberFeedback.liked || memberFeedback.speakerVote) {
      const flags = node('div', 'member-flags');
      if (memberFeedback.liked) flags.append(node('span', '', '♥ Liked'));
      if (memberFeedback.speakerVote) flags.append(node('span', '', '✦ Speaker vote'));
      card.append(flags);
    }
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

    body.append(memberPulseFor(item));

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

  function memberPulseFor(item) {
    const entry = feedbackFor(item.id);
    const section = node('section', 'member-pulse');
    section.append(node('span', 'pulse-kicker', 'Member pulse · Interactive demo'));
    section.append(node('h3', '', 'Shape a future club event.'));
    addParagraph(section, 'pulse-intro', 'Like this case, vote for a speaker session on a similar topic, or leave a question you would ask the guest.');

    const actions = node('div', 'pulse-actions');
    const like = node('button', 'pulse-button');
    const speaker = node('button', 'pulse-button');
    like.type = 'button';
    speaker.type = 'button';
    actions.append(like, speaker);
    section.append(actions);

    const note = node('p', 'pulse-privacy');
    section.append(note);
    function updateChoices() {
      like.textContent = entry.liked ? '♥ Liked this case' : '♡ Like this case';
      speaker.textContent = entry.speakerVote ? '✦ Speaker vote added' : '✦ Vote for a speaker event';
      like.classList.toggle('selected', entry.liked);
      speaker.classList.toggle('selected', entry.speakerVote);
      like.setAttribute('aria-pressed', String(entry.liked));
      speaker.setAttribute('aria-pressed', String(entry.speakerVote));
      note.textContent = canSaveFeedback
        ? 'Demo feedback stays on this browser. Other members and club organizers cannot see it.'
        : 'Browser storage is unavailable. Demo feedback will last only until you leave this page.';
    }
    like.addEventListener('click', () => {
      entry.liked = !entry.liked;
      saveFeedback();
      updateChoices();
      render();
    });
    speaker.addEventListener('click', () => {
      entry.speakerVote = !entry.speakerVote;
      saveFeedback();
      updateChoices();
      render();
    });
    updateChoices();

    const topics = item.speakerPotential?.suggestedDiscussionTopics?.slice(0, 3) || [];
    if (topics.length) {
      const ideas = node('div', 'speaker-ideas');
      ideas.append(node('h4', '', 'Ideas for a speaker conversation'));
      addList(ideas, topics);
      section.append(ideas);
    }

    const form = node('form', 'comment-form');
    const label = node('label', '', 'What would you ask a speaker?');
    const textarea = node('textarea', 'comment-input');
    textarea.name = 'speaker-comment';
    textarea.required = true;
    textarea.minLength = 3;
    textarea.maxLength = 500;
    textarea.rows = 4;
    textarea.placeholder = 'I would like to know how they measured the impact and handled the rollout…';
    label.append(textarea);
    form.append(label);
    const formBottom = node('div', 'comment-form-bottom');
    const counter = node('span', 'comment-counter', '0 / 500');
    const submit = node('button', 'comment-submit', 'Save demo comment');
    submit.type = 'submit';
    formBottom.append(counter, submit);
    form.append(formBottom);
    section.append(form);
    textarea.addEventListener('input', () => {
      counter.textContent = `${textarea.value.length} / 500`;
    });

    const commentsHeading = node('h4', 'comments-heading');
    const commentList = node('div', 'comment-list');
    commentList.setAttribute('aria-live', 'polite');
    section.append(commentsHeading, commentList);
    function renderComments() {
      commentsHeading.textContent = `Comments on this browser (${entry.comments.length})`;
      commentList.replaceChildren();
      if (!entry.comments.length) {
        commentList.append(node('p', 'comments-empty', 'No comments yet. Start with a question you would ask the speaker.'));
        return;
      }
      for (const comment of [...entry.comments].reverse()) {
        const article = node('article', 'member-comment');
        const top = node('div', 'comment-top');
        const date = new Date(comment.createdAt);
        const dateLabel = Number.isNaN(date.getTime()) ? 'Saved comment' :
          new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
        top.append(node('span', '', `You · ${dateLabel}`));
        const remove = node('button', 'remove-comment', 'Remove');
        remove.type = 'button';
        remove.setAttribute('aria-label', 'Remove your comment');
        remove.addEventListener('click', () => {
          entry.comments = entry.comments.filter(saved => saved.id !== comment.id);
          saveFeedback();
          updateChoices();
          renderComments();
          textarea.focus();
        });
        top.append(remove);
        article.append(top, node('p', '', comment.body));
        commentList.append(article);
      }
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      const body = textarea.value.trim();
      if (body.length < 3) {
        textarea.focus();
        return;
      }
      entry.comments.push({
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
        body,
        createdAt: new Date().toISOString()
      });
      entry.comments = entry.comments.slice(-30);
      saveFeedback();
      updateChoices();
      form.reset();
      counter.textContent = '0 / 500';
      renderComments();
      textarea.focus();
    });
    renderComments();
    return section;
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
