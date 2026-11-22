import './App.css'
import { useEffect } from 'react'
import {
  Brain,
  Building2,
  CircleCheck,
  ClipboardCheck,
  FileText,
  FileCheck,
  Gauge,
  GitBranch,
  Globe2,
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
import { Card } from './components/Card'
import { Icon } from './components/Icon'
import { SectionNavigation } from './components/SectionNavigation'
import { PageLayout, Section, Stack } from './components/layout'
import { InteractiveGovernanceDemoPage } from './features/governance-demo'
import { DeliveryExceptionDemoPage } from './features/delivery-exception-demo'
import { FraudReimbursementDemoPage } from './features/fraud-reimbursement-demo'
import { CommandCentreDemoPage } from './features/command-centre-demo'
import { UseCasesPage } from './features/use-cases'
import { followSectionLink } from './utils/scroll'

type PageMetadata = {
  title: string
  description: string
  canonical?: string
}

const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    canonical: 'https://etagent.io/',
    title: 'E.T Agent | Governance-First Enterprise AI',
    description:
      "Explore E.T Agent's governance-first approach to enterprise AI through synthetic demonstrations of policy checks, human review and decision evidence.",
  },
  '/product': {
    title: 'Platform | E.T Agent',
    description:
      'Explore the E.T Agent platform concept, governance principles and proposed workspaces for human-approved enterprise AI.',
  },
  '/trust': {
    canonical: 'https://etagent.io/trust',
    title: 'Trust Centre | E.T Agent',
    description:
      'Review E.T Agent governance principles, security design objectives and the boundaries of the public demonstrations.',
  },
  '/use-cases': {
    canonical: 'https://etagent.io/use-cases',
    title: 'Use Cases | E.T Agent',
    description:
      'Explore fictional enterprise workflows that demonstrate policy checks, human review and decision evidence with synthetic data.',
  },
  '/governance-demo': {
    canonical: 'https://etagent.io/governance-demo',
    title: 'Interactive Governance Demo | E.T Agent',
    description:
      'Follow a synthetic governance walkthrough from request and policy evaluation to human approval, simulated execution and decision evidence.',
  },
  '/demo/command-centre': {
    canonical: 'https://etagent.io/demo/command-centre',
    title: 'Command Centre Demo | E.T Agent',
    description:
      'Explore a synthetic Command Centre demonstration of governed workflow review using fictional cases, with no external actions.',
  },
  '/demo/delivery-exception-review': {
    title: 'Delivery Exception Demo | E.T Agent',
    description:
      'Review a fictional delivery exception using synthetic evidence, policy checks and human review, with no live delivery actions.',
  },
  '/demo/fraud-reimbursement-review': {
    title: 'Fraud Reimbursement Demo | E.T Agent',
    description:
      'Explore a fictional fraud reimbursement review using synthetic case evidence and human decision controls, with no banking actions.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | E.T Agent',
    description:
      'Read the E.T Agent website privacy policy for information submitted through the website and early enterprise evaluation channels.',
  },
  '/terms-of-use': {
    title: 'Terms of Use | E.T Agent',
    description:
      'Read the terms governing access to and use of the E.T Agent website for information and enterprise evaluation.',
  },
}

const notFoundMetadata: PageMetadata = {
  title: 'Page Not Found | E.T Agent',
  description: 'This page is unavailable. Return to the homepage or check document availability.',
}

const workflowPreview = [
  'Request',
  'Intelligence',
  'Illustrated policy check',
  'Impact Summary',
  'Human Approval',
  'Simulated Execution',
  'Demonstration Audit Record',
]

const enterpriseTrustPrinciples = [
  {
    description: 'The architecture sets governance boundaries before a recommendation can become a proposed action.',
    icon: ShieldCheck,
    title: 'Governance First',
  },
  {
    description: 'The design calls for review against role, risk and organisational policy.',
    icon: SlidersHorizontal,
    title: 'Policy Controlled',
  },
  {
    description: 'The design reserves approval of material actions for an accountable reviewer.',
    icon: UserCheck,
    title: 'Human Approved',
  },
  {
    description: 'The design calls for work to stop when policy, approval or context is missing.',
    icon: LockKeyhole,
    title: 'Fail Closed',
  },
  {
    description: 'A reviewable decision history is an architectural objective.',
    icon: FileCheck,
    title: 'Auditability by design',
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
    body: 'In the proposed architecture, AI supplies recommendations.',
    icon: Brain,
    title: 'Intelligence informs',
  },
  {
    body: 'Policy review should precede execution.',
    icon: ShieldCheck,
    title: 'Policy decides',
  },
  {
    body: 'Material actions require explicit human approval from an authorised person.',
    icon: UserCheck,
    title: 'Humans remain accountable',
  },
  {
    body: 'The design calls for recording the approval and its outcome.',
    icon: FileCheck,
    title: 'Decision traceability',
  },
]

const introducingPlatformPrinciples = [
  {
    body: 'The architecture assigns planning to the intelligence layer.',
    icon: Brain,
    title: 'Intelligent Planning',
  },
  {
    body: 'The design places organisational policy review before execution.',
    icon: ShieldCheck,
    title: 'Policy Evaluation',
  },
  {
    body: 'Material actions require explicit approval from authorised users.',
    icon: UserCheck,
    title: 'Human Approval',
  },
  {
    body: 'Immutable auditability is an architectural objective. The public demos show sample evidence and temporary records.',
    icon: FileCheck,
    title: 'Auditability objective',
  },
]

const howItWorksSteps = [
  {
    body: 'The user describes what they want to achieve.',
    icon: MessageSquareText,
    title: 'Intent',
  },
  {
    body: 'Prepare a proposed plan.',
    icon: Route,
    title: 'Planning',
  },
  {
    body: 'Identify the capabilities the plan would require.',
    icon: ListChecks,
    title: 'Capability Analysis',
  },
  {
    body: 'Review the request against organisational policy.',
    icon: ShieldCheck,
    title: 'Policy Evaluation',
  },
  {
    body: 'Assess risk before approval.',
    icon: Gauge,
    title: 'Risk Classification',
  },
  {
    body: 'Explain expected effects and uncertainties.',
    icon: FileText,
    title: 'Impact Summary',
  },
  {
    body: 'Require explicit human authorisation.',
    icon: UserCheck,
    title: 'Human Approval',
  },
  {
    body: 'The demonstration shows a simulated outcome.',
    icon: PlayCircle,
    title: 'Execution (Simulated)',
  },
  {
    body: 'The example shows the information a reviewer would inspect.',
    icon: ClipboardCheck,
    title: 'Example decision record',
  },
  {
    body: 'Visitors can revisit the stages. The Command Centre separately demonstrates replay of one synthetic checkpoint.',
    icon: History,
    title: 'Review the example',
  },
]

