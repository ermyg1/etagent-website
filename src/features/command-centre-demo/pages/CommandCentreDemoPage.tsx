import { useMemo, useRef, useState, type FormEvent, type RefObject } from 'react'
import {
  AlertTriangle, ArrowUpRight, CheckCircle2, ClipboardCheck, FileSearch, FileWarning,
  Globe2, LockKeyhole, RotateCcw, ShieldCheck, UserCheck,
} from 'lucide-react'
import { PageLayout } from '../../../components/layout'
import {
  fictionalDecisionTimestamp, fictionalInvalidationTimestamp, fictionalSecondDecisionTimestamp,
  canonicalizeReplayInput, evaluateGovernanceReplay, initialWorkItems, intelligenceSignals, pipeline,
  planV1, planV2, planV2PreApprovalCheckpoint, planV2ReplayInput, recordedPlanV2GovernanceResult,
  replayComparisonLabels,
} from '../data'
import type {
  ApprovalEvidence, ApprovalInvalidationRecord, AuthoritativePlan, Decision, DecisionRecord,
  QueueFilter, ReplayComparisonField, ReplayEvaluationAttempt, ReplayVerificationRecord, WorkItem,
} from '../types'
import '../styles/command-centre-demo.css'

const sections = [
  ['overview', 'Overview'], ['intelligence', 'Intelligence'], ['work-queue', 'Work Queue'],
  ['approvals', 'Human Approvals'], ['audit-record', 'Audit Record'],
] as const

const filters: QueueFilter[] = ['All', 'Intelligence', 'Operational Review', 'Awaiting Approval', 'Policy Blocked']

const decisionLabels: Record<Decision, string> = {
  approve: 'Approve simulated brief preparation', decline: 'Decline', 'more-evidence': 'Request more evidence',
}

const replayComparisonFields: ReplayComparisonField[] = [
  'policyEvaluation', 'impactAssessment', 'humanApprovalRequirement', 'executionAuthority',
  'simulatedGovernanceOutcome', 'externalAction',
]

type PlanVersion = 1 | 2
type V2GovernanceStage = 'refresh-required' | 'policy-established' | 'impact-established'
type PlanGovernanceDetails = { policy: string; impact: string; approval: string; execution: string; outcome: string }

function matchesFilter(item: WorkItem, filter: QueueFilter) {
  if (filter === 'All') return true
  if (filter === 'Intelligence' || filter === 'Operational Review') return item.category === filter
  if (filter === 'Awaiting Approval') return item.status === 'Awaiting human decision' || item.status === 'Governance refresh required'
  return item.status === 'Policy blocked'
}

