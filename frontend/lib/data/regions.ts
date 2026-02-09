import { RegionInfo } from "@/types";

export const regions: RegionInfo[] = [
  {
    id: "marmara",
    name: "Marmara",
    shortDescription: "Het bruisende hart met Istanbul en de Zee van Marmara",
    description: "De Marmara-regio vormt de brug tussen Europa en Azië en wordt gedomineerd door de wereldstad Istanbul. Dit is het economische en culturele centrum van Turkije, waar geschiedenis, moderniteit en diversiteit samenkomen langs de oevers van de Bosporus en de Zee van Marmara.",
    coordinates: [28.0, 40.5],
    bounds: [
      [26.0, 39.5],
      [30.0, 41.5],
    ],
    color: "#1e40af", // Deep blue
    images: ["/images/regions/marmara-hero.jpg"],
  },
  {
    id: "egeische-kust",
    name: "Egeïsche Regio",
    shortDescription: "Open kust met antieke steden en mediterrane levensstijl",
    description: "De Egeïsche regio toont een open en toegankelijke kant van Turkije. Door haar ligging langs de westkust stond deze regio eeuwenlang in contact met andere culturen rond de Middellandse Zee. Zeehandel, landbouw en stedelijke ontwikkeling bepaalden hier vroeg het leven en zorgden voor een sterke uitwisseling van ideeën en gebruiken.",
    longDescription: `Geschiedkundig behoort de Egeïsche regio tot de belangrijkste gebieden van de klassieke oudheid. Steden zoals Efeze, Pergamon, Miletus en Didyma waren centra van religie, wetenschap en stadsplanning. Deze plaatsen speelden een sleutelrol in de ontwikkeling van filosofie, geneeskunde en architectuur en maakten deel uit van een bredere Mediterrane wereld. Doorheen de eeuwen bleef de regio bewoond en evolueerde ze verder onder Romeinse, Byzantijnse en Ottomaanse invloeden.

Het landschap wordt gekenmerkt door zachte heuvels, vruchtbare valleien en een sterk ingesneden kustlijn met baaien en natuurlijke havens. Olijfgaarden en wijngaarden bepalen al generaties lang het uitzicht. Het milde klimaat en de nabijheid van zee zorgen voor een ontspannen levensritme dat duidelijk verschilt van het binnenland.

Die levenshouding weerspiegelt zich sterk in de Egeïsche keuken. Hier draait koken rond eenvoud en kwaliteit: olijfolie als basis, seizoensgroenten, kruiden, vis en lichte mezze. De keuken is minder zwaar, meer plantaardig en sterk verbonden met het land en de zee. Eten is hier geen haastige maaltijd, maar een sociaal moment.

Cultureel staat de Egeïsche regio bekend om haar nuchtere, open karakter. Dorpen en steden behouden hun eigen identiteit, met lokale gebruiken die nog steeds deel uitmaken van het dagelijkse leven. Traditie en moderniteit bestaan hier naast elkaar, zonder elkaar te verdringen.`,
    insight: {
      title: "De Zeybek-dans",
      content: "Wist je dat de zeybek-dans zijn oorsprong vindt in de Egeïsche regio? Deze traditionele dans werd uitgevoerd door de efe. Een efe was vroeger een gerespecteerde figuur in dorpen en berggebieden, iemand die bekendstond om moed, rechtvaardigheid en leiderschap. De zeybek-dans wordt gekenmerkt door trage, beheerste bewegingen en een trotse houding. Ze weerspiegelt het karakter van de efe en het levensritme van de regio: rustig, zelfverzekerd en sterk verbonden met het land.",
    },
    coordinates: [27.5, 38.5],
    bounds: [
      [26.0, 36.0],
      [29.0, 40.0],
    ],
    color: "#0891b2", // Cyan
    images: ["/images/regions/egeische-hero.jpg"],
  },
  {
    id: "mediterrane-riviera",
    name: "Mediterrane Regio",
    shortDescription: "Zonnige zuidkust met rijke culinaire traditie",
    description: "De Mediterrane regio is voor veel reizigers het bekendste gezicht van Turkije. Zon, zee en stranden bepalen mee het eerste beeld van deze zuidkust. Maar achter dat herkenbare vakantiegevoel schuilt een regio met een uitgesproken eigen identiteit, gevormd door steden, geschiedenis en een sterke culinaire traditie.",
    longDescription: `Langs deze kust ontwikkelden zich doorheen de eeuwen belangrijke handels- en havensteden. Mersin, Adana en Hatay tonen een ander perspectief op de Mediterrane regio, weg van het klassieke strandverhaal. Deze steden lagen op kruispunten van handelsroutes tussen Anatolië, het Midden-Oosten en de Middellandse Zee en groeiden uit tot plekken met een uitgesproken culturele dynamiek en een sterk lokaal karakter.

Geschiedkundig is de regio bijzonder rijk. Antieke steden zoals Perge, Aspendos en Side getuigen van een lange stedelijke traditie, terwijl Hatay historisch bekendstaat als een ontmoetingsplaats van verschillende religies en culturen. Die gelaagdheid is hier geen abstract verleden, maar blijft zichtbaar in stadsstructuren, markten en religieus erfgoed.

Aardrijkskundig wordt de Mediterrane regio gekenmerkt door een uitgesproken contrast. De warme kustlijn ligt vlak naast het Taurusgebergte, waardoor zee, bergen en vruchtbare valleien elkaar snel afwisselen. Dit contrast bepaalt niet alleen het landschap, maar ook het dagelijkse leven, het tempo en de manier waarop hier gekookt en gegeten wordt.

Culinair behoort deze regio tot de meest uitgesproken van Turkije. In Adana staat de gelijknamige kebab centraal: grof gehakt lamsvlees, pittig gekruid en gegrild op houtskool. Mersin combineert zee en land in gerechten met peulvruchten, citrus en verse vis. Hatay staat bekend om haar rijke mezze-cultuur, waarbij meerdere kleine gerechten samen één maaltijd vormen en delen centraal staat.

Typische specialiteiten zoals künefe – een warm dessert van fijn deeg, gesmolten kaas en suikersiroop – oruk (gekruide bulgurkroketten met vleesvulling), humus en muhammara (een kruidige walnoot-paprikadip) maken deel uit van het dagelijkse eetpatroon. Ingrediënten zoals sumak en granaatappelmelasse zorgen voor frisse en licht zure toetsen die kenmerkend zijn voor deze keuken. Die culinaire rijkdom werd ook internationaal erkend: Hatay draagt de UNESCO-titel van Gastronomische Stad, als erkenning voor een keuken die generaties lang werd doorgegeven en diep verankerd is in het dagelijkse leven.`,
    insight: {
      title: "Sneeuw en warmte",
      content: "\"Torosların karı bitmez, Akdeniz'in harı bitmez.\" Vrij vertaald: de sneeuw van het Taurusgebergte verdwijnt nooit helemaal, en de warmte van de Middellandse Zee dooft nooit. De zegswijze verwijst naar het sterke contrast dat deze regio typeert. Hoge bergen en een warme kustlijn liggen hier dicht bij elkaar en bepalen samen het klimaat, het landschap en het dagelijkse leven.",
    },
    coordinates: [30.5, 36.5],
    bounds: [
      [29.0, 35.0],
      [36.5, 38.0],
    ],
    color: "#ea580c", // Orange
    images: ["/images/regions/mediterrane-hero.jpg"],
  },
  {
    id: "centraal-anatolie",
    name: "Centraal-Anatolië",
    shortDescription: "Het geografische en spirituele hart met Cappadocië",
    description: "Centraal-Anatolië vormt het geografische en historische binnenland van Turkije. Ver weg van de kust ontvouwt zich hier een uitgestrekte hoogvlakte, waar open landschappen, vulkanische formaties en een continentaal klimaat het ritme bepalen. Door haar ligging was deze regio eeuwenlang een natuurlijke doorgangszone voor volkeren, handelsroutes en overtuigingen.",
    longDescription: `De geschiedenis van Centraal-Anatolië is diep en veelzijdig. Beschavingen zoals de Hettieten legden hier vroege fundamenten, gevolgd door Romeinen, Byzantijnen, Seltsjoeken en Ottomanen. De regio speelde een sleutelrol in de ontwikkeling en verspreiding van verschillende geloven. In Cappadocië zochten vroege christelijke gemeenschappen bescherming en creëerden zij kerken, kloosters en leefruimtes uitgehouwen in het zachte tufsteen. Tegelijk ontwikkelden zich hier ook islamitische leercentra en soefi-tradities, wat de regio een uitgesproken spirituele gelaagdheid geeft.

Een van de meest indrukwekkende kenmerken van Centraal-Anatolië zijn de ondergrondse steden, zoals Derinkuyu en Kaymaklı. Deze meerlagige nederzettingen boden onderdak aan hele gemeenschappen in tijden van dreiging en tonen hoe mensen zich organiseerden in harmonie met hun omgeving. Ze maken duidelijk dat geschiedenis hier niet alleen zichtbaar is aan de oppervlakte, maar ook diep in de grond verankerd ligt.

Het landschap is gevormd door miljoenen jaren van vulkanische activiteit. De valleien en rotsformaties van Cappadocië behoren tot de meest herkenbare landschappen van Turkije. Bij zonsopgang stijgen luchtballonnen op en bieden ze een overzicht dat de schaal en complexiteit van deze regio tastbaar maakt. Het is een ervaring die niet draait om spektakel, maar om perspectief.

Cultureel wordt Centraal-Anatolië gekenmerkt door soberheid, traditie en een sterke band met het land. Het leven volgt hier het ritme van de seizoenen en de gemeenschap. Verhalen, muziek en ambachten blijven belangrijke dragers van identiteit, vaak eenvoudiger van vorm maar rijk aan betekenis.`,
    insight: {
      title: "De Saz",
      content: "In Centraal-Anatolië speelt muziek een belangrijke rol in het vertellen van verhalen. De saz (ook wel bağlama genoemd) is een traditioneel snaarinstrument dat al eeuwenlang wordt gebruikt door rondtrekkende dichters en muzikanten. Met dit instrument werden verhalen, levenswijsheden en geloofsovertuigingen doorgegeven, lang voordat ze werden opgeschreven. De saz is geen decoratief object, maar een stem van het Anatolische binnenland.",
    },
    coordinates: [34.5, 39.0],
    bounds: [
      [32.0, 37.0],
      [37.0, 41.0],
    ],
    color: "#c2410c", // Warm brown
    images: ["/images/regions/centraal-anatolie-hero.jpg"],
  },
  {
    id: "zwarte-zee",
    name: "Zwarte Zee-regio",
    shortDescription: "Groene bergkust met theevelden en levendige tradities",
    description: "De Zwarte Zee-regio laat een totaal ander gezicht van Turkije zien. Groen, bergachtig en vochtig, met een landschap dat sterk contrasteert met het droge binnenland en de zonnige zuidkust. Hier bepalen regen, bossen en steile hellingen het dagelijkse leven, en ontstaat een cultuur die duidelijk verschilt van andere regio's.",
    longDescription: `De regio strekt zich uit langs de noordkust van Turkije en vormt tegelijk een natuurlijke toegangspoort richting de Kaukasus. In het oosten grenst ze aan Georgië, wat historisch zorgde voor uitwisseling van handel, gebruiken en bevolkingsgroepen. Steden zoals Trabzon, Rize en Artvin spelen hierin een belangrijke rol en verbinden Turkije met het Zwarte Zee-gebied en verder richting Oost-Europa en de Kaukasus.

Aardrijkskundig is de regio uitgesproken verticaal opgebouwd. Een smalle kuststrook gaat snel over in bergen en hoogvlaktes. Dorpen liggen vaak tegen steile hellingen gebouwd, verscholen tussen bossen, mist en theevelden. Het klimaat is het hele jaar door vochtig en gematigd, wat zorgt voor een uitzonderlijk groen landschap. De combinatie van diep groen land en intens blauw water is hier voortdurend aanwezig.

Cultureel kent de Zwarte Zee-regio sterke lokale tradities. Muziek en dans zijn energiek en ritmisch, het gemeenschapsleven is hecht en gebruiken worden actief doorgegeven. De mentaliteit is direct, gastvrij en sterk verbonden met het land. Deze regio voelt minder gepolijst, maar juist daardoor oprecht en levendig.

Ook culinair volgt de regio haar eigen logica. De keuken is eenvoudig en gebaseerd op wat de natuur biedt. Maïs, groenten, peulvruchten en vis, vooral ansjovis (hamsi), vormen de basis. Daarnaast is de regio wereldwijd bekend om haar hazelnoten (fındık). Een groot deel van de Turkse hazelnootproductie komt hier vandaan en speelt een belangrijke rol in zowel de lokale keuken als de export.

Voor XPLORE TÜRKIYE staat de Zwarte Zee-regio voor contrast en authenticiteit. Een regio waar natuur, traditie en dagelijkse realiteit sterk met elkaar verweven zijn, en waar Turkije zich van een minder gekende, maar zeer karaktervolle kant toont.`,
    insight: {
      title: "Thee cultuur",
      content: "In de Zwarte Zee-regio is thee geen drank, maar een vast onderdeel van het leven. Vooral rond Rize liggen uitgestrekte theevelden tegen steile hellingen. Thee wordt hier op elk moment van de dag geschonken, bij aankomst, tijdens gesprekken en bij afscheid. Het kleine, tulpvormige glas staat symbool voor gastvrijheid. Een ontmoeting begint hier vaak niet met woorden, maar met thee.",
    },
    coordinates: [38.0, 41.0],
    bounds: [
      [32.0, 40.0],
      [42.0, 42.0],
    ],
    color: "#16a34a", // Green
    images: ["/images/regions/zwarte-zee-hero.jpg"],
  },
  {
    id: "oost-turkije",
    name: "Oost-Anatolië",
    shortDescription: "Ruige hoogvlaktes met het Vanmeer en oude tradities",
    description: "Oost-Anatolië is het meest ruige en uitgestrekte deel van Turkije. Hoogvlaktes, bergen en lange winters bepalen hier het landschap en het levensritme. Dit is een regio van afstand, stilte en schaal, waar natuur en klimaat nooit decor zijn, maar richting geven aan het dagelijkse leven.",
    longDescription: `De regio ligt dicht bij de grenzen met Armenië, Iran en Georgië en vormt al eeuwenlang een overgangsgebied tussen Anatolië, de Kaukasus en het Midden-Oosten. Die ligging verklaart ook de etnische en culturele diversiteit. Verschillende gemeenschappen hebben hier hun sporen nagelaten, elk met eigen gebruiken, muziek, keuken en tradities. Oost-Anatolië is geen homogeen geheel, maar een regio met sterke lokale identiteiten.

Het landschap is uitgesproken en vaak indrukwekkend. Hoge bergen, uitgestrekte vlaktes en besneeuwde toppen bepalen het beeld, zeker in de winter. Sneeuw is hier geen uitzondering, maar een vast onderdeel van het leven. Die omstandigheden hebben geleid tot een cultuur die gericht is op samenleven, voorbereiding en gastvrijheid.

Een centraal element in de regio is het Vanmeer (Van Gölü), het grootste meer van Turkije. Omringd door bergen en met een helder blauw oppervlak doet het meer denken aan een Oost-Anatolische tegenhanger van het meer van Bled, maar dan ruwer, groter en minder gepolijst. Het meer vormt een belangrijk herkenningspunt en speelt een rol in zowel het landschap als het lokale leven.

Geschiedkundig is Oost-Anatolië diep gelaagd. Van oude koninkrijken zoals Urartu tot middeleeuwse kerken, forten en handelsroutes: deze regio draagt sporen van beschavingen die hier eeuwenlang leefden en reisden. Die geschiedenis is vaak minder bekend, maar des te tastbaarder aanwezig in ruïnes, steden en dorpen.`,
    insight: {
      title: "Van Kahvaltısı",
      content: "In Oost-Anatolië staat ontbijt symbool voor samenhorigheid. Vooral rond Van is de Van kahvaltısı beroemd. Dit is geen snel ontbijt, maar een uitgebreide tafel met kazen, honing, room (kaymak), kruiden, eieren, brood en lokale specialiteiten. Het ontbijt wordt gedeeld, rustig en vaak met gasten. In een regio waar winters lang en koud zijn, begint de dag samen en goed gevoed.",
    },
    coordinates: [41.0, 39.5],
    bounds: [
      [38.0, 37.0],
      [44.5, 42.0],
    ],
    color: "#7c3aed", // Purple
    images: ["/images/regions/oost-anatolie-hero.jpg"],
  },
  {
    id: "zuidoost-mesopotamie",
    name: "Zuidoost-Anatolië",
    shortDescription: "Wieg van de beschaving met Şanlıurfa en Mardin",
    description: "Zuidoost-Anatolië voelt anders aan vanaf het eerste moment. Het licht is warmer, het tempo intenser en het dagelijkse leven speelt zich zichtbaar af op straat en rond de tafel. Dit is een regio waar geschiedenis geen achtergrond is, maar een vanzelfsprekend onderdeel van het heden.",
    longDescription: `Gelegen aan de rand van Mesopotamië, behoort deze regio tot de oudste continu bewoonde gebieden ter wereld. Hier ontstonden vroege vormen van samenleven, geloof en ritueel. Plaatsen zoals Şanlıurfa, Mardin en Diyarbakır dragen die geschiedenis niet als erfgoed alleen, maar als leefomgeving. Oude stadsmuren, religieuze gebouwen en woonhuizen bestaan hier naast elkaar, zonder duidelijke scheiding tussen toen en nu.

De ligging aan de grens met Syrië en Irak maakte Zuidoost-Anatolië eeuwenlang tot een ontmoetingsplaats van volkeren. Dat verklaart de grote culturele en etnische diversiteit. Verschillende talen, overtuigingen en tradities leven hier samen en vormen een regio met een uitgesproken eigen identiteit. Die gelaagdheid zie je niet alleen in architectuur, maar vooral in omgangsvormen en sociale structuren.

Het landschap is open en uitgestrekt, met golvende hoogvlaktes en rivieren zoals de Eufraat die het land doorkruizen. Het klimaat is warm en droog, wat het leven naar buiten trekt en zorgt voor een sterk gemeenschapsgevoel. Avonden zijn hier momenten van samenkomen, praten en delen.

Zuidoost-Anatolië is geen regio die je vluchtig ontdekt. Ze vraagt aandacht en openheid, maar geeft daar inzicht en intensiteit voor terug. Voor XPLORE TÜRKIYE staat deze regio voor oorsprong, verbondenheid en menselijkheid. Hier begrijp je niet alleen waar beschaving begon, maar ook hoe ze vandaag nog wordt geleefd.`,
    insight: {
      title: "Stad van Profeten",
      content: "Şanlıurfa staat bekend als een stad van profeten. De stad wordt in verband gebracht met Abraham (Ibrahim), een belangrijke figuur voor joden, christenen en moslims. Dat maakt Şanlıurfa tot een plek waar verschillende geloven al eeuwenlang samen bestaan en waar geloof deel uitmaakt van het dagelijkse leven.",
    },
    coordinates: [40.0, 37.5],
    bounds: [
      [37.0, 36.0],
      [43.0, 39.0],
    ],
    color: "#dc2626", // Red
    images: ["/images/regions/zuidoost-hero.jpg"],
  },
];

export const getRegionById = (id: string): RegionInfo | undefined => {
  return regions.find((r) => r.id === id);
};

export const getRegionBySlug = (slug: string): RegionInfo | undefined => {
  return regions.find((r) => r.id === slug);
};

export const getAllRegions = (): RegionInfo[] => {
  return regions;
};