const governanceComparisonRows = [
  {
    question: 'Who can authorise a material action?',
    answer: 'The design reserves approval for an accountable person.',
  },
  {
    question: 'When should policy be checked?',
    answer: 'The design places policy review before execution.',
  },
  {
    question: 'What can a reviewer inspect?',
    answer: 'The example shows the request, expected impact and reasons for review.',
  },
  {
    question: 'What record is available?',
    answer: 'The public demos show sample evidence and temporary browser-local records.',
  },
  {
    question: 'Who owns the decision?',
    answer: 'The design assigns responsibility to a human reviewer.',
  },
  {
    question: 'How can the example be reviewed?',
    answer: 'Visitors can inspect the displayed decision steps and evidence limits.',
  },
]

const coreEnterpriseCapabilities = [
  {
    body: 'The design requires human authorisation for high-impact actions.',
    icon: UserCheck,
    title: 'Human Authorisation',
  },
  {
    body: 'The architecture places policy evaluation before execution.',
    icon: ShieldCheck,
    title: 'Policy-Gated Execution',
  },
  {
    body: 'The capability model limits the authority an action should receive.',
    icon: LockKeyhole,
    title: 'Capability-Based Authority',
  },
  {
    body: 'The examples show supporting context and expected impact for human review.',
    icon: FileText,
    title: 'Explainable Decision Support',
  },
  {
    body: 'The interactive case demos display a temporary record of the visitor’s decision.',
    icon: ClipboardCheck,
    title: 'Example decision evidence',
  },
  {
    body: 'The Command Centre compares one predefined Plan v2 checkpoint with its expected governance result in the browser.',
    icon: History,
    title: 'Synthetic checkpoint replay',
  },
]

const enterprisePillars = [
  {
    body: 'Human approval, policy evaluation and controlled execution are foundational architectural components rather than optional safeguards.',
    icon: ShieldCheck,
    title: 'Governance-First Architecture',
  },
  {
    body: 'The design calls for permissions limited to the role and task.',
    icon: LockKeyhole,
    title: 'Security by Design',
  },
  {
    body: 'A reviewer should be able to trace a proposed action to its approval and outcome.',
    icon: ClipboardCheck,
    title: 'Auditability',
  },
  {
    body: 'A recommendation should explain its basis and the likely impact.',
    icon: FileText,
    title: 'Explainability',
  },
  {
    body: 'The architecture is intended to support provider choice. The public demos invoke no AI model.',
    icon: GitBranch,
    title: 'Provider independence',
  },
  {
    body: 'The design aims to make responsibilities and decisions reviewable.',
    icon: FileCheck,
    title: 'Organisational oversight',
  },
]

