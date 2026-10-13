// Röktest i en riktig webbläsare (Microsoft Edge via playwright-core).
// Användning: node scripts/smoke.mjs [baseUrl] [screenshotDir]
// Besöker alla sidor, rapporterar konsolfel och sparar skärmbilder.
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const base = process.argv[2] ?? 'http://localhost:5173'
const outDir = process.argv[3] ?? 'smoke-shots'
fs.mkdirSync(outDir, { recursive: true })

const routes = (process.env.ROUTES ?? '/,/kurs,/modul/m1,/lektion/m1-l10,/lektion/m1-test,/periodiska-systemet,/periodiska-systemet?z=26,/atombyggaren,/labb,/labb/ph,/labb/blood-sugar,/ova,/repetera,/ordlista,/uppgiftshjalp,/planering,/framsteg,/installningar,/egna-ord,/studera/5,/finns-inte').split(',')
const widths = (process.env.WIDTHS ?? '1366,390').split(',').map(Number)

const browser = await chromium.launch({ channel: 'msedge', headless: true })
let failures = 0
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`))
  for (const r of routes) {
    errors.length = 0
    await page.goto(base + r, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    const name = `${width}-${r.replace(/[^a-z0-9]+/gi, '_') || 'home'}.png`
    if (process.env.SHOTS !== '0') await page.screenshot({ path: path.join(outDir, name), fullPage: process.env.FULL === '1' })
    const problems = [...errors]
    if (overflow > 1) problems.push(`horisontell scroll: ${overflow}px`)
    if (problems.length) failures++
    console.log(`${problems.length ? '✗' : '✓'} ${width}px ${r}${problems.length ? '\n    ' + problems.join('\n    ') : ''}`)
  }
  await page.close()
}
await browser.close()
process.exit(failures ? 1 : 0)
