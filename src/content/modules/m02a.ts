import { elementQ, explain, fill, lesson, match, mcq, tf } from '../builders'

export const m2a = [
  lesson({
    id: 'm2-l01',
    title: 'Vad är periodiska systemet?',
    section: 'Läsa tabellen',
    minutes: 8,
    goal: 'Idag ska vi förstå vad periodiska systemet är och varför det är så användbart.',
    objectives: ['Förklara att periodiska systemet visar alla grundämnen ordnade efter atomnummer.', 'Veta att rader kallas perioder och kolumner kallas grupper.', 'Veta att ämnen i samma grupp liknar varandra.'],
    prerequisites: ['m1-l09'],
    what: [
      '**Periodiska systemet** är en tabell över alla 118 kända grundämnen. Varje ruta är ett grundämne.',
      'Ämnena står i ordning efter **atomnummer** (antal protoner), och tabellen är formad så att ämnen som liknar varandra hamnar i samma kolumn.',
    ],
    why: [
      'På 1800-talet hade kemister hittat ett sextiotal grundämnen och såg att egenskaper upprepades med jämna mellanrum. Dmitrij Mendelejev ordnade dem 1869 i en tabell som visade mönstret – han kunde till och med förutsäga ämnen som ännu inte var upptäckta.',
      'Vi vet i dag varför mönstret finns: det beror på hur elektronerna fyller skalen. Ämnen med lika många valenselektroner beter sig likt.',
    ],
    how: [
      'Raderna kallas **perioder** och kolumnerna **grupper**. Var ett ämne står berättar om dess elektroner och därmed hur det reagerar.',
      'Till vänster och i mitten finns metaller, till höger ickemetaller och längst till höger ädelgaserna.',
    ],
    where: [
      'Tabellen hänger i nästan varje kemisal och är kemistens viktigaste uppslagsbok. Du får ofta ha den med dig på prov.',
    ],
    misconceptions: [
      { myth: 'Man måste kunna periodiska systemet utantill.', truth: 'Man behöver förstå hur man läser det. Själva tabellen får man nästan alltid titta i.' },
    ],
    simple: [
      'Periodiska systemet är en tabell över alla 118 grundämnen.',
      'Grundämnena står i ordning efter atomnummer – antalet protoner.',
      'Ämnen som liknar varandra hamnar under varandra i samma kolumn.',
    ],
    detailed: [
      'Den ryske kemisten Dmitrij Mendelejev ordnade grundämnena 1869. Han lämnade luckor för ämnen som ännu inte var upptäckta och förutsade deras egenskaper – och fick rätt när de senare hittades.',
      'Raderna kallas perioder (1–7). Kolumnerna kallas grupper (1–18). Lantaniderna och aktiniderna ritas ofta under tabellen för att den ska få plats.',
      'Ordet "periodisk" betyder att något upprepas. Egenskaperna upprepas för varje ny period: varje period börjar med en mycket reaktiv metall och slutar med en ädelgas.',
      'Till vänster finns metaller, till höger ickemetaller och däremellan en trappa av halvmetaller.',
    ],
    visual: { kind: 'periodic', caption: 'Klicka på olika grundämnen. Färgerna visar olika sorters ämnen.' },
    analogy: {
      text: 'Periodiska systemet är som en välordnad kryddhylla. Kryddorna står i nummerordning, men hyllan är byggd så att liknande kryddor hamnar i samma kolumn – alla starka kryddor i en kolumn, alla söta i en annan. Vet du var en krydda står, vet du ungefär hur den smakar.',
      limits: 'Kryddor sorterar vi själva hur vi vill. Periodiska systemets ordning bestäms av naturen – av hur många protoner och elektroner atomerna har.',
    },
    alternatives: [
      'Tänk på det som ett höghus. Varje våning är en period. Varje lägenhet i samma vertikala rad (grupp) har samma planlösning – ämnena i samma grupp är byggda på liknande sätt.',
      'Periodiska systemet är kemins karta. Den talar om hur många protoner ett ämne har, hur elektronerna sitter och ungefär hur det kommer att reagera.',
    ],
    caveats: ['Det finns flera sätt att rita periodiska systemet. Placeringen av väte och av lantan/lutetium diskuteras fortfarande av kemister.'],
    check: mcq('Hur är grundämnena ordnade i periodiska systemet?', ['Efter hur mycket de väger', 'Efter atomnummer', 'I bokstavsordning'], 1, 'Grundämnena är ordnade efter atomnummer, alltså antalet protoner.', { wrong: { 0: 'Massan ökar oftast i samma ordning, men det är atomnumret som bestämmer ordningen.', 2: 'Bokstavsordning skulle inte visa några mönster.' } }),
    followUp: tf('Kolumnerna i periodiska systemet kallas grupper.', true, 'Ja, kolumner = grupper och rader = perioder.'),
    apply: mcq('Du ska gissa egenskaperna hos ett okänt grundämne. Vad är mest användbart att veta?', ['Vilken grupp det tillhör', 'Vem som upptäckte det', 'Vilket år det upptäcktes'], 0, 'Ämnen i samma grupp har liknande egenskaper, så gruppen säger mycket.', { d: 2 }),
    practice: [
      match('Para ihop ord och betydelse.', [['Period', 'Rad'], ['Grupp', 'Kolumn'], ['Atomnummer', 'Antal protoner']], 'Perioder är rader, grupper är kolumner.'),
      mcq('Vem skapade det första periodiska systemet?', ['Marie Curie', 'Dmitrij Mendelejev', 'Albert Einstein'], 1, 'Mendelejev ordnade grundämnena 1869.'),
      tf('Metallerna finns främst till höger i periodiska systemet.', false, 'Metallerna finns till vänster och i mitten. Ickemetallerna finns till höger.'),
      explain('Varför kallas tabellen "periodiska" systemet?', 'Egenskaperna hos grundämnena upprepas med jämna mellanrum när atomnumret ökar. Varje ny period börjar med en reaktiv metall och slutar med en ädelgas, och ämnen med liknande egenskaper hamnar i samma grupp.', [['upprepas', 'återkommer', 'mönster'], ['egenskaper'], ['grupp', 'kolumn', 'period']], { min: 2, d: 3 }),
    ],
    summary: ['Periodiska systemet visar alla 118 grundämnen.', 'De är ordnade efter atomnummer.', 'Rader = perioder, kolumner = grupper.', 'Ämnen i samma grupp liknar varandra.'],
    flashcards: [['Vad kallas raderna i periodiska systemet?', 'Perioder.'], ['Vad kallas kolumnerna?', 'Grupper.'], ['Efter vad ordnas grundämnena?', 'Atomnummer.']],
    related: ['periodiska-systemet', 'grupp', 'period'],
  }),

  lesson({
    id: 'm2-l02',
    title: 'Hur hittar man ett grundämne?',
    section: 'Läsa tabellen',
    minutes: 8,
    goal: 'Idag ska vi lära oss att snabbt hitta ett grundämne i periodiska systemet.',
    objectives: ['Hitta ett grundämne med hjälp av atomnummer, symbol eller namn.', 'Läsa av vad som står i en ruta.', 'Ange vilken period och grupp ett grundämne finns i.'],
    prerequisites: ['m2-l01'],
    what: [
      'Varje ruta i periodiska systemet innehåller fakta om ett grundämne: **atomnummer**, **kemisk symbol** och ofta **namn** och **atommassa**.',
    ],
    why: [
      'Rutan samlar allt man oftast behöver på ett ställe, så att man snabbt kan räkna protoner, elektroner och neutroner.',
    ],
    how: [
      'Letar du efter ett nummer: atomnumret ökar med 1 för varje ruta, från vänster till höger, rad för rad.',
      'Letar du efter ett namn: leta efter symbolen. Den är ofta början på det latinska eller engelska namnet.',
    ],
    where: [
      'Rutorna ser lite olika ut i olika böcker, men atomnumret och symbolen finns alltid med.',
    ],
    misconceptions: [
      { myth: 'Det stora talet med decimaler i rutan är atomnumret.', truth: 'Talet med decimaler är atommassan. Atomnumret är alltid ett heltal.' },
    ],
    simple: [
      'Varje ruta i periodiska systemet är ett grundämne.',
      'I rutan står atomnumret, den kemiska symbolen och ofta namn och atommassa.',
      'Du kan leta efter numret – det ökar med ett för varje ruta, från vänster till höger.',
    ],
    detailed: [
      'Börja uppe till vänster med väte (1). Läs sedan rad för rad, som en bok. När raden tar slut fortsätter du på nästa rad till vänster.',
      'Perioden är radens nummer, uppifrån och ned. Gruppen är kolumnens nummer, från vänster till höger (1–18).',
      'Exempel: Kalcium (Ca) har atomnummer 20. Det står i period 4, grupp 2.',
      'Symbolerna är internationella. Ibland kommer de från latin: järn = Fe (ferrum), natrium = Na, kalium = K (kalium på latin), bly = Pb (plumbum).',
    ],
    visual: { kind: 'periodic', highlight: [20], caption: 'Kalcium: period 4, grupp 2. Klicka för att läsa rutan.' },
    visualPrompt: 'Hitta kalcium (Ca). Räkna raderna uppifrån och kolumnerna från vänster.',
    analogy: {
      text: 'Att hitta ett grundämne är som att hitta en plats på en bio. Raden (perioden) och platsnumret (gruppen) säger exakt var du ska sitta. Atomnumret är som biljettens löpnummer – det räknar alla platser i ordning.',
      limits: 'På bio har alla rader lika många platser. I periodiska systemet är de översta raderna kortare, så det finns "luckor" i tabellen.',
    },
    alternatives: ['Säg att du letar efter syre, O. Det har atomnummer 8. Räkna: H 1, He 2, Li 3, Be 4, B 5, C 6, N 7, O 8. Syre står i period 2, grupp 16.', 'Använd sökrutan i Naturlys periodiska system – skriv namnet eller symbolen så lyser rutan upp.'],
    caveats: ['Grupperna kan i äldre böcker vara numrerade på andra sätt (t.ex. I–VIII med A och B). Naturly använder IUPAC:s numrering 1–18.'],
    check: elementQ('Klicka på syre (O).', 8, 'Syre har atomnummer 8 och står i period 2, grupp 16.'),
    followUp: mcq('Vad står i varje ruta i periodiska systemet?', ['Atomnummer och kemisk symbol', 'Ämnets färg', 'Ämnets pris'], 0, 'Atomnummer och symbol står alltid. Ofta också namn och atommassa.'),
    apply: mcq('I vilken period och grupp finns klor (Cl, atomnummer 17)?', ['Period 2, grupp 17', 'Period 3, grupp 17', 'Period 3, grupp 7'], 1, 'Klor står på tredje raden och i grupp 17.', { d: 2 }),
    practice: [
      elementQ('Klicka på järn (Fe).', 26, 'Järn har atomnummer 26 och står i period 4, grupp 8.'),
      fill('I vilken period finns natrium (Na)? Skriv en siffra.', ['3'], 'Natrium står i period 3.', { numeric: true }),
      match('Para ihop symbol och namn.', [['Fe', 'Järn'], ['Pb', 'Bly'], ['Au', 'Guld'], ['K', 'Kalium']], 'Flera symboler kommer från latinska namn.', { d: 2 }),
      tf('Ett grundämne i period 4 har fyra elektronskal.', true, 'Periodens nummer anger antalet elektronskal.', { d: 2 }),
    ],
    summary: ['Varje ruta är ett grundämne.', 'Rutan visar atomnummer och symbol.', 'Period = rad, grupp = kolumn.', 'Vissa symboler kommer från latin.'],
    flashcards: [['Vad står i en ruta i periodiska systemet?', 'Atomnummer, symbol (ofta namn och atommassa).'], ['Vilken symbol har järn?', 'Fe (ferrum).'], ['Var står kalcium?', 'Period 4, grupp 2.']],
    related: ['periodiska-systemet', 'period', 'grupp'],
  }),

  lesson({
    id: 'm2-l03',
    title: 'Atomnummer och kemiska symboler',
    section: 'Läsa tabellen',
    minutes: 9,
    goal: 'Idag ska vi lära oss hur kemiska symboler fungerar och hur de hänger ihop med atomnumret.',
    objectives: ['Skriva kemiska symboler korrekt (stor + liten bokstav).', 'Koppla ihop symbol, namn och atomnummer för vanliga grundämnen.', 'Förstå att symbolen alltid hör ihop med ett bestämt atomnummer.'],
    prerequisites: ['m2-l02'],
    what: [
      'En **kemisk symbol** är en förkortning på en eller två bokstäver för ett grundämne, t.ex. H för väte och Na för natrium.',
    ],
    why: [
      'Symbolerna är internationella. Väte heter olika saker på olika språk, men symbolen H förstår alla kemister.',
      'Vissa symboler kommer från latin: Na från *natrium*, Fe från *ferrum* (järn), Au från *aurum* (guld).',
    ],
    how: [
      'Första bokstaven är alltid stor, andra alltid liten. Symbolen och atomnumret hör alltid ihop: Na = 11 protoner, oavsett vad.',
    ],
    where: [
      'I kemiska formler som NaCl och H₂O och på näringsdeklarationer (Na, K, Fe).',
    ],
    misconceptions: [
      { myth: 'Symbolen är alltid de första bokstäverna i det svenska namnet.', truth: 'Ofta, men inte alltid. Järn = Fe, guld = Au, bly = Pb, kvicksilver = Hg.' },
    ],
    simple: [
      'Varje grundämne har en kemisk symbol med en eller två bokstäver.',
      'Första bokstaven är alltid stor, den andra alltid liten: Co är kobolt, men CO är kolmonoxid!',
      'Symbolen och atomnumret hör alltid ihop: Na betyder alltid 11 protoner.',
    ],
    detailed: [
      'Symbolerna bestämdes av den svenske kemisten Jöns Jacob Berzelius på 1810-talet. Han använde första bokstaven i grundämnets latinska namn, och ibland en till bokstav.',
      'Exempel där symbolen följer det svenska namnet: kol C, kväve N (nitrogenium), syre O (oxygenium), väte H (hydrogenium). Det latinska namnet förklarar symbolen.',
      'Stor och liten bokstav är viktigt. Co (kobolt) är ett grundämne. CO är en förening av kol (C) och syre (O). Sn är tenn, SN finns inte.',
      'Vanliga grundämnen att kunna utantill: H 1, He 2, C 6, N 7, O 8, Na 11, Mg 12, Al 13, S 16, Cl 17, K 19, Ca 20, Fe 26.',
    ],
    visual: { kind: 'periodic', highlight: [1, 6, 7, 8, 11, 12, 13, 16, 17, 19, 20, 26], caption: 'Vanliga grundämnen som är bra att kunna.' },
    analogy: {
      text: 'Kemiska symboler är som förkortningar på flygplatser: ARN är Arlanda och GOT är Landvetter. Förkortningen är alltid densamma i hela världen, och den betyder alltid samma plats. På samma sätt betyder Fe alltid järn, i Sverige och i Japan.',
      limits: 'Flygplatskoder säger inget om flygplatsen. Symbolen pekar däremot på ett bestämt atomnummer – och därmed på hur atomen är uppbyggd.',
    },
    alternatives: ['Två bokstäver? Stor + liten. Mg, Ca, Cl. Om båda är stora är det två olika atomer.', 'Lär dig 10 symboler i taget. Börja med H, C, N, O, Na, Cl, Ca, Fe, Cu och Au – de dyker upp hela tiden.'],
    caveats: ['Vissa supertunga grundämnen fick sina namn och symboler först på 2000-talet.'],
    check: mcq('Vad betyder Co?', ['Kolmonoxid', 'Kobolt', 'Koppar'], 1, 'Co med liten o är grundämnet kobolt. CO med stort O är kolmonoxid.', { wrong: { 0: 'CO (stora bokstäver) är kolmonoxid – en förening av C och O.', 2: 'Koppar har symbolen Cu.' } }),
    followUp: mcq('Vilken symbol har syre?', ['S', 'O', 'Sy'], 1, 'Syre heter oxygenium på latin, därför O.'),
    apply: fill('Skriv symbolen för grundämnet med atomnummer 12.', ['Mg'], 'Atomnummer 12 är magnesium, Mg.'),
    practice: [
      match('Para ihop symbol och atomnummer.', [['H', '1'], ['C', '6'], ['O', '8'], ['Na', '11']], 'Väte 1, kol 6, syre 8, natrium 11.'),
      tf('Symbolen CL är rätt sätt att skriva klor.', false, 'Klor skrivs Cl – den andra bokstaven ska alltid vara liten.'),
      elementQ('Klicka på grundämnet med symbolen Cu.', 29, 'Cu (cuprum) är koppar, atomnummer 29.', { d: 2 }),
      mcq('Vem gav grundämnena deras symboler?', ['Jöns Jacob Berzelius', 'Carl von Linné', 'Alfred Nobel'], 0, 'Berzelius var en svensk kemist som införde symbolerna på 1810-talet.'),
    ],
    summary: ['Varje grundämne har en symbol med 1–2 bokstäver.', 'Stor första bokstav, liten andra.', 'Symbolen hör alltid ihop med ett atomnummer.', 'Många symboler kommer från latin.'],
    flashcards: [['Vad är skillnaden mellan Co och CO?', 'Co = kobolt (grundämne). CO = kolmonoxid (förening).'], ['Vilken symbol har natrium?', 'Na.'], ['Vem införde de kemiska symbolerna?', 'Jöns Jacob Berzelius.']],
    related: ['grundamne', 'atomnummer', 'periodiska-systemet'],
  }),

  lesson({
    id: 'm2-l04',
    title: 'Perioder och grupper',
    section: 'Läsa tabellen',
    minutes: 10,
    goal: 'Idag ska vi förstå vad perioder och grupper berättar om atomerna.',
    objectives: ['Förklara att periodnumret anger antalet elektronskal.', 'Förklara att ämnen i samma grupp har lika många valenselektroner.', 'Använda period och grupp för att beskriva en atoms elektronuppställning.'],
    prerequisites: ['m2-l02', 'm1-l13'],
    what: [
      '**Perioder** är raderna (1–7). **Grupper** är kolumnerna (1–18).',
    ],
    why: [
      'Uppdelningen speglar elektronernas skal. En ny rad börjar varje gång ett nytt skal börjar fyllas. Ämnen i samma kolumn har lika många valenselektroner och liknar därför varandra.',
    ],
    how: [
      '**Periodnumret** = antal elektronskal. Natrium står i period 3 → 3 skal.',
      '**Gruppnumret** säger (för huvudgrupperna) antalet valenselektroner: grupp 1 → 1, grupp 2 → 2, grupp 13–18 → 3–8.',
    ],
    where: [
      'Grupp 1 kallas alkalimetaller, grupp 17 halogener och grupp 18 ädelgaser – namnen används ofta i kemi.',
    ],
    misconceptions: [
      { myth: 'Ämnen i samma rad liknar varandra mest.', truth: 'Det är ämnen i samma kolumn (grupp) som liknar varandra.' },
    ],
    simple: [
      'Periodnumret berättar hur många elektronskal atomen har.',
      'Gruppnumret berättar (för huvudgrupperna) hur många elektroner som finns i yttersta skalet.',
      'Därför liknar ämnen i samma grupp varandra.',
    ],
    detailed: [
      'Natrium står i period 3 – den har 3 skal (2, 8, 1). Kalium står i period 4 – den har 4 skal (2, 8, 8, 1). Båda står i grupp 1 och har 1 valenselektron.',
      'Huvudgrupperna är 1, 2 och 13–18. För grupp 13–18 tar du bort tiotalet: grupp 16 → 6 valenselektroner.',
      'Längre ned i en grupp blir atomerna större, eftersom de har fler skal. Därför sitter valenselektronerna längre från kärnan och hålls lösare. Det är därför kalium är mer reaktivt än natrium.',
      'Från vänster till höger i en period ökar antalet protoner. Kärnan drar hårdare i elektronerna och atomerna blir faktiskt lite mindre.',
    ],
    visual: { kind: 'periodic', groups: [1], periods: [3], caption: 'Grupp 1 och period 3 markerade. Var korsar de varandra?' },
    analogy: {
      text: 'Tänk på ett höghus med lägenheter. Våningen (perioden) säger hur högt upp du bor – hur många skal. Lägenhetsnumret på våningen (gruppen) säger hur många som bor i den översta, yttersta lägenheten. Alla lägenheter i samma lodräta rad har samma planlösning – samma antal valenselektroner.',
      limits: 'I riktiga hus är alla våningar lika stora. I atomer rymmer de yttre skalen fler elektroner än de inre.',
    },
    alternatives: ['Period = hur många ringar (skal). Grupp = hur många prickar i yttersta ringen (för huvudgrupperna).', 'Klor: period 3, grupp 17. Alltså 3 skal och 7 valenselektroner: 2, 8, 7. Testa själv i atombyggaren!'],
    caveats: ['För övergångsmetallerna (grupp 3–12) är sambandet mellan grupp och valenselektroner mer komplicerat.', 'Helium står i grupp 18 men har bara 2 elektroner – dess enda skal är fullt.'],
    check: mcq('Vad anger periodnumret?', ['Antalet valenselektroner', 'Antalet elektronskal', 'Antalet neutroner'], 1, 'Periodnumret är antalet elektronskal.', { wrong: { 0: 'Det är gruppnumret som (för huvudgrupperna) anger valenselektronerna.', 2: 'Neutronerna syns inte i periodiska systemet – de varierar mellan isotoper.' } }),
    followUp: tf('Natrium och kalium står i samma grupp och har lika många valenselektroner.', true, 'Båda finns i grupp 1 och har 1 valenselektron.'),
    apply: fill('Ett grundämne står i period 3, grupp 16. Skriv elektronfördelningen (t.ex. 2,8,1).', ['2,8,6', '2 8 6', '2, 8, 6'], '3 skal och 6 valenselektroner: 2, 8, 6. Det är svavel.', { d: 2 }),
    practice: [
      mcq('Hur många valenselektroner har ämnen i grupp 15?', ['1', '5', '15'], 1, 'Ta bort tiotalet: 15 → 5.'),
      elementQ('Klicka på grundämnet som har 2 elektronskal och 7 valenselektroner.', 9, 'Period 2, grupp 17 är fluor: 2, 7.', { d: 2 }),
      tf('Kalium är mer reaktivt än natrium eftersom dess valenselektron sitter längre från kärnan.', true, 'Kalium har ett skal till, så valenselektronen hålls lösare.', { d: 3 }),
      explain('Förklara varför grundämnen i samma grupp har liknande kemiska egenskaper.', 'Grundämnen i samma grupp har lika många valenselektroner i sitt yttersta skal. Eftersom det är valenselektronerna som deltar i kemiska reaktioner reagerar ämnena på liknande sätt.', [['valenselektron', 'yttersta skalet', 'ytterelektron'], ['lika många', 'samma antal'], ['reagera', 'reaktion', 'kemiska egenskaper']], { min: 2, d: 2 }),
    ],
    summary: ['Period = antal elektronskal.', 'Grupp (1, 2, 13–18) → antal valenselektroner.', 'Samma grupp → liknande egenskaper.', 'Längre ned i en grupp → större atomer.'],
    flashcards: [['Vad säger periodnumret?', 'Antalet elektronskal.'], ['Hur många valenselektroner har grupp 17?', '7.'], ['Varför är kalium mer reaktivt än natrium?', 'Valenselektronen sitter längre från kärnan och hålls lösare.']],
    related: ['period', 'grupp', 'valenselektron'],
  }),

  lesson({
    id: 'm2-l05',
    title: 'Metaller',
    section: 'Ämnenas familjer',
    minutes: 9,
    goal: 'Idag ska vi förstå vad som kännetecknar metaller.',
    objectives: ['Beskriva typiska egenskaper hos metaller.', 'Hitta metallerna i periodiska systemet.', 'Förklara varför metaller ofta bildar positiva joner.'],
    prerequisites: ['m2-l04'],
    what: [
      '**Metaller** är grundämnen som oftast är blanka, leder elektricitet och värme bra och går att böja och forma. Ungefär 80 % av grundämnena är metaller.',
    ],
    why: [
      'Metallatomer har få valenselektroner som sitter löst. I en metallbit lossnar de och rör sig fritt mellan atomerna, som ett elektron"hav". De fria elektronerna förklarar att metaller leder ström och värme och att de glänser.',
    ],
    how: [
      'När metaller reagerar avger de gärna sina valenselektroner och bildar **positiva joner**.',
      'Metallerna står till vänster och i mitten av periodiska systemet.',
    ],
    where: [
      'Koppar i elkablar, aluminium i burkar, järn i stål – och natrium, kalium och kalcium som joner i din kropp.',
    ],
    misconceptions: [
      { myth: 'Alla metaller är hårda och fasta.', truth: 'Kvicksilver är flytande i rumstemperatur och natrium kan skäras med kniv.' },
    ],
    simple: [
      'De flesta grundämnen är metaller. De står till vänster och i mitten av periodiska systemet.',
      'Metaller är ofta blanka, leder el och värme och går att böja och forma.',
      'Metaller har få valenselektroner och avger dem gärna. Då bildas positiva joner.',
    ],
    detailed: [
      'I en metallbit sitter metallatomerna tätt, och valenselektronerna kan röra sig fritt mellan atomerna, som ett "elektronhav". Det förklarar varför metaller leder ström så bra.',
      'Alkalimetallerna (grupp 1) är så reaktiva att de förvaras i olja. De alkaliska jordartsmetallerna (grupp 2) är också reaktiva men lite mindre.',
      'Övergångsmetallerna (grupp 3–12), som järn, koppar, silver och guld, är våra vanliga bruksmetaller. De kan ofta bilda flera olika joner, t.ex. Fe²⁺ och Fe³⁺.',
      'Kvicksilver är den enda metallen som är flytande vid rumstemperatur.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Metaller', points: ['Blanka (metallglans)', 'Leder el och värme', 'Formbara', 'Avger elektroner → positiva joner', 'T.ex. Na, Mg, Fe, Cu, Au'], tone: 'blue' },
        { title: 'Ickemetaller', points: ['Oftast inte blanka', 'Leder el dåligt (utom grafit)', 'Spröda om de är fasta', 'Tar upp eller delar elektroner', 'T.ex. O, N, C, S, Cl'], tone: 'green' },
      ],
      caption: 'Metaller jämfört med ickemetaller.',
    },
    analogy: {
      text: 'Tänk på metallatomer som grannar i ett radhusområde som delar på alla cyklar. Ingen äger en egen cykel – alla cyklar (elektroner) rullar fritt mellan husen. Därför kan "trafiken" (strömmen) lätt ta sig genom hela området.',
      limits: 'Elektronerna i en metall är inte helt fria – de hålls kvar i metallbiten av de positiva metalljonerna. Och de rör sig hela tiden, inte bara när någon "behöver" dem.',
    },
    alternatives: ['Metaller = givare. De har få elektroner längst ut och blir av med dem. Därför bildar de plusjoner.', 'Leta upp trappan i periodiska systemet (från bor ned mot astat). Nästan allt till vänster om trappan är metaller.'],
    caveats: ['Väte står till vänster i grupp 1 men är en ickemetall.'],
    check: mcq('Vilken egenskap är typisk för metaller?', ['De leder el', 'De är alltid gasformiga', 'De tar upp elektroner och blir negativa'], 0, 'Metaller leder el och värme bra.', { wrong: { 1: 'De flesta metaller är fasta. Kvicksilver är flytande.', 2: 'Metaller avger elektroner och blir positiva.' } }),
    followUp: tf('Järn och koppar är metaller.', true, 'Ja, båda är övergångsmetaller.'),
    apply: mcq('Varför används koppar i elkablar?', ['Den är billig och mjuk', 'Den leder el mycket bra', 'Den är magnetisk'], 1, 'Koppar har elektroner som rör sig fritt och leder ström mycket bra. Den är också lätt att forma till trådar.', { d: 2 }),
    practice: [
      elementQ('Klicka på en alkalimetall i period 4.', 19, 'Kalium (K) är alkalimetallen i period 4.'),
      mcq('Vilken metall är flytande vid rumstemperatur?', ['Bly', 'Kvicksilver', 'Aluminium'], 1, 'Kvicksilver (Hg) smälter redan vid −39 °C.'),
      tf('Väte är en metall eftersom det står i grupp 1.', false, 'Väte är en ickemetall, trots placeringen.', { d: 2 }),
      explain('Förklara varför metaller leder elektrisk ström.', 'I metaller kan valenselektronerna röra sig fritt mellan atomerna. När en spänning kopplas på kan elektronerna flytta sig genom metallen, och det är en elektrisk ström.', [['elektron', 'valenselektron'], ['fritt', 'röra sig', 'flytta'], ['ström', 'leder']], { min: 2, d: 3 }),
    ],
    summary: ['De flesta grundämnen är metaller.', 'Metaller är blanka, formbara och leder el.', 'De avger elektroner och blir positiva joner.', 'Grupp 1 och 2 är mycket reaktiva metaller.'],
    flashcards: [['Var finns metallerna?', 'Till vänster och i mitten av periodiska systemet.'], ['Varför leder metaller ström?', 'Valenselektronerna kan röra sig fritt.'], ['Vilken jon bildar metaller?', 'Positiva joner.']],
    related: ['metall', 'alkalimetall', 'katjon'],
  }),

  lesson({
    id: 'm2-l06',
    title: 'Ickemetaller',
    section: 'Ämnenas familjer',
    minutes: 9,
    goal: 'Idag ska vi förstå vad som kännetecknar ickemetaller.',
    objectives: ['Beskriva typiska egenskaper hos ickemetaller.', 'Hitta ickemetallerna i periodiska systemet.', 'Förklara att ickemetaller tar upp eller delar elektroner.'],
    prerequisites: ['m2-l05'],
    what: [
      '**Ickemetaller** är grundämnen som oftast inte leder ström, inte glänser och ofta är gaser, t.ex. syre, kväve och klor. De står till höger i periodiska systemet (och väte uppe till vänster).',
    ],
    why: [
      'Ickemetaller har många valenselektroner och håller hårt i dem. De har inga fria elektroner att leda ström med.',
    ],
    how: [
      'Ickemetaller tar upp elektroner och bildar **negativa joner** när de möter metaller, eller **delar** elektroner med andra ickemetaller och bildar molekyler.',
    ],
    where: [
      'Livets viktigaste grundämnen är ickemetaller: kol, väte, syre, kväve, fosfor och svavel.',
    ],
    misconceptions: [
      { myth: 'Alla ickemetaller är gaser.', truth: 'Kol och svavel är fasta och brom är flytande.' },
    ],
    simple: [
      'Ickemetaller finns till höger i periodiska systemet, och dessutom väte.',
      'De leder oftast inte el och är ofta gaser, som syre och kväve.',
      'Ickemetaller har många valenselektroner. De tar upp elektroner eller delar dem med andra atomer.',
    ],
    detailed: [
      'Viktiga ickemetaller: väte, kol, kväve, syre, fosfor, svavel och halogenerna (fluor, klor, brom, jod). Livets molekyler byggs främst av C, H, O, N, P och S.',
      'När en ickemetall reagerar med en metall tar ickemetallen upp elektroner och blir en negativ jon, till exempel Cl⁻ i koksalt.',
      'När två ickemetaller reagerar med varandra delar de elektroner och bildar molekyler med kovalenta bindningar, till exempel H₂O och CO₂.',
      'Mellan metaller och ickemetaller finns halvmetaller, till exempel kisel. De är halvledare och används i datorchip och solceller.',
    ],
    visual: { kind: 'periodic', highlight: [1, 6, 7, 8, 9, 15, 16, 17, 34, 35, 53], caption: 'Ickemetaller (utom ädelgaserna) markerade.' },
    analogy: {
      text: 'Om metallerna är givare är ickemetallerna samlare. De har nästan en hel samling (nästan fullt yttersta skal) och tar gärna emot det som fattas – eller delar med en annan samlare så att båda får fullt.',
      limits: 'Atomer samlar inte medvetet. Det är energin i det slutliga ämnet som avgör vad som händer.',
    },
    alternatives: ['Ickemetaller = tar eller delar. Med en metall: tar elektroner → minusjon. Med en annan ickemetall: delar → molekyl.', 'Kolla luften: kväve, syre, argon och koldioxid – alla består av ickemetaller.'],
    caveats: ['Grafit (en form av kol) är en ickemetall som ändå leder el bra.'],
    check: mcq('Vad gör ickemetaller oftast när de reagerar med metaller?', ['Avger elektroner', 'Tar upp elektroner', 'Tar upp protoner'], 1, 'Ickemetallen tar upp elektroner och blir en negativ jon.'),
    followUp: tf('Syre är en ickemetall.', true, 'Ja, syre är en ickemetall.'),
    apply: mcq('Vilken bindning bildas troligast mellan väte och syre i vatten?', ['Jonbindning', 'Kovalent bindning', 'Metallbindning'], 1, 'Både väte och syre är ickemetaller, så de delar elektroner.', { d: 2 }),
    practice: [
      mcq('Vilka grundämnen bygger främst upp livets molekyler?', ['C, H, O, N, P, S', 'Fe, Cu, Zn, Au', 'He, Ne, Ar, Kr'], 0, 'Kol, väte, syre, kväve, fosfor och svavel.'),
      elementQ('Klicka på en halvmetall som används i datorchip.', 14, 'Kisel (Si) är en halvmetall och halvledare.'),
      tf('Alla ickemetaller är gaser.', false, 'Kol och svavel är fasta, brom är flytande.', { d: 2 }),
      match('Para ihop ämnet med typ.', [['Natrium', 'Metall'], ['Klor', 'Ickemetall'], ['Kisel', 'Halvmetall'], ['Argon', 'Ädelgas']], 'Natrium metall, klor ickemetall, kisel halvmetall, argon ädelgas.', { d: 2 }),
    ],
    summary: ['Ickemetaller finns till höger i tabellen (plus väte).', 'De leder oftast inte el.', 'Med metaller: tar upp elektroner → negativa joner.', 'Med varandra: delar elektroner → molekyler.'],
    flashcards: [['Var finns ickemetallerna?', 'Till höger i periodiska systemet, plus väte.'], ['Vad händer när två ickemetaller reagerar?', 'De delar elektroner och bildar molekyler.']],
    related: ['ickemetall', 'halvmetall', 'anjon', 'kovalent-bindning'],
  }),

  lesson({
    id: 'm2-l07',
    title: 'Ädelgaser',
    section: 'Ämnenas familjer',
    minutes: 8,
    goal: 'Idag ska vi förstå varför ädelgaserna nästan aldrig reagerar.',
    objectives: ['Nämna några ädelgaser och var de står.', 'Förklara att ädelgaser har fullt yttersta skal.', 'Ge exempel på hur ädelgaser används.'],
    prerequisites: ['m2-l04', 'm1-l15'],
    what: [
      '**Ädelgaserna** är grundämnena i grupp 18: helium, neon, argon, krypton, xenon och radon.',
    ],
    why: [
      'De har redan fullt yttersta skal. Därför finns det ingen energivinst i att reagera, och de är nästan helt **reaktionströga**.',
    ],
    how: [
      'Ädelgaser finns som enskilda atomer, inte som molekyler. De bildar nästan inga föreningar.',
    ],
    where: [
      'Helium i ballonger (lätt och brinner inte), argon i glödlampor och svetsgas, neon i skyltar. Radon är radioaktivt och kan läcka in i hus från marken.',
    ],
    misconceptions: [
      { myth: 'Ädelgaser kan aldrig reagera.', truth: 'Under extrema förhållanden kan t.ex. xenon bilda föreningar, men i vardagen reagerar de i praktiken inte.' },
    ],
    simple: [
      'Ädelgaserna står längst till höger, i grupp 18.',
      'De har fullt yttersta skal.',
      'Därför reagerar de nästan aldrig med andra ämnen.',
    ],
    detailed: [
      'Ädelgaserna är helium, neon, argon, krypton, xenon och radon (och den supertunga oganesson). Alla är gaser vid rumstemperatur och består av enskilda atomer, inte molekyler.',
      'Helium har 2 elektroner (fullt K-skal). De andra har 8 elektroner i yttersta skalet.',
      'Eftersom de är så reaktionströga används de där man inte vill att något ska reagera: argon som skyddsgas vid svetsning, helium i ballonger (inte brännbart, till skillnad från väte).',
      'Xenon kan faktiskt bilda några föreningar, t.ex. med fluor. "Reagerar aldrig" är alltså en förenkling.',
    ],
    visual: { kind: 'periodic', groups: [18], caption: 'Ädelgaserna i grupp 18.' },
    analogy: {
      text: 'Ädelgaserna är som en person som redan har allt hon behöver. Hon behöver inte låna eller byta något med någon. Därför "umgås" ädelgaserna sällan med andra atomer.',
      limits: 'Under extrema förhållanden kan även ädelgaser reagera – xenon kan bilda föreningar med fluor.',
    },
    alternatives: ['Grupp 18 = full äggkartong. Ingen plats för fler, inget att ge bort.', 'Neon: 2, 8. Argon: 2, 8, 8. Kolla sista siffran: 8 = fullt.'],
    caveats: ['Radon är radioaktivt och kan finnas i hus byggda på viss berggrund. I Sverige mäter man radon i bostäder.'],
    check: mcq('Varför reagerar ädelgaser nästan aldrig?', ['De har fullt yttersta skal', 'De har inga elektroner', 'De är för lätta'], 0, 'Fullt yttersta skal gör ädelgaserna reaktionströga.'),
    followUp: mcq('I vilken grupp finns ädelgaserna?', ['1', '17', '18'], 2, 'Ädelgaserna står i grupp 18.'),
    apply: mcq('Varför fylls ballonger med helium i stället för väte?', ['Helium är lättare än väte', 'Helium brinner inte', 'Helium är billigare'], 1, 'Helium är en ädelgas och reagerar inte – det kan inte brinna. Vätgas är explosiv.', { d: 2 }),
    practice: [
      elementQ('Klicka på argon.', 18, 'Argon står i period 3, grupp 18.'),
      fill('Hur många elektroner har neon i yttersta skalet?', ['8'], 'Neon: 2, 8. Yttersta skalet har 8.', { numeric: true }),
      tf('Ädelgaser består av molekyler med två atomer, som O₂.', false, 'Ädelgaserna består av enskilda atomer.', { d: 2 }),
      mcq('Vilken ädelgas är radioaktiv och kan finnas i bostäder?', ['Neon', 'Radon', 'Helium'], 1, 'Radon bildas när uran i berggrunden sönderfaller.'),
    ],
    summary: ['Ädelgaserna finns i grupp 18.', 'De har fullt yttersta skal.', 'De reagerar nästan aldrig.', 'Används t.ex. i ballonger och som skyddsgas.'],
    flashcards: [['Nämn tre ädelgaser.', 'T.ex. helium, neon, argon.'], ['Varför är ädelgaser reaktionströga?', 'Fullt yttersta skal.']],
    related: ['adelgas', 'adelgasstruktur', 'grupp'],
  }),
]
