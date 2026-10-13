import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <p className="text-5xl" aria-hidden>
        🔭
      </p>
      <h1 className="text-2xl font-semibold">Sidan finns inte</h1>
      <p className="text-muted">Den här sidan kunde vi inte hitta. Det är inte ditt fel!</p>
      <Button asChild>
        <Link to="/">Till startsidan</Link>
      </Button>
    </div>
  )
}
