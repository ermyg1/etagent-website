import { useEffect, useRef, useState } from 'react'
import { PageLayout } from '../../../components/layout'
import { AdvisoryRecommendation, recommendation } from '../components/AdvisoryRecommendation'
import { BankingDemoNavigation, bankingViews } from '../components/BankingDemoNavigation'
import { BankingViewShell } from '../components/BankingViewShell'
import { ClaimsInbox, type ClaimsFilter } from '../components/ClaimsInbox'
import { CustomerCircumstances } from '../components/CustomerCircumstances'
import { CustomerPaymentOverview } from '../components/CustomerPaymentOverview'
import { DecisionRecord } from '../components/DecisionRecord'
import { EvidenceReview } from '../components/EvidenceReview'
import { GovernanceControls } from '../components/GovernanceControls'
import { HumanReview } from '../components/HumanReview'
import { ImpactSummary } from '../components/ImpactSummary'
import { PaymentTimeline } from '../components/PaymentTimeline'
import { PolicyAssessment } from '../components/PolicyAssessment'
import { contradictions, evidenceReferences, missingEvidence, primaryCase } from '../data/primaryCase'
import { policy, policyRules } from '../data/policy'
import { reviewConfirmations, unresolvedRiskAcknowledgement } from '../data/review'
import type { DecisionRecordData, DemoViewId, HumanReviewDraft } from '../types'
import '../styles/fraud-reimbursement-demo.css'

const primaryCaseId = 'SYN-APP-2026-001'
const confirmationCount = 7
const initialReviewDraft: HumanReviewDraft = {
  outcome: null,
  rationale: '',
  amendment: '',
  confirmations: Array.from({ length: confirmationCount }, () => false),
  unresolvedRiskAcknowledged: false,
}
const caseSpecificViews: readonly DemoViewId[] = [
  'overview',
  'evidence',
  'timeline',
  'policy',
  'circumstances',
  'impact',
  'recommendation',
  'review',
]

const blocked = [
  'real bank-system access',
  'account lookup',
  'real customer-data access',
  'money movement',
  'reimbursement',
  'excess application',
  'account restriction',
  'account freezing',
  'payment blocking',
  'customer communication',
  'receiving-provider communication',
  'police reporting',
  'Action Fraud reporting',
  'suspicious activity reporting',
  'regulatory reporting',
  'complaint closure',
  'automated vulnerability classification',
  'autonomous fraud determination',
  'autonomous reimbursement decision',
  'AML, sanctions or credit determination',
  'persistent banking-data storage',
  'analytics involving case data',
  'external logging of case data',
  'all external and operational execution',
]

const makeId = () => {
  try {
    return `SYN-DEC-${crypto.randomUUID().toUpperCase()}`
  } catch {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).slice(2, 10).toUpperCase()
    return `SYN-DEC-${timestamp}-${random}`
  }
}

const topObstructionRect = (element: HTMLElement | null) => {
  if (!element || element.getClientRects().length === 0) return null

  const style = getComputedStyle(element)
  if (
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    (style.position !== 'sticky' && style.position !== 'fixed')
  ) {
    return null
  }

  const rect = element.getBoundingClientRect()
  return rect.height > 0 && rect.bottom > 0 ? rect : null
}

const reservedTopOffset = (elements: (HTMLElement | null)[]) => {
  const intervals = elements
    .map(topObstructionRect)
    .filter((rect): rect is DOMRect => rect !== null)
    .map((rect) => [Math.max(0, rect.top), Math.max(0, rect.bottom)] as const)
    .sort(([left], [right]) => left - right)

  let total = 0
  let coveredUntil = 0
  for (const [start, end] of intervals) {
    if (end > coveredUntil) {
      total += end - Math.max(start, coveredUntil)
      coveredUntil = end
    }
  }
  return total
}

