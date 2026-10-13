import { defineModule } from '../builders'
import { m2a } from './m02a'
import { m2b } from './m02b'

export const module2 = defineModule(
  {
    id: 'm2',
    number: 2,
    title: 'Periodiska systemet',
    subtitle: 'Läs periodiska systemet som en karta',
    description:
      'Lär dig hitta grundämnen, förstå perioder och grupper, skilja på metaller och ickemetaller, förutsäga jonladdningar och läsa isotopbeteckningar. Stödkunskap för materians uppbyggnad och för organiska och oorganiska ämnen.',
    icon: 'Grid3x3',
    tone: 'blue',
    part: 'kemi',
    areas: ['natur'],
    status: 'complete',
    core: false,
    curriculum: ['materia', 'org-oorg'],
  },
  [...m2a, ...m2b],
)
