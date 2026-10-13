import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarClock, PartyPopper, RotateCw } from 'lucide-react'
import { conceptLabel, getFlashcard } from '@/content'
import { TERM_BY_ID } from '@/data/glossary'
import { useProgress } from '@/store/progress'
import { dueLabel, isDue, type ReviewGrade } from '@/lib/srs'
import { masteryStatus } from '@/lib/mastery'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ReadAloud } from '@/components/ReadAloud'
import { RichText } from '@/components/RichText'
import { useSettings } from '@/store/settings'

export function resolveCard(id: string): { front: string; back: string; source: string; link?: string } | null {
  if (id.startsWith('term-')) {
    const t = TERM_BY_ID.get(id.slice(5))
    return t ? { front: `Vad betyder "${t.term}"?`, back: `${t.simple} ${t.definition}`, source: 'Ordlistan', link: `/ordlista?term=${t.id}` } : null
  }
  const f = getFlashcard(id)
  return f ? { front: f.front, back: f.back, source: conceptLabel(f.lessonId), link: `/lektion/${f.lessonId}` } : null
}

const GRADES: Array<{ grade: ReviewGrade; label: string; hint: string; variant: 'danger' | 'outline' | 'soft' | 'default' }> = [
  { grade: 'again', label: 'Igen', hint: 'Visas snart igen', variant: 'danger' },
  { grade: 'hard', label: 'Svårt', hint: 'Lite kortare intervall', variant: 'outline' },
  { grade: 'good', label: 'Bra', hint: 'Nästa steg', variant: 'soft' },
  { grade: 'easy', label: 'Lätt', hint: 'Hoppa fram', variant: 'default' },
]

export function ReviewDeck({ limit, onDone }: { limit?: number; onDone?: () => void }) {
  const { cards, reviewCard } = useProgress()
  const reducedMotion = useSettings((s) => s.reducedMotion)
  const [queue] = useState(() =>
    Object.entries(cards)
      .filter(([, c]) => isDue(c))
      .sort((a, b) => a[1].due - b[1].due)
      .map(([id]) => id)
      .filter((id) => resolveCard(id))
      .slice(0, limit ?? 50),
  )
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const id = queue[i]
  const card = id ? resolveCard(id) : null

  if (queue.length === 0 || !card)
    return (
      <Card className="flex flex-col items-center gap-3 p-8 text-center">
        <PartyPopper className="size-10 text-primary" />
        <p className="text-lg font-semibold">{queue.length === 0 ? 'Inga kort att repetera just nu!' : 'Klart för idag! 🌟'}</p>
        <p className="text-sm text-muted">Kort läggs till när du klarar lektioner eller sparar ord i ordlistan.</p>
        {onDone && <Button onClick={onDone}>Fortsätt</Button>}
      </Card>
    )

  const grade = (g: ReviewGrade) => {
    reviewCard(id, g)
    setFlipped(false)
    if (i + 1 >= queue.length) onDone?.()
    setI(i + 1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>
          Kort {i + 1} av {queue.length}
        </span>
        <Progress value={(i / queue.length) * 100} />
      </div>
      <motion.button
        key={id + String(flipped)}
        type="button"
        initial={reducedMotion ? false : { rotateX: 70, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-56 w-full flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-surface p-8 text-center shadow-sm"
        aria-label={flipped ? `Svar: ${card.back}` : `Fråga: ${card.front}. Tryck för att visa svaret.`}
      >
        <span className="text-xs uppercase tracking-wide text-muted">{flipped ? 'Svar' : 'Fråga'}</span>
        <span className="text-xl leading-relaxed">
          <RichText text={flipped ? card.back : card.front} />
        </span>
        {!flipped && <span className="text-xs text-muted">Tänk på svaret – tryck sedan för att vända kortet</span>}
      </motion.button>
      <div className="flex items-center justify-between text-xs text-muted">
        {card.link ? (
          <Link to={card.link} className="hover:text-primary">
            Från: {card.source}
          </Link>
        ) : (
          <span>{card.source}</span>
        )}
        <ReadAloud text={flipped ? card.back : card.front} />
      </div>
      {flipped ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {GRADES.map((g) => (
            <Button key={g.grade} variant={g.variant} onClick={() => grade(g.grade)} className="h-auto flex-col py-2.5">
              <span>{g.label}</span>
              <span className="text-[0.7rem] font-normal opacity-75">{g.hint}</span>
            </Button>
          ))}
        </div>
      ) : (
        <Button size="lg" onClick={() => setFlipped(true)}>
          <RotateCw /> Visa svaret
        </Button>
      )}
    </div>
  )
}

export default function ReviewPage() {
  const { cards, concepts } = useProgress()
  const [round, setRound] = useState(0)
  const now = Date.now()
  const upcoming = useMemo(
    () =>
      Object.entries(cards)
        .filter(([, c]) => !isDue(c, now))
        .sort((a, b) => a[1].due - b[1].due)
        .slice(0, 6),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cards, round],
  )
  const weak = Object.entries(concepts)
    .filter(([, s]) => masteryStatus(s, now) === 'needs-review')
    .slice(0, 8)
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Repetera</h1>
        <p className="mt-1 text-muted">Utspridd repetition: kort kommer tillbaka samma dag, i morgon, om 3, 7 och 14 dagar – oftare om något är svårt.</p>
      </header>
      <ReviewDeck key={round} onDone={() => setRound((r) => r + 1)} />
      {weak.length > 0 && (
        <Card className="p-5">
          <h2 className="mb-2 font-semibold">Begrepp som är bra att titta på igen</h2>
          <div className="flex flex-wrap gap-2">
            {weak.map(([c]) => (
              <Link key={c} to={`/lektion/${c}`} className="rounded-full bg-pink-soft px-3 py-1 text-sm hover:opacity-80">
                {conceptLabel(c)}
              </Link>
            ))}
          </div>
        </Card>
      )}
      {upcoming.length > 0 && (
        <Card className="p-5">
          <h2 className="mb-2 flex items-center gap-2 font-semibold">
            <CalendarClock className="size-5 text-primary" /> Kommande repetitioner
          </h2>
          <ul className="space-y-1 text-sm">
            {upcoming.map(([id, c]) => (
              <li key={id} className="flex justify-between gap-3">
                <span className="truncate">{resolveCard(id)?.front}</span>
                <span className="shrink-0 text-muted">{dueLabel(c, now)}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
