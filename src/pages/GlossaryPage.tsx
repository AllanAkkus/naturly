import { useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Bookmark, BookmarkCheck, ChevronDown, Search } from 'lucide-react'
import { GLOSSARY, TERM_BY_ID, type GlossaryTerm } from '@/data/glossary'
import { MODULES, getModule } from '@/content'
import { useProgress } from '@/store/progress'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ReadAloud } from '@/components/ReadAloud'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import { cn } from '@/lib/utils'

export default function GlossaryPage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [module, setModule] = useState<string>('alla')
  const [onlySaved, setOnlySaved] = useState(false)
  const saved = useProgress((s) => s.savedTerms)
  const openId = params.get('term')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY.filter(
      (t) =>
        (module === 'alla' || t.moduleId === module) &&
        (!onlySaved || saved.includes(t.id)) &&
        (!q || t.term.toLowerCase().includes(q) || t.simple.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)),
    )
  }, [query, module, onlySaved, saved])

  const modulesWithTerms = MODULES.filter((m) => GLOSSARY.some((t) => t.moduleId === m.id))

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Ordlista</h1>
        <p className="mt-1 text-muted">{GLOSSARY.length} naturvetenskapliga begrepp. Spara svåra ord – de hamnar då bland dina repetitionskort.</p>
      </header>
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Sök begrepp…" className="pl-9" aria-label="Sök i ordlistan" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={module === 'alla'} onClick={() => setModule('alla')}>
            Alla
          </Chip>
          {modulesWithTerms.map((m) => (
            <Chip key={m.id} active={module === m.id} onClick={() => setModule(m.id)}>
              {m.number}. {m.title}
            </Chip>
          ))}
          <Chip active={onlySaved} onClick={() => setOnlySaved((v) => !v)}>
            <Bookmark className="size-3" /> Sparade ({saved.length})
          </Chip>
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {list.map((t) => (
          <TermCard
            key={t.id}
            term={t}
            open={openId === t.id}
            onToggle={() => setParams(openId === t.id ? {} : { term: t.id }, { replace: true })}
            onOpenRelated={(id) => setParams({ term: id }, { replace: true })}
          />
        ))}
        {list.length === 0 && <p className="text-muted">Inga begrepp hittades.</p>}
      </ul>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn('inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium', active ? 'border-primary bg-primary-soft text-primary' : 'border-border hover:bg-surface-2')}
    >
      {children}
    </button>
  )
}

function TermCard({ term, open, onToggle, onOpenRelated }: { term: GlossaryTerm; open: boolean; onToggle: () => void; onOpenRelated: (id: string) => void }) {
  const { savedTerms, toggleSavedTerm } = useProgress()
  const [showAnswer, setShowAnswer] = useState(false)
  const isSaved = savedTerms.includes(term.id)
  return (
    <li>
      <Card className={cn('overflow-hidden', open && 'ring-2 ring-primary/20')}>
        <div className="flex items-center gap-2 px-4 py-3">
          <button type="button" onClick={onToggle} aria-expanded={open} className="flex flex-1 items-center gap-3 text-left">
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{term.term}</span>
              <span className="block truncate text-sm text-muted">{term.simple}</span>
            </span>
            <ChevronDown className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')} />
          </button>
          <Button variant="ghost" size="icon" onClick={() => toggleSavedTerm(term.id)} aria-pressed={isSaved} aria-label={isSaved ? `Ta bort ${term.term} från sparade` : `Spara ${term.term}`}>
            {isSaved ? <BookmarkCheck className="text-primary" /> : <Bookmark />}
          </Button>
        </div>
        {open && (
          <div className="space-y-3 border-t border-border px-4 py-4 text-[0.95rem]">
            <Section title="För nybörjare">{term.simple}</Section>
            <Section title="Vetenskaplig definition">{term.definition}</Section>
            {term.analogy && <Section title="Vardagsliknelse">{term.analogy}</Section>}
            <ReadAloud text={[term.term, term.simple, term.definition]} />
            {term.visual && (
              <div className="rounded-2xl bg-surface-2/60 p-3">
                <VisualRenderer spec={term.visual} />
              </div>
            )}
            <div className="rounded-2xl bg-primary-soft/60 p-3 text-sm">
              <strong>Testa dig själv:</strong> {term.question.prompt}
              {showAnswer ? (
                <p className="mt-1">
                  <strong>Svar:</strong> {term.question.answer}
                </p>
              ) : (
                <Button size="sm" variant="ghost" onClick={() => setShowAnswer(true)} className="ml-1">
                  Visa svar
                </Button>
              )}
            </div>
            {term.related.filter((r) => TERM_BY_ID.has(r)).length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 text-sm">
                <span className="text-muted">Relaterat:</span>
                {term.related
                  .filter((r) => TERM_BY_ID.has(r))
                  .map((r) => (
                    <button key={r} type="button" onClick={() => onOpenRelated(r)} className="rounded-full bg-surface-2 px-2.5 py-0.5 hover:bg-primary-soft">
                      {TERM_BY_ID.get(r)!.term}
                    </button>
                  ))}
              </div>
            )}
            <p className="text-xs text-muted">Modul {getModule(term.moduleId)?.number}</p>
          </div>
        )}
      </Card>
    </li>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
      <p>{children}</p>
    </div>
  )
}
