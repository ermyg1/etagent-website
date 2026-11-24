// Run against "npm run build" with a local Chrome installation.
import assert from 'node:assert/strict'
import { after, afterEach, before, beforeEach, test } from 'node:test'
import { chromium } from 'playwright-core'
import { preview } from 'vite'

const courier = '/demo/delivery-exception-review'
const banking = '/demo/fraud-reimbursement-review'
const command = '/demo/command-centre'
let server, browser, page, context, origin, unexpectedRequests

before(async () => {
  server = await preview({ preview: { host: '127.0.0.1', port: 0 } })
  origin = 'http://127.0.0.1:' + server.httpServer.address().port
  browser = await chromium.launch({ channel: 'chrome' })
})
after(async () => {
  try { await browser?.close() } finally { await server?.close() }
})

beforeEach(async () => {
  context = await browser.newContext({
    baseURL: origin, viewport: { width: 1600, height: 1000 },
    reducedMotion: 'reduce', serviceWorkers: 'block',
  })
  unexpectedRequests = []
  // Only serve the built page and its assets. Omit the site's external font stylesheet.
  await context.route('**/*', route => {
    const request = route.request()
    const url = new URL(request.url())
    if (url.origin === origin && request.method() === 'GET' &&
        (request.resourceType() === 'document' || url.pathname.startsWith('/assets/'))) {
      return route.continue()
    }
    if (!(url.origin === 'https://fonts.googleapis.com' && request.resourceType() === 'stylesheet')) {
      unexpectedRequests.push(request.method() + ' ' + url)
    }
    return route.abort()
  })
  page = await context.newPage()
  page.setDefaultTimeout(5000)
})
afterEach(async () => {
  await context?.close()
  assert.deepEqual(unexpectedRequests, [], 'Unexpected HTTP requests during the exercised journey')
})

const button = (name, scope = page) => scope.getByRole('button', { name, exact: typeof name === 'string' })
const visible = locator => locator.waitFor({ state: 'visible' })
const shown = text => visible(page.getByText(text, { exact: typeof text === 'string' }))
const field = (scope, label) => scope.getByRole('term').filter({ hasText: new RegExp('^' + label + '$', 'i') })
  .locator('xpath=following-sibling::dd[1]')

test('public routes render their own page and internal navigation resolves to real targets', async () => {
  const headings = new Map([
    ['/', /governance-first design/i], ['/product', /architecture for governed AI/i],
    ['/trust', /governance and trust design/i], ['/governance-demo', /governed AI decision flow/i],
    ['/use-cases', /governed workflows/i], [command, /command centre/i],
    [courier, /governed delivery exception/i], [banking, /governed fraud reimbursement/i],
    ['/privacy-policy', /privacy policy/i], ['/terms-of-use', /terms of use/i],
  ])
  const destinations = new Map()
  const links = []
  for (const [path, name] of headings) {
    await page.goto(path)
    await visible(page.getByRole('heading', { level: 1, name }))
    destinations.set(path, await page.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id)))
    for (const href of await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => node.href))) {
      const url = new URL(href)
      if (url.origin === origin) links.push({ path, url })
    }
  }
  for (const { path, url } of links) {
    const ids = destinations.get(url.pathname)
    assert.ok(ids, path + ' links to unknown route ' + url.pathname)
    if (url.hash) assert.ok(ids.includes(decodeURIComponent(url.hash.slice(1))), path + ' links to missing ' + url.href)
  }
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Primary navigation' })
  for (const href of ['/#home', '/#governance-model', '/governance-demo', '/use-cases', command, '/trust']) {
    await visible(nav.locator('a[href="' + href + '"]'))
  }
  await nav.getByRole('link', { name: 'Use Cases' }).click()
  for (const path of [courier, banking, command]) {
    const link = page.getByRole('main').locator('a[href="' + path + '"]')
    await link.click()
    await visible(page.getByRole('heading', { level: 1, name: headings.get(path) }))
    await page.goBack()
  }
  await page.goto('/missing-regression-route')
  await visible(page.getByRole('heading', { level: 1, name: 'Page Not Found' }))
})

