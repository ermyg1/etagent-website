import { Badge } from '../../../components/Badge'
import { Card } from '../../../components/Card'
import { Icon } from '../../../components/Icon'
import { Stack } from '../../../components/layout'
import type { GovernanceWalkthroughStage } from '../constants/content'

type WalkthroughStageDetailProps = {
  stage: GovernanceWalkthroughStage
  stageNumber: number
}

export function WalkthroughStageDetail({
  stage,
  stageNumber,
}: WalkthroughStageDetailProps) {
  return (
    <Card
      aria-labelledby={`walkthrough-stage-${stage.id}`}
      className="walkthrough-stage-detail"
      variant="bordered"
    >
      <div className="walkthrough-stage-detail__topline">
        <Badge variant="primary">Stage {String(stageNumber).padStart(2, '0')}</Badge>
        <Icon
          className="walkthrough-stage-detail__icon"
          icon={stage.icon}
          size="md"
        />
      </div>
      <Stack space="md">
        <p className="walkthrough-stage-detail__question type-caption">
          {stage.question}
        </p>
        <h3
          className="walkthrough-stage-detail__title type-heading-3"
          id={`walkthrough-stage-${stage.id}`}
        >
          {stage.title}
        </h3>
        <p className="type-body-large">{stage.answer}</p>
      </Stack>
      <div className="walkthrough-stage-detail__authority">
        <span className="type-caption">Governance marker</span>
        <strong>{stage.authority}</strong>
      </div>
    </Card>
  )
}
