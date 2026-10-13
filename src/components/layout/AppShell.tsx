import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Atom,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  FlaskConical,
  Grid3x3,
  Home,
  Library,
  Menu,
  Moon,
  Repeat,
  Settings,
  Sun,
  TrendingUp,
  Camera,
  HeartHandshake,
  X,
  Focus,
} from 'lucide-react'
import { useSettings } from '@/store/settings'
import { useProgress } from '@/store/progress'
import { Button } from '@/components/ui/button'
import { TutorWidget } from '@/components/tutor/TutorWidget'
import { OverwhelmedDialog } from './OverwhelmedDialog'
import { cn } from '@/lib/utils'

export const NAV = [
  { to: '/', label: 'Hem', icon: Home, end: true },
  { to: '/kurs', label: 'Kursen', icon: BookOpen },
  { to: '/repetera', label: 'Repetera', icon: Repeat },
  { to: '/ova', label: 'Öva & prov', icon: ClipboardList },
  { to: '/periodiska-systemet', label: 'Periodiska systemet', icon: Grid3x3 },
  { to: '/atombyggaren', label: 'Atombyggaren', icon: Atom },
  { to: '/labb', label: 'Labbet', icon: FlaskConical },
  { to: '/uppgiftshjalp', label: 'Hjälp med uppgift', icon: Camera },
  { to: '/ordlista', label: 'Ordlista', icon: Library },
  { to: '/planering', label: 'Planering', icon: CalendarCheck },
  { to: '/framsteg', label: 'Framsteg', icon: TrendingUp },
  { to: '/installningar', label: 'Inställningar', icon: Settings },
]

const MOBILE_NAV = ['/', '/kurs', '/repetera', '/planering']

function useApplySettings() {
  const s = useSettings()
  useEffect(() => {
    const root = document.documentElement
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = s.theme === 'dark' || (s.theme === 'system' && mq.matches)
      root.classList.toggle('dark', dark)
    }
    apply()
    root.classList.toggle('hc', s.highContrast)
    root.classList.toggle('dyslexia', s.dyslexiaFont)
    root.classList.toggle('wide-spacing', s.wideSpacing)
    root.classList.toggle('reduce-motion', s.reducedMotion)
    root.style.setProperty('--text-scale', String(s.textScale))
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [s.theme, s.highContrast, s.dyslexiaFont, s.wideSpacing, s.reducedMotion, s.textScale])
}

/** Räknar studietid: en minut läggs till varje minut som sidan är synlig och används. */
function useStudyTimer() {
  const add = useProgress((s) => s.addStudyMinutes)
  useEffect(() => {
    let last = Date.now()
    const mark = () => (last = Date.now())
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart']
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }))
    const t = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - last < 3 * 60 * 1000) add(1)
    }, 60 * 1000)
    return () => {
      clearInterval(t)
      events.forEach((e) => window.removeEventListener(e, mark))
    }
  }, [add])
}

export function AppShell({ children }: { children: ReactNode }) {
  useApplySettings()
  useStudyTimer()
  const { theme, set, focusMode } = useSettings()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [overwhelmed, setOverwhelmed] = useState(false)
  const location = useLocation()
  useEffect(() => setMobileOpen(false), [location.pathname])
  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Hoppa till innehållet
      </a>

      {/* Sidomeny (dator) */}
      {!focusMode && (
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-surface/80 px-3 py-5 backdrop-blur lg:flex">
          <Brand />
          <nav aria-label="Huvudmeny" className="mt-6 flex flex-1 flex-col gap-0.5 overflow-y-auto">
            {NAV.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
          <p className="px-3 pt-4 text-xs text-muted">Naturkunskap nivå 2 · Komvux</p>
        </aside>
      )}

      {/* Mobilmeny */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Meny">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-surface px-3 py-5 shadow-xl">
            <div className="flex items-center justify-between">
              <Brand />
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Stäng meny">
                <X />
              </Button>
            </div>
            <nav aria-label="Huvudmeny" className="mt-6 flex flex-col gap-0.5 overflow-y-auto">
              {NAV.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className={cn(!focusMode && 'lg:pl-64')}>
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-background/85 px-4 py-2.5 backdrop-blur sm:px-6">
          <Button variant="ghost" size="icon" className={cn(!focusMode && 'lg:hidden')} onClick={() => setMobileOpen(true)} aria-label="Öppna meny">
            <Menu />
          </Button>
          <div className={cn('lg:hidden', focusMode && 'lg:block')}>
            <Brand small />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="pink" size="sm" onClick={() => setOverwhelmed(true)}>
              <HeartHandshake /> <span className="hidden sm:inline">Jag är överväldigad</span>
              <span className="sm:hidden">Paus</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => set({ focusMode: !focusMode })}
              aria-pressed={focusMode}
              aria-label={focusMode ? 'Stäng av fokusläge' : 'Slå på fokusläge'}
              title="Fokusläge: dölj allt extra"
            >
              <Focus className={cn(focusMode && 'text-primary')} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => set({ theme: isDark ? 'light' : 'dark' })} aria-label={isDark ? 'Byt till ljust läge' : 'Byt till mörkt läge'}>
              {isDark ? <Sun /> : <Moon />}
            </Button>
          </div>
        </header>

        <main id="main" className="px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-16">
          {children}
        </main>
      </div>

      {/* Bottenmeny (mobil) */}
      {!focusMode && (
        <nav aria-label="Snabbmeny" className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-border bg-surface/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
          {NAV.filter((n) => MOBILE_NAV.includes(n.to)).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => cn('flex flex-1 flex-col items-center gap-0.5 py-2 text-[0.7rem]', isActive ? 'text-primary' : 'text-muted')}
            >
              <item.icon className="size-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      <TutorWidget />
      <OverwhelmedDialog open={overwhelmed} onOpenChange={setOverwhelmed} />
    </div>
  )
}

function Brand({ small = false }: { small?: boolean }) {
  return (
    <NavLink to="/" className="flex items-center gap-2 px-2" aria-label="Naturly – startsida">
      <span className={cn('flex items-center justify-center rounded-xl bg-primary text-primary-foreground', small ? 'size-8' : 'size-9')}>
        <Atom className="size-5" />
      </span>
      <span className={cn('font-display font-semibold', small ? 'text-lg' : 'text-xl')}>Naturly</span>
    </NavLink>
  )
}

function NavItem({ to, label, icon: Icon, end }: (typeof NAV)[number]) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn('flex items-center gap-3 rounded-xl px-3 py-2 text-[0.92rem] font-medium transition-colors', isActive ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-surface-2 hover:text-foreground')
      }
    >
      <Icon className="size-[1.1rem]" />
      {label}
    </NavLink>
  )
}
