import { explain, fill, lesson, match, mcq, order, tf } from '../builders'

export const m12a = [
  lesson({
    id: 'm12-l01',
    title: 'Naturvetenskapens betydelse',
    section: 'Naturvetenskap och vi',
    minutes: 8,
    goal: 'Idag ska vi förstå hur naturvetenskap påverkar både individen och samhället.',
    objectives: ['Ge exempel på hur naturvetenskap påverkar vardagen.', 'Förklara varför kunskap i naturvetenskap behövs i ett demokratiskt samhälle.', 'Se både möjligheter och risker.'],
    prerequisites: [],
    what: [
      '**Naturvetenskap** är ett sätt att ta reda på hur naturen fungerar genom att **observera**, **experimentera** och pröva förklaringar. Biologi, kemi och fysik är naturvetenskapliga ämnen.',
      'Naturvetenskapen påverkar nästan allt i ditt liv: maten, medicinerna, elen, mobilen, rent vatten och hur länge vi lever.',
    ],
    why: [
      'Samhället fattar hela tiden beslut som bygger på naturvetenskap: Hur ska vi få energi? Vilka vaccin ska barn få? Hur ska vi minska utsläppen? I en demokrati är det medborgarna som väljer politiker – därför behöver alla grundläggande kunskaper för att kunna ta ställning.',
      'För individen hjälper naturvetenskapliga kunskaper till med vardagsbeslut: om hälsa, mat, kemikalier i hemmet och att kunna skilja fakta från falska påståenden.',
    ],
    how: [
      'Naturvetenskap ger både **möjligheter** och **risker**. Samma kunskap om atomkärnor ger både kärnkraft, cancerbehandling och kärnvapen. Kemi ger både läkemedel och miljögifter.',
      'Hur kunskapen används är inte bara en naturvetenskaplig fråga – det handlar också om etik, politik och ekonomi.',
    ],
    where: [
      'Medellivslängden i Sverige har ökat från ungefär 50 år år 1900 till över 80 år i dag – mycket tack vare naturvetenskap inom medicin, hygien och livsmedel.',
      'Nyhetsartiklar om klimat, vaccin, mat och hälsa bygger ofta på naturvetenskaplig forskning.',
    ],
    misconceptions: [
      { myth: 'Naturvetenskap är bara för forskare.', truth: 'Alla använder naturvetenskapliga kunskaper i vardagen och som medborgare, till exempel när man röstar eller väljer mat.' },
    ],
    simple: [
      'Naturvetenskap undersöker hur naturen fungerar.',
      'Den påverkar mat, medicin, energi och teknik.',
      'Alla behöver kunskaper för att kunna ta ställning i samhällsfrågor.',
    ],
    detailed: [
      'Naturvetenskapen kännetecknas av att påståenden ska kunna prövas och att resultat granskas av andra forskare.',
      'Forskning finansieras ofta med skattepengar, vilket gör det till en samhällsfråga vad som ska forskas om.',
      'Teknik och naturvetenskap driver varandra framåt: nya instrument ger nya upptäckter, och nya upptäckter ger ny teknik.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Individen', points: ['Hälsa och mat', 'Säker kemikaliehantering', 'Skilja fakta från påståenden'], tone: 'pink' },
        { title: 'Samhället', points: ['Energi och klimat', 'Vård och vaccin', 'Lagar om miljö och kemikalier'], tone: 'blue' },
      ],
      caption: 'Naturvetenskapens betydelse.',
    },
    analogy: {
      text: 'Naturvetenskap är som en karta över hur världen fungerar. Med kartan kan du hitta smarta vägar – men du kan också gå vilse om du läser den fel. Och det är fortfarande du som bestämmer vart du vill gå.',
      limits: 'En karta är färdig. Naturvetenskapens karta ritas hela tiden om när vi lär oss mer.',
    },
    alternatives: ['Naturvetenskap säger vad som är möjligt. Människor väljer vad som är önskvärt.'],
    caveats: ['Naturvetenskap är en av flera sorters kunskap; humaniora och samhällsvetenskap behövs också.'],
    check: mcq('Varför behöver alla medborgare kunskap i naturvetenskap?', ['För att kunna ta ställning i samhällsfrågor', 'För att bli forskare', 'Det behövs inte'], 0, 'Demokratin behöver kunniga medborgare.'),
    followUp: tf('Naturvetenskaplig kunskap kan användas både till nytta och skada.', true, 'Till exempel kärnkraft och kärnvapen.'),
    apply: mcq('Vilken fråga kan INTE avgöras bara med naturvetenskap?', ['Hur mycket koldioxid som släpps ut', 'Om Sverige borde bygga mer kärnkraft', 'Hur uran klyvs'], 1, 'Den kräver även värderingar och politik.', { d: 2 }),
    practice: [
      match('Individ eller samhälle?', [['Välja solskydd', 'Individ'], ['Lag om kemikalier', 'Samhälle'], ['Vaccinationsprogram', 'Samhälle']], 'Båda påverkas.'),
      tf('Medellivslängden har ökat kraftigt sedan år 1900.', true, 'Från ca 50 till över 80 år.'),
      fill('Biologi, kemi och fysik kallas med ett ord ____.', ['naturvetenskap'], 'Naturvetenskap.'),
      explain('Förklara med ett exempel hur naturvetenskap kan ge både möjligheter och risker.', 'Kunskap om atomkärnor ger kärnkraft och strålbehandling mot cancer, men också kärnvapen och radioaktivt avfall. Hur kunskapen används avgörs av människor.', [['möjlighet', 'nytta'], ['risk', 'skada'], ['exempel', 'kärnkraft', 'kemi', 'läkemedel', 'gift']], { min: 2, d: 2 }),
    ],
    summary: ['Naturvetenskap undersöker naturen.', 'Den påverkar vardagen och samhället.', 'Kunskapen ger både möjligheter och risker.', 'Alla behöver kunskaper för att ta ställning.'],
    flashcards: [['Vad kännetecknar naturvetenskap?', 'Påståenden prövas med observationer och experiment.'], ['Varför är naturvetenskap viktig för demokratin?', 'Medborgare behöver kunskap för att ta ställning i viktiga frågor.']],
    related: ['naturvetenskap'],
  }),

  lesson({
    id: 'm12-l02',
    title: 'Upptäckter som förändrade världen',
    section: 'Naturvetenskap och vi',
    minutes: 10,
    goal: 'Idag ska vi lära oss om några upptäckter som har förändrat människors liv.',
    objectives: ['Beskriva några stora upptäckter.', 'Förklara hur de påverkade samhället.', 'Förstå att nya idéer ofta möttes av motstånd.'],
    prerequisites: ['m12-l01'],
    what: [
      'Genom historien har vissa naturvetenskapliga upptäckter ändrat livet för miljarder människor. Här är några: **handtvätt och bakterier**, **vaccin**, **antibiotika** och **DNA**.',
    ],
    why: [
      'Upptäckterna förändrade världen för att de löste problem som tidigare dödade många – infektioner, epidemier och barnadödlighet. De visar också hur naturvetenskap fungerar: idéer prövas, och det som håller blir kvar.',
    ],
    how: [
      '**Handtvätt (1840-talet)**: läkaren Ignaz Semmelweis såg att många kvinnor dog av barnsängsfeber när läkare gick direkt från obduktioner till förlossningar. När läkarna tvättade händerna med klorlösning sjönk dödligheten kraftigt. Han blev hånad – ingen visste då att bakterier fanns.',
      '**Bakterieteorin (1860–80-talen)**: Louis Pasteur och Robert Koch visade att mikroorganismer orsakar sjukdomar. Det ledde till hygien, rent vatten och pastörisering.',
      '**Vaccin** (Jenner 1796) och **penicillin** (Fleming 1928) har räddat hundratals miljoner liv.',
      '**DNA:s struktur (1953)**: Rosalind Franklins röntgenbilder hjälpte Watson och Crick att förstå dubbelspiralen. Det lade grunden för genteknik och modern medicin.',
    ],
    where: [
      'Handtvätt är fortfarande en av de viktigaste åtgärderna mot smitta i vården.',
      'Rosalind Franklin fick inte samma erkännande som sina manliga kollegor under sin livstid – ett exempel på hur vetenskapen också påverkas av samhället.',
    ],
    misconceptions: [
      { myth: 'Bra idéer accepteras alltid direkt i vetenskapen.', truth: 'Nya idéer möts ofta av skepsis. Det är en del av granskningen – men ibland tar det för lång tid, som för Semmelweis.' },
    ],
    simple: [
      'Handtvätt, vaccin, antibiotika och DNA är upptäckter som förändrat världen.',
      'De har räddat hundratals miljoner liv.',
      'Nya idéer möttes ofta av motstånd i början.',
    ],
    detailed: [
      'Pastörisering – att värma livsmedel för att döda bakterier – är uppkallat efter Pasteur.',
      'Koch formulerade regler för att bevisa att en viss mikroorganism orsakar en viss sjukdom.',
      'Upptäckter bygger nästan alltid på andra forskares arbete. Newton skrev att han "stått på jättars axlar".',
    ],
    visual: {
      kind: 'flow',
      layout: 'line',
      nodes: [
        { label: '1796 Vaccin', detail: 'Jenner skyddar mot smittkoppor.', icon: '💉' },
        { label: '1847 Handtvätt', detail: 'Semmelweis minskar barnsängsfeber.', icon: '🧼' },
        { label: '1880-tal Bakterier', detail: 'Pasteur och Koch: mikrober orsakar sjukdom.', icon: '🦠' },
        { label: '1928 Penicillin', detail: 'Fleming upptäcker antibiotika.', icon: '💊' },
        { label: '1953 DNA', detail: 'Franklin, Watson och Crick: dubbelspiralen.', icon: '🧬' },
      ],
      caption: 'Några upptäckter som förändrade världen.',
    },
    analogy: {
      text: 'Vetenskapliga upptäckter är som att tända lampor i ett mörkt hus. Varje upptäckt lyser upp ett nytt rum, och då ser man dörrar till fler rum. Upptäckten av bakterier lyste upp rummet där vaccin, antibiotika och hygien fanns.',
      limits: 'Lampor tänds på en sekund. Vetenskapliga genombrott tar ofta årtionden och kräver många människors arbete.',
    },
    alternatives: ['Varje upptäckt öppnar för nästa.'],
    caveats: ['Historien förenklas ofta till "ensamma genier" – i verkligheten är vetenskap ett samarbete.'],
    check: mcq('Vad visade Semmelweis?', ['Att handtvätt minskade dödligheten', 'Att DNA är en dubbelspiral', 'Att penicillin dödar bakterier'], 0, 'Handtvätt räddade liv.'),
    followUp: tf('Fleming upptäckte penicillin.', true, 'År 1928.'),
    apply: mcq('Varför blev Semmelweis hånad?', ['Man kände ännu inte till bakterier som orsak till sjukdom', 'Han ljög om resultaten', 'Handtvätt var förbjudet'], 0, 'Bakterieteorin kom senare.', { d: 2 }),
    practice: [
      order('Sätt i tidsordning.', ['Jenners vaccin', 'Semmelweis handtvätt', 'Flemings penicillin', 'DNA:s dubbelspiral'], 'Från 1700-tal till 1950-tal.'),
      match('Para ihop.', [['Pasteur', 'Mikroorganismer orsakar sjukdom'], ['Franklin', 'Röntgenbilder av DNA'], ['Jenner', 'Vaccin mot smittkoppor']], 'Forskare och upptäckter.'),
      fill('Att värma livsmedel för att döda bakterier kallas ____.', ['pastörisering'], 'Efter Pasteur.'),
      explain('Välj en av upptäckterna och förklara hur den påverkade samhället.', 'Penicillin gjorde det möjligt att bota bakterieinfektioner som tidigare var dödliga, som lunginflammation och sårinfektioner. Det har räddat hundratals miljoner liv och gjort operationer säkrare.', [['penicillin', 'vaccin', 'handtvätt', 'dna', 'bakterie'], ['räddat', 'liv', 'död'], ['samhälle', 'vård', 'sjukdom']], { min: 2, d: 2 }),
    ],
    summary: ['Handtvätt, bakterieteori, vaccin, antibiotika och DNA har förändrat världen.', 'De har räddat hundratals miljoner liv.', 'Nya idéer möts ofta av skepsis.', 'Vetenskap är ett samarbete.'],
    flashcards: [['Vad upptäckte Semmelweis?', 'Att handtvätt minskade barnsängsfeber.'], ['Vem tog röntgenbilderna som visade DNA:s struktur?', 'Rosalind Franklin.']],
    related: ['naturvetenskap', 'vaccin', 'antibiotika'],
  }),

  lesson({
    id: 'm12-l03',
    title: 'Pandemier',
    section: 'Händelser',
    minutes: 10,
    goal: 'Idag ska vi förstå vad pandemier är och hur naturvetenskap hjälper oss att hantera dem.',
    objectives: ['Förklara skillnaden mellan epidemi och pandemi.', 'Beskriva hur smitta sprids.', 'Beskriva hur covid-19-pandemin hanterades med naturvetenskap.'],
    prerequisites: ['m12-l01', 'm8-l08'],
    curriculum: ['handelser', 'samhalle', 'immun'],
    what: [
      'En **epidemi** är när en smittsam sjukdom sprids till många i ett område. En **pandemi** är en epidemi som sprids över hela världen.',
      'Kända pandemier: **digerdöden** (pest, 1300-talet), **spanska sjukan** (influensa, 1918–1920) och **covid-19** (coronavirus, från 2019–2020).',
    ],
    why: [
      'Pandemier uppstår oftast när ett nytt smittämne – ofta från djur – börjar spridas mellan människor. Eftersom ingen har immunitet kan smittan spridas snabbt. I dag sprids smittor ännu snabbare eftersom människor reser över hela världen.',
    ],
    how: [
      'Smittämnen sprids på olika sätt: **droppar och luft** (influensa, covid-19), **kontakt** (händer, ytor), **mat och vatten** (kolera) eller **blod och sex** (hiv).',
      'Åtgärder bygger på kunskap om hur smittan sprids: **handtvätt**, **avstånd**, att **stanna hemma** vid sjukdom, **testning** och **vaccin**.',
      'Under covid-19 kunde forskare läsa virusets arvsmassa på några veckor och ta fram vaccin på under ett år – mycket snabbare än någonsin förut, bland annat tack vare mRNA-tekniken.',
    ],
    where: [
      'Spanska sjukan dödade uppskattningsvis 50 miljoner människor, fler än första världskriget.',
      'Folkhälsomyndigheten i Sverige följer smittspridning och ger råd.',
    ],
    misconceptions: [
      { myth: 'Vaccinet mot covid-19 togs fram för snabbt för att vara säkert.', truth: 'Det gick snabbt tack vare tidigare forskning om mRNA och coronavirus, stora resurser och att testfaser kördes parallellt. Säkerheten granskades på vanligt sätt och följs upp hos miljarder vaccinerade.' },
    ],
    simple: [
      'En pandemi är en världsomspännande epidemi.',
      'Smitta sprids via droppar, kontakt, mat och vatten eller blod.',
      'Kunskap om smittspridning och vaccin hjälper oss att hantera pandemier.',
    ],
    detailed: [
      'Smittor som går från djur till människor kallas zoonoser.',
      'Reproduktionstalet R visar hur många en smittad i genomsnitt smittar. Om R är under 1 minskar epidemin.',
      'Digerdöden orsakades av bakterien Yersinia pestis och dödade kanske en tredjedel av Europas befolkning.',
    ],
    visual: {
      kind: 'chart',
      chart: 'line',
      data: [
        { vecka: '1', utan: 1, med: 1 },
        { vecka: '2', utan: 3, med: 2 },
        { vecka: '3', utan: 9, med: 3 },
        { vecka: '4', utan: 27, med: 5 },
        { vecka: '5', utan: 60, med: 7 },
        { vecka: '6', utan: 80, med: 9 },
        { vecka: '7', utan: 60, med: 10 },
        { vecka: '8', utan: 30, med: 10 },
      ],
      x: 'vecka',
      series: [
        { key: 'utan', label: 'Utan åtgärder' },
        { key: 'med', label: 'Med åtgärder' },
      ],
      yLabel: 'antal sjuka (förenklat)',
      caption: 'Förenklad modell: åtgärder "plattar till kurvan" så att vården hinner med.',
    },
    analogy: {
      text: 'Smittspridning är som en kedjereaktion med dominobrickor. En smittad smittar flera, som smittar flera … Åtgärder som handtvätt, avstånd och vaccin är som att plocka bort brickor ur raden, så att kedjan bryts.',
      limits: 'Dominobrickor står i en rad. Människor rör sig och möts på oförutsägbara sätt, vilket gör smittspridning svår att förutse exakt.',
    },
    alternatives: ['Bryt smittkedjan – tvätta händerna, håll avstånd, vaccinera.'],
    caveats: ['Diagrammet är en illustration, inte data från en verklig epidemi.'],
    check: mcq('Vad är en pandemi?', ['En världsomspännande epidemi', 'En lokal förkylning', 'Ett vaccin'], 0, 'Sprids över hela världen.'),
    followUp: tf('Spanska sjukan var en influensapandemi.', true, '1918–1920.'),
    apply: mcq('Varför var handtvätt ett viktigt råd under covid-19?', ['Viruset kan spridas via händer till mun, näsa och ögon', 'Tvål är ett vaccin', 'Viruset lever i vatten'], 0, 'Kontaktsmitta bryts.', { d: 2 }),
    practice: [
      match('Para ihop smittväg och exempel.', [['Droppar', 'Influensa'], ['Vatten', 'Kolera'], ['Blod', 'Hiv']], 'Olika smittvägar.'),
      tf('Nya smittor kommer ofta från djur.', true, 'Zoonoser.', { d: 2 }),
      fill('En smittsam sjukdom som sprids över hela världen kallas ____.', ['pandemi'], 'Pandemi.'),
      explain('Förklara hur naturvetenskap hjälpte till under covid-19-pandemin.', 'Forskare läste virusets arvsmassa snabbt, tog reda på hur det sprids och tog fram råd om handtvätt och avstånd. Vaccin, bland annat mRNA-vaccin, togs fram på under ett år och minskade svår sjukdom.', [['arvsmassa', 'dna', 'rna', 'virus'], ['sprid'], ['vaccin'], ['råd', 'handtvätt', 'avstånd', 'test']], { min: 3, d: 3 }),
    ],
    summary: ['Pandemi = världsomspännande epidemi.', 'Smitta sprids på olika sätt.', 'Åtgärder bryter smittkedjor.', 'Covid-19-vaccin togs fram på rekordtid.'],
    flashcards: [['Vad är skillnaden mellan epidemi och pandemi?', 'En pandemi sprids över hela världen.'], ['Nämn tre pandemier.', 'Digerdöden, spanska sjukan, covid-19.']],
    related: ['pandemi', 'epidemi', 'vaccin'],
  }),

  lesson({
    id: 'm12-l04',
    title: 'Kärnkraft och olyckor',
    section: 'Händelser',
    minutes: 10,
    goal: 'Idag ska vi förstå hur kärnkraft fungerar och vad som hände vid Tjernobylolyckan.',
    objectives: ['Förklara hur ett kärnkraftverk gör el.', 'Beskriva Tjernobylolyckan och dess följder i Sverige.', 'Väga för- och nackdelar med kärnkraft.'],
    prerequisites: ['m12-l01', 'm1-l11'],
    curriculum: ['handelser', 'samhalle', 'amnen-miljo'],
    what: [
      '**Kärnkraft** är ett sätt att göra el genom att **klyva** tunga atomkärnor, oftast **uran-235**. När en kärna klyvs frigörs mycket energi som värme.',
      'Den **26 april 1986** exploderade en reaktor i **Tjernobyl** i nuvarande Ukraina. Det är den värsta kärnkraftsolyckan i historien.',
    ],
    why: [
      'Energin kommer från den starka kärnkraften som håller ihop atomkärnan. Lite uran ger väldigt mycket energi, och processen släpper ut mycket lite koldioxid.',
      'Men klyvningen bildar **radioaktiva** ämnen. Om de kommer ut kan strålningen skada celler och DNA och orsaka cancer.',
    ],
    how: [
      'I reaktorn träffar **neutroner** urankärnor som klyvs och sänder ut fler neutroner – en **kedjereaktion**. Värmen kokar vatten till ånga, som driver en turbin och en generator.',
      'I Tjernobyl gick ett test fel, reaktorn blev överhettad och exploderade. Radioaktiva ämnen spreds med vinden över Europa. Ett område runt kraftverket är fortfarande avspärrat.',
      '**Sverige** drabbades av nedfall, särskilt i Gävleborg och Västernorrland. Det var mätningar vid Forsmarks kärnkraftverk som först slog larm. Radioaktivt **cesium-137** (halveringstid ca 30 år) finns fortfarande i vissa svampar och viltkött.',
    ],
    where: [
      'Sverige har kärnkraftverk i Forsmark, Ringhals och Oskarshamn som ger ungefär 30 % av elen.',
      'Använt kärnbränsle måste förvaras säkert i över 100 000 år. Ett slutförvar byggs i Forsmark.',
      'Fukushima-olyckan i Japan 2011 orsakades av en jordbävning och tsunami.',
    ],
    misconceptions: [
      { myth: 'Ett kärnkraftverk kan explodera som en atombomb.', truth: 'Bränslet i en reaktor är inte tillräckligt anrikat för en kärnexplosion. I Tjernobyl var det en ångexplosion och brand som spred radioaktiva ämnen.' },
    ],
    simple: [
      'Kärnkraft gör el genom att klyva urankärnor.',
      'Den släpper ut lite koldioxid men ger radioaktivt avfall.',
      'Tjernobylolyckan 1986 spred radioaktivt nedfall även över Sverige.',
    ],
    detailed: [
      'Strålning mäts bland annat i sievert. Ju högre dos, desto större risk för skador.',
      'Jod-131 från olyckan samlades i sköldkörteln och ledde till fler fall av sköldkörtelcancer hos barn i området.',
      'Fusion – att slå ihop lätta kärnor som i solen – forskas det på, men det är ännu inte kommersiellt.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Fördelar', points: ['Mycket lite koldioxid', 'Stabil elproduktion', 'Lite bränsle ger mycket energi'], tone: 'green' },
        { title: 'Nackdelar', points: ['Radioaktivt avfall i 100 000 år', 'Risk för olyckor', 'Dyrt och tar lång tid att bygga'], tone: 'pink' },
      ],
      caption: 'Kärnkraftens för- och nackdelar.',
    },
    analogy: {
      text: 'En kedjereaktion i en reaktor är som en eld som hålls lagom stor. Styrstavarna fungerar som att reglera hur mycket ved man lägger på. I Tjernobyl tappade man kontrollen över elden.',
      limits: 'En eld är kemisk förbränning. Kärnklyvning frigör miljontals gånger mer energi per atom och ger radioaktiva restprodukter.',
    },
    alternatives: ['Neutron träffar uran → kärnan klyvs → värme → ånga → el.'],
    caveats: ['Frågan om kärnkraft är politisk och involverar värderingar om risk, klimat och ekonomi.'],
    check: mcq('Vad händer i ett kärnkraftverk?', ['Urankärnor klyvs och frigör värme', 'Kol bränns', 'Vatten delas till väte och syre'], 0, 'Kärnklyvning.'),
    followUp: tf('Tjernobylolyckan påverkade Sverige.', true, 'Radioaktivt nedfall, bl.a. cesium-137.'),
    apply: mcq('Varför finns det fortfarande cesium-137 i vissa svenska svampar?', ['Cesium-137 har en halveringstid på ca 30 år', 'Svampar bildar cesium', 'Det kommer från svenska kärnkraftverk varje dag'], 0, 'Det sönderfaller långsamt.', { d: 2 }),
    practice: [
      order('Sätt i ordning.', ['Neutroner träffar urankärnor', 'Kärnorna klyvs och frigör värme', 'Vatten blir ånga', 'Ångan driver turbin och generator'], 'Från kärna till el.'),
      match('Fördel eller nackdel?', [['Lite koldioxid', 'Fördel'], ['Radioaktivt avfall', 'Nackdel'], ['Risk för olyckor', 'Nackdel']], 'Väga för och emot.'),
      fill('Tjernobylolyckan inträffade år ____.', ['1986'], '26 april 1986.', { numeric: true }),
      explain('Förklara varför frågan om kärnkraft inte kan avgöras bara med naturvetenskap.', 'Naturvetenskapen kan beskriva fördelar som låga koldioxidutsläpp och risker som avfall och olyckor. Men hur mycket risk man accepterar och vad som är viktigast är en fråga om värderingar och politik.', [['koldioxid', 'klimat'], ['avfall', 'olycka', 'risk'], ['värdering', 'politik', 'åsikt']], { min: 2, d: 3 }),
    ],
    summary: ['Kärnkraft klyver urankärnor.', 'Lite koldioxid, men radioaktivt avfall och olycksrisk.', 'Tjernobyl 1986 gav nedfall i Sverige.', 'Cesium-137 finns kvar i naturen.'],
    flashcards: [['Vilket ämne klyvs i ett kärnkraftverk?', 'Uran-235.'], ['Vilket radioaktivt ämne från Tjernobyl finns kvar i Sverige?', 'Cesium-137.']],
    related: ['karnkraft', 'radioaktivitet', 'halveringstid'],
  }),
]
