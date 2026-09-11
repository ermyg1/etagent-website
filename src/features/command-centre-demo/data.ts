import type { AuthoritativePlan, GovernanceReplayInput, GovernanceReplayResult, WorkItem } from './types'

const noExecutionImpact = {
  externalSystemsAffected: 'None',
  reversibility: 'Fully reversible browser-local demonstration state',
  authorityRequired: 'An authorised human reviewer',
  willNotHappen:
    'No message will be sent, no platform will be accessed, no data will be exported, no account will change, no API will be triggered and no external record will be created.',
}

export const initialWorkItems: WorkItem[] = [
  {
    id: 'SYN-CMD-001',
    title: 'Creator and Public Presence Intelligence',
    category: 'Intelligence',
    status: 'Awaiting human decision',
    subject: 'Mara Vale — fictional individual creator',
    request: 'Assess synthetic public-presence signals for a possible fictional partnership.',
    objective: 'Prepare a bounded partnership-suitability brief for human review.',
    scope:
      'Authorised public or customer-provided business information only. Future legitimate use would remain within that boundary.',
    sources: ['YouTube', 'TikTok', 'Instagram', 'X', 'Telegram public channel', 'Public website'],
    evidenceStatus: 'Synthetic evidence organised; material gaps remain visible.',
    evidenceGaps: [
      'No independently verified audience demographics',
      'No verified campaign-performance history',
      'No confirmation that the public business contact remains current',
    ],
    policies: [
      { code: 'DATA-01', name: 'Authorised data scope', result: 'Passed', explanation: 'Only fictional public-presence and business-context fields are represented.' },
      { code: 'PRIV-01', name: 'Privacy and data minimisation', result: 'Passed', explanation: 'No private contact, sensitive trait, identity inference or location data is included.' },
      { code: 'EVID-01', name: 'Evidence integrity and provenance', result: 'Evidence incomplete', explanation: 'Signals are synthetic and audience and performance claims remain unverified.' },
      { code: 'OUTR-01', name: 'Outreach authority', result: 'Requires human decision', explanation: 'Only preparation of a draft outreach brief can be authorised; no outreach can occur.' },
      { code: 'APRV-01', name: 'Mandatory human approval', result: 'Requires human decision', explanation: 'The proposed simulated preparation stops for an authorised reviewer.' },
      { code: 'EXEC-01', name: 'No external execution', result: 'Passed', explanation: 'The browser-local workflow has no external execution capability.' },
    ],
    impact: {
      reference: 'IMP-SYN-CMD-001-A',
      proposedAction: 'Prepare a simulated draft outreach brief for review only.',
      intendedPurpose: 'Help a human assess whether a fictional partnership warrants further consideration.',
      evidenceUsed: 'Synthetic public-presence summaries across six represented public channels.',
      evidenceGaps: 'Audience demographics, campaign performance and contact currency are not verified.',
      privacyImpact: 'Low within this demonstration; fictional, minimised public-business fields only.',
      reputationalImpact: 'A poor fit assessment could mischaracterise the fictional subject; human judgement remains required.',
      ...noExecutionImpact,
      ifApproved: 'A simulated, browser-local draft-preparation outcome and Decision Record will appear.',
    },
    recommendation: 'Prepare a partnership brief for human review.',
    requiredDecision: 'Authorise preparation of a simulated draft outreach brief only.',
    simulatedOutcome: 'Draft outreach brief marked prepared for internal human review; nothing sent.',
  },
  {
    id: 'SYN-CMD-002',
    title: 'Delivery Exception Review',
    category: 'Operational Review',
    status: 'Review available',
    subject: 'Northbridge Parcel Services — fictional organisation',
    request: 'Review a represented delivery exception through the existing governed demonstration.',
    objective: 'Present evidence, policy and human authority without operational execution.',
    scope: 'Synthetic delivery evidence in the existing bounded demonstration.',
    sources: ['Synthetic delivery record', 'Synthetic scan history', 'Synthetic customer statement'],
    evidenceStatus: 'Available in the dedicated demonstration.',
    evidenceGaps: ['See the dedicated workflow for case-level evidence gaps.'],
    policies: [{ code: 'EXEC-01', name: 'No external execution', result: 'Passed', explanation: 'No courier system is connected.' }],
    impact: { reference: 'IMP-SYN-CMD-002-A', proposedAction: 'Open the dedicated governed review.', intendedPurpose: 'Inspect the represented delivery exception.', evidenceUsed: 'Dedicated synthetic workflow evidence.', evidenceGaps: 'Shown in the dedicated workflow.', privacyImpact: 'Fictional records only.', reputationalImpact: 'No external effect.', ...noExecutionImpact, ifApproved: 'No Command Centre action is performed.' },
    recommendation: 'Open the dedicated governed review.',
    requiredDecision: 'Use the dedicated workflow for any represented decision.',
    simulatedOutcome: 'No outcome is created in the Command Centre.',
    relatedHref: '/demo/delivery-exception-review',
  },
  {
    id: 'SYN-CMD-003',
    title: 'Fraud Reimbursement Review',
    category: 'Operational Review',
    status: 'Review available',
    subject: 'Alder Bank — fictional organisation',
    request: 'Review a represented reimbursement case through the existing governed demonstration.',
    objective: 'Present advisory analysis and human authority without banking execution.',
    scope: 'Fictional banking evidence in the existing bounded demonstration.',
    sources: ['Synthetic payment record', 'Synthetic customer circumstances', 'Synthetic policy evidence'],
    evidenceStatus: 'Available in the dedicated demonstration.',
    evidenceGaps: ['See the dedicated workflow for case-level evidence gaps.'],
    policies: [{ code: 'EXEC-01', name: 'No external execution', result: 'Passed', explanation: 'No bank account or banking system is connected.' }],
    impact: { reference: 'IMP-SYN-CMD-003-A', proposedAction: 'Open the dedicated governed review.', intendedPurpose: 'Inspect the represented reimbursement case.', evidenceUsed: 'Dedicated synthetic workflow evidence.', evidenceGaps: 'Shown in the dedicated workflow.', privacyImpact: 'Fictional records only.', reputationalImpact: 'No external effect.', ...noExecutionImpact, ifApproved: 'No Command Centre action is performed.' },
    recommendation: 'Open the dedicated governed review.',
    requiredDecision: 'Use the dedicated workflow for any represented decision.',
    simulatedOutcome: 'No outcome is created in the Command Centre.',
    relatedHref: '/demo/fraud-reimbursement-review',
  },
  {
    id: 'SYN-CMD-004',
    title: 'Bulk Creator Outreach',
    category: 'Intelligence',
    status: 'Policy blocked',
    subject: 'Fictional creator cohort',
    request: 'Contact multiple creators automatically.',
    objective: 'Assess whether bulk outreach is permitted.',
    scope: 'Request evaluation only; no contact data or execution capability.',
    sources: ['Fictional request statement'],
    evidenceStatus: 'Insufficient and outside authorised capability.',
    evidenceGaps: ['No messaging authority', 'No individual human approval', 'No authorised contact basis'],
    policies: [
      { code: 'DATA-01', name: 'Authorised data scope', result: 'Blocked', explanation: 'Private personal information and mass contact collection are not permitted.' },
      { code: 'OUTR-01', name: 'Outreach authority', result: 'Blocked', explanation: 'The Command Centre cannot perform bulk outreach and has no messaging authority.' },
      { code: 'APRV-01', name: 'Mandatory human approval', result: 'Blocked', explanation: 'Individual human approval is absent and cannot be bypassed.' },
      { code: 'EXEC-01', name: 'No external execution', result: 'Blocked', explanation: 'No live platform integration or external execution capability exists.' },
    ],
    impact: { reference: 'IMP-SYN-CMD-004-A', proposedAction: 'Automatically contact multiple creators.', intendedPurpose: 'Bulk partnership outreach.', evidenceUsed: 'Fictional request statement only.', evidenceGaps: 'Authority, lawful data basis and individual review are absent.', privacyImpact: 'Unacceptable: the request could require unauthorised personal information.', reputationalImpact: 'Unsolicited bulk contact could harm recipients and the requesting organisation.', ...noExecutionImpact, authorityRequired: 'Not approvable in this demonstration', ifApproved: 'Approval is unavailable; the request remains blocked.' },
    recommendation: 'Do not proceed. Reformulate as individual, evidence-bounded planning for human review.',
    requiredDecision: 'None — policy block is fail-closed and cannot be bypassed.',
    simulatedOutcome: 'Blocked with no external action.',
  },
]

