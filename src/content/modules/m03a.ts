import { explain, fill, lesson, match, mcq, order, tf } from '../builders'

export const m3a = [
  lesson({
    id: 'm3-l01',
    title: 'Grundämnen och kemiska föreningar',
    section: 'Olika sorters ämnen',
    minutes: 9,
    goal: 'Idag ska vi förstå skillnaden mellan ett grundämne och en kemisk förening.',
    objectives: ['Förklara vad ett grundämne är.', 'Förklara vad en kemisk förening är.', 'Avgöra om ett ämne är ett grundämne eller en förening utifrån formeln.'],
    prerequisites: ['m1-l22'],
    what: [
      'Ett **grundämne** består av bara en sorts atomer, t.ex. järn (Fe) eller syrgas (O₂).',
      'En **kemisk förening** består av två eller fler **olika** sorters atomer som sitter ihop med kemiska bindningar, t.ex. vatten (H₂O) och koksalt (NaCl).',
    ],
    why: [
      'Det finns bara 118 grundämnen, men de kan kombineras på miljontals sätt. Därför är nästan alla ämnen omkring oss föreningar.',
      'Skillnaden är viktig eftersom en förening kan ha helt andra egenskaper än grundämnena den är gjord av.',
    ],
    how: [
      'Natrium är en metall som exploderar i vatten och klor är en giftig gas. Tillsammans blir de koksalt, som du strör på maten. Bindningarna ändrar egenskaperna helt.',
      'En förening kan bara delas upp i sina grundämnen genom en kemisk reaktion.',
    ],
    where: [
      'Guld i ett smycke är ett grundämne. Rost (järnoxid), socker och vatten är föreningar.',
    ],
    misconceptions: [
      { myth: 'O₂ är en förening eftersom det är två atomer.', truth: 'Båda atomerna är syre, så det är ett grundämne. En förening kräver olika sorters atomer.' },
    ],
    simple: [
      'Ett grundämne består av bara en sorts atomer, till exempel syrgas (O₂) eller järn (Fe).',
      'En kemisk förening består av två eller fler olika sorters atomer som sitter ihop, till exempel vatten (H₂O).',
      'En förening har helt andra egenskaper än grundämnena den är gjord av.',
    ],
    detailed: [
      'Koksalt (NaCl) består av natrium, en metall som reagerar häftigt med vatten, och klor, en giftig gas. Tillsammans blir de ett ofarligt salt vi strör på maten. Det visar att en förening är något helt nytt.',
      'En förening har alltid samma sammansättning. Vatten är alltid två väteatomer per syreatom, oavsett om det kommer från en sjö eller ett laboratorium.',
      'En förening kan bara delas upp i grundämnen genom en kemisk reaktion, till exempel elektrolys av vatten.',
      'O₂ är ett grundämne, trots att det är en molekyl – båda atomerna är syre. CO₂ är en förening eftersom den innehåller två olika grundämnen.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Grundämne', points: ['En sorts atomer', 'T.ex. Fe, Cu, O₂, N₂', 'Finns i periodiska systemet', 'Kan inte delas upp kemiskt'], tone: 'lavender' },
        { title: 'Kemisk förening', points: ['Två eller fler sorters atomer', 'T.ex. H₂O, CO₂, NaCl', 'Bestämd sammansättning', 'Kan delas upp med en kemisk reaktion'], tone: 'pink' },
      ],
    },
    analogy: {
      text: 'Grundämnen är som ingredienser: mjöl, ägg och socker. En kemisk förening är som en färdig bakad kaka. Kakan smakar och ser helt annorlunda ut än ingredienserna – och du kan inte plocka ut ägget igen.',
      limits: 'En kaka kan ha lite mer eller lite mindre socker. En kemisk förening har alltid exakt samma förhållande mellan atomerna.',
    },
    alternatives: ['Titta på formeln: Hur många olika bokstavssymboler? En → grundämne. Två eller fler → förening.', 'Grundämne = bara en sorts LEGO-bitar. Förening = olika sorters bitar ihopsatta.'],
    caveats: ['Ordet "ämne" används ibland slarvigt. I kemin är ett rent ämne antingen ett grundämne eller en förening.'],
    check: mcq('Vilket av dessa är en kemisk förening?', ['O₂', 'Fe', 'H₂O'], 2, 'H₂O innehåller två olika grundämnen: väte och syre.', { wrong: { 0: 'O₂ innehåller bara syre – det är ett grundämne.', 1: 'Fe är bara järn – ett grundämne.' } }),
    followUp: tf('Ett grundämne består av bara en sorts atomer.', true, 'Ja, till exempel bara syreatomer eller bara järnatomer.'),
    apply: mcq('Natrium är en farlig metall och klor en giftig gas. Varför kan vi äta koksalt (NaCl)?', ['Det finns så lite natrium i saltet', 'En förening har helt nya egenskaper', 'Klor försvinner när man lagar mat'], 1, 'I NaCl finns natriumjoner och kloridjoner – ett nytt ämne med helt andra egenskaper än grundämnena.', { d: 2 }),
    practice: [
      match('Grundämne eller förening?', [['N₂', 'Grundämne'], ['CO₂', 'Förening'], ['Cu', 'Grundämne'], ['NaCl', 'Förening']], 'Räkna antalet olika symboler.'),
      tf('O₂ är en förening eftersom det består av två atomer.', false, 'Båda atomerna är syre, så O₂ är ett grundämne.', { d: 2 }),
      mcq('Hur kan man dela upp vatten i väte och syre?', ['Genom att koka det', 'Genom elektrolys (en kemisk reaktion)', 'Genom att filtrera det'], 1, 'Kokning är bara en fysikalisk förändring. Elektrolys bryter de kemiska bindningarna.', { d: 2 }),
      explain('Förklara skillnaden mellan ett grundämne och en kemisk förening. Ge ett exempel på varje.', 'Ett grundämne består av bara en sorts atomer, till exempel järn (Fe) eller syrgas (O₂). En kemisk förening består av två eller fler olika grundämnen som är kemiskt bundna till varandra, till exempel vatten (H₂O).', [['en sorts', 'samma sorts', 'bara en'], ['olika', 'två eller fler'], ['bundna', 'sitter ihop', 'bindning'], ['H₂O', 'vatten', 'CO₂', 'NaCl', 'salt']], { min: 3, d: 2 }),
    ],
    summary: ['Grundämne: en sorts atomer.', 'Förening: olika atomer som sitter ihop.', 'Föreningar har nya egenskaper.', 'O₂ är ett grundämne, CO₂ en förening.'],
    flashcards: [['Vad är en kemisk förening?', 'Ett ämne av två eller fler grundämnen som är kemiskt bundna.'], ['Är O₂ ett grundämne eller en förening?', 'Ett grundämne.']],
    related: ['grundamne', 'kemisk-forening', 'molekyl'],
  }),

  lesson({
    id: 'm3-l02',
    title: 'Blandningar och rena ämnen',
    section: 'Olika sorters ämnen',
    minutes: 9,
    goal: 'Idag ska vi förstå vad en blandning är och hur man kan separera den.',
    objectives: ['Skilja på rena ämnen och blandningar.', 'Skilja på homogena och heterogena blandningar.', 'Beskriva några separationsmetoder.'],
    prerequisites: ['m3-l01'],
    what: [
      'Ett **rent ämne** består av bara ett ämne (ett grundämne eller en förening).',
      'En **blandning** består av flera ämnen som är blandade men **inte** kemiskt bundna till varandra.',
    ],
    why: [
      'I naturen är nästan allt blandningar: luft, havsvatten, jord, blod. För att kunna använda ett ämne måste vi ofta skilja ut det ur en blandning.',
    ],
    how: [
      'Eftersom ämnena i en blandning inte är bundna kan de separeras med fysikaliska metoder: filtrering, avdunstning, destillation eller en magnet.',
      'Blandningar kan vara jämna (saltvatten – du ser inte saltet) eller ojämna (müsli – du ser de olika delarna).',
    ],
    where: [
      'Kaffebryggaren filtrerar bort sump. Salt utvinns ur havsvatten genom avdunstning. Råolja destilleras till bensin och diesel.',
    ],
    misconceptions: [
      { myth: 'Kranvatten är ett rent ämne.', truth: 'Kranvatten innehåller lösta salter och gaser. Det är en blandning – destillerat vatten är nästan rent.' },
    ],
    simple: [
      'Ett rent ämne består av bara ett ämne, till exempel destillerat vatten.',
      'En blandning består av flera ämnen som inte sitter ihop kemiskt, till exempel saltvatten eller luft.',
      'Blandningar kan separeras utan kemiska reaktioner.',
    ],
    detailed: [
      'I en homogen blandning ser allt likadant ut överallt – du kan inte se de olika delarna. Exempel: saltvatten, luft, saft. En homogen blandning av ett ämne löst i en vätska kallas lösning.',
      'I en heterogen blandning kan du se olika delar. Exempel: sand i vatten, müsli, olja och vatten.',
      'Separationsmetoder: filtrering (sand från vatten), avdunstning (salt från saltvatten), destillation (vatten från saltvatten, eller alkohol från vatten), magnet (järnfilspån från sand) och kromatografi (färgämnen i bläck).',
      'Separationen bygger på att ämnena har olika egenskaper, till exempel olika kokpunkt, partikelstorlek eller löslighet.',
    ],
    visual: {
      kind: 'flow',
      layout: 'line',
      nodes: [
        { label: 'Saltvatten', detail: 'En homogen blandning. Saltet är löst och syns inte.', icon: '🥛' },
        { label: 'Värm', detail: 'Vattnet kokar vid 100 °C. Saltet har mycket högre kokpunkt och stannar kvar.', icon: '🔥' },
        { label: 'Kyl ångan', detail: 'Vattenångan kyls i ett kylrör och blir flytande vatten igen.', icon: '❄️' },
        { label: 'Rent vatten + salt', detail: 'Destillation har separerat blandningen. Inga kemiska bindningar bröts.', icon: '💧' },
      ],
      caption: 'Destillation – en separationsmetod.',
    },
    analogy: {
      text: 'En blandning är som en fruktsallad. Bitarna ligger ihop men har inte bakats ihop – du kan plocka ut bananbitarna igen. En förening är mer som en kaka, där ingredienserna inte går att plocka ut.',
      limits: 'I saltvatten kan du inte plocka ut saltet med fingrarna, men det går med avdunstning. Blandningar kan alltså vara mycket fint blandade.',
    },
    alternatives: ['Blandning: ämnena är grannar. Förening: ämnena är gifta. Grannar kan flytta isär lätt.', 'Kan du se olika delar? Heterogen. Ser det likadant ut överallt? Homogen.'],
    caveats: ['Kranvatten är egentligen en blandning: det innehåller lösta salter och gaser.'],
    check: mcq('Vilket är en blandning?', ['Destillerat vatten', 'Luft', 'Järn'], 1, 'Luft är en blandning av kväve, syre, argon, koldioxid med mera.', { wrong: { 0: 'Destillerat vatten är ett rent ämne.', 2: 'Järn är ett grundämne – ett rent ämne.' } }),
    followUp: tf('Sand i vatten är en heterogen blandning.', true, 'Ja, du kan se sandkornen.'),
    apply: mcq('Hur får du ut saltet ur saltvatten?', ['Filtrera', 'Låt vattnet avdunsta', 'Använd en magnet'], 1, 'Saltet är löst och passerar genom ett filter. När vattnet avdunstar blir saltet kvar.', { d: 2 }),
    practice: [
      match('Para ihop blandning och separationsmetod.', [['Sand och vatten', 'Filtrering'], ['Järnfilspån och sand', 'Magnet'], ['Saltvatten → rent vatten', 'Destillation'], ['Färger i bläck', 'Kromatografi']], 'Metoden bygger på olika egenskaper.', { d: 2 }),
      mcq('Vad kallas en homogen blandning där ett ämne är löst i en vätska?', ['Lösning', 'Förening', 'Fällning'], 0, 'En lösning är en homogen blandning.'),
      tf('När man separerar en blandning bryts kemiska bindningar.', false, 'Blandningar separeras med fysikaliska metoder.'),
      explain('Förklara varför destillation kan skilja vatten från salt.', 'Vatten och salt har olika kokpunkt. När saltvattnet värms kokar vattnet och blir ånga, medan saltet blir kvar. Ångan kyls och blir rent vatten igen.', [['kokpunkt', 'kokar'], ['ånga', 'förångas'], ['kyls', 'kondenser'], ['salt', 'kvar']], { min: 3, d: 3 }),
    ],
    summary: ['Rent ämne: bara ett ämne.', 'Blandning: flera ämnen som inte är bundna.', 'Homogen = ser likadan ut överallt.', 'Separation: filtrering, avdunstning, destillation m.m.'],
    flashcards: [['Är luft ett rent ämne?', 'Nej, en blandning.'], ['Hur separeras sand från vatten?', 'Filtrering.'], ['Vad är en homogen blandning?', 'En blandning som ser likadan ut överallt.']],
    related: ['blandning', 'losning', 'kemisk-forening'],
  }),

  lesson({
    id: 'm3-l03',
    title: 'Organisk och oorganisk kemi',
    section: 'Olika sorters ämnen',
    minutes: 10,
    goal: 'Idag ska vi förstå skillnaden mellan organiska och oorganiska ämnen.',
    objectives: ['Förklara att organiska ämnen är kolföreningar.', 'Ge exempel på organiska och oorganiska ämnen i naturen och industrin.', 'Förklara varför kol kan bilda så många föreningar.'],
    prerequisites: ['m3-l01'],
    what: [
      '**Organiska ämnen** är kolföreningar, oftast med kol och väte i grunden – t.ex. socker, fett, proteiner, bensin och plast.',
      '**Oorganiska ämnen** är alla andra: vatten, salter, metaller, mineraler och några enkla kolföreningar som koldioxid.',
    ],
    why: [
      'Ordet "organisk" kommer från att man förr trodde att sådana ämnen bara kunde bildas av levande organismer. 1828 tillverkade Friedrich Wöhler urea i ett labb, och då föll den idén. Namnet blev kvar.',
      'Kol är speciellt: det har 4 valenselektroner och kan binda till fyra andra atomer, även till andra kolatomer. Därför kan kol bilda långa kedjor och ringar – grunden för livets molekyler.',
    ],
    how: [
      'Organiska ämnen brinner ofta och bildar då koldioxid och vatten. Oorganiska ämnen som salter och mineraler brinner inte.',
    ],
    where: [
      'Organiskt: maten du äter, kläder av bomull eller polyester, bensin. Oorganiskt: dricksvatten, koksalt, sten, glas.',
    ],
    misconceptions: [
      { myth: '"Organisk" betyder ekologisk eller naturlig.', truth: 'I kemi betyder organisk bara "kolförening". Plast är organisk kemi, fast den är tillverkad i fabrik.' },
    ],
    core: true,
    curriculum: ['org-oorg'],
    simple: [
      'Organiska ämnen är föreningar som är uppbyggda av kol, oftast tillsammans med väte.',
      'Exempel är socker, fett, proteiner, bensin och plast.',
      'Oorganiska ämnen är allt annat: till exempel vatten, salter, metaller och mineraler.',
    ],
    detailed: [
      'Förr trodde man att organiska ämnen bara kunde bildas av levande organismer. År 1828 tillverkade Friedrich Wöhler urea (ett ämne i urin) i laboratoriet och visade att det inte stämmer.',
      'Några enkla kolföreningar räknas ändå som oorganiska: koldioxid (CO₂), kolmonoxid (CO) och karbonater som kalksten (CaCO₃).',
      'I naturen: organiska ämnen bygger upp allt levande – kolhydrater, fetter, proteiner och DNA. Oorganiska ämnen finns i berggrund, vatten och luft.',
      'I industrin: organisk kemi ger plast, läkemedel, bränslen och textilier. Oorganisk kemi ger metaller, cement, glas, gödsel och svavelsyra.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Organiska ämnen', points: ['Kolföreningar (med C–H)', 'Socker, fett, protein, DNA', 'Bensin, plast, alkohol', 'Ofta brännbara'], tone: 'green' },
        { title: 'Oorganiska ämnen', points: ['Inte kolkedjor', 'Vatten, salter, metaller', 'Mineraler, glas, cement', 'Även CO₂ och karbonater'], tone: 'blue' },
      ],
    },
    analogy: {
      text: 'Organisk kemi är som ett gigantiskt LEGO-set med bara några sorters bitar, där kolbiten är den viktigaste. Kolbiten har fyra "knoppar" och kan bygga långa kedjor, ringar och grenar – därför finns det miljontals organiska föreningar.',
      limits: 'LEGO-bitar fastnar på samma sätt hela tiden. Kolatomer kan bilda enkel-, dubbel- och trippelbindningar, vilket ger ännu fler möjligheter.',
    },
    alternatives: ['Fråga dig: innehåller ämnet kolkedjor med väte? Ja → organiskt. Nej → oorganiskt.', '"Organisk" betyder inte "ekologisk" eller "nyttig". Bensin och plast är också organiska ämnen.'],
    caveats: ['Ordet "organisk" i matbutiken (ekologisk odling) betyder något helt annat än i kemin.'],
    check: mcq('Vilket ämne är organiskt?', ['Koksalt (NaCl)', 'Socker (C₁₂H₂₂O₁₁)', 'Vatten (H₂O)'], 1, 'Socker är en kolförening med kol, väte och syre.'),
    followUp: tf('Organiska ämnen innehåller alltid kol.', true, 'Ja, organisk kemi är kolets kemi.'),
    apply: mcq('En fabrik tillverkar plastpåsar av eten från råolja. Vilken typ av kemi handlar det om?', ['Organisk kemi', 'Oorganisk kemi', 'Kärnkemi'], 0, 'Eten (C₂H₄) och plasten polyeten är kolföreningar.', { d: 2 }),
    practice: [
      match('Organiskt eller oorganiskt?', [['Metan, CH₄', 'Organiskt'], ['Kalksten, CaCO₃', 'Oorganiskt'], ['Glukos, C₆H₁₂O₆', 'Organiskt'], ['Järn, Fe', 'Oorganiskt']], 'Kalksten är ett karbonat, som räknas som oorganiskt trots kolet.', { d: 2 }),
      mcq('Varför kan kol bilda så många olika föreningar?', ['Kol har fyra valenselektroner och kan bilda kedjor och ringar', 'Kol är det vanligaste grundämnet', 'Kol är en metall'], 0, 'Fyra bindningar per kolatom ger enormt många kombinationer.', { d: 2 }),
      tf('Koldioxid räknas oftast som ett oorganiskt ämne.', true, 'CO₂, CO och karbonater är undantag som räknas som oorganiska.', { d: 3 }),
      explain('Ge ett exempel på ett organiskt och ett oorganiskt ämne som används i industrin, och förklara skillnaden.', 'Plast (t.ex. polyeten) är ett organiskt ämne eftersom den består av långa kolkedjor med väte. Cement eller järn är oorganiska ämnen eftersom de inte är uppbyggda av kolkedjor. Organiska ämnen är kolföreningar, oorganiska är övriga ämnen.', [['kol', 'kolförening', 'kolkedja'], ['plast', 'bensin', 'läkemedel', 'alkohol', 'olja'], ['metall', 'järn', 'cement', 'glas', 'salt', 'gödsel', 'svavelsyra']], { min: 3, d: 2 }),
    ],
    summary: ['Organiska ämnen = kolföreningar.', 'Exempel: socker, fett, plast, bensin.', 'Oorganiska: vatten, salter, metaller, mineraler.', 'Kol kan bilda kedjor och ringar.'],
    flashcards: [['Vad är organisk kemi?', 'Kemin om kolföreningar.'], ['Ge ett oorganiskt ämne.', 'T.ex. vatten, koksalt eller järn.'], ['Vem visade att organiska ämnen kan tillverkas i labb?', 'Friedrich Wöhler (urea, 1828).']],
    related: ['organisk-kemi', 'oorganisk-kemi', 'kolvate'],
  }),

  lesson({
    id: 'm3-l04',
    title: 'Kol och kolföreningar',
    section: 'Olika sorters ämnen',
    minutes: 10,
    goal: 'Idag ska vi lära oss om kolväten och några viktiga kolföreningar.',
    objectives: ['Förklara vad ett kolväte är.', 'Namnge de enklaste kolvätena (metan, etan, propan, butan).', 'Känna till alkoholer, kolhydrater och plaster som kolföreningar.'],
    prerequisites: ['m3-l03'],
    what: [
      'Ett **kolväte** är en förening som bara består av **kol** och **väte**. Det enklaste är metan, CH₄.',
    ],
    why: [
      'Kolväten är viktiga eftersom de innehåller mycket energi i sina bindningar. När de brinner frigörs energin – därför är de bra bränslen.',
    ],
    how: [
      'Kolatomerna binder till varandra i kedjor, och väteatomer sitter runt omkring. Ju längre kedja, desto tjockare blir ämnet: metan är gas, bensin är vätska, paraffin är fast.',
      'Vid förbränning: kolväte + syre → koldioxid + vatten (+ energi).',
    ],
    where: [
      'Naturgas och biogas (metan), gasol (propan och butan), bensin och diesel. Plaster tillverkas också av kolväten.',
    ],
    misconceptions: [
      { myth: 'Biogas och naturgas är olika ämnen.', truth: 'Båda är främst metan. Skillnaden är var kolet kommer ifrån – nyligen levande material eller fossila lager.' },
    ],
    core: true,
    curriculum: ['org-oorg'],
    simple: [
      'Ett kolväte är en förening som bara består av kol och väte.',
      'Det enklaste kolvätet är metan, CH₄. Det finns i naturgas och biogas.',
      'Kolväten är bra bränslen – när de brinner bildas koldioxid och vatten.',
    ],
    detailed: [
      'Alkanerna är kolväten med bara enkelbindningar: metan CH₄ (1 kol), etan C₂H₆ (2), propan C₃H₈ (3), butan C₄H₁₀ (4). Formeln är CₙH₂ₙ₊₂.',
      'Längre kolkedjor ger högre kokpunkt. Metan är gas, bensin (ca 5–10 kol) är vätska och paraffin (20+ kol) är fast.',
      'Om man byter ut en väteatom mot en OH-grupp får man en alkohol. Etanol (C₂H₅OH) finns i öl och vin och används som bränsle.',
      'Kolhydrater (socker, stärkelse, cellulosa), fetter och proteiner är stora kolföreningar i levande organismer. Plaster är polymerer – mycket långa kedjor av upprepade enheter.',
    ],
    visual: { kind: 'covalent', molecule: 'CH4', caption: 'Metan, CH₄: en kolatom bunden till fyra väteatomer.' },
    analogy: {
      text: 'Tänk på ett pärlhalsband. Kolatomerna är de stora pärlorna i kedjan, och väteatomerna sitter som små pärlor runt om. Ju längre halsband, desto tyngre och "segare" blir ämnet – från gas till vätska till fast vax.',
      limits: 'Riktiga kolkedjor är inte raka utan sicksackformade och kan ha grenar och ringar.',
    },
    alternatives: ['Kom ihåg ordningen med ramsan "Mina Egna Pappas Bilar": metan, etan, propan, butan (1, 2, 3, 4 kol).', 'Kol har 4 "armar". Varje arm håller en väteatom eller en annan kolatom.'],
    caveats: ['Molekylerna är tredimensionella. Bilderna i 2D är förenklingar.'],
    check: mcq('Vad är ett kolväte?', ['Ett ämne av kol och vatten', 'Ett ämne av bara kol och väte', 'Ett ämne av kol och syre'], 1, 'Kolväten innehåller bara kol (C) och väte (H).', { wrong: { 0: 'Det är ett vanligt missförstånd – "väte" är grundämnet H, inte vatten.' } }),
    followUp: mcq('Vilken formel har metan?', ['CH₄', 'CO₂', 'C₂H₆'], 0, 'Metan har en kolatom och fyra väteatomer.'),
    apply: mcq('Vad bildas när metan brinner fullständigt i luft?', ['Koldioxid och vatten', 'Kol och väte', 'Syre och kväve'], 0, 'CH₄ + 2O₂ → CO₂ + 2H₂O. Kolet och vätet förenas med syre.', { d: 2 }),
    practice: [
      fill('Hur många väteatomer har propan (3 kol)? Använd CₙH₂ₙ₊₂.', ['8'], '2 · 3 + 2 = 8 → C₃H₈.', { numeric: true, d: 2 }),
      order('Ordna alkanerna från kortast till längst kolkedja.', ['Metan', 'Etan', 'Propan', 'Butan'], '1, 2, 3 och 4 kolatomer.'),
      tf('Etanol är ett kolväte.', false, 'Etanol innehåller också syre (en OH-grupp) – det är en alkohol.', { d: 2 }),
      mcq('Varför är bensin flytande men metan en gas vid rumstemperatur?', ['Bensin har längre kolkedjor', 'Bensin innehåller syre', 'Metan är tyngre'], 0, 'Längre kedjor ger starkare krafter mellan molekylerna och högre kokpunkt.', { d: 3 }),
    ],
    summary: ['Kolväten består av bara kol och väte.', 'Metan, etan, propan, butan: 1–4 kol.', 'Längre kedja → högre kokpunkt.', 'Förbränning ger CO₂ och H₂O.'],
    flashcards: [['Vad är metan?', 'CH₄, det enklaste kolvätet.'], ['Vad bildas när kolväten brinner?', 'Koldioxid och vatten.'], ['Vad är en polymer?', 'En mycket lång kedja av upprepade enheter, t.ex. plast.']],
    related: ['kolvate', 'organisk-kemi', 'fossila-branslen'],
  }),

  lesson({
    id: 'm3-l05',
    title: 'Vatten och lösningar',
    section: 'Vatten, syror och baser',
    minutes: 10,
    goal: 'Idag ska vi förstå varför vatten är så bra på att lösa ämnen.',
    objectives: ['Förklara att vatten är en polär molekyl.', 'Förklara hur salt och socker löser sig i vatten.', 'Förklara regeln "lika löser lika".'],
    prerequisites: ['m1-l21', 'm3-l02'],
    what: [
      'En **lösning** är en jämn blandning där ett ämne (det **lösta ämnet**) har fördelats i ett annat (**lösningsmedlet**), t.ex. salt i vatten.',
      'Vattenmolekylen är **polär**: lite negativ vid syret och lite positiv vid väteatomerna.',
    ],
    why: [
      'Syre drar hårdare i de delade elektronerna än väte gör. Därför blir syresidan lite negativ och vätesidan lite positiv.',
      'De laddade sidorna drar i joner och andra polära molekyler och kan dra isär dem. Därför löser vatten så många ämnen.',
    ],
    how: [
      'När salt löses omringas Na⁺ av vattnets negativa syresidor och Cl⁻ av de positiva vätesidorna. Jonerna lossnar från kristallen och sprids i vattnet.',
      'Opolära ämnen som olja har inga laddade sidor att dra i. Därför blandas inte olja och vatten.',
    ],
    where: [
      'Blod, svett, saft, havsvatten och kaffe är lösningar. Kroppens celler är fyllda av vattenlösningar.',
    ],
    misconceptions: [
      { myth: 'När socker löses i vatten försvinner det.', truth: 'Sockermolekylerna finns kvar, utspridda mellan vattenmolekylerna. Det smakar ju fortfarande sött.' },
    ],
    simple: [
      'Vattenmolekylen är lite negativ vid syret och lite positiv vid vätena. Den är polär.',
      'Därför kan vatten dra isär salter och lösa många ämnen.',
      'Det som löser sig kallas det lösta ämnet. Vattnet kallas lösningsmedel.',
    ],
    detailed: [
      'När salt löses i vatten vänder sig vattenmolekylernas negativa syresida mot Na⁺ och den positiva vätesidan mot Cl⁻. Jonerna dras isär och omges av vattenmolekyler.',
      'Socker är en molekyl med många OH-grupper som också är polära. Därför löser sig socker bra i vatten, men sockret delas inte i joner.',
      'Olja är opolär och löser sig inte i vatten. "Lika löser lika": polära ämnen löser sig i polära lösningsmedel, opolära i opolära.',
      'Vattnets polaritet gör också att vatten har ovanligt hög kokpunkt och att is flyter. Det är grunden för livet på jorden.',
    ],
    visual: { kind: 'covalent', molecule: 'H2O', caption: 'Vatten är vinklat – syret drar i elektronerna och blir lite negativt.' },
    analogy: {
      text: 'Tänk på vattenmolekyler som små magneter med en plus- och en minussida. När du häller i salt, som består av plus- och minusjoner, kryper "magneterna" fram och drar loss jonerna en och en. Olja har inga plus- och minussidor, så magneterna bryr sig inte om den.',
      limits: 'Vattenmolekyler är inte magneter. Det handlar om elektriska laddningar, inte magnetism.',
    },
    alternatives: ['Lika löser lika: Salt och socker är "laddade/polära" som vatten → löser sig. Olja är inte det → löser sig inte.', 'Därför behöver du diskmedel för stekpannan: diskmedlet har en ände som gillar fett och en ände som gillar vatten.'],
    caveats: ['Vissa salter, som kalksten, löser sig nästan inte alls i vatten. Löslighet varierar.'],
    check: mcq('Varför är vatten en polär molekyl?', ['Syret drar hårdare i elektronerna än väte', 'Vatten innehåller joner', 'Vatten är en metall'], 0, 'Syret drar elektronerna mot sig och blir lite negativt; vätena blir lite positiva.'),
    followUp: tf('Olja löser sig bra i vatten.', false, 'Olja är opolär och löser sig inte i det polära vattnet.'),
    apply: mcq('Du ska tvätta bort fettfläckar. Vad hjälper bäst?', ['Kallt vatten', 'Vatten med diskmedel eller tvål', 'Saltvatten'], 1, 'Tvål och diskmedel har en fettälskande och en vattenälskande del och kan föra bort fettet med vattnet.', { d: 2 }),
    practice: [
      match('Para ihop begrepp och exempel.', [['Lösningsmedel', 'Vatten i saft'], ['Löst ämne', 'Socker i te'], ['Opolärt ämne', 'Olja']], 'Lösningsmedlet löser det lösta ämnet.'),
      mcq('Vad händer med NaCl när det löses i vatten?', ['Det delas upp i Na⁺ och Cl⁻', 'Det försvinner', 'Det blir till natrium och klorgas'], 0, 'Jonerna dras isär och omges av vattenmolekyler.', { d: 2 }),
      tf('Socker delas upp i joner när det löses i vatten.', false, 'Socker löser sig som hela molekyler – det är inte ett salt.', { d: 3 }),
      explain('Förklara med begreppet polaritet varför salt löser sig i vatten men inte i olja.', 'Vatten är polärt: syret är lite negativt och vätena lite positiva. Vattenmolekylerna dras till saltets positiva och negativa joner och drar isär dem. Olja är opolär och kan inte attrahera jonerna, så saltet löser sig inte i olja.', [['polär', 'polaritet'], ['positiv', 'negativ', 'laddning'], ['joner', 'Na⁺', 'Cl⁻'], ['opolär', 'olja']], { min: 3, d: 3 }),
    ],
    summary: ['Vatten är polärt.', 'Polära vattenmolekyler drar isär salter.', 'Lika löser lika.', 'Vatten = lösningsmedel, det som löses = löst ämne.'],
    flashcards: [['Varför är vatten polärt?', 'Syret drar hårdare i elektronerna än väte.'], ['Vad betyder "lika löser lika"?', 'Polära ämnen löser sig i polära lösningsmedel, opolära i opolära.']],
    related: ['polaritet', 'losning', 'molekyl'],
  }),

  lesson({
    id: 'm3-l06',
    title: 'Syror och baser',
    section: 'Vatten, syror och baser',
    minutes: 10,
    goal: 'Idag ska vi förstå vad syror och baser är.',
    objectives: ['Förklara att syror avger vätejoner (H⁺).', 'Förklara att baser tar upp vätejoner och ofta bildar OH⁻.', 'Ge exempel på syror och baser i vardagen och kroppen.'],
    prerequisites: ['m3-l05', 'm1-l17'],
    what: [
      'En **syra** är ett ämne som kan avge vätejoner (H⁺). En **bas** är ett ämne som kan ta upp vätejoner.',
    ],
    why: [
      'Vätejoner är mycket reaktiva. Syror är frätande just för att H⁺ reagerar med många ämnen. Baser är frätande på sitt sätt, eftersom de kan dra åt sig H⁺ från andra ämnen.',
    ],
    how: [
      'I vatten bildar syror fler H⁺ (egentligen H₃O⁺). Baser ger fler hydroxidjoner (OH⁻).',
      'Blandar man en syra och en bas reagerar H⁺ och OH⁻ till vatten: H⁺ + OH⁻ → H₂O. Det kallas **neutralisation**.',
    ],
    where: [
      'Citronsyra i citroner, ättiksyra i ättika, saltsyra i magen. Baser: bikarbonat, tvål, kaustiksoda i avloppsrensare.',
    ],
    misconceptions: [
      { myth: 'Bara syror är farliga.', truth: 'Starka baser som kaustiksoda är minst lika frätande. Använd skyddsglasögon för båda.' },
    ],
    core: true,
    curriculum: ['org-oorg', 'amnen-miljo'],
    simple: [
      'En syra är ett ämne som kan avge vätejoner, H⁺. Syror smakar surt – som citron.',
      'En bas är ett ämne som kan ta upp vätejoner. Basiska lösningar innehåller hydroxidjoner, OH⁻. De känns ofta hala, som tvål.',
      'När en syra och en bas blandas tar de ut varandra. Det kallas neutralisation.',
    ],
    detailed: [
      'Saltsyra (HCl) löses i vatten och ger H⁺ och Cl⁻. I verkligheten fäster H⁺ på en vattenmolekyl och bildar oxoniumjonen H₃O⁺, men vi skriver ofta bara H⁺.',
      'Natriumhydroxid (NaOH) löses i vatten och ger Na⁺ och OH⁻. OH⁻ tar upp H⁺ och bildar vatten.',
      'Neutralisation: H⁺ + OH⁻ → H₂O. Saltsyra + natriumhydroxid → koksalt + vatten.',
      'Starka syror och baser är frätande. Svaga syror, som ättiksyra och kolsyra, avger bara en liten del av sina vätejoner. I kroppen finns saltsyra i magen och vätekarbonat som buffrar blodet.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Syror', points: ['Avger H⁺', 'pH under 7', 'Smakar surt', 'Ex: saltsyra (magen), citronsyra, ättiksyra, kolsyra'], tone: 'pink' },
        { title: 'Baser', points: ['Tar upp H⁺ (bildar ofta OH⁻)', 'pH över 7', 'Känns hala', 'Ex: natriumhydroxid, ammoniak, bakpulver, tvål'], tone: 'blue' },
      ],
    },
    analogy: {
      text: 'Tänk på H⁺-joner som heta chiliflingor. En syra strör ut chili i vattnet – det blir "starkt" (surt). En bas är som mjölk som tar bort hettan. Blandar du rätt mängd blir det neutralt.',
      limits: 'Chili är en smak. Syror är kemiska ämnen som kan vara frätande – smaka aldrig på kemikalier i ett labb!',
    },
    alternatives: ['Syra = H⁺-givare. Bas = H⁺-tagare. Neutralisation = givaren och tagaren möts och bildar vatten.', 'Citron, vinäger och cola är sura. Tvål, bakpulver och ammoniak är basiska.'],
    caveats: ['Definitionen "syra = protongivare" kallas Brønsted–Lowrys syrabegrepp. Det finns fler definitioner som du inte behöver kunna.'],
    check: mcq('Vad kännetecknar en syra?', ['Den avger vätejoner (H⁺)', 'Den avger hydroxidjoner (OH⁻) och tar aldrig upp H⁺', 'Den innehåller alltid metaller'], 0, 'Syror avger H⁺.'),
    followUp: tf('Tvål är basiskt.', true, 'Ja, tvål har ett pH över 7.'),
    apply: mcq('Om du får halsbränna (för mycket magsyra) kan en tablett med en svag bas hjälpa. Varför?', ['Basen neutraliserar en del av syran', 'Basen dödar bakterier', 'Basen gör magsyran starkare'], 0, 'Basen tar upp H⁺ och neutraliserar en del av magsyran.', { d: 2 }),
    practice: [
      match('Syra eller bas?', [['Citronsyra', 'Syra'], ['Natriumhydroxid', 'Bas'], ['Ättika', 'Syra'], ['Ammoniak', 'Bas']], 'Syror avger H⁺, baser tar upp H⁺.'),
      fill('Vad bildas när H⁺ och OH⁻ reagerar? Skriv formeln.', ['H2O', 'H₂O'], 'H⁺ + OH⁻ → H₂O, vatten.'),
      mcq('Vilka två ämnen bildas när saltsyra neutraliseras med natriumhydroxid?', ['Koksalt och vatten', 'Klorgas och vätgas', 'Natrium och syre'], 0, 'HCl + NaOH → NaCl + H₂O.', { d: 2 }),
      tf('Alla syror är farliga och frätande.', false, 'Svaga syror som citronsyra och kolsyra finns i mat. Starka syror i hög koncentration är frätande.', { d: 2 }),
    ],
    summary: ['Syror avger H⁺.', 'Baser tar upp H⁺ (ofta via OH⁻).', 'Neutralisation: H⁺ + OH⁻ → H₂O.', 'Starka syror och baser är frätande.'],
    flashcards: [['Vad är en syra?', 'Ett ämne som kan avge vätejoner (H⁺).'], ['Vad är neutralisation?', 'När en syra och bas reagerar och bildar vatten (och ett salt).'], ['Ge ett exempel på en bas i hemmet.', 'Tvål, bakpulver eller ammoniak.']],
    related: ['syra', 'bas', 'neutralisation', 'ph'],
  }),
]
