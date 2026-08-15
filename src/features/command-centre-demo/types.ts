export type WorkflowCategory = 'Intelligence' | 'Operational Review'

export type WorkStatus =
  | 'Intelligence prepared'
  | 'Awaiting human decision'
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

export type QueueFilter =
  | 'All'
  | 'Intelligence'
  | 'Operational Review'
  | 'Awaiting Approval'
  | 'Policy Blocked'
