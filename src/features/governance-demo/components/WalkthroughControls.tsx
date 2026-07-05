import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../../components/Button'

type WalkthroughControlsProps = {
  activeIndex: number
  onNext: () => void
  onPrevious: () => void
  stageCount: number
}

export function WalkthroughControls({
  activeIndex,
  onNext,
  onPrevious,
  stageCount,
}: WalkthroughControlsProps) {
  const isFirstStage = activeIndex === 0
  const isFinalStage = activeIndex === stageCount - 1

  return (
    <div
      aria-label="Governance walkthrough controls"
      className="walkthrough-controls"
    >
      <Button
        disabled={isFirstStage}
        onClick={onPrevious}
        size="md"
        variant="outline"
      >
        <span className="walkthrough-controls__button-label">
          <ChevronLeft aria-hidden="true" focusable="false" />
          Previous
        </span>
      </Button>
      <span className="walkthrough-controls__status type-caption">
        {String(activeIndex + 1).padStart(2, '0')} /{' '}
        {String(stageCount).padStart(2, '0')}
      </span>
      <Button disabled={isFinalStage} onClick={onNext} size="md">
        <span className="walkthrough-controls__button-label">
          Next
          <ChevronRight aria-hidden="true" focusable="false" />
        </span>
      </Button>
    </div>
  )
}
