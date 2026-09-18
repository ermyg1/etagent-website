import type { KeyboardEvent } from 'react'
import { Button } from '../../../components/Button'

export type GovernanceDemoView = 'business' | 'technical'

type GovernanceViewToggleProps = {
  activeView: GovernanceDemoView
  onViewChange: (view: GovernanceDemoView) => void
}

export function GovernanceViewToggle({
  activeView,
  onViewChange,
}: GovernanceViewToggleProps) {
  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    view: GovernanceDemoView,
  ) {
    let nextView: GovernanceDemoView

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        nextView = view === 'business' ? 'technical' : 'business'
        break
      case 'Home':
        nextView = 'business'
        break
      case 'End':
        nextView = 'technical'
        break
      default:
        return
    }

    event.preventDefault()
    onViewChange(nextView)
    event.currentTarget.ownerDocument
      .getElementById(`governance-demo-${nextView}-tab`)
      ?.focus()
  }

  return (
    <div
      aria-label="Interactive Governance view"
      className="governance-demo-toggle"
      role="tablist"
    >
      <Button
        aria-controls="governance-demo-business-panel"
        aria-selected={activeView === 'business'}
        className="governance-demo-toggle__button"
        id="governance-demo-business-tab"
        onClick={() => onViewChange('business')}
        onKeyDown={(event) => handleKeyDown(event, 'business')}
        role="tab"
        size="md"
        tabIndex={activeView === 'business' ? 0 : -1}
        variant={activeView === 'business' ? 'secondary' : 'ghost'}
      >
        Business View
      </Button>
      <Button
        aria-controls="governance-demo-technical-panel"
        aria-selected={activeView === 'technical'}
        className="governance-demo-toggle__button"
        id="governance-demo-technical-tab"
        onClick={() => onViewChange('technical')}
        onKeyDown={(event) => handleKeyDown(event, 'technical')}
        role="tab"
        size="md"
        tabIndex={activeView === 'technical' ? 0 : -1}
        variant={activeView === 'technical' ? 'secondary' : 'ghost'}
      >
        Technical View
      </Button>
    </div>
  )
}
