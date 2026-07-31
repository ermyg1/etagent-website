import { useState, type FormEvent } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle2,
  CircleAlert,
  FileCheck2,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Truck,
  UserRound,
} from 'lucide-react'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { Checkbox, Radio, Textarea } from '../../../components/FormControls'
import { Icon } from '../../../components/Icon'
import {
  caseDetails,
  confirmations,
  decisionOptions,
  evidenceItems,
  materialGaps,
  priorityGaps,
  ruleAssessments,
  timeline,
  type DemoViewId,
} from '../data/demoData'
import { EvidenceCard } from './EvidenceCard'

export type DecisionRecordData = {
  decision: (typeof decisionOptions)[number]
  rationale: string
  recordedAt: string
  recommendationResponse: 'Accepted' | 'Amended' | 'Rejected'
}

type ViewProps = {
  onNavigate: (view: DemoViewId) => void
}

const metrics = [
  ['Open exceptions', '8'],
  ['Awaiting evidence', '3'],
  ['Human decision required', '4'],
  ['High-priority cases', '1'],
]

const filters = [
  'All',
  'Customer unavailable',
  'Disputed delivery',
  'Missing proof',
  'Payment review',
  'Urgent',
] as const

type ExceptionFilter = (typeof filters)[number]

const inboxCases = [
  {
    caseReference: caseDetails.caseReference,
    category: 'Disputed delivery',
    customer: caseDetails.customer,
    driver: caseDetails.driver,
    priority: 'Medium',
    evidence: 'Incomplete',
    decision: 'Review required',
    opened: '14:32',
    isSelected: true,
  },
  {
    caseReference: 'SYN-EXC-2026-002',
    category: 'Missing proof',
    customer: 'Fictional placeholder',
    driver: 'Synthetic record',
    priority: 'Low',
    evidence: 'Awaiting',
    decision: 'Queued',
    opened: '13:58',
    isSelected: false,
  },
  {
    caseReference: 'SYN-EXC-2026-003',
    category: 'Payment review',
    customer: 'Fictional placeholder',
    driver: 'Synthetic record',
    priority: 'High',
    evidence: 'Incomplete',
    decision: 'Queued',
    opened: '12:41',
    isSelected: false,
  },
] as const

