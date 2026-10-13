import { atomQ, elementQ, explain, fill, lesson, match, mcq, order, tf } from '../builders'

export const m1b = [
  lesson({
    id: 'm1-l09',
    title: 'Atomnummer',
    section: 'Räkna med atomer',
    minutes: 8,
    goal: 'Idag ska vi förstå vad atomnumret är och hur man använder det.',
    objectives: ['Förklara att atomnumret är antalet protoner.', 'Hitta atomnumret i periodiska systemet.', 'Använda atomnumret för att ta reda på antalet elektroner i en neutral atom.'],
    prerequisites: ['m1-l04', 'm1-l08'],
    what: [
      '**Atomnumret** är antalet protoner i en atoms kärna. Det skrivs ibland med bokstaven Z.',
      'Varje grundämne har sitt eget atomnummer: väte 1, helium 2, kol 6, syre 8.',
    ],
    why: [
      'Eftersom antalet protoner avgör vilket grundämne det är, behöver vi ett enkelt sätt att ange det. Atomnumret är grundämnets "personnummer".',
    ],
    how: [
      'Atomnumret står i varje ruta i periodiska systemet. Ämnena står i ordning från 1 och uppåt.',
      'I en neutral atom är antalet elektroner lika med atomnumret. Kol har atomnummer 6 → 6 protoner och, om atomen är neutral, 6 elektroner.',
    ],
    where: [
      'När du letar i periodiska systemet efter "ämnet med 20 protoner" hittar du kalcium – samma kalcium som finns i dina ben och i mjölk.',
    ],
    misconceptions: [
      { myth: 'Atomnumret är hur mycket atomen väger.', truth: 'Atomnumret räknar bara protoner. Vikten beror också på neutronerna – det är masstalet och atommassan.' },
    ],
    simple: [
      'Atomnumret är antalet protoner i atomens kärna.',
      'Varje grundämne har ett eget atomnummer. Väte har 1, helium 2, litium 3 och så vidare.',
      'Atomnumret står i varje ruta i periodiska systemet.',
    ],
    detailed: [
      'Atomnumret betecknas ofta med bokstaven Z. Periodiska systemet är ordnat efter stigande atomnummer – från 1 (väte) till 118 (oganesson).',
      'Eftersom en neutral atom har lika många elektroner som protoner, berättar atomnumret också hur många elektroner en neutral atom har.',
      'Atomnumret är alltid ett heltal. Det kan aldrig vara 4,5 – en atom kan inte ha en halv proton.',
      'I isotopbeteckningen skrivs atomnumret nere till vänster om symbolen, till exempel $^{9}_{4}\\mathrm{Be}$. Fyran är atomnumret.',
    ],
    visual: { kind: 'periodic', highlight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], caption: 'De tio första grundämnena. Atomnumret ökar med ett för varje ruta.' },
    analogy: {
      text: 'Atomnumret är som platsnumret på en biobiljett. Plats 6 är alltid kol, plats 8 är alltid syre. Två personer kan inte sitta på samma plats – två grundämnen kan inte ha samma atomnummer.',
      limits: 'Biobiljettnummer är påhittade av människor. Atomnumret är en verklig egenskap hos atomen – det är det faktiska antalet protoner.',
    },
    alternatives: ['Atomnummer = protonnummer. Det är samma sak med två namn.', 'Titta på ett grundämne i periodiska systemet. Den lilla siffran i rutan (heltalet) är atomnumret. Det talar om hur många protoner varje atom av det ämnet har.'],
    caveats: ['I vissa periodiska system står atommassan också i rutan. Atommassan har decimaler – atomnumret har det aldrig.'],
    check: mcq('Vad anger atomnumret?', ['Antalet neutroner', 'Antalet protoner', 'Antalet protoner + neutroner'], 1, 'Atomnumret är antalet protoner.', { wrong: { 0: 'Antalet neutroner varierar mellan isotoper och anges inte av atomnumret.', 2: 'Protoner + neutroner är masstalet, inte atomnumret.' } }),
    followUp: mcq('Kol har atomnummer 6. Hur många protoner har kol?', ['6', '12', '3'], 0, 'Atomnummer = antal protoner = 6.'),
    apply: elementQ('Klicka på grundämnet som har atomnummer 11 i periodiska systemet.', 11, 'Atomnummer 11 är natrium, Na.'),
    practice: [
      fill('Hur många elektroner har en neutral atom med atomnummer 17?', ['17'], 'Neutral atom: elektroner = protoner = 17. Det är klor.', { numeric: true }),
      elementQ('Vilket grundämne har 20 protoner? Klicka på det.', 20, '20 protoner är kalcium, Ca.'),
      tf('Två olika grundämnen kan ha samma atomnummer.', false, 'Varje grundämne har ett unikt atomnummer.'),
      match('Para ihop atomnummer och grundämne.', [['1', 'Väte'], ['6', 'Kol'], ['7', 'Kväve'], ['8', 'Syre']], 'Väte 1, kol 6, kväve 7, syre 8.', { d: 2 }),
    ],
    summary: ['Atomnummer = antal protoner.', 'Varje grundämne har ett eget atomnummer.', 'Neutral atom: elektroner = atomnummer.', 'Periodiska systemet är ordnat efter atomnummer.'],
    flashcards: [['Vad är atomnummer?', 'Antalet protoner i kärnan (Z).'], ['Vilket atomnummer har syre?', '8.'], ['Var skrivs atomnumret i isotopbeteckningen?', 'Nere till vänster om symbolen.']],
    related: ['atomnummer', 'proton', 'periodiska-systemet'],
  }),

  lesson({
    id: 'm1-l10',
    title: 'Masstal',
    section: 'Räkna med atomer',
    minutes: 10,
    goal: 'Idag ska vi förstå vad masstalet är och hur man räknar ut det.',
    objectives: ['Förklara att masstalet är antalet protoner plus neutroner.', 'Räkna ut masstal, protoner eller neutroner när två av dem är kända.', 'Läsa en isotopbeteckning som ⁹Be.'],
    prerequisites: ['m1-l09', 'm1-l05'],
    what: [
      '**Masstalet** är antalet protoner plus antalet neutroner i en atomkärna. Det skrivs ibland med bokstaven A.',
    ],
    why: [
      'Vi behöver masstalet för att skilja olika tunga atomer av samma grundämne åt. Protonerna säger vilket ämne det är, men först med neutronerna vet vi hur tung just den atomen är.',
      'Elektronerna räknas inte, eftersom de väger så lite att de knappt märks.',
    ],
    how: [
      'Masstal = protoner + neutroner. En kärna med 4 protoner och 5 neutroner har masstalet 9.',
      'Vänder du på det kan du räkna ut neutronerna: **neutroner = masstal − atomnummer**. Kol-14: 14 − 6 = 8 neutroner.',
    ],
    where: [
      'Namn som "kol-14" och "uran-235" anger masstalet. Siffran efter namnet är alltså antalet nukleoner.',
    ],
    misconceptions: [
      { myth: 'Masstalet och atomnumret är samma sak.', truth: 'Atomnumret räknar bara protoner. Masstalet räknar protoner och neutroner tillsammans.' },
    ],
    simple: [
      'Masstalet är antalet protoner plus antalet neutroner.',
      'Elektronerna räknas inte, eftersom de väger nästan ingenting.',
      'Masstalet skrivs uppe till vänster om symbolen, till exempel ⁹Be.',
    ],
    detailed: [
      'Formel: masstal (A) = protoner (Z) + neutroner (N). Om du vet två av talen kan du räkna ut det tredje. Neutroner = A − Z.',
      'Exempel: En kärna har 4 protoner och 5 neutroner. Masstalet blir 4 + 5 = 9. Fyra protoner betyder beryllium. Isotopen skrivs ⁹Be eller beryllium-9.',
      'Den fullständiga beteckningen är $^{9}_{4}\\mathrm{Be}$: masstalet uppe, atomnumret nere, symbolen till höger.',
      'Masstalet är alltid ett heltal, eftersom det är ett antal partiklar.',
    ],
    visual: { kind: 'nucleus', protons: 4, neutrons: 5, caption: '4 protoner (röda) + 5 neutroner (blå) = masstal 9.' },
    visualPrompt: 'Räkna de röda. Räkna sedan alla röda och blå tillsammans.',
    analogy: {
      text: 'Tänk dig en påse med köttbullar och potatis. Köttbullarna är protoner och potatisarna neutroner. Masstalet är hur många saker du har i påsen totalt. 4 köttbullar och 5 potatisar = 9 saker. Såsen (elektronerna) räknar du inte – den väger nästan ingenting.',
      limits: 'Riktig sås väger ganska mycket. Men elektroner väger verkligen nästan ingenting jämfört med protoner och neutroner.',
    },
    alternatives: [
      'Masstal = alla tunga partiklar i kärnan. Protoner och neutroner väger ungefär 1 var, så masstalet är ungefär hur många "enheter" kärnan väger.',
      'Steg för steg: 1) Räkna protonerna. 2) Räkna neutronerna. 3) Lägg ihop. Klart!',
    ],
    caveats: ['Masstalet är inte samma sak som atommassan i periodiska systemet. Det lär vi oss i lektionen om atommassa.'],
    check: mcq('Vad är masstalet?', ['Antalet protoner', 'Antalet protoner + neutroner', 'Antalet elektroner + protoner'], 1, 'Masstal = protoner + neutroner.', { wrong: { 0: 'Antalet protoner är atomnumret.', 2: 'Elektronerna räknas inte i masstalet.' } }),
    followUp: fill('En kärna har 3 protoner och 4 neutroner. Vilket är masstalet?', ['7'], '3 + 4 = 7.', { numeric: true }),
    apply: mcq(
      'Vilken isotop symboliserar denna atomkärna?',
      ['⁵F', '⁵Be', '⁹Be', '⁴B', '⁹F'],
      2,
      'Räkna de röda: 4 protoner. Atomnummer 4 är beryllium, Be. Räkna sedan alla röda och blå: 4 + 5 = 9. Alltså är svaret ⁹Be.',
      {
        visual: { kind: 'nucleus', protons: 4, neutrons: 5 },
        context: 'Samma typ av fråga som i din kursuppgift. Kärnan har röda protoner och blå neutroner.',
        hint: 'Räkna de röda. Hur många finns det? Vilket grundämne har det atomnumret?',
        wrong: {
          0: 'Fluor har 9 protoner. Här finns bara 4. Och 5 är antalet neutroner, inte masstalet.',
          1: 'Be stämmer (4 protoner), men 5 är bara antalet neutroner. Masstalet är protoner + neutroner = 9.',
          3: 'Bor (B) har 5 protoner, inte 4. Och siffran uppe ska vara masstalet, inte antalet protoner.',
          4: 'Fluor har 9 protoner. Här finns bara 4. Talet 9 är masstalet, inte atomnumret.',
        },
      },
    ),
    practice: [
      fill('Klor-35 har 17 protoner. Hur många neutroner har den?', ['18'], '35 − 17 = 18 neutroner.', { numeric: true }),
      fill('En atom har 26 protoner och 30 neutroner. Vilket är masstalet?', ['56'], '26 + 30 = 56. Det är järn-56.', { numeric: true }),
      atomQ('Bygg kärnan till beryllium-9.', { protons: 4, neutrons: 5 }, 'Beryllium har 4 protoner. 9 − 4 = 5 neutroner.'),
      mcq('Vad betyder siffran 14 i kol-14?', ['Antalet protoner', 'Antalet neutroner', 'Masstalet'], 2, '14 är masstalet: 6 protoner + 8 neutroner.', { d: 2 }),
      explain('Förklara varför ⁹F inte kan vara rätt svar för en kärna med 4 protoner och 5 neutroner.', 'Fluor har atomnummer 9 och alltså 9 protoner. Kärnan har bara 4 protoner, så det är beryllium. Talet 9 är masstalet (4 + 5), inte antalet protoner.', [['fluor', 'F'], ['9 protoner', 'atomnummer 9'], ['4 protoner', 'beryllium', 'Be'], ['masstal']], { min: 3, d: 3 }),
    ],
    summary: ['Masstal = protoner + neutroner.', 'Elektronerna räknas inte.', 'Neutroner = masstal − atomnummer.', 'Masstalet skrivs uppe till vänster: ⁹Be.'],
    flashcards: [['Vad är masstal?', 'Protoner + neutroner (A).'], ['Hur räknar man neutroner?', 'Masstal − atomnummer.'], ['4 protoner + 5 neutroner = ?', '⁹Be (beryllium-9).']],
    related: ['masstal', 'isotop', 'atomnummer'],
  }),

  lesson({
    id: 'm1-l11',
    title: 'Isotoper',
    section: 'Räkna med atomer',
    minutes: 10,
    goal: 'Idag ska vi förstå vad isotoper är.',
    objectives: ['Förklara att isotoper är atomer av samma grundämne med olika antal neutroner.', 'Skriva och läsa isotopbeteckningar.', 'Ge exempel på hur isotoper används.'],
    prerequisites: ['m1-l10'],
    what: [
      '**Isotoper** är atomer av samma grundämne som har olika antal neutroner. De har alltså samma atomnummer men olika masstal.',
    ],
    why: [
      'Isotoper finns för att en kärna kan hålla ihop med lite olika antal neutroner. Antalet protoner är låst för ett visst grundämne, men neutronerna kan variera.',
      'Vissa kombinationer är stabila, andra inte. De instabila isotoperna faller sönder med tiden – de är **radioaktiva**.',
    ],
    how: [
      'Kol-12 har 6 protoner och 6 neutroner. Kol-14 har 6 protoner och 8 neutroner. Båda är kol och reagerar kemiskt nästan likadant, eftersom de har lika många elektroner.',
      'Radioaktiva isotoper sönderfaller i en jämn takt. Den tid det tar tills hälften har sönderfallit kallas **halveringstid**.',
    ],
    where: [
      'Arkeologer åldersbestämmer ben och trä med kol-14 (halveringstid 5 730 år).',
      'På sjukhus används radioaktiva isotoper för att undersöka organ och behandla cancer.',
    ],
    misconceptions: [
      { myth: 'Isotoper är olika grundämnen.', truth: 'Isotoper är samma grundämne – samma antal protoner. Bara neutronerna skiljer.' },
      { myth: 'Alla isotoper är radioaktiva.', truth: 'De flesta grundämnen har stabila isotoper. Kol-12 och kol-13 är till exempel stabila.' },
    ],
    simple: [
      'Isotoper är atomer av samma grundämne som har olika antal neutroner.',
      'De har samma antal protoner, men olika masstal.',
      'Kol-12 och kol-14 är två isotoper av kol.',
    ],
    detailed: [
      'Eftersom isotoper av samma grundämne har lika många protoner och elektroner, reagerar de kemiskt nästan på samma sätt. Skillnaden är massan – och ibland stabiliteten.',
      'Vissa isotoper är radioaktiva. Kärnan är då instabil och sönderfaller med tiden. Kol-14 är radioaktivt och används för att bestämma åldern på gamla organiska föremål (kol-14-metoden).',
      'Andra exempel: deuterium (väte-2) används i forskning, jod-131 används för att behandla sköldkörteln, och uran-235 används som bränsle i kärnkraftverk.',
      'De flesta grundämnen förekommer i naturen som en blandning av flera isotoper. Klor består till exempel av ungefär 76 % klor-35 och 24 % klor-37.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Kol-12 (¹²C)', points: ['6 protoner', '6 neutroner', '6 elektroner', 'Stabil, ca 98,9 %'], tone: 'lavender' },
        { title: 'Kol-13 (¹³C)', points: ['6 protoner', '7 neutroner', '6 elektroner', 'Stabil, ca 1,1 %'], tone: 'blue' },
        { title: 'Kol-14 (¹⁴C)', points: ['6 protoner', '8 neutroner', '6 elektroner', 'Radioaktiv, spår'], tone: 'pink' },
      ],
      caption: 'Tre isotoper av kol. Bara antalet neutroner skiljer.',
    },
    analogy: {
      text: 'Isotoper är som syskon som ser likadana ut men väger olika mycket. Tänk dig tre likadana resväskor med samma namnlapp (protonerna). En väska har några extra böcker i sig (neutroner). Det är fortfarande din väska, med ditt namn – den är bara tyngre.',
      limits: 'En tyngre resväska är inte farligare. Men vissa isotoper har en kärna som är instabil och radioaktiv. Det kan antalet neutroner påverka.',
    },
    alternatives: [
      'Ordet iso betyder samma och topos betyder plats. Isotoper har samma plats i periodiska systemet – eftersom de har samma atomnummer.',
      'Samma protoner = samma grundämne. Olika neutroner = olika isotoper. Det är hela idén.',
    ],
    caveats: ['Alla kombinationer av protoner och neutroner finns inte. Med för många eller för få neutroner kan en kärna inte bildas eller faller sönder direkt.'],
    check: mcq('Vad skiljer två isotoper av samma grundämne?', ['Antalet protoner', 'Antalet neutroner', 'Antalet elektroner'], 1, 'Isotoper har olika antal neutroner, men samma antal protoner.', { wrong: { 0: 'Med olika antal protoner blir det olika grundämnen, inte isotoper.', 2: 'Olika antal elektroner ger joner, inte isotoper.' } }),
    followUp: tf('Kol-12 och kol-14 har lika många protoner.', true, 'Ja! Båda har 6 protoner, annars vore de inte kol.'),
    apply: mcq('Vilket par är isotoper av samma grundämne?', ['¹⁴C och ¹⁴N', '¹⁶O och ¹⁸O', '⁴⁰K och ⁴⁰Ca'], 1, 'Båda är syre (8 protoner) men har 8 respektive 10 neutroner.', { d: 2, wrong: { 0: 'Samma masstal men olika grundämnen (6 och 7 protoner).', 2: 'Samma masstal men olika grundämnen (19 och 20 protoner).' } }),
    practice: [
      fill('Hur många neutroner har uran-235? (Uran har atomnummer 92.)', ['143'], '235 − 92 = 143.', { numeric: true }),
      tf('Isotoper av samma grundämne reagerar kemiskt nästan likadant.', true, 'De har samma antal elektroner, och det är elektronerna som styr kemin.', { d: 2 }),
      match('Para ihop isotop med antal neutroner.', [['¹H', '0'], ['²H', '1'], ['³H', '2']], 'Väte har 1 proton. Neutroner = masstal − 1.', { d: 2 }),
      explain('Förklara vad som menas med isotoper och ge ett exempel.', 'Isotoper är atomer av samma grundämne med samma antal protoner men olika antal neutroner, och därför olika masstal. Exempel: kol-12 och kol-14.', [['samma', 'lika'], ['proton'], ['neutron'], ['masstal', 'massa'], ['kol', 'syre', 'väte', 'uran', 'klor']], { min: 3, d: 2 }),
    ],
    summary: ['Isotoper = samma grundämne, olika antal neutroner.', 'Samma protoner, olika masstal.', 'Isotoper reagerar kemiskt nästan likadant.', 'Vissa isotoper är radioaktiva, t.ex. kol-14.'],
    flashcards: [['Vad är en isotop?', 'En atom av ett grundämne med ett visst antal neutroner. Isotoper av samma ämne har olika masstal.'], ['Hur skiljer sig ¹²C och ¹⁴C?', '¹⁴C har två neutroner till.'], ['Vad används kol-14 till?', 'Åldersbestämning av organiskt material.']],
    related: ['isotop', 'masstal', 'neutron', 'radioaktivitet'],
  }),

  lesson({
    id: 'm1-l12',
    title: 'Atommassa – inte samma sak som masstal',
    section: 'Räkna med atomer',
    minutes: 9,
    goal: 'Idag ska vi förstå varför atommassan i periodiska systemet har decimaler.',
    objectives: ['Skilja på masstal och atommassa.', 'Förklara att atommassan är ett vägt medelvärde av ett grundämnes isotoper.', 'Känna till enheten u (atommassenhet).'],
    prerequisites: ['m1-l11'],
    what: [
      '**Atommassan** är medelvikten för ett grundämnes atomer så som de finns i naturen. Den anges i enheten u och står i periodiska systemet.',
    ],
    why: [
      'Eftersom de flesta grundämnen är en blandning av isotoper väger inte alla atomer lika mycket. När vi räknar med verkliga ämnen behöver vi medelvärdet, inte vikten av en enda isotop.',
    ],
    how: [
      'Klor finns som cirka 76 % klor-35 och 24 % klor-37. Medelvärdet blir ungefär 35,45 u. Därför har atommassan decimaler, medan masstalet alltid är ett heltal.',
    ],
    where: [
      'När man räknar ut hur mycket ett ämne väger per mol (kemiska beräkningar, kapitel 3) använder man atommassan från periodiska systemet.',
    ],
    misconceptions: [
      { myth: 'Atommassan avrundad är alltid masstalet.', truth: 'Masstalet gäller en viss isotop. Atommassan är ett medelvärde av alla isotoper och kan hamna mitt emellan.' },
    ],
    simple: [
      'Masstalet gäller en enda isotop och är alltid ett heltal.',
      'Atommassan i periodiska systemet är ett medelvärde av alla isotoper i naturen.',
      'Därför har atommassan ofta decimaler, till exempel 35,45 för klor.',
    ],
    detailed: [
      'Atommassa mäts i enheten u (atommassenhet). 1 u är ungefär massan av en proton eller en neutron.',
      'Klor består till ungefär 76 % av klor-35 och 24 % av klor-37. Medelvärdet blir därför närmare 35 än 37: cirka 35,45 u.',
      'Även en enskild isotop väger inte exakt lika mycket som sitt masstal i u. Det beror bland annat på att energin som binder ihop kärnan motsvarar en liten massa. Skillnaderna är små, men de finns.',
      'Atommassan och masstalet är alltså två olika saker. Om en fråga gäller en specifik isotop, till exempel ⁹Be, använder du masstalet.',
    ],
    visual: {
      kind: 'chart',
      chart: 'bar',
      data: [
        { isotop: 'Klor-35', andel: 76 },
        { isotop: 'Klor-37', andel: 24 },
      ],
      x: 'isotop',
      series: [{ key: 'andel', label: 'Andel i naturen (%)' }],
      yLabel: '%',
      caption: 'Klor i naturen är en blandning. Medelvärdet blir ca 35,45 u.',
    },
    analogy: {
      text: 'Tänk dig en fruktskål med 3 äpplen som väger 100 g och 1 äpple som väger 140 g. Ett enskilt äpple väger antingen 100 eller 140 g – det är som masstalet. Men medelvikten för ett äpple i skålen är 110 g – det är som atommassan.',
      limits: 'Äpplen kan väga vad som helst. Isotoper har bestämda massor, och andelarna i naturen är nästan desamma överallt på jorden.',
    },
    alternatives: [
      'Masstal = räkna partiklarna i en kärna (heltal). Atommassa = genomsnittlig vikt för atomerna i en naturlig blandning (decimaltal).',
      'Om du ser decimaler är det atommassa. Om du ser ett heltal uppe till vänster om symbolen är det masstal.',
    ],
    caveats: ['Man kan inte runda av atommassan för att få fram antalet neutroner i alla atomer. Klor har ingen atom med 18,45 neutroner – det finns klor-35 (18 n) och klor-37 (20 n).'],
    check: mcq('Varför har klor atommassan 35,45 och inte ett heltal?', ['En kloratom har en halv neutron', 'Det är ett medelvärde av klorets isotoper', 'Elektronerna väger 0,45'], 1, 'Atommassan är ett vägt medelvärde av isotoperna klor-35 och klor-37.', { wrong: { 0: 'Partiklar kan inte delas i halvor. Varje atom har ett helt antal neutroner.', 2: 'Elektronerna väger mycket mindre än så.' } }),
    followUp: tf('Masstalet är alltid ett heltal.', true, 'Ja, masstalet är ett antal partiklar och kan inte ha decimaler.'),
    apply: mcq('En lärare frågar: "Hur många neutroner har en ⁹Be-atom?" Vilket tal använder du?', ['Atommassan 9,012', 'Masstalet 9', 'Atomnumret 4'], 1, 'Frågan gäller en specifik isotop, så du använder masstalet: 9 − 4 = 5 neutroner.', { d: 2 }),
    practice: [
      tf('Atommassa och masstal betyder samma sak.', false, 'Masstal gäller en isotop (heltal). Atommassa är ett medelvärde (ofta decimaltal).'),
      mcq('Koppar har isotoperna Cu-63 (69 %) och Cu-65 (31 %). Vilken atommassa är rimligast?', ['63,5', '64,0', '64,5'], 0, 'Det finns mer Cu-63, så medelvärdet hamnar närmare 63: ca 63,55 u.', { d: 3 }),
      mcq('Vilken enhet används för atommassa?', ['gram', 'u (atommassenhet)', 'liter'], 1, 'Atommassa anges i u, där 1 u ≈ massan av en proton.'),
      explain('Förklara skillnaden mellan masstal och atommassa.', 'Masstalet är antalet protoner och neutroner i en viss isotop och är alltid ett heltal. Atommassan är ett vägt medelvärde av massan hos ett grundämnes naturliga isotoper och har därför ofta decimaler.', [['masstal'], ['heltal', 'antal'], ['medelvärde', 'genomsnitt'], ['isotop']], { min: 3, d: 3 }),
    ],
    summary: ['Masstal: en isotop, heltal.', 'Atommassa: medelvärde av isotoper, ofta decimaler.', 'Atommassa mäts i u.', 'Frågor om en specifik isotop – använd masstalet.'],
    flashcards: [['Masstal eller atommassa: 35,45?', 'Atommassa (medelvärde).'], ['Varför har atommassan decimaler?', 'Den är ett vägt medelvärde av grundämnets isotoper.']],
    related: ['atommassa', 'masstal', 'isotop'],
  }),

  lesson({
    id: 'm1-l13',
    title: 'Elektronskal',
    section: 'Elektronerna bestämmer',
    minutes: 10,
    goal: 'Idag ska vi förstå hur elektronerna är ordnade i skal.',
    objectives: ['Förklara att elektronerna i skalmodellen finns i skal runt kärnan.', 'Fördela elektronerna i skal för de 20 första grundämnena.', 'Veta att K-skalet rymmer 2 och L-skalet 8 elektroner.'],
    prerequisites: ['m1-l06', 'm1-l09'],
    what: [
      'I **skalmodellen** ligger elektronerna i **skal** – lager på olika avstånd från kärnan. Skalen heter K, L, M och så vidare inifrån och ut.',
      'K-skalet rymmer högst 2 elektroner, L-skalet högst 8. Det tredje skalet (M) har ofta 8 som en stabil nivå för de första grundämnena.',
    ],
    why: [
      'Elektroner nära kärnan dras hårdare mot den och har lägre energi. Det är "billigast" i energi att ligga nära kärnan, så de inre skalen fylls först.',
      'Varje skal har bara plats för ett visst antal elektroner. När ett skal är fullt måste nästa elektron ta plats längre ut.',
    ],
    how: [
      'Fyll skalen inifrån och ut. Natrium har 11 elektroner: 2 i K, 8 i L och 1 i M. Det skrivs **2, 8, 1**.',
      'Antalet skal motsvarar vilken rad (period) ämnet står på i periodiska systemet.',
    ],
    where: [
      'Fyrverkeriers färger kommer från elektroner som hoppar mellan skal och sänder ut ljus av en viss färg.',
    ],
    misconceptions: [
      { myth: 'Skalen är fysiska skal eller banor.', truth: 'Skalen är energinivåer. Modellen är en förenkling som fungerar bra för att förstå kemi på den här nivån.' },
    ],
    simple: [
      'I skalmodellen ligger elektronerna i skal, som lager runt kärnan.',
      'Det innersta skalet (K) rymmer högst 2 elektroner. Nästa skal (L) rymmer högst 8.',
      'Elektronerna fyller skalen inifrån och ut.',
    ],
    detailed: [
      'Skalen heter K, L, M, N och så vidare, inifrån och ut. Ett skal kan rymma högst 2n² elektroner, där n är skalets nummer: K (n=1) 2 st, L (n=2) 8 st, M (n=3) 18 st.',
      'För de 20 första grundämnena gäller en enkel regel: 2 i första skalet, 8 i andra, 8 i tredje, och resten i fjärde. Natrium (11 elektroner): 2, 8, 1. Kalcium (20): 2, 8, 8, 2.',
      'Från grundämne 21 (skandium) börjar M-skalet fyllas på till 18, men det sker efter att N-skalet redan fått elektroner. Därför är det mer invecklat för övergångsmetallerna.',
      'Elektroner i yttre skal har mer energi och hålls lösare av kärnan än elektroner i inre skal.',
    ],
    visual: { kind: 'atom', protons: 18, neutrons: 22, electrons: 18, highlight: 'shell', caption: 'Argon: 2, 8, 8. Klicka på skalen!' },
    analogy: {
      text: 'Tänk på en bokhylla med hyllplan. Den nedersta hyllan (närmast kärnan) har plats för 2 böcker. Nästa hylla har plats för 8. Du fyller alltid de nedre hyllorna först innan du ställer böcker högre upp.',
      limits: 'Hyllor har fasta platser, men elektroner har ingen exakt position. Och för tyngre atomer fylls skalen inte strikt i ordning.',
    },
    alternatives: [
      'Steg för steg för syre (8 elektroner): Lägg 2 i första skalet. Kvar: 6. Lägg 6 i andra skalet. Klart: 2, 6.',
      'Tänk på en lök med lager. Elektronerna finns i olika lager, och de innersta lagren fylls först.',
    ],
    caveats: ['Skalmodellen (Bohrs modell) är en förenkling. Moderna modeller använder orbitaler (s, p, d, f), men skalmodellen räcker långt i den här kursen.'],
    check: mcq('Hur många elektroner får plats i det innersta skalet (K-skalet)?', ['2', '8', '18'], 0, 'K-skalet rymmer högst 2 elektroner.'),
    followUp: mcq('Litium har 3 elektroner. Hur fördelas de?', ['3', '2, 1', '1, 2'], 1, 'Först 2 i K-skalet, sedan 1 i L-skalet.'),
    apply: fill('Hur fördelas elektronerna i en neutral aluminiumatom (13 elektroner)? Skriv t.ex. 2,8,1', ['2,8,3', '2 8 3', '2, 8, 3'], '2 i K-skalet, 8 i L-skalet och 3 i M-skalet: 2, 8, 3.'),
    practice: [
      fill('Skriv elektronfördelningen för klor (17 elektroner).', ['2,8,7', '2 8 7', '2, 8, 7'], '2 + 8 + 7 = 17.'),
      mcq('Vilket grundämne har elektronfördelningen 2, 8, 2?', ['Magnesium', 'Kisel', 'Neon'], 0, '2 + 8 + 2 = 12 elektroner = magnesium.', { d: 2 }),
      atomQ('Bygg en neutral kväveatom (7 protoner, 7 neutroner, 7 elektroner) och titta på skalen.', { protons: 7, neutrons: 7, electrons: 7 }, 'Kväve: 2, 5.'),
      order('Ordna skalen inifrån och ut.', ['K', 'L', 'M', 'N'], 'K är innerst, sedan L, M och N.'),
    ],
    summary: ['Elektronerna ligger i skal runt kärnan.', 'K rymmer 2, L rymmer 8.', 'Fyll inifrån och ut.', 'Skalmodellen är en förenklad modell.'],
    flashcards: [['Hur många elektroner rymmer K-skalet?', '2.'], ['Hur många rymmer L-skalet?', '8.'], ['Elektronfördelning för natrium?', '2, 8, 1.']],
    related: ['elektronskal', 'elektron', 'skalmodellen'],
  }),

  lesson({
    id: 'm1-l14',
    title: 'Valenselektroner',
    section: 'Elektronerna bestämmer',
    minutes: 10,
    goal: 'Idag ska vi förstå vad valenselektroner är.',
    objectives: ['Förklara att valenselektroner är elektronerna i det yttersta skalet.', 'Räkna ut antalet valenselektroner för huvudgruppsämnen.', 'Koppla valenselektroner till grupperna i periodiska systemet.'],
    prerequisites: ['m1-l13'],
    what: [
      '**Valenselektroner** är elektronerna i atomens yttersta skal.',
    ],
    why: [
      'När atomer möts är det de yttersta elektronerna som kommer i kontakt med andra atomer. De inre elektronerna ligger skyddade närmare kärnan. Därför är det bara valenselektronerna som deltar i kemiska reaktioner.',
    ],
    how: [
      'Skriv elektronfördelningen och titta på sista siffran. Svavel: 2, 8, 6 → 6 valenselektroner.',
      'För huvudgrupperna i periodiska systemet kan du läsa av antalet direkt: grupp 1 har 1, grupp 2 har 2, grupp 13 har 3 … grupp 17 har 7.',
    ],
    where: [
      'Att natrium och kalium beter sig likadant (båda reagerar häftigt med vatten) beror på att båda har 1 valenselektron.',
    ],
    misconceptions: [
      { myth: 'Alla elektroner i atomen deltar i reaktioner.', truth: 'Bara de yttersta – valenselektronerna – gör det i vanlig kemi.' },
    ],
    simple: [
      'Valenselektroner är elektronerna i atomens yttersta skal.',
      'Det är valenselektronerna som deltar när atomer reagerar.',
      'Svavel har 2, 8, 6 – alltså 6 valenselektroner.',
    ],
    detailed: [
      'För huvudgruppsämnena (grupp 1, 2 och 13–18) kan du läsa antalet valenselektroner direkt från gruppen: grupp 1 har 1, grupp 2 har 2, grupp 13 har 3, och så vidare upp till grupp 18 som har 8 (utom helium som har 2).',
      'Ämnen i samma grupp har lika många valenselektroner. Därför liknar de varandra kemiskt. Natrium och kalium reagerar till exempel på liknande sätt med vatten.',
      'Valenselektronerna är längst bort från kärnan och hålls lösast. Därför är det de som lättast flyttas eller delas.',
      'För övergångsmetallerna (grupp 3–12) är det mer komplicerat, eftersom även elektroner i näst yttersta skalet kan delta.',
    ],
    visual: { kind: 'atom', protons: 16, neutrons: 16, electrons: 16, highlight: 'electron', caption: 'Svavel: 2, 8, 6. De 6 elektronerna längst ut är valenselektroner.' },
    analogy: {
      text: 'Tänk på en restaurang med tre rum. De som sitter längst ut, närmast entrén, är de som först möter nya gäster. Valenselektronerna sitter längst ut – det är de som möter andra atomer och avgör vad som händer.',
      limits: 'Restauranggäster väljer var de sitter. Elektroner väljer ingenting – deras placering följer naturens lagar.',
    },
    alternatives: [
      'Titta bara på sista siffran i elektronfördelningen. Klor: 2, 8, 7 → 7 valenselektroner. Klart!',
      'Hitta grundämnet i periodiska systemet. Grupp 1 → 1. Grupp 2 → 2. Grupp 13 → 3. Grupp 17 → 7. Ta bort tiotalet för grupperna 13–18.',
    ],
    caveats: ['Regeln "gruppnummer → valenselektroner" gäller bara huvudgrupperna, inte övergångsmetallerna.'],
    check: mcq('Vad är valenselektroner?', ['Elektronerna i innersta skalet', 'Elektronerna i yttersta skalet', 'Alla elektroner i atomen'], 1, 'Valenselektroner är elektronerna i det yttersta skalet.'),
    followUp: fill('Klor har elektronfördelningen 2, 8, 7. Hur många valenselektroner har klor?', ['7'], 'Sista siffran: 7.', { numeric: true }),
    apply: mcq('Varför reagerar natrium och kalium på liknande sätt?', ['De har samma masstal', 'De har lika många valenselektroner', 'De har lika många neutroner'], 1, 'Båda finns i grupp 1 och har 1 valenselektron. Valenselektronerna styr kemin.', { d: 2 }),
    practice: [
      fill('Hur många valenselektroner har syre (2, 6)?', ['6'], 'Sista siffran: 6.', { numeric: true }),
      elementQ('Klicka på ett grundämne som har 2 valenselektroner och finns i period 3.', 12, 'Magnesium (2, 8, 2) finns i grupp 2 och period 3.', { d: 2 }),
      match('Para ihop grupp med antal valenselektroner.', [['Grupp 1', '1'], ['Grupp 2', '2'], ['Grupp 16', '6'], ['Grupp 17', '7']], 'För grupp 13–18: ta bort tiotalet.', { d: 2 }),
      explain('Varför är valenselektronerna viktigast när atomer reagerar?', 'Valenselektronerna finns längst ut i atomen och hålls lösast av kärnan. Det är de som möter andra atomer och som kan avges, tas upp eller delas vid kemiska reaktioner.', [['yttersta', 'längst ut', 'ytter'], ['lösast', 'svagast', 'längst bort'], ['avge', 'ta upp', 'dela', 'reagera']], { min: 2, d: 3 }),
    ],
    summary: ['Valenselektroner = elektroner i yttersta skalet.', 'De styr hur atomer reagerar.', 'Grupp 1–2: 1–2 st. Grupp 13–18: 3–8 st.', 'Samma grupp → liknande kemi.'],
    flashcards: [['Vad är valenselektroner?', 'Elektronerna i yttersta skalet.'], ['Hur många valenselektroner har grupp 17?', '7.'], ['Varför liknar ämnen i samma grupp varandra?', 'De har lika många valenselektroner.']],
    related: ['valenselektron', 'elektronskal', 'grupp'],
  }),

  lesson({
    id: 'm1-l15',
    title: 'Vad är ädelgasstruktur?',
    section: 'Elektronerna bestämmer',
    minutes: 10,
    goal: 'Idag ska vi förstå vad ädelgasstruktur är.',
    objectives: ['Förklara att ädelgaserna har fullt yttersta skal.', 'Förklara vad ädelgasstruktur och oktettregeln innebär.', 'Känna till att oktettregeln har undantag.'],
    prerequisites: ['m1-l14'],
    what: [
      '**Ädelgaserna** (helium, neon, argon m.fl.) har ett fullt yttersta skal. En atom eller jon som har samma elektronuppställning som en ädelgas sägs ha **ädelgasstruktur**.',
    ],
    why: [
      'Ett fullt yttersta skal är ett mycket stabilt läge med låg energi. Ädelgaserna har inget att vinna på att ta upp, ge bort eller dela elektroner – därför reagerar de nästan aldrig.',
      'Andra atomer "strävar" inte medvetet, men reaktioner som leder till ädelgasstruktur frigör ofta energi och sker därför gärna.',
    ],
    how: [
      'Neon har 2, 8 – fullt. Natrium har 2, 8, 1. Om natrium blir av med sin enda yttre elektron får den 2, 8 – samma som neon.',
      'Tumregeln att atomer gärna får 8 elektroner ytterst kallas **oktettregeln**. Väte och helium nöjer sig med 2.',
    ],
    where: [
      'Neonskyltar och argon i glödlampor används just för att gaserna inte reagerar med något.',
    ],
    misconceptions: [
      { myth: 'Atomer vill ha 8 elektroner.', truth: 'Atomer vill ingenting. Det är bara så att lägen med fullt skal har lägre energi och därför är stabilare.' },
    ],
    simple: [
      'Ädelgaserna i grupp 18 har ett fullt yttersta skal.',
      'De reagerar nästan aldrig med andra ämnen.',
      'När en atom eller jon får samma elektronuppställning som en ädelgas säger man att den har ädelgasstruktur.',
    ],
    detailed: [
      'Neon har 2, 8. Argon har 2, 8, 8. Båda har 8 elektroner i yttersta skalet. Helium har 2 elektroner, men eftersom K-skalet bara rymmer 2 är det också fullt.',
      'Oktettregeln säger att atomer i huvudgrupperna ofta reagerar så att de får 8 elektroner i yttersta skalet (en oktett). Okta betyder åtta.',
      'Regeln är en tumregel, inte en naturlag. Väte och litium når "heliumstruktur" med 2 elektroner. Bor i BF₃ har bara 6 elektroner runt sig. Svavel i SF₆ har fler än 8. Och övergångsmetallerna följer ofta inte regeln alls.',
      'Ädelgasstruktur är vanlig eftersom den ofta motsvarar ett energimässigt gynnsamt läge. Men om något bildas beror också på omgivningen, till exempel om det finns vatten, andra joner och energi tillgänglig.',
    ],
    visual: { kind: 'periodic', groups: [18], caption: 'Ädelgaserna i grupp 18. Klicka på en ruta för att se elektronerna.' },
    analogy: {
      text: 'Tänk på en äggkartong med plats för 8 ägg. En full kartong är "komplett" och lätt att stapla och förvara. En kartong med 7 ägg letar man ett ägg till, och en kartong med bara 1 ägg tömmer man hellre. Atomer med nästan fullt eller nästan tomt yttersta skal är ofta reaktiva.',
      limits: 'Atomer letar inte och vill inte ha något. Det handlar om energi: ett fullt skal motsvarar ofta lägre energi i en viss situation.',
    },
    alternatives: [
      'Ädelgaser är kemins "nöjda" ämnen – deras yttersta skal är fullt, så det finns oftast inget att vinna energimässigt på att reagera.',
      'Natrium har 2, 8, 1. Om den blir av med 1 elektron får den 2, 8 – samma som neon. Klor har 2, 8, 7. Tar den emot 1 får den 2, 8, 8 – samma som argon.',
    ],
    caveats: ['Atomer "vill" inte ha åtta elektroner – det är ett bekvämt sätt att prata. Egentligen handlar det om energi.', 'Oktettregeln har många undantag, särskilt för övergångsmetaller och ämnen i period 3 och nedåt.'],
    check: mcq('Varför reagerar ädelgaserna nästan aldrig?', ['De är för tunga', 'De har fullt yttersta skal', 'De saknar elektroner'], 1, 'Ädelgaserna har fullt yttersta skal, vilket är ett energimässigt gynnsamt läge.'),
    followUp: tf('Neon (2, 8) har ett fullt yttersta skal.', true, 'Ja, L-skalet rymmer 8 och har 8.'),
    apply: mcq('Vilken jon har samma elektronfördelning som neon (2, 8)?', ['Na⁺', 'Cl⁻', 'K⁺'], 0, 'Natrium (2, 8, 1) avger en elektron och blir Na⁺ med 2, 8.', { d: 2, wrong: { 1: 'Cl⁻ har 2, 8, 8 – samma som argon.', 2: 'K⁺ har 2, 8, 8 – samma som argon.' } }),
    practice: [
      tf('Oktettregeln gäller för alla ämnen utan undantag.', false, 'Den har undantag, till exempel väte (2 elektroner), BF₃ och övergångsmetaller.', { d: 2 }),
      mcq('Vilket ämne är en ädelgas?', ['Klor', 'Argon', 'Syre'], 1, 'Argon finns i grupp 18.'),
      fill('Hur många elektroner har heliums yttersta skal?', ['2'], 'Helium har 2 elektroner, och K-skalet rymmer högst 2.', { numeric: true }),
      explain('Förklara vad ädelgasstruktur betyder.', 'Ädelgasstruktur betyder att en atom eller jon har samma elektronuppställning som en ädelgas, oftast 8 elektroner i yttersta skalet (2 för de minsta). Det är ofta ett energimässigt gynnsamt läge.', [['ädelgas'], ['fullt', 'åtta', '8', 'oktett'], ['yttersta skal', 'ytterskal'], ['energi', 'stabil']], { min: 3, d: 3 }),
    ],
    summary: ['Ädelgaser har fullt yttersta skal.', 'Ädelgasstruktur = samma elektronuppställning som en ädelgas.', 'Oktettregeln: ofta 8 i yttersta skalet.', 'Regeln har undantag – det handlar om energi.'],
    flashcards: [['Vad är ädelgasstruktur?', 'Samma elektronuppställning som en ädelgas, ofta 8 i yttersta skalet.'], ['Vad säger oktettregeln?', 'Huvudgruppsatomer reagerar ofta så att de får 8 elektroner i yttersta skalet.'], ['Ge ett undantag från oktettregeln.', 'Väte (2 elektroner), BF₃, SF₆ eller övergångsmetaller.']],
    related: ['adelgasstruktur', 'oktettregeln', 'adelgas', 'valenselektron'],
  }),

  lesson({
    id: 'm1-l16',
    title: 'Varför reagerar atomer?',
    section: 'Elektronerna bestämmer',
    minutes: 10,
    goal: 'Idag ska vi förstå varför atomer reagerar med varandra.',
    objectives: ['Förklara att kemiska reaktioner sker när de leder till ett energimässigt gynnsammare läge.', 'Beskriva att atomer kan avge, ta upp eller dela elektroner.', 'Förklara varför "atomer vill ha 8" är ett förenklat sätt att prata.'],
    prerequisites: ['m1-l15'],
    what: [
      'En **kemisk reaktion** är när atomer byter partner och nya ämnen bildas. Den här sidan handlar om **varför** det händer.',
    ],
    why: [
      'Allt i naturen tenderar att gå mot lägen med **lägre energi**, som en boll som rullar nedför en backe. Atomer som binder till varandra hamnar ofta i ett sådant lägre energiläge.',
      'Skillnaden i energi frigörs, ofta som värme eller ljus. Därför blir det varmt när något brinner.',
    ],
    how: [
      'Det finns två huvudsätt: elektroner kan **flyttas** från en atom till en annan (då bildas joner), eller atomer kan **dela** elektroner (då bildas molekyler).',
      'Ofta leder det till att atomerna får fulla yttersta skal – ädelgasstruktur.',
    ],
    where: [
      'När ved brinner reagerar kol och väte i veden med syre i luften. De nya bindningarna har lägre energi än de gamla, och skillnaden känns som värme.',
    ],
    misconceptions: [
      { myth: 'Atomer reagerar för att de vill bli ädelgaser.', truth: 'De blir inte ädelgaser – de behåller sina protoner. De får bara samma elektronuppställning, och det är ett lågenergiläge.' },
    ],
    simple: [
      'Atomer reagerar när de tillsammans kan nå ett läge med lägre energi.',
      'Det kan ske genom att elektroner flyttas från en atom till en annan, eller genom att atomer delar elektroner.',
      'Ofta leder det till att atomerna får ädelgasstruktur.',
    ],
    detailed: [
      'Natur strävar efter lägre energi, ungefär som en boll som rullar nedför en backe. När natrium och klor reagerar frigörs mycket energi – det är därför reaktionen är så kraftig.',
      'Metaller (till vänster i periodiska systemet) har få valenselektroner och avger dem ganska lätt. Ickemetaller (till höger) har många valenselektroner och tar gärna upp eller delar elektroner.',
      'Det kostar faktiskt energi att ta bort en elektron från en natriumatom. Men den energin vinns tillbaka – och mer därtill – när de positiva och negativa jonerna dras till varandra och bildar ett salt.',
      'Därför säger kemister att "atomer vill ha fullt skal" bara som en förenkling. Atomer vill ingenting. Det är energin i hela systemet som avgör.',
    ],
    visual: { kind: 'electron-transfer', metal: 11, nonmetal: 17, caption: 'Tryck på knappen för att flytta natriums valenselektron till klor.' },
    analogy: {
      text: 'Tänk dig två personer på en fest. En har en extra biljett hon inte behöver, den andra saknar exakt en biljett. När biljetten byter ägare blir båda nöjdare – och nu har de en anledning att hålla ihop resten av kvällen. Elektronen flyttas, och de laddade jonerna dras sedan till varandra.',
      limits: 'Atomer är inte nöjda eller missnöjda. Det som avgör är energin. Och elektronen "ges inte bort" frivilligt – överföringen sker eftersom slutresultatet har lägre energi.',
    },
    alternatives: [
      'Tänk på en boll på en backe. Den rullar nedåt av sig själv, mot lägre energi. Kemiska reaktioner sker på liknande sätt: produkterna har ofta lägre energi än utgångsämnena.',
      'Metaller avger elektroner, ickemetaller tar upp elektroner eller delar dem. När det händer bildas joner eller molekyler som är energimässigt gynnsammare.',
    ],
    caveats: ['Atomer har ingen vilja. Uttryck som "vill ha" är bara ett sätt att prata.', 'Alla reaktioner sker inte bara för att de är energimässigt gynnsamma – ofta behövs en startenergi (aktiveringsenergi), till exempel en tändsticka.'],
    check: mcq('Vad är det egentligen som avgör om atomer reagerar?', ['Att atomerna vill ha åtta elektroner', 'Om reaktionen leder till ett energimässigt gynnsammare läge', 'Hur många neutroner atomerna har'], 1, 'Det handlar om energi. "Vill ha åtta" är ett förenklat sätt att uttrycka det.', { wrong: { 0: 'Atomer har ingen vilja. Det är en förenkling – egentligen handlar det om energi.', 2: 'Neutronerna påverkar inte kemiska reaktioner.' } }),
    followUp: tf('Metaller avger ofta elektroner när de reagerar.', true, 'Ja, metaller har få valenselektroner och avger dem ofta.'),
    apply: mcq('Natrium (2, 8, 1) reagerar med klor (2, 8, 7). Vad händer med elektronerna?', ['Klor ger 7 elektroner till natrium', 'Natrium ger 1 elektron till klor', 'De delar på 8 elektroner'], 1, 'Natrium avger sin enda valenselektron till klor. Natrium blir Na⁺ och klor blir Cl⁻.', { d: 2 }),
    practice: [
      tf('Atomer reagerar för att de har en vilja att bli ädelgaser.', false, 'Atomer har ingen vilja. Det är ett förenklat språk – det handlar om energi.'),
      mcq('Vad behövs ofta för att en reaktion ska komma igång?', ['Aktiveringsenergi', 'Fler neutroner', 'En katalysator alltid'], 0, 'Många reaktioner behöver startenergi, till exempel en gnista eller en låga.', { d: 2 }),
      mcq('Vilka ämnen tar ofta upp elektroner?', ['Metaller', 'Ickemetaller', 'Ädelgaser'], 1, 'Ickemetaller har många valenselektroner och tar ofta upp fler.'),
      explain('Förklara varför natrium och klor reagerar med varandra. Använd ordet energi.', 'Natrium har 1 valenselektron och klor har 7. När natrium avger sin elektron till klor bildas Na⁺ och Cl⁻, som båda har ädelgasstruktur. Jonerna attraherar varandra och bildar natriumklorid, vilket ger ett läge med lägre energi.', [['valenselektron', 'elektron'], ['avger', 'ger', 'flyttas', 'överförs'], ['jon', 'Na⁺', 'Cl⁻'], ['energi']], { min: 3, d: 3 }),
    ],
    summary: ['Reaktioner sker när de leder till lägre energi.', 'Atomer kan avge, ta upp eller dela elektroner.', 'Metaller avger, ickemetaller tar upp eller delar.', 'Atomer "vill" ingenting – det är energin som styr.'],
    flashcards: [['Varför reagerar atomer?', 'Reaktionen leder till ett läge med lägre energi.'], ['Vad är aktiveringsenergi?', 'Den energi som behövs för att starta en reaktion.']],
    related: ['kemisk-reaktion', 'energi', 'valenselektron', 'adelgasstruktur'],
  }),
]
