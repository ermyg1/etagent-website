export type WorkflowCategory = 'Intelligence' | 'Operational Review'

export type WorkStatus =
  | 'Intelligence prepared'
  | 'Awaiting human decision'
  | 'Governance refresh required'
  | 'Review available'
  | 'Policy blocked'
  | 'Simulated outcome prepared'
  | 'Declined by human reviewer'
  | 'More evidence requested'

export type PolicyResult = 'Passed' | 'Requires human decision' | 'Blocked' | 'Evidence incomplete'

export type PolicyControl = {
  code: string
  name: string
  result: PolicyResult
  explanation: string
}

export type ImpactSummary = {
  reference: string
  proposedAction: string
  intendedPurpose: string
  evidenceUsed: string
  evidenceGaps: string
  privacyImpact: string
  reputationalImpact: string
  externalSystemsAffected: string
  reversibility: string
  authorityRequired: string
  ifApproved: string
  willNotHappen: string
}

export type WorkItem = {
  id: string
  title: string
  category: WorkflowCategory
  status: WorkStatus
  subject: string
  request: string
  objective: string
  scope: string
  sources: string[]
  evidenceStatus: string
  evidenceGaps: string[]
  policies: PolicyControl[]
  impact: ImpactSummary
  recommendation: string
  requiredDecision: string
  simulatedOutcome: string
  relatedHref?: string
}

export type Decision = 'approve' | 'decline' | 'more-evidence'

export type DecisionRecord = {
  id: string
  workItemId: string
  planId: string
  planVersion: number
  planReference: string
  approvalReference: string | 'Not applicable — no approval created'
  timestamp: string
  decision: string
  rationale: string
  policyResults: PolicyControl[]
  impactReference: string
  simulatedOutcome: string
  executionStatus: 'No external execution'
  dataClassification: string
  externalSystemsAffected: string
  limitation: 'Temporary browser-local demonstration record'
}

export type AuthoritativePlan = {
  id: string
  workItemId: 'SYN-CMD-001'
  version: 1 | 2
  reference: string
  policyReference: string
  impactReference: string
  communicationScope: string
  proposedAction: string
}

export type ApprovalEvidence = {
  reference: string
  timestamp: string
  boundPlanId: string
  boundPlanVersion: number
  boundPlanReference: string
  status: 'VALID — CURRENT PLAN' | 'INVALIDATED'
  reasonCode?: 'APPROVAL_INVALIDATED_PLAN_CHANGED'
}

export type ApprovalInvalidationRecord = {
  id: string
  timestamp: string
  previousPlanId: string
  previousPlanVersion: number
  previousPlanReference: string
  newPlanId: string
  newPlanVersion: number
  newPlanReference: string
  previousApprovalReference: string
  previousApprovalState: 'VALID — CURRENT PLAN'
  resultingApprovalState: 'INVALIDATED'
  reasonCode: 'APPROVAL_INVALIDATED_PLAN_CHANGED'
  resultingExecutionAuthority: 'NONE'
  externalAction: 'No external action occurred'
}

export type QueueFilter =
  | 'All'
  | 'Intelligence'
  | 'Operational Review'
  | 'Awaiting Approval'
  | 'Policy Blocked'
