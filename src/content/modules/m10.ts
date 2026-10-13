import { defineModule } from '../builders'
import { m10a } from './m10a'
import { m10b } from './m10b'

export const module10 = defineModule(
  {
    id: 'm10',
    number: 10,
    title: 'Evolution och artbildning',
    subtitle: 'Hur livet förändras och hur nya arter bildas',
    description:
      'Allt liv på jorden har utvecklats från gemensamma förfäder. Du lär dig vad evolution och naturligt urval är, var variationen kommer ifrån, hur anpassningar och nya arter uppstår, hur jämförande anatomi, fossil och DNA visar släktskap och hur människan har utvecklats.',
    icon: 'Bird',
    tone: 'blue',
    part: 'evolution',
    areas: ['kropp'],
    status: 'complete',
    core: true,
    curriculum: ['artbildning', 'anatomi'],
  },
  [...m10a, ...m10b],
)
