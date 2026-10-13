import { create } from 'zustand'

/** Vad eleven arbetar med just nu – används av AI-läraren och "Jag är överväldigad". Sparas inte. */
export interface LearningContextState {
  moduleTitle?: string
  lessonId?: string
  lessonTitle?: string
  lessonGoal?: string
  summary?: string[]
  simple?: string[]
  currentQuestion?: string
  page?: string
  set: (patch: Partial<Omit<LearningContextState, 'set' | 'clear'>>) => void
  clear: () => void
}

export const useLearningContext = create<LearningContextState>((set) => ({
  set: (patch) => set(patch),
  clear: () =>
    set({ moduleTitle: undefined, lessonId: undefined, lessonTitle: undefined, lessonGoal: undefined, summary: undefined, simple: undefined, currentQuestion: undefined }),
}))
