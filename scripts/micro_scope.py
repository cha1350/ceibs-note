"""Apply the student's confirmed exclusions without deleting the authored source bank."""
from copy import deepcopy


def apply_scope(bank, scope):
    excluded = set(scope['excludedQuestionIds'])
    active = deepcopy([q for q in bank if q['id'] not in excluded])
    for question in active:
        question['coverage'] = [tag for tag in question['coverage'] if tag not in scope['excludedCoverage']]
        for before, after in scope.get('textReplacements', {}).get(question['id'], []):
            for key in ('title', 'stemHtml', 'answerHtml'):
                question[key] = question[key].replace(before, after)
            for option in question.get('options', []):
                option['html'] = option['html'].replace(before, after)
    return active


def active_coverage(coverage, bank, scope):
    ids = {q['id'] for q in bank}
    omitted = set(scope['excludedCoverage'])
    selected = []
    for source in coverage:
        if source['id'] in omitted:
            continue
        topic = deepcopy(source)
        for key in ('questionIds', 'originalIds', 'addedIds'):
            topic[key] = [qid for qid in topic[key] if qid in ids]
        if topic['questionIds']:
            selected.append(topic)
    return selected
