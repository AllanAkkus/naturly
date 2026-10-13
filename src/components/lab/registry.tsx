import type { ComponentType } from 'react'
import type { Question, SimulationId } from '@/content/types'
import { explain, fill, mcq, tf } from '@/content/builders'
import { ElectronTransfer } from '@/components/visuals/ElectronTransfer'
import { HalfLifeSim, NerveSim, OsmosisSim, PhSim } from './ChemSims'
import { BloodSugarSim, CarbonSim, ImmuneSim, SelectionSim } from './BioSims'
import { VariablesSim } from './MethodSims'

export interface SimulationDef {
  id: SimulationId
  title: string
  icon: string
  moduleId: string
  conceptId: string
  goal: string
  instructions: string[]
  explanation: string[]
  realWorld: string
  questions: Question[]
  Component: ComponentType
}

type Draft = Omit<Question, 'id' | 'concepts' | 'difficulty'> & { difficulty?: 1 | 2 | 3 }

function qs(id: SimulationId, conceptId: string, drafts: Draft[]): Question[] {
  return drafts.map((d, i) => ({ ...d, id: `lab-${id}-${i + 1}`, concepts: [conceptId], difficulty: d.difficulty ?? 2 }) as Question)
}

const ElectronTransferChooser = () => <ElectronTransfer chooser />

