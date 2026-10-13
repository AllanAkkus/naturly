import { defineModule } from '../builders'
import { m1a } from './m01a'
import { m1b } from './m01b'
import { m1c } from './m01c'

export const module1 = defineModule(
  {
    id: 'm1',
    number: 1,
    title: 'Atomer och materia',
    subtitle: 'Från "vad är materia?" till joner, bindningar och reaktioner',
    description:
      'Grunden för hela kursen. Du lär dig vad atomer består av, hur man räknar protoner, neutroner och elektroner, vad isotoper och joner är och hur atomer binds ihop. Stödkunskap för det centrala innehållet om materians uppkomst och om organiska och oorganiska ämnen.',
    icon: 'Atom',
    tone: 'lavender',
    part: 'kemi',
    areas: ['natur'],
    status: 'complete',
    core: false,
    curriculum: ['materia'],
  },
  [...m1a, ...m1b, ...m1c],
)
