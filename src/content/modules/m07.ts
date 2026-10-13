import { defineModule } from '../builders'
import { m7a } from './m07a'
import { m7b } from './m07b'

export const module7 = defineModule(
  {
    id: 'm7',
    number: 7,
    title: 'Hormonsystemet',
    subtitle: 'Kroppens kemiska budbärare och hur kroppen håller balansen',
    description:
      'Hormoner är kemiska budskap som skickas med blodet. Du lär dig vilka hormonkörtlar som finns, hur hjärnan styr dem, hur kroppen håller temperatur, vätska och blodsocker i balans med negativ återkoppling, vad diabetes är och hur stress- och könshormoner påverkar oss.',
    icon: 'Droplets',
    tone: 'pink',
    part: 'kropp',
    areas: ['kropp'],
    status: 'complete',
    core: true,
    curriculum: ['hormon', 'reglering'],
  },
  [...m7a, ...m7b],
)
