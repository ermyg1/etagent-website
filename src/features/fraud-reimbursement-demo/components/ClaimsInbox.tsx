import { cases, queueMetrics } from '../data/cases'

export type ClaimsFilter =
  | 'All'
  | 'Evidence outstanding'
  | 'Human decision'
  | 'Specialist review'
  | 'High priority'

const filters: ClaimsFilter[] = [
  'All',
  'Evidence outstanding',
  'Human decision',
  'Specialist review',
  'High priority',
]

type ClaimsInboxProps = {
  filter: ClaimsFilter
  onFilterChange: (filter: ClaimsFilter) => void
  onOpen: (id: string) => void
  selectedCaseId: string | null
}

export function ClaimsInbox({
  filter,
  onFilterChange,
  onOpen,
  selectedCaseId,
}: ClaimsInboxProps) {
  const shown = cases.filter(
    (claim) =>
      filter === 'All' ||
      (filter === 'Evidence outstanding' &&
        (claim.evidence === 'Incomplete' || claim.evidence === 'Awaiting third party')) ||
      (filter === 'Human decision' && claim.readiness === 'Human decision') ||
      (filter === 'Specialist review' && claim.readiness === 'Specialist review') ||
      (filter === 'High priority' && claim.priority === 'High'),
  )
  const selectedCaseHidden =
    selectedCaseId !== null && !shown.some((claim) => claim.id === selectedCaseId)

  return (
    <>
      <dl className="bank-metrics">
        <div>
          <dt>Open claims</dt>
          <dd>{queueMetrics.open}</dd>
        </div>
        <div>
          <dt>Evidence outstanding</dt>
          <dd>{queueMetrics.evidenceOutstanding}</dd>
        </div>
        <div>
          <dt>Human decision required</dt>
          <dd>{queueMetrics.humanDecision}</dd>
        </div>
        <div>
          <dt>High-priority cases</dt>
          <dd>{queueMetrics.highPriority}</dd>
        </div>
      </dl>
      <div aria-label="Filter claims" className="bank-filters">
        {filters.map((availableFilter) => (
          <button
            aria-pressed={filter === availableFilter}
            key={availableFilter}
            onClick={() => onFilterChange(availableFilter)}
            type="button"
          >
            {availableFilter}
          </button>
        ))}
      </div>
      {selectedCaseHidden && (
        <p className="bank-notice">The open case is hidden by this queue filter.</p>
      )}
      {shown.length === 0 ? (
        <p>No claims match the selected filter.</p>
      ) : (
        <div className="bank-table-wrap">
          <table>
            <caption>Synthetic fraud reimbursement claims</caption>
            <thead>
              <tr>
                <th>Case</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Priority</th>
                <th>Evidence</th>
                <th>Readiness</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((claim) => (
                <tr key={claim.id}>
                  <th scope="row">{claim.id}</th>
                  <td>{claim.type}</td>
                  <td>{claim.amount}</td>
                  <td>{claim.priority}</td>
                  <td>{claim.evidence}</td>
                  <td>{claim.readiness}</td>
                  <td>
                    {claim.detail === 'Full review available' ? (
                      <button onClick={() => onOpen(claim.id)} type="button">
                        Open review
                      </button>
                    ) : (
                      <span>{claim.detail}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
