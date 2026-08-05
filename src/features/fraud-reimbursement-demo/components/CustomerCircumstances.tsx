import { evidenceItems } from '../data/primaryCase'
import { EvidenceCard } from './EvidenceCard'

export function CustomerCircumstances() {
  const items = evidenceItems.filter(
    (item) =>
      item.id.startsWith('CIR-') ||
      item.id === 'INF-002' ||
      ['UNQ-001', 'UNQ-002', 'UNQ-003', 'MIS-005'].includes(item.id),
  )

  return (
    <>
      <p className="bank-notice">
        Specialist review required. Circumstances may be material to susceptibility, warning
        comprehension and accessible support. No automated vulnerability classification occurs.
      </p>
      <div className="bank-card-list">
        {items.map((item) => (
          <EvidenceCard item={item} key={item.id} />
        ))}
      </div>
    </>
  )
}
