/* Uppläsning med webbläsarens inbyggda talsyntes (Web Speech API).
 * Ingen text skickas till någon server.
 */

const SPEAKABLE: Array<[RegExp, string]> = [
  [/²⁺/g, ' två plus'],
  [/³⁺/g, ' tre plus'],
  [/²⁻/g, ' två minus'],
  [/³⁻/g, ' tre minus'],
  [/⁺/g, ' plus'],
  [/⁻/g, ' minus'],
  [/−/g, ' minus '],
  [/→/g, ' blir '],
  [/≈/g, ' ungefär '],
  [/·/g, ' gånger '],
]

export function speakableText(text: string) {
  let t = text
  for (const [re, rep] of SPEAKABLE) t = t.replace(re, rep)
  return t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c))).replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(c)))
}

export function speechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function swedishVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  return voices.find((v) => v.lang === 'sv-SE') ?? voices.find((v) => v.lang.startsWith('sv'))
}

export function speak(text: string, rate = 1, onEnd?: () => void) {
  if (!speechSupported()) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(speakableText(text))
  u.lang = 'sv-SE'
  u.rate = rate
  const v = swedishVoice()
  if (v) u.voice = v
  if (onEnd) {
    u.onend = onEnd
    u.onerror = onEnd
  }
  window.speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if (speechSupported()) window.speechSynthesis.cancel()
}
