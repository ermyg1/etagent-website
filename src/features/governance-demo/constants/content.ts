import {
  Brain,
  ClipboardCheck,
  FileCheck,
  FileText,
  GitBranch,
  Gauge,
  ListChecks,
  PlayCircle,
  Route,
  ScrollText,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'
import type { GovernanceDemoView } from '../components/GovernanceViewToggle'

export type GovernanceDocumentationCard = {
  body: string
  icon: LucideIcon
  id: string
  title: string
}

export type GovernanceWorkspaceRegion = {
  body: string
  icon: LucideIcon
  id: string
  title: string
}

export type GovernanceWalkthroughStage = {
  answer: string
  authority: string
  evidence: string[]
  icon: LucideIcon
  id: string
  outcome: string
  question: string
  title: string
}

export const governanceDocumentation: Record<
  GovernanceDemoView,
  {
    cards: GovernanceDocumentationCard[]
    label: string
    panelId: string
  }
> = {
  business: {
    label: 'Business View',
    panelId: 'governance-demo-business-panel',
    cards: [
      {
        body: 'The walkthrough shows a fictional customer account update passing through review.',
        icon: FileText,
        id: 'business-action',
        title: 'What happens?',
      },
      {
        body: 'Each stage shows the policy, approval or evidence a reviewer would consider.',
        icon: ShieldCheck,
        id: 'business-governance',
        title: 'Why governance matters',
      },
      {
        body: 'The example shows how a decision owner could review intent and impact before authorising a change.',
        icon: UserCheck,
        id: 'business-outcome',
        title: 'Expected business outcome',
      },
    ],
  },
  technical: {
    label: 'Technical View',
    panelId: 'governance-demo-technical-panel',
    cards: [
      {
        body: 'Each stage displays a pre-authored explanation of one governance responsibility.',
        icon: GitBranch,
        id: 'technical-architecture',
        title: 'Architecture',
      },
      {
        body: 'The pipeline connects request, decision explanation, approval and audit stages into a reviewable governance path.',
        icon: Route,
        id: 'technical-pipeline',
        title: 'Pipeline',
      },
      {
        body: 'Policy handling is represented as a governed evaluation layer for explaining how execution authority is constrained.',
        icon: ListChecks,
        id: 'technical-policy-layer',
        title: 'Policy Layer',
      },
      {
        body: 'The audit stage displays sample evidence fields for this fictional request.',
        icon: ClipboardCheck,
        id: 'technical-audit-layer',
        title: 'Audit Layer',
      },
      {
        body: 'Selecting a stage changes the explanation on screen. The walkthrough performs no operational action.',
        icon: FileCheck,
        id: 'technical-execution-layer',
        title: 'Execution Layer',
      },
    ],
  },
}

export const governanceWorkspaceRegions: GovernanceWorkspaceRegion[] = [
  {
    body: 'Scenario selection and request framing will be introduced in the next milestone.',
    icon: FileText,
    id: 'scenario',
    title: 'Scenario',
  },
  {
    body: 'The governed decision pipeline will be connected after the structural foundation is complete.',
    icon: Route,
    id: 'pipeline',
    title: 'Pipeline',
  },
  {
    body: 'Decision status, routing and outcome logic are reserved for P4B.2.',
    icon: ShieldCheck,
    id: 'decision',
    title: 'Decision',
  },
  {
    body: 'Human-readable decision context will be added after the placeholder shell is approved.',
    icon: ScrollText,
    id: 'explanation',
    title: 'Explanation',
  },
  {
    body: 'Approval workflow controls are not implemented in this milestone.',
    icon: UserCheck,
    id: 'approval',
    title: 'Approval',
  },
  {
    body: 'Audit artefact generation and replay evidence will be implemented later.',
    icon: ClipboardCheck,
    id: 'audit',
    title: 'Audit',
  },
]

export const governanceWalkthroughStages: GovernanceWalkthroughStage[] = [
  {
    answer:
      'A business user asks E.T Agent to prepare a customer account update and route it through governed review.',
    authority: 'Fictional request',
    evidence: ['Requester identity', 'Business intent', 'Requested capability'],
    icon: FileText,
    id: 'request',
    outcome: 'The example starts with a predefined request.',
    question: 'What was asked?',
    title: 'Request',
  },
  {
    answer:
      'The example displays a pre-authored analysis of the request and a proposal for review.',
    authority: 'Advisory role in the design',
    evidence: ['Structured intent', 'Proposed steps', 'Required context'],
    icon: Brain,
    id: 'ai-analysis',
    outcome: 'Intelligence supports the workflow without receiving authority to act.',
    question: 'What would AI contribute?',
    title: 'Example AI analysis',
  },
  {
    answer:
      'This stage displays the example policy result and the boundaries that would apply to the request.',
    authority: 'Policy comes before power',
    evidence: ['Role boundary', 'Capability boundary', 'Approval requirement'],
    icon: ShieldCheck,
    id: 'policy-review',
    outcome: 'The architecture reserves approval for a person.',
    question: "Why can't AI act alone?",
    title: 'Policy Review',
  },
  {
    answer:
      'This stage illustrates the impact information a reviewer would need before approving a change.',
    authority: 'Impact visible before approval',
    evidence: ['Affected record', 'Proposed change', 'Risk note'],
    icon: Gauge,
    id: 'impact-summary',
    outcome: 'The reviewer sees what could happen before deciding.',
    question: 'What could happen?',
    title: 'Impact Summary',
  },
  {
    answer:
      'This stage illustrates the decision an authorised reviewer would make.',
    authority: 'Human authority required',
    evidence: ['Approver role', 'Decision timestamp', 'Approval status'],
    icon: UserCheck,
    id: 'human-approval',
    outcome: 'Accountability remains with the person and organisation.',
    question: 'Who decides?',
    title: 'Illustrative human approval',
  },
  {
    answer:
      'The approved action is represented as a controlled simulation in this governed workflow explorer.',
    authority: 'Execution is simulated here',
    evidence: ['Approved plan', 'Bounded capability', 'Simulated result'],
    icon: PlayCircle,
    id: 'simulated-execution',
    outcome: 'This page demonstrates governance only; it does not perform real execution.',
    question: 'What happens next?',
    title: 'Simulated Execution',
  },
  {
    answer:
      'This stage displays sample fields for a decision record.',
    authority: 'Sample evidence fields',
    evidence: ['Request trail', 'Decision trail', 'Outcome trail'],
    icon: ClipboardCheck,
    id: 'audit-record',
    outcome: 'The fields describe the request, decision and simulated outcome a reviewer would inspect.',
    question: 'What could a reviewer inspect?',
    title: 'Example audit record',
  },
  {
    answer:
      'The illustrated sequence places human review before a simulated outcome.',
    authority: 'Governance before execution',
    evidence: [
      'Example request',
      'Illustrative approval',
      'Sample record',
    ],
    icon: FileCheck,
    id: 'outcome',
    outcome: 'The visitor can revisit each stage to inspect the example.',
    question: 'What does the example show?',
    title: 'Outcome',
  },
]