export const intelligenceSignals = [
  { platform: 'YouTube', source: 'Represented public channel', classification: 'Synthetic evidence', confidence: 'Moderate — internally consistent, not verified', themes: 'Practical design education; studio process', audience: 'Fictional indicators suggest relevance to design learners', engagement: 'Synthetic comments indicate tutorial questions; volume not verified', contact: 'No public business contact represented' },
  { platform: 'TikTok', source: 'Represented public profile', classification: 'Synthetic evidence', confidence: 'Limited — short observation window', themes: 'Short creative tutorials', audience: 'Fictional indicators suggest early-career creatives', engagement: 'Synthetic repeat-view pattern represented; significance unresolved', contact: 'Not available' },
  { platform: 'Instagram', source: 'Represented public profile', classification: 'Synthetic evidence', confidence: 'Moderate — synthetic cross-channel consistency', themes: 'Portfolio excerpts; process notes', audience: 'Fictional indicators suggest visual-design interest', engagement: 'Synthetic saves and replies suggest process-content interest; not verified', contact: 'Public business email represented: partnerships@maravale.test' },
  { platform: 'X', source: 'Represented public profile', classification: 'Synthetic evidence', confidence: 'Limited — sparse synthetic activity', themes: 'Industry commentary', audience: 'Audience relevance unresolved', engagement: 'Insufficient synthetic activity for a reliable assessment', contact: 'Not available' },
  { platform: 'Telegram public channel', source: 'Represented public channel', classification: 'Synthetic evidence', confidence: 'Limited — provenance not independently verified', themes: 'Resource round-ups', audience: 'Fictional indicators suggest practitioner interest', engagement: 'No reliable interaction indicators represented', contact: 'Not available' },
  { platform: 'Public website', source: 'Represented public website', classification: 'Synthetic evidence', confidence: 'Moderate — business context represented', themes: 'Portfolio and collaboration overview', audience: 'Business relevance requires human judgement', engagement: 'No visitor or conversion data represented', contact: 'Public business email represented: partnerships@maravale.test' },
] as const