export const SIMULATIONS: Record<SimulationId, SimulationDef> = {
  'electron-transfer': {
    id: 'electron-transfer',
    title: 'Jonbindning: flytta elektroner',
    icon: '⚡',
    moduleId: 'm1',
    conceptId: 'm1-l20',
    goal: 'Förstå hur metaller och ickemetaller bildar joner och jonföreningar.',
    instructions: ['Välj en metall och en ickemetall.', 'Titta på valenselektronerna (gula).', 'Tryck på "Flytta elektronerna" och läs vad som hände.', 'Prova flera kombinationer, t.ex. magnesium och klor.'],
    explanation: [
      'Metallen avger sina valenselektroner och blir en positiv jon. Ickemetallen tar upp elektroner och blir en negativ jon.',
      'Båda jonerna får ädelgasstruktur. De motsatta laddningarna attraherar varandra – det är jonbindningen.',
      'Formeln väljs så att laddningarna tar ut varandra. Därför blir det MgCl₂ men NaCl.',
    ],
    realWorld: 'I verkligheten flyttas inte elektroner en och en mellan två ensamma atomer. Natrium och klor reagerar häftigt och bildar ett jongitter med miljarder joner. Gör aldrig detta försök hemma – både natrium och klorgas är farliga.',
    questions: [],
    Component: ElectronTransferChooser,
  },
  ph: {
    id: 'ph',
    title: 'pH och neutralisation',
    icon: '🧪',
    moduleId: 'm3',
    conceptId: 'm3-l07',
    goal: 'Förstå hur pH ändras när man tillsätter syra och bas, och vad neutralisation är.',
    instructions: ['Droppa i saltsyra och se hur färgen och pH ändras.', 'Droppa sedan i natriumhydroxid.', 'Försök få pH tillbaka till 7.'],
    explanation: [
      'Syror ger ifrån sig H⁺-joner (vätejoner). Ju fler H⁺, desto lägre pH.',
      'Baser ger OH⁻-joner (hydroxidjoner) som reagerar med H⁺ och bildar vatten: H⁺ + OH⁻ → H₂O. Det kallas neutralisation.',
      'pH-skalan är logaritmisk: pH 3 är tio gånger surare än pH 4.',
    ],
    realWorld: 'Simuleringen räknar med en förenklad modell av en stark syra och en stark bas. I ett riktigt labb använder man skyddsglasögon, eftersom saltsyra och natriumhydroxid är frätande.',
    questions: [],
    Component: PhSim,
  },
  osmosis: {
    id: 'osmosis',
    title: 'Osmos i celler',
    icon: '💧',
    moduleId: 'm5',
    conceptId: 'm5-l13',
    goal: 'Förstå hur vatten rör sig in i och ut ur celler genom osmos.',
    instructions: ['Välj röd blodkropp eller växtcell.', 'Dra i reglaget för salthalten utanför cellen.', 'Se vad som händer med cellens storlek.'],
    explanation: [
      'Cellmembranet släpper igenom vatten men inte salt. Vatten rör sig dit där det finns mest löst ämne (lägst vattenkoncentration).',
      'I destillerat vatten går vatten in i cellen. I mycket salt vatten går vatten ut.',
      'Växtceller har en cellvägg som hindrar dem från att spricka.',
    ],
    realWorld: 'I verkligheten tar osmos några minuter. Man kan se det i mikroskop, t.ex. när rödlöksceller läggs i saltlösning.',
    questions: [],
    Component: OsmosisSim,
  },
  'nerve-signal': {
    id: 'nerve-signal',
    title: 'Nervimpulsen',
    icon: '⚡',
    moduleId: 'm6',
    conceptId: 'm6-l05',
    goal: 'Förstå tröskelvärde, allt-eller-inget-principen och myelinets betydelse.',
    instructions: ['Välj en styrka på retningen.', 'Tryck på "Reta nervcellen".', 'Prova under och över tröskeln.', 'Ta bort myelinskidan och jämför hastigheten.'],
    explanation: [
      'Vilopotentialen är ungefär −70 mV. Om retningen når tröskeln (ca −55 mV) startar en aktionspotential.',
      'Natriumjoner strömmar in och spänningen blir positiv. Sedan strömmar kaliumjoner ut och spänningen återställs.',
      'Myelinskidan isolerar axonet så att impulsen hoppar mellan luckorna och går mycket snabbare.',
    ],
    realWorld: 'Riktiga nervimpulser varar ungefär 1–2 millisekunder och kan färdas med upp till ca 120 meter per sekund i myeliniserade axon.',
    questions: [],
    Component: NerveSim,
  },
  'blood-sugar': {
    id: 'blood-sugar',
    title: 'Blodsockerreglering',
    icon: '🍎',
    moduleId: 'm7',
    conceptId: 'm7-l07',
    goal: 'Förstå hur insulin och glukagon håller blodsockret stabilt genom negativ återkoppling.',
    instructions: ['Tryck på "Ät en måltid" och följ kurvorna.', 'Prova att träna och att vänta.', 'Slå på typ 1-diabetes och jämför.'],
    explanation: [
      'När blodsockret stiger frisätter bukspottkörteln insulin. Insulin sänker blodsockret.',
      'När blodsockret sjunker frisätts glukagon. Glukagon höjer blodsockret.',
      'Det är negativ återkoppling: en förändring motverkas så att värdet hålls nära ett normalvärde.',
    ],
    realWorld: 'Modellen är kraftigt förenklad. I kroppen påverkas blodsockret också av t.ex. stresshormoner, vilken sorts mat man äter och hur aktiv man är.',
    questions: [],
    Component: BloodSugarSim,
  },
  immune: {
    id: 'immune',
    title: 'Immunsvar och vaccination',
    icon: '🛡️',
    moduleId: 'm8',
    conceptId: 'm8-l07',
    goal: 'Förstå skillnaden mellan primärt och sekundärt immunsvar och hur vaccin fungerar.',
    instructions: ['Välj vaccination eller infektion.', 'Låt samma virus komma tillbaka dag 35.', 'Jämför de två topparna i diagrammet.'],
    explanation: [
      'Första gången kroppen möter ett antigen tar det tid att bilda antikroppar – det primära immunsvaret.',
      'Minnesceller finns kvar. Nästa gång kommer svaret snabbare och blir starkare – det sekundära immunsvaret.',
      'Ett vaccin ger kroppen minnesceller utan att man behöver bli sjuk.',
    ],
    realWorld: 'Kurvorna är illustrationer. Hur länge immuniteten håller varierar mellan sjukdomar och mellan individer.',
    questions: [],
    Component: ImmuneSim,
  },
  'natural-selection': {
    id: 'natural-selection',
    title: 'Naturligt urval',
    icon: '🦋',
    moduleId: 'm10',
    conceptId: 'm10-l02',
    goal: 'Förstå hur naturligt urval ändrar en population över generationer.',
    instructions: ['Välj bakgrund.', 'Tryck på "Nästa generation" flera gånger.', 'Byt bakgrund och se vad som händer.'],
    explanation: [
      'Det finns ärftlig variation i populationen (ljusa och mörka fjärilar).',
      'Fåglar ser och äter fler av de fjärilar som syns. De som överlever förökar sig.',
      'Efter många generationer blir den bäst anpassade varianten vanligare – populationen har evolverat.',
    ],
    realWorld: 'Björkmätaren i England är ett verkligt exempel. I verkligheten påverkas överlevnaden av många fler faktorer, och förändringen tar ofta längre tid.',
    questions: [],
    Component: SelectionSim,
  },
  'carbon-cycle': {
    id: 'carbon-cycle',
    title: 'Kolets kretslopp och klimatet',
    icon: '🌍',
    moduleId: 'm4',
    conceptId: 'm4-l03',
    goal: 'Förstå hur utsläpp av kol från fossila bränslen påverkar mängden koldioxid i atmosfären.',
    instructions: ['Ändra utsläppen från fossila bränslen och avskogning.', 'Titta på kurvan för de kommande 50 åren.', 'Prova vad som händer med nollutsläpp.'],
    explanation: [
      'Kol rör sig mellan atmosfär, växter, djur, hav och mark. Det är kolets kretslopp.',
      'Fossila bränslen är kol som legat lagrat i miljontals år. När de förbränns tillförs extra koldioxid snabbt.',
      'Hav och växter tar upp en del, men resten stannar i atmosfären och förstärker växthuseffekten.',
    ],
    realWorld: 'Riktiga klimatmodeller är mycket mer avancerade. Siffrorna här är ungefärliga för att visa principen.',
    questions: [],
    Component: CarbonSim,
  },
  variables: {
    id: 'variables',
    title: 'Planera ett rättvist försök',
    icon: '🔬',
    moduleId: 'm13',
    conceptId: 'm13-l04',
    goal: 'Öva på oberoende, beroende och kontrollerade variabler, upprepningar och felkällor.',
    instructions: ['Läs frågeställningen.', 'Välj vilken variabel du ändrar med flit.', 'Välj vilka variabler du håller konstanta.', 'Genomför försöket – prova både med och utan upprepningar.'],
    explanation: [
      'Den oberoende variabeln ändrar du med flit. Den beroende variabeln mäter du.',
      'Alla andra variabler måste hållas konstanta, annars vet du inte vad som orsakade resultatet.',
      'Upprepningar visar hur stort mätfelet är och gör medelvärdet säkrare.',
    ],
    realWorld: 'I ett riktigt försök finns fler felkällor, t.ex. att det är svårt att se exakt när sockret är helt upplöst.',
    questions: [],
    Component: VariablesSim,
  },
  'half-life': {
    id: 'half-life',
    title: 'Halveringstid och kol-14',
    icon: '⏳',
    moduleId: 'm1',
    conceptId: 'm1-l11',
    goal: 'Förstå vad halveringstid betyder och hur kol-14 används för åldersbestämning.',
    instructions: ['Tryck på "Låt 5 730 år gå" flera gånger.', 'Räkna hur många atomer som finns kvar.', 'Börja om och se att resultatet varierar lite.'],
    explanation: [
      'Kol-14 är en radioaktiv isotop. Efter en halveringstid (5 730 år) har hälften av atomerna sönderfallit.',
      'Levande organismer tar hela tiden upp kol-14. När de dör minskar mängden – därför kan man räkna ut hur gammalt ett fynd är.',
    ],
    realWorld: 'Riktiga prover innehåller enormt många atomer, så slumpen märks inte. Metoden fungerar för material upp till ungefär 50 000 år.',
    questions: [],
    Component: HalfLifeSim,
  },
}

