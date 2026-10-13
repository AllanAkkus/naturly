import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ExplanationMode = 'superenkelt' | 'mat' | 'steg' | 'visa' | 'vanlig' | 'provsvar' | 'forhor'
export type Level = 'nyborjare' | 'mellan' | 'avancerad'
export type Theme = 'light' | 'dark' | 'system'

export const EXPLANATION_MODES: Record<ExplanationMode, { label: string; description: string; emoji: string }> = {
  superenkelt: { label: 'Superenkelt', description: 'Få och vanliga ord, konkreta exempel.', emoji: '🌱' },
  mat: { label: 'Med mat', description: 'Förklaringar med mat, köttbullar och restauranger.', emoji: '🍝' },
  steg: { label: 'Steg för steg', description: 'Ett litet steg i taget.', emoji: '🪜' },
  visa: { label: 'Visa mig', description: 'Bilder, scheman och diagram.', emoji: '🖼️' },
  vanlig: { label: 'Vanlig förklaring', description: 'Normal naturvetenskaplig förklaring.', emoji: '📘' },
  provsvar: { label: 'Provsvar', description: 'Formell och korrekt svenska, som på ett prov.', emoji: '📝' },
  forhor: { label: 'Förhör mig', description: 'Läraren ställer frågor till dig.', emoji: '🎯' },
}

export const LEVEL_LABELS: Record<Level, string> = {
  nyborjare: 'Nybörjare',
  mellan: 'Mellannivå',
  avancerad: 'Avancerad',
}

export interface SettingsState {
  theme: Theme
  textScale: number
  dyslexiaFont: boolean
  wideSpacing: boolean
  reducedMotion: boolean
  highContrast: boolean
  focusMode: boolean
  oneQuestionAtATime: boolean
  readAloud: boolean
  speechRate: number
  explanationMode: ExplanationMode
  level: Level
  nickname: string
  shareProgressWithAI: boolean
  preferredAnalogies: string[]
  onboarded: boolean
  set: (patch: Partial<Omit<SettingsState, 'set' | 'reset'>>) => void
  reset: () => void
}

const defaults = {
  theme: 'system' as Theme,
  textScale: 1,
  dyslexiaFont: false,
  wideSpacing: false,
  reducedMotion: false,
  highContrast: false,
  focusMode: false,
  oneQuestionAtATime: true,
  readAloud: true,
  speechRate: 0.95,
  explanationMode: 'superenkelt' as ExplanationMode,
  level: 'nyborjare' as Level,
  nickname: 'hjärtat',
  shareProgressWithAI: true,
  preferredAnalogies: ['mat', 'vardag'],
  onboarded: false,
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      set: (patch) => set(patch),
      reset: () => set(defaults),
    }),
    { name: 'naturly-settings', version: 1 },
  ),
)
