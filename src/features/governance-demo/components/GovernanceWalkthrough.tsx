import { useMemo, useState } from 'react'
import { governanceWalkthroughStages } from '../constants/content'
import { GovernanceTimeline } from './GovernanceTimeline'
import { WalkthroughControls } from './WalkthroughControls'
import { WalkthroughEvidencePanel } from './WalkthroughEvidencePanel'
import { WalkthroughStageDetail } from './WalkthroughStageDetail'

export function GovernanceWalkthrough() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStage = governanceWalkthroughStages[activeIndex]

  const activeStageId = activeStage.id
  const stageCount = governanceWalkthroughStages.length

  const stageIndexById = useMemo(
    () =>
      new Map(
        governanceWalkthroughStages.map((stage, index) => [stage.id, index]),
      ),
    [],
  )

  const selectStage = (stageId: string) => {
    const nextIndex = stageIndexById.get(stageId)

    if (nextIndex !== undefined) {
      setActiveIndex(nextIndex)
    }
  }

  return (
    <div className="governance-walkthrough">
      <GovernanceTimeline
        activeStageId={activeStageId}
        onStageSelect={selectStage}
        stages={governanceWalkthroughStages}
      />
      <div className="governance-walkthrough__content">
        <WalkthroughStageDetail
          stage={activeStage}
          stageNumber={activeIndex + 1}
        />
        <WalkthroughEvidencePanel stage={activeStage} />
        <WalkthroughControls
          activeIndex={activeIndex}
          onNext={() =>
            setActiveIndex((currentIndex) =>
              Math.min(currentIndex + 1, stageCount - 1),
            )
          }
          onPrevious={() =>
            setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0))
          }
          stageCount={stageCount}
        />
      </div>
    </div>
  )
}
