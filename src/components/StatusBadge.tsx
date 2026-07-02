import { Badge } from './Badge'

type StatusBadgeState = 'Implemented' | 'In Progress' | 'Planned'

type StatusBadgeProps = {
  state: StatusBadgeState
}

const statusVariant = {
  Implemented: 'success',
  'In Progress': 'warning',
  Planned: 'neutral',
} as const

export function StatusBadge({ state }: StatusBadgeProps) {
  return <Badge variant={statusVariant[state]}>{state}</Badge>
}
