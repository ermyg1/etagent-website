import './App.css'
import { CheckCircle2, KeyRound, ShieldCheck, TriangleAlert } from 'lucide-react'
import { Badge } from './components/Badge'
import { Button } from './components/Button'
import { Card } from './components/Card'
import {
  Checkbox,
  Field,
  Radio,
  Select,
  Textarea,
  TextInput,
  Toggle,
} from './components/FormControls'
import { Icon } from './components/Icon'
import { PageLayout, Section, Stack } from './components/layout'

function App() {
  return (
    <PageLayout>
      <div className="foundation" aria-labelledby="foundation-title">
        <Section className="foundation__intro-section" spacing="compact">
          <Stack className="foundation__intro" space="lg">
            <Badge variant="primary">W2 Brand Foundation</Badge>
            <h1 id="foundation-title" className="type-display">
              Design System Foundation
            </h1>
            <p className="type-body-large">
              Reusable tokens and interface primitives for the E.T Agent website.
            </p>
          </Stack>
        </Section>

        <Section className="foundation__section" id="tokens">
          <Stack space="xl">
            <div>
              <p className="type-caption">Tokens</p>
              <h2 className="type-heading-2">Theme primitives</h2>
            </div>
            <div className="token-grid" aria-label="Core colour tokens">
              {[
                ['Primary', 'var(--color-primary)'],
                ['Secondary', 'var(--color-secondary)'],
                ['Accent', 'var(--color-accent)'],
                ['Success', 'var(--color-success)'],
                ['Warning', 'var(--color-warning)'],
                ['Error', 'var(--color-error)'],
                ['Surface', 'var(--color-surface)'],
                ['Border', 'var(--color-border)'],
              ].map(([label, value]) => (
                <div className="token-swatch" key={label}>
                  <span style={{ background: value }} />
                  <strong>{label}</strong>
                  <code>{value}</code>
                </div>
              ))}
            </div>
          </Stack>
        </Section>

        <Section className="foundation__section" id="components">
          <Stack space="xl">
            <div>
              <p className="type-caption">Components</p>
              <h2 className="type-heading-2">Reusable interface elements</h2>
            </div>
            <div className="component-grid">
              <Card variant="bordered">
                <h3 className="type-heading-3">Buttons</h3>
                <div className="stack-row">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button isLoading>Loading</Button>
                </div>
              </Card>

              <Card variant="elevated">
                <h3 className="type-heading-3">Badges and icons</h3>
                <div className="stack-row">
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Icon icon={ShieldCheck} label="Security" />
                  <Icon icon={KeyRound} label="Access" />
                </div>
              </Card>

              <Card variant="hover">
                <h3 className="type-heading-3">Cards</h3>
                <p className="type-body">
                  Cards support default, hover, bordered and elevated treatments
                  with subtle shadows and accessible contrast.
                </p>
              </Card>

              <Card variant="bordered">
                <h3 className="type-heading-3">Forms</h3>
                <div className="form-grid">
                  <Field label="Work email" hint="Uses shared focus and disabled states.">
                    <TextInput placeholder="name@company.com" type="email" />
                  </Field>
                  <Field label="Access level">
                    <Select defaultValue="architect">
                      <option value="architect">Architect</option>
                      <option value="compliance">Compliance</option>
                      <option value="executive">Executive</option>
                    </Select>
                  </Field>
                  <Field label="Validation state" error="Enter a valid enterprise email.">
                    <TextInput aria-invalid="true" defaultValue="name" />
                  </Field>
                  <Field label="Notes">
                    <Textarea rows={3} placeholder="Optional context" />
                  </Field>
                  <Checkbox label="Remember preference" />
                  <Radio label="Primary environment" name="environment" />
                  <Toggle label="Security review enabled" defaultChecked />
                </div>
              </Card>
            </div>
          </Stack>
        </Section>

        <Section className="foundation__section" id="accessibility">
          <Stack space="xl">
            <div>
              <p className="type-caption">Baseline</p>
              <h2 className="type-heading-2">Accessible by default</h2>
            </div>
            <div className="baseline-grid">
              <Card>
                <Icon icon={CheckCircle2} label="Passed" />
                <h3 className="type-heading-4">Keyboard states</h3>
                <p>Visible focus indicators are shared across controls.</p>
              </Card>
              <Card>
                <Icon icon={TriangleAlert} label="Reduced motion" />
                <h3 className="type-heading-4">Motion restraint</h3>
                <p>Transitions stay within 150ms to 250ms and respect user settings.</p>
              </Card>
            </div>
          </Stack>
        </Section>
      </div>
    </PageLayout>
  )
}

export default App
