import './App.css'
import {
  Brain,
  Building2,
  CircleCheck,
  ClipboardCheck,
  FileText,
  FileCheck,
  Gauge,
  History,
  ListChecks,
  LockKeyhole,
  MessageSquareText,
  PlayCircle,
  Route,
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

const aiExcelsItems = [
  'Understanding language',
  'Analysing information',
  'Generating content',
  'Writing software',
  'Assisting decision-making',
]

const enterpriseRequirementItems = [
  'Human approval',
  'Policy enforcement',
  'Accountability',
  'Auditability',
  'Explainability',
  'Controlled execution',
]

const governancePrinciples = [
  {
    body: 'AI analyses information and proposes actions.',
    icon: Brain,
    title: 'Intelligence informs',
  },
  {
    body: 'Every recommendation is evaluated against organisational policy before execution.',
    icon: ShieldCheck,
    title: 'Policy decides',
  },
  {
    body: 'Material actions require explicit human approval from an authorised person.',
    icon: UserCheck,
    title: 'Humans remain accountable',
  },
  {
    body: 'Each approved action produces a complete audit record that can be reviewed later.',
    icon: FileCheck,
    title: 'Every decision is traceable',
  },
]

const introducingPlatformPrinciples = [
  {
    body: 'AI analyses requests and prepares structured execution plans.',
    icon: Brain,
    title: 'Intelligent Planning',
  },
  {
    body: 'Every proposed action is checked against organisational rules before execution.',
    icon: ShieldCheck,
    title: 'Policy Evaluation',
  },
  {
    body: 'Material actions require explicit approval from authorised users.',
    icon: UserCheck,
    title: 'Human Approval',
  },
  {
    body: 'Every approved action produces a permanent, reviewable audit artefact.',
    icon: FileCheck,
    title: 'Immutable Audit',
  },
]

const howItWorksSteps = [
  {
    body: 'The user describes what they want to achieve.',
    icon: MessageSquareText,
    title: 'Intent',
  },
  {
    body: 'The AI develops a proposed plan without taking action.',
    icon: Route,
    title: 'Planning',
  },
  {
    body: 'The platform determines which approved capabilities would be required.',
    icon: ListChecks,
    title: 'Capability Analysis',
  },
  {
    body: 'Governance policies determine whether the requested action is permitted.',
    icon: ShieldCheck,
    title: 'Policy Evaluation',
  },
  {
    body: 'Potential impact and risk level are assessed before approval.',
    icon: Gauge,
    title: 'Risk Classification',
  },
  {
    body: 'A clear explanation describes exactly what would happen if approved.',
    icon: FileText,
    title: 'Impact Summary',
  },
  {
    body: 'Execution requires explicit human authorisation.',
    icon: UserCheck,
    title: 'Human Approval',
  },
  {
    body: 'Approved actions execute in a controlled simulated environment.',
    icon: PlayCircle,
    title: 'Execution (Simulated)',
  },
  {
    body: 'A permanent audit record is generated for transparency and review.',
    icon: ClipboardCheck,
    title: 'Audit Artefact',
  },
  {
    body: 'Authorised users can review the complete workflow and replay decisions for audit, investigation, and continuous improvement.',
    icon: History,
    title: 'Review & Replay',
  },
]

const governanceComparisonRows = [
  {
    conventional: 'AI proposes and executes.',
    etAgent: 'AI proposes. Humans authorise execution.',
  },
  {
    conventional: 'Policy applied after deployment or minimally.',
    etAgent: 'Policy evaluated before execution.',
  },
  {
    conventional: 'Limited visibility into decisions.',
    etAgent: 'Explainable governance workflow.',
  },
  {
    conventional: 'Audit capability varies.',
    etAgent: 'Immutable audit artefacts.',
  },
  {
    conventional: 'Focus on automation.',
    etAgent: 'Focus on accountable automation.',
  },
  {
    conventional: 'Trust is assumed.',
    etAgent: 'Trust is demonstrated.',
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

      <Section
        aria-labelledby="problem-title"
        className="homepage-problem"
        id="problem"
        spacing="default"
        width="wide"
      >
        <Stack className="homepage-problem__header" space="md">
          <Badge variant="secondary">The challenge</Badge>
          <h2 className="type-heading-2" id="problem-title">
            Today's AI is intelligent. Enterprise execution is a different
            challenge.
          </h2>
          <p className="type-body-large">
            Modern AI systems can analyse information, generate content, write
            software, and assist with complex decision-making. Enterprise
            organisations, however, require governance, accountability, policy
            enforcement, human oversight, and complete auditability before actions
            are executed.
          </p>
        </Stack>

        <div className="homepage-problem__comparison">
          <Card
            aria-labelledby="ai-excels-title"
            className="homepage-problem-card"
            variant="bordered"
          >
            <div className="homepage-problem-card__heading">
              <Icon
                className="homepage-problem-card__icon"
                icon={Brain}
                size="lg"
              />
              <h3 className="type-heading-3" id="ai-excels-title">
                AI excels at
              </h3>
            </div>
            <ul className="homepage-problem-card__list">
              {aiExcelsItems.map((item) => (
                <li className="homepage-problem-card__item" key={item}>
                  <CircleCheck aria-hidden="true" focusable="false" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            aria-labelledby="enterprise-requirements-title"
            className="homepage-problem-card homepage-problem-card--enterprise"
            variant="bordered"
          >
            <div className="homepage-problem-card__heading">
              <Icon
                className="homepage-problem-card__icon"
                icon={Building2}
                size="lg"
              />
              <h3 className="type-heading-3" id="enterprise-requirements-title">
                Enterprises still require
              </h3>
            </div>
            <ul className="homepage-problem-card__list">
              {enterpriseRequirementItems.map((item) => (
                <li className="homepage-problem-card__item" key={item}>
                  <CircleCheck aria-hidden="true" focusable="false" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <p className="homepage-problem__statement type-heading-3">
          Intelligence alone doesn't create enterprise trust. Governance does.
        </p>
      </Section>

      <Section
        aria-labelledby="why-governance-matters-title"
        className="homepage-governance"
        id="why-governance-matters"
        spacing="default"
        width="wide"
      >
        <Stack className="homepage-governance__header" space="md">
          <Badge variant="secondary">WHY GOVERNANCE MATTERS</Badge>
          <h2 className="type-heading-2" id="why-governance-matters-title">
            Enterprise AI isn't just about intelligence. It's about controlled
            execution.
          </h2>
          <p className="type-body-large">
            AI can generate recommendations in seconds. Enterprise organisations
            must ensure those recommendations align with internal policy,
            regulatory obligations, business risk, and human accountability before
            any action is taken. Governance is what transforms intelligence into
            trustworthy execution.
          </p>
        </Stack>

        <div className="homepage-governance__grid">
          {governancePrinciples.map((principle) => (
            <Card
              aria-labelledby={`governance-principle-${principle.title
                .toLowerCase()
                .replaceAll(' ', '-')}`}
              className="homepage-governance-card"
              key={principle.title}
              variant="bordered"
            >
              <Icon
                className="homepage-governance-card__icon"
                icon={principle.icon}
                size="lg"
              />
              <div>
                <h3
                  className="homepage-governance-card__title type-heading-4"
                  id={`governance-principle-${principle.title
                    .toLowerCase()
                    .replaceAll(' ', '-')}`}
                >
                  {principle.title}
                </h3>
                <p className="type-body">{principle.body}</p>
              </div>
            </Card>
          ))}
        </div>

        <p className="homepage-governance__statement type-heading-3">
          "Without governance, AI becomes automation. With governance, AI becomes
          enterprise infrastructure."
        </p>
      </Section>

      <Section
        aria-labelledby="introducing-et-agent-title"
        className="homepage-introducing"
        id="introducing-et-agent"
        spacing="default"
        width="wide"
      >
        <Stack className="homepage-introducing__header" space="md">
          <Badge variant="secondary">INTRODUCING E.T AGENT</Badge>
          <h2 className="type-heading-2" id="introducing-et-agent-title">
            A governance-first platform for enterprise AI execution.
          </h2>
          <p className="type-body-large">
            E.T Agent enables organisations to use AI confidently by separating
            intelligence from execution. AI can analyse information, propose
            plans, and support decision-making, while policy, human approval, and
            auditability remain in control of every material action.
          </p>
        </Stack>

        <div className="homepage-introducing__grid">
          {introducingPlatformPrinciples.map((principle) => (
            <Card
              aria-labelledby={`introducing-principle-${principle.title
                .toLowerCase()
                .replaceAll(' ', '-')}`}
              className="homepage-introducing-card"
              key={principle.title}
              variant="bordered"
            >
              <Icon
                className="homepage-introducing-card__icon"
                icon={principle.icon}
                size="lg"
              />
              <h3
                className="homepage-introducing-card__title type-heading-4"
                id={`introducing-principle-${principle.title
                  .toLowerCase()
                  .replaceAll(' ', '-')}`}
              >
                {principle.title}
              </h3>
              <p className="type-body">{principle.body}</p>
            </Card>
          ))}
        </div>

        <p className="homepage-introducing__statement type-heading-3">
          "E.T Agent doesn't replace enterprise governance. It operationalises
          it."
        </p>
      </Section>

      <Section
        aria-labelledby="how-et-agent-works-title"
        className="homepage-workflow"
        id="how-et-agent-works"
        spacing="default"
        width="wide"
      >
        <Stack className="homepage-workflow__header" space="md">
          <Badge variant="secondary">HOW E.T AGENT WORKS</Badge>
          <h2 className="type-heading-2" id="how-et-agent-works-title">
            How E.T Agent Works
          </h2>
          <p className="type-body-large">
            Every request follows a governed workflow before any action can be
            taken. Intelligence proposes. Governance decides. Execution only
            occurs after policy evaluation and explicit human approval.
          </p>
        </Stack>

        <ol className="homepage-workflow__list">
          {howItWorksSteps.map((step, index) => (
            <li className="homepage-workflow__item" key={step.title}>
              <Card
                aria-labelledby={`workflow-step-${index + 1}`}
                className="homepage-workflow-card"
                variant="bordered"
              >
                <span className="homepage-workflow-card__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon
                  className="homepage-workflow-card__icon"
                  icon={step.icon}
                  size="lg"
                />
                <div>
                  <h3
                    className="homepage-workflow-card__title type-heading-4"
                    id={`workflow-step-${index + 1}`}
                  >
                    {step.title}
                  </h3>
                  <p className="type-body">{step.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>

        <Card
          aria-labelledby="governance-before-execution-title"
          className="homepage-workflow__statement"
          variant="bordered"
        >
          <h3
            className="type-heading-3"
            id="governance-before-execution-title"
          >
            Governance Before Execution
          </h3>
          <p className="type-body-large">
            Unlike autonomous AI agents, E.T Agent separates intelligence from
            execution. Every action is evaluated against policy, reviewed for
            impact, and requires explicit human approval before execution.
          </p>
        </Card>
      </Section>

      <Section
        aria-labelledby="governance-by-design-title"
        className="homepage-comparison"
        id="comparison"
        spacing="default"
        width="wide"
      >
        <Stack className="homepage-comparison__header" space="md">
          <Badge variant="secondary">COMPARISON</Badge>
          <h2 className="type-heading-2" id="governance-by-design-title">
            Governance by Design
          </h2>
          <p className="type-body-large">
            Compare a conventional autonomous AI workflow with E.T Agent's
            governance-first execution model.
          </p>
        </Stack>

        <div className="homepage-comparison__columns" aria-hidden="true">
          <p className="type-caption">Conventional AI</p>
          <p className="type-caption">E.T Agent</p>
        </div>

        <div className="homepage-comparison__rows">
          {governanceComparisonRows.map((row, index) => (
            <Card
              aria-label={`Governance comparison row ${index + 1}`}
              className="homepage-comparison-row"
              key={`${row.conventional}-${row.etAgent}`}
              variant="bordered"
            >
              <div className="homepage-comparison-row__cell">
                <p className="homepage-comparison-row__label type-caption">
                  Conventional AI
                </p>
                <p className="type-body-large">{row.conventional}</p>
              </div>
              <div className="homepage-comparison-row__cell">
                <p className="homepage-comparison-row__label type-caption">
                  E.T Agent
                </p>
                <p className="type-body-large">{row.etAgent}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card
          aria-labelledby="governance-operating-model-title"
          className="homepage-comparison__statement"
          variant="bordered"
        >
          <h3
            className="type-heading-3"
            id="governance-operating-model-title"
          >
            Governance is not a feature.
          </h3>
          <p className="type-body-large">
            Governance is the operating model. E.T Agent was designed so that
            policy, human oversight, and auditability are integral to every
            material action rather than added afterwards.
          </p>
        </Card>
      </Section>
    </PageLayout>
  )
}

export default App
