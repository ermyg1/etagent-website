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
  return (
    <div
      aria-label="Governance demo view"
      className="governance-demo-toggle"
      role="tablist"
    >
      <Button
        aria-controls="governance-demo-business-panel"
        aria-selected={activeView === 'business'}
        className="governance-demo-toggle__button"
        onClick={() => onViewChange('business')}
        role="tab"
        size="md"
        variant={activeView === 'business' ? 'secondary' : 'ghost'}
      >
        Business View
      </Button>
      <Button
        aria-controls="governance-demo-technical-panel"
        aria-selected={activeView === 'technical'}
        className="governance-demo-toggle__button"
        onClick={() => onViewChange('technical')}
        role="tab"
        size="md"
        variant={activeView === 'technical' ? 'secondary' : 'ghost'}
      >
        Technical View
      </Button>
    </div>
  )
}
