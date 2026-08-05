import { useId, useState } from 'react'
import type { EvidenceItem } from '../types'

export function EvidenceCard({ item }: { item: EvidenceItem }) {
  const [open, setOpen] = useState(
    item.classification === 'CONTRADICTION' || item.id === 'CUS-007',
  )
  const id = useId()

  return (
    <article className={`bank-evidence bank-status--${item.classification.toLowerCase()}`}>
      <div>
        <span>{item.classification.replaceAll('_', ' ')}</span>
        <h3>
          {item.id}: {item.title}
        </h3>
        <blockquote>{item.content}</blockquote>
        {item.id === 'CUS-007' && (
          <strong>Untrusted customer evidence — inert quoted content</strong>
        )}
      </div>
      <button
        aria-controls={id}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? 'Hide' : 'Show'} provenance
      </button>
      <div hidden={!open} id={id}>
        <dl>
          <dt>Provenance</dt>
          <dd>{item.provenance.replaceAll('_', ' ')}</dd>
          <dt>Source</dt>
          <dd>{item.sourceDescription}</dd>
          <dt>Limitations</dt>
          <dd>{item.limitations}</dd>
          <dt>References</dt>
          <dd>{item.references.join(', ')}</dd>
        </dl>
      </div>
    </article>
  )
}
