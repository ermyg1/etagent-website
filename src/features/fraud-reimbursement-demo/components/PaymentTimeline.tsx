import { primaryCase } from '../data/primaryCase'

export function PaymentTimeline() {
  return (
    <ol className="bank-timeline">
      {primaryCase.payments.map((payment) => (
        <li key={payment.id}>
          <span>
            {payment.date}, {payment.time}
          </span>
          <h3>{payment.id}</h3>
          <p>
            {payment.amount} to {payment.recipient} via Faster Payments.
          </p>
        </li>
      ))}
      <li>
        <span>20 July 2026, 09:14 BST</span>
        <h3>Claim received</h3>
        <p>The customer contacted the fictional bank three days after the second payment.</p>
      </li>
    </ol>
  )
}
