import { explain, fill, lesson, match, mcq, order, tf } from '../builders'

export const m8a = [
  lesson({
    id: 'm8-l01',
    title: 'Vad är immunförsvaret?',
    section: 'Fienderna',
    minutes: 8,
    goal: 'Idag ska vi förstå vad immunförsvaret är och vad det skyddar oss mot.',
    objectives: ['Förklara vad immunförsvaret gör.', 'Namnge olika sorters smittämnen.', 'Beskriva kroppens tre försvarslinjer översiktligt.'],
    prerequisites: ['m5-l04'],
    what: [
      '**Immunförsvaret** är kroppens försvar mot sådant som kan göra oss sjuka. Det består av hudens och slemhinnornas skydd, särskilda vita blodkroppar, proteiner i blodet och organ som mjälten och lymfkörtlarna.',
      'Det som kan göra oss sjuka kallas **smittämnen**: **bakterier**, **virus**, **svampar** och **parasiter**. Immunförsvaret tar också bort döda celler och kan hitta och döda vissa cancerceller.',
    ],
    why: [
      'Vår kropp är varm, fuktig och full av näring – en perfekt miljö för mikroorganismer. Utan försvar skulle bakterier och virus föröka sig fritt i oss. Immunförsvaret gör att vi för det mesta klarar oss, trots att vi utsätts för smittämnen hela tiden.',
    ],
    how: [
      'Kroppen har tre försvarslinjer: 1) **det yttre försvaret** – hud, slemhinnor, magsyra – som stoppar de flesta inkräktare. 2) **Det ospecifika försvaret** – ätceller och inflammation – som angriper allt främmande snabbt. 3) **Det specifika försvaret** – B- och T-celler – som lär sig känna igen en viss inkräktare och minns den.',
      'De tre linjerna går vi igenom en i taget på kommande sidor.',
    ],
    where: [
      'När du är förkyld, får en finne eller ett sår som blir rött – då arbetar immunförsvaret.',
      'Vaccinationsprogrammet för barn i Sverige skyddar mot sjukdomar som mässling, kikhosta och polio.',
    ],
    misconceptions: [
      { myth: 'Alla bakterier är fiender.', truth: 'De flesta bakterier är ofarliga, och många är nyttiga – till exempel tarmbakterierna. Immunförsvaret lär sig att låta dem vara.' },
      { myth: 'Symtomen när man är sjuk kommer från bakterierna eller viruset.', truth: 'Mycket av det man känner – feber, trötthet, snuva – är faktiskt immunförsvarets arbete.' },
    ],
    simple: [
      'Immunförsvaret skyddar oss mot smittämnen.',
      'Smittämnen är bakterier, virus, svampar och parasiter.',
      'Kroppen har tre försvarslinjer.',
    ],
    detailed: [
      'Det yttre och det ospecifika försvaret kallas tillsammans det medfödda immunförsvaret. Det specifika kallas det förvärvade, eftersom det lär sig under livet.',
      'Lymfsystemet är ett nätverk av kärl och körtlar som transporterar vätska och vita blodkroppar. Svullna lymfkörtlar på halsen betyder att immunförsvaret arbetar.',
      'Vita blodkroppar bildas i benmärgen från stamceller.',
    ],
    visual: {
      kind: 'flow',
      layout: 'line',
      nodes: [
        { label: '1. Yttre försvar', detail: 'Hud, slemhinnor, magsyra – stoppar de flesta.', icon: '🧱' },
        { label: '2. Ospecifikt försvar', detail: 'Ätceller och inflammation – angriper allt främmande snabbt.', icon: '🛡️' },
        { label: '3. Specifikt försvar', detail: 'B- och T-celler – riktat mot en viss inkräktare, med minne.', icon: '🎯' },
      ],
      caption: 'Kroppens tre försvarslinjer.',
    },
    analogy: {
      text: 'Immunförsvaret är som försvaret av en medeltida borg. Murarna (huden) stoppar de flesta angripare. De som tar sig in möts av vakter som slåss mot alla främlingar (ospecifikt försvar). Mot de svåraste fienderna skickas specialtränade riddare (det specifika försvaret), och borgen skriver upp fiendernas kännetecken för att känna igen dem nästa gång.',
      limits: 'En borg försvaras av människor som tänker. Immunförsvaret fungerar automatiskt, med kemiska signaler.',
    },
    alternatives: ['Mur → vakter → specialstyrkor med minne.'],
    caveats: ['Indelningen i tre linjer är en förenkling; de olika delarna samarbetar tätt.'],
    check: mcq('Vilket av dessa är ett smittämne?', ['Ett virus', 'En vit blodkropp', 'En antikropp'], 0, 'Virus kan göra oss sjuka. Vita blodkroppar och antikroppar hör till försvaret.'),
    followUp: tf('Huden är en del av immunförsvaret.', true, 'Huden är det yttre försvaret.'),
    apply: order('Sätt försvarslinjerna i den ordning ett smittämne möter dem.', ['Huden och slemhinnorna', 'Ätceller och inflammation', 'B- och T-celler'], 'Yttre → ospecifikt → specifikt.', { d: 2 }),
    practice: [
      match('Para ihop försvarslinjen med exemplet.', [['Yttre försvar', 'Magsyra'], ['Ospecifikt försvar', 'Ätceller'], ['Specifikt försvar', 'Antikroppar']], 'Tre försvarslinjer.'),
      tf('Alla bakterier gör oss sjuka.', false, 'De flesta är ofarliga eller nyttiga.'),
      fill('Bakterier, virus, svampar och parasiter kallas med ett ord ____.', ['smittämnen', 'smittämne', 'patogener'], 'Smittämnen.'),
      explain('Förklara varför kroppen behöver ett immunförsvar.', 'Kroppen är varm, fuktig och full av näring, så smittämnen som bakterier och virus skulle kunna föröka sig i den. Immunförsvaret stoppar och bekämpar dem så att vi inte blir sjuka.', [['smitt', 'bakterie', 'virus'], ['föröka'], ['sjuk', 'skydd', 'bekämpa']], { min: 2, d: 2 }),
    ],
    summary: ['Immunförsvaret skyddar mot smittämnen.', 'Smittämnen: bakterier, virus, svampar, parasiter.', 'Tre försvarslinjer: yttre, ospecifikt, specifikt.', 'Många sjukdomssymtom är immunförsvarets arbete.'],
    flashcards: [['Vilka är kroppens tre försvarslinjer?', 'Yttre, ospecifikt och specifikt försvar.'], ['Nämn fyra smittämnen.', 'Bakterier, virus, svampar och parasiter.']],
    related: ['immunforsvar', 'smittamne', 'bakterie'],
  }),

  lesson({
    id: 'm8-l02',
    title: 'Bakterier och virus',
    section: 'Fienderna',
    minutes: 10,
    goal: 'Idag ska vi förstå skillnaden mellan bakterier och virus.',
    objectives: ['Beskriva hur bakterier och virus är uppbyggda.', 'Förklara hur ett virus förökar sig.', 'Förklara varför antibiotika inte hjälper mot virus.'],
    prerequisites: ['m8-l01', 'm5-l17'],
    what: [
      '**Bakterier** är levande, encelliga organismer (prokaryoter). De har cellmembran, cellvägg, ribosomer och DNA, och kan föröka sig själva genom att dela sig.',
      '**Virus** är mycket mindre – ungefär hundra gånger mindre än en bakterie. Ett virus är bara **arvsmassa** (DNA eller RNA) inne i ett **proteinhölje**. Det har ingen egen ämnesomsättning och kan bara föröka sig **inne i andra celler**.',
    ],
    why: [
      'Bakterier gör oss sjuka när de förökar sig i kroppen och tar näring eller bildar giftiga ämnen (toxiner).',
      'Virus gör oss sjuka genom att kapa våra celler. Cellerna tvingas tillverka nya virus i stället för att göra sitt vanliga jobb, och de skadas eller dör.',
    ],
    how: [
      'Så förökar sig ett virus: 1) Viruset fäster vid en cell som har rätt receptor. 2) Arvsmassan kommer in i cellen. 3) Cellens ribosomer läser virusets instruktioner och bygger viruspartiklar. 4) Hundratals nya virus lämnar cellen och infekterar nya celler.',
      'Eftersom virus använder våra egna celler är de svåra att angripa med läkemedel. **Antibiotika** angriper delar som bara bakterier har, till exempel cellväggen – virus har inga sådana delar.',
    ],
    where: [
      'Bakteriesjukdomar: halsfluss (streptokocker), urinvägsinfektion, borrelia. Virussjukdomar: förkylning, influensa, covid-19, vattkoppor.',
      'Virus kan också infektera bakterier. Sådana virus kallas bakteriofager.',
    ],
    misconceptions: [
      { myth: 'Antibiotika hjälper mot förkylning.', truth: 'Förkylning orsakas av virus, och antibiotika verkar bara mot bakterier.' },
      { myth: 'Virus är små bakterier.', truth: 'Virus är inte celler alls – bara arvsmassa i ett proteinskal.' },
    ],
    simple: [
      'Bakterier är levande celler som kan föröka sig själva.',
      'Virus är arvsmassa i ett proteinhölje och kan bara föröka sig inne i andra celler.',
      'Antibiotika hjälper mot bakterier men inte mot virus.',
    ],
    detailed: [
      'Vissa virus, som influensa och coronavirus, har arvsmassa av RNA som muterar snabbt. Därför behövs nya influensavaccin varje år.',
      'Mot vissa virus finns antivirala läkemedel som stoppar ett steg i förökningen, men de verkar ofta bara mot ett visst virus.',
      'Bakterier kan föröka sig mycket snabbt – vissa delar sig var 20:e minut.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Bakterie', points: ['Levande cell (prokaryot)', 'Ca 1–2 µm', 'Förökar sig själv genom delning', 'Kan behandlas med antibiotika'], tone: 'blue' },
        { title: 'Virus', points: ['Inte en cell – arvsmassa i proteinhölje', 'Ca 0,02–0,3 µm', 'Förökar sig bara i andra celler', 'Antibiotika hjälper inte'], tone: 'pink' },
      ],
      caption: 'Bakterier och virus jämförda.',
    },
    analogy: {
      text: 'En bakterie är som en liten egen fabrik som kan tillverka allt den behöver och bygga nya fabriker. Ett virus är som ett USB-minne med en skadlig instruktion. Ensamt gör det ingenting – men om det sätts in i en dator (en cell) tar det över och får datorn att kopiera USB-minnet om och om igen.',
      limits: 'En dator kan stänga av USB-porten. Cellen kan inte välja – den känner inte igen att instruktionerna är främmande förrän immunförsvaret ingriper.',
    },
    alternatives: ['Bakterie = levande gäst som äter din mat. Virus = kapare som tar över ditt kök.'],
    caveats: ['Om virus räknas som levande är en definitionsfråga. De flesta forskare säger nej, eftersom de saknar egen ämnesomsättning.'],
    check: mcq('Var kan ett virus föröka sig?', ['Var som helst, av sig självt', 'Bara inne i en annan cell', 'Bara i jorden'], 1, 'Virus behöver en värdcell.'),
    followUp: tf('Antibiotika hjälper mot virus.', false, 'Antibiotika verkar bara mot bakterier.'),
    apply: mcq('En kompis har feber och snuva och vill ha antibiotika. Vad är det bästa svaret?', ['Antibiotika hjälper alltid mot feber', 'Snuva orsakas oftast av virus, så antibiotika hjälper inte', 'Antibiotika gör förkylningen värre men hjälper ändå'], 1, 'Förkylning är en virusinfektion.', { d: 2 }),
    practice: [
      order('Sätt virusets förökning i ordning.', ['Viruset fäster vid cellen', 'Arvsmassan kommer in i cellen', 'Cellen bygger nya virus', 'Nya virus lämnar cellen'], 'Viruset kapar cellen.'),
      match('Bakterie eller virus?', [['Halsfluss (streptokocker)', 'Bakterie'], ['Influensa', 'Virus'], ['Har ribosomer', 'Bakterie']], 'Olika smittämnen.'),
      tf('Ett virus är mindre än en bakterie.', true, 'Ungefär hundra gånger mindre.'),
      explain('Förklara varför antibiotika fungerar mot bakterier men inte mot virus.', 'Antibiotika angriper delar som bara bakterier har, till exempel cellväggen eller bakteriernas ribosomer. Virus är inte celler och har inga sådana delar – de använder våra egna celler – så antibiotika har inget att angripa.', [['cellvägg', 'ribosom', 'delar'], ['bakterie'], ['virus'], ['inte cell', 'våra celler', 'värdcell']], { min: 3, d: 3 }),
    ],
    summary: ['Bakterier är levande celler.', 'Virus är arvsmassa i ett proteinhölje.', 'Virus förökar sig bara i andra celler.', 'Antibiotika hjälper mot bakterier, inte virus.'],
    flashcards: [['Hur förökar sig ett virus?', 'Det tar över en cell som tillverkar nya virus.'], ['Hjälper antibiotika mot virus?', 'Nej.']],
    related: ['virus', 'bakterie', 'smittamne', 'antibiotika'],
  }),

  lesson({
    id: 'm8-l03',
    title: 'Kroppens yttre försvar',
    section: 'Försvarets linjer',
    minutes: 7,
    goal: 'Idag ska vi förstå hur kroppen stoppar smittämnen från att komma in.',
    objectives: ['Ge exempel på kroppens yttre försvar.', 'Förklara hur varje del stoppar smittämnen.'],
    prerequisites: ['m8-l01'],
    what: [
      'Det **yttre försvaret** är kroppens första försvarslinje. Det består av barriärer som hindrar smittämnen från att ta sig in: **huden**, **slemhinnorna**, **magsyran** och ämnen i tårar och saliv.',
    ],
    why: [
      'Det bästa sättet att slippa en infektion är att smittämnet aldrig kommer in. Det yttre försvaret stoppar de allra flesta bakterier och virus vi möter varje dag, utan att vi märker något.',
    ],
    how: [
      '**Huden** är en tät mur av döda celler i ytterlagret. Den är lite sur och torr, vilket många bakterier inte trivs i.',
      '**Slemhinnorna** i näsa, luftrör och tarm är täckta av **slem** som fångar partiklar. I luftrören sitter **flimmerhår** som för slemmet uppåt så att det kan sväljas eller hostas upp.',
      '**Magsyran** har pH runt 1–2 och dödar de flesta bakterier i maten. **Tårar och saliv** innehåller enzymer som bryter ned bakteriers cellvägg.',
      'De **nyttiga bakterierna** på huden och i tarmen tar plats och näring från skadliga bakterier.',
    ],
    where: [
      'Ett skrubbsår eller ett myggbett öppnar huden – därför kan sår bli infekterade.',
      'Rökning skadar flimmerhåren, vilket gör att rökare oftare får luftvägsinfektioner.',
      'Handtvätt minskar mängden smittämnen som kan nå munnen, näsan och ögonen.',
    ],
    misconceptions: [
      { myth: 'Det är bra att döda alla bakterier på huden.', truth: 'De nyttiga hudbakterierna är en del av skyddet. Överdriven användning av antibakteriella medel kan störa dem.' },
    ],
    simple: [
      'Det yttre försvaret stoppar smittämnen från att komma in.',
      'Huden, slemmet, magsyran, tårarna och saliven skyddar.',
      'Nyttiga bakterier tar plats från skadliga.',
    ],
    detailed: [
      'Enzymet lysozym finns i tårar, saliv och slem och bryter ned bakteriers cellväggar.',
      'Hosta och nysning är reflexer som för ut partiklar ur luftvägarna.',
      'Antibiotika kan döda även tarmens nyttiga bakterier, vilket ibland ger magbesvär.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Barriär', points: ['Huden', 'Slem och flimmerhår', 'Magsyra', 'Tårar och saliv', 'Nyttiga bakterier'], tone: 'cream' },
        { title: 'Hur den skyddar', points: ['Tät mur, lite sur och torr', 'Fångar partiklar och för ut dem', 'pH 1–2 dödar bakterier', 'Enzymer bryter ned bakterier', 'Tar plats och näring från skadliga'], tone: 'green' },
      ],
      caption: 'Det yttre försvaret.',
    },
    analogy: {
      text: 'Det yttre försvaret är som murarna, vallgraven och vindbryggan runt en borg. Huden är muren. Slemmet är en klibbig vallgrav som fångar fiender. Magsyran är en grind med kokande olja. Nyttiga bakterier är vänliga bybor som redan tagit alla platser i borgen.',
      limits: 'En borgmur har öppningar som kan stängas. Kroppen har öppningar – mun, näsa, ögon – som alltid måste vara öppna, och därför behövs fler försvarslinjer.',
    },
    alternatives: ['Det yttre försvaret = håll fienden ute.'],
    caveats: ['Vissa smittämnen har specialiserat sig på att ta sig igenom slemhinnorna, t.ex. förkylningsvirus i näsan.'],
    check: mcq('Vilket är en del av det yttre försvaret?', ['Antikroppar', 'Huden', 'T-celler'], 1, 'Huden är en barriär.'),
    followUp: tf('Magsyran dödar de flesta bakterier i maten.', true, 'pH runt 1–2.'),
    apply: mcq('Varför får rökare oftare luftvägsinfektioner?', ['Rök skadar flimmerhåren som för ut slem och smittämnen', 'Rök innehåller virus', 'Rök stärker bakterierna'], 0, 'Utan fungerande flimmerhår stannar smittämnena kvar.', { d: 2 }),
    practice: [
      match('Para ihop.', [['Flimmerhår', 'För slem uppåt i luftrören'], ['Magsyra', 'Dödar bakterier i maten'], ['Saliv', 'Innehåller enzymer mot bakterier']], 'Olika barriärer.'),
      tf('Alla bakterier på huden är skadliga.', false, 'Många är nyttiga.'),
      fill('Det klibbiga ämnet på slemhinnorna som fångar partiklar heter ____.', ['slem'], 'Slemmet fångar partiklar.'),
      explain('Förklara varför ett sår kan bli infekterat.', 'Huden är en barriär som håller smittämnen ute. I ett sår är huden öppen, så bakterier kan ta sig in i kroppen och föröka sig där.', [['hud'], ['barriär', 'öppen', 'skyddet'], ['bakterie', 'smitt'], ['in']], { min: 2, d: 2 }),
    ],
    summary: ['Det yttre försvaret håller smittämnen ute.', 'Huden, slem och flimmerhår, magsyra, tårar och saliv.', 'Nyttiga bakterier skyddar också.', 'Sår öppnar försvaret.'],
    flashcards: [['Nämn tre delar av det yttre försvaret.', 'T.ex. huden, slemhinnorna och magsyran.'], ['Vad gör flimmerhåren?', 'För slem med partiklar uppåt i luftrören.']],
    related: ['immunforsvar', 'smittamne'],
  }),

  lesson({
    id: 'm8-l04',
    title: 'Ätceller och inflammation',
    section: 'Försvarets linjer',
    minutes: 9,
    goal: 'Idag ska vi förstå det ospecifika försvaret: ätceller, inflammation och feber.',
    objectives: ['Förklara vad ätceller gör.', 'Beskriva inflammationens tecken och varför de uppstår.', 'Förklara varför vi får feber.'],
    prerequisites: ['m8-l03'],
    what: [
      'Om ett smittämne tar sig förbi det yttre försvaret möts det av det **ospecifika försvaret**. Det kallas ospecifikt eftersom det angriper **allt främmande** på samma sätt, utan att först behöva lära sig vem fienden är.',
      'Huvudaktörerna är **ätceller** (fagocyter) – vita blodkroppar som äter upp inkräktare – och **inflammation**.',
    ],
    why: [
      'Det specifika försvaret behöver flera dagar på sig första gången det möter en ny inkräktare. Under tiden måste något hålla tillbaka infektionen. Det ospecifika försvaret är snabbt – det startar inom minuter till timmar.',
    ],
    how: [
      '**Ätcellerna** omsluter bakterier, virus och döda celler och bryter ned dem med enzymer.',
      '**Inflammation**: skadade celler och ätceller släpper ut signalämnen. Blodkärlen i området **vidgas** och blir mer genomsläppliga. Det ger fyra klassiska tecken: **rodnad** och **värme** (mer blod), **svullnad** (vätska läcker ut) och **smärta** (tryck och signalämnen). Fler vita blodkroppar kan nu ta sig ut till platsen.',
      '**Feber**: vid större infektioner signalerar immunförsvaret till hypotalamus som höjer kroppens termostat. Högre temperatur gör immunförsvaret effektivare och försvårar för vissa smittämnen.',
      'Var är en blandning av döda vita blodkroppar, bakterier och vävnadsrester.',
    ],
    where: [
      'En sticka i fingret blir röd, varm, svullen och öm – det är inflammation.',
      'Feber vid influensa är kroppens eget försvar. Febernedsättande medicin kan göra att man mår bättre, men den bekämpar inte infektionen.',
    ],
    misconceptions: [
      { myth: 'Inflammation betyder att det är en infektion.', truth: 'Inflammation kan också uppstå vid skador utan smittämnen, t.ex. en stukad fot.' },
      { myth: 'Feber är alltid farligt och måste sänkas.', truth: 'Feber är en del av försvaret. Mycket hög eller långvarig feber kan dock vara farlig och bör kontrolleras.' },
    ],
    simple: [
      'Det ospecifika försvaret angriper allt främmande snabbt.',
      'Ätceller äter upp inkräktare.',
      'Inflammation ger rodnad, värme, svullnad och smärta. Feber hjälper försvaret.',
    ],
    detailed: [
      'Ätceller som har ätit en inkräktare kan visa upp bitar av den (antigen) för det specifika försvaret. Det är så de två försvaren kopplas ihop.',
      'Signalämnet histamin är en viktig orsak till att blodkärlen vidgas vid inflammation. Det spelar också roll vid allergi.',
      'Långvarig (kronisk) inflammation kan skada kroppen och finns med vid många sjukdomar.',
    ],
    visual: {
      kind: 'flow',
      layout: 'line',
      nodes: [
        { label: 'Skada', detail: 'En sticka tar med sig bakterier in.', icon: '🪵' },
        { label: 'Signalämnen', detail: 'Skadade celler larmar.', icon: '📣' },
        { label: 'Blodkärl vidgas', detail: 'Rodnad, värme, svullnad.', icon: '🔴' },
        { label: 'Ätceller kommer', detail: 'Äter upp bakterierna.', icon: '🟡' },
        { label: 'Läkning', detail: 'Området återställs.', icon: '🩹' },
      ],
      caption: 'Inflammation steg för steg.',
    },
    analogy: {
      text: 'Inflammation är som när räddningstjänsten spärrar av en olycksplats. Vägarna dit breddas (blodkärlen vidgas) så att alla utryckningsfordon (vita blodkroppar) snabbt kan komma fram. Det blir trångt och rörigt (svullnad), men det är så hjälpen når fram.',
      limits: 'Räddningstjänsten vet vad som hänt. Det ospecifika försvaret reagerar likadant oavsett vilken sorts inkräktare det är.',
    },
    alternatives: ['Ospecifikt = "angrip allt som inte hör hemma här".'],
    caveats: ['Gränsen mellan ospecifikt och specifikt försvar är inte skarp – de samarbetar.'],
    check: mcq('Vad gör ätcellerna?', ['Bildar antikroppar', 'Omsluter och bryter ned inkräktare', 'Bildar hormoner'], 1, 'Ätceller äter upp främmande partiklar.'),
    followUp: tf('Det ospecifika försvaret angriper allt främmande på samma sätt.', true, 'Därav namnet.'),
    apply: mcq('Varför blir ett inflammerat område rött och varmt?', ['Blodkärlen vidgas och mer blod strömmar dit', 'Bakterierna är röda', 'Huden blir tunnare'], 0, 'Mer blod ger rodnad och värme.', { d: 2 }),
    practice: [
      match('Inflammationens tecken och orsak.', [['Rodnad', 'Mer blod i området'], ['Svullnad', 'Vätska läcker ut ur blodkärlen'], ['Smärta', 'Tryck och signalämnen']], 'Fyra klassiska tecken.'),
      tf('Feber är en del av kroppens försvar.', true, 'Hypotalamus höjer temperaturen.'),
      fill('Vita blodkroppar som äter upp inkräktare kallas ätceller eller ____.', ['fagocyter', 'fagocyt'], 'Fagocyter.'),
      explain('Förklara varför kroppen behöver ett snabbt ospecifikt försvar.', 'Det specifika försvaret tar flera dagar att komma igång första gången. Under tiden måste infektionen hållas tillbaka, och det gör det ospecifika försvaret som reagerar inom minuter till timmar.', [['snabb'], ['specifik'], ['dagar', 'tid'], ['hålla tillbaka', 'bekämpa', 'stoppa']], { min: 2, d: 3 }),
    ],
    summary: ['Det ospecifika försvaret är snabbt och angriper allt främmande.', 'Ätceller äter upp inkräktare.', 'Inflammation: rodnad, värme, svullnad, smärta.', 'Feber hjälper försvaret.'],
    flashcards: [['Nämn inflammationens fyra tecken.', 'Rodnad, värme, svullnad och smärta.'], ['Vad är en fagocyt?', 'En ätcell som omsluter och bryter ned inkräktare.']],
    related: ['fagocyt', 'inflammation', 'feber', 'vit-blodkropp'],
  }),

  lesson({
    id: 'm8-l05',
    title: 'Det specifika försvaret',
    section: 'Försvarets linjer',
    minutes: 10,
    goal: 'Idag ska vi förstå hur B- och T-celler riktar in sig på en viss inkräktare.',
    objectives: ['Förklara vad ett antigen är.', 'Beskriva vad B-celler och T-celler gör.', 'Förklara varför det specifika försvaret tar tid första gången.'],
    prerequisites: ['m8-l04', 'm5-l10'],
    what: [
      'Det **specifika försvaret** angriper **en viss** inkräktare. Det sköts av särskilda vita blodkroppar, **lymfocyter**. De finns i två sorter: **B-celler** och **T-celler**.',
      'Lymfocyterna känner igen inkräktaren på dess **antigen** – oftast proteiner på smittämnets yta, som fungerar som ett kännetecken.',
    ],
    why: [
      'Det ospecifika försvaret räcker inte alltid. Vissa smittämnen förökar sig för snabbt eller gömmer sig inne i våra celler. Det specifika försvaret är mycket mer träffsäkert och kan dessutom **komma ihåg** fienden.',
    ],
    how: [
      'Kroppen har miljontals olika lymfocyter. **Varje lymfocyt passar bara mot ett enda antigen**, som en nyckel i ett lås. När en infektion kommer måste rätt lymfocyt först hittas.',
      'En ätcell som ätit en inkräktare visar upp antigenet för **T-hjälparceller**. De larmar och aktiverar rätt **B-celler** och **T-mördarceller**.',
      'Den aktiverade lymfocyten delar sig många gånger och bildar en hel armé av likadana celler. Det tar några dagar – därför är man sjuk ett tag första gången.',
      '**B-celler** tillverkar **antikroppar** (nästa sida). **T-mördarceller** letar upp och dödar kroppsceller som är infekterade av virus.',
    ],
    where: [
      'Vid hiv angriper viruset T-hjälparcellerna. Utan behandling försvagas hela immunförsvaret, och sjukdomen kallas aids.',
      'Vid organtransplantationer ser T-cellerna det nya organet som främmande. Patienten får därför läkemedel som dämpar immunförsvaret.',
    ],
    misconceptions: [
      { myth: 'Immunförsvaret måste ha sett ett smittämne förut för att kunna bekämpa det.', truth: 'Kroppen har från början lymfocyter som passar mot nästan alla tänkbara antigen. Det tar bara tid att hitta och föröka rätt celler första gången.' },
    ],
    simple: [
      'Det specifika försvaret angriper en viss inkräktare.',
      'Lymfocyter (B- och T-celler) känner igen inkräktarens antigen.',
      'Första gången tar det några dagar att komma igång.',
    ],
    detailed: [
      'B-celler mognar i benmärgen och T-celler i brässen (tymus) – därav bokstaven T.',
      'Att lymfocyterna inte angriper kroppens egna celler beror på att de "testas" under mognaden – de som reagerar mot det egna sorteras bort. När det misslyckas kan autoimmuna sjukdomar uppstå.',
      'Lymfkörtlarna är mötesplatser där ätceller visar upp antigen för lymfocyter. Därför sväller de vid infektion.',
    ],
    visual: {
      kind: 'flow',
      layout: 'line',
      nodes: [
        { label: 'Ätcell', detail: 'Äter inkräktaren och visar upp antigenet.', icon: '🟡' },
        { label: 'T-hjälparcell', detail: 'Känner igen antigenet och larmar.', icon: '📯' },
        { label: 'B-cell', detail: 'Aktiveras och delar sig – bildar antikroppar.', icon: '🏹' },
        { label: 'T-mördarcell', detail: 'Dödar infekterade celler.', icon: '🎯' },
        { label: 'Minnesceller', detail: 'Finns kvar och minns fienden.', icon: '🧠' },
      ],
      caption: 'Det specifika försvaret.',
    },
    analogy: {
      text: 'Det specifika försvaret är som en polisstyrka med en enorm fotoalbum-samling. Varje polis har bara ett enda foto (antigen) och letar efter just den personen. När en ätcell kommer med en bild på inkräktaren letar man upp polisen med rätt foto, och den polisen kopierar sig själv till en hel styrka som jagar just den inkräktaren.',
      limits: 'Poliser kan känna igen ett ansikte på många sätt. En lymfocyt reagerar bara om antigenet passar exakt i dess receptor.',
    },
    alternatives: ['B-celler skjuter pilar (antikroppar). T-mördarceller går in och slår ut infekterade celler.'],
    caveats: ['Det specifika försvaret är mycket mer komplext än vad som beskrivs här, med många celltyper.'],
    check: mcq('Vad är ett antigen?', ['Ett kännetecken på en inkräktare som immunförsvaret känner igen', 'En sorts vit blodkropp', 'Ett läkemedel'], 0, 'Antigen är oftast proteiner på smittämnets yta.'),
    followUp: tf('Varje lymfocyt passar bara mot ett enda antigen.', true, 'Därför har kroppen miljontals olika.'),
    apply: mcq('Varför är man sjuk i flera dagar första gången man smittas av ett virus?', ['Det tar tid att hitta och föröka rätt lymfocyter', 'Viruset är för stort', 'Ätcellerna sover'], 0, 'Rätt lymfocyter måste aktiveras och dela sig.', { d: 2 }),
    practice: [
      match('Vilken cell gör vad?', [['B-cell', 'Bildar antikroppar'], ['T-mördarcell', 'Dödar infekterade celler'], ['T-hjälparcell', 'Larmar och aktiverar andra celler']], 'Olika lymfocyter.'),
      tf('Hiv angriper T-hjälparcellerna.', true, 'Därför försvagas hela immunförsvaret.', { d: 2 }),
      fill('Vita blodkroppar i det specifika försvaret kallas ____.', ['lymfocyter', 'lymfocyt'], 'B- och T-celler är lymfocyter.'),
      explain('Förklara hur det specifika försvaret skiljer sig från det ospecifika.', 'Det ospecifika försvaret angriper allt främmande på samma sätt och är snabbt. Det specifika försvaret riktar sig mot ett visst antigen med B- och T-celler, tar längre tid första gången men är träffsäkert och har minne.', [['allt', 'samma sätt'], ['antigen', 'viss'], ['snabb', 'tid', 'dagar'], ['minne']], { min: 3, d: 3 }),
    ],
    summary: ['Det specifika försvaret angriper en viss inkräktare.', 'Lymfocyter känner igen antigen.', 'B-celler bildar antikroppar, T-mördarceller dödar infekterade celler.', 'Första gången tar det några dagar.'],
    flashcards: [['Vad är ett antigen?', 'Ett ämne på en inkräktare som immunförsvaret känner igen.'], ['Vad gör T-mördarceller?', 'Dödar kroppsceller som är infekterade.']],
    related: ['lymfocyt', 'b-cell', 't-cell', 'antigen'],
  }),
]
