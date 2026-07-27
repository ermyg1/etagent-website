import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LockKeyhole, ShieldCheck, X } from 'lucide-react'
import { Badge } from '../../../components/Badge'
import { Icon } from '../../../components/Icon'
import { PageLayout, Section } from '../../../components/layout'
import { DemoNavigation } from '../components/DemoNavigation'
import {
  CaseOverview,
  DecisionRecord,
  EvidenceReview,
  ExceptionInbox,
  GovernanceControls,
  HumanReview,
  ImpactSummary,
  PolicyAssessment,
  Recommendation,
  type DecisionRecordData,
} from '../components/DemoViews'
import { caseDetails, type DemoViewId } from '../data/demoData'
import '../styles/delivery-exception-demo.css'

export function DeliveryExceptionDemoPage() {
  const [activeView, setActiveView] = useState<DemoViewId>('inbox')
  const [record, setRecord] = useState<DecisionRecordData | null>(null)
  const [primaryNavigation, setPrimaryNavigation] = useState<HTMLElement | null>(null)
  const viewRef = useRef<HTMLDivElement>(null)

  const completedViews: DemoViewId[] = record ? ['record'] : []

  useEffect(() => {
    const toggle = document.querySelector<HTMLButtonElement>('.site-header__toggle')
    const menu = document.getElementById('primary-navigation')

    if (!toggle || !menu) {
      return undefined
    }

    document.body.classList.add('delivery-demo-route')
    const portalFrame = window.requestAnimationFrame(() => {
      setPrimaryNavigation(menu)
    })

    const focusForMenuState = () => {
      window.requestAnimationFrame(() => {
        if (toggle.getAttribute('aria-expanded') === 'true') {
          menu.querySelector<HTMLElement>('.delivery-demo-menu-close')?.focus()
          return
        }

        toggle.focus()
      })
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        event.preventDefault()
        toggle.click()
      }
    }

    const allowMenuScroll = (event: Event) => {
      event.stopPropagation()
    }

    toggle.addEventListener('click', focusForMenuState)
    document.addEventListener('keydown', handleKeyDown)
    menu.addEventListener('touchmove', allowMenuScroll)
    menu.addEventListener('wheel', allowMenuScroll)

    return () => {
      window.cancelAnimationFrame(portalFrame)
      toggle.removeEventListener('click', focusForMenuState)
      document.removeEventListener('keydown', handleKeyDown)
      menu.removeEventListener('touchmove', allowMenuScroll)
      menu.removeEventListener('wheel', allowMenuScroll)
      document.body.classList.remove('delivery-demo-route')
    }
  }, [])

  const navigate = (view: DemoViewId) => {
    setActiveView(view)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    window.requestAnimationFrame(() => {
      viewRef.current?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
    })
  }

  const views: Record<DemoViewId, React.ReactNode> = {
    inbox: <ExceptionInbox onNavigate={navigate} />,
    overview: <CaseOverview onNavigate={navigate} />,
    evidence: <EvidenceReview onNavigate={navigate} />,
    policy: <PolicyAssessment onNavigate={navigate} />,
    impact: <ImpactSummary onNavigate={navigate} />,
    recommendation: <Recommendation onNavigate={navigate} />,
    review: <HumanReview onNavigate={navigate} onRecordDecision={setRecord} />,
    record: <DecisionRecord onNavigate={navigate} record={record} />,
    governance: <GovernanceControls />,
  }

  return (
    <PageLayout>
      {primaryNavigation &&
        createPortal(
          <div className="delivery-demo-menu-controls">
            <span>Navigation</span>
            <button
              aria-label="Close navigation"
              className="delivery-demo-menu-close"
              onKeyDown={(event) => {
                if (event.key === 'Tab' && !event.shiftKey) {
                  event.preventDefault()
                  primaryNavigation.querySelector<HTMLElement>('a, button')?.focus()
                }
              }}
              onClick={() =>
                document.querySelector<HTMLButtonElement>('.site-header__toggle')?.click()
              }
              type="button"
            >
              <X aria-hidden="true" />
            </button>
          </div>,
          primaryNavigation,
        )}
      <Section
        aria-labelledby="delivery-exception-demo-title"
        className="delivery-demo-hero"
        spacing="compact"
        width="wide"
      >
        <div className="delivery-demo-hero__content">
          <div>
            <Badge variant="secondary">Courier operations use-case demonstration</Badge>
            <h1 className="type-heading-1" id="delivery-exception-demo-title">
              E.T Agent: Governed Delivery Exception Review
            </h1>
            <p className="type-body-large">
              This synthetic demonstration shows how E.T Agent can support a courier
              operator's evidence-led exception-review process. It is not a courier-management
              platform and is not connected to a live delivery system.
            </p>
          </div>
          <div className="delivery-demo-hero__boundary">
            <Icon icon={LockKeyhole} size="lg" />
            <div>
              <strong>Execution blocked</strong>
              <span>No operational or external action is available.</span>
            </div>
          </div>
        </div>
        <div className="delivery-demo-case-strip">
          <div><span>Case</span><strong>{caseDetails.caseReference}</strong></div>
          <div><span>Company</span><strong>{caseDetails.courier}</strong></div>
          <div><span>Status</span><strong>{caseDetails.status}</strong></div>
        </div>
      </Section>

      <div className="delivery-demo-disclosure" role="status">
        <ShieldCheck aria-hidden="true" />
        <strong>Synthetic demonstration. No operational actions are executed.</strong>
      </div>

      <Section className="delivery-demo-workspace-section" spacing="compact" width="wide">
        <div className="delivery-demo-workspace">
          <DemoNavigation
            activeView={activeView}
            completedViews={completedViews}
            onNavigate={navigate}
          />
          <div className="delivery-demo-view" ref={viewRef}>
            {views[activeView]}
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}
