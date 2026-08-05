import type { QueueCase } from '../types'

export const cases: readonly QueueCase[] = Object.freeze([
  {
    id: 'SYN-APP-2026-001',
    type: 'Investment scam',
    amount: '£24,750',
    priority: 'High',
    evidence: 'Incomplete',
    readiness: 'Specialist review',
    detail: 'Full review available',
  },
  {
    id: 'SYN-APP-2026-002',
    type: 'Purchase scam',
    amount: '£1,280',
    priority: 'Medium',
    evidence: 'Awaiting third party',
    readiness: 'Not ready',
    detail: 'Queue example — details unavailable',
  },
  {
    id: 'SYN-APP-2026-003',
    type: 'Impersonation scam',
    amount: '£8,600',
    priority: 'High',
    evidence: 'Complete',
    readiness: 'Human decision',
    detail: 'Queue example — details unavailable',
  },
  {
    id: 'SYN-APP-2026-004',
    type: 'Romance scam',
    amount: '£14,200',
    priority: 'Medium',
    evidence: 'Incomplete',
    readiness: 'Specialist review',
    detail: 'Queue example — details unavailable',
  },
  {
    id: 'SYN-APP-2026-005',
    type: 'Suspected civil dispute',
    amount: '£3,450',
    priority: 'Low',
    evidence: 'Complete',
    readiness: 'Policy review',
    detail: 'Queue example — details unavailable',
  },
])

export const queueMetrics = Object.freeze({
  open: cases.length,
  evidenceOutstanding: cases.filter(
    ({ evidence }) => evidence === 'Incomplete' || evidence === 'Awaiting third party',
  ).length,
  humanDecision: cases.filter(({ readiness }) => readiness === 'Human decision').length,
  highPriority: cases.filter(({ priority }) => priority === 'High').length,
})
