import { defineModule } from '../builders'
import { m4a } from './m04a'
import { m4b } from './m04b'

export const module4 = defineModule(
  {
    id: 'm4',
    number: 4,
    title: 'Materians kretslopp och hållbar utveckling',
    subtitle: 'Var atomerna kommer ifrån, hur de cirkulerar och hur vi påverkar klimatet',
    description:
      'Atomerna i din kropp har bildats i stjärnor och har vandrat runt i naturen i miljarder år. Du lär dig om kolets, kvävets och vattnets kretslopp, om resurser, växthuseffekten, klimatförändringarna och vad hållbar utveckling betyder.',
    icon: 'Recycle',
    tone: 'green',
    part: 'hallbarhet',
    areas: ['natur', 'omvarld'],
    status: 'complete',
    core: true,
    curriculum: ['materia'],
  },
  [...m4a, ...m4b],
)
