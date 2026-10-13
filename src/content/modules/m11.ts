import { defineModule } from '../builders'
import { m11a } from './m11a'
import { m11b } from './m11b'

export const module11 = defineModule(
  {
    id: 'm11',
    number: 11,
    title: 'Bioteknik',
    subtitle: 'Hur människan använder bakterier, svampar, alger och gener – och de etiska frågorna',
    description:
      'Bioteknik betyder att använda levande organismer till nytta. Du lär dig hur jäst, bakterier och alger används för mat, energi och läkemedel, hur genteknik, GMO och gensaxen CRISPR fungerar och hur man resonerar om etiska frågor inom bioteknik.',
    icon: 'FlaskRound',
    tone: 'lavender',
    part: 'evolution',
    areas: ['kropp', 'omvarld'],
    status: 'complete',
    core: true,
    curriculum: ['bioteknik', 'mikro'],
  },
  [...m11a, ...m11b],
)
