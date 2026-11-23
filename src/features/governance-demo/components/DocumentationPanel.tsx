import { Card } from '../../../components/Card'
import { Icon } from '../../../components/Icon'
import type { GovernanceDemoView } from './GovernanceViewToggle'
import { governanceDocumentation } from '../constants/content'

type DocumentationPanelProps = {
  activeView: GovernanceDemoView
}

export function DocumentationPanel({ activeView }: DocumentationPanelProps) {
  return (
    <>
      {Object.entries(governanceDocumentation).map(([view, documentation]) => {
        const isVisible = activeView === view

        return (
          <div
            aria-labelledby={`governance-demo-${view}-tab`}
            className="governance-demo-docs"
            hidden={!isVisible}
            id={documentation.panelId}
            key={view}
            role="tabpanel"
            tabIndex={isVisible ? 0 : -1}
          >
            <h2 className="type-heading-3" id={`${documentation.panelId}-title`}>
              {documentation.label}
            </h2>
            <div className="governance-demo-docs__grid">
              {documentation.cards.map((card) => (
                <Card
                  aria-labelledby={`${documentation.panelId}-${card.id}`}
                  className="governance-demo-doc-card"
                  key={card.id}
                  variant="bordered"
                >
                  <Icon
                    className="governance-demo-doc-card__icon"
                    icon={card.icon}
                    size="lg"
                  />
                  <h3
                    className="governance-demo-doc-card__title type-heading-4"
                    id={`${documentation.panelId}-${card.id}`}
                  >
                    {card.title}
                  </h3>
                  <p className="type-body">{card.body}</p>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}
