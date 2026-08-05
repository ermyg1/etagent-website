import { useEffect, useRef } from 'react'
import type { DemoViewId } from '../types'

// Navigation metadata is colocated so the component and rendered step order cannot diverge.
// eslint-disable-next-line react-refresh/only-export-components
export const bankingViews: readonly { id: DemoViewId; label: string }[] = [
  { id: 'inbox', label: 'Claims Inbox' },
  { id: 'overview', label: 'Customer and Payment Overview' },
  { id: 'evidence', label: 'Evidence Review' },
  { id: 'timeline', label: 'Payment Timeline' },
  { id: 'policy', label: 'Policy Assessment' },
  { id: 'circumstances', label: 'Customer Circumstances and Fairness' },
  { id: 'impact', label: 'Impact Summary' },
  { id: 'recommendation', label: 'Advisory Recommendation' },
  { id: 'review', label: 'Human Review' },
  { id: 'record', label: 'Decision Record' },
  { id: 'governance', label: 'Governance Controls' },
]

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

type BankingDemoNavigationProps = {
  activeView: DemoViewId
  onNavigate: (id: DemoViewId) => void
  recordUnlocked: boolean
  selectedCaseId: string | null
}

export function BankingDemoNavigation({
  activeView,
  onNavigate,
  recordUnlocked,
  selectedCaseId,
}: BankingDemoNavigationProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = ref.current
    const list = nav?.querySelector('ol')
    const item = nav?.querySelector<HTMLElement>('[aria-current="step"]')

    if (!nav || !list || !item || getComputedStyle(list).display !== 'flex') {
      return
    }

    const left = item.offsetLeft - (nav.clientWidth - item.offsetWidth) / 2
    nav.scrollTo({
      left: Math.max(0, left),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [activeView])

  return (
    <nav
      aria-label="Fraud reimbursement review workflow"
      className="bank-nav"
      data-top-obstruction="horizontal"
      ref={ref}
    >
      <ol>
        {bankingViews.map((view, index) => {
          const caseLocked = caseSpecificViews.includes(view.id) && selectedCaseId === null
          const recordLocked = view.id === 'record' && !recordUnlocked
          const locked = caseLocked || recordLocked
          const explanationId = caseLocked
            ? 'bank-case-sections-lock-explanation'
            : 'bank-record-lock-explanation'

          return (
            <li key={view.id}>
              {locked ? (
                <div
                  aria-current={activeView === view.id ? 'step' : undefined}
                  aria-describedby={explanationId}
                  className="bank-nav__button bank-nav__button--locked"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {view.label}
                  <small> Locked</small>
                </div>
              ) : (
                <button
                  aria-current={activeView === view.id ? 'step' : undefined}
                  className="bank-nav__button"
                  onClick={() => onNavigate(view.id)}
                  type="button"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {view.label}
                </button>
              )}
            </li>
          )
        })}
      </ol>
      {selectedCaseId === null && (
        <p className="bank-nav__explanation" id="bank-case-sections-lock-explanation">
          Open the full synthetic case from Claims Inbox to unlock the detailed review sections.
        </p>
      )}
      {!recordUnlocked && (
        <p className="bank-nav__explanation" id="bank-record-lock-explanation">
          Locked until Human Review is completed.
        </p>
      )}
      <p className="bank-nav__boundary">External execution blocked</p>
    </nav>
  )
}
