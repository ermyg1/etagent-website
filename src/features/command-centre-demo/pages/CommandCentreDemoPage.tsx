import { useMemo, useRef, useState, type FormEvent } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Globe2,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { PageLayout } from '../../../components/layout'
import { fictionalDecisionTimestamp, initialWorkItems, intelligenceSignals, pipeline } from '../data'
import type { Decision, DecisionRecord, QueueFilter, WorkItem } from '../types'
import '../styles/command-centre-demo.css'

const sections = [
  ['overview', 'Overview'],
  ['intelligence', 'Intelligence'],
  ['work-queue', 'Work Queue'],
  ['approvals', 'Human Approvals'],
  ['audit-record', 'Audit Record'],
] as const

const filters: QueueFilter[] = [
  'All',
  'Intelligence',
  'Operational Review',
  'Awaiting Approval',
  'Policy Blocked',
]

const decisionLabels: Record<Decision, string> = {
  approve: 'Approve simulated brief preparation',
  decline: 'Decline',
  'more-evidence': 'Request more evidence',
}

function matchesFilter(item: WorkItem, filter: QueueFilter) {
  if (filter === 'All') return true
  if (filter === 'Intelligence' || filter === 'Operational Review') return item.category === filter
  if (filter === 'Awaiting Approval') return item.status === 'Awaiting human decision'
  return item.status === 'Policy blocked'
}

