import { defineModule } from '../builders'
import { m6a } from './m06a'
import { m6b } from './m06b'

export const module6 = defineModule(
  {
    id: 'm6',
    number: 6,
    title: 'Nervsystemet',
    subtitle: 'Hur hjärnan och nerverna skickar signaler genom kroppen',
    description:
      'Nervsystemet är kroppens snabba signalsystem. Du lär dig hur nervceller är byggda, hur en elektrisk signal uppstår och färdas, hur den hoppar över synapser, vad hjärnans delar gör, hur reflexer och sinnen fungerar och hur droger påverkar hjärnan.',
    icon: 'Brain',
    tone: 'lavender',
    part: 'kropp',
    areas: ['kropp'],
    status: 'complete',
    core: true,
    curriculum: ['nerv', 'reglering'],
  },
  [...m6a, ...m6b],
)
