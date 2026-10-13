import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { useLearningContext } from '@/store/context'
import { Dashboard } from '@/pages/Dashboard'

const CoursePage = lazy(() => import('@/pages/CoursePage'))
const ModulePage = lazy(() => import('@/pages/ModulePage'))
const LessonPage = lazy(() => import('@/pages/LessonPage'))
const PeriodicTablePage = lazy(() => import('@/pages/PeriodicTablePage'))
const AtomBuilderPage = lazy(() => import('@/pages/AtomBuilderPage'))
const LabPage = lazy(() => import('@/pages/LabPage'))
const SimulationPage = lazy(() => import('@/pages/SimulationPage'))
const PracticePage = lazy(() => import('@/pages/PracticePage'))
const ReviewPage = lazy(() => import('@/pages/ReviewPage'))
const GlossaryPage = lazy(() => import('@/pages/GlossaryPage'))
const AssignmentHelperPage = lazy(() => import('@/pages/AssignmentHelperPage'))
const PlannerPage = lazy(() => import('@/pages/PlannerPage'))
const ProgressPage = lazy(() => import('@/pages/ProgressPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const ExplainPage = lazy(() => import('@/pages/ExplainPage'))
const StudySessionPage = lazy(() => import('@/pages/StudySessionPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const PAGE_TITLES: Record<string, string> = {
  '/': 'Hem',
  '/kurs': 'Kursen',
  '/periodiska-systemet': 'Periodiska systemet',
  '/atombyggaren': 'Atombyggaren',
  '/labb': 'Labbet',
  '/ova': 'Öva och prov',
  '/repetera': 'Repetera',
  '/ordlista': 'Ordlista',
  '/uppgiftshjalp': 'Hjälp med uppgift',
  '/planering': 'Planering',
  '/framsteg': 'Framsteg',
  '/installningar': 'Inställningar',
  '/egna-ord': 'Förklara med egna ord',
}

function RouteEffects() {
  const { pathname } = useLocation()
  const clear = useLearningContext((s) => s.clear)
  const set = useLearningContext((s) => s.set)
  useEffect(() => {
    if (!pathname.startsWith('/lektion/')) {
      clear()
      set({ page: PAGE_TITLES[pathname] ?? pathname })
    }
    const t = PAGE_TITLES[pathname]
    document.title = t ? `${t} · Naturly` : 'Naturly'
  }, [pathname, clear, set])
  return null
}

export function App() {
  return (
    <AppShell>
      <RouteEffects />
      <Suspense
        fallback={
          <div className="flex justify-center py-20 text-muted" role="status">
            <Loader2 className="size-6 animate-spin" />
            <span className="sr-only">Laddar…</span>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kurs" element={<CoursePage />} />
          <Route path="/modul/:moduleId" element={<ModulePage />} />
          <Route path="/lektion/:lessonId" element={<LessonPage />} />
          <Route path="/periodiska-systemet" element={<PeriodicTablePage />} />
          <Route path="/atombyggaren" element={<AtomBuilderPage />} />
          <Route path="/labb" element={<LabPage />} />
          <Route path="/labb/:simId" element={<SimulationPage />} />
          <Route path="/ova" element={<PracticePage />} />
          <Route path="/repetera" element={<ReviewPage />} />
          <Route path="/ordlista" element={<GlossaryPage />} />
          <Route path="/uppgiftshjalp" element={<AssignmentHelperPage />} />
          <Route path="/planering" element={<PlannerPage />} />
          <Route path="/framsteg" element={<ProgressPage />} />
          <Route path="/installningar" element={<SettingsPage />} />
          <Route path="/egna-ord" element={<ExplainPage />} />
          <Route path="/studera/:minutes" element={<StudySessionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}
