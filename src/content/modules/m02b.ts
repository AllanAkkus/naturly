import { atomQ, elementQ, explain, fill, lesson, match, mcq, test, tf } from '../builders'

export const m2b = [
  lesson({
    id: 'm2-l08',
    title: 'Valenselektroner och grupper',
    section: 'Tabellen som verktyg',
    minutes: 10,
    goal: 'Idag ska vi använda periodiska systemet för att räkna ut valenselektroner och elektronkonfiguration.',
    objectives: ['Läsa av antalet valenselektroner från gruppen.', 'Skriva elektronfördelningen för de 20 första grundämnena.', 'Känna igen en enkel elektronkonfiguration (1s² 2s² …).'],
    prerequisites: ['m2-l04', 'm1-l14'],
    what: [
      'För huvudgrupperna (1, 2 och 13–18) kan du läsa antalet **valenselektroner** direkt från gruppnumret.',
    ],
    why: [
      'Tabellen är byggd så att varje steg åt höger lägger till en elektron i det yttersta skalet. Därför hör kolumn och valenselektroner ihop.',
    ],
    how: [
      'Grupp 1 → 1, grupp 2 → 2, grupp 13 → 3, 14 → 4, 15 → 5, 16 → 6, 17 → 7, 18 → 8 (helium har 2).',
      'Perioden säger på hur många skal elektronerna fördelas.',
    ],
    where: [
      'Detta är genvägen när du snabbt ska förutsäga om ett ämne blir positiv eller negativ jon.',
    ],
    misconceptions: [
      { myth: 'Grupp 13 har 13 valenselektroner.', truth: 'Ta bort tian: grupp 13 har 3, grupp 17 har 7.' },
    ],
    simple: [
      'För huvudgrupperna kan du läsa valenselektronerna direkt ur gruppen.',
      'Grupp 1 → 1, grupp 2 → 2, grupp 13 → 3 … grupp 17 → 7, grupp 18 → 8.',
      'Perioden säger hur många skal elektronerna fördelas på.',
    ],
    detailed: [
      'Kombinera period och grupp: Fosfor står i period 3, grupp 15. Alltså 3 skal och 5 valenselektroner: 2, 8, 5.',
      'I en mer exakt modell delas varje skal i underskal, så kallade orbitaler: s (rymmer 2), p (rymmer 6), d (rymmer 10). Natrium skrivs då 1s² 2s² 2p⁶ 3s¹.',
      'Om du räknar ihop de upphöjda siffrorna får du antalet elektroner: 2 + 2 + 6 + 1 = 11. Det är natrium.',
      'Periodiska systemet speglar orbitalerna: grupp 1–2 kallas s-blocket, grupp 13–18 p-blocket och övergångsmetallerna d-blocket.',
    ],
    visual: { kind: 'atom', protons: 15, neutrons: 16, electrons: 15, caption: 'Fosfor, period 3, grupp 15: 2, 8, 5.' },
    analogy: {
      text: 'Tänk på en restaurang med våningar (perioder). Gruppen säger hur många gäster som sitter vid bordet närmast fönstret på översta våningen. Det är de gästerna (valenselektronerna) som syns utifrån och som träffar andra.',
      limits: 'I verkligheten finns underskal (s, p, d) som gör det mer komplicerat för tyngre atomer.',
    },
    alternatives: ['Hitta ämnet. Räkna raden → antal skal. Räkna kolumnen (ta bort tiotalet för 13–18) → yttersta skalet. Fyll de inre skalen fullt.', 'Konfigurationen 1s² 2s² 2p⁶ 3s² 3p⁴: summera → 16 elektroner → svavel. De i sista skalet (3s² 3p⁴) = 6 valenselektroner.'],
    caveats: ['För övergångsmetaller fylls 4s före 3d, så skalfördelningen blir t.ex. 2, 8, 14, 2 för järn.'],
    check: mcq('Hur många valenselektroner har klor (grupp 17)?', ['1', '7', '17'], 1, 'Grupp 17 → 7 valenselektroner.'),
    followUp: mcq('Hur många valenselektroner har magnesium (grupp 2)?', ['2', '12', '8'], 0, 'Grupp 2 → 2 valenselektroner.'),
    apply: elementQ('Vilket grundämne har elektronkonfigurationen 1s² 2s² 2p⁶ 3s² 3p¹? Klicka på det.', 13, 'Summera: 2+2+6+2+1 = 13 → aluminium.', { d: 2 }),
    practice: [
      fill('Skriv elektronfördelningen för kalium (period 4, grupp 1).', ['2,8,8,1', '2 8 8 1', '2, 8, 8, 1'], '4 skal och 1 valenselektron: 2, 8, 8, 1.'),
      mcq('Vilket grundämne har 1s² 2s² 2p⁴?', ['Kol', 'Syre', 'Neon'], 1, '2 + 2 + 4 = 8 → syre.', { d: 2 }),
      atomQ('Bygg en neutral atom som har 3 skal och 3 valenselektroner.', { protons: 13, electrons: 13 }, 'Aluminium: 2, 8, 3.', { d: 2 }),
      explain('Hur kan du använda periodiska systemet för att ta reda på hur elektronerna i en svavelatom är fördelade?', 'Svavel står i period 3, så det har 3 elektronskal. Det står i grupp 16, så det har 6 valenselektroner. De inre skalen är fulla: 2 och 8. Fördelningen blir 2, 8, 6.', [['period', 'rad'], ['grupp', 'kolumn'], ['skal'], ['2, 8, 6', '2,8,6', '6 valenselektroner']], { min: 3, d: 3 }),
    ],
    summary: ['Grupp → valenselektroner (huvudgrupperna).', 'Period → antal skal.', 'Fyll inre skal först: 2, 8, …', 'Konfiguration: summera de upphöjda siffrorna.'],
    flashcards: [['Hur många valenselektroner har grupp 16?', '6.'], ['Vad är 1s² 2s² 2p⁶ 3s¹?', 'Natrium (11 elektroner).'], ['Fördelning för fosfor?', '2, 8, 5.']],
    related: ['valenselektron', 'grupp', 'period', 'elektronskal'],
  }),

  lesson({
    id: 'm2-l09',
    title: 'Vanliga jonladdningar',
    section: 'Tabellen som verktyg',
    minutes: 10,
    goal: 'Idag ska vi lära oss förutsäga vilken jon ett grundämne bildar med hjälp av periodiska systemet.',
    objectives: ['Förutsäga jonladdningen för grupp 1, 2, 13, 15, 16 och 17.', 'Förklara varför jonen får den laddningen.', 'Känna till att övergångsmetaller kan bilda flera olika joner.'],
    prerequisites: ['m2-l08', 'm1-l18', 'm1-l19'],
    what: [
      'Grundämnen i samma grupp bildar ofta joner med **samma laddning**. Det kan du läsa av i tabellen.',
    ],
    why: [
      'Atomen avger eller tar upp det antal elektroner som krävs för ädelgasstruktur. Grupp 1 har 1 att bli av med → +1. Grupp 17 saknar 1 → −1.',
    ],
    how: [
      'Grupp 1: +1, grupp 2: +2, grupp 13: +3. Grupp 15: −3, grupp 16: −2, grupp 17: −1. Grupp 14 och 18 bildar normalt inga enkla joner.',
    ],
    where: [
      'Detta hjälper dig att skriva formler för salter: Ca²⁺ och Cl⁻ blir CaCl₂ eftersom det behövs två minus för att ta ut två plus.',
    ],
    misconceptions: [
      { myth: 'Grupp 16 bildar +6-joner.', truth: 'Det är mycket lättare att ta upp 2 elektroner än att avge 6, så det blir −2.' },
    ],
    simple: [
      'Grupp 1 bildar +1-joner, grupp 2 +2-joner och grupp 13 +3-joner.',
      'Grupp 17 bildar −1-joner, grupp 16 −2-joner och grupp 15 −3-joner.',
      'Grupp 14 och 18 bildar normalt inga enkla joner.',
    ],
    detailed: [
      'Regeln kommer från valenselektronerna. Det är lättare för strontium (grupp 2) att avge 2 elektroner än att ta upp 6. Därför bildar strontium Sr²⁺.',
      'Svavel (grupp 16) har 6 valenselektroner. Att ta upp 2 är "billigare" än att avge 6. Därför bildar svavel S²⁻.',
      'Kol och kisel i grupp 14 har 4 valenselektroner – det är lika långt åt båda hållen. De bildar i stället kovalenta bindningar.',
      'Övergångsmetaller följer inte regeln. Järn kan bilda Fe²⁺ och Fe³⁺, koppar Cu⁺ och Cu²⁺. Då skriver man ofta laddningen med romersk siffra: järn(III)oxid.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Avger elektroner (+)', points: ['Grupp 1: +1 (Na⁺, K⁺)', 'Grupp 2: +2 (Mg²⁺, Ca²⁺, Sr²⁺)', 'Grupp 13: +3 (Al³⁺)'], tone: 'pink' },
        { title: 'Tar upp elektroner (−)', points: ['Grupp 15: −3 (N³⁻)', 'Grupp 16: −2 (O²⁻, S²⁻)', 'Grupp 17: −1 (F⁻, Cl⁻, Br⁻)'], tone: 'blue' },
        { title: 'Normalt inga enkla joner', points: ['Grupp 14 (C, Si) – delar elektroner', 'Grupp 18 – ädelgaser', 'Övergångsmetaller – flera möjliga joner'], tone: 'cream' },
      ],
    },
    analogy: {
      text: 'Tänk dig att du har 2 kronor i fickan och behöver ha antingen 0 eller 8 kronor för att det ska gå jämnt upp. Det är mycket lättare att ge bort 2 kronor än att få tag i 6 till. Grupp 2-metaller "ger bort 2" och blir +2.',
      limits: 'Atomer räknar inte och väljer inte. Men energin för att avge 2 elektroner är mycket mindre än energin för att ta upp 6, och det styr vad som händer.',
    },
    alternatives: ['Till vänster: laddning = gruppnummer (+1, +2, +3). Till höger: laddning = gruppnummer − 18 (17 − 18 = −1, 16 − 18 = −2).', 'Varför Sr²⁺? Grupp 2 → 2 valenselektroner → avger 2 → 38 protoner, 36 elektroner → +2.'],
    caveats: ['Bly och tenn (grupp 14) kan bilda joner som Pb²⁺. Regeln gäller främst de lättare grundämnena.'],
    check: mcq('Vilken jon bildar kalcium (grupp 2)?', ['Ca⁺', 'Ca²⁺', 'Ca²⁻'], 1, 'Grupp 2 → avger 2 elektroner → Ca²⁺.'),
    followUp: mcq('Vilken laddning får en jon från grupp 17?', ['+1', '−1', '−7'], 1, 'Grupp 17 tar upp 1 elektron → −1.'),
    apply: explain('Varför bildar strontium vanligtvis Sr²⁺?', 'Strontium står i grupp 2 och har 2 valenselektroner. Det är energimässigt gynnsammare att avge 2 elektroner än att ta upp 6, och då får jonen ädelgasstruktur (samma som krypton). Med 38 protoner och 36 elektroner blir laddningen +2.', [['grupp 2', '2 valenselektroner', 'två valenselektroner'], ['avger', 'förlorar', 'ger bort'], ['ädelgas', 'krypton', 'fullt'], ['+2', '2+', '38', '36']], { min: 3, d: 2 }),
    practice: [
      match('Para ihop grundämnet med jonen.', [['Litium', 'Li⁺'], ['Aluminium', 'Al³⁺'], ['Syre', 'O²⁻'], ['Brom', 'Br⁻']], 'Gruppen bestämmer laddningen.'),
      fill('Vilken laddning får en kväveatom som bildar jon? (t.ex. -2)', ['-3', '−3', '3-', '3−'], 'Kväve i grupp 15 tar upp 3 elektroner: N³⁻.'),
      tf('Kol bildar ofta jonen C⁴⁺.', false, 'Kol i grupp 14 bildar normalt kovalenta bindningar i stället för enkla joner.', { d: 2 }),
      mcq('Järn bildar Fe²⁺ och Fe³⁺. Varför fungerar inte gruppregeln här?', ['Järn är en övergångsmetall', 'Järn är en ädelgas', 'Järn har inga valenselektroner'], 0, 'Övergångsmetaller kan avge olika antal elektroner.', { d: 3 }),
    ],
    summary: ['Grupp 1, 2, 13 → +1, +2, +3.', 'Grupp 15, 16, 17 → −3, −2, −1.', 'Grupp 14 och 18 → normalt inga enkla joner.', 'Övergångsmetaller kan bilda flera joner.'],
    flashcards: [['Jonladdning för grupp 2?', '+2.'], ['Jonladdning för grupp 16?', '−2.'], ['Vilka joner kan järn bilda?', 'Fe²⁺ och Fe³⁺.']],
    related: ['jon', 'katjon', 'anjon', 'grupp'],
  }),

  lesson({
    id: 'm2-l10',
    title: 'Läsa isotopbeteckningar',
    section: 'Tabellen som verktyg',
    minutes: 10,
    goal: 'Idag ska vi lära oss läsa och skriva isotopbeteckningar som $^{9}_{4}\\mathrm{Be}$.',
    objectives: ['Läsa av masstal, atomnummer och symbol i en isotopbeteckning.', 'Räkna ut protoner, neutroner och elektroner ur beteckningen.', 'Skriva beteckningen för en isotop när partiklarna är kända.'],
    prerequisites: ['m1-l10', 'm1-l11'],
    what: [
      'En **isotopbeteckning** skriver ut en isotop med symbolen och två tal: **masstalet** uppe till vänster och **atomnumret** nere till vänster, t.ex. ¹⁴₆C.',
    ],
    why: [
      'Eftersom ett grundämne kan ha flera isotoper behöver vi ett sätt att visa exakt vilken atom vi menar.',
    ],
    how: [
      'Uppe = protoner + neutroner. Nere = protoner. Neutroner = uppe − nere. ¹⁴₆C: 14 − 6 = 8 neutroner.',
      'Atomnumret skrivs ofta inte ut, eftersom symbolen redan avslöjar det.',
    ],
    where: [
      'I texter om radioaktivitet, medicin och åldersbestämning, t.ex. ¹³¹I (jod-131) och ²³⁵U (uran-235).',
    ],
    misconceptions: [
      { myth: 'Talet uppe är antalet neutroner.', truth: 'Talet uppe är masstalet – protoner och neutroner tillsammans.' },
    ],
    simple: [
      'En isotopbeteckning visar symbolen med två siffror.',
      'Uppe till vänster står masstalet (protoner + neutroner).',
      'Nere till vänster står atomnumret (protoner). Det skrivs ibland inte ut, eftersom symbolen redan säger det.',
    ],
    detailed: [
      'Exempel: $^{35}_{17}\\mathrm{Cl}$. Masstalet är 35, atomnumret 17. Neutroner = 35 − 17 = 18. En neutral atom har 17 elektroner.',
      'Ofta skrivs bara masstalet: ³⁵Cl eller klor-35. Atomnumret tar du då från periodiska systemet.',
      'Om det också står en laddning uppe till höger är det en jon: $^{37}_{17}\\mathrm{Cl}^{-}$ har 17 protoner, 20 neutroner och 18 elektroner.',
      'Vanligt misstag: att tro att siffran uppe är antalet neutroner. Den är alltid protoner + neutroner.',
    ],
    visual: { kind: 'nucleus', protons: 6, neutrons: 8, caption: '$^{14}_{6}\\mathrm{C}$: 6 protoner + 8 neutroner = 14.' },
    analogy: {
      text: 'Tänk på en etikett på en matlåda. Det stora namnet är symbolen (vilken rätt). Uppe i hörnet står totalvikten (masstalet). Nere i hörnet står antalet köttbullar (protonerna) – och det är köttbullarna som avgör vilken rätt det är.',
      limits: 'En riktig etikett kan vara fel. Isotopbeteckningen är exakt: siffrorna betyder alltid samma sak.',
    },
    alternatives: ['Uppe = UPPsummerat (protoner + neutroner). Nere = Nummer i periodiska systemet.', 'Steg för steg för ⁹Be: 1) Be = beryllium = 4 protoner. 2) Uppe står 9. 3) 9 − 4 = 5 neutroner. 4) Neutral → 4 elektroner.'],
    caveats: ['I vissa länder och böcker skrivs isotopen som Be-9. Det betyder samma sak som ⁹Be.'],
    check: mcq('Vad betyder siffran uppe till vänster i $^{14}_{6}\\mathrm{C}$?', ['Antalet neutroner', 'Masstalet (protoner + neutroner)', 'Antalet elektroner'], 1, 'Siffran uppe är masstalet: 6 protoner + 8 neutroner = 14.', { wrong: { 0: 'Neutronerna är 14 − 6 = 8, inte 14.', 2: 'Elektronerna syns inte direkt i beteckningen – för en neutral atom är de lika många som protonerna.' } }),
    followUp: fill('Hur många protoner har $^{14}_{6}\\mathrm{C}$?', ['6'], 'Siffran nere är atomnumret: 6 protoner.', { numeric: true }),
    apply: fill('Hur många neutroner har ²³Na? (Natrium har atomnummer 11.)', ['12'], '23 − 11 = 12 neutroner.', { numeric: true, d: 2 }),
    practice: [
      mcq('Vilken beteckning stämmer för en atom med 8 protoner och 10 neutroner?', ['¹⁰O', '¹⁸O', '¹⁸Ar'], 1, '8 protoner = syre. 8 + 10 = 18. Alltså ¹⁸O.', { wrong: { 0: '10 är bara neutronerna, masstalet är 18.', 2: 'Argon har 18 protoner. Här finns 8.' } }),
      fill('Hur många elektroner har jonen ³⁷Cl⁻? (Klor har atomnummer 17.)', ['18'], '17 protoner, laddning −1 → 18 elektroner.', { numeric: true, d: 3 }),
      atomQ('Bygg $^{7}_{3}\\mathrm{Li}$ (neutral).', { protons: 3, neutrons: 4, electrons: 3 }, '3 protoner, 7 − 3 = 4 neutroner och 3 elektroner.'),
      match('Para ihop beteckning och antal neutroner.', [['¹²C', '6'], ['¹⁶O', '8'], ['²⁷Al', '14'], ['⁴⁰Ca', '20']], 'Neutroner = masstal − atomnummer.', { d: 2 }),
    ],
    summary: ['Uppe till vänster: masstal.', 'Nere till vänster: atomnummer.', 'Neutroner = masstal − atomnummer.', 'Laddning uppe till höger betyder jon.'],
    flashcards: [['Vad står uppe till vänster i en isotopbeteckning?', 'Masstalet.'], ['Neutroner i ²³Na?', '12.'], ['Vad betyder ³⁷Cl⁻?', 'Klorjon med 17 p, 20 n och 18 e.']],
    related: ['isotop', 'masstal', 'atomnummer'],
  }),

  lesson({
    id: 'm2-l11',
    title: 'Identifiera grundämnen från protoner',
    section: 'Tabellen som verktyg',
    minutes: 9,
    goal: 'Idag ska vi öva på att avgöra vilket grundämne det är när vi vet antalet partiklar.',
    objectives: ['Identifiera ett grundämne från antalet protoner.', 'Identifiera grundämnet hos en jon från elektroner och laddning.', 'Undvika vanliga fällor, som att använda masstalet som atomnummer.'],
    prerequisites: ['m2-l10'],
    what: [
      'Vilket grundämne en atom är avgörs **enbart av antalet protoner**.',
    ],
    why: [
      'Neutroner kan variera (isotoper) och elektroner kan flyttas (joner), men protonerna är låsta så länge det inte sker en kärnreaktion. De är därför det säkra kännetecknet.',
    ],
    how: [
      'Räkna protonerna → leta upp samma atomnummer i tabellen → läs symbolen. 17 protoner = klor, oavsett antal neutroner eller elektroner.',
    ],
    where: [
      'När du får en bild av en atom eller jon på prov: titta bara på protonerna för att avgöra ämnet.',
    ],
    misconceptions: [
      { myth: 'En atom med 18 elektroner är argon.', truth: 'Den kan vara Cl⁻ (17 protoner) eller K⁺ (19 protoner). Räkna protonerna.' },
    ],
    simple: [
      'Det är bara antalet protoner som avgör vilket grundämne det är.',
      'Räkna protonerna och leta upp samma atomnummer i periodiska systemet.',
      'Neutroner och elektroner kan du ignorera när du ska ta reda på grundämnet.',
    ],
    detailed: [
      'Om du bara vet elektronerna och laddningen: protoner = elektroner + laddning. En jon med 10 elektroner och laddningen +2 har 12 protoner → magnesium.',
      'Om du vet masstal och neutroner: protoner = masstal − neutroner. Masstal 35 och 18 neutroner → 17 protoner → klor.',
      'Vanlig fälla: en kärna med 4 protoner och 5 neutroner. Masstalet är 9, men grundämne nummer 9 är fluor – fel! Det är beryllium, nummer 4.',
      'Ett annat knep: en neutral atom med 10 elektroner har 10 protoner → neon.',
    ],
    visual: { kind: 'nucleus', protons: 4, neutrons: 5, caption: 'Räkna bara de röda för att veta grundämnet.' },
    visualPrompt: 'Hur många röda finns det? Vilket grundämne har det numret?',
    analogy: {
      text: 'Det är som att känna igen en person på personnumret. Vikten (neutronerna) och kläderna (elektronerna) kan ändras från dag till dag, men personnumret (protonerna) är alltid detsamma.',
      limits: 'Personnummer är något vi människor har bestämt. Protonantalet är en fysisk egenskap som styr atomens kemi.',
    },
    alternatives: ['Röd = räkna. Blå = struntar i det. Hitta det röda antalet i periodiska systemet.', 'Om du ser laddning: elektroner + laddning = protoner. (Ex. 18 e⁻, −1: 18 + (−1) = 17 → klor.)'],
    caveats: ['I kärnreaktioner kan antalet protoner ändras – då byter atomen grundämne. I vanliga kemiska reaktioner händer det aldrig.'],
    check: elementQ('En kärna har 4 protoner och 5 neutroner. Klicka på grundämnet.', 4, 'Bara protonerna räknas: 4 → beryllium. (Grundämne 9, fluor, vore fel.)'),
    followUp: elementQ('En atom har 6 protoner och 8 neutroner. Klicka på grundämnet.', 6, '6 protoner → kol.'),
    apply: elementQ('En jon har 18 elektroner och laddningen −2. Klicka på grundämnet.', 16, 'Protoner = 18 + (−2) = 16 → svavel. Jonen är S²⁻.', { d: 2 }),
    practice: [
      elementQ('En isotop har masstalet 40 och 20 neutroner. Klicka på grundämnet.', 20, '40 − 20 = 20 protoner → kalcium.', { d: 2 }),
      elementQ('En jon har 10 elektroner och laddningen +1. Klicka på grundämnet.', 11, '10 + 1 = 11 protoner → natrium (Na⁺).', { d: 2 }),
      tf('En atom med 9 protoner och 10 neutroner är neon.', false, '9 protoner är fluor. Neon har 10 protoner.'),
      mcq('Vad räcker för att avgöra grundämnet?', ['Masstalet', 'Antalet neutroner', 'Antalet protoner'], 2, 'Protonerna bestämmer grundämnet.'),
    ],
    summary: ['Protonerna avgör grundämnet.', 'Jon: protoner = elektroner + laddning.', 'Isotop: protoner = masstal − neutroner.', 'Använd aldrig masstalet som atomnummer.'],
    flashcards: [['Hur många protoner har en jon med 10 e⁻ och laddning +2?', '12 (magnesium).'], ['Masstal 35, 18 neutroner – vilket grundämne?', 'Klor (17 protoner).']],
    related: ['proton', 'atomnummer', 'jon', 'isotop'],
  }),

  lesson({
    id: 'm2-l12',
    title: 'Interaktiva övningar: läsa periodiska systemet',
    section: 'Tabellen som verktyg',
    minutes: 15,
    goal: 'Idag ska vi använda allt vi lärt oss om periodiska systemet i blandade övningar.',
    objectives: ['Kombinera period, grupp, valenselektroner och jonladdning.', 'Använda periodiska systemet för att resonera om okända ämnen.', 'Träna inför repetitionsprovet.'],
    prerequisites: ['m2-l08', 'm2-l09', 'm2-l10', 'm2-l11'],
    what: [
      'Den här sidan samlar allt du lärt dig om periodiska systemet och låter dig öva på att läsa det som en karta.',
    ],
    why: [
      'Kunskapen fastnar när du använder den. Varje position i tabellen berättar flera saker samtidigt – det blir lätt när du har gjort det några gånger.',
    ],
    how: [
      'För varje ämne: 1) atomnummer = protoner, 2) period = antal skal, 3) grupp = valenselektroner (huvudgrupper), 4) grupp → trolig jonladdning.',
    ],
    where: [
      'Precis den här sortens frågor brukar komma på prov om periodiska systemet.',
    ],
    misconceptions: [
      { myth: 'Det är fusk att titta i tabellen.', truth: 'Tabellen är ett verktyg. Att kunna använda den är det som räknas.' },
    ],
    simple: [
      'Nu tränar vi på att läsa periodiska systemet som en karta.',
      'Varje position berättar: antal protoner, antal skal, antal valenselektroner och ofta vilken jon som bildas.',
      'Ta en fråga i taget. Det gör inget om du behöver titta i tabellen!',
    ],
    detailed: [
      'Ett tankeschema som fungerar för huvudgrupperna: 1) Hitta ämnet. 2) Atomnummer → protoner och elektroner. 3) Period → antal skal. 4) Grupp → valenselektroner. 5) Valenselektroner → typisk jon.',
      'Exempel med strontium: atomnummer 38, period 5, grupp 2. 5 skal, 2 valenselektroner, bildar Sr²⁺ med 36 elektroner.',
      'Exempel med jod: atomnummer 53, period 5, grupp 17. 7 valenselektroner, bildar I⁻ med 54 elektroner – samma som xenon.',
      'Fler övningar finns i quizen på sidan Periodiska systemet och i Atombyggaren.',
    ],
    visual: { kind: 'periodic', highlight: [38, 53], caption: 'Strontium och jod – båda i period 5. Klicka för att jämföra.' },
    analogy: {
      text: 'Att läsa periodiska systemet är som att läsa en adress: land, stad, gata, nummer. Period och grupp är adressen, och utifrån den vet du mycket om "huset" – hur stort det är och hur det beter sig.',
      limits: 'En adress säger inget om vem som bor där. Positionen i periodiska systemet säger däremot mycket om atomens egenskaper.',
    },
    alternatives: ['Använd tankeschemat: Hitta → atomnummer → period → grupp → jon. Fem steg, varje gång.', 'Börja med ämnen du känner till (Na, Cl, O, Ca) innan du tar de tyngre.'],
    caveats: ['Tankeschemat fungerar bäst för huvudgrupperna, inte för övergångsmetaller.'],
    check: mcq('Strontium står i period 5, grupp 2. Hur många valenselektroner har det?', ['2', '5', '38'], 0, 'Grupp 2 → 2 valenselektroner.'),
    followUp: mcq('Hur många elektronskal har strontium?', ['2', '5', '8'], 1, 'Period 5 → 5 skal.'),
    apply: mcq('Vilken jon bildar jod och hur många elektroner har den?', ['I⁺ med 52 elektroner', 'I⁻ med 54 elektroner', 'I²⁻ med 55 elektroner'], 1, 'Jod (grupp 17) tar upp 1 elektron: 53 + 1 = 54 elektroner, samma som xenon.', { d: 3 }),
    practice: [
      elementQ('Klicka på grundämnet som står i period 3 och bildar jonen X²⁺.', 12, 'Grupp 2 i period 3 är magnesium (Mg²⁺).', { d: 2 }),
      elementQ('Klicka på halogenen i period 2.', 9, 'Fluor är halogenen (grupp 17) i period 2.'),
      fill('Hur många elektroner har jonen Al³⁺?', ['10'], '13 − 3 = 10.', { numeric: true, d: 2 }),
      mcq('Vilket påstående stämmer för kalium jämfört med natrium?', ['Kalium har fler skal och är mer reaktivt', 'Kalium har fler valenselektroner', 'Kalium är en ädelgas'], 0, 'Kalium står i period 4 (4 skal), natrium i period 3. Valenselektronen hålls lösare i kalium.', { d: 3 }),
      atomQ('Bygg en jon som har samma elektronfördelning som argon (2, 8, 8) och laddningen −1.', { protons: 17, electrons: 18 }, 'Cl⁻ har 17 protoner och 18 elektroner (2, 8, 8).', { d: 3 }),
      explain('Använd periodiska systemet för att beskriva en kalciumatom: protoner, skal, valenselektroner och vilken jon den bildar.', 'Kalcium har atomnummer 20, alltså 20 protoner och 20 elektroner som neutral atom. Det står i period 4, så det har 4 skal (2, 8, 8, 2). Det står i grupp 2 och har 2 valenselektroner. Det avger dem och bildar Ca²⁺.', [['20'], ['period 4', '4 skal', 'fyra skal'], ['grupp 2', '2 valenselektroner', 'två valenselektroner'], ['Ca²⁺', 'Ca2+', '+2', '2+']], { min: 3, d: 3 }),
    ],
    summary: ['Hitta → atomnummer → period → grupp → jon.', 'Period = skal, grupp = valenselektroner.', 'Jonen får ofta samma elektroner som närmaste ädelgas.', 'Öva mer i quizen och Atombyggaren.'],
    flashcards: [['Tankeschema för ett grundämne?', 'Hitta → atomnummer → period (skal) → grupp (valenselektroner) → jon.'], ['Vilken jon bildar jod?', 'I⁻ (54 elektroner).']],
    related: ['periodiska-systemet', 'grupp', 'period', 'jon'],
  }),

  test({
    id: 'm2-test',
    title: 'Repetitionsprov: Periodiska systemet',
    minutes: 20,
    goal: 'Testa hur väl du kan läsa och använda periodiska systemet.',
    description: 'Blandade egna övningsfrågor om periodiska systemet (inte officiella NTI-frågor).',
    prerequisites: [],
    questions: [
      mcq('Vad kallas kolumnerna i periodiska systemet?', ['Perioder', 'Grupper', 'Block'], 1, 'Kolumner = grupper.', { c: ['m2-l01'], d: 1 }),
      elementQ('Klicka på kväve (N).', 7, 'Kväve: atomnummer 7, period 2, grupp 15.', { c: ['m2-l02'], d: 1 }),
      mcq('Vad betyder Co?', ['Kolmonoxid', 'Kobolt', 'Koppar'], 1, 'Co = kobolt. CO = kolmonoxid.', { c: ['m2-l03'], d: 2 }),
      fill('Hur många elektronskal har ett grundämne i period 4?', ['4'], 'Period = antal skal.', { c: ['m2-l04'], numeric: true }),
      mcq('Vilken egenskap har metaller?', ['Leder el', 'Bildar negativa joner', 'Är alltid gaser'], 0, 'Metaller leder el och värme.', { c: ['m2-l05'] }),
      tf('Klor är en ickemetall.', true, 'Klor är en halogen och ickemetall.', { c: ['m2-l06'] }),
      mcq('Varför reagerar argon nästan aldrig?', ['Fullt yttersta skal', 'Inga protoner', 'För tungt'], 0, 'Ädelgaser har fullt yttersta skal.', { c: ['m2-l07'] }),
      fill('Hur många valenselektroner har selen (grupp 16)?', ['6'], 'Grupp 16 → 6.', { c: ['m2-l08'], numeric: true, d: 2 }),
      mcq('Vilken jon bildar barium (grupp 2)?', ['Ba⁺', 'Ba²⁺', 'Ba²⁻'], 1, 'Grupp 2 → +2.', { c: ['m2-l09'], d: 2 }),
      fill('Hur många neutroner har ⁵⁶Fe? (Järn har atomnummer 26.)', ['30'], '56 − 26 = 30.', { c: ['m2-l10'], numeric: true, d: 2 }),
      elementQ('En jon har 18 elektroner och laddningen +1. Klicka på grundämnet.', 19, '18 + 1 = 19 → kalium.', { c: ['m2-l11'], d: 3 }),
      elementQ('Vilket grundämne har konfigurationen 1s² 2s² 2p⁶ 3s² 3p⁵?', 17, '2+2+6+2+5 = 17 → klor.', { c: ['m2-l08'], d: 3 }),
      match('Para ihop grupp och jonladdning.', [['Grupp 1', '+1'], ['Grupp 13', '+3'], ['Grupp 16', '−2'], ['Grupp 17', '−1']], 'Använd valenselektronerna.', { c: ['m2-l09'], d: 2 }),
      explain('Förklara varför fluor och klor reagerar på liknande sätt.', 'Fluor och klor står båda i grupp 17 och har 7 valenselektroner. Båda tar lätt upp en elektron och bildar −1-joner (F⁻ och Cl⁻). Eftersom valenselektronerna styr kemin reagerar de på liknande sätt.', [['grupp 17', 'samma grupp', 'halogen'], ['7 valenselektroner', 'sju valenselektroner'], ['tar upp', '−1', '-1', 'F⁻', 'Cl⁻']], { c: ['m2-l04', 'm2-l09'], d: 3, min: 2 }),
      mcq('Vilket påstående är korrekt?', ['Masstalet står i varje ruta i periodiska systemet', 'Atommassan i rutan är ett medelvärde av isotoperna', 'Antalet neutroner är alltid lika med antalet protoner'], 1, 'Atommassan är ett vägt medelvärde av grundämnets isotoper.', { c: ['m1-l12'], d: 3 }),
    ],
  }),
]
