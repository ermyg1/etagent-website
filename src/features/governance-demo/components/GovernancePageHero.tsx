import { Badge } from '../../../components/Badge'
import { Stack } from '../../../components/layout'

export function GovernancePageHero() {
  return (
    <Stack className="governance-demo-intro__content" space="lg">
      <Badge variant="primary">Interactive Governance</Badge>
      <Stack space="md">
        <h1 className="type-heading-1" id="governance-demo-title">
          Governed AI decision flow
        </h1>
        <p className="type-body-large">
          Explore eight pre-authored stages of a fictional request. The AI analysis, policy results,
          approval and evidence are examples. This walkthrough invokes no AI model, connects to no
          live system and creates no approval or production record.
        </p>
      </Stack>
    </Stack>
  )
}