const productPrinciples = [
  {
    body: 'Define governance boundaries before planning an action.',
    icon: ShieldCheck,
    title: 'Governance First',
  },
  {
    body: 'Reserve approval of material actions for accountable people.',
    icon: UserCheck,
    title: 'Human Authority',
  },
  {
    body: 'Evaluate capabilities against policy before granting authority.',
    icon: SlidersHorizontal,
    title: 'Policy Before Power',
  },
  {
    body: 'Stop when context, policy or approval is unresolved.',
    icon: LockKeyhole,
    title: 'Fail Closed',
  },
  {
    body: 'Design for reviewable evidence from request to outcome.',
    icon: ClipboardCheck,
    title: 'Audit by Design',
  },
  {
    body: 'Keep governance independent of provider choice.',
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
    stages: ['Immutable audit artefact (design objective)'],
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

const publishedPages = ['Homepage', 'Platform overview', 'Trust Centre', 'Governance walkthrough']

const productArchitectureNodes = [
  { icon: Brain, title: 'Intelligence' },
  { icon: Workflow, title: 'Workflow' },
  { icon: ScrollText, title: 'Audit' },
  { icon: Building2, title: 'Administration' },
  { icon: Plug, title: 'Integrations' },
]

const trustPrinciples = [
  {
    body: 'Assign responsibility for material actions to a human reviewer.',
    icon: UserCheck,
    title: 'Human Authority',
  },
  {
    body: 'Review governance requirements before turning a proposal into an operational plan.',
    icon: ShieldCheck,
    title: 'Governance First',
  },
  {
    body: 'Stop when context, policy or approval is unresolved.',
    icon: LockKeyhole,
    title: 'Fail Closed',
  },
  {
    body: 'Design decision records so a reviewer can trace a request to its outcome.',
    icon: ClipboardCheck,
    title: 'Auditability',
  },
  {
    body: 'Explain the basis and expected impact of a recommendation.',
    icon: FileText,
    title: 'Transparency',
  },
  {
    body: 'Limit execution to defined capabilities and require policy checks and outcome review.',
    icon: Workflow,
    title: 'Bounded execution by design',
  },
]

const trustBuildSteps = [
  'AI proposes',
  'Policies evaluate',
  'Risk classified',
  'Impact explained',
  'Human approves',
  'Controlled execution',
  'Audit evidence produced',
]

const securityOverview = [
  {
    body: 'The proposed governance model takes user and organisation identity into account.',
    icon: Users,
    title: 'Identity',
  },
  {
    body: 'The architecture places a policy gate before execution.',
    icon: ShieldCheck,
    title: 'Policy Enforcement',
  },
  {
    body: 'The design calls for permissions scoped to a role and workflow.',
    icon: LockKeyhole,
    title: 'Least Privilege',
  },
  {
    body: 'The architecture assigns intelligence, governance, execution and evidence to distinct responsibilities.',
    icon: Network,
    title: 'Secure Architecture',
  },
  {
    body: 'Execution surfaces are designed to remain bounded by explicit capability and environment controls.',
    icon: Building2,
    title: 'Environment boundaries',
  },
  {
    body: 'Encryption requirements would need to be specified for a production deployment.',
    icon: FileCheck,
    title: 'Encryption requirements',
  },
] as const

const governanceStack = [
  'Intelligence',
  'Policy Engine',
  'Human Authority',
  'Execution Layer',
  'Verification',
  'Immutable audit artefact (design objective)',
]

const aiCanItems = ['Analyse', 'Recommend', 'Summarise', 'Plan', 'Evaluate']

const aiCannotItems = [
  'Override policy',
  'Approve itself',
  'Escalate privileges',
  'Bypass governance',
  'Hide execution',
  'Trigger irreversible actions automatically',
]

const currentPublicDemoFlow = [
  'Synthetic or fictional case',
  'Visitor browser',
  'Governance demonstration',
  'Human decision',
  'Temporary browser-local evidence',
  'No operational execution',
]

const currentReplayFlow = [
  'Command Centre Plan v2 checkpoint replay',
  'Browser Web Crypto',
  'SHA-256 fingerprint',
  'Authority: NONE',
  'External action: NONE',
]

const currentDemoBoundaries = [
  'AI model or provider integration',
  'Application backend',
  'Operational API',
  'CRM integration',
  'Courier integration',
  'Banking integration',
  'Persistent production audit store',
  'Live operational execution',
]

const trustFaqs = [
  {
    answer:
      'No. Material actions are designed to require policy evaluation and explicit human approval before controlled execution.',
    question: 'Can AI execute actions automatically?',
  },
  {
    answer:
      'In the proposed lifecycle, approval follows policy evaluation, risk classification and impact review.',
    question: 'Where does human approval occur?',
  },
  {
    answer:
      'The public demos show predefined policy results and local review gates.',
    question: 'How are policies enforced?',
  },
  {
    answer:
      'Organisation-specific policy is a design objective. The public examples use predefined rules.',
    question: 'Can organisations customise governance?',
  },
  {
    answer:
      'The public case demos display temporary records and provide no audit-record export.',
    question: 'Can audit evidence be exported?',
  },
  {
    answer:
      'Enterprise identity integration is an architectural consideration. The public website has no identity-provider integration.',
    question: 'Can E.T Agent integrate with enterprise identity systems?',
  },
  {
    answer:
      'A blocked demo case displays its reason and cannot trigger an external action.',
    question: 'What happens when policy blocks execution?',
  },
]

const documentationHub = [
  { status: 'In Progress', title: 'Architecture Overview' },
  { status: 'Implemented', title: 'Governance Model' },
  { status: 'In Progress', title: 'Security Overview' },
  { status: 'Planned', title: 'Capability Model' },
  { status: 'Planned', title: 'Audit Model' },
  { status: 'Planned', title: 'Compliance Roadmap' },
] as const

const architectureReviewEmail = 'mailto:ermias@etagent.io?subject=E.T%20Agent%20architecture%20review'

const enterpriseContactRoutes = [
  {
    title: 'Architecture enquiries',
    label: 'Email about an architecture review',
    href: architectureReviewEmail,
  },
  {
    title: 'Self-guided demonstration',
    label: 'Open the governance walkthrough',
    href: '/governance-demo',
  },
  {
    title: 'Evaluation materials',
    label: 'View document availability',
    href: '/trust#documentation-hub',
  },
  {
    title: 'Business email',
    label: 'ermias@etagent.io',
    href: 'mailto:ermias@etagent.io',
  },
  {
    title: 'Website source',
    label: 'View the repository on GitHub',
    href: 'https://github.com/ermyg1/etagent-website',
  },
]

const trustLocalNavigation = [
  { id: 'trust-overview', title: 'Overview' },
  { id: 'trust-principles', title: 'Principles' },
  { id: 'security-overview', title: 'Security' },
  { id: 'governance-model-trust', title: 'Governance' },
  { id: 'ai-boundaries', title: 'AI Boundaries' },
  { id: 'current-model-data-flow', title: 'Model & Data Flow' },
  { id: 'compliance-alignment', title: 'Compliance' },
  { id: 'enterprise-faq', title: 'FAQs' },
  { id: 'documentation-hub', title: 'Document availability' },
]

const homepageSectionNavigation = [
  { id: 'home', title: 'Overview' },
  { id: 'problem', title: 'Problem' },
  { id: 'why-governance-matters', title: 'Governance' },
  { id: 'governance-model', title: 'Governance Model' },
  { id: 'how-et-agent-works', title: 'Architecture' },
  { id: 'enterprise-trust', title: 'Trust' },
  { id: 'interactive-governance', title: 'Interactive Governance' },
  { id: 'enterprise-use-cases', title: 'Use Cases' },
  { id: 'homepage-documentation', title: 'Document availability' },
  { id: 'contact', title: 'Contact' },
]

const privacyPolicySections = [
  {
    body: [
      'This Privacy Policy describes how E.T Agent collects, uses and protects information submitted through this website and related early-access enterprise evaluation workflows. It is intended as placeholder policy language for an early-stage enterprise software product and should be reviewed by qualified counsel before production use.',
      'By using this website, contacting the team or requesting evaluation materials, visitors acknowledge that information may be processed as described below.',
    ],
    title: 'Introduction',
  },
  {
    body: [
      'We may collect business contact information such as name, work email address, organisation, role, enquiry details and any information voluntarily included in messages or evaluation requests.',
      'We may also collect limited technical information such as IP address, browser type, device information, referring pages and general usage data to operate, secure and improve the website.',
    ],
    title: 'Information Collected',
  },
  {
    body: [
      'Information is used to respond to enquiries, provide requested materials, evaluate enterprise interest, improve website performance, protect the service and maintain records of communications with prospective customers and partners.',
      'We do not use submitted business contact information to make automated decisions with legal or similarly significant effects.',
    ],
    title: 'How Information Is Used',
  },
  {
    body: [
      'The website may use essential cookies or similar technologies required for site functionality, security and analytics. Future analytics or preference cookies, if introduced, should be documented with appropriate consent controls where required.',
    ],
    title: 'Cookies',
  },
  {
    body: [
      'E.T Agent may rely on reputable third-party providers for hosting, analytics, communications, code repository management and operational tooling. These providers process information only as needed to support the website and related business operations.',
      'Links to third-party websites, including documentation or repository platforms, are governed by the policies of those third parties.',
    ],
    title: 'Third-Party Services',
  },
  {
    body: [
      'We use reasonable administrative, technical and organisational safeguards intended to protect information submitted through the website. No method of transmission or storage is completely secure, and this policy does not guarantee absolute security.',
    ],
    title: 'Security',
  },
  {
    body: [
      'Privacy questions, access requests or deletion requests may be directed to the E.T Agent team through the enterprise contact route on this website.',
    ],
    title: 'Contact',
  },
] as const

const termsOfUseSections = [
  {
    body: [
      'This website provides information about E.T Agent, an early-stage governance-first AI platform for enterprise evaluation. Website content is provided for informational, technical review and business enquiry purposes only.',
    ],
    title: 'Website Purpose',
  },
  {
    body: [
      'Visitors agree not to misuse the website, interfere with its operation, attempt unauthorised access, submit unlawful or harmful content, scrape the site at unreasonable scale or use the website in a way that could impair availability or security.',
    ],
    title: 'Acceptable Use',
  },
  {
    body: [
      'All website content, product descriptions, interface concepts, logos, names, text, graphics and other materials are owned by E.T Agent or its licensors unless otherwise stated. No rights are granted except the limited right to view the website for evaluation and informational purposes.',
    ],
    title: 'Intellectual Property',
  },
  {
    body: [
      'The website and its content are provided on an as-is and as-available basis. E.T Agent does not warrant that the website will be uninterrupted, error-free, complete or suitable for any particular purpose.',
    ],
    title: 'No Warranty',
  },
  {
    body: [
      'To the fullest extent permitted by applicable law, E.T Agent will not be liable for indirect, incidental, consequential, special or punitive damages arising from use of, or inability to use, the website or its content.',
    ],
    title: 'Limitation of Liability',
  },
  {
    body: [
      'Questions about these Terms of Use may be directed through the enterprise contact route on this website.',
    ],
    title: 'Contact',
  },
] as const

function createId(prefix: string, value: string) {
  return `${prefix}-${value.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')}`
}

function LegalPage({
  intro,
  sections,
  title,
}: {
  intro: string
  sections: readonly { body: readonly string[]; title: string }[]
  title: string
}) {
  return (
    <PageLayout>
      <Section
        aria-labelledby="legal-page-title"
        className="legal-page"
        spacing="spacious"
        width="narrow"
      >
        <Stack className="legal-page__header" space="md">
          <Badge variant="primary">Legal</Badge>
          <h1 className="type-display" id="legal-page-title">
            {title}
          </h1>
          <p className="type-body-large">{intro}</p>
        </Stack>

        <div className="legal-page__content">
          {sections.map((section) => (
            <section
              aria-labelledby={createId('legal-section', section.title)}
              className="legal-page__section"
              key={section.title}
            >
              <h2 className="type-heading-3" id={createId('legal-section', section.title)}>
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p className="type-body" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section
            aria-labelledby="legal-section-last-updated"
            className="legal-page__section legal-page__section--meta"
          >
            <h2 className="type-heading-3" id="legal-section-last-updated">
              Last Updated
            </h2>
            <p className="type-body">July 5, 2026</p>
          </section>
        </div>
      </Section>
    </PageLayout>
  )
}

function PrivacyPolicyPage() {
  return (
    <LegalPage
      intro="How E.T Agent handles information submitted through the website and early enterprise evaluation channels."
      sections={privacyPolicySections}
      title="Privacy Policy"
    />
  )
}

function TermsOfUsePage() {
  return (
    <LegalPage
      intro="The terms that govern access to and use of the E.T Agent website."
      sections={termsOfUseSections}
      title="Terms of Use"
    />
  )
}

function NotFoundPage() {
  return (
    <PageLayout>
      <Section
        aria-labelledby="not-found-title"
        className="not-found-page"
        spacing="spacious"
        width="narrow"
      >
        <Stack align="center" className="not-found-page__content" space="lg">
          <Badge variant="secondary">404</Badge>
          <Stack align="center" space="md">
            <h1 className="type-display" id="not-found-title">
              Page Not Found
            </h1>
            <p className="type-body-large">
              The page you are looking for is not available on this website.
            </p>
          </Stack>
          <div className="not-found-page__actions" aria-label="404 navigation">
            <a
              className="ui-button ui-button--primary ui-button--lg"
              href="/"
            >
              Return Home
            </a>
            <a
              className="ui-button ui-button--outline ui-button--lg"
              href="/trust#documentation-hub"
              onClick={followSectionLink}
            >
              Check document availability
            </a>
          </div>
        </Stack>
      </Section>
    </PageLayout>
  )
}

function TrustCentrePage() {
  return (
    <PageLayout>
      <Section
        aria-labelledby="trust-hero-title"
        className="trust-hero"
        id="trust-overview"
        spacing="spacious"
        tabIndex={-1}
        width="wide"
      >
        <div className="trust-hero__grid">
          <Stack className="trust-hero__content" space="lg">
            <Badge variant="primary">TRUST CENTRE</Badge>
            <Stack space="md">
              <h1 className="type-display" id="trust-hero-title">
                Governance and trust design
              </h1>
              <p className="type-body-large">
                Explore the proposed governance architecture and the limits of the public demonstrations.
              </p>
            </Stack>
            <div className="trust-hero__actions" aria-label="Trust Centre actions">
              <a
                className="ui-button ui-button--primary ui-button--lg"
                href="#governance-model-trust"
                onClick={followSectionLink}
              >
                Explore Governance
              </a>
              <a
                className="ui-button ui-button--outline ui-button--lg"
                href="#security-overview"
                onClick={followSectionLink}
              >
                Explore Architecture
              </a>
            </div>
          </Stack>

          <Card
            aria-label="Subtle trust architecture illustration"
            className="trust-architecture-card"
            variant="bordered"
          >
            <Badge variant="secondary">Trust architecture</Badge>
            <div className="trust-architecture-card__core">
              <Icon icon={ShieldCheck} size="lg" />
              <span>Governance Core</span>
            </div>
            <ol className="trust-architecture-card__flow">
              <li>Policy</li>
              <li>Approval</li>
              <li>Audit</li>
            </ol>
          </Card>
        </div>
      </Section>

      <SectionNavigation
        ariaLabel="Trust Centre sections"
        sections={trustLocalNavigation}
      />

      <Section
        aria-labelledby="trust-principles-title"
        className="trust-section trust-principles"
        id="trust-principles"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <Badge variant="secondary">Trust design principles</Badge>
          <h2 className="type-heading-2" id="trust-principles-title">
            Principles that make governed AI reviewable.
          </h2>
        </Stack>
        <div className="product-card-grid product-card-grid--three">
          {trustPrinciples.map((principle) => (
            <Card
              aria-labelledby={createId('trust-principle', principle.title)}
              className="product-info-card"
              key={principle.title}
              variant="bordered"
            >
              <Icon className="product-info-card__icon" icon={principle.icon} size="lg" />
              <h3
                className="product-info-card__title type-heading-4"
                id={createId('trust-principle', principle.title)}
              >
                {principle.title}
              </h3>
              <p className="type-body">{principle.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        aria-labelledby="trust-built-title"
        className="trust-section trust-built"
        width="wide"
      >
        <Stack className="trust-section-header-centered" space="md">
          <Badge variant="secondary">Proposed workflow</Badge>
          <h2 className="type-heading-2" id="trust-built-title">
            From recommendation to reviewable evidence.
          </h2>
        </Stack>
        <ol className="trust-workflow">
          {trustBuildSteps.map((step, index) => (
            <li className="trust-workflow__item" key={step}>
              <Card className="trust-workflow__card" variant="bordered">
                <span className="trust-workflow__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="trust-workflow__label">{step}</span>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        aria-labelledby="security-overview-title"
        className="trust-section trust-security"
        id="security-overview"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <Badge variant="secondary">Security Overview</Badge>
          <h2 className="type-heading-2" id="security-overview-title">
            Security design objectives
          </h2>
        </Stack>
        <div className="product-card-grid product-card-grid--three">
          {securityOverview.map((item) => (
            <Card
              aria-labelledby={createId('security-overview', item.title)}
              className="trust-doc-card"
              key={item.title}
              variant="bordered"
            >
              <div className="trust-doc-card__heading">
                <Icon className="product-info-card__icon" icon={item.icon} size="lg" />
              </div>
              <h3
                className="product-info-card__title type-heading-4"
                id={createId('security-overview', item.title)}
              >
                {item.title}
              </h3>
              <p className="type-body">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        aria-labelledby="governance-model-trust-title"
        className="trust-section trust-governance"
        id="governance-model-trust"
        tabIndex={-1}
        width="wide"
      >
        <div className="trust-governance__grid">
          <Stack className="trust-governance__content" space="md">
            <Badge variant="secondary">Governance Model</Badge>
            <h2 className="type-heading-2" id="governance-model-trust-title">
              The architecture separates intelligence from authority.
            </h2>
            <p className="type-body-large">
              The design calls for policy review, human approval and outcome verification.
            </p>
            <p className="type-body">
              The public examples illustrate the decision path with fictional requests and sample evidence.
            </p>
          </Stack>
          <ol className="trust-stack" aria-label="Governance stack">
            {governanceStack.map((item, index) => (
              <li className="trust-stack__item" key={item}>
                <span className="trust-stack__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section
        aria-labelledby="ai-boundaries-title"
        className="trust-section trust-boundaries"
        id="ai-boundaries"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="trust-section-header-centered" space="md">
          <Badge variant="secondary">AI Boundaries</Badge>
          <h2 className="type-heading-2" id="ai-boundaries-title">
            Intelligence and authority in the proposed design
          </h2>
          <p className="type-body">The public demonstrations display pre-authored examples.</p>
        </Stack>
        <div className="trust-boundaries__grid">
          <Card className="trust-boundary-card trust-boundary-card--can" variant="bordered">
            <h3 className="type-heading-3">Intended advisory roles</h3>
            <ul className="trust-check-list">
              {aiCanItems.map((item) => (
                <li key={item}>
                  <CircleCheck aria-hidden="true" focusable="false" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card
            className="trust-boundary-card trust-boundary-card--cannot"
            variant="bordered"
          >
            <h3 className="type-heading-3">Authority excluded by design</h3>
            <ul className="trust-check-list">
              {aiCannotItems.map((item) => (
                <li key={item}>
                  <LockKeyhole aria-hidden="true" focusable="false" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        aria-labelledby="current-model-data-flow-title"
        className="trust-section trust-model-data-flow"
        id="current-model-data-flow"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <Badge variant="secondary">Current-state assurance</Badge>
          <h2 className="type-heading-2" id="current-model-data-flow-title">
            Current Model &amp; Data Flow
          </h2>
          <p className="type-body-large">
            The public site currently demonstrates governance with synthetic or fictional
            information. No AI model or AI inference provider runs inside these demonstrations.
          </p>
        </Stack>

        <Stack space="xl">
          <div className="trust-governance__grid">
            <Stack className="trust-governance__content" space="md">
              <Badge variant="success">Current Public Demonstration</Badge>
              <h3 className="type-heading-3">A browser-local governance demonstration</h3>
              <p className="type-body">
                No live courier, banking, social-media, CRM or enterprise system is connected.
                Demo decisions, rationales, approval evidence and replay evidence remain temporary
                browser-local state. Refreshing the page clears those interactive records.
              </p>
              <p className="type-body">
                No demonstration business or case information is sent by application logic to an
                E.T Agent backend, AI provider or operational integration.
              </p>
              <Card variant="bordered">
                <Badge variant="neutral">Browser-local replay boundary</Badge>
                <p className="type-body">
                  {currentReplayFlow.join(' → ')}. The deterministic governance replay runs locally,
                  and SHA-256 replay fingerprinting uses the browser Web Crypto API. Replay does not
                  create approval, create execution authority or cause an external operational action.
                </p>
              </Card>
            </Stack>
            <ol className="trust-stack" aria-label="Current public demonstration flow">
              {currentPublicDemoFlow.map((step, index) => (
                <li className="trust-stack__item" key={step}>
                  <span className="trust-stack__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="product-card-grid product-card-grid--three">
            <Card className="trust-doc-card" variant="bordered">
              <div className="trust-doc-card__heading">
                <Icon className="product-info-card__icon" icon={Globe2} size="lg" />
                <Badge variant="neutral">Current External Boundaries</Badge>
              </div>
              <h3 className="product-info-card__title type-heading-4">
                Ordinary web and contact boundaries
              </h3>
              <p className="type-body">
                The public site is a static React/Vite website deployed to Hostinger. Google Fonts
                causes ordinary browser requests for font resources. The repository link opens GitHub.
              </p>
              <p className="type-body">
                Enterprise contact links use mailto and hand control to the visitor's browser or
                email application. The website does not currently submit enterprise contact
                information through an E.T Agent website form or backend.
              </p>
            </Card>

            <Card className="trust-doc-card" variant="bordered">
              <div className="trust-doc-card__heading">
                <Icon className="product-info-card__icon" icon={LockKeyhole} size="lg" />
                <Badge variant="warning">Not Present Today</Badge>
              </div>
              <h3 className="product-info-card__title type-heading-4">
                Current demonstration boundary
              </h3>
              <ul className="product-list">
                {currentDemoBoundaries.map((boundary) => (
                  <li key={boundary}>{boundary}</li>
                ))}
              </ul>
            </Card>

            <Card className="trust-doc-card" variant="bordered">
              <div className="trust-doc-card__heading">
                <Icon className="product-info-card__icon" icon={ShieldCheck} size="lg" />
                <Badge variant="primary">Future Provider Boundary</Badge>
              </div>
              <h3 className="product-info-card__title type-heading-4">
                Future intelligence remains governed
              </h3>
              <p className="type-body">
                No AI model or provider is integrated into the current public website. Future
                approved model providers may supply intelligence to governed workflows, but
                provider selection does not create execution authority. Any future integration
                remains subject to E.T Agent's policy, approval and execution-gate controls.
              </p>
              <ul className="product-list" aria-label="Future provider authority principles">
                <li>Provider is not Authority.</li>
                <li>Model is not Authority.</li>
                <li>Intelligence is not Authority.</li>
              </ul>
            </Card>
          </div>
        </Stack>
      </Section>

      <Section
        aria-labelledby="compliance-alignment-title"
        className="trust-section trust-compliance"
        id="compliance-alignment"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <Badge variant="secondary">Compliance information</Badge>
          <h2 className="type-heading-2" id="compliance-alignment-title">
            What the public demonstrations cover
          </h2>
          <p className="type-body-large">
            The demonstrations illustrate governance concepts. This website provides no certification,
            attestation or framework-mapping evidence.
          </p>
        </Stack>
      </Section>

      <Section
        aria-labelledby="enterprise-faq-title"
        className="trust-section trust-faq"
        id="enterprise-faq"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <Badge variant="secondary">Enterprise FAQ</Badge>
          <h2 className="type-heading-2" id="enterprise-faq-title">
            Questions procurement and security teams usually ask first.
          </h2>
        </Stack>
        <div className="trust-faq__list">
          {trustFaqs.map((item) => (
            <details className="trust-faq__item" key={item.question}>
              <summary className="trust-faq__question">{item.question}</summary>
              <p className="type-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section
        aria-labelledby="documentation-hub-title"
        className="trust-section trust-documentation"
        id="documentation-hub"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <Badge variant="secondary">Documentation Hub</Badge>
          <h2 className="type-heading-2" id="documentation-hub-title">
            Availability of enterprise evaluation documents
          </h2>
          <p className="type-body-large">
            The documents listed below are unpublished. Email{' '}
            <a href="mailto:ermias@etagent.io">ermias@etagent.io</a>
            to ask about materials for an evaluation.
          </p>
        </Stack>
        <div className="trust-documentation__grid">
          {documentationHub.map((item) => (
            <Card className="trust-doc-link" key={item.title} variant="bordered">
              <div>
                <Icon className="trust-doc-link__icon" icon={FileText} size="md" />
                <h3 className="type-heading-4">{item.title}</h3>
              </div>
              <div className="trust-doc-link__meta">
                <p className="type-body">Public document not published</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        aria-labelledby="trust-cta-title"
        className="trust-cta"
        spacing="compact"
        width="wide"
      >
        <Card className="product-cta__card" variant="bordered">
          <Stack className="product-cta__content" space="md">
            <Badge variant="secondary">Next Steps</Badge>
            <h2 className="type-heading-2" id="trust-cta-title">
              Continue Your Enterprise Evaluation
            </h2>
          </Stack>
          <div className="product-cta__actions" aria-label="Trust Centre next steps">
            <a
              className="ui-button ui-button--primary ui-button--lg"
              href="/product"
            >
              View Product Architecture
            </a>
            <a
              className="ui-button ui-button--outline ui-button--lg"
              href="/#contact"
              onClick={followSectionLink}
            >
              Enterprise contact
            </a>
          </div>
        </Card>
      </Section>
    </PageLayout>
  )
}

function ProductPage() {
  return (
    <PageLayout>
      <Section className="product-hero" id="product" spacing="spacious" width="wide">
        <Stack className="product-hero__content" space="lg">
          <Badge variant="primary">E.T Agent platform concept</Badge>
          <Stack space="md">
            <h1 className="type-display">Architecture for governed AI execution</h1>
            <p className="type-body-large">
              The proposed platform brings planning, policy review and human authority into one
              architecture. The public prototype illustrates these responsibilities with browser-local
              examples. It has no live AI or operational execution service.
            </p>
          </Stack>
          <div className="product-hero__actions" aria-label="Product calls to action">
            <a
              className="ui-button ui-button--primary ui-button--lg"
              href="#platform-overview"
              onClick={followSectionLink}
            >
              Explore Platform Architecture
            </a>
            <a
              className="ui-button ui-button--outline ui-button--lg"
              href="#platform-principles"
              onClick={followSectionLink}
            >
              Explore Governance
            </a>
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
            <Badge variant="secondary">Platform Overview</Badge>
            <h2 className="type-heading-2" id="platform-overview-title">
              Proposed workspaces around a Governance Core.
            </h2>
            <p className="type-body-large">
              The architecture groups intelligence, workflow, audit, administration and future
              integrations around shared governance responsibilities.
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
          <Badge variant="secondary">Platform design principles</Badge>
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
          <Badge variant="secondary">Platform concept</Badge>
          <h2 className="type-heading-2" id="platform-workspaces-title">
            Proposed workspace responsibilities
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
          <Badge variant="secondary">Proposed governance architecture</Badge>
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
        aria-labelledby="product-demo-bridge-title"
        className="product-demo-bridge"
        spacing="compact"
        width="wide"
      >
        <Card className="product-demo-bridge__card" variant="bordered">
          <Stack className="product-demo-bridge__content" space="md">
            <Badge variant="secondary">Interactive Walkthrough</Badge>
            <h2 className="type-heading-2" id="product-demo-bridge-title">
              Explore a fictional governance walkthrough.
            </h2>
            <p className="type-body-large">
              Select a stage to inspect a pre-authored request, policy result, approval example and sample evidence.
            </p>
          </Stack>
          <a
            className="ui-button ui-button--outline ui-button--lg"
            href="/governance-demo"
          >
            Open Interactive Governance
          </a>
        </Card>
      </Section>

      <Section
        aria-labelledby="organisations-title"
        className="product-organisations"
        width="wide"
      >
        <Stack className="product-section-header product-section-header--center" space="md">
          <Badge variant="secondary">Intended audiences</Badge>
          <h2 className="type-heading-2" id="organisations-title">
            Governance needs at different scales of work.
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
          <Badge variant="secondary">Website</Badge>
          <h2 className="type-heading-2" id="platform-evolution-title">
            Published website pages
          </h2>
        </Stack>
        <ol className="product-evolution__list">
          {publishedPages.map((title) => (
            <li className="product-evolution__item" key={title}>
              <span className="product-evolution__title">{title}</span>
              <Badge variant="success">Published</Badge>
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
            <Badge variant="secondary">Next Steps</Badge>
            <h2 className="type-heading-2" id="product-cta-title">
              Discuss the proposed governance architecture.
            </h2>
          </Stack>
          <div className="product-cta__actions" aria-label="Product next steps">
            <a
              className="ui-button ui-button--primary ui-button--lg"
              href="/#contact"
              onClick={followSectionLink}
            >
              Request Architecture Review
            </a>
            <a
              className="ui-button ui-button--outline ui-button--lg"
              href="/trust"
            >
              Explore Trust Centre
            </a>
            <a
              className="ui-button ui-button--ghost ui-button--lg"
              href="/trust#documentation-hub"
              onClick={followSectionLink}
            >
              View document availability
            </a>
          </div>
        </Card>
      </Section>
    </PageLayout>
  )
}

function App() {
  const pathname = window.location.pathname

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? notFoundMetadata
    document.title = metadata.title
    document.querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', metadata.description)

    if (metadata.canonical) {
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = metadata.canonical
      document.head.appendChild(link)
      return () => link.remove()
    }
  }, [pathname])

  if (window.location.pathname === '/trust') {
    return <TrustCentrePage />
  }

  if (window.location.pathname === '/product') {
    return <ProductPage />
  }

  if (window.location.pathname === '/governance-demo') {
    return <InteractiveGovernanceDemoPage />
  }

  if (window.location.pathname === '/demo/delivery-exception-review') {
    return <DeliveryExceptionDemoPage />
  }

  if (window.location.pathname === '/use-cases') {
    return <UseCasesPage />
  }

  if (window.location.pathname === '/demo/fraud-reimbursement-review') {
    return <FraudReimbursementDemoPage />
  }

  if (window.location.pathname === '/demo/command-centre') {
    return <CommandCentreDemoPage />
  }

  if (window.location.pathname === '/privacy-policy') {
    return <PrivacyPolicyPage />
  }

  if (window.location.pathname === '/terms-of-use') {
    return <TermsOfUsePage />
  }

  if (window.location.pathname !== '/') {
    return <NotFoundPage />
  }

  return (
    <PageLayout>
      <Section
        className="homepage-hero"
        id="home"
        spacing="spacious"
        tabIndex={-1}
        width="wide"
      >
        <div className="homepage-hero__grid">
          <Stack className="homepage-hero__content" space="lg">
            <Badge variant="primary">Governance-first enterprise AI</Badge>
            <Stack space="md">
              <h1 className="type-display">
                A governance-first design for enterprise AI.
              </h1>
              <p className="type-body-large">
                AI can reason at speed, but enterprise action requires governance,
                accountability and auditable approval.
              </p>
            </Stack>
            <p className="homepage-hero__positioning type-body">
              In the E.T Agent architecture, AI may propose work. Policy and accountable people
              determine whether a material action should proceed.
            </p>
            <p className="type-body">
              Current stage: prototype and synthetic demonstrations. Explore
              fictional workflows with simulated outcomes. No live business systems
              are connected and no external actions are performed. No AI model or
              inference provider is invoked in the current public demonstrations.
            </p>
            <div className="homepage-hero__actions" aria-label="Hero calls to action">
              <a
                className="ui-button ui-button--primary ui-button--lg"
                href="#contact"
                onClick={followSectionLink}
              >
                Request Architecture Review
              </a>
              <a
                className="ui-button ui-button--outline ui-button--lg"
                href="/demo/command-centre"
              >
                <span>Explore the Command Centre</span>
              </a>
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
              <Badge variant="secondary">Governance workflow preview</Badge>
              <h2 className="type-heading-3" id="workflow-preview-title">
                From request to sample decision record
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
              The diagram places policy review and human approval before the simulated outcome.
            </p>
          </Card>
        </div>
      </Section>

      <SectionNavigation
        ariaLabel="Homepage sections"
        sections={homepageSectionNavigation}
      />

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
        tabIndex={-1}
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
            A governance-first architecture for enterprise AI.
          </h2>
          <p className="type-body-large">
            The architecture gives AI a planning role and reserves material decisions for
            policy review and human approval.
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
          Explore these principles in the synthetic demonstrations.
        </p>
      </Section>

      <Section
        aria-labelledby="how-et-agent-works-title"
        className="homepage-workflow"
        id="how-et-agent-works"
        spacing="default"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="homepage-workflow__header" space="md">
          <Badge variant="secondary">Proposed lifecycle</Badge>
          <h2 className="type-heading-2" id="how-et-agent-works-title">
            From request to review
          </h2>
          <p className="type-body-large">
            The architecture places policy evaluation, impact review and human approval before
            an eligible action. The demos illustrate the sequence with fictional cases.
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
            The governance design requires reviewers to consider the expected impact and
            applicable policy before authorising a material action.
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
          <Badge variant="secondary">Governance questions</Badge>
          <h2 className="type-heading-2" id="governance-by-design-title">
            Governance by Design
          </h2>
          <p className="type-body-large">
            Questions to ask when reviewing an AI workflow.
          </p>
        </Stack>

        <div className="homepage-comparison__columns" aria-hidden="true">
          <p className="type-caption">Evaluation question</p>
          <p className="type-caption">E.T Agent approach</p>
        </div>

        <div className="homepage-comparison__rows">
          {governanceComparisonRows.map((row) => (
            <Card
              aria-label={row.question}
              className="homepage-comparison-row"
              key={row.question}
              variant="bordered"
            >
              <div className="homepage-comparison-row__cell">
                <p className="homepage-comparison-row__label type-caption">
                  Evaluation question
                </p>
                <p className="type-body-large">{row.question}</p>
              </div>
              <div className="homepage-comparison-row__cell">
                <p className="homepage-comparison-row__label type-caption">
                  E.T Agent approach
                </p>
                <p className="type-body-large">{row.answer}</p>
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
        tabIndex={-1}
        width="wide"
      >
        <Stack className="homepage-capabilities__header" space="md">
          <Badge variant="secondary">Enterprise governance principles</Badge>
          <h2 className="type-heading-2" id="core-enterprise-capabilities-title">
            How the proposed architecture assigns authority
          </h2>
          <p className="type-body-large">
            These principles guide the design. The public demonstrations illustrate selected steps with fictional data.
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
        aria-labelledby="enterprise-trust-title"
        className="enterprise-trust"
        id="enterprise-trust"
        spacing="compact"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="enterprise-trust__header" space="md">
          <Badge variant="secondary">Enterprise trust</Badge>
          <h2 className="type-heading-2" id="enterprise-trust-title">
            What reviewers should see before approval
          </h2>
          <p className="type-body-large">
            The design calls for visible policy checks, an accountable reviewer and a reviewable
            outcome. The demos illustrate these with synthetic evidence.
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
        aria-labelledby="interactive-governance-title"
        className="product-demo-bridge"
        id="interactive-governance"
        spacing="compact"
        tabIndex={-1}
        width="wide"
      >
        <Card className="product-demo-bridge__card" variant="bordered">
          <Stack className="product-demo-bridge__content" space="md">
            <Badge variant="secondary">Interactive Governance</Badge>
            <h2 className="type-heading-2" id="interactive-governance-title">
              Explore the governance walkthrough.
            </h2>
            <p className="type-body-large">
              Step through a fictional request, a sample policy result, an illustrative approval
              and a simulated outcome.
            </p>
          </Stack>
          <a
            className="ui-button ui-button--outline ui-button--lg"
            href="/governance-demo"
          >
            Explore Governance
          </a>
        </Card>
      </Section>

      <Section
        aria-labelledby="enterprise-use-cases-title"
        className="product-organisations"
        id="enterprise-use-cases"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="product-section-header product-section-header--center" space="md">
          <Badge variant="secondary">Enterprise use cases</Badge>
          <h2 className="type-heading-2" id="enterprise-use-cases-title">
            Example governance needs for individuals, teams and enterprises.
          </h2>
        </Stack>
        <div className="product-card-grid product-card-grid--three">
          {organisationTypes.map((organisation) => (
            <Card
              aria-labelledby={createId('homepage-use-case', organisation.title)}
              className="product-info-card"
              key={organisation.title}
              variant="bordered"
            >
              <Icon className="product-info-card__icon" icon={organisation.icon} size="lg" />
              <h3
                className="product-info-card__title type-heading-4"
                id={createId('homepage-use-case', organisation.title)}
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
        aria-labelledby="built-for-enterprise-title"
        className="homepage-enterprise"
        id="built-for-enterprise"
        spacing="default"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="homepage-enterprise__header" space="md">
          <Badge variant="secondary">Enterprise design</Badge>
          <h2 className="type-heading-2" id="built-for-enterprise-title">
            Enterprise design principles
          </h2>
          <p className="type-body-large">
            Designed with the operational, security and governance expectations
            of modern organisations in mind.
          </p>
          <p className="homepage-enterprise__intro type-body">
            The architecture sets out how to assign authority and explain decisions.
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

      <Section
        aria-labelledby="homepage-documentation-title"
        className="trust-section trust-documentation"
        id="homepage-documentation"
        tabIndex={-1}
        width="wide"
      >
        <Stack className="product-section-header" space="md">
          <Badge variant="secondary">Documentation</Badge>
          <h2 className="type-heading-2" id="homepage-documentation-title">
            Availability of enterprise evaluation documents
          </h2>
          <p className="type-body-large">
            The documents listed below are unpublished. Email{' '}
            <a href="mailto:ermias@etagent.io">ermias@etagent.io</a>
            to ask about materials for an evaluation.
          </p>
        </Stack>
        <div className="trust-documentation__grid">
          {documentationHub.map((item) => (
            <Card className="trust-doc-link" key={item.title} variant="bordered">
              <div>
                <Icon className="trust-doc-link__icon" icon={FileText} size="md" />
                <h3 className="type-heading-4">{item.title}</h3>
              </div>
              <div className="trust-doc-link__meta">
                <p className="type-body">Public document not published</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        aria-labelledby="contact-title"
        className="product-cta"
        id="contact"
        spacing="compact"
        tabIndex={-1}
        width="wide"
      >
        <Card className="product-cta__card" variant="bordered">
          <Stack className="product-cta__content" space="md">
            <Badge variant="secondary">Enterprise contact</Badge>
            <h2 className="type-heading-2" id="contact-title">
              Contact E.T Agent about an architecture review.
            </h2>
            <p className="type-body-large">
              Email an enquiry, explore the self-guided demonstration or check which evaluation documents are public.
            </p>
          </Stack>
          <div className="enterprise-contact-grid" aria-label="Enterprise contact routes">
            {enterpriseContactRoutes.map((route) => (
              <div className="enterprise-contact-card" key={route.title}>
                <h3 className="type-heading-4">{route.title}</h3>
                <p className="type-body"><a href={route.href}>{route.label}</a></p>
              </div>
            ))}
          </div>
          <div className="product-cta__actions" aria-label="Homepage contact actions">
            <a
              className="ui-button ui-button--primary ui-button--lg"
              href={architectureReviewEmail}
            >
              <span>Request Architecture Review</span>
            </a>
            <a
              className="ui-button ui-button--outline ui-button--lg"
              href="/trust"
            >
              Review Trust Centre
            </a>
          </div>
        </Card>
      </Section>
    </PageLayout>
  )
}

export default App
