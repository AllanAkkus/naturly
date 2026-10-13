import { Link } from 'react-router-dom'
import { Atom, Check, ShieldAlert } from 'lucide-react'
import { SIMULATION_LIST } from '@/components/lab/registry'
import { getModule } from '@/content'
import { useProgress } from '@/store/progress'
import { Card } from '@/components/ui/card'

export default function LabPage() {
  const done = useProgress((s) => s.labsDone)
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Labbet</h1>
        <p className="mt-1 max-w-2xl text-muted">Säkra simuleringar i webbläsaren. Experimentera fritt – här kan ingenting gå sönder.</p>
      </header>
      <div className="flex gap-3 rounded-3xl bg-amber-soft p-4 text-sm">
        <ShieldAlert className="mt-0.5 size-5 shrink-0" />
        <p>
          Simuleringarna är förenklade modeller och inte riktiga laborationer. Gör aldrig kemiska experiment hemma med ämnen som syror, baser, natrium eller klor. Riktiga
          laborationer görs i skolan med skyddsutrustning och en lärare.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/atombyggaren" className="group">
          <Card className="h-full p-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
            <div className="flex items-center justify-between">
              <Atom className="size-8 text-primary" />
              {done.includes('atom-builder') && <Check className="size-5 text-green" />}
            </div>
            <h2 className="mt-3 font-semibold group-hover:text-primary">Atombyggaren</h2>
            <p className="mt-1 text-sm text-muted">Bygg atomer, isotoper och joner med protoner, neutroner och elektroner.</p>
            <p className="mt-2 text-xs text-muted">Kapitel 1–2</p>
          </Card>
        </Link>
        {SIMULATION_LIST.map((s) => (
          <Link key={s.id} to={`/labb/${s.id}`} className="group">
            <Card className="h-full p-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden>
                  {s.icon}
                </span>
                {done.includes(s.id) && <Check className="size-5 text-green" aria-label="Genomförd" />}
              </div>
              <h2 className="mt-3 font-semibold group-hover:text-primary">{s.title}</h2>
              <p className="mt-1 text-sm text-muted">{s.goal}</p>
              <p className="mt-2 text-xs text-muted">
                Kapitel {getModule(s.moduleId)?.number ?? '–'}: {getModule(s.moduleId)?.title ?? ''}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
