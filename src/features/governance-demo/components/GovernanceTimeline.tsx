import { Icon } from '../../../components/Icon'
import type { GovernanceWalkthroughStage } from '../constants/content'

type GovernanceTimelineProps = {
  activeStageId: string
  onStageSelect: (stageId: string) => void
  stages: GovernanceWalkthroughStage[]
}

export function GovernanceTimeline({
  activeStageId,
  onStageSelect,
  stages,
}: GovernanceTimelineProps) {
  return (
    <ol aria-label="Governance walkthrough stages" className="governance-timeline">
      {stages.map((stage, index) => {
        const isActive = stage.id === activeStageId

        return (
          <li className="governance-timeline__item" key={stage.id}>
            <button
              aria-current={isActive ? 'step' : undefined}
              className="governance-timeline__button"
              onClick={() => onStageSelect(stage.id)}
              type="button"
            >
              <span className="governance-timeline__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <Icon
                className="governance-timeline__icon"
                icon={stage.icon}
                size="sm"
              />
              <span className="governance-timeline__label">{stage.title}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
