import { defineModule } from '../builders'
import { m8a } from './m08a'
import { m8b } from './m08b'

export const module8 = defineModule(
  {
    id: 'm8',
    number: 8,
    title: 'Immunsystemet',
    subtitle: 'Hur kroppen skyddar sig mot bakterier och virus',
    description:
      'Immunförsvaret skyddar oss mot smittämnen. Du lär dig skillnaden mellan bakterier och virus, kroppens tre försvarslinjer, hur antikroppar och minnesceller fungerar, varför vaccin skyddar, hur antibiotikaresistens uppstår och vad som händer vid allergi och autoimmuna sjukdomar.',
    icon: 'ShieldPlus',
    tone: 'blue',
    part: 'kropp',
    areas: ['kropp', 'omvarld'],
    status: 'complete',
    core: true,
    curriculum: ['immun'],
  },
  [...m8a, ...m8b],
)