export const fictionalDecisionTimestamp = '18 February 2026, 14:30 UTC (fictional)'
export const fictionalInvalidationTimestamp = '18 February 2026, 14:34 UTC (fictional)'
export const fictionalSecondDecisionTimestamp = '18 February 2026, 14:38 UTC (fictional)'

export const planV1 = {
  id: 'SYN-PLAN-CMD-001',
  workItemId: 'SYN-CMD-001',
  version: 1,
  reference: 'PLAN-REF-SYN-CMD-001-V1-COMMS-INTERNAL',
  policyReference: 'POL-SYN-CMD-001-A',
  impactReference: 'IMP-SYN-CMD-001-A',
  communicationScope: 'Internal partnership-team review only',
  proposedAction: 'Prepare a simulated draft outreach brief for internal human review only.',
} as const satisfies AuthoritativePlan

export const planV2 = {
  id: 'SYN-PLAN-CMD-001',
  workItemId: 'SYN-CMD-001',
  version: 2,
  reference: 'PLAN-REF-SYN-CMD-001-V2-COMMS-AGENCY',
  policyReference: 'POL-SYN-CMD-001-A',
  impactReference: 'IMP-SYN-CMD-001-B',
  communicationScope: 'Internal partnership team plus fictional external-agency review',
  proposedAction: 'Prepare a simulated draft outreach brief for internal and fictional external-agency review.',
} as const satisfies AuthoritativePlan

export const planV2PreApprovalCheckpoint = {
  reference: 'SYN-GOV-CMD-001-V2-PREAPPROVAL',
  state: 'Policy and impact established for Plan v2; fresh human decision not yet recorded',
  decisionRecordAtReplayTime: 'NONE',
} as const

