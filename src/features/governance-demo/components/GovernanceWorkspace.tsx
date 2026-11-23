import { Badge } from '../../../components/Badge'
import { Stack } from '../../../components/layout'
import { GovernanceWalkthrough } from './GovernanceWalkthrough'

export function GovernanceWorkspace() {
  return (
    <section
      aria-labelledby="governance-workspace-title"
      className="governance-workspace"
    >
      <Stack className="governance-workspace__header" space="md">
        <Badge variant="primary">Governance Workspace</Badge>
        <h2 className="type-heading-2" id="governance-workspace-title">
          Interactive Governance Walkthrough
        </h2>
        <p className="type-body-large">
          Select a stage to inspect the example request, policy review, approval and simulated outcome.
        </p>
      </Stack>

      <GovernanceWalkthrough />
    </section>
  )
}
