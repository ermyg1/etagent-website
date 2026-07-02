import './App.css'
import {
  Brain,
  Building2,
  CircleCheck,
  ClipboardCheck,
  FileText,
  FileCheck,
  Gauge,
  GitBranch,
  History,
  ListChecks,
  LockKeyhole,
  MessageSquareText,
  Network,
  PlayCircle,
  Plug,
  Route,
  ScrollText,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  UserCheck,
  Workflow,
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
    conventional: 'Trust is difficult to verify.',
    etAgent: 'Trust is continuously evidenced.',
  },
]

const coreEnterpriseCapabilities = [
  {
    body: 'High-impact actions remain subject to explicit human approval before execution, ensuring organisational responsibility stays with authorised decision-makers.',
    icon: UserCheck,
    title: 'Human Authorisation',
  },
  {
    body: 'Every proposed action is evaluated against organisational policy before execution, helping ensure AI operates within defined governance boundaries.',
    icon: ShieldCheck,
    title: 'Policy-Gated Execution',
  },
  {
    body: 'Execution authority is constrained by explicitly assigned capabilities rather than unrestricted AI access, reducing operational risk through defined permissions.',
    icon: LockKeyhole,
    title: 'Capability-Based Authority',
  },
  {
    body: 'Recommendations include supporting context and impact information to assist informed human decision-making before any approved execution.',
    icon: FileText,
    title: 'Explainable Decision Support',
  },
  {
    body: 'Approvals, decisions and execution outcomes are recorded to provide transparent evidence for governance, compliance and operational review.',
    icon: ClipboardCheck,
    title: 'Audit-Grade Evidence',
  },
  {
    body: 'Governed workflows can be reconstructed to understand what occurred, how decisions were reached and how approved actions were performed.',
    icon: History,
    title: 'Deterministic Replay',
  },
]

const enterprisePillars = [
  {
    body: 'Human approval, policy evaluation and controlled execution are foundational architectural components rather than optional safeguards.',
    icon: ShieldCheck,
    title: 'Governance-First Architecture',
  },
  {
    body: 'Execution authority is intentionally constrained through explicit permissions and governed workflows to reduce operational risk.',
    icon: LockKeyhole,
    title: 'Security by Design',
  },
  {
    body: 'Approvals, decisions and execution outcomes are structured to provide transparent operational evidence and support organisational oversight.',
    icon: ClipboardCheck,
    title: 'Auditability',
  },
  {
    body: 'AI recommendations include supporting context to assist informed human review before any authorised execution.',
    icon: FileText,
    title: 'Explainability',
  },
  {
    body: 'The platform remains independent of any individual AI model or provider through clearly defined architectural boundaries.',
    icon: GitBranch,
    title: 'Vendor-Neutral Integration',
  },
  {
    body: 'The governance architecture has been designed to support future enterprise compliance programmes and evolving regulatory expectations.',
    icon: FileCheck,
    title: 'Future Compliance Support',
  },
]

const productPrinciples = [
  {
    body: 'Governance boundaries are established before intelligence can recommend or prepare action.',
    icon: ShieldCheck,
    title: 'Governance First',
  },
  {
    body: 'Accountable people remain responsible for approving material actions before execution.',
    icon: UserCheck,
    title: 'Human Authority',
  },
  {
    body: 'Capabilities are evaluated against policy before any operational power is made available.',
    icon: SlidersHorizontal,
    title: 'Policy Before Power',
  },
  {
    body: 'Missing context, unclear approval or unresolved policy prevents execution by default.',
    icon: LockKeyhole,
    title: 'Fail Closed',
  },
  {
    body: 'Requests, decisions, approvals and outcomes are structured as evidence from the beginning.',
    icon: ClipboardCheck,
    title: 'Audit by Design',
  },
  {
    body: 'Governance remains independent of any individual AI model provider or model architecture.',
    icon: GitBranch,
    title: 'Vendor Neutral',
  },
]

const platformWorkspaces = [
  {
    items: ['policies', 'approvals', 'permissions', 'impact summaries', 'risk evaluation'],
    icon: ShieldCheck,
    title: 'Governance Workspace',
  },
  {
    items: ['planning', 'reasoning', 'recommendations', 'knowledge', 'analysis'],
    icon: Brain,
    title: 'Intelligence Workspace',
  },
  {
    items: ['orchestration', 'governed automation', 'execution planning', 'workflow management'],
    icon: Workflow,
    title: 'Workflow Workspace',
  },
  {
    items: ['approvals', 'evidence', 'replay', 'audit history', 'compliance'],
    icon: ScrollText,
    title: 'Audit Workspace',
  },
  {
    items: ['users', 'roles', 'integrations', 'organisation settings', 'governance configuration'],
    icon: Building2,
    title: 'Administration Workspace',
  },
]

