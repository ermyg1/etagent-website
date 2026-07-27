import { useState } from 'react'
import { ChevronDown, ImageOff } from 'lucide-react'
import { Badge } from '../../../components/Badge'
import type { EvidenceItem, EvidenceTone } from '../data/demoData'

const toneLabels: Record<EvidenceTone, string> = {
  supporting: 'Supporting evidence',
  inconclusive: 'Inconclusive evidence',
  missing: 'Missing evidence',
  conflicting: 'Conflicting evidence',
}

const toneVariants = {
  supporting: 'success',
  inconclusive: 'neutral',
  missing: 'warning',
  conflicting: 'error',
} as const

export function EvidenceCard({ evidence }: { evidence: EvidenceItem }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentId = `evidence-${evidence.id.toLowerCase()}-details`

  return (
    <article className={`evidence-card evidence-card--${evidence.tone}`}>
      <button
        aria-controls={contentId}
        aria-expanded={isExpanded}
        className="evidence-card__toggle"
        onClick={() => setIsExpanded((current) => !current)}
        type="button"
      >
        <span className="evidence-card__identity">
          <span className="evidence-card__id">{evidence.id}</span>
          <span>
            <strong>{evidence.title}</strong>
            <small>{evidence.kind}</small>
          </span>
        </span>
        <span className="evidence-card__status">
          <Badge variant={toneVariants[evidence.tone]}>{toneLabels[evidence.tone]}</Badge>
          <ChevronDown aria-hidden="true" className={isExpanded ? 'is-open' : ''} />
        </span>
      </button>
      {isExpanded ? (
        <div className="evidence-card__content" id={contentId}>
          {evidence.id === 'E2' ? (
            <div
              aria-label="Synthetic driver photograph placeholder"
              className="evidence-card__placeholder"
              role="img"
            >
              <ImageOff aria-hidden="true" />
              <span>Synthetic entrance photograph placeholder</span>
              <small>No real building image used</small>
            </div>
          ) : null}
          <dl className="delivery-demo-detail-list">
            <div>
              <dt>Assessment</dt>
              <dd>{evidence.assessment}</dd>
            </div>
          </dl>
          <ul className="delivery-demo-list">
            {evidence.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          {evidence.messageThread ? (
            <div className="evidence-card__messages">
              {evidence.messageThread.map((message) => (
                <div key={`${message.author}-${message.time}`}>
                  <strong>{message.author}</strong>
                  <time>{message.time}</time>
                  <p>{message.message}</p>
                </div>
              ))}
            </div>
          ) : null}
          {evidence.limitations ? (
            <div className="evidence-card__limitations">
              <strong>Limitations</strong>
              <ul>
                {evidence.limitations.map((limitation) => (
                  <li key={limitation}>{limitation}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
