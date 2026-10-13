import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  /** Bilder som data-URL:er (bara i uppgiftshjälpen). Sparas inte permanent. */
  images?: string[]
  t: number
  error?: boolean
}

export interface TutorState {
  open: boolean
  messages: ChatMessage[]
  /** En fråga som ska skickas direkt när panelen öppnas (t.ex. från en lektion). */
  pendingPrompt?: string
  setOpen: (open: boolean) => void
  ask: (prompt: string) => void
  consumePending: () => string | undefined
  add: (m: Omit<ChatMessage, 'id' | 't'>) => string
  update: (id: string, patch: Partial<ChatMessage>) => void
  clear: () => void
}

const uid = () => Math.random().toString(36).slice(2, 10)

export const useTutor = create<TutorState>()(
  persist(
    (set, get) => ({
      open: false,
      messages: [],
      pendingPrompt: undefined,
      setOpen: (open) => set({ open }),
      ask: (prompt) => set({ open: true, pendingPrompt: prompt }),
      consumePending: () => {
        const p = get().pendingPrompt
        if (p) set({ pendingPrompt: undefined })
        return p
      },
      add: (m) => {
        const id = uid()
        set((s) => ({ messages: [...s.messages, { ...m, id, t: Date.now() }].slice(-80) }))
        return id
      },
      update: (id, patch) => set((s) => ({ messages: s.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)) })),
      clear: () => set({ messages: [] }),
    }),
    {
      name: 'naturly-tutor',
      version: 1,
      // Spara inte bilder eller öppet/stängt-läge
      partialize: (s) => ({ messages: s.messages.map(({ images: _images, ...m }) => m) }),
    },
  ),
)
