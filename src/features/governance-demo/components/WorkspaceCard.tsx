import type { LucideIcon } from 'lucide-react'
import { Badge } from '../../../components/Badge'
import { Card } from '../../../components/Card'
import { Icon } from '../../../components/Icon'

type WorkspaceCardProps = {
  body: string
  icon?: LucideIcon
  id: string
  title: string
}

export function WorkspaceCard({ body, icon, id, title }: WorkspaceCardProps) {
  return (
    <Card
      aria-labelledby={`workspace-${id}`}
      className="governance-workspace-card"
      variant="bordered"
    >
      <div className="governance-workspace-card__topline">
        {icon ? (
          <Icon
            aria-hidden="true"
            className="governance-workspace-card__icon"
            icon={icon}
            size="md"
          />
        ) : null}
        <Badge variant="warning">Coming in P4B.2</Badge>
      </div>
      <h3
        className="governance-workspace-card__title type-heading-4"
        id={`workspace-${id}`}
      >
        {title}
      </h3>
      <p className="type-body">{body}</p>
    </Card>
  )
}
