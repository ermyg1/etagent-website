import { Badge } from '../../../components/Badge'
import { Stack } from '../../../components/layout'

export function GovernancePageHero() {
  return (
    <Stack className="governance-demo-intro__content" space="lg">
      <Badge variant="primary">Interactive Governance Demo</Badge>
      <Stack space="md">
        <h1 className="type-heading-1" id="governance-demo-title">
          Governed AI decision flow
        </h1>
        <p className="type-body-large">
          Visitors can explore how governed AI decisions progress through
          policy, human approval and audit. This page provides the structural
          foundation for the future interactive demo.
        </p>
      </Stack>
    </Stack>
  )
}
