import { defineModule } from '../builders'
import { m13a } from './m13a'
import { m13b } from './m13b'

export const module13 = defineModule(
  {
    id: 'm13',
    number: 13,
    title: 'Naturvetenskapliga arbetsmetoder',
    subtitle: 'Från fråga och hypotes till slutsats, felkällor och källkritik',
    description:
      'Så tar man reda på saker på ett vetenskapligt sätt. Du lär dig formulera frågor och hypoteser, planera rättvisa försök med variabler, göra riskbedömningar, genomföra laborationer, fältstudier och simuleringar, analysera resultat, dra slutsatser, diskutera felkällor och granska påståenden källkritiskt.',
    icon: 'FlaskConical',
    tone: 'blue',
    part: 'metod',
    areas: ['metod'],
    status: 'complete',
    core: true,
    curriculum: ['fraga'],
  },
  [...m13a, ...m13b],
)