SIMULATIONS['electron-transfer'].questions = qs('electron-transfer', 'm1-l20', [
  mcq('Vilken formel får föreningen mellan kalcium (Ca²⁺) och fluor (F⁻)?', ['CaF', 'CaF₂', 'Ca₂F'], 1, 'Ca²⁺ behöver två F⁻ för att laddningarna ska ta ut varandra: CaF₂.'),
  tf('I en jonbindning delar atomerna på elektronpar.', false, 'Delade elektronpar är kovalent bindning. I jonbindning överförs elektroner och jonerna attraherar varandra.'),
  explain('Förklara varför natrium blir Na⁺ och inte Na⁻.', 'Natrium har 1 valenselektron. Det är energimässigt gynnsammare att avge den än att ta upp 7. När den avges får natrium 11 protoner och 10 elektroner, alltså laddningen +1, och ädelgasstruktur.', [['1 valenselektron', 'en valenselektron', 'en elektron'], ['avger', 'förlorar', 'ger bort'], ['11', '10', '+1', 'positiv'], ['ädelgas', 'fullt skal', 'neon']], { min: 2 }),
] as Draft[])
SIMULATIONS.ph.questions = qs('ph', 'm3-l07', [
  mcq('En lösning har pH 3. Vad gäller?', ['Den är basisk', 'Den är sur', 'Den är neutral'], 1, 'pH under 7 är surt.'),
  mcq('Vad bildas när H⁺ och OH⁻ reagerar?', ['Salt', 'Vatten', 'Syre'], 1, 'H⁺ + OH⁻ → H₂O. Det kallas neutralisation.'),
  tf('pH 2 är dubbelt så surt som pH 4.', false, 'pH-skalan är logaritmisk: pH 2 är 10 · 10 = 100 gånger surare än pH 4.', { d: 3 }),
] as Draft[])
SIMULATIONS.osmosis.questions = qs('osmosis', 'm5-l13', [
  mcq('Vad händer med en röd blodkropp i destillerat vatten?', ['Den skrumpnar', 'Den sväller och kan spricka', 'Ingenting'], 1, 'Vatten går in i cellen genom osmos eftersom det finns mer löst ämne inne i cellen.'),
  mcq('Varför spricker inte växtceller i rent vatten?', ['De har cellvägg', 'De har kloroplaster', 'De saknar membran'], 0, 'Cellväggen håller emot trycket.'),
  explain('Förklara varför man inte kan dricka havsvatten när man är törstig.', 'Havsvatten har högre salthalt än kroppens celler. Vatten skulle då lämna cellerna genom osmos, och njurarna måste använda mer vatten för att bli av med saltet. Man blir alltså ännu mer uttorkad.', [['salt', 'salthalt'], ['osmos'], ['lämna', 'ut ur', 'förlorar vatten', 'uttork']], { min: 2, d: 3 }),
] as Draft[])
SIMULATIONS['nerve-signal'].questions = qs('nerve-signal', 'm6-l05', [
  mcq('Vad händer om retningen inte når tröskelvärdet?', ['En svag impuls skickas', 'Ingen impuls skickas', 'En dubbelt så stark impuls skickas'], 1, 'Allt-eller-inget: antingen blir det en fullstor impuls eller ingen alls.'),
  mcq('Vad gör myelinskidan?', ['Gör impulsen snabbare', 'Gör impulsen starkare', 'Bildar signalsubstans'], 0, 'Myelinet isolerar och låter impulsen hoppa mellan luckorna.'),
  tf('En starkare retning ger en högre aktionspotential.', false, 'Aktionspotentialen är alltid lika stor. En starkare retning ger fler impulser per sekund.', { d: 3 }),
] as Draft[])
SIMULATIONS['blood-sugar'].questions = qs('blood-sugar', 'm7-l07', [
  mcq('Vilket hormon sänker blodsockret?', ['Glukagon', 'Insulin', 'Adrenalin'], 1, 'Insulin gör att celler tar upp glukos och att levern lagrar glykogen.'),
  mcq('Vad kallas det när kroppen motverkar en förändring?', ['Positiv återkoppling', 'Negativ återkoppling', 'Mutation'], 1, 'Negativ återkoppling håller ett värde stabilt.'),
  explain('Förklara vad som händer i kroppen efter en måltid.', 'Blodsockret stiger. Bukspottkörteln känner av det och frisätter insulin. Insulin gör att cellerna tar upp glukos och att levern lagrar glukos som glykogen. Blodsockret sjunker tillbaka till normal nivå.', [['blodsocker', 'glukos'], ['bukspottkörtel'], ['insulin'], ['sjunker', 'sänks', 'tar upp', 'glykogen']], { min: 3 }),
] as Draft[])
SIMULATIONS.immune.questions = qs('immune', 'm8-l07', [
  mcq('Varför blir det sekundära immunsvaret snabbare?', ['Viruset är svagare', 'Det finns minnesceller', 'Antikropparna från förra gången finns kvar i stor mängd'], 1, 'Minnesceller känner igen antigenet och kan snabbt bilda mycket antikroppar.'),
  tf('Ett vaccin innehåller oftast en ofarlig del eller försvagad form av smittämnet.', true, 'Vaccinet låter immunförsvaret lära sig känna igen antigenet.'),
] as Draft[])
SIMULATIONS['natural-selection'].questions = qs('natural-selection', 'm10-l02', [
  mcq('Varför blir mörka fjärilar vanligare på sotig bark?', ['De ändrar färg för att gömma sig', 'Fler mörka överlever och får ungar', 'Soten färgar dem mörka'], 1, 'Variationen fanns redan. Miljön avgör vilka som överlever och förökar sig.'),
  tf('Individer evolverar under sin livstid.', false, 'Det är populationer som evolverar, över generationer.', { d: 3 }),
  explain('Förklara de tre villkoren för naturligt urval.', 'Det måste finnas variation mellan individer, variationen måste vara ärftlig, och vissa varianter måste ha större chans att överleva och föröka sig i miljön. Då blir de egenskaperna vanligare över generationer.', [['variation'], ['ärftlig', 'ärvs', 'gener'], ['överlev', 'föröka', 'avkomma', 'ungar']], { min: 3 }),
] as Draft[])
SIMULATIONS['carbon-cycle'].questions = qs('carbon-cycle', 'm4-l03', [
  mcq('Vilken process tar bort koldioxid från atmosfären?', ['Förbränning', 'Fotosyntes', 'Cellandning'], 1, 'Växter tar upp CO₂ vid fotosyntesen.'),
  mcq('Varför ökar koldioxidhalten när vi förbränner fossila bränslen?', ['Kol som varit lagrat länge tillförs snabbt atmosfären', 'Förbränning bildar nytt kol', 'Fossila bränslen tar upp syre'], 0, 'Kolet fanns redan, men det har varit borta från det snabba kretsloppet i miljontals år.'),
] as Draft[])
SIMULATIONS.variables.questions = qs('variables', 'm13-l04', [
  mcq('I försöket mäter du tiden det tar för sockret att lösas. Vilken typ av variabel är tiden?', ['Oberoende', 'Beroende', 'Kontrollerad'], 1, 'Det du mäter är den beroende variabeln.'),
  mcq('Varför upprepar man ett försök flera gånger?', ['För att få mer data att visa', 'För att se mätfelet och få ett säkrare medelvärde', 'För att ändra hypotesen'], 1, 'Upprepningar gör resultatet mer tillförlitligt.'),
  tf('Om du ändrar både temperatur och omrörning samtidigt kan du ändå säga vilken av dem som påverkade resultatet.', false, 'Nej – då vet du inte vilken variabel som orsakade skillnaden.'),
] as Draft[])
SIMULATIONS['half-life'].questions = qs('half-life', 'm1-l11', [
  fill('Hur mycket kol-14 finns kvar efter två halveringstider? (procent)', ['25'], '100 % → 50 % → 25 %.', { numeric: true }),
  mcq('Ett benfynd har en fjärdedel kvar av sitt kol-14. Ungefär hur gammalt är det?', ['5 730 år', '11 460 år', '22 920 år'], 1, 'En fjärdedel = två halveringstider = 2 · 5 730 = 11 460 år.', { d: 3 }),
] as Draft[])

export const SIMULATION_LIST = Object.values(SIMULATIONS)
