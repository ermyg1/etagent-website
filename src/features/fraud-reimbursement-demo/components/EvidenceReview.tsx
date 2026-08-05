import { evidenceItems } from '../data/primaryCase'
import { EvidenceCard } from './EvidenceCard'

export function EvidenceReview() {
  return (
    <div className="bank-card-list">
      {evidenceItems.map((item) => (
        <EvidenceCard item={item} key={item.id} />
      ))}
    </div>
  )
}
