import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { Stack } from '../../../components/layout'

export function FooterCallToAction() {
  return (
    <Card className="governance-demo-footer-cta__card" variant="bordered">
      <Stack className="governance-demo-footer-cta__content" space="sm">
        <Badge variant="secondary">Foundation Complete</Badge>
        <h2 className="type-heading-3" id="governance-demo-footer-title">
          Ready for future governance interaction milestones.
        </h2>
      </Stack>
      <Button size="lg" variant="outline">
        Review Trust Centre
      </Button>
    </Card>
  )
}
