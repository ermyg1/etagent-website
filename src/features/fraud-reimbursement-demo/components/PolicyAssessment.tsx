import { useState } from 'react'
import { policy, policyRules } from '../data/policy'

export function PolicyAssessment() {
  const [open, setOpen] = useState<string[]>([])

  return (
    <>
      <div className="bank-notice">
        <strong>
          {policy.id} — {policy.title}, v{policy.version}
        </strong>
        <br />
        Effective {policy.effectiveDate}; owner: {policy.owner}; approved by:{' '}
        {policy.approvalAuthority}.{' '}
        <strong>{policy.status}. Not a real bank policy or legal advice.</strong>
      </div>
      <p>
        <strong>Evidence readiness: Not ready.</strong> Specialist review and material evidence
        remain outstanding. Missing evidence cannot satisfy a rule; an outdated policy result would
        block readiness.
      </p>
      <div className="bank-card-list">
        {policyRules.map((rule) => {
          const expanded = open.includes(rule.id)
          const assessmentId = `rule-${rule.id}`

          return (
            <article className="bank-rule" key={rule.id}>
              <header>
                <div>
                  <span>{rule.id}</span>
                  <h3>{rule.title}</h3>
                </div>
                <strong>{rule.state}</strong>
              </header>
              <button
                aria-controls={assessmentId}
                aria-expanded={expanded}
                onClick={() =>
                  setOpen((current) =>
                    expanded
                      ? current.filter((id) => id !== rule.id)
                      : [...current, rule.id],
                  )
                }
                type="button"
              >
                {expanded ? 'Hide' : 'Show'} assessment
              </button>
              <dl hidden={!expanded} id={assessmentId}>
                <dt>Basis</dt>
                <dd>{rule.basis}</dd>
                <dt>Rationale</dt>
                <dd>{rule.rationale}</dd>
                <dt>Unresolved question</dt>
                <dd>{rule.question ?? 'None.'}</dd>
              </dl>
            </article>
          )
        })}
      </div>
    </>
  )
}
