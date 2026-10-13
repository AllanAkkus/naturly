import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useLearningContext } from '@/store/context'
import { useProgress } from '@/store/progress'
import { useSettings } from '@/store/settings'
import { RichText } from '@/components/RichText'
import { ReadAloud } from '@/components/ReadAloud'
import { ALL_LESSONS } from '@/content'

/**
 * "Jag är överväldigad": förenklar allt till ett enda litet steg.
 * Inga krav, ingen stress – bara en sak i taget.
 */
export function OverwhelmedDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const ctx = useLearningContext()
  const lessons = useProgress((s) => s.lessons)
  const reduced = useSettings((s) => s.reducedMotion)
  const navigate = useNavigate()
  const [mode, setMode] = useState<'choose' | 'breathe' | 'one-step'>('choose')
  const [sentence, setSentence] = useState(0)

  useEffect(() => {
    if (open) {
      setMode('choose')
      setSentence(0)
    }
  }, [open])

  const sentences = ctx.simple ?? []
  const nextLesson = ALL_LESSONS.find((l) => lessons[l.id]?.status !== 'completed')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Det är okej. Vi tar det lugnt. 💜</DialogTitle>
        <DialogDescription className="mt-1">Du behöver inte göra allt nu. Välj en enda liten sak.</DialogDescription>

        {mode === 'choose' && (
          <div className="mt-5 flex flex-col gap-2">
            <Button variant="soft" size="lg" className="justify-start" onClick={() => setMode('breathe')}>
              🌬️ Andas lugnt i en minut
            </Button>
            {sentences.length > 0 ? (
              <Button variant="soft" size="lg" className="justify-start" onClick={() => setMode('one-step')}>
                🌱 Visa bara en mening från lektionen
              </Button>
            ) : (
              nextLesson && (
                <Button
                  variant="soft"
                  size="lg"
                  className="justify-start"
                  onClick={() => {
                    onOpenChange(false)
                    navigate(`/studera/5`)
                  }}
                >
                  🌱 Gör bara 5 minuter repetition
                </Button>
              )
            )}
            <Button
              variant="soft"
              size="lg"
              className="justify-start"
              onClick={() => {
                onOpenChange(false)
                useSettings.getState().set({ focusMode: true })
              }}
            >
              🧘 Dölj allt extra (fokusläge)
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => onOpenChange(false)}>
              Jag vill bara stänga det här en stund
            </Button>
            <p className="mt-2 text-sm text-muted">Att ta pauser är en del av att lära sig. Du gör framsteg även när det känns segt.</p>
          </div>
        )}

        {mode === 'breathe' && (
          <div className="mt-6 flex flex-col items-center gap-5">
            <motion.div
              className="flex size-36 items-center justify-center rounded-full bg-primary-soft text-sm font-medium text-primary"
              animate={reduced ? undefined : { scale: [1, 1.35, 1.35, 1] }}
              transition={{ duration: 12, times: [0, 0.33, 0.5, 1], repeat: Infinity, ease: 'easeInOut' }}
            >
              Andas in… och ut
            </motion.div>
            <p className="text-center text-sm text-muted">Andas in i 4 sekunder, håll i 2, andas ut i 6. Följ cirkeln.</p>
            <Button variant="outline" onClick={() => setMode('choose')}>
              Klar
            </Button>
          </div>
        )}

        {mode === 'one-step' && sentences.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            <p className="text-xs text-muted">{ctx.lessonTitle}</p>
            <p className="text-xl leading-relaxed">
              <RichText text={sentences[sentence]} />
            </p>
            <ReadAloud text={sentences[sentence]} />
            <div className="flex flex-wrap gap-2">
              {sentence + 1 < sentences.length ? (
                <Button onClick={() => setSentence((s) => s + 1)}>Okej, nästa lilla steg</Button>
              ) : (
                <Button onClick={() => onOpenChange(false)}>Bra! Det räcker för nu 💜</Button>
              )}
              <Button variant="ghost" onClick={() => setMode('choose')}>
                Tillbaka
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
