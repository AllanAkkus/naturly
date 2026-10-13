import { defineModule } from '../builders'
import { m3a } from './m03a'
import { m3b } from './m03b'

export const module3 = defineModule(
  {
    id: 'm3',
    number: 3,
    title: 'Kemi i vardagen',
    subtitle: 'Ämnen, lösningar, syror, baser och kemikalier omkring oss',
    description:
      'Grundämnen och föreningar, blandningar, organisk och oorganisk kemi, vatten och lösningar, syror, baser och pH, reaktioner i vardagen, industrins kemikalier och hur ämnen påverkar miljön. Innehåller centralt innehåll om organiska och oorganiska ämnen och om hur ämnen används och påverkar miljön.',
    icon: 'FlaskConical',
    tone: 'pink',
    part: 'kemi',
    areas: ['natur'],
    status: 'complete',
    core: false,
    curriculum: ['org-oorg'],
  },
  [...m3a, ...m3b],
)
