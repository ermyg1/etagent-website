import './App.css'
import { Badge } from './components/Badge'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { PageLayout, Section, Stack } from './components/layout'

const workflowPreview = [
  'Request',
  'Intelligence',
  'Policy Engine',
  'Impact Summary',
  'Human Approval',
  'Execution',
  'Immutable Audit Log',
]

function App() {
  const focusWorkflowPreview = () => {
    document.getElementById('governance-model')?.focus()
  }

  return (
    <PageLayout>
      <Section className="homepage-hero" id="home" spacing="spacious" width="wide">
        <div className="homepage-hero__grid">
          <Stack className="homepage-hero__content" space="lg">
            <Badge variant="primary">Governance-first enterprise AI</Badge>
            <Stack space="md">
              <h1 className="type-display">
                Enterprise AI, controlled by policy and approved by humans.
              </h1>
              <p className="type-body-large">
                AI can reason at speed, but enterprise action requires governance,
                accountability and auditable approval.
              </p>
            </Stack>
            <p className="homepage-hero__positioning type-body">
              E.T Agent separates intelligence from authority so teams can evaluate
              recommendations, enforce policy and execute only after human approval.
            </p>
            <div className="homepage-hero__actions" aria-label="Hero calls to action">
              <Button size="lg">Request architecture review</Button>
              <Button
                onClick={focusWorkflowPreview}
                size="lg"
                variant="outline"
              >
                View governance model
              </Button>
            </div>
          </Stack>

          <Card
            aria-labelledby="workflow-preview-title"
            className="workflow-preview"
            id="governance-model"
            tabIndex={-1}
            variant="bordered"
          >
            <div className="workflow-preview__header">
              <p className="type-caption">Controlled execution preview</p>
              <h2 className="type-heading-3" id="workflow-preview-title">
                Request to audit log
              </h2>
            </div>
            <ol className="workflow-preview__list">
              {workflowPreview.map((step, index) => (
                <li className="workflow-preview__item" key={step}>
                  <span className="workflow-preview__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="workflow-preview__label">{step}</span>
                </li>
              ))}
            </ol>
            <p className="workflow-preview__note type-body">
              Execution advances only after policy validation and authorized human
              approval are captured.
            </p>
          </Card>
        </div>
      </Section>
    </PageLayout>
  )
}

export default App
