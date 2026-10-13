import { explain, fill, lesson, match, mcq, tf } from '../builders'

export const m11a = [
  lesson({
    id: 'm11-l01',
    title: 'Vad är bioteknik?',
    section: 'Mikroorganismer till nytta',
    minutes: 8,
    goal: 'Idag ska vi förstå vad bioteknik är.',
    objectives: ['Förklara vad bioteknik är.', 'Skilja på traditionell och modern bioteknik.', 'Ge exempel på bioteknik i vardagen.'],
    prerequisites: ['m5-l17', 'm5-l04'],
    what: [
      '**Bioteknik** betyder att man använder **levande organismer**, celler eller molekyler från dem för att tillverka något eller lösa ett problem.',
      '**Traditionell bioteknik** har använts i tusentals år: bröd, öl, vin, yoghurt och ost görs med hjälp av mikroorganismer. **Modern bioteknik** använder kunskap om DNA, till exempel för att få bakterier att tillverka läkemedel.',
    ],
    why: [
      'Levande celler är fantastiska kemiska fabriker. De kan tillverka komplicerade molekyler – som proteiner – vid rumstemperatur, av enkla råvaror och med mycket lite avfall. Ofta är det svårt eller omöjligt att göra samma sak med vanlig kemi.',
    ],
    how: [
      'Mikroorganismer (bakterier, jäst, alger) förökar sig snabbt och kan odlas i stora tankar. Man ger dem näring och rätt temperatur, och de gör jobbet.',
      'Med **genteknik** kan man ge en organism nya gener, så att den tillverkar något den inte gjorde förut – till exempel människans insulin.',
    ],
    where: [
      'Tvättmedel innehåller enzymer tillverkade av mikroorganismer. Insulin, vissa vaccin och många andra läkemedel tillverkas med bioteknik.',
      'Reningsverk använder bakterier för att rena avloppsvatten.',
    ],
    misconceptions: [
      { myth: 'Bioteknik är något helt nytt.', truth: 'Människan har använt jäst och bakterier i över 7 000 år. Det nya är att vi förstår DNA och kan ändra gener.' },
    ],
    simple: [
      'Bioteknik = använda levande organismer för att göra något nyttigt.',
      'Traditionell bioteknik: bröd, ost, yoghurt.',
      'Modern bioteknik: t.ex. bakterier som tillverkar läkemedel.',
    ],
    detailed: [
      'Bioteknik delas ibland in i färger: röd (medicin), grön (jordbruk), vit (industri) och blå (hav).',
      'Svenska företag har varit viktiga inom bioteknik, t.ex. för läkemedel och enzymer.',
      'Bioteknik kan bidra till hållbar utveckling, t.ex. med biobränslen och nedbrytbara material.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Traditionell bioteknik', points: ['Bröd, öl och vin (jäst)', 'Yoghurt och ost (bakterier)', 'Använts i tusentals år'], tone: 'cream' },
        { title: 'Modern bioteknik', points: ['Insulin från bakterier', 'Genmodifierade grödor', 'CRISPR och gentester'], tone: 'lavender' },
      ],
      caption: 'Två sorters bioteknik.',
    },
    analogy: {
      text: 'Bioteknik är som att anställa miljarder mikroskopiska arbetare. De jobbar dygnet runt, kräver bara socker och värme, och kan till och med lära sig nya arbetsuppgifter om man ger dem en ny instruktionsbok (gener).',
      limits: 'Arbetare kan säga nej. Mikroorganismer följer bara sina gener – och kan ibland göra saker man inte planerat.',
    },
    alternatives: ['Levande celler = små fabriker.'],
    caveats: ['Bioteknik väcker också etiska frågor, som tas upp i slutet av kapitlet.'],
    check: mcq('Vad är bioteknik?', ['Att använda levande organismer för att göra något nyttigt', 'Att bygga robotar', 'Att studera stenar'], 0, 'Levande organismer som verktyg.'),
    followUp: tf('Att baka bröd med jäst är bioteknik.', true, 'Traditionell bioteknik.'),
    apply: mcq('Varför använder man bakterier för att tillverka insulin?', ['Celler kan tillverka komplicerade proteiner billigt och effektivt', 'Bakterier smakar gott', 'Insulin finns i jorden'], 0, 'Celler är effektiva fabriker.', { d: 2 }),
    practice: [
      match('Traditionell eller modern?', [['Ost', 'Traditionell'], ['Insulin från bakterier', 'Modern'], ['Öl', 'Traditionell']], 'Två sorter.'),
      tf('Bioteknik är en helt ny uppfinning.', false, 'Den har använts i tusentals år.'),
      fill('Med ____ kan man ge en organism nya gener.', ['genteknik'], 'Genteknik.'),
      explain('Förklara varför levande celler är bra "fabriker".', 'Celler kan tillverka komplicerade molekyler som proteiner vid rumstemperatur, av enkla råvaror, med enzymer och lite avfall. Mikroorganismer förökar sig dessutom snabbt.', [['protein', 'molekyl'], ['rumstemperatur', 'enkla', 'lite energi'], ['föröka', 'snabbt']], { min: 2, d: 2 }),
    ],
    summary: ['Bioteknik använder levande organismer.', 'Traditionell: bröd, ost, yoghurt.', 'Modern: genteknik och läkemedel.', 'Celler är effektiva fabriker.'],
    flashcards: [['Vad är bioteknik?', 'Användning av levande organismer för att framställa produkter eller lösa problem.'], ['Ge ett exempel på modern bioteknik.', 'Insulin som tillverkas av bakterier.']],
    related: ['bioteknik', 'mikroorganism', 'genteknik'],
  }),

  lesson({
    id: 'm11-l02',
    title: 'Jäst och svampar',
    section: 'Mikroorganismer till nytta',
    minutes: 9,
    goal: 'Idag ska vi förstå hur jäst och andra svampar används av människan.',
    objectives: ['Förklara vad jäsning är.', 'Beskriva hur jäst används i bakning och bryggning.', 'Ge exempel på andra nyttiga svampar.'],
    prerequisites: ['m11-l01', 'm5-l15'],
    curriculum: ['mikro', 'bioteknik'],
    what: [
      '**Jäst** är en encellig **svamp**. Den äter socker och kan bryta ned det både med syre (cellandning) och utan syre (**jäsning**).',
      'Vid jäsning bildas **etanol** (alkohol) och **koldioxid**.',
    ],
    why: [
      'Utan syre kan jästen inte cellandas på vanligt sätt. Jäsningen ger mycket mindre energi, men det räcker för att överleva. Det som är "avfall" för jästen – koldioxid och alkohol – är precis det människan vill ha.',
    ],
    how: [
      '**Bakning**: jästen bryter ned socker i degen och bildar koldioxid. Gasbubblorna fastnar i degen och får den att jäsa. Alkoholen kokar bort i ugnen.',
      '**Bryggning och vin**: jästen jäser socker i maltdryck eller druvsaft till alkohol. Koldioxiden ger bubblor.',
      'Andra svampar: **mögelsvampen** *Penicillium* bildar antibiotikumet penicillin. Mögelsvampar används också i ostar som brie och ädelost. Svampprotein (mykoprotein) används som köttersättning.',
    ],
    where: [
      'Jästen du köper i affären är levande – därför ska den förvaras kallt och degen ha lagom varm vätska (ca 37 °C).',
      'Surdeg innehåller både vildjäst och mjölksyrabakterier.',
    ],
    misconceptions: [
      { myth: 'Jäst är en sorts bakterie.', truth: 'Jäst är en svamp – en eukaryot organism med cellkärna.' },
      { myth: 'Det är alkoholen som får degen att jäsa.', truth: 'Det är koldioxiden som bildar bubblorna.' },
    ],
    simple: [
      'Jäst är en encellig svamp som äter socker.',
      'Vid jäsning utan syre bildas alkohol och koldioxid.',
      'Koldioxiden får degen att jäsa.',
    ],
    detailed: [
      'Formel för alkoholjäsning: C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂.',
      'För varmt vatten (över ca 50 °C) dödar jästen, eftersom dess enzymer förstörs.',
      'Jästceller används också inom genteknik, t.ex. för att tillverka vaccin och insulin.',
    ],
    visual: {
      kind: 'flow',
      layout: 'line',
      nodes: [
        { label: 'Socker', detail: 'Finns i degen eller saften.', icon: '🍬' },
        { label: 'Jäst', detail: 'Bryter ned sockret utan syre.', icon: '🟤' },
        { label: 'Koldioxid', detail: 'Får degen att jäsa och ger bubblor.', icon: '🫧' },
        { label: 'Alkohol', detail: 'Etanol – kokar bort vid bakning.', icon: '🍷' },
      ],
      caption: 'Alkoholjäsning.',
    },
    analogy: {
      text: 'Jästcellerna är som små bagare som äter socker och "pustar" ut koldioxid. När miljarder av dem pustar inne i en deg blåses den upp som en ballong.',
      limits: 'Bagare jobbar för att de vill. Jäst gör bara det dess enzymer och gener styr.',
    },
    alternatives: ['Socker in – koldioxid och alkohol ut.'],
    caveats: ['Jäsning kan också betyda att bakterier bildar mjölksyra, som i yoghurt.'],
    check: mcq('Vad bildas när jäst jäser socker?', ['Syre och vatten', 'Alkohol och koldioxid', 'Protein'], 1, 'Etanol och CO₂.'),
    followUp: tf('Jäst är en svamp.', true, 'En encellig svamp.'),
    apply: mcq('Varför jäser inte degen om vattnet är kokhett?', ['Jästen dör när enzymerna förstörs', 'Sockret försvinner', 'Mjölet blir vått'], 0, 'Hög temperatur dödar jästen.', { d: 2 }),
    practice: [
      match('Para ihop.', [['Bakning', 'Koldioxid får degen att jäsa'], ['Bryggning', 'Socker blir alkohol'], ['Penicillium', 'Bildar penicillin']], 'Svampar till nytta.'),
      tf('Det är alkoholen som får degen att jäsa.', false, 'Det är koldioxiden.'),
      fill('Nedbrytning av socker utan syre kallas ____.', ['jäsning'], 'Jäsning.'),
      explain('Förklara vad som händer när en deg jäser.', 'Jästen bryter ned socker i degen genom jäsning och bildar koldioxid. Gasbubblorna fastnar i degen så att den blir större och luftig.', [['jäst'], ['socker'], ['koldioxid', 'gas', 'bubbl']], { min: 3, d: 2 }),
    ],
    summary: ['Jäst är en encellig svamp.', 'Jäsning: socker → alkohol + koldioxid.', 'Används i bakning och bryggning.', 'Mögelsvampar ger penicillin och ost.'],
    flashcards: [['Vad bildas vid alkoholjäsning?', 'Etanol och koldioxid.'], ['Vilken svamp bildar penicillin?', 'Mögelsvampen Penicillium.']],
    related: ['jast', 'jasning', 'mikroorganism'],
  }),

  lesson({
    id: 'm11-l03',
    title: 'Bakterier i mat och industri',
    section: 'Mikroorganismer till nytta',
    minutes: 9,
    goal: 'Idag ska vi förstå hur bakterier används till nytta.',
    objectives: ['Förklara hur mjölksyrabakterier gör yoghurt och ost.', 'Beskriva hur bakterier renar avloppsvatten och bildar biogas.', 'Ge exempel på bakterier i industrin.'],
    prerequisites: ['m11-l01'],
    curriculum: ['mikro', 'bioteknik', 'amnen-miljo'],
    what: [
      'De flesta bakterier är ofarliga, och många är mycket användbara. Människan använder bakterier för att göra **mat**, **rena vatten**, **tillverka energi** och **läkemedel**.',
    ],
    why: [
      'Bakterier finns i enorm variation och kan bryta ned nästan allt organiskt material. De förökar sig snabbt och kan odlas billigt. Dessutom gör deras "avfall" ofta något användbart – syra, gas eller ett protein.',
    ],
    how: [
      '**Mjölksyrabakterier** bryter ned mjölksocker (laktos) till **mjölksyra**. Syran gör att mjölken tjocknar och blir syrlig – yoghurt och filmjölk. Syran hindrar också andra bakterier från att växa, så maten håller längre. Ost, surkål och surdeg görs på liknande sätt.',
      '**Reningsverk**: bakterier bryter ned organiskt material i avloppsvattnet, så att vattnet blir renare innan det släpps ut.',
      '**Biogas**: i syrefria tankar bryter bakterier ned matavfall och slam till **metan**, som kan användas som bränsle i bussar och bilar. Det som blir kvar kan användas som gödsel.',
    ],
    where: [
      'Matavfallet du sorterar i den bruna påsen blir ofta biogas och biogödsel.',
      'Probiotika är levande bakterier i t.ex. filmjölk som kan vara bra för tarmfloran.',
    ],
    misconceptions: [
      { myth: 'Bakterier i mat betyder att maten är dålig.', truth: 'Många livsmedel, som yoghurt och ost, görs med avsikt med nyttiga bakterier.' },
    ],
    simple: [
      'Mjölksyrabakterier gör yoghurt, fil och ost.',
      'Bakterier renar avloppsvatten.',
      'Bakterier bryter ned matavfall till biogas.',
    ],
    detailed: [
      'Biogas består mest av metan och koldioxid. Den räknas som förnybar, eftersom kolet nyligen funnits i levande material.',
      'Bakterier används också för att tillverka aminosyror, vitaminer och enzymer i industriell skala.',
      'Vissa bakterier kan bryta ned olja och används för att sanera förorenad mark.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Mat 🧀', points: ['Yoghurt, fil, ost', 'Surkål, surdeg', 'Mjölksyra konserverar'], tone: 'cream' },
        { title: 'Miljö ♻️', points: ['Reningsverk', 'Biogas av matavfall', 'Sanering av olja'], tone: 'green' },
        { title: 'Medicin 💊', points: ['Insulin', 'Vaccin', 'Enzymer'], tone: 'blue' },
      ],
      caption: 'Bakterier till nytta.',
    },
    analogy: {
      text: 'Bakterier är som naturens städpersonal och kockar i ett. I mejeriet "lagar" de mjölk till yoghurt. I reningsverket "städar" de vattnet. I biogastanken gör de om matrester till bränsle.',
      limits: 'Personal kan styras med ord. Bakterier styrs av temperatur, syre och näring – fel förhållanden ger fel bakterier.',
    },
    alternatives: ['Bakterier gör om saker vi inte vill ha till saker vi vill ha.'],
    caveats: ['Hygien är fortfarande viktig – fel bakterier i maten kan ge matförgiftning.'],
    check: mcq('Vad gör mjölksyrabakterier?', ['Bryter ned laktos till mjölksyra', 'Bildar alkohol', 'Gör fotosyntes'], 0, 'Mjölksyra.'),
    followUp: tf('Bakterier kan bilda biogas av matavfall.', true, 'I syrefria tankar.'),
    apply: mcq('Varför håller yoghurt längre än vanlig mjölk?', ['Mjölksyran hindrar andra bakterier från att växa', 'Yoghurt är steril', 'Yoghurt innehåller antibiotika'], 0, 'Syran konserverar.', { d: 2 }),
    practice: [
      match('Para ihop.', [['Yoghurt', 'Mjölksyrabakterier'], ['Biogas', 'Metan från matavfall'], ['Reningsverk', 'Bakterier renar vatten']], 'Bakterier till nytta.'),
      tf('Alla bakterier i mat är farliga.', false, 'Många är nyttiga.'),
      fill('Biogas består främst av gasen ____.', ['metan'], 'Metan, CH₄.'),
      explain('Förklara hur matavfall kan bli bränsle.', 'Matavfallet bryts ned av bakterier i syrefria tankar. Bakterierna bildar biogas som till största delen är metan. Metanet kan användas som bränsle i bussar och bilar.', [['bakterie'], ['syrefri', 'utan syre'], ['metan', 'biogas'], ['bränsle']], { min: 3, d: 3 }),
    ],
    summary: ['Mjölksyrabakterier gör yoghurt och ost.', 'Bakterier renar avloppsvatten.', 'Biogas bildas av matavfall.', 'Bakterier tillverkar även läkemedel.'],
    flashcards: [['Vad gör mjölksyrabakterier i mjölk?', 'Bryter ned laktos till mjölksyra.'], ['Vad är biogas?', 'Främst metan som bildas när bakterier bryter ned organiskt material utan syre.']],
    related: ['bakterie', 'mikroorganism', 'bioteknik'],
  }),

  lesson({
    id: 'm11-l04',
    title: 'Alger',
    section: 'Mikroorganismer till nytta',
    minutes: 8,
    goal: 'Idag ska vi förstå vad alger är och hur de kan användas.',
    objectives: ['Förklara vad alger är.', 'Beskriva algernas betydelse i naturen.', 'Ge exempel på hur alger används av människan.'],
    prerequisites: ['m11-l01', 'm5-l14'],
    curriculum: ['mikro', 'bioteknik'],
    what: [
      '**Alger** är organismer som gör **fotosyntes** men inte är landväxter. Det finns **mikroalger** (encelliga, t.ex. växtplankton) och **makroalger** (stora, som tång och kelp).',
    ],
    why: [
      'Alger är grunden i havens näringskedjor – nästan allt liv i havet är beroende av dem. Mikroalger bildar ungefär **hälften av allt syre** på jorden. De växer mycket snabbt och behöver bara ljus, vatten, koldioxid och lite näring – därför är de intressanta för bioteknik.',
    ],
    how: [
      '**Mat**: tång används i sushi (nori), och ämnen från alger används som förtjockningsmedel i glass och sylt.',
      '**Kosttillskott**: vissa mikroalger innehåller mycket protein och omega-3-fettsyror – samma fettsyror som finns i fisk, som fisken egentligen fått från alger.',
      '**Biobränsle**: alger kan lagra mycket fett som kan göras om till bränsle. Forskning pågår för att göra det lönsamt.',
      'Men alger kan också vara ett problem: vid **övergödning** växer alger explosionsartat (**algblomning**), och när de dör och bryts ned går syret i vattnet åt.',
    ],
    where: [
      'Varma somrar syns ofta algblomning i Östersjön – grönaktigt vatten där man inte bör bada.',
      'Tång har länge använts som gödsel på åkrar längs kusterna.',
    ],
    misconceptions: [
      { myth: 'Allt syre kommer från skogarna.', truth: 'Ungefär hälften av jordens syre bildas av alger och växtplankton i haven.' },
    ],
    simple: [
      'Alger gör fotosyntes och lever i vatten.',
      'De bildar ungefär hälften av jordens syre.',
      'Alger används till mat, kosttillskott och kanske bränsle.',
    ],
    detailed: [
      'Cyanobakterier ("blågröna alger") är egentligen bakterier som gör fotosyntes. Vissa bildar gifter vid algblomning.',
      'Algodling kräver ingen åkermark, vilket är en fördel jämfört med vanliga grödor.',
      'Kiselalger har skal av kisel och är vanliga i både hav och sötvatten.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Nytta', points: ['Syre och mat i havet', 'Nori, förtjockningsmedel', 'Omega-3, protein', 'Möjligt biobränsle'], tone: 'green' },
        { title: 'Problem', points: ['Algblomning vid övergödning', 'Syrebrist när algerna bryts ned', 'Vissa bildar gifter'], tone: 'pink' },
      ],
      caption: 'Alger – nytta och problem.',
    },
    analogy: {
      text: 'Alger är som havets gräs och solpaneler i ett. De fångar solens energi och gör mat och syre åt nästan allt liv i havet. Men precis som en gräsmatta som gödslas för mycket kan de växa okontrollerat.',
      limits: 'Gräs står still. Mikroalger flyter fritt och kan föröka sig mycket snabbare.',
    },
    alternatives: ['Alger = havets fotosyntes.'],
    caveats: ['Gruppen alger är mycket blandad och inte en enda släktskapsgrupp.'],
    check: mcq('Vad gör alger?', ['Fotosyntes', 'Bara cellandning', 'Bildar antikroppar'], 0, 'De gör fotosyntes.'),
    followUp: tf('Alger bildar ungefär hälften av jordens syre.', true, 'Tillsammans med växtplankton.'),
    apply: mcq('Varför uppstår syrebrist efter en algblomning?', ['När algerna dör förbrukar nedbrytarna mycket syre', 'Algerna andas in allt syre', 'Algerna gör vattnet varmt'], 0, 'Nedbrytningen kräver syre.', { d: 2 }),
    practice: [
      match('Para ihop.', [['Nori', 'Mat'], ['Omega-3', 'Kosttillskott'], ['Algblomning', 'Övergödning']], 'Alger i olika sammanhang.'),
      tf('Fiskarnas omega-3 kommer ursprungligen från alger.', true, 'Via näringskedjan.', { d: 2 }),
      fill('Encelliga alger kallas ____-alger.', ['mikro'], 'Mikroalger.'),
      explain('Förklara varför alger är intressanta för bioteknik.', 'Alger växer snabbt och behöver bara ljus, vatten, koldioxid och lite näring. De kan bilda protein, fett och omega-3 och kräver ingen åkermark.', [['snabb'], ['ljus', 'fotosyntes', 'koldioxid'], ['protein', 'fett', 'omega', 'bränsle'], ['åkermark']], { min: 2, d: 2 }),
    ],
    summary: ['Alger gör fotosyntes i vatten.', 'De bildar ungefär hälften av jordens syre.', 'Används till mat, tillskott och möjligen bränsle.', 'Övergödning ger algblomning.'],
    flashcards: [['Vad är skillnaden mellan mikroalger och makroalger?', 'Mikroalger är encelliga; makroalger är stora, som tång.'], ['Vad är algblomning?', 'Explosionsartad tillväxt av alger, ofta vid övergödning.']],
    related: ['alg', 'fotosyntes', 'overgodning'],
  }),
]