export const planV2ReplayInput: GovernanceReplayInput = {
  scenarioReference: planV2.workItemId,
  plan: { ...planV2 },
  materialChange: {
    field: 'communicationScope',
    previousPlanVersion: planV1.version,
    previousValue: planV1.communicationScope,
    authoritativeValue: planV2.communicationScope,
    classification: 'MATERIAL',
  },
  policyInput: {
    reference: planV2.policyReference,
    establishedForPlanVersion: planV2.version,
    controls: initialWorkItems[0].policies.map(({ code, result }) => ({ code, result })),
  },
  impactInput: {
    reference: planV2.impactReference,
    establishedForPlanVersion: planV2.version,
    externalSystemsAffected: initialWorkItems[0].impact.externalSystemsAffected,
  },
  capabilityClassification: initialWorkItems[0].category,
  executionMode: 'SIMULATED',
  freshHumanApprovalPresent: false,
  externalExecutionAvailable: false,
}

export const recordedPlanV2GovernanceResult: GovernanceReplayResult = {
  policyEvaluation: 'ESTABLISHED FOR PLAN V2',
  impactAssessment: 'ESTABLISHED FOR PLAN V2',
  humanApprovalRequirement: 'REQUIRED',
  executionAuthority: 'NONE',
  simulatedGovernanceOutcome: 'BLOCKED PENDING GOVERNANCE',
  externalAction: 'NONE',
}

export const replayComparisonLabels = {
  policyEvaluation: 'Policy evaluation',
  impactAssessment: 'Impact assessment',
  humanApprovalRequirement: 'Human approval requirement',
  executionAuthority: 'Execution authority',
  simulatedGovernanceOutcome: 'Simulated governance outcome',
  externalAction: 'External action',
} as const satisfies Record<keyof GovernanceReplayResult, string>

export function canonicalizeReplayInput(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(canonicalizeReplayInput).join(',')}]`

  const object = value as Record<string, unknown>
  return `{${Object.keys(object).sort().map((key) => `${JSON.stringify(key)}:${canonicalizeReplayInput(object[key])}`).join(',')}}`
}

export function evaluateGovernanceReplay(input: GovernanceReplayInput): GovernanceReplayResult {
  const planIsAuthoritative = input.scenarioReference === input.plan.workItemId
    && input.materialChange.authoritativeValue === input.plan.communicationScope
    && input.materialChange.classification === 'MATERIAL'
  const policyIsEstablished = planIsAuthoritative
    && input.policyInput.reference === input.plan.policyReference
    && input.policyInput.establishedForPlanVersion === input.plan.version
  const impactIsEstablished = planIsAuthoritative
    && input.impactInput.reference === input.plan.impactReference
    && input.impactInput.establishedForPlanVersion === input.plan.version
  const approvalControlRequiresHuman = input.policyInput.controls.some(
    (control) => control.code === 'APRV-01' && control.result === 'Requires human decision',
  )
  const humanApprovalIsRequired = approvalControlRequiresHuman && !input.freshHumanApprovalPresent
  const executionIsContained = input.executionMode === 'SIMULATED'
    && !input.externalExecutionAvailable
    && !input.freshHumanApprovalPresent

  return {
    policyEvaluation: policyIsEstablished ? `ESTABLISHED FOR PLAN V${input.plan.version}` : 'REFRESH REQUIRED',
    impactAssessment: impactIsEstablished ? `ESTABLISHED FOR PLAN V${input.plan.version}` : 'REFRESH REQUIRED',
    humanApprovalRequirement: humanApprovalIsRequired ? 'REQUIRED' : 'NOT ESTABLISHED — FAIL CLOSED',
    executionAuthority: executionIsContained ? 'NONE' : 'NONE — FAIL CLOSED',
    simulatedGovernanceOutcome: policyIsEstablished && impactIsEstablished && humanApprovalIsRequired && executionIsContained
      ? 'BLOCKED PENDING GOVERNANCE'
      : 'BLOCKED — REPLAY INPUTS NOT ESTABLISHED',
    externalAction: executionIsContained && input.impactInput.externalSystemsAffected === 'None'
      ? 'NONE'
      : 'NONE — FAIL CLOSED',
  }
}

export const pipeline = [
  ['Request', 'Defined fictional request received'],
  ['Evidence', 'Synthetic sources organised'],
  ['Intelligence', 'Assessment prepared'],
  ['Policy', 'Named controls applied'],
  ['Impact Summary', 'Effects and gaps disclosed'],
  ['Human Decision', 'Authority remains with a reviewer'],
  ['Simulated Outcome', 'Browser-local result only'],
  ['Audit Record', 'Temporary factual record created'],
] as const
