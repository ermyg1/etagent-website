import { Badge } from '../../../components/Badge'
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
      <a className="ui-button ui-button--outline ui-button--lg" href="/trust">
        Review Trust Centre
      </a>
    </Card>
  )
}