function DetailList({ item }: { item: WorkItem }) {
  const details = [
    ['Case identifier', item.id],
    ['Workflow category', item.category],
    ['Current status', item.status],
    ['Fictional subject or organisation', item.subject],
    ['Request', item.request],
    ['Objective', item.objective],
    ['Scope', item.scope],
    ['Represented sources', item.sources.join(' · ')],
    ['Evidence status', item.evidenceStatus],
    ['Required human decision', item.requiredDecision],
    ['Possible simulated outcome', item.simulatedOutcome],
  ]

  return (
    <dl className="cc-detail-list">
      {details.map(([term, value]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ImpactSummaryView({ item }: { item: WorkItem }) {
  const impact = item.impact
  const details = [
    ['Reference', impact.reference],
    ['Proposed action', impact.proposedAction],
    ['Intended purpose', impact.intendedPurpose],
    ['Evidence used', impact.evidenceUsed],
    ['Evidence gaps', impact.evidenceGaps],
    ['Privacy impact', impact.privacyImpact],
    ['Reputational impact', impact.reputationalImpact],
    ['External systems affected', impact.externalSystemsAffected],
    ['Reversibility', impact.reversibility],
    ['Authority required', impact.authorityRequired],
    ['What will happen if approved', impact.ifApproved],
    ['What will not happen if approved', impact.willNotHappen],
  ]

  return (
    <div className="cc-impact">
      <h3>Impact Summary</h3>
      <dl>
        {details.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function CommandCentreDemoPage() {
  const [workItems, setWorkItems] = useState(initialWorkItems)
  const [filter, setFilter] = useState<QueueFilter>('All')
  const [selectedId, setSelectedId] = useState(initialWorkItems[0].id)
  const [decision, setDecision] = useState<Decision | ''>('')
  const [rationale, setRationale] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [record, setRecord] = useState<DecisionRecord | null>(null)
  const errorRef = useRef<HTMLDivElement>(null)
  const recordHeadingRef = useRef<HTMLHeadingElement>(null)

  const visibleItems = useMemo(
    () => workItems.filter((item) => matchesFilter(item, filter)),
    [filter, workItems],
  )
  const selected = visibleItems.find((item) => item.id === selectedId) ?? visibleItems[0]
  const creatorSelected = selected?.id === 'SYN-CMD-001'

  const applyFilter = (nextFilter: QueueFilter) => {
    const nextVisibleItems = workItems.filter((item) => matchesFilter(item, nextFilter))
    setFilter(nextFilter)
    if (!nextVisibleItems.some((item) => item.id === selectedId)) {
      setSelectedId(nextVisibleItems[0]?.id ?? '')
    }
  }

  const metrics = useMemo(() => ({
    open: workItems.filter((item) => !['Policy blocked', 'Simulated outcome prepared', 'Declined by human reviewer'].includes(item.status)).length,
    gaps: workItems.reduce((count, item) => count + item.evidenceGaps.length, 0),
    awaiting: workItems.filter((item) => item.status === 'Awaiting human decision').length,
    blocked: workItems.filter((item) => item.status === 'Policy blocked').length,
    records: record ? 1 : 0,
  }), [record, workItems])

  const submitDecision = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (record) return

    const nextErrors = []
    if (!decision) nextErrors.push('Select a human decision.')
    if (!rationale.trim()) nextErrors.push('Provide a written rationale.')
    setErrors(nextErrors)
    if (nextErrors.length) {
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }

    const resolvedDecision = decision as Decision
    const outcome = resolvedDecision === 'approve'
      ? 'Simulated draft outreach brief prepared for internal human review; nothing sent.'
      : resolvedDecision === 'decline'
        ? 'Proposal declined; no brief prepared and no external action taken.'
        : 'Additional evidence requested; preparation remains stopped and no external action taken.'
    const status = resolvedDecision === 'approve'
      ? 'Simulated outcome prepared'
      : resolvedDecision === 'decline'
        ? 'Declined by human reviewer'
        : 'More evidence requested'

    setWorkItems((items) => items.map((item) => item.id === 'SYN-CMD-001' ? { ...item, status, simulatedOutcome: outcome } : item))
    setRecord({
      id: 'SYN-DEC-CMD-001-A',
      workItemId: 'SYN-CMD-001',
      timestamp: fictionalDecisionTimestamp,
      decision: decisionLabels[resolvedDecision],
      rationale: rationale.trim(),
      policyResults: initialWorkItems[0].policies,
      impactReference: initialWorkItems[0].impact.reference,
      simulatedOutcome: outcome,
      executionStatus: 'No external execution',
      dataClassification: 'Synthetic demonstration data — fictional records only',
      externalSystemsAffected: 'None',
      limitation: 'Temporary browser-local demonstration record',
    })
    setErrors([])
    requestAnimationFrame(() => recordHeadingRef.current?.focus())
  }

  const resetDemo = () => {
    setWorkItems(initialWorkItems)
    setFilter('All')
    setSelectedId(initialWorkItems[0].id)
    setDecision('')
    setRationale('')
    setErrors([])
    setRecord(null)
  }

  return (
    <PageLayout>
      <div className="command-centre-demo">
        <header className="cc-hero">
          <p className="cc-kicker">E.T Agent · Governed workspace</p>
          <h1>Command Centre</h1>
          <p className="cc-hero__intro">Review synthetic intelligence, governed work, human decisions and factual audit evidence from one bounded enterprise interface.</p>
          <ul className="cc-statuses" aria-label="Demonstration status">
            {['Synthetic demo', 'Plan and review only', 'No live integrations', 'Human approval required'].map((status) => <li key={status}>{status}</li>)}
          </ul>
          <div className="cc-disclosure" role="note">
            <ShieldCheck aria-hidden="true" />
            <p>This demonstration uses fictional records and browser-local state. E.T Agent does not access external accounts or perform operational actions.</p>
          </div>
          <p className="cc-reset-note">Refreshing or resetting clears temporary demo state.</p>
        </header>

        <div className="cc-shell">
          <nav aria-label="Command Centre sections" className="cc-local-nav">
            <p>Command Centre</p>
            <ul>
              {sections.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
            </ul>
          </nav>

          <div className="cc-content">
            <section aria-labelledby="overview-title" id="overview">
              <div className="cc-section-heading"><p>Workspace state</p><h2 id="overview-title">Overview</h2></div>
              <dl className="cc-metrics">
                {[
                  ['Open work items', metrics.open], ['Evidence gaps', metrics.gaps],
                  ['Awaiting human decision', metrics.awaiting], ['Policy-blocked items', metrics.blocked],
                  ['Temporary audit records', metrics.records],
                ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
              <h3>Governance pipeline</h3>
              <ol className="cc-pipeline">
                {pipeline.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><small>{body}</small></li>)}
              </ol>
            </section>

            <section aria-labelledby="intelligence-title" id="intelligence">
              <div className="cc-section-heading"><p>Prepared assessment</p><h2 id="intelligence-title">Intelligence</h2></div>
              <article className="cc-panel">
                <div className="cc-panel__header"><div><p className="cc-kicker">SYN-CMD-001 · Synthetic</p><h3>Public-presence intelligence brief</h3></div><Globe2 aria-hidden="true" /></div>
                <p><strong>Fictional subject overview:</strong> Mara Vale is a fictional independent creator represented as publishing practical design education and studio-process content. This is a system-prepared assessment, not a verified fact or suitability decision.</p>
                <div className="cc-signal-grid">
                  {intelligenceSignals.map((signal) => (
                    <article className="cc-signal-card" key={signal.platform}>
                      <header><FileSearch aria-hidden="true" /><h4>{signal.platform}</h4><span>Synthetic</span></header>
                      <dl>
                        <div><dt>Source type</dt><dd>{signal.source}</dd></div>
                        <div><dt>Evidence classification</dt><dd>{signal.classification}</dd></div>
                        <div><dt>Confidence</dt><dd>{signal.confidence}</dd></div>
                        <div><dt>Content themes</dt><dd>{signal.themes}</dd></div>
                        <div><dt>Audience relevance</dt><dd>{signal.audience}</dd></div>
                        <div><dt>Engagement indicators</dt><dd>{signal.engagement}</dd></div>
                        <div><dt>Public business contact</dt><dd>{signal.contact}</dd></div>
                      </dl>
                    </article>
                  ))}
                </div>
                <div className="cc-intelligence-boundaries">
                  <div><h4>Synthetic evidence</h4><p>Fictional represented channels and signals only.</p></div>
                  <div><h4>System-prepared assessment</h4><p>Potential thematic alignment; not a verified claim.</p></div>
                  <div><h4>Unresolved evidence gaps</h4><ul>{initialWorkItems[0].evidenceGaps.map((gap) => <li key={gap}>{gap}</li>)}</ul></div>
                  <div><h4>Human-owned judgement</h4><p>Suitability, reputational context and any future engagement decision.</p></div>
                </div>
                <p className="cc-notice"><AlertTriangle aria-hidden="true" /> Limitations: no private contact discovery, data brokerage, identity or sensitive-trait inference, facial recognition, location tracking, private messages, credentials, automated outreach, scraping or mass contact collection.</p>
              </article>
            </section>

            <section aria-labelledby="queue-title" id="work-queue">
              <div className="cc-section-heading"><p>Governed cases</p><h2 id="queue-title">Work Queue</h2></div>
              <div aria-label="Filter work queue" className="cc-filters" role="group">
                {filters.map((item) => <button aria-pressed={filter === item} key={item} onClick={() => applyFilter(item)} type="button">{item}</button>)}
              </div>
              <div className="cc-workspace">
                <div className="cc-queue" aria-live="polite">
                  {visibleItems.length ? visibleItems.map((item) => (
                    <button aria-pressed={selected?.id === item.id} className="cc-queue-item" key={item.id} onClick={() => setSelectedId(item.id)} type="button">
                      <span>{item.id}</span><strong>{item.title}</strong><small>{item.category} · {item.status}</small>
                    </button>
                  )) : <p className="cc-empty">No synthetic work items match this filter.</p>}
                </div>
                {selected ? (
                  <article className="cc-selected">
                    <header><div><p className="cc-kicker">Selected work item</p><h3>{selected.title}</h3></div><span className="cc-state">{selected.status}</span></header>
                    <DetailList item={selected} />
                    {selected.relatedHref && <a className="cc-related-link" href={selected.relatedHref}>Open dedicated demonstration <ArrowUpRight aria-hidden="true" /></a>}
                    <div className="cc-two-column"><div><h3>Evidence gaps</h3><ul>{selected.evidenceGaps.map((gap) => <li key={gap}>{gap}</li>)}</ul></div><div><h3>Recommendation</h3><p>{selected.recommendation}</p></div></div>
                    <div className="cc-policy-list"><h3>Named governance controls</h3>{selected.policies.map((policy) => <article key={policy.code}><div><strong>{policy.code} — {policy.name}</strong><span>{policy.result}</span></div><p>{policy.explanation}</p></article>)}</div>
                    <ImpactSummaryView item={selected} />
                  </article>
                ) : <div className="cc-selected cc-empty">Select a visible work item to inspect its details.</div>}
              </div>
            </section>

            <section aria-labelledby="approvals-title" id="approvals">
              <div className="cc-section-heading"><p>Human authority</p><h2 id="approvals-title">Human Approvals</h2></div>
              <article className="cc-panel">
                <div className="cc-panel__header"><div><p className="cc-kicker">SYN-CMD-001</p><h3>Decision: simulated brief preparation</h3></div><UserCheck aria-hidden="true" /></div>
                <p>No external action will occur. Approval authorises only a browser-local simulated preparation outcome.</p>
                {!creatorSelected && !record && <p className="cc-lock"><LockKeyhole aria-hidden="true" /> Select SYN-CMD-001 in the Work Queue to unlock this decision.</p>}
                {record ? <p className="cc-complete"><CheckCircle2 aria-hidden="true" /> Decision completed. The temporary record cannot be edited unless the entire synthetic demo is reset.</p> : (
                  <form noValidate onSubmit={submitDecision}>
                    {errors.length > 0 && <div aria-labelledby="approval-errors-title" className="cc-error-summary" ref={errorRef} role="alert" tabIndex={-1}><h4 id="approval-errors-title">Correct the following</h4><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
                    <fieldset disabled={!creatorSelected}>
                      <legend>Human decision</legend>
                      {Object.entries(decisionLabels).map(([value, label]) => <label key={value}><input checked={decision === value} name="decision" onChange={() => setDecision(value as Decision)} type="radio" value={value} /> <span>{label}</span></label>)}
                      <label className="cc-rationale" htmlFor="decision-rationale">Written rationale</label>
                      <textarea id="decision-rationale" onChange={(event) => setRationale(event.target.value)} rows={5} value={rationale} />
                      <button type="submit">Submit human decision</button>
                    </fieldset>
                  </form>
                )}
              </article>
            </section>

            <section aria-labelledby="audit-title" id="audit-record">
              <div className="cc-section-heading"><p>Inspection-ready evidence</p><h2 id="audit-title" ref={recordHeadingRef} tabIndex={-1}>Decision Record</h2></div>
              {record ? (
                <article className="cc-record">
                  <div className="cc-panel__header"><div><p className="cc-kicker">Completed · Temporary</p><h3>{record.id}</h3></div><ClipboardCheck aria-hidden="true" /></div>
                  <dl className="cc-detail-list">
                    {[
                      ['Record identifier', record.id], ['Work-item identifier', record.workItemId], ['Fictional timestamp', record.timestamp],
                      ['Decision', record.decision], ['Rationale', record.rationale], ['Impact Summary reference', record.impactReference],
                      ['Simulated outcome', record.simulatedOutcome], ['Execution status', record.executionStatus], ['Data classification', record.dataClassification],
                      ['External systems affected', record.externalSystemsAffected], ['Record limitation', record.limitation],
                    ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
                  </dl>
                  <h3>Named policy results</h3>
                  <ul className="cc-record-policies">{record.policyResults.map((policy) => <li key={policy.code}><strong>{policy.code}</strong><span>{policy.result}</span></li>)}</ul>
                </article>
              ) : <div className="cc-empty cc-empty--record"><ClipboardCheck aria-hidden="true" /><h3>No temporary Decision Record</h3><p>A record appears after a valid human decision for SYN-CMD-001.</p></div>}
              <button className="cc-reset" onClick={resetDemo} type="button"><RotateCcw aria-hidden="true" /> Reset synthetic demo</button>
              <p className="cc-reset-note">This restarts the fictional browser-local demonstration. It does not edit or delete a record in a real system.</p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