export function FraudReimbursementDemoPage() {
  const [active, setActive] = useState<DemoViewId>('inbox')
  const [selected, setSelected] = useState<string | null>(null)
  const [record, setRecord] = useState<DecisionRecordData | null>(null)
  const [filter, setFilter] = useState<ClaimsFilter>('All')
  const [reviewDraft, setReviewDraft] = useState<HumanReviewDraft>(initialReviewDraft)
  const [navigationRequest, setNavigationRequest] = useState(0)
  const requested = useRef(false)
  const demoRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const demo = demoRef.current
    const header = document.querySelector<HTMLElement>('.site-header')
    const disclosure = demo?.querySelector<HTMLElement>('.bank-disclosure')

    if (!demo || !header || !disclosure) {
      return undefined
    }

    const updateStickyOffsets = () => {
      const headerTop = Number.parseFloat(getComputedStyle(header).top) || 0
      const spacing = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--space-sm'),
      ) || 8
      const headerClearance = headerTop + header.offsetHeight

      demo.style.setProperty('--bank-header-clearance', `${headerClearance}px`)
      demo.style.setProperty(
        '--bank-navigation-clearance',
        `${headerClearance + disclosure.offsetHeight + spacing}px`,
      )
    }

    const resizeObserver = new ResizeObserver(updateStickyOffsets)
    resizeObserver.observe(header)
    resizeObserver.observe(disclosure)
    window.addEventListener('resize', updateStickyOffsets)
    updateStickyOffsets()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateStickyOffsets)
    }
  }, [])

  const navigate = (id: DemoViewId) => {
    if (caseSpecificViews.includes(id) && selected !== primaryCaseId) {
      id = 'inbox'
    }
    if (id === 'record' && record === null) {
      return
    }

    requested.current = true
    setActive(id)
    setNavigationRequest((current) => current + 1)
  }

  useEffect(() => {
    if (!requested.current) {
      return
    }
    requested.current = false

    const heading = viewRef.current?.querySelector<HTMLElement>('h2')
    if (!heading) {
      return
    }

    heading.focus({ preventScroll: true })
    let secondFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const header = document.querySelector<HTMLElement>('.site-header')
        const disclosure = document.querySelector<HTMLElement>('.bank-disclosure')
        const navigation = document.querySelector<HTMLElement>(
          '.bank-nav[data-top-obstruction="horizontal"]',
        )
        const navigationList = navigation?.querySelector('ol') ?? null
        const horizontalNavigation =
          navigationList && getComputedStyle(navigationList).display === 'flex' ? navigation : null
        const reservedOffset = reservedTopOffset([header, disclosure, horizontalNavigation])
        const top = scrollY + heading.getBoundingClientRect().top - reservedOffset - 16

        scrollTo({
          top: Math.max(0, top),
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        })
      })
    })

    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
    }
  }, [active, navigationRequest])

  const open = (id: string) => {
    if (id !== primaryCaseId) {
      return
    }
    setSelected(id)
    requested.current = true
    setActive('overview')
    setNavigationRequest((current) => current + 1)
  }

  const updateConfirmation = (index: number, checked: boolean) => {
    setReviewDraft((current) => ({
      ...current,
      confirmations: current.confirmations.map((value, itemIndex) =>
        itemIndex === index ? checked : value,
      ),
    }))
  }

  const save = (): string | null => {
    if (selected !== primaryCaseId) {
      return 'Open the synthetic case before recording a demonstration decision.'
    }
    if (record) {
      return null
    }

    const created: DecisionRecordData = {
      record_id: makeId(),
      case_id: selected,
      case_version: primaryCase.version,
      claim_type: primaryCase.claimType,
      claim_amount: primaryCase.claimAmount,
      payment_references: primaryCase.payments.map((payment) => payment.id),
      claim_received_at: primaryCase.claimReceived,
      case_snapshot_at: primaryCase.snapshot,
      review_target_date: primaryCase.reviewTarget,
      final_deadline: primaryCase.finalDeadline,
      stop_clock_status: primaryCase.stopClockStatus,
      stop_clock_intervals: [...primaryCase.stopClockIntervals],
      evidence_references: [...evidenceReferences],
      missing_evidence: [...missingEvidence],
      contradictions: [...contradictions],
      policy_id: policy.id,
      policy_version: policy.version,
      policy_effective_date: policy.effectiveDate,
      policy_rule_results: policyRules.map((rule) => ({ ...rule })),
      customer_circumstance_status: 'Specialist review required',
      advisory_recommendation: recommendation,
      recommendation_rationale: 'Specialist review and material evidence remain outstanding.',
      human_decision: reviewDraft.outcome,
      human_amendments:
        reviewDraft.outcome === 'AMENDED' ? reviewDraft.amendment.trim() : null,
      human_rationale: reviewDraft.rationale.trim(),
      reviewer_role: 'Senior Fraud Reimbursement Reviewer',
      reviewer_confirmations: reviewConfirmations.filter(
        (_, index) => reviewDraft.confirmations[index],
      ),
      unresolved_risks: unresolvedRiskAcknowledgement,
      recorded_at: new Date().toISOString(),
      execution_status: 'No external action executed',
      blocked_capabilities: [...blocked],
    }

    setRecord(Object.freeze(created))
    requested.current = true
    setActive('record')
    setNavigationRequest((current) => current + 1)
    return null
  }

  const body: Record<DemoViewId, React.ReactNode> = {
    inbox: (
      <ClaimsInbox
        filter={filter}
        onFilterChange={setFilter}
        onOpen={open}
        selectedCaseId={selected}
      />
    ),
    overview: <CustomerPaymentOverview />,
    evidence: <EvidenceReview />,
    timeline: <PaymentTimeline />,
    policy: <PolicyAssessment />,
    circumstances: <CustomerCircumstances />,
    impact: <ImpactSummary />,
    recommendation: <AdvisoryRecommendation />,
    review: (
      <HumanReview
        draft={reviewDraft}
        onAmendmentChange={(amendment) =>
          setReviewDraft((current) => ({ ...current, amendment }))
        }
        onConfirmationChange={updateConfirmation}
        onOutcomeChange={(outcome) =>
          setReviewDraft((current) => ({ ...current, outcome }))
        }
        onRationaleChange={(rationale) =>
          setReviewDraft((current) => ({ ...current, rationale }))
        }
        onSubmit={save}
        onUnresolvedRiskChange={(unresolvedRiskAcknowledged) =>
          setReviewDraft((current) => ({ ...current, unresolvedRiskAcknowledged }))
        }
      />
    ),
    record: <DecisionRecord record={record} />,
    governance: <GovernanceControls />,
  }
  const safeActive =
    selected === null && caseSpecificViews.includes(active) ? 'inbox' : active
  const meta = bankingViews.find((view) => view.id === safeActive)!

  return (
    <PageLayout>
      <div className="fraud-reimbursement-demo" ref={demoRef}>
        <section className="bank-hero">
          <p className="bank-kicker">Retail banking · synthetic governance prototype</p>
          <h1>E.T Agent: Governed Fraud Reimbursement Review</h1>
          <p>
            This evidence-led prototype separates advisory intelligence from explicit human
            authority. It is not a fraud-detection, reimbursement, account-control, communication,
            AML, sanctions or credit-decision system.
          </p>
        </section>
        <aside className="bank-disclosure">
          <strong>
            Meridian Vale Bank UK is a fictional organisation created solely for this synthetic
            demonstration. It is not a real bank, payment provider or regulated financial
            institution.
          </strong>
          <span>
            All customers, payments, evidence and policies are fictional. No bank account or
            banking system is connected. This is not legal advice. No real fraud or reimbursement
            determination occurs.
          </span>
        </aside>
        <section className="bank-workspace">
          <BankingDemoNavigation
            activeView={safeActive}
            onNavigate={navigate}
            recordUnlocked={Boolean(record)}
            selectedCaseId={selected}
          />
          <div className="bank-content" ref={viewRef}>
            <BankingViewShell
              id={safeActive}
              intro={
                safeActive === 'inbox'
                  ? 'Select the only full-detail synthetic case to begin.'
                  : 'Only this active workflow section is rendered.'
              }
              number={String(bankingViews.indexOf(meta) + 1).padStart(2, '0')}
              title={meta.label}
            >
              {body[safeActive]}
            </BankingViewShell>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
