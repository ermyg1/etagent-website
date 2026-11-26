import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '../../../components/Badge'
import { Card } from '../../../components/Card'
import { initialWorkItems, planV1 } from '../data'

function getPreview() {
  const item = initialWorkItems.find(({ id }) => id === 'SYN-CMD-001')
  const evidence = item?.policies.find(({ code }) => code === 'EVID-01')
  const outreach = item?.policies.find(({ code }) => code === 'OUTR-01')
  if (!item || !evidence?.result || !outreach?.result || planV1?.workItemId !== item.id ||
      !planV1.reference || !planV1.policyReference || !planV1.impactReference ||
      planV1.impactReference !== item.impact.reference) return null

  const steps = [
    { id: 'request', label: 'Request', detail: item.request },
    { id: 'intelligence', label: 'Intelligence', detail: <>Pre-authored advisory recommendation. {item.recommendation}</> },
    { id: 'policy', label: 'Illustrated policy check', gate: true, detail: <>
      <p>{item.impact.evidenceGaps}</p>
      <p>{evidence.code} · {evidence.result}. {evidence.explanation}</p>
      <p>{outreach.code} · {outreach.result}. {outreach.explanation}</p>
    </> },
    { id: 'impact', label: 'Impact Summary', detail: <>
      <p>{item.impact.proposedAction}</p>
      <p>{item.impact.reputationalImpact}</p>
      <p>External systems affected — {item.impact.externalSystemsAffected}</p>
    </> },
    { id: 'human', label: 'Human Approval', gate: true, detail: <>
      {item.requiredDecision} Open the Command Centre to approve, decline or request more evidence with a written rationale.
    </> },
    { id: 'execution', label: 'Simulated Execution', detail: <>
      Preparation is pending human review. {item.impact.willNotHappen}
    </> },
    { id: 'record', label: 'Demonstration Audit Record', detail: <>
      <strong>Sample record layout</strong>
      <dl>
        <dt>Case</dt><dd>{item.id}</dd>
        <dt>Plan v1</dt><dd>{planV1.reference}</dd>
        <dt>Impact reference</dt><dd>{item.impact.reference}</dd>
        <dt>Human decision</dt><dd>{item.status}</dd>
        <dt>Rationale</dt><dd>Awaiting human decision</dd>
        <dt>Simulated outcome</dt><dd>Awaiting human decision</dd>
      </dl>
    </> },
  ]
  return { item, steps }
}

const preview = getPreview()

// Native focus scrolling can leave a button inside the viewport but behind the sticky header.
function revealCheckpoint(button: HTMLButtonElement) {
  if (!button.matches(':focus-visible')) return
  const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0
  const { top, bottom, height } = button.getBoundingClientRect()
  const style = getComputedStyle(button)
  const outlineExtent = Math.max(0, parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset))
  const viewportBottom = document.documentElement.clientHeight
  const availableInset = Math.max(0, (viewportBottom - headerBottom - height) / 2)
  const inset = Math.min(12 + outlineExtent, availableInset)
  if (top < headerBottom + inset) {
    window.scrollBy({ top: Math.floor(top - headerBottom - inset), behavior: 'instant' })
  } else if (bottom > viewportBottom - inset) {
    window.scrollBy({ top: Math.ceil(bottom - viewportBottom + inset), behavior: 'instant' })
  }
}

export function GovernanceCasePreview() {
  const [selected, setSelected] = useState('request')
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    // The initial HTML has no fragment target until React mounts this card.
    if (window.location.hash === '#governance-model') {
      document.getElementById('governance-model')?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
  }, [])

  useLayoutEffect(() => {
    // Closing the previous detail can move the focused button after activation.
    const button = document.activeElement
    if (button instanceof HTMLButtonElement && listRef.current?.contains(button)) revealCheckpoint(button)
  }, [selected])

  return (
    <Card aria-labelledby="workflow-preview-title" className="workflow-preview"
      id="governance-model" tabIndex={-1} variant="bordered">
      <div className="workflow-preview__header">
        <Badge variant="secondary">Synthetic workflow illustration</Badge>
        <h2 className="type-heading-3" id="workflow-preview-title">Partnership brief for human review</h2>
      </div>
      {preview ? <>
        <div className="workflow-preview__case">
          <span>{preview.item.id} · {preview.item.subject}</span>
          <Badge variant="warning">{preview.item.status}</Badge>
        </div>
        <ol className="workflow-preview__list" ref={listRef} role="list">
          {preview.steps.map((step, index) => {
            const expanded = selected === step.id
            const panelId = 'workflow-preview-' + step.id
            const Indicator = expanded ? ChevronUp : ChevronDown
            return (
              <li className="workflow-preview__item" data-gate={step.gate} key={step.id}>
                <button aria-controls={panelId} aria-expanded={expanded} className="workflow-preview__control"
                  onFocus={event => revealCheckpoint(event.currentTarget)} onClick={() => setSelected(step.id)} type="button">
                  <span aria-hidden="true" className="workflow-preview__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="workflow-preview__label">{step.label}</span>
                  <Indicator aria-hidden="true" size={16} />
                </button>
                <div className="workflow-preview__detail" hidden={!expanded} id={panelId}>{step.detail}</div>
              </li>
            )
          })}
        </ol>
        <p className="workflow-preview__note type-body">
          The request is waiting for an authorised reviewer. No operational action has been taken. Even after approval, the demo only simulates preparing the brief.
        </p>
      </> : <p className="type-body">This workflow example is unavailable.</p>}
    </Card>
  )
}
