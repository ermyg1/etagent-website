import type { DecisionRecordData } from '../types'

export function DecisionRecord({ record }: { record: DecisionRecordData | null }) {
  if (!record) {
    return (
      <div aria-live="polite" className="bank-lock">
        <h3>Decision Record locked</h3>
        <p>Complete every Human Review requirement before a temporary record can be created.</p>
      </div>
    )
  }

  return (
    <>
      <div className="bank-notice">
        <strong>Temporary in-memory record — immutable until refresh.</strong> This is not a
        production banking record. No bank account or banking system was accessed. No real fraud,
        reimbursement or regulatory decision occurred. No external action was executed.
      </div>
      <dl className="bank-record">
        {Object.entries(record).map(([key, value]) => (
          <div key={key}>
            <dt>{key}</dt>
            <dd>{typeof value === 'string' ? value : JSON.stringify(value)}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}
