import { useRef, useState } from 'react'
import { reviewConfirmations, unresolvedRiskAcknowledgement } from '../data/review'
import type { HumanDecision, HumanReviewDraft } from '../types'

type HumanReviewProps = {
  draft: HumanReviewDraft
  onAmendmentChange: (value: string) => void
  onConfirmationChange: (index: number, checked: boolean) => void
  onOutcomeChange: (value: HumanDecision) => void
  onRationaleChange: (value: string) => void
  onSubmit: () => string | null
  onUnresolvedRiskChange: (checked: boolean) => void
}

export function HumanReview({
  draft,
  onAmendmentChange,
  onConfirmationChange,
  onOutcomeChange,
  onRationaleChange,
  onSubmit,
  onUnresolvedRiskChange,
}: HumanReviewProps) {
  const [submitted, setSubmitted] = useState(false)
  const [selectionError, setSelectionError] = useState<string | null>(null)
  const summary = useRef<HTMLDivElement>(null)

  const outcomeInvalid = submitted && draft.outcome === null
  const rationaleInvalid = submitted && draft.rationale.trim() === ''
  const amendmentInvalid =
    submitted && draft.outcome === 'AMENDED' && draft.amendment.trim() === ''
  const confirmationsInvalid = submitted && draft.confirmations.some((checked) => !checked)
  const unresolvedRiskInvalid = submitted && !draft.unresolvedRiskAcknowledged

  const errors = [
    outcomeInvalid && 'Select exactly one outcome.',
    rationaleInvalid && 'Enter a rationale.',
    amendmentInvalid && 'Describe the amendment.',
    confirmationsInvalid && 'Complete every required confirmation.',
    unresolvedRiskInvalid && 'Acknowledge the unresolved risk.',
    selectionError,
  ].filter(Boolean) as string[]

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    setSelectionError(null)

    const validationFailed =
      draft.outcome === null ||
      draft.rationale.trim() === '' ||
      (draft.outcome === 'AMENDED' && draft.amendment.trim() === '') ||
      draft.confirmations.some((checked) => !checked) ||
      !draft.unresolvedRiskAcknowledged

    if (validationFailed) {
      requestAnimationFrame(() => summary.current?.focus())
      return
    }

    const error = onSubmit()

    if (error) {
      setSelectionError(error)
      requestAnimationFrame(() => summary.current?.focus())
    }
  }

  return (
    <form noValidate onSubmit={submit}>
      <p>
        <strong>Reviewer role:</strong> Senior Fraud Reimbursement Reviewer (fixed fictional role)
      </p>
      {submitted && errors.length > 0 && (
        <div
          aria-live="assertive"
          className="bank-errors"
          ref={summary}
          role="alert"
          tabIndex={-1}
        >
          <h3>Decision record not created</h3>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <fieldset
        aria-describedby={outcomeInvalid ? 'human-review-outcome-error' : undefined}
        aria-invalid={outcomeInvalid}
      >
        <legend>Outcome</legend>
        {(
          [
            ['ACCEPTED', 'Accept advisory recommendation'],
            ['AMENDED', 'Amend advisory recommendation'],
            ['REJECTED', 'Reject advisory recommendation'],
          ] as const
        ).map(([value, label]) => (
          <label key={value}>
            <input
              checked={draft.outcome === value}
              name="outcome"
              onChange={() => onOutcomeChange(value)}
              type="radio"
              value={value}
            />
            {label}
          </label>
        ))}
        {outcomeInvalid && (
          <p className="bank-field-error" id="human-review-outcome-error">
            Select exactly one outcome.
          </p>
        )}
      </fieldset>
      {draft.outcome === 'AMENDED' && (
        <label>
          Amendment description
          <textarea
            aria-describedby={
              amendmentInvalid ? 'human-review-amendment-error' : undefined
            }
            aria-invalid={amendmentInvalid}
            onChange={(event) => onAmendmentChange(event.target.value)}
            value={draft.amendment}
          />
          {amendmentInvalid && (
            <span className="bank-field-error" id="human-review-amendment-error">
              Describe the amendment.
            </span>
          )}
        </label>
      )}
      <label>
        Human rationale
        <textarea
          aria-describedby={rationaleInvalid ? 'human-review-rationale-error' : undefined}
          aria-invalid={rationaleInvalid}
          onChange={(event) => onRationaleChange(event.target.value)}
          value={draft.rationale}
        />
        {rationaleInvalid && (
          <span className="bank-field-error" id="human-review-rationale-error">
            Enter a rationale.
          </span>
        )}
      </label>
      <fieldset
        aria-describedby={
          confirmationsInvalid ? 'human-review-confirmations-error' : undefined
        }
        aria-invalid={confirmationsInvalid}
      >
        <legend>Required confirmations</legend>
        {reviewConfirmations.map((item, index) => (
          <label key={item}>
            <input
              checked={draft.confirmations[index]}
              onChange={(event) => onConfirmationChange(index, event.target.checked)}
              type="checkbox"
            />
            {item}
          </label>
        ))}
        {confirmationsInvalid && (
          <p className="bank-field-error" id="human-review-confirmations-error">
            Complete every required confirmation.
          </p>
        )}
      </fieldset>
      <label className="bank-risk">
        <input
          aria-describedby={
            unresolvedRiskInvalid ? 'human-review-unresolved-risk-error' : undefined
          }
          aria-invalid={unresolvedRiskInvalid}
          checked={draft.unresolvedRiskAcknowledged}
          onChange={(event) => onUnresolvedRiskChange(event.target.checked)}
          type="checkbox"
        />
        <span>
          {unresolvedRiskAcknowledgement}
          {unresolvedRiskInvalid && (
            <span className="bank-field-error" id="human-review-unresolved-risk-error">
              Acknowledge the unresolved risk.
            </span>
          )}
        </span>
      </label>
      <button type="submit">Record temporary demonstration decision</button>
    </form>
  )
}