for (const width of [375, 768, 1440]) {
  test(`synthetic homepage preview and Command Centre journey at ${width}px`, async () => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/#governance-model')
    const hero = page.locator('#home')
    const preview = hero.getByRole('region', { name: 'Partnership brief for human review' })
    await visible(preview.getByText('Synthetic workflow illustration', { exact: true }))
    await visible(preview.getByText('SYN-CMD-001 · Mara Vale — fictional individual creator'))
    await visible(preview.getByText('Awaiting human decision', { exact: true }))
    const steps = preview.getByRole('listitem')
    assert.equal(await steps.count(), 7)
    const checkpoints = [
      /Request.*Assess synthetic public-presence signals/s,
      /Intelligence.*Prepare a partnership brief for human review/s,
      /Illustrated policy check.*claims remain unverified/s,
      /Impact Summary.*risk of mischaracterising/s,
      /Human Approval.*Authorise preparation of a simulated draft outreach brief only/s,
      /Simulated Execution/,
      /Demonstration Audit Record/,
    ]
    for (const [index, checkpoint] of checkpoints.entries()) {
      assert.match(await steps.nth(index).innerText(), checkpoint)
    }
    await visible(preview.getByText(/No operational action has been taken/))
    await visible(hero.getByText(/prototype and synthetic demonstrations/))
    assert.ok(await preview.evaluate(element =>
      element.id === location.hash.slice(1) && element.scrollWidth <= element.clientWidth &&
      document.documentElement.scrollWidth <= document.documentElement.clientWidth))
    const links = hero.getByRole('link')
    assert.deepEqual(await links.allTextContents(), ['Request Architecture Review', 'Explore the Command Centre'])
    assert.equal(await links.first().getAttribute('href'), '#contact')
    await links.first().focus()
    await page.keyboard.press('Tab')
    assert.ok(await links.last().evaluate(element =>
      element === document.activeElement && getComputedStyle(element).outlineStyle !== 'none'))
    await page.keyboard.press('Enter')
    await visible(page.getByRole('heading', { level: 1, name: /Command Centre/i }))
    assert.equal(new URL(page.url()).pathname, command)
  })
}

test('product and Trust pages disclose the prototype and assurance limits', async () => {
  await page.goto('/product')
  await shown(/public prototype illustrates these responsibilities with browser-local examples/i)
  await shown(/no live AI or operational execution service/i)
  await page.goto('/trust')
  await shown(/provides no certification, attestation or framework-mapping evidence/i)
})

test('walkthrough distinguishes illustrative human approval, simulated execution and sample records', async () => {
  await page.goto('/governance-demo')
  await shown(/invokes no AI model, connects to no live system and creates no approval or production record/i)
  await button(/illustrative human approval/i).click()
  await shown('Human authority required')
  await button(/next/i).click()
  await shown('Execution is simulated here')
  await button(/next/i).click()
  await shown('Sample evidence fields')
})

test('courier review requires a human decision, rationale and confirmations, then clears on refresh', async () => {
  await page.goto(courier)
  await shown(/no connection to a live delivery system/i)
  await shown('Execution blocked')
  const nav = page.getByRole('navigation', { name: 'Delivery exception review progress' })
  const record = button(/decision record/i, nav)
  assert.ok(await record.isDisabled())
  await button(/human review/i, nav).click()
  const submit = button('Record demonstration decision')
  const rationale = 'Hold until the missing delivery evidence is reviewed.'
  assert.ok(await submit.isDisabled())
  await page.getByRole('textbox', { name: 'Decision rationale' }).fill(rationale)
  const authority = page.getByRole('checkbox', { name: /I am authorised/ })
  for (const check of await page.getByRole('checkbox').all()) await check.check()
  assert.ok(await submit.isDisabled(), 'A reviewer must select an outcome')
  await page.getByRole('radio', { name: 'Request more evidence' }).check()
  await authority.uncheck()
  assert.ok(await submit.isDisabled(), 'A reviewer must confirm their authority')
  await authority.check()
  await page.getByRole('textbox', { name: 'Decision rationale' }).fill('   ')
  assert.ok(await submit.isDisabled(), 'A rationale must contain more than whitespace')
  await page.getByRole('textbox', { name: 'Decision rationale' }).fill(rationale)
  await submit.click()
  await visible(page.getByRole('heading', { name: 'Request more evidence' }))
  await shown(rationale)
  await shown('Execution remained blocked')
  await button(/human review/i, nav).click()
  assert.equal(await submit.count(), 0)
  await page.reload()
  assert.ok(await record.isDisabled())
})

