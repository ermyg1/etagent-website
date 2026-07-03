import {
  ClipboardCheck,
  FileCheck,
  FileText,
  GitBranch,
  ListChecks,
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
        body: 'Decision owners can review intent, impact and evidence before approving or blocking future execution.',
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
        body: 'The demo shell separates scenario input, policy evaluation, approval and evidence regions for later implementation.',
        icon: GitBranch,
        id: 'technical-architecture',
        title: 'Architecture',
      },
      {
        body: 'Future milestones will connect request, pipeline, decision, explanation, approval and audit stages.',
        icon: Route,
        id: 'technical-pipeline',
        title: 'Pipeline',
      },
      {
        body: 'Policy handling is represented as a placeholder only. No rules, risk scoring or evaluation are implemented.',
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
