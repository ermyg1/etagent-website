import { PageLayout } from '../../../components/layout'
import '../styles/use-cases.css'

const useCases = [
  {
    title: 'Governed Delivery Exception Review',
    sector: 'Courier operations',
    href: '/demo/delivery-exception-review',
    boundary:
      'A synthetic courier workflow. No delivery platform or operational system is connected.',
  },
  {
    title: 'Governed Fraud Reimbursement Review',
    sector: 'Retail banking',
    href: '/demo/fraud-reimbursement-review',
    boundary:
      'A fictional banking workflow. No bank account, banking system or real customer data is connected.',
  },
]

export function UseCasesPage() {
  return (
    <PageLayout>
      <section aria-labelledby="use-cases-title" className="use-cases">
        <div>
          <p className="use-cases__eyebrow">Use cases</p>
          <h1 id="use-cases-title">Governed workflows across enterprise contexts.</h1>
          <p className="use-cases__intro">
            Both demonstrations apply the same architecture: Evidence → Policy assessment → Impact
            analysis → Advisory recommendation → Human authority → Decision record → External
            execution blocked.
          </p>
          <div className="use-cases__grid">
            {useCases.map((item) => (
              <a className="use-case-card" href={item.href} key={item.href}>
                <span>{item.sector}</span>
                <h2>{item.title}</h2>
                <p>{item.boundary}</p>
                <strong>
                  Open demonstration <span aria-hidden="true">→</span>
                </strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