test('bank review gates case access, amendment, and risk acknowledgement before creating a temporary record', async () => {
  await page.goto(banking)
  await shown(/no bank account or banking system is connected/i)
  await shown('External execution blocked')
  const nav = page.getByRole('navigation', { name: 'Fraud reimbursement review workflow' })
  const record = button(/decision record/i, nav)
  assert.equal(await button(/human review/i, nav).count(), 0)
  await button('Open review').click()
  await button(/human review/i, nav).click()
  const submit = button('Record temporary demonstration decision')
  await page.getByRole('radio', { name: 'Amend advisory recommendation' }).check()
  await page.getByRole('textbox', { name: 'Human rationale' }).fill('Material evidence remains outstanding.')
  for (const check of await page.getByRole('group', { name: 'Required confirmations' }).getByRole('checkbox').all()) {
    await check.check()
  }
  const risk = page.getByRole('checkbox', { name: /I acknowledge that/ })
  await risk.check()
  await submit.click()
  const alert = page.getByRole('alert')
  assert.match(await alert.innerText(), /Describe the amendment/)
  assert.equal(await record.count(), 0)
  await risk.uncheck()
  await page.getByRole('textbox', { name: /Amendment description/ }).fill('Request specialist review.')
  await submit.click()
  assert.match(await alert.innerText(), /Acknowledge the unresolved risk/)
  assert.equal(await record.count(), 0)
  await risk.check()
  await submit.click()
  assert.equal(await field(page, 'human_decision').innerText(), 'AMENDED')
  assert.equal(await field(page, 'human_amendments').innerText(), 'Request specialist review.')
  assert.equal(await field(page, 'execution_status').innerText(), 'No external action executed')
  await page.reload()
  await button('Open review').click()
  assert.equal(await record.count(), 0)
})

test('Command Centre approval is version-bound and checkpoint replay grants no authority', async () => {
  await page.goto(command)
  await shown('No live integrations')
  await shown('Human approval required')
  const submit = button(/Submit human decision/)
  const audit = page.locator('#audit-record')
  await button('Policy Blocked').click()
  assert.ok(await submit.isDisabled())
  await button('All', page.locator('#work-queue')).click()
  await button(/SYN-CMD-001/, page.locator('#work-queue')).click()
  await page.getByRole('radio', { name: 'Approve simulated brief preparation' }).check()
  await submit.click()
  assert.match(await page.getByRole('alert').innerText(), /written rationale/i)
  await visible(audit.getByText('No temporary Decision Record'))
  const rationale = 'Approve preparation of the fictional internal brief only.'
  await page.getByLabel('Written rationale').fill(rationale)
  await submit.click()
  assert.equal(await field(audit, 'Rationale').innerText(), rationale)
  assert.equal(await field(audit, 'Execution status').innerText(), 'No external execution')
  await button('Propose material plan change').click()
  assert.equal(await field(audit, 'Resulting approval state').innerText(), 'INVALIDATED')
  assert.equal(await field(audit, 'Resulting execution-authority state').innerText(), 'NONE')
  const replay = button('Replay Governance Evaluation')
  assert.ok(await submit.isDisabled())
  assert.ok(await replay.isDisabled())
  await button('Review Plan v2 example policy result').click()
  assert.ok(await replay.isDisabled())
  assert.ok(await submit.isDisabled())
  await button('Review Plan v2 example impact assessment').click()
  await replay.click()
  await shown('MATERIAL GOVERNANCE RESULT: MATCH')
  assert.equal(await field(page, 'Authority Granted By Replay').innerText(), 'NONE')
  assert.equal(await field(page.getByRole('status').filter({ hasText: 'Replay Verification Record' }), 'External Action').innerText(), 'NONE')
  assert.deepEqual(await field(audit, 'Bound plan version').allInnerTexts(), ['v1'])
  assert.equal(await page.getByRole('radio', { name: 'Approve simulated brief preparation' }).isChecked(), false)
  await page.reload()
  await visible(audit.getByText('No temporary Decision Record'))
  assert.equal(await replay.count(), 0)
})
