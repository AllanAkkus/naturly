/**
 * Alla 118 grundämnen.
 * Atommassor: IUPAC:s standardatomvikter (förkortade). För ämnen utan stabila isotoper
 * anges masstalet för den mest långlivade kända isotopen och `massIsEstimate = true`.
 * Isotoper: [masstal, kommentar]. Den första är den vanligaste/viktigaste.
 */

export type ElementCategory =
  | 'alkalimetall'
  | 'alkalisk jordartsmetall'
  | 'övergångsmetall'
  | 'övrig metall'
  | 'halvmetall'
  | 'ickemetall'
  | 'halogen'
  | 'ädelgas'
  | 'lantanid'
  | 'aktinid'
  | 'okända egenskaper'

export interface Isotope {
  massNumber: number
  note: string
}

export interface ElementData {
  z: number
  symbol: string
  name: string
  mass: number
  massIsEstimate: boolean
  category: ElementCategory
  ions: number[]
  isotopes: Isotope[]
  description: string
  uses: string
  safety: string
  radioactive: boolean
}

type Row = [
  number, string, string, number, ElementCategory, number[], Array<[number, string]>, string, string, string,
]


const rows: Row[] = [
  [1, 'H', 'Väte', 1.008, 'ickemetall', [1, -1], [[1, 'stabil, ca 99,98 %'], [2, 'deuterium, stabil, ca 0,02 %'], [3, 'tritium, radioaktiv']], 'Det lättaste och vanligaste grundämnet i universum. Stjärnor som solen består mest av väte.', 'Vatten (H₂O), ammoniaktillverkning, bränsleceller, raketbränsle.', 'Vätgas är extremt brandfarlig och kan bilda explosiv knallgas med luft.'],
  [2, 'He', 'Helium', 4.0026, 'ädelgas', [], [[4, 'stabil, nästan allt helium'], [3, 'stabil, mycket ovanlig']], 'En ädelgas som nästan aldrig reagerar. Lättare än luft.', 'Ballonger, kylning av magneter i MR-kameror, dykgas.', 'Ogiftigt, men att andas in helium ger syrebrist och är farligt.'],
  [3, 'Li', 'Litium', 6.94, 'alkalimetall', [1], [[7, 'stabil, ca 92 %'], [6, 'stabil, ca 8 %']], 'Den lättaste metallen. Så mjuk att den kan skäras med kniv.', 'Batterier i mobiler och elbilar, läkemedel vid bipolär sjukdom.', 'Reagerar med vatten och bildar brandfarlig vätgas. Litiumbatterier kan börja brinna om de skadas.'],
  [4, 'Be', 'Beryllium', 9.0122, 'alkalisk jordartsmetall', [2], [[9, 'stabil, det enda naturliga']], 'En lätt men stark metall. Har bara en stabil isotop: beryllium-9.', 'Lätta legeringar i flyg- och rymdteknik, fönster i röntgenutrustning.', 'Damm av beryllium är giftigt att andas in.'],
  [5, 'B', 'Bor', 10.81, 'halvmetall', [], [[11, 'stabil, ca 80 %'], [10, 'stabil, ca 20 %']], 'En halvmetall som oftast bildar kovalenta bindningar i stället för joner.', 'Borosilikatglas (värmetåligt glas), tvättmedel, gödsel.', 'Vissa borföreningar är giftiga i stora mängder.'],
  [6, 'C', 'Kol', 12.011, 'ickemetall', [], [[12, 'stabil, ca 98,9 %'], [13, 'stabil, ca 1,1 %'], [14, 'radioaktiv, används för åldersbestämning']], 'Grunden för allt liv. Kolatomer kan binda till varandra i långa kedjor och ringar.', 'Alla organiska ämnen, bränslen, plaster, diamant och grafit.', 'Rent kol är ofarligt, men kolmonoxid (CO) från ofullständig förbränning är mycket giftigt.'],
  [7, 'N', 'Kväve', 14.007, 'ickemetall', [-3], [[14, 'stabil, ca 99,6 %'], [15, 'stabil, ca 0,4 %']], 'En gas som utgör ungefär 78 % av luften. Finns i alla proteiner och i DNA.', 'Konstgödsel, livsmedelsförpackningar, flytande kväve för kylning.', 'Flytande kväve ger svåra köldskador. Kvävgas kan tränga undan syre i slutna rum.'],
  [8, 'O', 'Syre', 15.999, 'ickemetall', [-2], [[16, 'stabil, ca 99,76 %'], [18, 'stabil, ca 0,2 %'], [17, 'stabil, mycket ovanlig']], 'Gasen vi andas. Behövs för cellandningen och för förbränning.', 'Sjukvård, svetsning, stålframställning, vattenrening.', 'Ren syrgas gör att saker brinner mycket kraftigare.'],
  [9, 'F', 'Fluor', 18.998, 'halogen', [-1], [[19, 'stabil, det enda naturliga']], 'Det mest reaktiva icke-metalliska grundämnet. Tar lätt upp en elektron och blir F⁻.', 'Fluorid i tandkräm, teflon, vissa läkemedel.', 'Fluorgas är extremt giftig och frätande.'],
  [10, 'Ne', 'Neon', 20.18, 'ädelgas', [], [[20, 'stabil, ca 90 %'], [22, 'stabil, ca 9 %'], [21, 'stabil, ovanlig']], 'En ädelgas som lyser rödorange när el leds genom den.', 'Neonskyltar, lasrar.', 'Ogiftigt men kan tränga undan syre i slutna utrymmen.'],
  [11, 'Na', 'Natrium', 22.99, 'alkalimetall', [1], [[23, 'stabil, det enda naturliga']], 'En mjuk, mycket reaktiv metall. Bildar Na⁺ och finns i koksalt (NaCl).', 'Koksalt, gatlampor, kroppens nervsignaler (som Na⁺-joner).', 'Ren natrium reagerar häftigt med vatten. Får aldrig hanteras hemma.'],
  [12, 'Mg', 'Magnesium', 24.305, 'alkalisk jordartsmetall', [2], [[24, 'stabil, ca 79 %'], [26, 'stabil, ca 11 %'], [25, 'stabil, ca 10 %']], 'En lätt metall som brinner med starkt vitt ljus. Finns i klorofyll.', 'Lätta legeringar, fyrverkerier, kosttillskott.', 'Magnesiumbränder går inte att släcka med vatten.'],
  [13, 'Al', 'Aluminium', 26.982, 'övrig metall', [3], [[27, 'stabil, det enda naturliga']], 'Den vanligaste metallen i jordskorpan. Lätt och rostar inte som järn.', 'Burkar, folie, flygplan, fönsterkarmar.', 'Ofarligt i vardagen. Aluminiumpulver kan vara brandfarligt.'],
  [14, 'Si', 'Kisel', 28.085, 'halvmetall', [], [[28, 'stabil, ca 92 %'], [29, 'stabil, ca 5 %'], [30, 'stabil, ca 3 %']], 'Den näst vanligaste atomen i jordskorpan. Sand består mest av kiseldioxid.', 'Datorchip, solceller, glas, betong.', 'Fint kiseldioxiddamm (kvarts) kan skada lungorna.'],
  [15, 'P', 'Fosfor', 30.974, 'ickemetall', [-3], [[31, 'stabil, det enda naturliga']], 'Finns i DNA, i ATP (cellens energimolekyl) och i skelettet.', 'Gödsel, tändstickor, livsmedelstillsatser.', 'Vit fosfor är mycket giftig och självantänder i luft.'],
  [16, 'S', 'Svavel', 32.06, 'ickemetall', [-2], [[32, 'stabil, ca 95 %'], [34, 'stabil, ca 4 %'], [33, 'stabil, ovanlig']], 'Ett gult ämne. Har 6 valenselektroner och bildar ofta S²⁻.', 'Svavelsyra, gummi, gödsel, krut.', 'Svaveldioxid vid förbränning är giftig och ger surt regn.'],
  [17, 'Cl', 'Klor', 35.45, 'halogen', [-1], [[35, 'stabil, ca 76 %'], [37, 'stabil, ca 24 %']], 'En grön, giftig gas. Som kloridjon (Cl⁻) finns den i koksalt.', 'Desinfektion av vatten och pooler, PVC-plast.', 'Klorgas är mycket giftig. Blanda aldrig klorin med syror eller ammoniak.'],
  [18, 'Ar', 'Argon', 39.95, 'ädelgas', [], [[40, 'stabil, ca 99,6 %'], [36, 'stabil, ovanlig'], [38, 'stabil, ovanlig']], 'En ädelgas som utgör nästan 1 % av luften.', 'Skyddsgas vid svetsning, fyllning i glödlampor och fönster.', 'Kan tränga undan syre i slutna utrymmen.'],
  [19, 'K', 'Kalium', 39.098, 'alkalimetall', [1], [[39, 'stabil, ca 93 %'], [41, 'stabil, ca 7 %'], [40, 'radioaktiv, mycket liten andel']], 'En mycket reaktiv metall. Som K⁺ är den viktig för nerver och hjärta.', 'Gödsel, kroppens nervsignaler, bananer innehåller mycket kalium.', 'Ren kalium reagerar våldsamt med vatten.'],
  [20, 'Ca', 'Kalcium', 40.078, 'alkalisk jordartsmetall', [2], [[40, 'stabil, ca 97 %'], [44, 'stabil, ca 2 %']], 'Bygger upp skelett och tänder. Bildar Ca²⁺.', 'Cement, kalk, mjölkprodukter, muskler och nerver.', 'Ren metall reagerar med vatten. Kalciumföreningar i mat är ofarliga.'],
  [21, 'Sc', 'Skandium', 44.956, 'övergångsmetall', [3], [[45, 'stabil, det enda naturliga']], 'En lätt, sällsynt övergångsmetall.', 'Legeringar i cykelramar och sportutrustning.', 'Låg risk i vardagen.'],
  [22, 'Ti', 'Titan', 47.867, 'övergångsmetall', [4], [[48, 'stabil, ca 74 %'], [46, 'stabil, ca 8 %']], 'En stark, lätt och korrosionstålig metall.', 'Implantat, flygplan, vit färg (titandioxid).', 'Metallen är ofarlig. Fint pulver kan brinna.'],
  [23, 'V', 'Vanadin', 50.942, 'övergångsmetall', [3, 5], [[51, 'stabil, ca 99,75 %']], 'En hård övergångsmetall som gör stål starkare.', 'Verktygsstål, batterier för energilagring.', 'Vissa vanadinföreningar är giftiga.'],
  [24, 'Cr', 'Krom', 51.996, 'övergångsmetall', [3, 6], [[52, 'stabil, ca 84 %'], [53, 'stabil, ca 10 %']], 'En blank metall som gör rostfritt stål rostfritt.', 'Rostfritt stål, förkromning.', 'Sexvärt krom (Cr⁶⁺) är cancerframkallande.'],
  [25, 'Mn', 'Mangan', 54.938, 'övergångsmetall', [2, 4, 7], [[55, 'stabil, det enda naturliga']], 'En hård metall som behövs i små mängder av kroppen.', 'Stål, batterier.', 'Inandning av manganstoft kan skada nervsystemet.'],
  [26, 'Fe', 'Järn', 55.845, 'övergångsmetall', [2, 3], [[56, 'stabil, ca 92 %'], [54, 'stabil, ca 6 %'], [57, 'stabil, ca 2 %']], 'Den viktigaste bruksmetallen. Finns i hemoglobinet som transporterar syre i blodet.', 'Stål, verktyg, byggnader, blodets hemoglobin.', 'Järntabletter kan vara giftiga för barn i stora doser.'],
  [27, 'Co', 'Kobolt', 58.933, 'övergångsmetall', [2, 3], [[59, 'stabil, det enda naturliga'], [60, 'radioaktiv, används inom strålbehandling']], 'En magnetisk metall. Finns i vitamin B12.', 'Batterier, magneter, blå färg, vitamin B12.', 'Koboltdamm är skadligt. Kobolt-60 är radioaktivt.'],
  [28, 'Ni', 'Nickel', 58.693, 'övergångsmetall', [2], [[58, 'stabil, ca 68 %'], [60, 'stabil, ca 26 %']], 'En silvrig metall som ofta används i legeringar.', 'Rostfritt stål, mynt, batterier.', 'Vanlig orsak till kontaktallergi (t.ex. smycken).'],
  [29, 'Cu', 'Koppar', 63.546, 'övergångsmetall', [1, 2], [[63, 'stabil, ca 69 %'], [65, 'stabil, ca 31 %']], 'En rödaktig metall som leder el och värme mycket bra.', 'Elkablar, vattenrör, mynt, mässing och brons.', 'Kopparjoner är giftiga för vattenlevande djur.'],
  [30, 'Zn', 'Zink', 65.38, 'övergångsmetall', [2], [[64, 'stabil, ca 49 %'], [66, 'stabil, ca 28 %'], [68, 'stabil, ca 19 %']], 'En metall som skyddar järn mot rost (galvanisering).', 'Galvanisering, batterier, solkräm, viktigt spårämne i kroppen.', 'Zinkrök vid svetsning kan ge feber.'],
  [31, 'Ga', 'Gallium', 69.723, 'övrig metall', [3], [[69, 'stabil, ca 60 %'], [71, 'stabil, ca 40 %']], 'En metall som smälter redan vid ca 30 °C.', 'Lysdioder (LED), elektronik.', 'Låg giftighet, men kan skada aluminium.'],
  [32, 'Ge', 'Germanium', 72.63, 'halvmetall', [], [[74, 'stabil, ca 37 %'], [72, 'stabil, ca 27 %']], 'En halvmetall som leder ström sämre än metaller men bättre än isolatorer (halvledare).', 'Fiberoptik, elektronik, infraröd optik.', 'Låg risk i vardagen.'],
  [33, 'As', 'Arsenik', 74.922, 'halvmetall', [-3], [[75, 'stabil, det enda naturliga']], 'En halvmetall som är känd för att vara giftig.', 'Halvledare, tidigare träskyddsmedel.', 'Mycket giftigt. Kan förekomma i förorenat grundvatten.'],
  [34, 'Se', 'Selen', 78.971, 'ickemetall', [-2], [[80, 'stabil, ca 50 %'], [78, 'stabil, ca 24 %']], 'En ickemetall som kroppen behöver i mycket små mängder.', 'Solceller, glas, kosttillskott.', 'Giftigt i större mängder.'],
  [35, 'Br', 'Brom', 79.904, 'halogen', [-1], [[79, 'stabil, ca 51 %'], [81, 'stabil, ca 49 %']], 'En av två grundämnen som är flytande vid rumstemperatur (det andra är kvicksilver).', 'Flamskyddsmedel (vissa är miljögifter), läkemedel.', 'Bromånga är giftig och frätande.'],
  [36, 'Kr', 'Krypton', 83.798, 'ädelgas', [], [[84, 'stabil, ca 57 %'], [86, 'stabil, ca 17 %']], 'En sällsynt ädelgas.', 'Specialbelysning, isolerglas.', 'Kan tränga undan syre.'],
  [37, 'Rb', 'Rubidium', 85.468, 'alkalimetall', [1], [[85, 'stabil, ca 72 %'], [87, 'svagt radioaktiv, ca 28 %']], 'En mycket reaktiv alkalimetall.', 'Atomur, forskning.', 'Reagerar explosivt med vatten.'],
  [38, 'Sr', 'Strontium', 87.62, 'alkalisk jordartsmetall', [2], [[88, 'stabil, ca 83 %'], [86, 'stabil, ca 10 %'], [90, 'radioaktiv, från kärnkraft och kärnvapen']], 'En alkalisk jordartsmetall i grupp 2 som bildar Sr²⁺.', 'Röda fyrverkerier, tidigare TV-skärmar.', 'Strontium-90 är radioaktivt och kan lagras i skelettet.'],
  [39, 'Y', 'Yttrium', 88.906, 'övergångsmetall', [3], [[89, 'stabil, det enda naturliga']], 'Uppkallad efter Ytterby gruva utanför Stockholm.', 'Lysdioder, lasrar, supraledare.', 'Låg risk i vardagen.'],
  [40, 'Zr', 'Zirkonium', 91.224, 'övergångsmetall', [4], [[90, 'stabil, ca 51 %'], [94, 'stabil, ca 17 %']], 'En korrosionstålig metall.', 'Kärnbränslerör, keramiska kniver, tandimplantat.', 'Pulver är brandfarligt.'],
  [41, 'Nb', 'Niob', 92.906, 'övergångsmetall', [5], [[93, 'stabil, det enda naturliga']], 'En mjuk, grå metall.', 'Supraledande magneter, stållegeringar.', 'Låg risk i vardagen.'],
  [42, 'Mo', 'Molybden', 95.95, 'övergångsmetall', [6], [[98, 'stabil, ca 24 %'], [96, 'stabil, ca 17 %']], 'En metall med mycket hög smältpunkt. Viktig för enzymer i växter.', 'Höghållfast stål, smörjmedel.', 'Låg risk i vardagen.'],
  [43, 'Tc', 'Teknetium', 98, 'övergångsmetall', [], [[98, 'radioaktiv, mycket långlivad'], [99, 'radioaktiv, Tc-99m används inom sjukvården']], 'Det lättaste grundämnet som saknar stabila isotoper.', 'Medicinsk bilddiagnostik (Tc-99m).', 'Radioaktivt.'],
  [44, 'Ru', 'Rutenium', 101.07, 'övergångsmetall', [], [[102, 'stabil, ca 32 %'], [104, 'stabil, ca 19 %']], 'En sällsynt metall i platinagruppen.', 'Elektronik, katalysatorer.', 'Rutheniumtetroxid är giftig.'],
  [45, 'Rh', 'Rodium', 102.91, 'övergångsmetall', [], [[103, 'stabil, det enda naturliga']], 'En av de dyraste metallerna.', 'Katalysatorer i bilar.', 'Låg risk i vardagen.'],
  [46, 'Pd', 'Palladium', 106.42, 'övergångsmetall', [2], [[106, 'stabil, ca 27 %'], [108, 'stabil, ca 26 %']], 'En silvervit metall som kan suga upp väte.', 'Bilkatalysatorer, elektronik, smycken.', 'Låg risk i vardagen.'],
  [47, 'Ag', 'Silver', 107.87, 'övergångsmetall', [1], [[107, 'stabil, ca 52 %'], [109, 'stabil, ca 48 %']], 'Den metall som leder el allra bäst.', 'Smycken, elektronik, bakteriedödande ytor.', 'Silverjoner är giftiga för vattenlevande organismer.'],
  [48, 'Cd', 'Kadmium', 112.41, 'övergångsmetall', [2], [[114, 'stabil, ca 29 %'], [112, 'stabil, ca 24 %']], 'En giftig tungmetall.', 'Tidigare i batterier och färger.', 'Mycket giftigt och skadar njurarna. Ett miljögift.'],
  [49, 'In', 'Indium', 114.82, 'övrig metall', [3], [[115, 'svagt radioaktiv, ca 96 %'], [113, 'stabil, ca 4 %']], 'En mjuk metall.', 'Pekskärmar (indiumtennoxid).', 'Damm kan skada lungorna.'],
  [50, 'Sn', 'Tenn', 118.71, 'övrig metall', [2, 4], [[120, 'stabil, ca 33 %'], [118, 'stabil, ca 24 %']], 'En mjuk metall som har flest stabila isotoper av alla grundämnen (10 st).', 'Lödtenn, konservburkar (förtennat stål), brons.', 'Organiska tennföreningar är miljögifter.'],
  [51, 'Sb', 'Antimon', 121.76, 'halvmetall', [], [[121, 'stabil, ca 57 %'], [123, 'stabil, ca 43 %']], 'En spröd halvmetall.', 'Flamskyddsmedel, legeringar.', 'Giftigt i större mängder.'],
  [52, 'Te', 'Tellur', 127.6, 'halvmetall', [-2], [[130, 'nästan stabil, ca 34 %'], [128, 'nästan stabil, ca 32 %']], 'En sällsynt halvmetall.', 'Solceller, legeringar.', 'Giftigt.'],
  [53, 'I', 'Jod', 126.9, 'halogen', [-1], [[127, 'stabil, det enda naturliga'], [131, 'radioaktiv, används inom sjukvården']], 'En halogen som bildar lila ånga. Behövs för sköldkörtelns hormoner.', 'Jodsalt, desinfektion, sköldkörtelbehandling.', 'Jod-131 från kärnkraftsolyckor kan tas upp av sköldkörteln.'],
  [54, 'Xe', 'Xenon', 131.29, 'ädelgas', [], [[132, 'stabil, ca 27 %'], [129, 'stabil, ca 26 %']], 'En tung ädelgas som faktiskt kan bilda några föreningar.', 'Starka lampor, narkosgas, rymdmotorer.', 'Kan tränga undan syre.'],
  [55, 'Cs', 'Cesium', 132.91, 'alkalimetall', [1], [[133, 'stabil, det enda naturliga'], [137, 'radioaktiv, från Tjernobyl']], 'Den mest reaktiva metallen i vardagskemin.', 'Atomur (definierar sekunden).', 'Reagerar explosivt med vatten. Cesium-137 finns kvar i svensk natur efter Tjernobyl.'],
  [56, 'Ba', 'Barium', 137.33, 'alkalisk jordartsmetall', [2], [[138, 'stabil, ca 72 %'], [137, 'stabil, ca 11 %']], 'En tung alkalisk jordartsmetall.', 'Röntgenkontrast (bariumsulfat), gröna fyrverkerier.', 'Lösliga bariumföreningar är giftiga.'],
  [57, 'La', 'Lantan', 138.91, 'lantanid', [3], [[139, 'stabil, ca 99,9 %']], 'Den första lantaniden. Lantaniderna kallas ibland sällsynta jordartsmetaller.', 'Kameralinser, batterier.', 'Låg risk i vardagen.'],
  [58, 'Ce', 'Cerium', 140.12, 'lantanid', [3, 4], [[140, 'stabil, ca 88 %']], 'Den vanligaste lantaniden. Upptäckt i Sverige.', 'Tändstenar, katalysatorer, glaspolering.', 'Pulver kan självantända.'],
  [59, 'Pr', 'Praseodym', 140.91, 'lantanid', [3], [[141, 'stabil, det enda naturliga']], 'En lantanid som ger grön färg åt glas.', 'Magneter, svetsglasögon.', 'Låg risk i vardagen.'],
  [60, 'Nd', 'Neodym', 144.24, 'lantanid', [3], [[142, 'stabil, ca 27 %'], [144, 'nästan stabil, ca 24 %']], 'Används i världens starkaste permanentmagneter.', 'Magneter i hörlurar, elmotorer och vindkraftverk.', 'Starka magneter kan klämma fingrar.'],
  [61, 'Pm', 'Prometium', 145, 'lantanid', [3], [[145, 'radioaktiv, mest långlivad']], 'En lantanid som saknar stabila isotoper.', 'Forskning, tidigare självlysande färger.', 'Radioaktivt.'],
  [62, 'Sm', 'Samarium', 150.36, 'lantanid', [3], [[152, 'stabil, ca 27 %'], [154, 'stabil, ca 23 %']], 'En lantanid som används i magneter.', 'Magneter, cancerbehandling.', 'Låg risk i vardagen.'],
  [63, 'Eu', 'Europium', 151.96, 'lantanid', [2, 3], [[153, 'stabil, ca 52 %'], [151, 'stabil, ca 48 %']], 'Lyser rött i lysrör och skärmar.', 'Skärmar, säkerhetstryck på eurosedlar.', 'Låg risk i vardagen.'],
  [64, 'Gd', 'Gadolinium', 157.25, 'lantanid', [3], [[158, 'stabil, ca 25 %'], [160, 'stabil, ca 22 %']], 'Uppkallat efter den finske kemisten Johan Gadolin.', 'Kontrastmedel vid MR-undersökningar.', 'Fria gadoliniumjoner är giftiga.'],
  [65, 'Tb', 'Terbium', 158.93, 'lantanid', [3], [[159, 'stabil, det enda naturliga']], 'Ännu ett grundämne uppkallat efter Ytterby.', 'Gröna fosforer i skärmar, magneter.', 'Låg risk i vardagen.'],
  [66, 'Dy', 'Dysprosium', 162.5, 'lantanid', [3], [[164, 'stabil, ca 28 %'], [162, 'stabil, ca 26 %']], 'En lantanid som gör magneter tåligare mot värme.', 'Magneter i elbilar.', 'Låg risk i vardagen.'],
  [67, 'Ho', 'Holmium', 164.93, 'lantanid', [3], [[165, 'stabil, det enda naturliga']], 'Uppkallat efter Stockholm (Holmia).', 'Lasrar inom medicin, magneter.', 'Låg risk i vardagen.'],
  [68, 'Er', 'Erbium', 167.26, 'lantanid', [3], [[166, 'stabil, ca 34 %'], [168, 'stabil, ca 27 %']], 'Uppkallat efter Ytterby.', 'Förstärkare i fiberoptik, rosa glas.', 'Låg risk i vardagen.'],
  [69, 'Tm', 'Tulium', 168.93, 'lantanid', [3], [[169, 'stabil, det enda naturliga']], 'Uppkallat efter Thule, ett gammalt namn för Norden.', 'Bärbar röntgenutrustning, lasrar.', 'Låg risk i vardagen.'],
  [70, 'Yb', 'Ytterbium', 173.05, 'lantanid', [2, 3], [[174, 'stabil, ca 32 %'], [172, 'stabil, ca 22 %']], 'Också uppkallat efter Ytterby.', 'Atomur, lasrar.', 'Låg risk i vardagen.'],
  [71, 'Lu', 'Lutetium', 174.97, 'lantanid', [3], [[175, 'stabil, ca 97 %']], 'Den sista lantaniden.', 'Cancerbehandling, katalysatorer.', 'Låg risk i vardagen.'],
  [72, 'Hf', 'Hafnium', 178.49, 'övergångsmetall', [4], [[180, 'stabil, ca 35 %'], [178, 'stabil, ca 27 %']], 'Uppkallat efter Köpenhamn (Hafnia).', 'Styrstavar i kärnreaktorer, elektronik.', 'Låg risk i vardagen.'],
  [73, 'Ta', 'Tantal', 180.95, 'övergångsmetall', [5], [[181, 'stabil, ca 99,99 %']], 'En mycket korrosionstålig metall. Upptäckt i Sverige.', 'Kondensatorer i mobiler, implantat.', 'Låg risk i vardagen.'],
  [74, 'W', 'Volfram', 183.84, 'övergångsmetall', [6], [[184, 'stabil, ca 31 %'], [186, 'stabil, ca 28 %']], 'Den metall som har högst smältpunkt (ca 3400 °C).', 'Glödtrådar, borrar, hårdmetallverktyg.', 'Låg risk i vardagen.'],
  [75, 'Re', 'Rhenium', 186.21, 'övergångsmetall', [], [[187, 'svagt radioaktiv, ca 63 %'], [185, 'stabil, ca 37 %']], 'En av de sällsyntaste metallerna i jordskorpan.', 'Jetmotorer, katalysatorer.', 'Låg risk i vardagen.'],
  [76, 'Os', 'Osmium', 190.23, 'övergångsmetall', [], [[192, 'stabil, ca 41 %'], [190, 'stabil, ca 26 %']], 'Ett av de tätaste grundämnena (tyngst per volym).', 'Reservoarpennspetsar, elektriska kontakter.', 'Osmiumtetroxid är mycket giftig.'],
  [77, 'Ir', 'Iridium', 192.22, 'övergångsmetall', [], [[193, 'stabil, ca 63 %'], [191, 'stabil, ca 37 %']], 'En extremt korrosionstålig metall. Ett tunt lager iridium i berggrunden tyder på asteroiden som slog ut dinosaurierna.', 'Tändstift, strålbehandling.', 'Låg risk i vardagen.'],
  [78, 'Pt', 'Platina', 195.08, 'övergångsmetall', [2, 4], [[195, 'stabil, ca 34 %'], [194, 'stabil, ca 33 %']], 'En ädel, korrosionstålig metall.', 'Smycken, katalysatorer, cancerläkemedel (cisplatin).', 'Vissa platinasalter kan ge allergi.'],
  [79, 'Au', 'Guld', 196.97, 'övergångsmetall', [1, 3], [[197, 'stabil, det enda naturliga']], 'En ädelmetall som nästan aldrig reagerar eller rostar.', 'Smycken, elektronik, tandlagningar, valutareserv.', 'Ofarligt i fast form.'],
  [80, 'Hg', 'Kvicksilver', 200.59, 'övergångsmetall', [1, 2], [[202, 'stabil, ca 30 %'], [200, 'stabil, ca 23 %']], 'Den enda metallen som är flytande vid rumstemperatur.', 'Tidigare i termometrar och lysrör.', 'Mycket giftigt, särskilt ångan. Ett allvarligt miljögift som anrikas i fisk.'],
  [81, 'Tl', 'Tallium', 204.38, 'övrig metall', [1, 3], [[205, 'stabil, ca 70 %'], [203, 'stabil, ca 30 %']], 'En mjuk, mycket giftig metall.', 'Elektronik, specialglas.', 'Extremt giftigt.'],
  [82, 'Pb', 'Bly', 207.2, 'övrig metall', [2, 4], [[208, 'stabil, ca 52 %'], [206, 'stabil, ca 24 %'], [207, 'stabil, ca 22 %']], 'En tung, mjuk metall. Slutprodukt när uran och torium sönderfaller.', 'Bilbatterier, strålskydd, tidigare i bensin och färg.', 'Giftigt, särskilt för barns nervsystem. Ett miljögift.'],
  [83, 'Bi', 'Vismut', 208.98, 'övrig metall', [3], [[209, 'extremt svagt radioaktiv, nästan stabil']], 'En tung metall som bildar regnbågsfärgade kristaller.', 'Magmedicin, kosmetika, ersättning för bly.', 'Låg giftighet jämfört med andra tungmetaller.'],
  [84, 'Po', 'Polonium', 209, 'övrig metall', [], [[209, 'radioaktiv'], [210, 'radioaktiv, mycket giftig']], 'Ett radioaktivt grundämne som upptäcktes av Marie Curie.', 'Antistatiska borstar, forskning.', 'Extremt radioaktivt och giftigt.'],
  [85, 'At', 'Astat', 210, 'halogen', [-1], [[210, 'radioaktiv, mest långlivad']], 'Ett av de sällsyntaste naturliga grundämnena.', 'Forskning inom cancerbehandling.', 'Radioaktivt.'],
  [86, 'Rn', 'Radon', 222, 'ädelgas', [], [[222, 'radioaktiv']], 'En radioaktiv ädelgas som bildas när uran i berggrunden sönderfaller.', 'Inga vardagsanvändningar.', 'Radon i bostäder är den näst största orsaken till lungcancer i Sverige. Mät radon hemma!'],
  [87, 'Fr', 'Francium', 223, 'alkalimetall', [1], [[223, 'radioaktiv, mest långlivad']], 'En extremt sällsynt och kortlivad alkalimetall.', 'Endast forskning.', 'Radioaktivt.'],
  [88, 'Ra', 'Radium', 226, 'alkalisk jordartsmetall', [2], [[226, 'radioaktiv']], 'Upptäcktes av Marie och Pierre Curie.', 'Tidigare självlysande urtavlor, idag cancerbehandling.', 'Starkt radioaktivt.'],
  [89, 'Ac', 'Aktinium', 227, 'aktinid', [3], [[227, 'radioaktiv']], 'Den första aktiniden. Lyser blått i mörker.', 'Forskning, cancerbehandling.', 'Starkt radioaktivt.'],
  [90, 'Th', 'Torium', 232.04, 'aktinid', [4], [[232, 'radioaktiv, mycket lång halveringstid']], 'Ett svagt radioaktivt grundämne uppkallat efter guden Tor. Upptäckt av Berzelius.', 'Möjligt framtida kärnbränsle, värmetåligt glas.', 'Radioaktivt.'],
  [91, 'Pa', 'Protaktinium', 231.04, 'aktinid', [5], [[231, 'radioaktiv']], 'Ett sällsynt, radioaktivt grundämne.', 'Endast forskning.', 'Radioaktivt och giftigt.'],
  [92, 'U', 'Uran', 238.03, 'aktinid', [4, 6], [[238, 'radioaktiv, ca 99,3 %'], [235, 'radioaktiv, ca 0,7 %, klyvbar']], 'Ett tungt, radioaktivt grundämne som används som bränsle i kärnkraftverk.', 'Kärnkraft (uran-235), åldersbestämning av bergarter.', 'Radioaktivt och giftigt som tungmetall.'],
  [93, 'Np', 'Neptunium', 237, 'aktinid', [], [[237, 'radioaktiv']], 'Det första grundämnet efter uran. Bildas i kärnreaktorer.', 'Forskning.', 'Radioaktivt.'],
  [94, 'Pu', 'Plutonium', 244, 'aktinid', [], [[244, 'radioaktiv, mest långlivad'], [239, 'radioaktiv, klyvbar']], 'Bildas i kärnreaktorer.', 'Kärnvapen, kärnbränsle, energikälla i rymdsonder.', 'Extremt giftigt och radioaktivt.'],
  [95, 'Am', 'Americium', 243, 'aktinid', [], [[243, 'radioaktiv'], [241, 'radioaktiv, används i brandvarnare']], 'Ett konstgjort grundämne.', 'Vissa brandvarnare (americium-241).', 'Radioaktivt. Öppna aldrig en joniserande brandvarnare.'],
  [96, 'Cm', 'Curium', 247, 'aktinid', [], [[247, 'radioaktiv']], 'Uppkallat efter Marie och Pierre Curie.', 'Energikälla i rymdsonder, forskning.', 'Radioaktivt.'],
  [97, 'Bk', 'Berkelium', 247, 'aktinid', [], [[247, 'radioaktiv']], 'Uppkallat efter Berkeley i USA.', 'Endast forskning.', 'Radioaktivt.'],
  [98, 'Cf', 'Californium', 251, 'aktinid', [], [[251, 'radioaktiv']], 'Ett konstgjort grundämne som avger neutroner.', 'Starta kärnreaktorer, materialundersökningar.', 'Radioaktivt.'],
  [99, 'Es', 'Einsteinium', 252, 'aktinid', [], [[252, 'radioaktiv']], 'Uppkallat efter Albert Einstein. Upptäcktes i nedfall från en vätebomb.', 'Endast forskning.', 'Radioaktivt.'],
  [100, 'Fm', 'Fermium', 257, 'aktinid', [], [[257, 'radioaktiv']], 'Uppkallat efter Enrico Fermi.', 'Endast forskning.', 'Radioaktivt.'],
  [101, 'Md', 'Mendelevium', 258, 'aktinid', [], [[258, 'radioaktiv']], 'Uppkallat efter Dmitrij Mendelejev, som skapade periodiska systemet.', 'Endast forskning.', 'Radioaktivt.'],
  [102, 'No', 'Nobelium', 259, 'aktinid', [], [[259, 'radioaktiv']], 'Uppkallat efter Alfred Nobel.', 'Endast forskning.', 'Radioaktivt.'],
  [103, 'Lr', 'Lawrencium', 266, 'aktinid', [], [[266, 'radioaktiv']], 'Den sista aktiniden.', 'Endast forskning.', 'Radioaktivt.'],
  [104, 'Rf', 'Rutherfordium', 267, 'övergångsmetall', [], [[267, 'radioaktiv']], 'Ett supertungt, konstgjort grundämne. Uppkallat efter Ernest Rutherford.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [105, 'Db', 'Dubnium', 268, 'övergångsmetall', [], [[268, 'radioaktiv']], 'Uppkallat efter forskningsstaden Dubna i Ryssland.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [106, 'Sg', 'Seaborgium', 269, 'övergångsmetall', [], [[269, 'radioaktiv']], 'Uppkallat efter Glenn Seaborg, som hade svenska föräldrar.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [107, 'Bh', 'Bohrium', 270, 'övergångsmetall', [], [[270, 'radioaktiv']], 'Uppkallat efter Niels Bohr, som skapade skalmodellen av atomen.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [108, 'Hs', 'Hassium', 269, 'övergångsmetall', [], [[269, 'radioaktiv']], 'Uppkallat efter delstaten Hessen i Tyskland.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [109, 'Mt', 'Meitnerium', 278, 'okända egenskaper', [], [[278, 'radioaktiv']], 'Uppkallat efter Lise Meitner, som var med och upptäckte kärnklyvningen och arbetade i Sverige.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [110, 'Ds', 'Darmstadtium', 281, 'okända egenskaper', [], [[281, 'radioaktiv']], 'Uppkallat efter staden Darmstadt.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [111, 'Rg', 'Röntgenium', 282, 'okända egenskaper', [], [[282, 'radioaktiv']], 'Uppkallat efter Wilhelm Röntgen, som upptäckte röntgenstrålningen.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [112, 'Cn', 'Copernicium', 285, 'okända egenskaper', [], [[285, 'radioaktiv']], 'Uppkallat efter astronomen Nicolaus Copernicus.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [113, 'Nh', 'Nihonium', 286, 'okända egenskaper', [], [[286, 'radioaktiv']], 'Uppkallat efter Japan (Nihon). Det första grundämnet som upptäckts i Asien.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [114, 'Fl', 'Flerovium', 289, 'okända egenskaper', [], [[289, 'radioaktiv']], 'Uppkallat efter fysikern Georgij Fljorov.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [115, 'Mc', 'Moskovium', 290, 'okända egenskaper', [], [[290, 'radioaktiv']], 'Uppkallat efter Moskvaregionen.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [116, 'Lv', 'Livermorium', 293, 'okända egenskaper', [], [[293, 'radioaktiv']], 'Uppkallat efter Lawrence Livermore-laboratoriet i USA.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [117, 'Ts', 'Tenness', 294, 'okända egenskaper', [], [[294, 'radioaktiv']], 'Uppkallat efter delstaten Tennessee.', 'Endast forskning.', 'Radioaktivt. Bara enstaka atomer har tillverkats.'],
  [118, 'Og', 'Oganesson', 294, 'okända egenskaper', [], [[294, 'radioaktiv']], 'Det tyngsta kända grundämnet. Står i grupp 18 men beter sig troligen inte som en vanlig ädelgas.', 'Endast forskning.', 'Radioaktivt. Bara ett fåtal atomer har någonsin tillverkats.'],
]

/** Grundämnen som saknar stabila isotoper. */
function isRadioactive(z: number) {
  return z === 43 || z === 61 || z >= 84
}

export const ELEMENTS: ElementData[] = rows.map(
  ([z, symbol, name, mass, category, ions, isotopes, description, uses, safety]) => ({
    z,
    symbol,
    name,
    mass,
    massIsEstimate: isRadioactive(z) && ![90, 91, 92].includes(z),
    category,
    ions,
    isotopes: isotopes.map(([massNumber, note]) => ({ massNumber, note })),
    description,
    uses,
    safety,
    radioactive: isRadioactive(z),
  }),
)

export const ELEMENT_BY_Z = new Map(ELEMENTS.map((e) => [e.z, e]))
export const ELEMENT_BY_SYMBOL = new Map(ELEMENTS.map((e) => [e.symbol.toLowerCase(), e]))

