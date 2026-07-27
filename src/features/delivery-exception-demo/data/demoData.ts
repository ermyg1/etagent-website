export type EvidenceTone = 'supporting' | 'inconclusive' | 'missing' | 'conflicting'

export type EvidenceItem = {
  id: string
  title: string
  kind: string
  assessment: string
  tone: EvidenceTone
  details: string[]
  limitations?: string[]
  messageThread?: { author: string; time: string; message: string }[]
}

export type RuleAssessment = {
  id: string
  title: string
  text: string
  assessment: string
  tone: 'positive' | 'warning' | 'blocked'
  evidence: string
  reasoning: string
  question: string
}

export const caseDetails = {
  caseReference: 'SYN-EXC-2026-001',
  jobReference: 'SYN-JOB-78421',
  routeReference: 'SYN-ROUTE-BRAVO-07',
  courier: 'Northbridge Courier Services Ltd',
  operationsManager: 'Helen Carter',
  dispatcher: 'Daniel Moore',
  driver: 'Michael Reed',
  customer: 'Riverside Design Studio Ltd',
  deliveryContact: 'Sarah Collins',
  address: 'Unit 14, Riverside Business Court, London, SE8 4ZX',
  service: 'Scheduled same-day delivery',
  exception: 'Customer unavailable / disputed delivery attempt',
  priority: 'Medium',
  opened: '22 July 2026 at 14:32',
  status: 'Awaiting management review',
} as const

export const timeline = [
  ['13:40', 'Driver arrives near the delivery location.'],
  ['13:42', 'First telephone attempt.'],
  ['13:43', 'Second telephone attempt.'],
  ['13:43', 'Driver messages the dispatcher.'],
  ['13:45', 'Driver submits an entrance photograph.'],
  ['13:46', 'Dispatcher tells the driver to wait a few more minutes.'],
  ['13:51', 'Driver reports no response and leaves.'],
  ['14:19', 'Customer disputes that a reasonable delivery attempt occurred.'],
  ['14:32', 'Exception case is opened for management review.'],
] as const

export const evidenceItems: EvidenceItem[] = [
  {
    id: 'E1',
    title: 'GPS arrival record',
    kind: 'Location record',
    assessment: 'Partially supports the driver account',
    tone: 'supporting',
    details: [
      'Arrival: 13:40:38',
      'Departure: 13:51:12',
      'Duration: 10 minutes and 34 seconds',
      'Position: approximately 42 metres from the stated location',
    ],
    limitations: ['Proximity does not prove use of the correct entrance.'],
  },
  {
    id: 'E2',
    title: 'Driver photograph',
    kind: 'Synthetic visual placeholder',
    assessment: 'Inconclusive',
    tone: 'inconclusive',
    details: ['Timestamp: 13:45:06'],
    limitations: [
      'Business name not visible',
      'Buzzer use not demonstrated',
      'Waiting duration not demonstrated',
      'Correct entrance not independently confirmed',
    ],
  },
  {
    id: 'E3',
    title: 'Driver call record',
    kind: 'Masked call metadata',
    assessment: 'Verification required',
    tone: 'conflicting',
    details: [
      'Attempt 1: 13:42:11, duration 6 seconds',
      'Attempt 2: 13:43:27, duration 5 seconds',
      'Called number: •••• ••• 0186',
    ],
    limitations: ['Called number has not been matched to the authorised contact.'],
  },
  {
    id: 'E4',
    title: 'Dispatcher messages',
    kind: 'Message thread',
    assessment: 'Supports the reported sequence',
    tone: 'supporting',
    details: ['Three messages recorded between 13:43 and 13:51.'],
    messageThread: [
      { author: 'Driver', time: '13:43', message: 'No answer from customer and door locked.' },
      {
        author: 'Dispatcher',
        time: '13:46',
        message: 'Wait a few more minutes. If no answer, move to the next job.',
      },
      { author: 'Driver', time: '13:51', message: 'Still no response. Leaving now.' },
    ],
  },
  {
    id: 'E5',
    title: 'Route instructions',
    kind: 'Declared instructions',
    assessment: 'Requirements available for comparison',
    tone: 'supporting',
    details: [
      'Call the customer on arrival',
      'Use the main reception entrance',
      'Do not leave the package unattended',
      'Obtain the recipient’s name and signature',
    ],
  },
  {
    id: 'E6',
    title: 'Customer contact record',
    kind: 'Authorised contact',
    assessment: 'Comparison required',
    tone: 'missing',
    details: ['Authorised telephone number: •••• ••• 7429'],
    limitations: ['The full driver call record is required for a controlled comparison.'],
  },
  {
    id: 'E7',
    title: 'Customer statement',
    kind: 'Submitted statement',
    assessment: 'Conflicts with parts of the driver account',
    tone: 'conflicting',
    details: [
      '“I was inside the office and did not receive any telephone call. The driver did not use the entrance buzzer. I saw no courier at reception. This was an urgent package and I want it delivered again today without an additional charge.”',
    ],
  },
]

export const priorityGaps = [
  'Complete driver call record',
  'Confirmation of the number called',
  'Evidence of buzzer use',
  'Confirmation of the correct entrance',
  'Formal dispatcher exception record',
]

