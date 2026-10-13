import type { ProgressState } from '@/store/progress'
import type { Task } from '@/store/planner'
import { MODULES } from '@/content'

export interface Achievement {
  id: string
  title: string
  description: string
  emoji: string
  earned: boolean
}

/** Prestationer räknas fram ur framstegen – inga straff, bara saker att glädjas åt. */
export function computeAchievements(p: Pick<ProgressState, 'lessons' | 'answers' | 'exams' | 'studyLog' | 'concepts' | 'labsDone' | 'cards'>, tasks: Task[]): Achievement[] {
  const completed = Object.values(p.lessons).filter((l) => l.status === 'completed').length
  const correct = p.answers.filter((a) => a.correct).length
  const days = Object.keys(p.studyLog).length
  const explained = Object.values(p.concepts).filter((c) => c.explainedAt).length
  const reviewed = Object.values(p.cards).filter((c) => c.reps > 0).length
  const doneTasks = tasks.filter((t) => t.done).length
  const moduleDone = MODULES.some((m) => m.lessons.every((l) => p.lessons[l.id]?.status === 'completed'))
  let bestStreak = 0
  let streak = 0
  for (const a of p.answers) {
    streak = a.correct ? streak + 1 : 0
    bestStreak = Math.max(bestStreak, streak)
  }
  const list: Array<Omit<Achievement, 'earned'> & { earned: boolean }> = [
    { id: 'first-lesson', title: 'Första steget', description: 'Klara din första lektion.', emoji: '🌱', earned: completed >= 1 },
    { id: 'five-lessons', title: 'På gång', description: 'Klara fem lektioner.', emoji: '🌿', earned: completed >= 5 },
    { id: 'twenty-lessons', title: 'Kunskapsträd', description: 'Klara tjugo lektioner.', emoji: '🌳', earned: completed >= 20 },
    { id: 'module', title: 'Hel modul', description: 'Klara alla lektioner i en modul.', emoji: '🏅', earned: moduleDone },
    { id: 'fifty-correct', title: '50 rätt', description: 'Svara rätt på 50 frågor.', emoji: '✨', earned: correct >= 50 },
    { id: 'streak', title: 'Fem i rad', description: 'Fem rätta svar i rad.', emoji: '🔥', earned: bestStreak >= 5 },
    { id: 'explain', title: 'Lärare för en dag', description: 'Förklara ett begrepp med egna ord.', emoji: '🎓', earned: explained >= 1 },
    { id: 'review', title: 'Minnesmästare', description: 'Repetera tio kort.', emoji: '🧠', earned: reviewed >= 10 },
    { id: 'lab', title: 'Labbforskare', description: 'Testa tre simuleringar i labbet.', emoji: '🔬', earned: p.labsDone.length >= 3 },
    { id: 'exam', title: 'Provträning', description: 'Gör ett övningsprov.', emoji: '📝', earned: p.exams.length >= 1 },
    { id: 'days', title: 'Tre studiedagar', description: 'Plugga tre olika dagar.', emoji: '📅', earned: days >= 3 },
    { id: 'tasks', title: 'Uppgiftsfixare', description: 'Bocka av fem uppgifter i planeringen.', emoji: '✅', earned: doneTasks >= 5 },
  ]
  return list
}
