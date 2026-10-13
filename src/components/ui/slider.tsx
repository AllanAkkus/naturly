import * as SliderPrimitive from '@radix-ui/react-slider'

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
}: {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  label: string
}) {
  return (
    <SliderPrimitive.Root
      className="relative flex h-6 w-full touch-none select-none items-center"
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(v) => onChange(v[0])}
    >
      <SliderPrimitive.Track className="relative h-2 grow overflow-hidden rounded-full bg-surface-2">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={label}
        className="block size-5 cursor-grab rounded-full border-2 border-primary bg-surface shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
      />
    </SliderPrimitive.Root>
  )
}
