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
          Visitors can explore how governed AI decisions progress through
          policy, human approval and audit before execution authority is
          released. This is an illustrative governance walkthrough. The displayed
          AI analysis, policy results and evidence are represented fixtures; no AI
          model or inference provider, live integration, operational execution or
          production record is created.
        </p>
      </Stack>
    </Stack>
  )
}
