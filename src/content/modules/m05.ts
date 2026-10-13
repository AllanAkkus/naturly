import { defineModule } from '../builders'
import { m5a } from './m05a'
import { m5b } from './m05b'

export const module5 = defineModule(
  {
    id: 'm5',
    number: 5,
    title: 'Cellbiologi',
    subtitle: 'Från "vad är liv?" till DNA, celldelning och specialiserade celler',
    description:
      'Allt levande består av celler. Du lär dig vad en cell är, vad som finns i den, hur ämnen tar sig in och ut, hur fotosyntes och cellandning fungerar, vad DNA är och hur en enda cell kan bli en hel människa. Grunden för kapitlen om kroppen, evolution och bioteknik.',
    icon: 'Microscope',
    tone: 'pink',
    part: 'cell',
    areas: ['kropp'],
    status: 'complete',
    core: true,
    curriculum: ['cell'],
  },
  [...m5a, ...m5b],
)
