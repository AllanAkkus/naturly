import { defineModule } from '../builders'
import { m12a } from './m12a'
import { m12b } from './m12b'

export const module12 = defineModule(
  {
    id: 'm12',
    number: 12,
    title: 'Naturvetenskap i samhället',
    subtitle: 'Historiska och aktuella händelser, media och etik',
    description:
      'Naturvetenskap påverkar både dig och samhället. Du lär dig om upptäckter som förändrat världen, pandemier, Tjernobylolyckan, ozonhålet och miljögifterna i Östersjön, hur forskning rapporteras i media och varför forskning måste följa etiska regler.',
    icon: 'Landmark',
    tone: 'cream',
    part: 'samhalle',
    areas: ['omvarld'],
    status: 'complete',
    core: true,
    curriculum: ['handelser', 'samhalle'],
  },
  [...m12a, ...m12b],
)
