import { Check, LockKeyhole } from 'lucide-react'
import { useEffect, useRef } from 'react'
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
  const navigationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const navigation = navigationRef.current
    const activeItem = navigation?.querySelector<HTMLElement>('[aria-current="step"]')
    const navigationList = navigation?.querySelector<HTMLElement>('ol')

    if (!navigation || !activeItem || !navigationList) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isHorizontal = window.getComputedStyle(navigationList).display === 'flex'

    if (!isHorizontal) {
      if (navigation.scrollHeight <= navigation.clientHeight) {
        return
      }

      const top = activeItem.offsetTop - (navigation.clientHeight - activeItem.offsetHeight) / 2
      navigation.scrollTo({
        top: Math.max(0, top),
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
      return
    }

    if (navigation.scrollWidth <= navigation.clientWidth) {
      return
    }

    const left = activeItem.offsetLeft - (navigation.clientWidth - activeItem.offsetWidth) / 2
    navigation.scrollTo({
      left: Math.max(0, left),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [activeView])

  return (
    <nav
      aria-label="Delivery exception review progress"
      className="delivery-demo-nav"
      ref={navigationRef}
    >
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
