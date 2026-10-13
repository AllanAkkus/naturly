import { useCallback } from 'react'
import { conceptLabel } from '@/content'
import { masteryStatus } from '@/lib/mastery'
import type { TutorContext } from '@/lib/ai'
import { useLearningContext } from '@/store/context'
import { useProgress } from '@/store/progress'
import { useSettings } from '@/store/settings'

/** Bygger sammanhanget som skickas till AI-läraren. Respekterar integritetsinställningen. */
export function useTutorContext() {
  return useCallback((): TutorContext => {
    const ctx = useLearningContext.getState()
    const settings = useSettings.getState()
    const progress = useProgress.getState()
    const base: TutorContext = {
      page: ctx.page,
      moduleTitle: ctx.moduleTitle,
      lessonTitle: ctx.lessonTitle,
      lessonGoal: ctx.lessonGoal,
      lessonSummary: ctx.summary,
      currentQuestion: ctx.currentQuestion,
      level: settings.level,
      nickname: settings.nickname || undefined,
    }
    if (!settings.shareProgressWithAI) return base
    const struggling = Object.entries(progress.concepts)
      .filter(([, s]) => masteryStatus(s) === 'needs-review')
      .slice(0, 6)
      .map(([c]) => conceptLabel(c))
    const recentAnswers = progress.answers.slice(-8).map((a) => ({ concept: conceptLabel(a.concepts[0] ?? ''), correct: a.correct }))
    return { ...base, struggling, recentAnswers }
  }, [])
}
