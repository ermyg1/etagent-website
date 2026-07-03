import { useState } from 'react'
import { PageLayout, Section } from '../../../components/layout'
import { DocumentationPanel } from '../components/DocumentationPanel'
import { FooterCallToAction } from '../components/FooterCallToAction'
import { GovernancePageHero } from '../components/GovernancePageHero'
import { GovernanceWorkspace } from '../components/GovernanceWorkspace'
import {
  GovernanceViewToggle,
  type GovernanceDemoView,
} from '../components/GovernanceViewToggle'
import '../styles/governance-demo.css'

export function InteractiveGovernanceDemoPage() {
  const [activeView, setActiveView] = useState<GovernanceDemoView>('business')

  return (
    <PageLayout>
      <Section
        aria-labelledby="governance-demo-title"
        className="governance-demo-intro"
        id="governance-demo"
        spacing="spacious"
        width="wide"
      >
        <GovernancePageHero />
      </Section>

      <Section
        aria-labelledby="governance-demo-view-title"
        className="governance-demo-views"
        spacing="compact"
        width="wide"
      >
        <div className="governance-demo-views__header">
          <h2 className="type-heading-2" id="governance-demo-view-title">
            Documentation Views
          </h2>
          <GovernanceViewToggle
            activeView={activeView}
            onViewChange={setActiveView}
          />
        </div>

        <DocumentationPanel activeView={activeView} />
      </Section>

      <Section
        aria-labelledby="governance-workspace-title"
        className="governance-demo-workspace-section"
        spacing="default"
        width="wide"
      >
        <GovernanceWorkspace />
      </Section>

      <Section
        aria-labelledby="governance-demo-footer-title"
        className="governance-demo-footer-cta"
        spacing="compact"
        width="wide"
      >
        <FooterCallToAction />
      </Section>
    </PageLayout>
  )
}
