import { explain, fill, lesson, match, mcq, order, tf } from '../builders'

export const m10a = [
  lesson({
    id: 'm10-l01',
    title: 'Vad är evolution?',
    section: 'Hur arter förändras',
    minutes: 9,
    goal: 'Idag ska vi förstå vad evolution är.',
    objectives: ['Förklara vad evolution betyder.', 'Förklara att det är populationer som evolverar.', 'Känna till Darwins roll.'],
    prerequisites: ['m5-l17', 'm5-l01'],
    what: [
      '**Evolution** betyder att levande organismer förändras över **många generationer**. Egenskaper som ärvs – som färg, storlek eller motståndskraft – blir vanligare eller ovanligare i en **population** (alla individer av en art i ett område).',
      'Över mycket lång tid kan förändringarna bli så stora att nya arter uppstår. All mångfald av liv på jorden har uppstått genom evolution från gemensamma förfäder.',
    ],
    why: [
      'Evolution sker eftersom tre saker är sanna samtidigt: 1) individer i en population är **olika** (variation), 2) en del av skillnaderna **ärvs** via generna, och 3) alla individer överlever och får inte lika många ungar. De som av någon anledning lyckas bättre för sina gener vidare.',
      'Det är alltså inte något mål eller någon plan bakom evolutionen – den är resultatet av slumpmässig variation och vilka som överlever i en viss miljö.',
    ],
    how: [
      'Den viktigaste mekanismen är **naturligt urval** (nästa sida). Ny variation uppstår genom **mutationer** i DNA och genom att föräldrarnas gener blandas.',
      'Evolution sker oftast långsamt, under tusentals eller miljontals år. Men organismer som förökar sig snabbt, som bakterier, kan evolvera på dagar.',
      'Charles Darwin och Alfred Russel Wallace beskrev naturligt urval 1858. Darwins bok "Om arternas uppkomst" kom ut 1859.',
    ],
    where: [
      'Antibiotikaresistens hos bakterier är evolution som sker mitt framför oss.',
      'Hundraser är exempel på hur människan har styrt urvalet (avel) – alla hundar härstammar från vargar.',
    ],
    misconceptions: [
      { myth: 'Människan härstammar från schimpanser.', truth: 'Människor och schimpanser har en gemensam förfader som levde för ungefär 6–7 miljoner år sedan. Ingen av oss härstammar från den andra.' },
      { myth: 'Evolution betyder att individer förändras under sitt liv.', truth: 'En individ evolverar inte. Det är populationer som förändras över generationer.' },
      { myth: 'Evolution är "bara en teori".', truth: 'I vetenskapen är en teori en väl underbyggd förklaring som stöds av mängder av bevis. Evolutionsteorin är en av de bäst underbyggda inom biologin.' },
    ],
    simple: [
      'Evolution är att arter förändras över många generationer.',
      'Det sker för att individer är olika, skillnader ärvs och alla inte överlever lika bra.',
      'Det är populationer som evolverar, inte individer.',
    ],
    detailed: [
      'Livet på jorden uppstod för ungefär 3,8 miljarder år sedan. Allt liv har en gemensam förfader.',
      'Även slumpen påverkar vilka gener som förs vidare, särskilt i små populationer. Det kallas genetisk drift.',
      'Darwin visste inte hur egenskaper ärvs – generna och DNA upptäcktes senare och bekräftade teorin.',
    ],
    visual: {
      kind: 'flow',
      layout: 'cycle',
      nodes: [
        { label: 'Variation', detail: 'Individer är olika.', icon: '🎨' },
        { label: 'Ärftlighet', detail: 'Skillnaderna sitter delvis i generna.', icon: '🧬' },
        { label: 'Urval', detail: 'Vissa överlever och förökar sig bättre i miljön.', icon: '🦉' },
        { label: 'Ny generation', detail: 'Deras egenskaper blir vanligare.', icon: '🐣' },
      ],
      caption: 'Evolutionens grundrecept – generation efter generation.',
    },
    analogy: {
      text: 'Evolution liknar hur ett språk förändras. Ingen bestämmer att svenskan ska ändras, men varje generation säger saker lite annorlunda. Efter tusen år förstår man knappt det gamla språket. På samma sätt förändras arter lite för varje generation, tills de är helt nya.',
      limits: 'Människor kan välja nya ord medvetet. Evolutionen har ingen vilja – den drivs av slumpmässig variation och urval.',
    },
    alternatives: ['Variation + ärftlighet + urval + tid = evolution.'],
    caveats: ['Evolution leder inte alltid mot "bättre" eller mer avancerat – bara mot det som fungerar i en viss miljö.'],
    check: mcq('Vad är evolution?', ['Att individer förändras under sitt liv', 'Att populationer förändras över generationer', 'Att arter aldrig förändras'], 1, 'Populationer förändras över generationer.'),
    followUp: tf('Människor härstammar från schimpanser.', false, 'Vi har en gemensam förfader.'),
    apply: mcq('Varför kan bakterier evolvera mycket snabbare än elefanter?', ['De har mycket kortare generationstid', 'De är smartare', 'De har inget DNA'], 0, 'Fler generationer på kort tid ger snabbare förändring.', { d: 2 }),
    practice: [
      order('Sätt evolutionens steg i ordning.', ['Individer är olika', 'Skillnaderna ärvs', 'Vissa överlever och förökar sig bättre', 'Deras egenskaper blir vanligare'], 'Variation, ärftlighet, urval.'),
      tf('En vetenskaplig teori är en gissning.', false, 'En teori är en väl underbyggd förklaring.'),
      fill('Boken "Om arternas uppkomst" skrevs av Charles ____.', ['Darwin'], 'Darwin, 1859.'),
      explain('Förklara de tre villkor som krävs för att evolution genom naturligt urval ska ske.', 'Det måste finnas variation mellan individer, variationen måste vara ärftlig, och vissa individer måste överleva och få fler avkommor än andra i miljön.', [['variation', 'olika'], ['ärftlig', 'ärvs', 'gener'], ['överlev', 'föröka', 'avkomma']], { min: 3, d: 3 }),
    ],
    summary: ['Evolution är förändring över generationer.', 'Villkor: variation, ärftlighet, urval.', 'Populationer evolverar, inte individer.', 'Allt liv har gemensamma förfäder.'],
    flashcards: [['Vad är evolution?', 'Förändring av en populations ärftliga egenskaper över generationer.'], ['Vem beskrev naturligt urval?', 'Charles Darwin (och Alfred Russel Wallace).']],
    related: ['evolution', 'population', 'variation'],
  }),

  lesson({
    id: 'm10-l02',
    title: 'Naturligt urval',
    section: 'Hur arter förändras',
    minutes: 10,
    goal: 'Idag ska vi förstå hur naturligt urval fungerar.',
    objectives: ['Förklara naturligt urval steg för steg.', 'Förklara att miljön avgör vilka egenskaper som gynnas.', 'Ge exempel på naturligt urval.'],
    prerequisites: ['m10-l01'],
    curriculum: ['artbildning'],
    what: [
      '**Naturligt urval** betyder att individer med egenskaper som passar miljön bättre har större chans att **överleva och få ungar**. Deras egenskaper blir därför vanligare i nästa generation.',
    ],
    why: [
      'Det föds alltid fler ungar än det finns mat och plats för. Alla kan inte överleva. Vilka som klarar sig beror delvis på slumpen, men också på deras egenskaper – och de egenskaper som ärvs förs vidare.',
    ],
    how: [
      'Exempel – **björkmätaren**: I 1800-talets England fanns ljusa och mörka fjärilar. På ljus, lavbeklädd bark syntes de mörka och åts av fåglar. När industrierna sotade ned träden syntes i stället de ljusa. Mörka fjärilar överlevde bättre och blev vanligare. När luften blev renare blev de ljusa vanligare igen.',
      'Lägg märke till att fjärilarna inte **ändrade färg**. Variationen fanns redan – miljön avgjorde vilken variant som klarade sig bäst.',
      'Det som räknas är inte att vara starkast, utan att **föra vidare sina gener**: överleva **och** få avkomma.',
    ],
    where: [
      'Antibiotikaresistens, insekter som blivit motståndskraftiga mot bekämpningsmedel och fiskar som blivit mindre där man fiskat bort de stora – alla är naturligt urval i vår tid.',
    ],
    misconceptions: [
      { myth: 'Djuren anpassar sig för att de behöver det.', truth: 'Ingen individ kan ändra sina gener för att den behöver. Variationen finns redan, och miljön sorterar.' },
      { myth: '"Survival of the fittest" betyder att de starkaste överlever.', truth: '"Fittest" betyder bäst anpassad till miljön – och det som räknas är hur många avkommor man får.' },
    ],
    simple: [
      'De som passar bäst i miljön överlever och får flest ungar.',
      'Deras egenskaper blir vanligare i nästa generation.',
      'Miljön sorterar – djuren ändrar sig inte för att de vill.',
    ],
    detailed: [
      'Sexuellt urval är en form av urval där egenskaper gynnas för att de lockar partner, t.ex. påfågelns stjärt.',
      'Människan har använt artificiellt urval (avel) i tusentals år för att få fram grödor och husdjur.',
      'Urval kan bara verka på variation som redan finns. Därför är mutationer nödvändiga på lång sikt.',
    ],
    visual: { kind: 'sim', id: 'natural-selection', caption: 'Välj bakgrund och se hur fjärilspopulationen förändras.' },
    visualPrompt: 'Tryck på "Nästa generation" flera gånger. Byt sedan bakgrund.',
    analogy: {
      text: 'Tänk på en klass som leker kurragömma i en skog. De som har kläder i grönt och brunt hittas sist – de "överlever" leken. Om de som vinner fick bestämma klädfärgen för nästa omgång skulle snart alla bära grönt och brunt. Men lekte man i en snöig skog skulle vitt vinna i stället.',
      limits: 'I leken väljer man kläder. I naturen ärvs färgen och kan inte väljas.',
    },
    alternatives: ['Naturen "väljer" inte medvetet – den sållar.'],
    caveats: ['Björkmätarexemplet är förenklat, men huvudidén har bekräftats i många studier.'],
    check: mcq('Vad betyder naturligt urval?', ['De som passar bäst i miljön överlever och förökar sig mer', 'Djur väljer sina egenskaper', 'Alla överlever lika bra'], 0, 'Miljön sorterar.'),
    followUp: tf('Björkmätarna ändrade färg för att gömma sig.', false, 'Variationen fanns redan.'),
    apply: mcq('En population harar lever där det blir allt mindre snö. Vad händer troligen över många generationer?', ['Bruna harar blir vanligare', 'Alla harar blir vita', 'Ingenting'], 0, 'Bruna syns mindre på bar mark och överlever bättre.', { d: 2 }),
    practice: [
      order('Sätt i ordning.', ['Det finns ljusa och mörka fjärilar', 'Träden blir sotiga', 'Fåglar äter fler ljusa fjärilar', 'Mörka fjärilar blir vanligare'], 'Naturligt urval.'),
      tf('Det viktiga i naturligt urval är att föra vidare sina gener.', true, 'Överleva och få avkomma.'),
      fill('Människans styrda urval av husdjur och grödor kallas ____.', ['avel', 'artificiellt urval'], 'Det kallas avel.'),
      explain('Förklara varför fiskar i ett hav där man fiskar bort de största individerna blir mindre över tid.', 'Stora fiskar fångas och får färre ungar, medan små överlever och förökar sig. Storleken är delvis ärftlig, så små fiskar blir vanligare. Det är ett urval.', [['stor'], ['fånga', 'fiska'], ['liten', 'små'], ['ärftlig', 'gener', 'ungar', 'föröka']], { min: 3, d: 3 }),
    ],
    summary: ['Naturligt urval: de bäst anpassade förökar sig mest.', 'Variationen finns redan.', 'Miljön avgör vad som gynnas.', 'Det sker även i dag.'],
    flashcards: [['Vad är naturligt urval?', 'Att individer med egenskaper som passar miljön överlever och förökar sig mer.'], ['Ge ett exempel på naturligt urval i dag.', 'Antibiotikaresistens.']],
    related: ['naturligt-urval', 'variation', 'anpassning'],
  }),

  lesson({
    id: 'm10-l03',
    title: 'Variation och arv',
    section: 'Hur arter förändras',
    minutes: 10,
    goal: 'Idag ska vi förstå var variationen mellan individer kommer ifrån.',
    objectives: ['Förklara hur gener ärvs från föräldrarna.', 'Förklara vad en mutation är.', 'Förklara varför sexuell fortplantning ger variation.'],
    prerequisites: ['m10-l01', 'm5-l18'],
    what: [
      'Ingen människa är exakt lik någon annan (utom nästan enäggstvillingar). Skillnaderna kallas **variation**. En del av variationen beror på **gener**, en del på **miljön** (mat, träning, klimat).',
      'Bara den **ärftliga** variationen – den som sitter i generna – kan föras vidare och påverka evolutionen.',
    ],
    why: [
      'Ärftlig variation uppstår på två sätt: 1) **mutationer** – förändringar i DNA – skapar helt nya varianter av gener, och 2) **sexuell fortplantning** blandar föräldrarnas gener till nya kombinationer.',
    ],
    how: [
      'Du har två uppsättningar kromosomer: en från mamma och en från pappa (23 + 23 = 46). Könscellerna (ägg och spermier) bildas genom **meios**, en särskild celldelning som ger celler med bara 23 kromosomer och där generna blandas.',
      'Därför får varje syskon en egen, unik blandning av föräldrarnas gener.',
      'En **mutation** är ett "stavfel" när DNA kopieras, eller en skada av t.ex. UV-strålning. De flesta mutationer gör ingen skillnad, vissa är skadliga och några få är fördelaktiga. Bara mutationer i könscellerna förs vidare till barnen.',
    ],
    where: [
      'Syskon liknar varandra men är olika – de har fått olika blandningar av samma föräldrars gener.',
      'Enäggstvillingar har samma gener; skillnaderna mellan dem beror främst på miljön.',
    ],
    misconceptions: [
      { myth: 'Egenskaper man skaffar sig under livet ärvs av barnen.', truth: 'En kroppsbyggare får inte barn med stora muskler. Bara egenskaper i generna (i könscellerna) ärvs.' },
    ],
    simple: [
      'Variation beror både på gener och miljö.',
      'Ny ärftlig variation kommer från mutationer.',
      'Sexuell fortplantning blandar föräldrarnas gener.',
    ],
    detailed: [
      'Varje gen kan finnas i olika varianter, så kallade alleler. Till exempel finns olika alleler för blodgrupp.',
      'Vissa alleler är dominanta (syns även om man bara har en), andra recessiva (syns bara om man har två).',
      'Bakterier förökar sig utan sex men kan ändå få variation genom mutationer och genom att utbyta gener.',
    ],
    visual: {
      kind: 'flow',
      layout: 'line',
      nodes: [
        { label: 'Mammas 46 kromosomer', detail: 'Meios ger ägg med 23.', icon: '👩' },
        { label: 'Pappas 46 kromosomer', detail: 'Meios ger spermier med 23.', icon: '👨' },
        { label: 'Befruktning', detail: '23 + 23 = 46 i en ny kombination.', icon: '🧬' },
        { label: 'Unikt barn', detail: 'En ny blandning av generna.', icon: '👶' },
      ],
      caption: 'Sexuell fortplantning blandar generna.',
    },
    analogy: {
      text: 'Tänk dig att mamma och pappa har var sin kortlek. Till varje barn blandar de och tar hälften av korten från var och en. Varje barn får en ny hand – därför blir syskon olika. En mutation är som att ett kort ibland trycks lite fel och blir ett helt nytt kort.',
      limits: 'Kort blandas helt slumpmässigt. Kromosomer följs åt i par, så blandningen följer vissa regler.',
    },
    alternatives: ['Mutation = nya kort. Fortplantning = ny blandning av korten.'],
    caveats: ['Arv är ofta mer komplicerat än en gen = en egenskap; de flesta egenskaper påverkas av många gener och miljön.'],
    check: mcq('Var kommer ny ärftlig variation ifrån?', ['Mutationer', 'Träning', 'Solbränna'], 0, 'Mutationer skapar nya varianter.'),
    followUp: tf('Syskon får exakt samma gener.', false, 'De får olika blandningar (utom enäggstvillingar).'),
    apply: mcq('En person tränar mycket och får stora muskler. Får hennes barn stora muskler av det?', ['Ja, det ärvs', 'Nej, egenskaper man skaffar under livet ärvs inte', 'Bara om barnet är en pojke'], 1, 'Bara det som finns i generna ärvs.', { d: 2 }),
    practice: [
      fill('Könsceller har ____ kromosomer.', ['23'], 'Hälften av 46.', { numeric: true }),
      match('Gener eller miljö?', [['Blodgrupp', 'Gener'], ['Solbränna', 'Miljö'], ['Ett ärr', 'Miljö']], 'Bara gener ärvs.'),
      tf('De flesta mutationer är skadliga.', false, 'De flesta är neutrala.', { d: 2 }),
      explain('Förklara varför sexuell fortplantning ger variation.', 'Vid meios bildas könsceller med hälften av kromosomerna, och generna blandas. Vid befruktningen kombineras gener från två föräldrar. Varje barn får därför en ny unik kombination.', [['meios', 'könscell'], ['hälften', '23'], ['blanda', 'kombination'], ['två föräldrar', 'mamma', 'pappa']], { min: 3, d: 3 }),
    ],
    summary: ['Variation beror på gener och miljö.', 'Bara ärftlig variation påverkar evolutionen.', 'Mutationer skapar nya varianter.', 'Sexuell fortplantning blandar generna.'],
    flashcards: [['Vad är en mutation?', 'En förändring i DNA:s basföljd.'], ['Varför blir syskon olika?', 'De får olika blandningar av föräldrarnas gener.']],
    related: ['variation', 'mutation', 'kromosom'],
  }),

  lesson({
    id: 'm10-l04',
    title: 'Anpassningar',
    section: 'Hur arter förändras',
    minutes: 8,
    goal: 'Idag ska vi förstå vad en anpassning är och hur den uppstår.',
    objectives: ['Förklara vad en anpassning är.', 'Ge exempel på anpassningar i byggnad, funktion och beteende.', 'Förklara hur anpassningar uppstår genom naturligt urval.'],
    prerequisites: ['m10-l02'],
    curriculum: ['artbildning'],
    what: [
      'En **anpassning** är en ärftlig egenskap som gör att en organism klarar sig bra i sin miljö. Den kan gälla **kroppens byggnad** (isbjörnens tjocka päls), **funktion** (kamelens förmåga att spara vatten) eller **beteende** (fåglars flytt söderut).',
    ],
    why: [
      'Anpassningar uppstår genom naturligt urval. Under många generationer har individer med egenskaper som fungerade lite bättre överlevt och förökat sig mer. Små fördelar har lagts ihop till de imponerande anpassningar vi ser i dag.',
    ],
    how: [
      'Exempel: förfäderna till dagens isbjörnar hade varierande päls. De med lite tjockare och ljusare päls överlevde bättre i Arktis. Generation för generation blev tjock vit päls vanligare.',
      'En anpassning passar en viss miljö. Om miljön ändras kan en tidigare fördel bli en nackdel – det isbjörnen har nytta av i Arktis är inte bra i en öken.',
    ],
    where: [
      'Kaktusar har taggar i stället för blad, vilket minskar vattenförlusten. Fjällräven byter till vit päls på vintern. Ökenråttor kissar mycket koncentrerat för att spara vatten.',
      'Dagens klimatförändringar går så snabbt att många arter inte hinner anpassa sig.',
    ],
    misconceptions: [
      { myth: 'Giraffen fick lång hals genom att sträcka på sig.', truth: 'Giraffer med lite längre hals fick mer mat och fler ungar. Halsen blev längre över generationer genom urval – inte genom sträckning.' },
    ],
    simple: [
      'En anpassning är en ärftlig egenskap som hjälper en art att klara sig.',
      'Den uppstår genom naturligt urval över många generationer.',
      'Anpassningar passar en viss miljö.',
    ],
    detailed: [
      'Konvergent evolution är när olika arter utvecklar liknande anpassningar i liknande miljöer, t.ex. delfiners och hajars strömlinjeformade kroppar.',
      'Lamarck trodde på 1800-talet att förvärvade egenskaper ärvs (giraffen sträckte sig). Den idén har motbevisats.',
      'Vissa egenskaper är "rester" från förfäder, t.ex. gåshud hos människor.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Byggnad', points: ['Isbjörnens päls och fettlager', 'Kaktusens taggar', 'Örnens skarpa syn'], tone: 'blue' },
        { title: 'Funktion', points: ['Kamelens vattensparande', 'Fiskars gälar', 'Giftiga grodor'], tone: 'green' },
        { title: 'Beteende', points: ['Fåglars flytt', 'Björnens vinterdvala', 'Bins dans'], tone: 'cream' },
      ],
      caption: 'Olika sorters anpassningar.',
    },
    analogy: {
      text: 'Anpassningar är som nycklar som har filats till under väldigt lång tid. Varje generation filas nyckeln lite – inte medvetet, utan genom att de nycklar som passade lite bättre i låset (miljön) blev kvar. Till slut passar nyckeln perfekt. Men byts låset ut passar den inte längre.',
      limits: 'En nyckel filas av någon med ett mål. Evolutionen har inget mål.',
    },
    alternatives: ['Anpassning = naturligt urval × många generationer.'],
    caveats: ['Alla egenskaper är inte anpassningar – vissa har uppstått av slump eller följer med andra egenskaper.'],
    check: mcq('Vad är en anpassning?', ['En ärftlig egenskap som hjälper en art i sin miljö', 'Något ett djur lär sig under sitt liv', 'En sjukdom'], 0, 'Den är ärftlig och har uppstått genom urval.'),
    followUp: tf('Fåglars flytt söderut kan vara en anpassning.', true, 'Ett beteende kan också vara en anpassning.'),
    apply: mcq('Hur fick giraffen sin långa hals enligt evolutionsteorin?', ['Giraffer sträckte på halsen och barnen ärvde det', 'Giraffer med lite längre hals fick mer mat och fler ungar', 'Halsen växte för att de ville det'], 1, 'Naturligt urval.', { d: 2 }),
    practice: [
      match('Vilken sorts anpassning?', [['Isbjörnens päls', 'Byggnad'], ['Björnens vinterdvala', 'Beteende'], ['Kamelens vattensparande', 'Funktion']], 'Tre sorter.'),
      tf('En anpassning är en fördel i alla miljöer.', false, 'Den passar en viss miljö.'),
      mcq('Varför har kaktusar taggar i stället för blad?', ['För att minska vattenförlusten', 'För att fånga insekter', 'För att växa snabbare'], 0, 'Mindre yta = mindre avdunstning.'),
      explain('Förklara hur isbjörnens vita päls har uppstått.', 'Förfäderna hade varierande päls. De med ljusare och tjockare päls syntes mindre och höll värmen bättre, så de överlevde och fick fler ungar. Över många generationer blev vit tjock päls vanlig.', [['variation', 'olika'], ['överlev', 'ungar', 'föröka'], ['generation'], ['urval']], { min: 3, d: 3 }),
    ],
    summary: ['Anpassningar är ärftliga egenskaper som hjälper i miljön.', 'Byggnad, funktion och beteende.', 'De uppstår genom naturligt urval.', 'De passar en viss miljö.'],
    flashcards: [['Vad är en anpassning?', 'En ärftlig egenskap som ökar chansen att överleva och föröka sig i en viss miljö.'], ['Ge ett exempel på en beteendeanpassning.', 'Fåglars flytt eller vinterdvala.']],
    related: ['anpassning', 'naturligt-urval'],
  }),
]
