import { defineModule } from '../builders'
import { m9a } from './m09a'
import { m9b } from './m09b'

export const module9 = defineModule(
  {
    id: 'm9',
    number: 9,
    title: 'Fysisk och psykisk hälsa',
    subtitle: 'Vad hälsa är, vad som påverkar den och hur sjukdom förebyggs och behandlas',
    description:
      'Hälsa handlar om kropp, psyke och relationer. Du lär dig vad kroppen behöver i form av mat, rörelse och sömn, vad psykisk ohälsa är och var man får hjälp, hur livsstilssjukdomar uppstår, hur sjukdom kan förebyggas och hur läkemedel fungerar och testas.',
    icon: 'HeartPulse',
    tone: 'green',
    part: 'kropp',
    areas: ['kropp', 'omvarld'],
    status: 'complete',
    core: true,
    curriculum: ['halsa', 'forebygg'],
  },
  [...m9a, ...m9b],
)
