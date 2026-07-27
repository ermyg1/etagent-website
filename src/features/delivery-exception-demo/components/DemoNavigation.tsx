import { Check, LockKeyhole } from 'lucide-react'
import { Icon } from '../../../components/Icon'
import { demoViews, type DemoViewId } from '../data/demoData'

type DemoNavigationProps = {
  activeView: DemoViewId
  completedViews: DemoViewId[]
  onNavigate: (view: DemoViewId) => void
}

export function DemoNavigation({
  activeView,
  completedViews,
  onNavigate,
}: DemoNavigationProps) {
  return (
    <nav aria-label="Delivery exception review progress" className="delivery-demo-nav">
      <ol>
        {demoViews.map((view, index) => {
          const isComplete = completedViews.includes(view.id)
          const isLocked = view.id === 'record' && !isComplete

          return (
            <li key={view.id}>
              <button
                aria-current={activeView === view.id ? 'step' : undefined}
                className="delivery-demo-nav__button"
                disabled={isLocked}
                onClick={() => onNavigate(view.id)}
                type="button"
              >
                <span className="delivery-demo-nav__step">
                  {isComplete ? (
                    <Check aria-hidden="true" />
                  ) : isLocked ? (
                    <LockKeyhole aria-hidden="true" />
                  ) : (
                    String(index + 1).padStart(2, '0')
                  )}
                </span>
                <span>{view.label}</span>
              </button>
            </li>
          )
        })}
      </ol>
      <div className="delivery-demo-nav__boundary">
        <Icon icon={LockKeyhole} size="sm" />
        <span>Execution boundary locked</span>
      </div>
    </nav>
  )
}
