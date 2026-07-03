import { Badge } from '../../../components/Badge'
import { Stack } from '../../../components/layout'
import { governanceWorkspaceRegions } from '../constants/content'
import { WorkspaceCard } from './WorkspaceCard'

export function GovernanceWorkspace() {
  return (
    <section
      aria-labelledby="governance-workspace-title"
      className="governance-workspace"
    >
      <Stack className="governance-workspace__header" space="md">
        <Badge variant="primary">Governance Workspace</Badge>
        <h2 className="type-heading-2" id="governance-workspace-title">
          Interactive Demo Structure
        </h2>
        <p className="type-body-large">
          The workspace is divided into future scenario, decision, approval and
          evidence regions. Each region is a placeholder for P4B.2.
        </p>
      </Stack>

      <div className="governance-workspace__grid">
        {governanceWorkspaceRegions.map((region) => (
          <WorkspaceCard
            body={region.body}
            icon={region.icon}
            id={region.id}
            key={region.title}
            title={region.title}
          />
        ))}
      </div>
    </section>
  )
}
