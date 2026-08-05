export type DemoViewId =
  | 'inbox'
  | 'overview'
  | 'evidence'
  | 'timeline'
  | 'policy'
  | 'circumstances'
  | 'impact'
  | 'recommendation'
  | 'review'
  | 'record'
  | 'governance'

export type EvidenceProvenance =
  | 'BANK_SYSTEM'
  | 'CUSTOMER'
  | 'THIRD_PARTY'
  | 'INVESTIGATOR'
  | 'DERIVED'

export type EvidenceClassification =
  | 'VERIFIED_FACT'
  | 'CUSTOMER_REPORTED_CLAIM'
  | 'THIRD_PARTY_EVIDENCE'
  | 'INVESTIGATOR_NOTE'
  | 'SUPPORTED_INFERENCE'
  | 'CONTRADICTION'
  | 'MISSING_EVIDENCE'
  | 'UNRESOLVED_QUESTION'

export type PolicyState =
  | 'Satisfied'
  | 'Not satisfied'
  | 'Not applicable'
  | 'Unresolved'
  | 'Specialist review required'
  | 'Blocked'

export type QueueCase = {
  id: string
  type: string
  amount: string
  priority: 'High' | 'Medium' | 'Low'
  evidence: 'Incomplete' | 'Awaiting third party' | 'Complete'
  readiness: 'Specialist review' | 'Not ready' | 'Human decision' | 'Policy review'
  detail: 'Full review available' | 'Queue example — details unavailable'
}

export type EvidenceItem = {
  id: string
  title: string
  content: string
  provenance: EvidenceProvenance
  classification: EvidenceClassification
  sourceDescription: string
  limitations: string
  references: string[]
}

export type PolicyRule = {
  id: string
  title: string
  state: PolicyState
  basis: string
  rationale: string
  question: string | null
}

export type HumanDecision = 'ACCEPTED' | 'AMENDED' | 'REJECTED'

export type HumanReviewDraft = {
  outcome: HumanDecision | null
  rationale: string
  amendment: string
  confirmations: boolean[]
  unresolvedRiskAcknowledged: boolean
}

export type DecisionRecordData = Record<string, unknown> & {
  record_id: string
  recorded_at: string
  execution_status: 'No external action executed'
}
