import { explain, fill, hotspot, lesson, match, mcq, order, tf } from '../builders'

export const m7a = [
  lesson({
    id: 'm7-l01',
    title: 'Vad är ett hormon?',
    section: 'Kroppens kemiska budbärare',
    minutes: 8,
    goal: 'Idag ska vi förstå vad ett hormon är och varför kroppen behöver hormoner.',
    objectives: ['Förklara vad ett hormon är.', 'Förklara hur hormoner transporteras.', 'Jämföra hormonsystemet med nervsystemet.'],
    prerequisites: ['m6-l01'],
    what: [
      'Ett **hormon** är ett kemiskt budskap. Det tillverkas i en **hormonkörtel**, släpps ut i **blodet** och följer med blodet runt hela kroppen. Där påverkar det celler som "lyssnar" på just det hormonet.',
      'Alla hormonkörtlar tillsammans kallas **hormonsystemet** (endokrina systemet).',
    ],
    why: [
      'Nervsystemet är snabbt men skickar signaler till en exakt plats och verkar kort. Vissa saker behöver i stället styras i **hela kroppen samtidigt** och under **lång tid** – som tillväxt, puberteten, ämnesomsättningen och blodsockret. Då är hormoner perfekta.',
    ],
    how: [
      'Körteln släpper ut hormonet i blodet. Blodet når alla celler, men bara celler med rätt **receptor** påverkas. Sådana celler kallas **målceller**.',
      'När hormonet binder till receptorn ändrar cellen sitt arbete: den kan börja ta upp socker, växa, tillverka något eller arbeta snabbare.',
      'Hormoner verkar ofta i små mängder och under minuter, timmar eller till och med år.',
    ],
    where: [
      'Adrenalin gör att hjärtat bultar när du blir rädd. Insulin styr blodsockret efter en måltid. Tillväxthormon får dig att växa. Melatonin gör dig sömnig på kvällen.',
    ],
    misconceptions: [
      { myth: 'Hormoner har bara med puberteten och känslor att göra.', truth: 'Hormoner styr också blodsocker, tillväxt, sömn, vätskebalans, ämnesomsättning och mycket mer – hela livet.' },
    ],
    simple: [
      'Ett hormon är ett kemiskt budskap som skickas med blodet.',
      'Det tillverkas i hormonkörtlar.',
      'Bara celler med rätt receptor – målceller – påverkas.',
    ],
    detailed: [
      'Ordet hormon kommer från grekiskans "sätta i rörelse".',
      'Vissa hormoner är små proteiner (t.ex. insulin), andra är byggda av fett (t.ex. testosteron och kortisol).',
      'Hormonsystemet och nervsystemet samarbetar. Adrenalin är både ett hormon och en signalsubstans.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'Nervsystemet', points: ['Elektriska och kemiska signaler i nerver', 'Mycket snabbt (millisekunder)', 'Till en exakt plats', 'Kort verkan'], tone: 'lavender' },
        { title: 'Hormonsystemet', points: ['Kemiska budskap i blodet', 'Långsammare (sekunder–timmar)', 'Till hela kroppen – men bara målceller svarar', 'Längre verkan'], tone: 'pink' },
      ],
      caption: 'Kroppens två signalsystem.',
    },
    analogy: {
      text: 'Nervsystemet är som att ringa ett telefonsamtal till en person – snabbt och direkt. Hormonsystemet är som en radiosändning: budskapet går ut överallt, men bara de som har radion inställd på rätt kanal (målcellerna med rätt receptor) hör det.',
      limits: 'En radiosändning går med ljusets hastighet. Hormoner färdas med blodet och tar sekunder till minuter att nå fram.',
    },
    alternatives: ['Hormoner är kroppens "post": brevet skickas med blodet och öppnas bara av den som har rätt brevlåda.'],
    caveats: ['Vissa hormonliknande ämnen verkar bara lokalt, nära där de bildas.'],
    check: mcq('Hur transporteras hormoner i kroppen?', ['Med nerverna', 'Med blodet', 'Med luften'], 1, 'Hormoner släpps ut i blodet.'),
    followUp: tf('Bara celler med rätt receptor påverkas av ett hormon.', true, 'De kallas målceller.'),
    apply: mcq('Varför styrs tillväxten av hormoner och inte av nerver?', ['Tillväxt pågår i hela kroppen under lång tid', 'Tillväxt måste ske på millisekunder', 'Nerver finns inte i skelettet'], 0, 'Hormoner passar för långvarig styrning av hela kroppen.', { d: 2 }),
    practice: [
      match('Nervsystemet eller hormonsystemet?', [['Snabb reaktion på millisekunder', 'Nervsystemet'], ['Budskap med blodet', 'Hormonsystemet'], ['Styr tillväxt under flera år', 'Hormonsystemet']], 'Två signalsystem med olika styrkor.'),
      fill('En cell som har receptorer för ett hormon kallas ____.', ['målcell', 'målceller'], 'Målcellen påverkas av hormonet.'),
      tf('Ett hormon påverkar alla celler i kroppen.', false, 'Bara målceller med rätt receptor.'),
      explain('Förklara skillnaden mellan nervsystemet och hormonsystemet.', 'Nervsystemet skickar snabba signaler via nerver till en exakt plats och verkar kort. Hormonsystemet skickar kemiska budskap med blodet till hela kroppen; det är långsammare men verkar längre, och bara målceller påverkas.', [['snabb'], ['blod'], ['nerv'], ['lång', 'längre']], { min: 3, d: 2 }),
    ],
    summary: ['Hormoner är kemiska budskap i blodet.', 'De bildas i hormonkörtlar.', 'Bara målceller med rätt receptor påverkas.', 'Hormoner är långsammare än nervsignaler men verkar längre.'],
    flashcards: [['Vad är ett hormon?', 'Ett kemiskt budskap som bildas i en körtel och transporteras med blodet.'], ['Vad är en målcell?', 'En cell med receptor för ett visst hormon.']],
    related: ['hormon', 'hormonkortel', 'malcell', 'receptor'],
  }),

  lesson({
    id: 'm7-l02',
    title: 'Hormonkörtlarna',
    section: 'Kroppens kemiska budbärare',
    minutes: 9,
    goal: 'Idag ska vi lära oss var kroppens viktigaste hormonkörtlar finns och vad de gör.',
    objectives: ['Namnge de viktigaste hormonkörtlarna.', 'Koppla varje körtel till ett hormon och en uppgift.'],
    prerequisites: ['m7-l01'],
    what: [
      'Kroppens viktigaste **hormonkörtlar** är: **hypotalamus** och **hypofysen** i hjärnan, **sköldkörteln** på halsen, **binjurarna** ovanpå njurarna, **bukspottkörteln** bakom magsäcken och **könskörtlarna** (äggstockar eller testiklar).',
    ],
    why: [
      'Varje körtel är specialiserad på några få hormoner med bestämda uppgifter. Genom att ha flera körtlar kan kroppen styra många saker oberoende av varandra – blodsocker, stress, tillväxt och fortplantning.',
    ],
    how: [
      '**Hypotalamus och hypofysen**: styr många andra körtlar och bildar bland annat tillväxthormon.',
      '**Sköldkörteln**: bildar tyroxin, som bestämmer hur snabbt ämnesomsättningen går.',
      '**Binjurarna**: bildar stresshormonerna adrenalin och kortisol.',
      '**Bukspottkörteln**: bildar insulin och glukagon, som styr blodsockret.',
      '**Könskörtlarna**: äggstockarna bildar östrogen och progesteron, testiklarna bildar testosteron.',
    ],
    where: [
      'Sköldkörteln behöver jod för att tillverka tyroxin. Därför tillsätts jod i bordssalt i Sverige.',
      'Om sköldkörteln är underaktiv blir man trött, frusen och går upp i vikt. Det är en vanlig sjukdom som behandlas med tabletter.',
    ],
    misconceptions: [
      { myth: 'Bukspottkörteln bildar bara hormoner.', truth: 'Den bildar också matsmältningsenzymer som skickas till tarmen. Bara en liten del av körteln bildar hormoner.' },
    ],
    simple: [
      'Hypotalamus och hypofysen i hjärnan styr många andra körtlar.',
      'Sköldkörteln styr ämnesomsättningen. Binjurarna bildar stresshormoner.',
      'Bukspottkörteln styr blodsockret. Könskörtlarna bildar könshormoner.',
    ],
    detailed: [
      'Hypofysen är bara lika stor som en ärta men kallas ibland för "överkörteln".',
      'Även organ som inte främst är hormonkörtlar bildar hormoner: magsäcken (hungerhormon), fettvävnaden (mättnadshormon) och njurarna (hormon som ökar bildningen av röda blodkroppar).',
      'Tallkottkörteln i hjärnan bildar melatonin, som styr dygnsrytmen.',
    ],
    visual: { kind: 'diagram', id: 'glands', caption: 'Kroppens hormonkörtlar. Klicka på var och en.' },
    visualPrompt: 'Klicka på varje körtel och läs vad den gör.',
    analogy: {
      text: 'Hormonkörtlarna är som olika avdelningar på ett företag som skickar ut e-post. Hypofysen är chefsavdelningen som skickar order till de andra. Sköldkörteln bestämmer arbetstempot, binjurarna larmar vid kris, bukspottkörteln sköter kassan (energin) och könskörtlarna ansvarar för framtiden (fortplantningen).',
      limits: 'Avdelningar på ett företag kan diskutera. Körtlarna reagerar automatiskt på kemiska signaler.',
    },
    alternatives: ['Gå uppifrån och ned: hjärnan (hypotalamus, hypofys) → halsen (sköldkörteln) → magen (bukspottkörteln, binjurarna) → bäckenet (könskörtlarna).'],
    caveats: ['Listan visar de viktigaste körtlarna i kursen – det finns fler.'],
    check: mcq('Vilken körtel bildar insulin?', ['Sköldkörteln', 'Bukspottkörteln', 'Binjurarna'], 1, 'Bukspottkörteln bildar insulin och glukagon.'),
    followUp: tf('Binjurarna bildar adrenalin.', true, 'Binjurarna bildar stresshormoner.'),
    apply: hotspot('Klicka på den körtel som styr ämnesomsättningens hastighet.', { kind: 'diagram', id: 'glands' }, 'skoldkortel', 'Sköldkörteln bildar tyroxin.'),
    practice: [
      match('Para ihop körteln med hormonet.', [['Sköldkörteln', 'Tyroxin'], ['Binjurarna', 'Adrenalin'], ['Bukspottkörteln', 'Insulin'], ['Testiklarna', 'Testosteron']], 'Varje körtel har sina hormoner.'),
      hotspot('Klicka på binjurarna.', { kind: 'diagram', id: 'glands' }, 'binjurar', 'Binjurarna sitter ovanpå njurarna.'),
      tf('Jod behövs för att sköldkörteln ska kunna bilda tyroxin.', true, 'Därför tillsätts jod i salt.', { d: 2 }),
      explain('Förklara varför kroppen har flera olika hormonkörtlar.', 'Varje körtel är specialiserad på vissa hormoner med särskilda uppgifter. Då kan kroppen styra till exempel blodsocker, stress och tillväxt var för sig.', [['special', 'olika'], ['uppgift', 'styra'], ['blodsocker', 'stress', 'tillväxt', 'ämnesomsättning']], { min: 2, d: 2 }),
    ],
    summary: ['Hypotalamus och hypofysen styr andra körtlar.', 'Sköldkörteln: tyroxin (tempo).', 'Binjurarna: adrenalin och kortisol (stress).', 'Bukspottkörteln: insulin och glukagon (blodsocker).', 'Könskörtlarna: könshormoner.'],
    flashcards: [['Vad bildar sköldkörteln?', 'Tyroxin, som styr ämnesomsättningen.'], ['Vad bildar binjurarna?', 'Adrenalin och kortisol.']],
    related: ['hormonkortel', 'hypofys', 'tyroxin', 'insulin'],
  }),

  lesson({
    id: 'm7-l03',
    title: 'Hypotalamus och hypofysen',
    section: 'Styrning och balans',
    minutes: 9,
    goal: 'Idag ska vi förstå hur hjärnan styr hormonsystemet.',
    objectives: ['Förklara hypotalamus roll som länk mellan nerv- och hormonsystem.', 'Förklara hur hypofysen styr andra körtlar.', 'Beskriva en hormonkedja.'],
    prerequisites: ['m7-l02', 'm6-l07'],
    what: [
      '**Hypotalamus** är ett litet område längst ned i hjärnan. Det övervakar bland annat kroppstemperaturen, vätskebalansen och hungern. **Hypofysen** är en ärtstor körtel som hänger under hypotalamus.',
      'Tillsammans är de hormonsystemets **ledning**.',
    ],
    why: [
      'Hjärnan har hela tiden information om hur kroppen mår – från blodet och från nerverna. Hypotalamus översätter den informationen till hormonsignaler. Det gör att kroppens två signalsystem kan samarbeta.',
    ],
    how: [
      'Det fungerar ofta som en kedja i tre steg: 1) **hypotalamus** skickar ett frisättande hormon till 2) **hypofysen**, som skickar ett styrhormon med blodet till 3) en **annan körtel** (t.ex. sköldkörteln eller binjurarna), som släpper ut sitt hormon.',
      'Exempel: hypotalamus → hypofysen → sköldkörteln → tyroxin. När tyroxinet räcker känner hypotalamus och hypofysen av det och minskar sina signaler.',
      'Hypofysen bildar också egna hormoner som verkar direkt, till exempel **tillväxthormon**.',
    ],
    where: [
      'Vid feber ställer hypotalamus om kroppens "termostat" till en högre temperatur. Därför fryser man när febern stiger.',
      'Puberteten startar när hypotalamus börjar skicka signaler som via hypofysen väcker könskörtlarna.',
    ],
    misconceptions: [
      { myth: 'Hypofysen är en del av storhjärnan där vi tänker.', truth: 'Hypofysen är en körtel som hänger under hjärnan. Den sköts automatiskt, inte med medvetna tankar.' },
    ],
    simple: [
      'Hypotalamus i hjärnan känner av hur kroppen mår.',
      'Den styr hypofysen, som i sin tur styr andra körtlar.',
      'Hypotalamus är länken mellan nervsystemet och hormonsystemet.',
    ],
    detailed: [
      'Hypofysens baklob släpper ut hormoner som egentligen bildats i hypotalamus, till exempel ADH som får njurarna att spara vatten.',
      'För mycket tillväxthormon under barndomen kan ge mycket lång växt; för lite kan ge kort växt. Båda kan behandlas.',
      'Hypotalamus påverkar också sömn, sexlust och känslor tillsammans med andra delar av hjärnan.',
    ],
    visual: {
      kind: 'flow',
      layout: 'line',
      nodes: [
        { label: 'Hypotalamus', detail: 'Känner av kroppens läge och skickar en signal.', icon: '🧠' },
        { label: 'Hypofysen', detail: 'Skickar ett styrhormon med blodet.', icon: '🫘' },
        { label: 'Körtel', detail: 'T.ex. sköldkörteln släpper ut sitt hormon.', icon: '🦋' },
        { label: 'Målceller', detail: 'Ändrar sitt arbete.', icon: '🎯' },
        { label: 'Återkoppling', detail: 'Hypotalamus känner av resultatet och anpassar signalen.', icon: '🔁' },
      ],
      caption: 'En hormonkedja.',
    },
    analogy: {
      text: 'Hypotalamus är som en vd som hela tiden läser rapporter om hur företaget går. Hypofysen är platschefen som tar emot vd:ns order och skickar instruktioner till varje avdelning (de andra körtlarna). Avdelningarna rapporterar sedan tillbaka, så vd:n vet om det behövs mer eller mindre.',
      limits: 'En vd tänker och väljer. Hypotalamus reagerar automatiskt på nivåer av ämnen i blodet och nervsignaler.',
    },
    alternatives: ['Hypotalamus = termostaten. Hypofysen = fjärrkontrollen. De andra körtlarna = elementen.'],
    caveats: ['Inte alla körtlar styrs via hypofysen. Bukspottkörteln reagerar till exempel direkt på blodsockret.'],
    check: mcq('Vilken struktur är länken mellan nervsystemet och hormonsystemet?', ['Hypotalamus', 'Bukspottkörteln', 'Lillhjärnan'], 0, 'Hypotalamus i hjärnan styr hypofysen.'),
    followUp: tf('Hypofysen styr flera andra hormonkörtlar.', true, 'Den kallas ibland överkörteln.'),
    apply: order('Sätt hormonkedjan i ordning.', ['Hypotalamus', 'Hypofysen', 'Sköldkörteln', 'Tyroxin når målcellerna'], 'Hjärnan → hypofysen → körteln → målcellerna.', { d: 2 }),
    practice: [
      hotspot('Klicka på hypofysen.', { kind: 'diagram', id: 'glands' }, 'hypofys', 'Hypofysen hänger under hjärnan.'),
      tf('Bukspottkörteln styrs alltid av hypofysen.', false, 'Bukspottkörteln reagerar direkt på blodsockret.', { d: 2 }),
      mcq('Vilket hormon bildas i hypofysen och får oss att växa?', ['Tillväxthormon', 'Insulin', 'Adrenalin'], 0, 'Tillväxthormon.'),
      explain('Förklara varför man fryser när febern stiger.', 'Hypotalamus ställer om kroppens termostat till en högre temperatur. Kroppen känns då för kall jämfört med det nya målet, så man fryser och huttrar för att bilda värme.', [['hypotalamus'], ['termostat', 'börvärde', 'högre temperatur'], ['huttra', 'frys', 'värme']], { min: 2, d: 3 }),
    ],
    summary: ['Hypotalamus känner av hur kroppen mår.', 'Den styr hypofysen.', 'Hypofysen styr andra körtlar.', 'Hypotalamus länkar nerv- och hormonsystemet.'],
    flashcards: [['Vad gör hypotalamus?', 'Känner av kroppens tillstånd och styr hypofysen.'], ['Vad gör hypofysen?', 'Styr andra hormonkörtlar och bildar t.ex. tillväxthormon.']],
    related: ['hypotalamus', 'hypofys', 'hormonkortel'],
  }),

  lesson({
    id: 'm7-l04',
    title: 'Homeostas och negativ återkoppling',
    section: 'Styrning och balans',
    minutes: 9,
    goal: 'Idag ska vi förstå hur kroppen håller sig i balans.',
    objectives: ['Förklara vad homeostas är.', 'Förklara negativ återkoppling med ett exempel.', 'Ge exempel på värden som kroppen håller stabila.'],
    prerequisites: ['m7-l03'],
    curriculum: ['reglering', 'hormon'],
    what: [
      '**Homeostas** är kroppens förmåga att hålla sin inre miljö **stabil**, även när det ändras utanför. Kroppstemperaturen, blodsockret, vätskebalansen och pH i blodet hålls inom snäva gränser.',
      'Det vanligaste sättet att göra det kallas **negativ återkoppling**.',
    ],
    why: [
      'Cellernas enzymer och andra proteiner fungerar bara inom små intervall av temperatur, pH och koncentration. Om värdena svänger för mycket slutar cellerna fungera. Homeostas skyddar cellerna.',
    ],
    how: [
      'Negativ återkoppling har fyra delar: 1) ett **normalvärde** (börvärde), 2) **sensorer** som mäter, 3) ett **styrcentrum** som jämför och 4) **effektorer** (muskler eller körtlar) som rättar till.',
      'När värdet ökar sätter kroppen igång något som **minskar** det – och tvärtom. Reaktionen är "negativ" eftersom den **motverkar** förändringen.',
      'Exempel: blodsockret stiger → bukspottkörteln känner av det → insulin släpps ut → blodsockret sjunker → insulinet minskar.',
    ],
    where: [
      'En termostat hemma fungerar likadant: blir det för kallt startar elementet, blir det för varmt stängs det av.',
      'När du är törstig har hypotalamus känt av att blodet är för koncentrerat. Du dricker, och balansen återställs.',
    ],
    misconceptions: [
      { myth: '"Negativ" återkoppling betyder att något är dåligt.', truth: '"Negativ" betyder bara att reaktionen motverkar förändringen. Det är kroppens viktigaste sätt att hålla balansen.' },
      { myth: 'Kroppens värden är exakt desamma hela tiden.', truth: 'De svänger lite kring normalvärdet hela tiden, men hålls inom ett säkert intervall.' },
    ],
    simple: [
      'Homeostas = kroppen håller allt i jämn balans.',
      'Negativ återkoppling: en förändring motverkas.',
      'Sensor → styrcentrum → effektor → värdet återställs.',
    ],
    detailed: [
      'Det finns också positiv återkoppling, där en förändring förstärks. Ett exempel är förlossningen: värkarna gör att mer av hormonet oxytocin frisätts, som ger starkare värkar. Det är ovanligt och slutar när målet nås.',
      'Blodets pH hålls mellan ca 7,35 och 7,45. Redan små avvikelser kan vara farliga.',
      'Många sjukdomar, som diabetes, innebär att en återkoppling inte fungerar.',
    ],
    visual: {
      kind: 'flow',
      layout: 'cycle',
      nodes: [
        { label: 'Värdet ändras', detail: 'T.ex. blodsockret stiger efter mat.', icon: '📈' },
        { label: 'Sensor', detail: 'Celler känner av förändringen.', icon: '📡' },
        { label: 'Styrcentrum', detail: 'Jämför med normalvärdet.', icon: '🧠' },
        { label: 'Effektor', detail: 'Körtel eller muskel motverkar förändringen.', icon: '⚙️' },
        { label: 'Normalvärde', detail: 'Värdet återgår – signalen minskar.', icon: '⚖️' },
      ],
      caption: 'Negativ återkoppling.',
    },
    analogy: {
      text: 'Negativ återkoppling är som att cykla rakt. Lutar du lite åt vänster styr du lite åt höger. Lutar du åt höger styr du åt vänster. Du kommer aldrig att vara exakt rak hela tiden, men du håller dig på vägen.',
      limits: 'När du cyklar tänker du ibland medvetet. Kroppens återkoppling sker automatiskt.',
    },
    alternatives: ['Termostaten hemma: för kallt → värme på, för varmt → värme av.'],
    caveats: ['Kroppens normalvärden kan ändras, till exempel vid feber eller under natten.'],
    check: mcq('Vad är homeostas?', ['Att kroppen håller sin inre miljö stabil', 'En sjukdom i hormonsystemet', 'Att kroppen växer'], 0, 'Homeostas är balans i den inre miljön.'),
    followUp: tf('Vid negativ återkoppling motverkas en förändring.', true, 'Därav namnet negativ.'),
    apply: mcq('Blodsockret sjunker under ett långt träningspass. Vad gör kroppen enligt negativ återkoppling?', ['Släpper ut mer insulin', 'Släpper ut glukagon som höjer blodsockret', 'Ingenting'], 1, 'Ett sjunkande värde motverkas – glukagon höjer blodsockret.', { d: 2 }),
    practice: [
      order('Sätt stegen i ordning.', ['Värdet ändras', 'Sensorer känner av', 'Styrcentrum jämför', 'Effektorer motverkar', 'Värdet återgår'], 'Den negativa återkopplingens slinga.'),
      match('Para ihop.', [['Sensor', 'Mäter värdet'], ['Styrcentrum', 'Jämför med normalvärdet'], ['Effektor', 'Rättar till']], 'Tre roller i regleringen.'),
      tf('Kroppens blodsocker är exakt lika högt hela dygnet.', false, 'Det svänger, men hålls inom ett säkert intervall.'),
      explain('Förklara varför homeostas är viktigt för cellerna.', 'Cellernas enzymer och proteiner fungerar bara inom små intervall av temperatur, pH och koncentration. Om värdena ändras för mycket slutar cellerna fungera. Homeostas håller värdena stabila.', [['enzym', 'protein'], ['temperatur', 'ph', 'koncentration'], ['stabil', 'jämn', 'balans']], { min: 2, d: 3 }),
    ],
    summary: ['Homeostas håller den inre miljön stabil.', 'Negativ återkoppling motverkar förändringar.', 'Sensor → styrcentrum → effektor.', 'Det skyddar cellerna.'],
    flashcards: [['Vad är homeostas?', 'Kroppens förmåga att hålla den inre miljön stabil.'], ['Vad är negativ återkoppling?', 'När en förändring sätter igång en reaktion som motverkar den.']],
    related: ['homeostas', 'negativ-aterkoppling'],
  }),

  lesson({
    id: 'm7-l05',
    title: 'Kroppstemperaturen',
    section: 'Styrning och balans',
    minutes: 8,
    goal: 'Idag ska vi förstå hur kroppen håller temperaturen runt 37 °C.',
    objectives: ['Förklara varför kroppstemperaturen måste vara stabil.', 'Beskriva hur kroppen gör sig av med värme.', 'Beskriva hur kroppen sparar och bildar värme.'],
    prerequisites: ['m7-l04', 'm5-l11'],
    curriculum: ['reglering'],
    what: [
      'Människans kroppstemperatur hålls runt **37 °C**, oavsett om det är minusgrader eller värmebölja ute. Det är ett tydligt exempel på homeostas.',
      'Hypotalamus fungerar som kroppens **termostat**.',
    ],
    why: [
      'Kroppens enzymer fungerar bäst runt 37 °C. Blir det för kallt går reaktionerna för långsamt. Blir det för varmt – över ungefär 41–42 °C – börjar proteinerna förlora sin form.',
      'Värmen kommer från cellandningen. Kroppen bildar alltså hela tiden värme, men måste kunna justera hur mycket som stannar kvar.',
    ],
    how: [
      '**För varmt:** blodkärlen i huden **vidgas**, så mer varmt blod kommer nära ytan och värme avges (man blir röd). Man **svettas** – när svetten avdunstar tar den med sig värme.',
      '**För kallt:** blodkärlen i huden **dras ihop**, så mindre värme förloras (man blir blek). Man **huttrar** – musklerna arbetar och bildar värme. Man får "gåshud", en rest från när våra förfäder hade päls.',
      'Vi justerar också med beteenden: tar på kläder, söker skugga eller dricker något kallt.',
    ],
    where: [
      'När du springer blir du röd i ansiktet och svettas. När du väntar på bussen en kall dag blir händerna bleka och du huttrar.',
      'Vid **värmeslag** klarar kroppen inte längre att kyla sig. Vid **nedkylning** (hypotermi) sjunker temperaturen så mycket att kroppen slutar fungera. Båda är farliga.',
    ],
    misconceptions: [
      { myth: 'Svetten i sig kyler kroppen.', truth: 'Det är avdunstningen av svetten som kyler. I mycket fuktig luft avdunstar den sämre, och då kyler den sämre.' },
    ],
    simple: [
      'Kroppen håller sig runt 37 °C.',
      'För varmt: svettas och vidga blodkärlen i huden.',
      'För kallt: huttra och dra ihop blodkärlen i huden.',
    ],
    detailed: [
      'Små barn och äldre har svårare att reglera temperaturen och är därför känsligare för värme och kyla.',
      'Fåglar och däggdjur håller en jämn temperatur (de är jämnvarma). Fiskar, groddjur och reptiler följer omgivningens temperatur (växelvarma).',
      'Temperaturen svänger naturligt under dygnet, ofta lägst tidigt på morgonen.',
    ],
    visual: {
      kind: 'compare',
      columns: [
        { title: 'För varmt 🥵', points: ['Blodkärlen i huden vidgas', 'Svettning – avdunstning kyler', 'Man blir röd', 'Man söker skugga, dricker'], tone: 'pink' },
        { title: 'För kallt 🥶', points: ['Blodkärlen i huden dras ihop', 'Huttring – musklerna bildar värme', 'Man blir blek, får gåshud', 'Man tar på mer kläder'], tone: 'blue' },
      ],
      caption: 'Kroppens temperaturreglering.',
    },
    analogy: {
      text: 'Kroppen är som ett hus med en smart termostat (hypotalamus). Blir det för varmt öppnar den fönstren (vidgar blodkärlen) och sätter på sprinklers på taket (svett). Blir det för kallt stänger den fönstren och sätter igång en extra kamin (huttring).',
      limits: 'Ett hus har inga levande celler. I kroppen är det cellandningen som hela tiden bildar värme, som en kamin som aldrig stängs av helt.',
    },
    alternatives: ['Rött och svettigt = kroppen gör sig av med värme. Blekt och huttrande = kroppen sparar och bildar värme.'],
    caveats: ['Normal kroppstemperatur varierar något mellan personer och mätmetoder, ungefär 36–37,5 °C.'],
    check: mcq('Vad gör kroppen när den är för varm?', ['Huttrar', 'Svettas', 'Drar ihop blodkärlen i huden'], 1, 'Svetten avdunstar och tar med sig värme.'),
    followUp: tf('Huttring bildar värme.', true, 'Muskelarbetet bildar värme.'),
    apply: mcq('Varför blir man blek när man fryser?', ['Blodkärlen i huden drar ihop sig så mindre värme förloras', 'Blodet fryser', 'Huden tappar färg av kyla'], 0, 'Mindre blod nära ytan = mindre värmeförlust.', { d: 2 }),
    practice: [
      match('För varmt eller för kallt?', [['Svettning', 'För varmt'], ['Huttring', 'För kallt'], ['Gåshud', 'För kallt'], ['Röd hud', 'För varmt']], 'Kroppen motverkar förändringen.'),
      tf('Det är avdunstningen av svetten som kyler.', true, 'Avdunstning tar energi.'),
      fill('Kroppens termostat finns i ____.', ['hypotalamus'], 'Hypotalamus i hjärnan.'),
      explain('Förklara varför för hög kroppstemperatur är farlig.', 'Vid för hög temperatur förlorar enzymer och andra proteiner sin form, så att de slutar fungera. Då kan cellerna inte utföra sina reaktioner.', [['enzym', 'protein'], ['form', 'denatur'], ['fungera', 'reaktion']], { min: 2, d: 2 }),
    ],
    summary: ['Kroppen håller sig runt 37 °C.', 'Hypotalamus är termostaten.', 'Varmt: svett och vidgade blodkärl.', 'Kallt: huttring och sammandragna blodkärl.'],
    flashcards: [['Hur kyler svett kroppen?', 'Genom att den avdunstar och tar med sig värme.'], ['Varför huttrar man?', 'Muskelarbetet bildar värme.']],
    related: ['homeostas', 'hypotalamus', 'negativ-aterkoppling'],
  }),
]
