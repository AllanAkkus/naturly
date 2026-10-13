import type { ReactNode } from 'react'
import { EXPLANATION_MODES, LEVEL_LABELS, useSettings, type ExplanationMode, type Level, type Theme } from '@/store/settings'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { speak, speechSupported } from '@/lib/speech'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const s = useSettings()
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Inställningar</h1>
        <p className="mt-1 text-muted">Anpassa Naturly efter hur du lär dig bäst. Allt sparas bara i den här webbläsaren.</p>
      </header>

      <Card className="flex flex-col gap-4 p-5">
        <h2 className="font-semibold">Om dig</h2>
        <label className="text-sm">
          <span className="mb-1 block font-medium">Vad vill du kallas?</span>
          <Input value={s.nickname} onChange={(e) => s.set({ nickname: e.target.value.slice(0, 30) })} placeholder="t.ex. hjärtat" />
        </label>
        <div>
          <p className="mb-2 text-sm font-medium">Nivå</p>
          <Choice options={LEVEL_LABELS} value={s.level} onChange={(v) => s.set({ level: v as Level })} />
          <p className="mt-1 text-xs text-muted">Påverkar AI-lärarens förklaringar och var quizar börjar.</p>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Förklaringsläge som standard</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {(Object.keys(EXPLANATION_MODES) as ExplanationMode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={s.explanationMode === m}
                onClick={() => s.set({ explanationMode: m })}
                className={cn('rounded-2xl border p-3 text-left text-sm', s.explanationMode === m ? 'border-primary bg-primary-soft' : 'border-border hover:bg-surface-2')}
              >
                <span className="font-medium">
                  {EXPLANATION_MODES[m].emoji} {EXPLANATION_MODES[m].label}
                </span>
                <span className="block text-xs text-muted">{EXPLANATION_MODES[m].description}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="flex flex-col gap-4 p-5">
        <h2 className="font-semibold">Utseende och läsbarhet</h2>
        <div>
          <p className="mb-2 text-sm font-medium">Tema</p>
          <Choice options={{ light: 'Ljust', dark: 'Mörkt', system: 'Som datorn' }} value={s.theme} onChange={(v) => s.set({ theme: v as Theme })} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Textstorlek: {Math.round(s.textScale * 100)} %</p>
          <Slider value={s.textScale} min={0.85} max={1.5} step={0.05} onChange={(v) => s.set({ textScale: v })} label="Textstorlek" />
        </div>
        <Toggle id="dys" label="Lättläst typsnitt (Lexend)" desc="Ett typsnitt utformat för att vara lätt att läsa." checked={s.dyslexiaFont} onChange={(v) => s.set({ dyslexiaFont: v })} />
        <Toggle id="space" label="Större avstånd mellan bokstäver och rader" desc="Kan hjälpa vid dyslexi och läströtthet." checked={s.wideSpacing} onChange={(v) => s.set({ wideSpacing: v })} />
        <Toggle id="hc" label="Hög kontrast" checked={s.highContrast} onChange={(v) => s.set({ highContrast: v })} />
        <Toggle id="motion" label="Minska rörelser" desc="Stänger av animationer." checked={s.reducedMotion} onChange={(v) => s.set({ reducedMotion: v })} />
      </Card>

      <Card className="flex flex-col gap-4 p-5">
        <h2 className="font-semibold">Fokus</h2>
        <Toggle id="focus" label="Fokusläge" desc="Döljer menyer och extra rutor. Kan också slås på med knappen uppe till höger." checked={s.focusMode} onChange={(v) => s.set({ focusMode: v })} />
        <Toggle id="oneq" label="En fråga i taget" desc="Visar övningsfrågor en och en i stället för alla samtidigt." checked={s.oneQuestionAtATime} onChange={(v) => s.set({ oneQuestionAtATime: v })} />
      </Card>

      <Card className="flex flex-col gap-4 p-5">
        <h2 className="font-semibold">Uppläsning</h2>
        {speechSupported() ? (
          <>
            <Toggle id="tts" label="Visa knappar för uppläsning" desc="Texter kan läsas upp med webbläsarens svenska röst." checked={s.readAloud} onChange={(v) => s.set({ readAloud: v })} />
            <div>
              <p className="mb-2 text-sm font-medium">Talhastighet: {s.speechRate.toFixed(2)}×</p>
              <Slider value={s.speechRate} min={0.6} max={1.4} step={0.05} onChange={(v) => s.set({ speechRate: v })} label="Talhastighet" />
            </div>
            <Button variant="outline" size="sm" className="self-start" onClick={() => speak('Hej! Så här låter uppläsningen. En proton är positivt laddad.', s.speechRate)}>
              Testa rösten
            </Button>
            <p className="text-xs text-muted">Om rösten inte låter svensk kan du installera en svensk röst i datorns eller mobilens inställningar.</p>
          </>
        ) : (
          <p className="text-sm text-muted">Din webbläsare stöder inte uppläsning.</p>
        )}
      </Card>

      <Card className="flex flex-col gap-4 p-5">
        <h2 className="font-semibold">Integritet</h2>
        <Toggle
          id="share"
          label="Låt AI-läraren se mina framsteg"
          desc="Då skickas namnen på begrepp du behöver repetera och dina senaste svar (rätt/fel) med dina frågor, så att förklaringarna kan anpassas. Inget annat skickas."
          checked={s.shareProgressWithAI}
          onChange={(v) => s.set({ shareProgressWithAI: v })}
        />
        <p className="text-xs text-muted">Frågor till AI-läraren skickas via Naturlys server till OpenAI. Skriv aldrig personnummer eller andra känsliga uppgifter i chatten.</p>
      </Card>

      <Button variant="ghost" className="self-start" onClick={s.reset}>
        Återställ inställningarna
      </Button>
    </div>
  )
}

function Toggle({ id, label, desc, checked, onChange }: { id: string; label: string; desc?: ReactNode; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <label htmlFor={id} className="text-sm">
        <span className="font-medium">{label}</span>
        {desc && <span className="block text-xs text-muted">{desc}</span>}
      </label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  )
}

function Choice({ options, value, onChange }: { options: Record<string, string>; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {Object.entries(options).map(([k, label]) => (
        <button
          key={k}
          type="button"
          role="radio"
          aria-checked={value === k}
          onClick={() => onChange(k)}
          className={cn('rounded-xl border px-3.5 py-2 text-sm', value === k ? 'border-primary bg-primary-soft font-medium text-primary' : 'border-border hover:bg-surface-2')}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