export function ExceptionInbox({ onNavigate }: ViewProps) {
  const [activeFilter, setActiveFilter] = useState<ExceptionFilter>('All')
  const visibleCases = inboxCases.filter((exceptionCase) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Urgent') return exceptionCase.priority === 'High'
    return exceptionCase.category === activeFilter
  })
  const selectedCaseIsVisible = visibleCases.some((exceptionCase) => exceptionCase.isSelected)

  return (
    <ViewShell
      eyebrow="Exception queue"
      introduction="Review fictional delivery exceptions without connecting to an operational courier system."
      title="Exception Inbox"
    >
      <div className="delivery-demo-metrics" aria-label="Exception inbox summary">
        {metrics.map(([label, value]) => (
          <Card className="delivery-demo-metric" key={label} variant="bordered">
            <strong>{value}</strong>
            <span>{label}</span>
          </Card>
        ))}
      </div>
      <div className="delivery-demo-filters" aria-label="Filter exception cases">
        {filters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="delivery-demo-table-wrap">
        <table className="delivery-demo-table">
          <caption className="sr-only">Synthetic delivery exception cases</caption>
          <thead>
            <tr>
              <th>Case</th>
              <th>Exception</th>
              <th>Customer / driver</th>
              <th>Priority</th>
              <th>Evidence</th>
              <th>Decision</th>
              <th>Opened</th>
            </tr>
          </thead>
          <tbody>
            {visibleCases.map((exceptionCase) => (
              <tr
                aria-disabled={exceptionCase.isSelected ? undefined : true}
                className={exceptionCase.isSelected ? 'delivery-demo-table__selected' : undefined}
                key={exceptionCase.caseReference}
              >
                <td>
                  {exceptionCase.isSelected ? (
                    <button onClick={() => onNavigate('overview')} type="button">
                      {exceptionCase.caseReference}
                      <ArrowRight aria-hidden="true" />
                    </button>
                  ) : exceptionCase.caseReference}
                </td>
                <td>{exceptionCase.category}</td>
                <td>{exceptionCase.customer}<small>{exceptionCase.driver}</small></td>
                <td>
                  {exceptionCase.isSelected
                    ? <Badge variant="warning">{exceptionCase.priority}</Badge>
                    : exceptionCase.priority}
                </td>
                <td>
                  {exceptionCase.isSelected
                    ? <Badge variant="warning">{exceptionCase.evidence}</Badge>
                    : exceptionCase.evidence}
                </td>
                <td>
                  {exceptionCase.isSelected
                    ? <Badge variant="neutral">{exceptionCase.decision}</Badge>
                    : exceptionCase.decision}
                </td>
                <td>{exceptionCase.opened}</td>
              </tr>
            ))}
            {visibleCases.length === 0 && (
              <tr>
                <td className="delivery-demo-table__empty" colSpan={7}>
                  No synthetic exceptions match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedCaseIsVisible && (
        <div className="delivery-demo-action">
          <Button onClick={() => onNavigate('overview')}>
            Open selected case
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      )}
    </ViewShell>
  )
}

export function CaseOverview({ onNavigate }: ViewProps) {
  return (
    <ViewShell
      eyebrow={caseDetails.caseReference}
      introduction="A structured summary of the disputed delivery attempt and the evidence sequence available for management review."
      title="Case Overview"
    >
      <div className="delivery-demo-status-row">
        <Badge variant="warning">Medium priority</Badge>
        <Badge variant="neutral">Awaiting management review</Badge>
        <Badge variant="warning">Moderate confidence</Badge>
        <Badge variant="error">Execution blocked</Badge>
      </div>
      <div className="delivery-demo-overview-grid">
        <Card className="delivery-demo-panel" variant="bordered">
          <h3>Case summary</h3>
          <p className="delivery-demo-lead">
            The driver appears to have been near the delivery location during the required
            window and remained for approximately ten minutes. Two outgoing telephone calls
            are recorded, but the available evidence does not confirm that the authorised
            customer number was used. There is no evidence that the building buzzer was
            attempted.
          </p>
          <dl className="delivery-demo-detail-list delivery-demo-detail-list--grid">
            <Detail label="Job reference" value={caseDetails.jobReference} />
            <Detail label="Route reference" value={caseDetails.routeReference} />
            <Detail label="Courier company" value={caseDetails.courier} />
            <Detail label="Service" value={caseDetails.service} />
            <Detail label="Operations Manager" value={caseDetails.operationsManager} />
            <Detail label="Dispatcher" value={caseDetails.dispatcher} />
            <Detail label="Driver" value={caseDetails.driver} />
            <Detail label="Customer" value={caseDetails.customer} />
            <Detail label="Delivery contact" value={caseDetails.deliveryContact} />
            <Detail label="Opened" value={caseDetails.opened} />
            <div className="delivery-demo-detail-list__wide">
              <dt>Fictional delivery location</dt>
              <dd>{caseDetails.address}<small>Fictional address. No mapping link provided.</small></dd>
            </div>
          </dl>
        </Card>
        <Card className="delivery-demo-panel" variant="bordered">
          <h3>Case timeline</h3>
          <ol className="delivery-demo-timeline">
            {timeline.map(([time, event]) => (
              <li key={`${time}-${event}`}>
                <time>{time}</time>
                <span>{event}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
      <div className="delivery-demo-action">
        <Button onClick={() => onNavigate('evidence')}>
          Review evidence
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </ViewShell>
  )
}

export function EvidenceReview({ onNavigate }: ViewProps) {
  const evidenceMetrics = [
    ['Evidence items', '7'],
    ['Material gaps', '10'],
    ['Contradictions', '2'],
    ['Evidence confidence', 'Moderate'],
  ]

  return (
    <ViewShell
      eyebrow="Evidence validation"
      introduction="Inspect what supports the account, what remains inconclusive, and what must be obtained before a governed decision."
      title="Evidence Review"
    >
      <div className="delivery-demo-metrics">
        {evidenceMetrics.map(([label, value]) => (
          <Card className="delivery-demo-metric" key={label} variant="bordered">
            <strong>{value}</strong>
            <span>{label}</span>
          </Card>
        ))}
      </div>
      <div className="delivery-demo-evidence-layout">
        <div className="delivery-demo-evidence-list">
          {evidenceItems.map((evidence) => (
            <EvidenceCard evidence={evidence} key={evidence.id} />
          ))}
        </div>
        <aside className="delivery-demo-gap-panel">
          <span className="delivery-demo-kicker">Highest-priority gaps</span>
          <h3>Further evidence required</h3>
          <ol>
            {priorityGaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ol>
          <details>
            <summary>View all ten material gaps</summary>
            <ul>
              {materialGaps.map((gap) => (
                <li key={gap}>{gap}</li>
              ))}
            </ul>
          </details>
        </aside>
      </div>
      <div className="delivery-demo-action">
        <Button onClick={() => onNavigate('policy')}>
          Compare against policy
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </ViewShell>
  )
}

export function PolicyAssessment({ onNavigate }: ViewProps) {
  return (
    <ViewShell
      eyebrow="Fictional demonstration rules"
      introduction="The assessments below compare the available evidence only with rules declared for this synthetic courier company."
      title="Policy Assessment"
    >
      <Notice icon={ShieldCheck}>
        E.T Agent applies only the rules supplied and approved by the courier company. It
        does not invent operating policy.
      </Notice>
      <div className="delivery-demo-rule-list">
        {ruleAssessments.map((rule) => (
          <details className={`delivery-demo-rule delivery-demo-rule--${rule.tone}`} key={rule.id}>
            <summary>
              <span className="delivery-demo-rule__identity">
                <strong>{rule.id}</strong>
                <span>{rule.title}</span>
              </span>
              <Badge
                variant={
                  rule.tone === 'positive'
                    ? 'success'
                    : rule.tone === 'blocked'
                      ? 'error'
                      : 'warning'
                }
              >
                {rule.assessment}
              </Badge>
            </summary>
            <div className="delivery-demo-rule__content">
              <Detail label="Rule text" value={rule.text} />
              <Detail label="Relevant evidence" value={rule.evidence} />
              <Detail label="Reasoning" value={rule.reasoning} />
              <Detail label="Unresolved question" value={rule.question} />
            </div>
          </details>
        ))}
      </div>
      <Notice icon={AlertTriangle} tone="warning">
        Material financial and operational decisions remain blocked until authorised human
        review.
      </Notice>
      <div className="delivery-demo-action">
        <Button onClick={() => onNavigate('impact')}>
          Review impact
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </ViewShell>
  )
}

const impactCards = [
  {
    icon: UserRound,
    title: 'Customer impact',
    items: [
      'Urgent package remains undelivered',
      'Customer disputes the attempt',
      'Additional delay may damage confidence',
      'Unsupported redelivery charging may escalate the complaint',
    ],
  },
  {
    icon: Truck,
    title: 'Driver impact',
    items: [
      'Attempted-delivery payment remains unresolved',
      'Unsupported deduction may create a dispute',
      'Further call evidence may be required',
    ],
  },
  {
    icon: Building2,
    title: 'Operational impact',
    items: [
      'Redelivery may require prioritisation',
      'Dispatcher must reconstruct messaging evidence',
      'Management review is required',
      'No structured exception record was created at the time',
    ],
  },
] as const

export function ImpactSummary({ onNavigate }: ViewProps) {
  return (
    <ViewShell
      eyebrow="Decision support"
      introduction="Potential effects are separated by stakeholder and control domain before any authorised person records a decision."
      title="Impact Summary"
    >
      <div className="delivery-demo-impact-grid">
        {impactCards.map((impact) => (
          <Card className="delivery-demo-impact-card" key={impact.title} variant="bordered">
            <Icon icon={impact.icon} size="lg" />
            <h3>{impact.title}</h3>
            <ul className="delivery-demo-list">
              {impact.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        ))}
        <Card className="delivery-demo-impact-card" variant="bordered">
          <Icon icon={Banknote} size="lg" />
          <h3>Financial impact</h3>
          <p className="delivery-demo-emphasis">No final financial determination available.</p>
          <p>No monetary amount is inferred from incomplete evidence.</p>
        </Card>
        <Card className="delivery-demo-impact-card delivery-demo-impact-card--wide" variant="bordered">
          <Icon icon={ShieldCheck} size="lg" />
          <h3>Governance impact</h3>
          <p className="delivery-demo-emphasis">
            Automatic customer charging, driver payment reduction or delivery rescheduling
            would exceed the available evidence and bypass required human authority.
          </p>
        </Card>
      </div>
      <div className="delivery-demo-action">
        <Button onClick={() => onNavigate('recommendation')}>
          Review recommendation
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </ViewShell>
  )
}

export function Recommendation({ onNavigate }: ViewProps) {
  return (
    <ViewShell
      eyebrow="Approval-ready recommendation"
      introduction="A structured advisory outcome based on the available evidence, declared rules, unresolved questions, and stakeholder impacts."
      title="Recommendation"
    >
      <Card className="delivery-demo-recommendation" variant="elevated">
        <div className="delivery-demo-recommendation__topline">
          <Badge variant="warning">Unresolved pending further evidence</Badge>
          <span>Confidence: <strong>Moderate</strong></span>
        </div>
        <section>
          <span className="delivery-demo-kicker">Recommended immediate response</span>
          <h3>
            Arrange a priority redelivery without applying an additional customer charge
            while the case remains unresolved.
          </h3>
        </section>
        <section>
          <span className="delivery-demo-kicker">Driver-payment recommendation</span>
          <p>
            Do not approve a deduction or payment reduction until the complete call evidence
            and access-attempt information have been reviewed.
          </p>
        </section>
        <section>
          <span className="delivery-demo-kicker">Evidence requests</span>
          <ul className="delivery-demo-list">
            <li>Complete outgoing call record</li>
            <li>Confirmation of the number called</li>
            <li>Clarification regarding buzzer use</li>
            <li>Confirmation of the photographed entrance</li>
          </ul>
        </section>
        <dl className="delivery-demo-detail-list">
          <Detail label="Required approver" value="Operations Manager" />
        </dl>
      </Card>
      <Notice icon={LockKeyhole} tone="warning">
        This recommendation is advisory. It is not approval and does not execute any action.
      </Notice>
      <div className="delivery-demo-action">
        <Button onClick={() => onNavigate('review')}>
          Continue to human review
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </ViewShell>
  )
}

type HumanReviewProps = ViewProps & {
  onRecordDecision: (record: DecisionRecordData) => void
}

export function HumanReview({ onNavigate, onRecordDecision }: HumanReviewProps) {
  const [decision, setDecision] = useState<(typeof decisionOptions)[number] | ''>('')
  const [rationale, setRationale] = useState('')
  const [checked, setChecked] = useState<boolean[]>(confirmations.map(() => false))
  const [recommendationResponse, setRecommendationResponse] =
    useState<DecisionRecordData['recommendationResponse']>('Accepted')
  const canSubmit =
    decision !== '' && rationale.trim().length > 0 && checked.every(Boolean)

  const submitDecision = (event: FormEvent) => {
    event.preventDefault()
    if (!canSubmit || !decision) return

    onRecordDecision({
      decision,
      rationale: rationale.trim(),
      recommendationResponse,
      recordedAt: new Date().toLocaleString('en-GB', {
        dateStyle: 'long',
        timeStyle: 'medium',
      }),
    })
    onNavigate('record')
  }

  return (
    <ViewShell
      eyebrow="Authorised human boundary"
      introduction="Record a temporary demonstration decision after reviewing evidence, policy, and impact. This form cannot perform an external action."
      title="Human Review"
    >
      <form className="delivery-demo-review" onSubmit={submitDecision}>
        <fieldset>
          <legend>Select a demonstration decision</legend>
          <div className="delivery-demo-choice-grid">
            {decisionOptions.map((option) => (
              <Radio
                checked={decision === option}
                key={option}
                label={option}
                name="demonstration-decision"
                onChange={() => setDecision(option)}
                value={option}
              />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Recommendation response</legend>
          <div className="delivery-demo-choice-row">
            {(['Accepted', 'Amended', 'Rejected'] as const).map((option) => (
              <Radio
                checked={recommendationResponse === option}
                key={option}
                label={option}
                name="recommendation-response"
                onChange={() => setRecommendationResponse(option)}
                value={option}
              />
            ))}
          </div>
        </fieldset>
        <label className="delivery-demo-rationale">
          <span>Decision rationale</span>
          <Textarea
            onChange={(event) => setRationale(event.target.value)}
            placeholder="Explain the evidence and rules that support this demonstration decision."
            required
            rows={5}
            value={rationale}
          />
        </label>
        <fieldset>
          <legend>Required confirmations</legend>
          <div className="delivery-demo-confirmations">
            {confirmations.map((confirmation, index) => (
              <Checkbox
                checked={checked[index]}
                key={confirmation}
                label={confirmation}
                onChange={(event) =>
                  setChecked((current) =>
                    current.map((value, itemIndex) =>
                      itemIndex === index ? event.target.checked : value,
                    ),
                  )
                }
              />
            ))}
          </div>
        </fieldset>
        <div className="delivery-demo-review__submit">
          <div aria-live="polite">
            {canSubmit
              ? 'All demonstration review requirements are complete.'
              : 'Select a decision, enter a rationale, and complete every confirmation.'}
          </div>
          <Button disabled={!canSubmit} size="lg" type="submit">
            Record demonstration decision
          </Button>
        </div>
      </form>
    </ViewShell>
  )
}

export function DecisionRecord({
  onNavigate,
  record,
}: ViewProps & { record: DecisionRecordData | null }) {
  if (!record) {
    return (
      <ViewShell
        eyebrow="Temporary record"
        introduction="No decision has been recorded in this browser session."
        title="Decision Record"
      >
        <Notice icon={CircleAlert} tone="warning">
          Complete the Human Review before viewing a demonstration decision record.
        </Notice>
        <div className="delivery-demo-action">
          <Button onClick={() => onNavigate('review')}>Go to Human Review</Button>
        </div>
      </ViewShell>
    )
  }

  const auditPreview = [
    'Case opened',
    'Evidence reviewed',
    'Missing information identified',
    'Policy assessment generated',
    'Recommendation prepared',
    'Human demonstration decision recorded',
    'Execution remained blocked',
  ]

  return (
    <ViewShell
      eyebrow="In-memory demonstration record"
      introduction="This temporary record exists only in the current React session and resets when the page refreshes."
      title="Decision Record"
    >
      <Card className="delivery-demo-record" variant="elevated">
        <div className="delivery-demo-record__header">
          <Icon icon={FileCheck2} size="lg" />
          <div>
            <Badge variant="success">Demonstration decision recorded</Badge>
            <h3>{record.decision}</h3>
          </div>
        </div>
        <dl className="delivery-demo-detail-list delivery-demo-detail-list--grid">
          <Detail label="Case reference" value={caseDetails.caseReference} />
          <Detail label="Demonstration reviewer role" value="Operations Manager" />
          <Detail label="Recorded at" value={record.recordedAt} />
          <Detail label="Recommendation" value={record.recommendationResponse} />
          <Detail label="Evidence reviewed" value="E1 to E7" />
          <Detail label="Rules considered" value="R1 to R9" />
          <Detail label="Execution status" value="No external action executed" />
          <div className="delivery-demo-detail-list__wide">
            <dt>Rationale</dt>
            <dd>{record.rationale}</dd>
          </div>
        </dl>
      </Card>
      <Card className="delivery-demo-audit-preview" variant="bordered">
        <span className="delivery-demo-kicker">Fictional audit preview</span>
        <ol>
          {auditPreview.map((event) => <li key={event}>{event}</li>)}
        </ol>
        <p>This is a front-end demonstration record. No production audit entry has been written.</p>
      </Card>
      <div className="delivery-demo-action">
        <Button onClick={() => onNavigate('governance')}>
          Review governance controls
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </ViewShell>
  )
}

export function GovernanceControls() {
  const principles = [
    'Intelligence is separate from authority.',
    'Recommendation is not approval.',
    'Approval is not execution.',
    'Policy must precede power.',
    'Material actions require an authorised human.',
    'Missing evidence produces a fail-closed result.',
    'E.T Agent does not invent company policy.',
    'Financial adjustments cannot be applied automatically.',
    'External execution remains blocked.',
  ]
  const flow = [
    'Operational evidence',
    'Evidence validation',
    'Declared company rules',
    'Impact analysis',
    'E.T Agent recommendation',
    'Authorised human decision',
  ]

  return (
    <ViewShell
      eyebrow="Governance boundary"
      introduction="The demonstration ends at a human decision record. No operational authority or external execution is connected."
      title="Governance Controls"
    >
      <div className="delivery-demo-governance-grid">
        <Card className="delivery-demo-panel" variant="bordered">
          <h3>Control principles</h3>
          <ul className="delivery-demo-principles">
            {principles.map((principle) => (
              <li key={principle}>
                <CheckCircle2 aria-hidden="true" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="delivery-demo-panel" variant="bordered">
          <h3>Governed review flow</h3>
          <ol className="delivery-demo-flow">
            {flow.map((stage) => (
              <li key={stage}><span>{stage}</span><ArrowRight aria-hidden="true" /></li>
            ))}
            <li className="delivery-demo-flow__locked">
              <LockKeyhole aria-hidden="true" />
              <span>Locked execution boundary</span>
            </li>
          </ol>
        </Card>
      </div>
      <Notice icon={LockKeyhole} tone="warning">
        Synthetic demonstration complete. External execution remains blocked.
      </Notice>
    </ViewShell>
  )
}

function ViewShell({
  children,
  eyebrow,
  introduction,
  title,
}: {
  children: React.ReactNode
  eyebrow: string
  introduction: string
  title: string
}) {
  return (
    <section aria-labelledby={`delivery-demo-${title.toLowerCase().replaceAll(' ', '-')}`}>
      <header className="delivery-demo-view-header">
        <span className="delivery-demo-kicker">{eyebrow}</span>
        <h2 id={`delivery-demo-${title.toLowerCase().replaceAll(' ', '-')}`} tabIndex={-1}>
          {title}
        </h2>
        <p>{introduction}</p>
      </header>
      {children}
    </section>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>
}

function Notice({
  children,
  icon,
  tone = 'default',
}: {
  children: React.ReactNode
  icon: typeof PackageCheck
  tone?: 'default' | 'warning'
}) {
  return (
    <div className={`delivery-demo-notice delivery-demo-notice--${tone}`} role="note">
      <Icon icon={icon} size="sm" />
      <p>{children}</p>
    </div>
  )
}
