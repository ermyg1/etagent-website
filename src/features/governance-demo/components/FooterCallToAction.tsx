import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { Stack } from '../../../components/layout'

export function FooterCallToAction() {
  return (
    <Card className="governance-demo-footer-cta__card" variant="bordered">
      <Stack className="governance-demo-footer-cta__content" space="sm">
        <Badge variant="secondary">Governance Review</Badge>
        <h2 className="type-heading-3" id="governance-demo-footer-title">
          Continue the enterprise trust evaluation.
        </h2>
      </Stack>
      <Button onClick={() => window.location.assign('/trust')} size="lg" variant="outline">
        Review Trust Centre
      </Button>
    </Card>
  )
}
