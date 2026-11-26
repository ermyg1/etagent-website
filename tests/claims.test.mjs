import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import ts from 'typescript'

function source(path) {
  return ts.createSourceFile(path, readFileSync(new URL('../' + path, import.meta.url), 'utf8'),
    ts.ScriptTarget.Latest, true)
}

function copyStrings(root) {
  const strings = []
  function visit(node) {
    if (ts.isStringLiteralLike(node) || ts.isJsxText(node)) {
      strings.push(node.text.trim().replace(/\s+/g, ' '))
    }
    ts.forEachChild(node, visit)
  }
  visit(root)
  return strings
}

function records(file, name) {
  const declarations = file.statements.filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
  const declaration = declarations.find(item => item.name.getText(file) === name)
  assert.ok(declaration && ts.isArrayLiteralExpression(declaration.initializer), name)
  return declaration.initializer.elements.map(copyStrings)
}

const app = source('src/App.tsx')
const walkthrough = source('src/features/governance-demo/constants/content.ts')

// Match known assertions of delivered behaviour. Architectural requirements, future
// objectives and synthetic checkpoints can legitimately use the same technical terms.
const unsupported = [
  /^(?:every|each) approved action produces (?:a permanent|a complete audit)/i,
  /^a permanent audit record is generated/i,
  /^organisations retain oversight, enforce policy/i,
  /^every (?:proposed action|recommendation) is (?:evaluated|checked) against/i,
  /^the platform remains independent of any individual AI model/i,
  /^AI structures the request, identifies/i,
  /^the request, policy review, approval and simulated outcome are preserved/i,
  /^(?:audit.grade evidence|audit ready|immutable audit artefacts\.|trust is continuously evidenced\.)$/i,
]
const isUnsupported = text => unsupported.some(pattern => pattern.test(text))

test('public copy avoids known unqualified claims of enforcement, inference and storage', () => {
  assert.ok(isUnsupported('Every approved action produces a permanent, reviewable audit artefact.'))
  for (const allowed of [
    'Immutable auditability is an architectural objective.',
    'Persistent audit storage is planned for a future deployment.',
    'The synthetic demo replays one governance checkpoint.',
  ]) assert.equal(isUnsupported(allowed), false, allowed)
  for (const line of [...copyStrings(app), ...copyStrings(walkthrough)]) {
    assert.equal(isUnsupported(line), false, line)
  }
})

test('replay, auditability and workflow comparisons keep their local context', () => {
  const capabilities = records(app, 'coreEnterpriseCapabilities')
  const replay = capabilities.find(card => card.some(text => /replay/i.test(text)))
  assert.match(replay?.join(' ') ?? '', /Command Centre.*Plan v2 checkpoint.*browser/i)
  assert.ok(records(app, 'introducingPlatformPrinciples').some(card =>
    card.some(text => /immutable auditability is an architectural objective/i.test(text))))
  for (const row of records(app, 'governanceComparisonRows')) {
    assert.ok(row.some(text => text.endsWith('?')), 'Expected an evaluation question in ' + row.join(' '))
  }
  const stages = records(walkthrough, 'governanceWalkthroughStages')
  assert.ok(stages.find(stage => stage.includes('ai-analysis'))?.some(text => /pre-authored/i.test(text)))
  assert.ok(stages.find(stage => stage.includes('audit-record'))?.some(text => /sample fields/i.test(text)))
})

test('Trust describes assurance scope without advertising framework progress', () => {
  const markup = app.getText()
  const section = markup.match(/<Section\s+aria-labelledby="compliance-alignment-title"[\s\S]*?<\/Section>/)?.[0]
  assert.ok(section, 'Expected the public compliance section')
  assert.match(section.replace(/\s+/g, ' '), /no certification, attestation or framework-mapping evidence/i)
  assert.doesNotMatch(section, /<StatusBadge\b|\bcomplianceAlignment\.map\b|\b(?:In Progress|Planned|Certified)\b/i)
})

// Public wording only. A match flags a known claim for review, not a runtime property.
test('public components and fixtures avoid direct claims of delivered capabilities', () => {
  const prohibited = [
    /\b(?:we|the platform|E\.T Agent) (?:automatically )?enforce(?:s)? (?:all |every |live |production )?(?:polic(?:y|ies)|rules)\b/i,
    /\b(?:we are|the platform is|E\.T Agent is) (?:fully )?(?:(?:ISO[ -]?27001|SOC 2(?: Type II)?) (?:compliant|certified)|certified (?:to|under)\b)/i,
    /\b(?:we|the platform|E\.T Agent) (?:permanently (?:stores?|saves?)|persists?) (?:all |every |immutable )?(?:audit|decision) records?\b/i,
    /\b(?:we|the platform|E\.T Agent) (?:autonomously executes?|executes? autonomously|executes? (?:actions|payments) without human approval)\b/i,
  ]
  for (const [index, example] of [
    'The platform enforces production policies.',
    'We are SOC 2 Type II certified.',
    'E.T Agent permanently stores audit records.',
    'The platform autonomously executes payments.',
  ].entries()) assert.match(example, prohibited[index])

  for (const path of ts.sys.readDirectory('src', ['.ts', '.tsx'])) {
    for (const line of copyStrings(source(path))) {
      assert.ok(!isUnsupported(line) && !prohibited.some(rule => rule.test(line)), path + ': ' + line)
    }
  }
})

test('homepage case preview labels advice, pending preparation and sample record fields', () => {
  const preview = source('src/features/command-centre-demo/components/GovernanceCasePreview.tsx')
  const lines = copyStrings(preview)
  for (const phrase of [
    'Pre-authored advisory recommendation.', 'Preparation is pending human review.',
    'Sample record layout', 'Awaiting human decision', 'This workflow example is unavailable.',
  ]) assert.ok(lines.includes(phrase), phrase)
})
