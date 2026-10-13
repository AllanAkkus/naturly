import { useEffect, useState } from 'react'
import { Volume2, Square } from 'lucide-react'
import { speak, speechSupported, stopSpeaking } from '@/lib/speech'
import { useSettings } from '@/store/settings'
import { plainText } from './RichText'
import { cn } from '@/lib/utils'

/** Knapp som läser upp en text på svenska. Visas bara om uppläsning är påslagen. */
export function ReadAloud({ text, className, label = 'Läs upp' }: { text: string | string[]; className?: string; label?: string }) {
  const { readAloud, speechRate } = useSettings()
  const [speaking, setSpeaking] = useState(false)
  useEffect(() => () => stopSpeaking(), [])
  if (!readAloud || !speechSupported()) return null
  const full = plainText(Array.isArray(text) ? text.join(' ') : text)
  return (
    <button
      type="button"
      onClick={() => {
        if (speaking) {
          stopSpeaking()
          setSpeaking(false)
        } else {
          setSpeaking(true)
          speak(full, speechRate, () => setSpeaking(false))
        }
      }}
      className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-muted hover:bg-surface-2 hover:text-foreground', className)}
      aria-label={speaking ? 'Sluta läsa upp' : label}
    >
      {speaking ? <Square className="size-3.5" /> : <Volume2 className="size-3.5" />}
      {speaking ? 'Stopp' : label}
    </button>
  )
}