function DetailList({ item }: { item: WorkItem }) {
  const details = [
    ['Case identifier', item.id], ['Workflow category', item.category], ['Current status', item.status],
    ['Fictional subject or organisation', item.subject], ['Request', item.request], ['Objective', item.objective],
    ['Scope', item.scope], ['Represented sources', item.sources.join(' · ')], ['Evidence status', item.evidenceStatus],
    ['Required human decision', item.requiredDecision], ['Possible simulated outcome', item.simulatedOutcome],
  ]
  return <dl className="cc-detail-list">{details.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
}

function ImpactSummaryView({ item }: { item: WorkItem }) {
  const impact = item.impact
  const details = [
    ['Reference', impact.reference], ['Proposed action', impact.proposedAction], ['Intended purpose', impact.intendedPurpose],
    ['Evidence used', impact.evidenceUsed], ['Evidence gaps', impact.evidenceGaps], ['Privacy impact', impact.privacyImpact],
    ['Reputational impact', impact.reputationalImpact], ['External systems affected', impact.externalSystemsAffected],
    ['Reversibility', impact.reversibility], ['Authority required', impact.authorityRequired],
    ['What will happen if approved', impact.ifApproved], ['What will not happen if approved', impact.willNotHappen],
  ]
  return <div className="cc-impact"><h3>Impact Summary</h3><dl>{details.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl></div>
}

function PlanSnapshot({ plan, current, governance, headingRef }: {
  plan: AuthoritativePlan
  current: boolean
  governance: PlanGovernanceDetails
  headingRef?: RefObject<HTMLHeadingElement | null>
}) {
  const details = [
    ['Plan ID', plan.id], ['Plan version', `v${plan.version}`], ['Deterministic plan reference', plan.reference],
    ['Policy reference', plan.policyReference], ['Impact reference', plan.impactReference],
    ['Material field — communication scope', plan.communicationScope], ['Proposed action', plan.proposedAction],
    ['Policy evaluation', governance.policy], ['Impact assessment', governance.impact], ['Human approval', governance.approval],
    ['Execution authority', governance.execution], ['Simulated outcome', governance.outcome],
  ]
  return (
    <article className={`cc-plan ${current ? 'cc-plan--current' : 'cc-plan--historical'}`}>
      <header><div><p className="cc-kicker">{current ? 'Current authoritative plan' : 'Historical immutable plan'}</p><h3 ref={headingRef} tabIndex={headingRef ? -1 : undefined}>Plan v{plan.version}</h3></div><span className="cc-state">{current ? 'AUTHORITATIVE' : 'HISTORICAL'}</span></header>
      <p className="cc-plan-reference-note">The plan reference is a deterministic demonstration identifier, not a cryptographic digest.</p>
      <dl className="cc-detail-list">{details.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
      {!current && <p className="cc-history-note"><LockKeyhole aria-hidden="true" /> Plan v1 remains preserved as reviewed and was not edited.</p>}
    </article>
  )
}

export function CommandCentreDemoPage() {
  const [workItems, setWorkItems] = useState(initialWorkItems)
  const [filter, setFilter] = useState<QueueFilter>('All')
  const [selectedId, setSelectedId] = useState(initialWorkItems[0].id)
  const [decision, setDecision] = useState<Decision | ''>('')
  const [rationale, setRationale] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [currentPlanVersion, setCurrentPlanVersion] = useState<PlanVersion>(1)
  const [v2GovernanceStage, setV2GovernanceStage] = useState<V2GovernanceStage>('refresh-required')
  const [decisionRecords, setDecisionRecords] = useState<DecisionRecord[]>([])
  const [approvalEvidence, setApprovalEvidence] = useState<ApprovalEvidence[]>([])
  const [invalidationRecord, setInvalidationRecord] = useState<ApprovalInvalidationRecord | null>(null)
  const [replayAttempt, setReplayAttempt] = useState<ReplayEvaluationAttempt | null>(null)
  const [replayRecord, setReplayRecord] = useState<ReplayVerificationRecord | null>(null)
  const [replayError, setReplayError] = useState('')
  const errorRef = useRef<HTMLDivElement>(null)
  const recordHeadingRef = useRef<HTMLHeadingElement>(null)
  const currentPlanHeadingRef = useRef<HTMLHeadingElement>(null)

  const visibleItems = useMemo(() => workItems.filter((item) => matchesFilter(item, filter)), [filter, workItems])
  const selected = visibleItems.find((item) => item.id === selectedId) ?? visibleItems[0]
  const creatorSelected = selected?.id === 'SYN-CMD-001'
  const currentPlan = currentPlanVersion === 1 ? planV1 : planV2
  const currentDecisionRecord = decisionRecords.find((record) => record.planVersion === currentPlanVersion)
  const currentApproval = approvalEvidence.find((approval) => approval.boundPlanVersion === currentPlanVersion)
  const v1Approval = approvalEvidence.find((approval) => approval.boundPlanVersion === 1)
  const v2GovernanceReady = currentPlanVersion === 1 || v2GovernanceStage === 'impact-established'
  const replayCheckpointReady = currentPlanVersion === 2
    && v2GovernanceStage === 'impact-established'
    && !currentDecisionRecord
    && !currentApproval

  const planGovernance = (version: PlanVersion): PlanGovernanceDetails => {
    const approval = approvalEvidence.find((item) => item.boundPlanVersion === version)
    const decisionRecord = decisionRecords.find((item) => item.planVersion === version)
    if (version === 1) {
      if (currentPlanVersion === 2) return {
        policy: 'ESTABLISHED FOR PLAN V1 — HISTORICAL', impact: 'ESTABLISHED FOR PLAN V1 — HISTORICAL',
        approval: 'INVALIDATED — NOT AUTHORITY FOR PLAN V2', execution: 'NONE FOR CURRENT PLAN',
        outcome: 'HISTORICAL SIMULATED OUTCOME — NO CURRENT AUTHORITY',
      }
      return {
        policy: 'ESTABLISHED FOR PLAN V1', impact: 'ESTABLISHED FOR PLAN V1',
        approval: approval ? `APPROVED — ${approval.reference}` : decisionRecord ? 'NOT GRANTED — HUMAN DECISION RECORDED' : 'REQUIRED',
        execution: approval ? 'SIMULATED OUTCOME ONLY' : 'NONE',
        outcome: approval ? 'AVAILABLE — BROWSER-LOCAL ONLY' : decisionRecord ? 'BLOCKED — NO APPROVAL' : 'BLOCKED PENDING HUMAN DECISION',
      }
    }
    return {
      policy: v2GovernanceStage === 'refresh-required' ? 'REFRESH REQUIRED' : 'ESTABLISHED FOR PLAN V2',
      impact: v2GovernanceStage === 'impact-established' ? 'ESTABLISHED FOR PLAN V2' : 'REFRESH REQUIRED',
      approval: approval ? `APPROVED — ${approval.reference}` : decisionRecord ? 'NOT GRANTED — HUMAN DECISION RECORDED' : 'REQUIRED',
      execution: approval ? 'SIMULATED OUTCOME ONLY' : 'NONE',
      outcome: approval ? 'AVAILABLE — BROWSER-LOCAL ONLY' : decisionRecord ? 'BLOCKED — NO APPROVAL' : 'BLOCKED PENDING GOVERNANCE',
    }
  }

  const applyFilter = (nextFilter: QueueFilter) => {
    const nextVisibleItems = workItems.filter((item) => matchesFilter(item, nextFilter))
    setFilter(nextFilter)
    if (!nextVisibleItems.some((item) => item.id === selectedId)) setSelectedId(nextVisibleItems[0]?.id ?? '')
  }

  const metrics = useMemo(() => ({
    open: workItems.filter((item) => !['Policy blocked', 'Simulated outcome prepared', 'Declined by human reviewer'].includes(item.status)).length,
    gaps: workItems.reduce((count, item) => count + item.evidenceGaps.length, 0),
    awaiting: workItems.filter((item) => item.status === 'Awaiting human decision' || item.status === 'Governance refresh required').length,
    blocked: workItems.filter((item) => item.status === 'Policy blocked').length,
    records: decisionRecords.length + (invalidationRecord ? 1 : 0) + (replayRecord ? 1 : 0),
  }), [decisionRecords, invalidationRecord, replayRecord, workItems])

  const submitDecision = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentDecisionRecord || !v2GovernanceReady) return
    const nextErrors = []
    if (!decision) nextErrors.push('Select a human decision.')
    if (!rationale.trim()) nextErrors.push('Provide a written rationale.')
    setErrors(nextErrors)
    if (nextErrors.length) { requestAnimationFrame(() => errorRef.current?.focus()); return }

    const resolvedDecision = decision as Decision
    const approvedOutcome = currentPlanVersion === 1
      ? 'Simulated draft outreach brief prepared for internal human review; nothing sent.'
      : 'Simulated draft outreach brief prepared for internal and fictional external-agency review; nothing sent or shared.'
    const outcome = resolvedDecision === 'approve' ? approvedOutcome : resolvedDecision === 'decline'
      ? 'Proposal declined; no brief prepared and no external action taken.'
      : 'Additional evidence requested; preparation remains stopped and no external action taken.'
    const status = resolvedDecision === 'approve' ? 'Simulated outcome prepared' : resolvedDecision === 'decline'
      ? 'Declined by human reviewer' : 'More evidence requested'
    const approvalReference = resolvedDecision === 'approve' ? `SYN-APR-CMD-001-V${currentPlanVersion}` : 'Not applicable — no approval created'

    setWorkItems((items) => items.map((item) => item.id === 'SYN-CMD-001' ? { ...item, status, simulatedOutcome: outcome } : item))
    setDecisionRecords((records) => [...records, {
      id: `SYN-DEC-CMD-001-${currentPlanVersion === 1 ? 'A' : 'B'}`, workItemId: 'SYN-CMD-001',
      planId: currentPlan.id, planVersion: currentPlan.version, planReference: currentPlan.reference, approvalReference,
      timestamp: currentPlanVersion === 1 ? fictionalDecisionTimestamp : fictionalSecondDecisionTimestamp,
      decision: decisionLabels[resolvedDecision], rationale: rationale.trim(), policyResults: initialWorkItems[0].policies,
      impactReference: currentPlan.impactReference, simulatedOutcome: outcome, executionStatus: 'No external execution',
      dataClassification: 'Synthetic demonstration data — fictional records only', externalSystemsAffected: 'None',
      limitation: 'Temporary browser-local demonstration record',
    }])
    if (resolvedDecision === 'approve') setApprovalEvidence((approvals) => [...approvals, {
      reference: approvalReference, timestamp: currentPlanVersion === 1 ? fictionalDecisionTimestamp : fictionalSecondDecisionTimestamp,
      boundPlanId: currentPlan.id, boundPlanVersion: currentPlan.version, boundPlanReference: currentPlan.reference,
      status: 'VALID — CURRENT PLAN',
    }])
    setErrors([])
    requestAnimationFrame(() => recordHeadingRef.current?.focus())
  }

  const proposeMaterialChange = () => {
    if (!v1Approval || v1Approval.status !== 'VALID — CURRENT PLAN' || currentPlanVersion !== 1) return
    setCurrentPlanVersion(2)
    setV2GovernanceStage('refresh-required')
    setDecision('')
    setRationale('')
    setErrors([])
    setWorkItems((items) => items.map((item) => item.id === 'SYN-CMD-001' ? {
      ...item, status: 'Governance refresh required',
      impact: { ...item.impact, reference: planV2.impactReference, proposedAction: planV2.proposedAction,
        reputationalImpact: 'The broader fictional review audience changes disclosure risk and requires renewed human judgement.',
        ifApproved: 'After refreshed governance and fresh approval, a browser-local simulated outcome and new Decision Record may appear.' },
      requiredDecision: 'Refresh governance evaluation and provide a fresh human decision for Plan v2.',
      simulatedOutcome: 'Blocked pending governance; no external action taken.',
    } : item))
    setApprovalEvidence((approvals) => approvals.map((approval) => approval.boundPlanVersion === 1 ? {
      ...approval, status: 'INVALIDATED', reasonCode: 'APPROVAL_INVALIDATED_PLAN_CHANGED',
    } : approval))
    setInvalidationRecord({
      id: 'SYN-AUD-CMD-001-PLAN-CHANGE-A', timestamp: fictionalInvalidationTimestamp,
      previousPlanId: planV1.id, previousPlanVersion: planV1.version, previousPlanReference: planV1.reference,
      newPlanId: planV2.id, newPlanVersion: planV2.version, newPlanReference: planV2.reference,
      previousApprovalReference: v1Approval.reference, previousApprovalState: 'VALID — CURRENT PLAN',
      resultingApprovalState: 'INVALIDATED', reasonCode: 'APPROVAL_INVALIDATED_PLAN_CHANGED',
      resultingExecutionAuthority: 'NONE', externalAction: 'No external action occurred',
    })
    requestAnimationFrame(() => currentPlanHeadingRef.current?.focus())
  }

  const refreshPolicyEvaluation = () => {
    if (currentPlanVersion === 2 && v2GovernanceStage === 'refresh-required') setV2GovernanceStage('policy-established')
  }
  const refreshImpactAssessment = () => {
    if (currentPlanVersion !== 2 || v2GovernanceStage !== 'policy-established') return
    setV2GovernanceStage('impact-established')
    setWorkItems((items) => items.map((item) => item.id === 'SYN-CMD-001' ? { ...item, status: 'Awaiting human decision' } : item))
  }
  const replayGovernanceEvaluation = async () => {
    if (!replayCheckpointReady) return
    setReplayAttempt(null)
    setReplayRecord(null)
    setReplayError('')

    try {
      if (!globalThis.crypto?.subtle) throw new Error('Web Crypto SHA-256 is unavailable.')
      const canonicalInput = canonicalizeReplayInput(planV2ReplayInput)
      const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonicalInput))
      const inputFingerprint = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
      const replayResult = evaluateGovernanceReplay(planV2ReplayInput)
      const comparisons = replayComparisonFields.map((field) => ({
        field,
        label: replayComparisonLabels[field],
        original: recordedPlanV2GovernanceResult[field],
        replay: replayResult[field],
        status: recordedPlanV2GovernanceResult[field] === replayResult[field] ? 'MATCH' as const : 'MISMATCH' as const,
      }))
      const materialResult = comparisons.every((comparison) => comparison.status === 'MATCH') ? 'MATCH' as const : 'MISMATCH' as const
      const attempt: ReplayEvaluationAttempt = { inputFingerprint, comparisons, materialResult }
      setReplayAttempt(attempt)

      if (materialResult === 'MATCH') setReplayRecord({
        replayReference: 'SYN-RPL-CMD-001-V2-01',
        sourceGovernanceCheckpoint: planV2PreApprovalCheckpoint.reference,
        checkpointState: planV2PreApprovalCheckpoint.state,
        decisionRecordAtReplayTime: planV2PreApprovalCheckpoint.decisionRecordAtReplayTime,
        planId: planV2.id,
        planVersion: planV2.version,
        planReference: planV2.reference,
        inputFingerprint,
        comparisons,
        materialResult,
        authorityGrantedByReplay: 'NONE',
        externalAction: 'NONE',
        status: 'Temporary browser-local synthetic replay evidence',
      })
    } catch {
      setReplayError('Replay verification could not be completed because browser-local SHA-256 generation failed or is unavailable. No verification record was created and no authority was granted.')
    }
  }
  const resetDemo = () => {
    setWorkItems(initialWorkItems); setFilter('All'); setSelectedId(initialWorkItems[0].id); setDecision(''); setRationale('')
    setErrors([]); setCurrentPlanVersion(1); setV2GovernanceStage('refresh-required'); setDecisionRecords([])
    setApprovalEvidence([]); setInvalidationRecord(null); setReplayAttempt(null); setReplayRecord(null); setReplayError('')
  }

  return (
    <PageLayout><div className="command-centre-demo">
      <header className="cc-hero">
        <p className="cc-kicker">E.T Agent · Governed workspace</p><h1>Command Centre</h1>
        <p className="cc-hero__intro">Review synthetic intelligence, governed work, human decisions and factual audit evidence from one bounded enterprise interface.</p>
        <ul className="cc-statuses" aria-label="Demonstration status">{['Synthetic demo', 'PLAN_ONLY or SIMULATED', 'No live integrations', 'Human approval required'].map((status) => <li key={status}>{status}</li>)}</ul>
        <div className="cc-disclosure" role="note"><ShieldCheck aria-hidden="true" /><p>This demonstration uses fictional records and temporary browser-local state. Outcomes are simulated. E.T Agent does not access external accounts, call live integrations or perform operational actions. No AI model or inference provider is invoked. The intelligence, policy and impact outputs shown here are represented fixtures for this synthetic workflow.</p></div>
        <p className="cc-reset-note">Refreshing or resetting clears temporary demo state.</p>
      </header>

      <div className="cc-shell">
        <nav aria-label="Command Centre sections" className="cc-local-nav"><p>Command Centre</p><ul>{sections.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul></nav>
        <div className="cc-content">
          <section aria-labelledby="overview-title" id="overview">
            <div className="cc-section-heading"><p>Workspace state</p><h2 id="overview-title">Overview</h2></div>
            <dl className="cc-metrics">{[
              ['Open work items', metrics.open], ['Evidence gaps', metrics.gaps], ['Awaiting governance or decision', metrics.awaiting],
              ['Policy-blocked items', metrics.blocked], ['Temporary audit records', metrics.records],
            ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <h3>Governance pipeline</h3><ol className="cc-pipeline">{pipeline.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><small>{body}</small></li>)}</ol>
          </section>

          <section aria-labelledby="intelligence-title" id="intelligence">
            <div className="cc-section-heading"><p>Prepared assessment</p><h2 id="intelligence-title">Intelligence</h2></div>
            <article className="cc-panel">
              <div className="cc-panel__header"><div><p className="cc-kicker">SYN-CMD-001 · Synthetic</p><h3>Public-presence intelligence brief</h3></div><Globe2 aria-hidden="true" /></div>
              <p><strong>Fictional subject overview:</strong> Mara Vale is a fictional independent creator represented as publishing practical design education and studio-process content. This is a system-prepared assessment, not a verified fact or suitability decision.</p>
              <div className="cc-signal-grid">{intelligenceSignals.map((signal) => <article className="cc-signal-card" key={signal.platform}>
                <header><FileSearch aria-hidden="true" /><h4>{signal.platform}</h4><span>Synthetic</span></header><dl>
                  <div><dt>Source type</dt><dd>{signal.source}</dd></div><div><dt>Evidence classification</dt><dd>{signal.classification}</dd></div>
                  <div><dt>Confidence</dt><dd>{signal.confidence}</dd></div><div><dt>Content themes</dt><dd>{signal.themes}</dd></div>
                  <div><dt>Audience relevance</dt><dd>{signal.audience}</dd></div><div><dt>Engagement indicators</dt><dd>{signal.engagement}</dd></div>
                  <div><dt>Public business contact</dt><dd>{signal.contact}</dd></div>
                </dl></article>)}</div>
              <div className="cc-intelligence-boundaries"><div><h4>Synthetic evidence</h4><p>Fictional represented channels and signals only.</p></div><div><h4>System-prepared assessment</h4><p>Potential thematic alignment; not a verified claim.</p></div><div><h4>Unresolved evidence gaps</h4><ul>{initialWorkItems[0].evidenceGaps.map((gap) => <li key={gap}>{gap}</li>)}</ul></div><div><h4>Human-owned judgement</h4><p>Suitability, reputational context and any future engagement decision.</p></div></div>
              <p className="cc-notice"><AlertTriangle aria-hidden="true" /> Limitations: no private contact discovery, data brokerage, identity or sensitive-trait inference, facial recognition, location tracking, private messages, credentials, automated outreach, scraping or mass contact collection.</p>
            </article>
          </section>

          <section aria-labelledby="queue-title" id="work-queue">
            <div className="cc-section-heading"><p>Governed cases</p><h2 id="queue-title">Work Queue</h2></div>
            <div aria-label="Filter work queue" className="cc-filters" role="group">{filters.map((item) => <button aria-pressed={filter === item} key={item} onClick={() => applyFilter(item)} type="button">{item}</button>)}</div>
            <div className="cc-workspace"><div className="cc-queue" aria-live="polite">{visibleItems.length ? visibleItems.map((item) => <button aria-pressed={selected?.id === item.id} className="cc-queue-item" key={item.id} onClick={() => setSelectedId(item.id)} type="button"><span>{item.id}</span><strong>{item.title}</strong><small>{item.category} · {item.status}</small></button>) : <p className="cc-empty">No synthetic work items match this filter.</p>}</div>
              {selected ? <article className="cc-selected"><header><div><p className="cc-kicker">Selected work item</p><h3>{selected.title}</h3></div><span className="cc-state">{selected.status}</span></header><DetailList item={selected} />
                {selected.relatedHref && <a className="cc-related-link" href={selected.relatedHref}>Open dedicated demonstration <ArrowUpRight aria-hidden="true" /></a>}
                <div className="cc-two-column"><div><h3>Evidence gaps</h3><ul>{selected.evidenceGaps.map((gap) => <li key={gap}>{gap}</li>)}</ul></div><div><h3>Recommendation</h3><p>{selected.recommendation}</p></div></div>
                <div className="cc-policy-list"><h3>Named governance controls</h3>{selected.policies.map((policy) => <article key={policy.code}><div><strong>{policy.code} — {policy.name}</strong><span>{policy.result}</span></div><p>{policy.explanation}</p></article>)}</div><ImpactSummaryView item={selected} />
              </article> : <div className="cc-selected cc-empty">Select a visible work item to inspect its details.</div>}
            </div>
          </section>

          <section aria-labelledby="approvals-title" id="approvals">
            <div className="cc-section-heading"><p>Human authority</p><h2 id="approvals-title">Human Approvals</h2></div>
            <div className="cc-plan-list"><PlanSnapshot plan={currentPlan} current governance={planGovernance(currentPlanVersion)} headingRef={currentPlanHeadingRef} />{currentPlanVersion === 2 && <PlanSnapshot plan={planV1} current={false} governance={planGovernance(1)} />}</div>

            {currentPlanVersion === 1 && v1Approval?.status === 'VALID — CURRENT PLAN' && <article className="cc-change-control">
              <div className="cc-panel__header"><div><p className="cc-kicker">Controlled plan revision</p><h3>Material communication-scope change</h3></div><FileWarning aria-hidden="true" /></div>
              <p>Propose adding a fictional external-agency reviewer to the simulated brief’s communication scope.</p><dl className="cc-change-comparison"><div><dt>Approved Plan v1</dt><dd>{planV1.communicationScope}</dd></div><div><dt>Proposed Plan v2</dt><dd>{planV2.communicationScope}</dd></div></dl>
              <p>Submitting this predefined change creates Plan v2. Plan v1 stays immutable, and its approval cannot authorise the new plan.</p><button onClick={proposeMaterialChange} type="button">Propose material plan change</button>
            </article>}

            {currentPlanVersion === 2 && <article className="cc-governance-refresh">
              <div className="cc-invalidation-status" role="status"><FileWarning aria-hidden="true" /><div><strong>PAST APPROVAL IS NOT CURRENT AUTHORITY.</strong><span>Plan v1 approval remains historical evidence and is invalidated for Plan v2.</span></div></div>
              <h3>Plan v2 governance sequence</h3><ol className="cc-refresh-steps">
                <li><strong>Policy evaluation</strong><span>{v2GovernanceStage === 'refresh-required' ? 'REFRESH REQUIRED' : 'ESTABLISHED FOR PLAN V2'}</span></li>
                <li><strong>Impact assessment</strong><span>{v2GovernanceStage === 'impact-established' ? 'ESTABLISHED FOR PLAN V2' : 'REFRESH REQUIRED'}</span></li>
                <li><strong>Human approval</strong><span>{currentApproval ? 'APPROVED FOR PLAN V2' : currentDecisionRecord ? 'NOT GRANTED' : 'REQUIRED'}</span></li>
                <li><strong>Execution authority</strong><span>{currentApproval ? 'SIMULATED OUTCOME ONLY' : 'NONE'}</span></li>
                <li><strong>Simulated outcome</strong><span>{currentApproval ? 'AVAILABLE — BROWSER-LOCAL ONLY' : currentDecisionRecord ? 'BLOCKED — NO APPROVAL' : 'BLOCKED PENDING GOVERNANCE'}</span></li>
              </ol>
              {v2GovernanceStage === 'refresh-required' && <button onClick={refreshPolicyEvaluation} type="button">Refresh policy evaluation for Plan v2</button>}
              {v2GovernanceStage === 'policy-established' && <button onClick={refreshImpactAssessment} type="button">Refresh impact assessment for Plan v2</button>}
              {v2GovernanceStage === 'impact-established' && !currentDecisionRecord && <p className="cc-complete"><CheckCircle2 aria-hidden="true" /> Plan v2 policy and impact evaluation are established. A fresh human decision is now required.</p>}
            </article>}

            {currentPlanVersion === 2 && <article className="cc-replay">
              <div className="cc-panel__header"><div><p className="cc-kicker">Deterministic governance replay · Synthetic</p><h3>Replay the Plan v2 governance checkpoint</h3></div><RotateCcw aria-hidden="true" /></div>
              <p>E.T Agent does not claim deterministic AI reasoning. This demonstration verifies that the same version-bound synthetic governance inputs reproduce the same authority-controlling governance result.</p>
              <p>Only the browser-local governance evaluation is replayed. AI reasoning, human judgement, human approval and external execution are outside the replay boundary.</p>
              <dl className="cc-replay-inputs"><div><dt>Scenario</dt><dd>{planV2ReplayInput.scenarioReference}</dd></div><div><dt>Authoritative plan</dt><dd>{planV2ReplayInput.plan.id} · v{planV2ReplayInput.plan.version}</dd></div><div><dt>Plan reference</dt><dd>{planV2ReplayInput.plan.reference}</dd></div><div><dt>Material change</dt><dd>{planV2ReplayInput.materialChange.field} · {planV2ReplayInput.materialChange.classification}</dd></div><div><dt>Policy input</dt><dd>{planV2ReplayInput.policyInput.reference} · established for v{planV2ReplayInput.policyInput.establishedForPlanVersion}</dd></div><div><dt>Impact input</dt><dd>{planV2ReplayInput.impactInput.reference} · established for v{planV2ReplayInput.impactInput.establishedForPlanVersion}</dd></div><div><dt>Execution mode</dt><dd>{planV2ReplayInput.executionMode}</dd></div><div><dt>Fresh human approval</dt><dd>ABSENT</dd></div></dl>
              <div aria-live="polite" className={`cc-replay-availability ${replayCheckpointReady ? 'cc-replay-availability--ready' : ''}`} role="status">
                {replayCheckpointReady
                  ? 'REPLAY CHECKPOINT ESTABLISHED — policy and impact are established for Plan v2; fresh human approval is absent and execution authority is NONE.'
                  : currentDecisionRecord || currentApproval
                    ? 'REPLAY UNAVAILABLE — the pre-approval Plan v2 checkpoint has passed. Reset the synthetic demo to replay that checkpoint again.'
                    : 'REPLAY UNAVAILABLE — establish both the Plan v2 policy evaluation and impact assessment first.'}
              </div>
              <button disabled={!replayCheckpointReady} onClick={replayGovernanceEvaluation} type="button">Replay Governance Evaluation</button>
              {replayError && <div className="cc-replay-error" role="alert"><strong>REPLAY VERIFICATION ERROR</strong><p>{replayError}</p></div>}
              {replayAttempt?.materialResult === 'MISMATCH' && <div aria-live="polite" className="cc-replay-result cc-replay-result--mismatch" role="status">
                <h4>MATERIAL GOVERNANCE RESULT: MISMATCH</h4>
                <p>The replay did not reproduce every recorded material field. No successful verification record was created and no authority was granted.</p>
                <div className="cc-replay-comparisons">{replayAttempt.comparisons.map((comparison) => <article key={comparison.field}><header><strong>{comparison.label}</strong><span className={comparison.status === 'MATCH' ? 'cc-match' : 'cc-mismatch'}>{comparison.status}</span></header><dl><div><dt>Original</dt><dd>{comparison.original}</dd></div><div><dt>Replay</dt><dd>{comparison.replay}</dd></div></dl></article>)}</div>
              </div>}
              {replayRecord && <div aria-live="polite" className="cc-replay-record" role="status">
                <div className="cc-replay-record__header"><div><p className="cc-kicker">Replay Verification Record</p><h4>{replayRecord.replayReference}</h4></div><span className="cc-match">MATERIAL GOVERNANCE RESULT: {replayRecord.materialResult}</span></div>
                <dl className="cc-detail-list"><div><dt>Replay Reference</dt><dd>{replayRecord.replayReference}</dd></div><div><dt>Source Governance Checkpoint</dt><dd>{replayRecord.sourceGovernanceCheckpoint}</dd></div><div><dt>Checkpoint State</dt><dd>{replayRecord.checkpointState}</dd></div><div><dt>Decision Record At Replay Time</dt><dd>{replayRecord.decisionRecordAtReplayTime}</dd></div><div><dt>Plan</dt><dd>{replayRecord.planId}</dd></div><div><dt>Plan Version</dt><dd>v{replayRecord.planVersion}</dd></div><div><dt>Plan Reference</dt><dd>{replayRecord.planReference}</dd></div><div><dt>Authority Granted By Replay</dt><dd>{replayRecord.authorityGrantedByReplay}</dd></div><div><dt>External Action</dt><dd>{replayRecord.externalAction}</dd></div><div><dt>Status</dt><dd>{replayRecord.status}</dd></div></dl>
                <div className="cc-replay-fingerprint"><span>Replay Input Fingerprint</span><strong>SHA-256</strong><code>{replayRecord.inputFingerprint}</code><p>Browser-local SHA-256 fingerprint of the synthetic replay input. This is not a digital signature and does not provide execution authority.</p></div>
                <div className="cc-replay-comparisons">{replayRecord.comparisons.map((comparison) => <article key={comparison.field}><header><strong>{comparison.label}</strong><span className="cc-match">{comparison.status}</span></header><dl><div><dt>Original</dt><dd>{comparison.original}</dd></div><div><dt>Replay</dt><dd>{comparison.replay}</dd></div></dl></article>)}</div>
                <p className="cc-replay-boundary"><LockKeyhole aria-hidden="true" /> Replay does not recreate or reactivate approval, create execution authority, or execute an external action. Fresh Plan v2 approval remains a separate human decision.</p>
              </div>}
            </article>}

            <article className="cc-panel cc-approval-panel">
              <div className="cc-panel__header"><div><p className="cc-kicker">SYN-CMD-001 · Plan v{currentPlanVersion}</p><h3>Decision: simulated brief preparation</h3></div><UserCheck aria-hidden="true" /></div>
              <p>No external action will occur. An approval is bound only to the exact plan ID, version and deterministic reference shown above.</p>
              {!creatorSelected && !currentDecisionRecord && <p className="cc-lock"><LockKeyhole aria-hidden="true" /> Select SYN-CMD-001 in the Work Queue to unlock this decision.</p>}
              {currentPlanVersion === 2 && !v2GovernanceReady && <p className="cc-lock"><LockKeyhole aria-hidden="true" /> Fresh policy evaluation and impact assessment are required before a Plan v2 human decision.</p>}
              {currentDecisionRecord ? <p className="cc-complete"><CheckCircle2 aria-hidden="true" /> Decision completed for Plan v{currentPlanVersion}. Its temporary record cannot be edited unless the entire synthetic demo is reset.</p> : <form noValidate onSubmit={submitDecision}>
                {errors.length > 0 && <div aria-labelledby="approval-errors-title" className="cc-error-summary" ref={errorRef} role="alert" tabIndex={-1}><h4 id="approval-errors-title">Correct the following</h4><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
                <fieldset disabled={!creatorSelected || !v2GovernanceReady}><legend>Human decision for Plan v{currentPlanVersion}</legend>{Object.entries(decisionLabels).map(([value, label]) => <label key={value}><input checked={decision === value} name="decision" onChange={() => setDecision(value as Decision)} type="radio" value={value} /> <span>{label}</span></label>)}
                  <label className="cc-rationale" htmlFor={`decision-rationale-v${currentPlanVersion}`}>Written rationale</label><textarea id={`decision-rationale-v${currentPlanVersion}`} onChange={(event) => setRationale(event.target.value)} rows={5} value={rationale} /><button type="submit">Submit human decision for Plan v{currentPlanVersion}</button>
                </fieldset></form>}
            </article>

            <div className="cc-approval-evidence"><h3>Approval evidence</h3>{approvalEvidence.length ? approvalEvidence.map((approval) => <article key={approval.reference}>
              <div><strong>{approval.reference}</strong><span className={`cc-evidence-status ${approval.status === 'INVALIDATED' ? 'cc-evidence-status--invalid' : ''}`}>{approval.status}</span></div>
              <dl className="cc-detail-list">{[
                ['Approval reference', approval.reference], ['Fictional timestamp', approval.timestamp], ['Bound plan ID', approval.boundPlanId],
                ['Bound plan version', `v${approval.boundPlanVersion}`], ['Bound plan reference', approval.boundPlanReference], ['Approval status', approval.status],
                ...(approval.reasonCode ? [['Invalidation reason', approval.reasonCode]] : []),
              ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
              <p>{approval.status === 'INVALIDATED' ? 'This past approval remains historical evidence and has zero authority over Plan v2.' : `This human approval applies only to Plan v${approval.boundPlanVersion}.`}</p>
            </article>) : <p className="cc-empty">No human approval has been created. Approval cannot be supplied by AI or inherited from another plan.</p>}</div>
          </section>

          <section aria-labelledby="audit-title" id="audit-record">
            <div className="cc-section-heading"><p>Inspection-ready evidence</p><h2 id="audit-title" ref={recordHeadingRef} tabIndex={-1}>Decision Record</h2></div>
            {invalidationRecord && <article className="cc-record cc-invalidation-record"><div className="cc-panel__header"><div><p className="cc-kicker">Approval invalidation · Temporary</p><h3>{invalidationRecord.id}</h3></div><FileWarning aria-hidden="true" /></div><dl className="cc-detail-list">{[
              ['Event reference ID', invalidationRecord.id], ['Fictional timestamp', invalidationRecord.timestamp], ['Previous plan ID', invalidationRecord.previousPlanId],
              ['Previous plan version', `v${invalidationRecord.previousPlanVersion}`], ['Previous plan reference', invalidationRecord.previousPlanReference],
              ['New plan ID', invalidationRecord.newPlanId], ['New plan version', `v${invalidationRecord.newPlanVersion}`], ['New plan reference', invalidationRecord.newPlanReference],
              ['Previous approval reference', invalidationRecord.previousApprovalReference], ['Previous approval state', invalidationRecord.previousApprovalState],
              ['Resulting approval state', invalidationRecord.resultingApprovalState], ['Reason code', invalidationRecord.reasonCode],
              ['Resulting execution-authority state', invalidationRecord.resultingExecutionAuthority], ['External action', invalidationRecord.externalAction],
            ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl></article>}
            {decisionRecords.length ? decisionRecords.map((record) => <article className="cc-record" key={record.id}>
              <div className="cc-panel__header"><div><p className="cc-kicker">Human decision · Plan v{record.planVersion} · Temporary</p><h3>{record.id}</h3></div><ClipboardCheck aria-hidden="true" /></div><dl className="cc-detail-list">{[
                ['Record identifier', record.id], ['Work-item identifier', record.workItemId], ['Bound plan ID', record.planId], ['Bound plan version', `v${record.planVersion}`],
                ['Bound plan reference', record.planReference], ['Approval reference', record.approvalReference], ['Fictional timestamp', record.timestamp], ['Decision', record.decision],
                ['Rationale', record.rationale], ['Impact Summary reference', record.impactReference], ['Simulated outcome', record.simulatedOutcome], ['Execution status', record.executionStatus],
                ['Data classification', record.dataClassification], ['External systems affected', record.externalSystemsAffected], ['Record limitation', record.limitation],
              ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl><h3>Named policy results</h3><ul className="cc-record-policies">{record.policyResults.map((policy) => <li key={policy.code}><strong>{policy.code}</strong><span>{policy.result}</span></li>)}</ul>
            </article>) : <div className="cc-empty cc-empty--record"><ClipboardCheck aria-hidden="true" /><h3>No temporary Decision Record</h3><p>A record appears after a valid human decision for SYN-CMD-001.</p></div>}
            <button className="cc-reset" onClick={resetDemo} type="button"><RotateCcw aria-hidden="true" /> Reset synthetic demo</button><p className="cc-reset-note">This restarts the fictional browser-local demonstration. It does not edit or delete a record in a real system.</p>
          </section>
        </div>
      </div>
    </div></PageLayout>
  )
}