const governancePipelineGroups = [
  {
    stages: ['Context Collection', 'Planning'],
    title: 'AI Intelligence',
  },
  {
    stages: ['Policy Evaluation', 'Risk Classification', 'Impact Summary'],
    title: 'Governance Engine',
  },
  {
    stages: ['Human Approval'],
    title: 'Human Authority',
  },
  {
    stages: ['Controlled Execution', 'Verification & Outcome Recording'],
    title: 'Execution Layer',
  },
  {
    stages: ['Immutable Audit Artefact'],
    title: 'Audit System',
  },
]

const governancePipeline = ['Request', ...governancePipelineGroups.flatMap((group) => group.stages)]

const organisationTypes = [
  {
    items: ['research', 'content creation', 'organisation', 'personal workflows'],
    icon: UserCheck,
    title: 'Individuals',
  },
  {
    items: ['collaboration', 'approvals', 'shared knowledge', 'governed workflows'],
    icon: Users,
    title: 'Teams',
  },
  {
    items: ['governance', 'policy', 'audit', 'compliance', 'security'],
    icon: Building2,
    title: 'Enterprise',
  },
]

const platformEvolution = [
  { status: 'Complete', title: 'Homepage' },
  { status: 'Complete', title: 'Platform' },
  { status: 'Next', title: 'Trust Centre' },
  { status: 'Future', title: 'Governance Demo' },
  { status: 'Future', title: 'Enterprise Readiness' },
  { status: 'Future', title: 'Procurement Centre' },
]

const productArchitectureNodes = [
  { icon: Brain, title: 'Intelligence' },
  { icon: Workflow, title: 'Workflow' },
  { icon: ScrollText, title: 'Audit' },
  { icon: Building2, title: 'Administration' },
  { icon: Plug, title: 'Integrations' },
]

function createId(prefix: string, value: string) {
  return `${prefix}-${value.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')}`
}

