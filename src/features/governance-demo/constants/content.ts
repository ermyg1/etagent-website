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
        body: 'A proposed AI action is presented as a governed decision path rather than an automatic execution.',
        icon: FileText,
        id: 'business-action',
        title: 'What happens?',
      },
      {
        body: 'Policy checks, approval boundaries and audit evidence remain visible before operational authority is released.',
        icon: ShieldCheck,
        id: 'business-governance',
        title: 'Why governance matters',
      },
      {
        body: 'Decision owners can review intent, impact and evidence before approving or blocking execution.',
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
        body: 'The explorer separates scenario input, policy evaluation, approval and evidence regions into distinct governance responsibilities.',
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
        body: 'Audit output is reserved for a later milestone and is currently shown as a structural region only.',
        icon: ClipboardCheck,
        id: 'technical-audit-layer',
        title: 'Audit Layer',
      },
      {
        body: 'Execution remains intentionally absent from this foundation. The page does not trigger operational behaviour.',
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
    authority: 'Request captured before action',
    evidence: ['Requester identity', 'Business intent', 'Requested capability'],
    icon: FileText,
    id: 'request',
    outcome: 'The work begins as a recorded request, not an autonomous action.',
    question: 'What was asked?',
    title: 'Request',
  },
  {
    answer:
      'AI structures the request, identifies the likely work required and prepares a proposal for review.',
    authority: 'AI can analyse but cannot execute',
    evidence: ['Structured intent', 'Proposed steps', 'Required context'],
    icon: Brain,
    id: 'ai-analysis',
    outcome: 'Intelligence supports the workflow without receiving authority to act.',
    question: 'What does AI do?',
    title: 'AI Analysis',
  },
  {
    answer:
      'The proposed action is checked against governance boundaries before any operational authority is released.',
    authority: 'Policy comes before power',
    evidence: ['Role boundary', 'Capability boundary', 'Approval requirement'],
    icon: ShieldCheck,
    id: 'policy-review',
    outcome: 'AI cannot bypass policy, approve itself or escalate privileges.',
    question: "Why can't AI act alone?",
    title: 'Policy Review',
  },
  {
    answer:
      'The workflow explains the expected business impact so an accountable person can review the consequences.',
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
      'An authorised human decides whether the proposed action should proceed, change or stop.',
    authority: 'Human authority required',
    evidence: ['Approver role', 'Decision timestamp', 'Approval status'],
    icon: UserCheck,
    id: 'human-approval',
    outcome: 'Accountability remains with the person and organisation.',
    question: 'Who decides?',
    title: 'Human Approval',
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
      'The request, policy review, approval and simulated outcome are preserved as a reviewable record.',
    authority: 'Audit evidence recorded',
    evidence: ['Request trail', 'Decision trail', 'Outcome trail'],
    icon: ClipboardCheck,
    id: 'audit-record',
    outcome: 'The workflow can be reviewed because accountability is built in from the start.',
    question: 'How is accountability preserved?',
    title: 'Audit Record',
  },
  {
    answer:
      'E.T Agent is different because governance happens before execution and human authority remains visible.',
    authority: 'Governance before execution',
    evidence: [
      'Request governed',
      'Human approved',
      'Audit recorded',
    ],
    icon: FileCheck,
    id: 'outcome',
    outcome: 'The result is governed AI: transparent, auditable and trusted by design.',
    question: 'Why is E.T Agent different?',
    title: 'Outcome',
  },
]
