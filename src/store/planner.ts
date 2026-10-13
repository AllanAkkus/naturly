import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { todayKey } from './progress'

export interface TaskStep {
  id: string
  text: string
  done: boolean
}

export interface Task {
  id: string
  title: string
  minutes: number
  /** Dagen uppgiften är planerad till (YYYY-MM-DD). */
  date: string
  deadline?: string
  done: boolean
  doneAt?: number
  steps: TaskStep[]
  notes?: string
  lessonId?: string
}

export interface PlannerState {
  tasks: Task[]
  pomodoroMinutes: number
  breakMinutes: number
  remindersEnabled: boolean
  addTask: (t: Omit<Task, 'id' | 'done' | 'steps' | 'date'> & { date?: string; steps?: string[] }) => void
  updateTask: (id: string, patch: Partial<Task>) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
  addStep: (taskId: string, text: string) => void
  toggleStep: (taskId: string, stepId: string) => void
  removeStep: (taskId: string, stepId: string) => void
  moveToToday: (id: string) => void
  setPomodoro: (work: number, rest: number) => void
  setReminders: (on: boolean) => void
  importData: (data: Partial<PlannerState>) => void
  resetAll: () => void
}

const uid = () => Math.random().toString(36).slice(2, 10)

export const usePlanner = create<PlannerState>()(
  persist(
    (set) => ({
      tasks: [],
      pomodoroMinutes: 20,
      breakMinutes: 5,
      remindersEnabled: false,
      addTask: ({ steps = [], date, ...t }) =>
        set((s) => ({
          tasks: [
            ...s.tasks,
            {
              ...t,
              id: uid(),
              date: date ?? todayKey(),
              done: false,
              steps: steps.filter(Boolean).map((text) => ({ id: uid(), text, done: false })),
            },
          ],
        })),
      updateTask: (id, patch) => set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
      removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done, doneAt: !t.done ? Date.now() : undefined } : t)),
        })),
      addStep: (taskId, text) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, steps: [...t.steps, { id: uid(), text, done: false }] } : t)),
        })),
      toggleStep: (taskId, stepId) =>
        set((s) => ({
          tasks: s.tasks.map((t) => {
            if (t.id !== taskId) return t
            const steps = t.steps.map((st) => (st.id === stepId ? { ...st, done: !st.done } : st))
            const allDone = steps.length > 0 && steps.every((st) => st.done)
            return { ...t, steps, done: allDone ? true : t.done, doneAt: allDone && !t.done ? Date.now() : t.doneAt }
          }),
        })),
      removeStep: (taskId, stepId) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, steps: t.steps.filter((st) => st.id !== stepId) } : t)),
        })),
      moveToToday: (id) => set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, date: todayKey() } : t)) })),
      setPomodoro: (work, rest) => set({ pomodoroMinutes: work, breakMinutes: rest }),
      setReminders: (on) => set({ remindersEnabled: on }),
      importData: (data) => set((s) => ({ ...s, ...data })),
      resetAll: () => set({ tasks: [] }),
    }),
    { name: 'naturly-planner', version: 1 },
  ),
)