function ProductPage() {
  const focusSection = (sectionId: string) => {
    document.getElementById(sectionId)?.focus()
  }

  return (
    <PageLayout>
      <Section className="product-hero" id="product" spacing="spacious" width="wide">
        <Stack className="product-hero__content" space="lg">
          <Badge variant="primary">E.T Agent Platform</Badge>
          <Stack space="md">
            <h1 className="type-display">The Governed AI Execution Platform</h1>
            <p className="type-body-large">
              E.T Agent combines intelligent planning, policy-aware governance and
              human-authorised execution into a single enterprise platform.
            </p>
          </Stack>
          <div className="product-hero__actions" aria-label="Product calls to action">
            <Button onClick={() => focusSection('platform-overview')} size="lg">
              Explore the Platform
            </Button>
            <Button
              onClick={() => focusSection('platform-principles')}
              size="lg"
              variant="outline"
            >
              View Governance
            </Button>
          </div>
        </Stack>
      </Section>

      <Section
        aria-labelledby="platform-overview-title"
        className="product-overview"
        id="platform-overview"
        tabIndex={-1}
        width="wide"
      >
        <div className="product-overview__grid">
          <Stack className="product-overview__header" space="md">
            <p className="type-caption">Platform Overview</p>
            <h2 className="type-heading-2" id="platform-overview-title">
              Multiple governed workspaces operating through a Governance Core.
            </h2>
            <p className="type-body-large">
              The E.T Agent platform organises intelligence, workflow, audit,
              administration and integrations around a shared governance layer so
              enterprise action remains policy-aware and human-authorised.
            </p>
          </Stack>

          <Card
            aria-label="Conceptual E.T Agent Platform architecture"
            className="product-architecture"
            variant="bordered"
          >
            <p className="product-architecture__title type-caption">
              E.T Agent Platform
            </p>
            <div className="product-architecture__core">
              <Icon icon={Network} size="lg" />
              <span>Governance Core</span>
            </div>
            <div className="product-architecture__nodes">
              {productArchitectureNodes.map((node) => (
                <div className="product-architecture__node" key={node.title}>
                  <Icon icon={node.icon} size="md" />
                  <span>{node.title}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        aria-labelledby="platform-principles-title"
        className="product-principles"
        id="platform-principles"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <p className="type-caption">Platform Principles</p>
          <h2 className="type-heading-2" id="platform-principles-title">
            Principles that keep intelligence governed.
          </h2>
        </Stack>
        <div className="product-card-grid product-card-grid--three">
          {productPrinciples.map((principle) => (
            <Card
              aria-labelledby={createId('product-principle', principle.title)}
              className="product-info-card"
              key={principle.title}
              variant="bordered"
            >
              <Icon className="product-info-card__icon" icon={principle.icon} size="lg" />
              <h3
                className="product-info-card__title type-heading-4"
                id={createId('product-principle', principle.title)}
              >
                {principle.title}
              </h3>
              <p className="type-body">{principle.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        aria-labelledby="platform-workspaces-title"
        className="product-workspaces"
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <p className="type-caption">Platform Workspaces</p>
          <h2 className="type-heading-2" id="platform-workspaces-title">
            Responsibilities organised across governed workspaces.
          </h2>
        </Stack>
        <div className="product-card-grid product-card-grid--workspaces">
          {platformWorkspaces.map((workspace) => (
            <Card
              aria-labelledby={createId('product-workspace', workspace.title)}
              className="product-workspace-card"
              key={workspace.title}
              variant="bordered"
            >
              <div className="product-workspace-card__heading">
                <Icon className="product-info-card__icon" icon={workspace.icon} size="lg" />
                <h3
                  className="type-heading-4"
                  id={createId('product-workspace', workspace.title)}
                >
                  {workspace.title}
                </h3>
              </div>
              <ul className="product-list">
                {workspace.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        aria-labelledby="execution-lifecycle-title"
        className="product-lifecycle"
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <p className="type-caption">Execution Lifecycle</p>
          <h2 className="type-heading-2" id="execution-lifecycle-title">
            From request to audit artefact.
          </h2>
        </Stack>
        <ol className="product-lifecycle__list">
          {governancePipeline.map((step, index) => (
            <li className="product-lifecycle__item" key={step}>
              <span className="product-lifecycle__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="product-lifecycle__label">{step}</span>
            </li>
          ))}
        </ol>
        <div
          aria-label="Governance pipeline responsibility groups"
          className="product-lifecycle__groups"
        >
          <div className="product-lifecycle-group product-lifecycle-group--request">
            <span className="product-lifecycle__index">01</span>
            <span className="product-lifecycle__label">Request</span>
          </div>
          {governancePipelineGroups.map((group) => {
            const stageStart =
              governancePipeline.findIndex((stage) => stage === group.stages[0]) + 1

            return (
              <section className="product-lifecycle-group" key={group.title}>
                <h3 className="product-lifecycle-group__title">{group.title}</h3>
                <ol className="product-lifecycle-group__stages">
                  {group.stages.map((stage, stageIndex) => (
                    <li className="product-lifecycle-group__stage" key={stage}>
                      <span className="product-lifecycle__index">
                        {String(stageStart + stageIndex).padStart(2, '0')}
                      </span>
                      <span className="product-lifecycle__label">{stage}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )
          })}
        </div>
      </Section>

      <Section
        aria-labelledby="organisations-title"
        className="product-organisations"
        width="wide"
      >
        <Stack className="product-section-header product-section-header--center" space="md">
          <p className="type-caption">Built for Different Organisations</p>
          <h2 className="type-heading-2" id="organisations-title">
            Equal governance patterns for different scales of work.
          </h2>
        </Stack>
        <div className="product-card-grid product-card-grid--three">
          {organisationTypes.map((organisation) => (
            <Card
              aria-labelledby={createId('product-organisation', organisation.title)}
              className="product-info-card"
              key={organisation.title}
              variant="bordered"
            >
              <Icon className="product-info-card__icon" icon={organisation.icon} size="lg" />
              <h3
                className="product-info-card__title type-heading-4"
                id={createId('product-organisation', organisation.title)}
              >
                {organisation.title}
              </h3>
              <ul className="product-list">
                {organisation.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        aria-labelledby="platform-evolution-title"
        className="product-evolution"
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <p className="type-caption">Platform Evolution</p>
          <h2 className="type-heading-2" id="platform-evolution-title">
            Website maturity, not a product roadmap.
          </h2>
        </Stack>
        <ol className="product-evolution__list">
          {platformEvolution.map((item) => (
            <li className="product-evolution__item" key={item.title}>
              <span className="product-evolution__title">{item.title}</span>
              <Badge variant={item.status === 'Complete' ? 'success' : 'neutral'}>
                {item.status}
              </Badge>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        aria-labelledby="product-cta-title"
        className="product-cta"
        spacing="compact"
        width="wide"
      >
        <Card className="product-cta__card" variant="bordered">
          <Stack className="product-cta__content" space="md">
            <p className="type-caption">Next Steps</p>
            <h2 className="type-heading-2" id="product-cta-title">
              Bring governed AI execution into enterprise review.
            </h2>
          </Stack>
          <div className="product-cta__actions" aria-label="Product next steps">
            <Button size="lg">Request Early Access</Button>
            <Button size="lg" variant="outline">
              Explore Trust Centre
            </Button>
            <Button size="lg" variant="ghost">
              Read Documentation
            </Button>
          </div>
        </Card>
      </Section>
    </PageLayout>
  )
}

function App() {
  if (window.location.pathname === '/product') {
    return <ProductPage />
  }

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
            Organisations retain oversight, enforce policy and maintain a complete
            audit trail for every approved action.
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
            Modern AI can analyse information, generate content and assist complex
            decisions. Enterprise organisations still need governance,
            accountability, policy enforcement and complete auditability before
            actions are executed.
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
            Recommendations can be generated in seconds. Enterprise organisations
            still need to verify policy alignment, business risk and human
            accountability before any action is taken.
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
            E.T Agent lets AI analyse information, propose plans and support
            decisions while policy, human approval and auditability remain in
            control of every material action.
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

      <Section
        aria-labelledby="core-enterprise-capabilities-title"
        className="homepage-capabilities"
        id="core-enterprise-capabilities"
        spacing="default"
        width="wide"
      >
        <Stack className="homepage-capabilities__header" space="md">
          <Badge variant="secondary">Core enterprise capabilities</Badge>
          <h2 className="type-heading-2" id="core-enterprise-capabilities-title">
            Core Enterprise Capabilities
          </h2>
          <p className="type-body-large">
            Governance capabilities designed to help organisations adopt AI
            without surrendering control.
          </p>
          <p className="homepage-capabilities__intro type-body">
            Each capability supports AI adoption within clear operational,
            governance and accountability boundaries.
          </p>
        </Stack>

        <div className="homepage-capabilities__grid">
          {coreEnterpriseCapabilities.map((capability) => (
            <Card
              aria-labelledby={`core-capability-${capability.title
                .toLowerCase()
                .replaceAll(' ', '-')
                .replaceAll('&', 'and')}`}
              className="homepage-capability-card"
              key={capability.title}
              variant="bordered"
            >
              <Icon
                className="homepage-capability-card__icon"
                icon={capability.icon}
                size="lg"
              />
              <h3
                className="homepage-capability-card__title type-heading-4"
                id={`core-capability-${capability.title
                  .toLowerCase()
                  .replaceAll(' ', '-')
                  .replaceAll('&', 'and')}`}
              >
                {capability.title}
              </h3>
              <p className="type-body">{capability.body}</p>
            </Card>
          ))}
        </div>

        <p className="homepage-capabilities__callout type-heading-4">
          Designed to strengthen enterprise governance, not replace enterprise
          judgement.
        </p>
      </Section>

      <Section
        aria-labelledby="built-for-enterprise-title"
        className="homepage-enterprise"
        id="built-for-enterprise"
        spacing="default"
        width="wide"
      >
        <Stack className="homepage-enterprise__header" space="md">
          <Badge variant="secondary">Built for enterprise</Badge>
          <h2 className="type-heading-2" id="built-for-enterprise-title">
            Built for Enterprise
          </h2>
          <p className="type-body-large">
            Designed with the operational, security and governance expectations
            of modern organisations in mind.
          </p>
          <p className="homepage-enterprise__intro type-body">
            E.T Agent is organised around governance, operational accountability
            and architectures that support responsible deployment from the
            beginning.
          </p>
        </Stack>

        <div className="homepage-enterprise__grid">
          {enterprisePillars.map((pillar) => (
            <Card
              aria-labelledby={`enterprise-pillar-${pillar.title
                .toLowerCase()
                .replaceAll(' ', '-')
                .replaceAll('&', 'and')}`}
              className="homepage-enterprise-card"
              key={pillar.title}
              variant="bordered"
            >
              <Icon
                className="homepage-enterprise-card__icon"
                icon={pillar.icon}
                size="lg"
              />
              <h3
                className="homepage-enterprise-card__title type-heading-4"
                id={`enterprise-pillar-${pillar.title
                  .toLowerCase()
                  .replaceAll(' ', '-')
                  .replaceAll('&', 'and')}`}
              >
                {pillar.title}
              </h3>
              <p className="type-body">{pillar.body}</p>
            </Card>
          ))}
        </div>

        <p className="homepage-enterprise__statement type-heading-4">
          Enterprise trust begins with architecture, not marketing claims.
        </p>
      </Section>
    </PageLayout>
  )
}

export default App