export const materialGaps = [
  ...priorityGaps,
  'Independent reception record',
  'Buzzer or intercom activity record',
  'Original photograph context',
  'Authorised contact match',
  'Structured exception reason at time of event',
]

export const ruleAssessments: RuleAssessment[] = [
  {
    id: 'R1',
    title: 'Proof of arrival',
    text: 'A delivery attempt must include reliable location and time evidence.',
    assessment: 'Partially satisfied',
    tone: 'warning',
    evidence: 'E1 GPS arrival record and E2 driver photograph',
    reasoning: 'The timing is credible, but the correct entrance is not independently confirmed.',
    question: 'Can the GPS position and photograph be matched to the main reception entrance?',
  },
  {
    id: 'R2',
    title: 'Customer contact',
    text: 'For a signature-required delivery, the driver must make at least two reasonable contact attempts using the authorised customer contact details.',
    assessment: 'Not established',
    tone: 'blocked',
    evidence: 'E3 driver call record and E6 customer contact record',
    reasoning: 'Two calls are recorded, but the called number is not verified as the authorised contact.',
    question: 'Which complete telephone number was called for each attempt?',
  },
  {
    id: 'R3',
    title: 'Waiting period',
    text: 'The driver must remain at the delivery location for at least eight minutes after the first contact attempt unless instructed otherwise by the dispatcher.',
    assessment: 'Satisfied',
    tone: 'positive',
    evidence: 'E1 GPS record, E3 call record and E4 dispatcher messages',
    reasoning: 'The recorded interval from the first call to departure exceeds eight minutes.',
    question: 'No material unresolved question identified for the recorded duration.',
  },
  {
    id: 'R4',
    title: 'Access attempt',
    text: 'Where a clearly available reception buzzer, intercom or access method exists, the driver must make a reasonable attempt to use it.',
    assessment: 'Not established',
    tone: 'blocked',
    evidence: 'E2 photograph and E7 customer statement',
    reasoning: 'No available evidence demonstrates use of a buzzer or intercom.',
    question: 'Was the reception buzzer available, and was it used?',
  },
  {
    id: 'R5',
    title: 'Failed-attempt payment',
    text: 'A driver may receive the standard attempted-delivery payment where Rules R1 to R4 are satisfied.',
    assessment: 'Not yet determinable',
    tone: 'warning',
    evidence: 'Assessments for R1 to R4',
    reasoning: 'The prerequisite rules are not all established.',
    question: 'Can the contact and access evidence resolve R2 and R4?',
  },
  {
    id: 'R6',
    title: 'Customer redelivery charge',
    text: 'A customer may only be charged for redelivery when the company can demonstrate that a compliant delivery attempt occurred.',
    assessment: 'Not justified',
    tone: 'blocked',
    evidence: 'Assessments for R1 to R4 and E7 customer statement',
    reasoning: 'A compliant attempt has not been demonstrated.',
    question: 'Can the outstanding evidence establish a compliant delivery attempt?',
  },
  {
    id: 'R7',
    title: 'Financial adjustment',
    text: 'No driver deduction, payment reduction or customer charge may be applied until an Operations Manager reviews the evidence.',
    assessment: 'Human review required',
    tone: 'warning',
    evidence: 'Case status and declared authority',
    reasoning: 'The case is awaiting an Operations Manager’s decision.',
    question: 'What decision will the authorised reviewer record?',
  },
  {
    id: 'R8',
    title: 'Unresolved evidence',
    text: 'Where material evidence is missing or contradictory, the case must be marked unresolved and further evidence must be requested.',
    assessment: 'Applies',
    tone: 'warning',
    evidence: 'Ten material gaps and two contradictions',
    reasoning: 'The available record is materially incomplete and contradictory.',
    question: 'Which evidence requests should be prioritised?',
  },
  {
    id: 'R9',
    title: 'Human authority',
    text: 'AI-generated findings and recommendations are advisory. Final operational and financial decisions must be made by an authorised human.',
    assessment: 'Applies',
    tone: 'warning',
    evidence: 'Declared company governance rule',
    reasoning: 'The recommendation cannot approve or execute an operational or financial action.',
    question: 'Is the reviewer authorised to record this demonstration decision?',
  },
]

export const decisionOptions = [
  'Request more evidence',
  'Accept compliant attempt',
  'Reject compliant attempt',
  'Approve provisional resolution',
  'Escalate case',
] as const

export const confirmations = [
  'I reviewed the available evidence.',
  'I reviewed the relevant company rules.',
  'I understand the customer impact.',
  'I understand the driver-payment impact.',
  'I am authorised to make this demonstration decision.',
  'I understand that E.T Agent has not executed any action.',
] as const

export const demoViews = [
  { id: 'inbox', label: 'Exception Inbox' },
  { id: 'overview', label: 'Case Overview' },
  { id: 'evidence', label: 'Evidence Review' },
  { id: 'policy', label: 'Policy Assessment' },
  { id: 'impact', label: 'Impact Summary' },
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'review', label: 'Human Review' },
  { id: 'record', label: 'Decision Record' },
  { id: 'governance', label: 'Governance Controls' },
] as const

export type DemoViewId = (typeof demoViews)[number]['id']
