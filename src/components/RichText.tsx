import katex from 'katex'
import { Fragment, useMemo } from 'react'

/** Tolkar **fetstil** och $KaTeX$ i innehållstexter. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = useMemo(() => parse(text), [text])
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.type === 'tex' ? (
          <span key={i} dangerouslySetInnerHTML={{ __html: renderTex(p.value) }} />
        ) : p.type === 'bold' ? (
          <strong key={i} className="font-semibold">
            {p.value}
          </strong>
        ) : (
          <Fragment key={i}>{p.value}</Fragment>
        ),
      )}
    </span>
  )
}

export function Tex({ tex, display = false }: { tex: string; display?: boolean }) {
  return <span dangerouslySetInnerHTML={{ __html: renderTex(tex, display) }} />
}

function renderTex(tex: string, display = false) {
  try {
    return katex.renderToString(tex, { throwOnError: false, displayMode: display, output: 'htmlAndMathml' })
  } catch {
    return tex
  }
}

type Part = { type: 'text' | 'tex' | 'bold'; value: string }

function parse(text: string): Part[] {
  const out: Part[] = []
  const re = /\$([^$]+)\$|\*\*([^*]+)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ type: 'text', value: text.slice(last, m.index) })
    if (m[1] !== undefined) out.push({ type: 'tex', value: m[1] })
    else out.push({ type: 'bold', value: m[2] })
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ type: 'text', value: text.slice(last) })
  return out
}

/** Text utan KaTeX/markdown, för uppläsning. */
export function plainText(text: string) {
  return text
    .replace(/\$[^$]*\\mathrm\{([A-Za-z]+)\}[^$]*\$/g, '$1')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/\*\*/g, '')
}
