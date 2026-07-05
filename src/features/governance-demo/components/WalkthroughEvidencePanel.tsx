import { Badge } from '../../../components/Badge'
import { Card } from '../../../components/Card'
import { Stack } from '../../../components/layout'
import type { GovernanceWalkthroughStage } from '../constants/content'

type WalkthroughEvidencePanelProps = {
  stage: GovernanceWalkthroughStage
}

export function WalkthroughEvidencePanel({
  stage,
}: WalkthroughEvidencePanelProps) {
  return (
    <Card
      aria-labelledby={`walkthrough-evidence-${stage.id}`}
      className="walkthrough-evidence"
      variant="bordered"
    >
      <Stack space="md">
        <Badge variant="secondary">Evidence Panel</Badge>
        <h3
          className="type-heading-4"
          id={`walkthrough-evidence-${stage.id}`}
        >
          Visible governance evidence
        </h3>
        <p className="type-body">{stage.outcome}</p>
      </Stack>
      <ul className="walkthrough-evidence__list">
        {stage.evidence.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  )
}
