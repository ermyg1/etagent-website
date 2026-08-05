export const recommendation =
  'Escalate for customer-circumstance review and request specified evidence.'

const recommendationDetails = [
  ['Supporting evidence', 'SYS-001 to SYS-012; CUS-001 to CUS-006; THR-001 to THR-004; INV-001 to INV-004'],
  ['Conflicting evidence', 'CON-001 to CON-005'],
  ['Policy basis', 'SCOPE-04, CAUTION-01, VULN-01, EVID-01, TIME-02'],
  ['Missing evidence', 'MIS-001 to MIS-007'],
  ['Unresolved questions', 'UNQ-001 to UNQ-004'],
  [
    'Customer impact',
    'Material claimed loss and circumstances require an accessible specialist assessment.',
  ],
  ['Required human authority', 'Senior Fraud Reimbursement Reviewer'],
  [
    'Blocked actions',
    'All banking, payment, communication, reporting and operational execution.',
  ],
] as const

export function AdvisoryRecommendation() {
  return (
    <>
      <div className="bank-recommendation">
        <span>Immutable advisory recommendation</span>
        <h3>{recommendation}</h3>
      </div>
      <dl className="bank-details">
        {recommendationDetails.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="bank-notice">
        <strong>This is not a final fraud determination, reimbursement approval or rejection.</strong>{' '}
        No bank or payment action will occur.
      </p>
    </>
  )
}
