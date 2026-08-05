import { primaryCase } from '../data/primaryCase'

const overviewItems = [
  ['Case ID / version', `${primaryCase.id} / ${primaryCase.version}`],
  ['Customer', primaryCase.customer],
  ['Claim type', primaryCase.claimType],
  ['Claim amount', primaryCase.claimAmount],
  ['Payment route', primaryCase.paymentRoute],
  ['Claim received', '20 July 2026, 09:14 BST'],
  ['Demonstration snapshot', '22 July 2026, 14:30 BST'],
  ['Review target', '27 July 2026, 17:00 BST'],
  ['Final deadline', '8 September 2026, 17:00 BST'],
] as const

export function CustomerPaymentOverview() {
  return (
    <>
      <dl className="bank-details">
        {overviewItems.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p>
        Business days are Monday–Friday, excluding England and Wales bank holidays, counted after
        claim receipt. Fixed synthetic values.
      </p>
      <div className="bank-notice">
        <strong>Stop clock: Not activated.</strong> A potentially permitted evidence request exists,
        but no pause was recorded. Stop-clock intervals: none.
      </div>
    </>
  )
}
