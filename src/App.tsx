import './App.css'
import {
  FileCheck,
  LockKeyhole,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
} from 'lucide-react'
import { Badge } from './components/Badge'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Icon } from './components/Icon'
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

const enterpriseTrustPrinciples = [
  {
    description: 'Authority starts with governance boundaries before intelligence can recommend action.',
    icon: ShieldCheck,
    title: 'Governance First',
  },
  {
    description: 'Every recommendation is checked against role, risk and organisation-level policy.',
    icon: SlidersHorizontal,
    title: 'Policy Controlled',
  },
  {
    description: 'Material actions wait for an accountable person to review and authorize execution.',
    icon: UserCheck,
    title: 'Human Approved',
  },
  {
    description: 'Unclear policy, missing approval or incomplete context stops execution by default.',
    icon: LockKeyhole,
    title: 'Fail Closed',
  },
  {
    description: 'Requests, decisions, approvals and outcomes are preserved for complete reviewability.',
    icon: FileCheck,
    title: 'Audit Ready',
  },
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

      <Section
        aria-labelledby="enterprise-trust-title"
        className="enterprise-trust"
        spacing="compact"
        width="wide"
      >
        <Stack className="enterprise-trust__header" space="md">
          <p className="type-caption">Enterprise trust</p>
          <h2 className="type-heading-2" id="enterprise-trust-title">
            Enterprise trust built into every decision
          </h2>
          <p className="type-body-large">
            E.T Agent separates intelligence from authority so organisations retain
            oversight, enforce policy, and maintain a complete audit trail for every
            approved action.
          </p>
        </Stack>

        <div className="enterprise-trust__grid">
          {enterpriseTrustPrinciples.map((principle) => (
            <Card
              aria-labelledby={`enterprise-trust-${principle.title
                .toLowerCase()
                .replaceAll(' ', '-')}`}
              className="enterprise-trust-card"
              key={principle.title}
              variant="bordered"
            >
              <Icon
                className="enterprise-trust-card__icon"
                icon={principle.icon}
                size="lg"
              />
              <h3
                className="enterprise-trust-card__title type-heading-4"
                id={`enterprise-trust-${principle.title
                  .toLowerCase()
                  .replaceAll(' ', '-')}`}
              >
                {principle.title}
              </h3>
              <p className="type-body">{principle.description}</p>
            </Card>
          ))}
        </div>
      </Section>
    </PageLayout>
  )
}

export default App
