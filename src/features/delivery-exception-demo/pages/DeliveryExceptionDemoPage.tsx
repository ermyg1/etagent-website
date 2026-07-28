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
  const [navigationRequest, setNavigationRequest] = useState(0)
  const [record, setRecord] = useState<DecisionRecordData | null>(null)
  const [primaryNavigation, setPrimaryNavigation] = useState<HTMLElement | null>(null)
  const navigationRequestedRef = useRef(false)
  const stickyOffsetRef = useRef(0)
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

  useEffect(() => {
    const workspaceSection = document.querySelector<HTMLElement>(
      '.delivery-demo-workspace-section',
    )
    const header = document.querySelector<HTMLElement>('.site-header')
    const disclosure = document.querySelector<HTMLElement>('.delivery-demo-disclosure')

    if (!workspaceSection || !header || !disclosure) {
      return undefined
    }

    const updateStickyOffset = () => {
      const headerTop = Number.parseFloat(window.getComputedStyle(header).top) || 0
      const spacing = Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue('--space-sm'),
      ) || 8
      const stickyOffset =
        headerTop + header.offsetHeight + disclosure.offsetHeight + spacing

      stickyOffsetRef.current = stickyOffset
      workspaceSection.style.setProperty(
        '--delivery-demo-sticky-offset',
        `${stickyOffset}px`,
      )
    }

    const resizeObserver = new ResizeObserver(updateStickyOffset)
    resizeObserver.observe(header)
    resizeObserver.observe(disclosure)
    window.addEventListener('resize', updateStickyOffset)
    updateStickyOffset()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateStickyOffset)
    }
  }, [])

  useEffect(() => {
    if (!navigationRequestedRef.current) {
      return undefined
    }

    navigationRequestedRef.current = false
    const heading = viewRef.current?.querySelector<HTMLElement>('h2')

    if (!heading) {
      return undefined
    }

    heading.focus({ preventScroll: true })

    let scrollFrame = 0
    const renderFrame = window.requestAnimationFrame(() => {
      scrollFrame = window.requestAnimationFrame(() => {
        const navigation = document.querySelector<HTMLElement>('.delivery-demo-nav')
        const navigationList = navigation?.querySelector<HTMLElement>('ol')
        const isHorizontalNavigation =
          navigationList && window.getComputedStyle(navigationList).display === 'flex'
        const spacing = Number.parseFloat(
          window.getComputedStyle(document.documentElement).getPropertyValue('--space-md'),
        ) || 16
        const stickyStackHeight =
          stickyOffsetRef.current + (isHorizontalNavigation ? navigation?.offsetHeight || 0 : 0)
        const headingDocumentTop = window.scrollY + heading.getBoundingClientRect().top
        const targetScrollY = headingDocumentTop - stickyStackHeight - spacing
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: reduceMotion ? 'auto' : 'smooth',
        })
      })
    })

    return () => {
      window.cancelAnimationFrame(renderFrame)
      window.cancelAnimationFrame(scrollFrame)
    }
  }, [activeView, navigationRequest])

  const navigate = (view: DemoViewId) => {
    navigationRequestedRef.current = true
    setActiveView(view)
    setNavigationRequest((request) => request + 1)
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

      <Section
        className="delivery-demo-workspace-section"
        spacing="compact"
        width="wide"
      >
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
