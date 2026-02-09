import { Trip } from "@/types";

export const trips: Trip[] = [
  {
    id: "1",
    slug: "istanbul-citytrip",
    title: "Istanbul in 5 dagen",
    subtitle:
      "XPLORE CITIES: ontworpen door locals, met een verfijnde kijk op de bestemming",
    type: "cities", // Deprecated - kept for backwards compatibility
    tripTypes: ["cities"], // New field - supports multiple types
    region: "marmara",
    duration: 5,
    price: "Vanaf €790",
    priceText: "",
    priceNote: "",
    bestTravelTime: "april - mei, september - oktober",
    bestTravelTimeDetailed: `Istanbul is het hele jaar door te bezoeken, maar elk seizoen geeft de stad een ander karakter. Lente en herfst zijn over het algemeen de meest aangename periodes. In april, mei, september en oktober zijn de temperaturen mild, is het licht mooi en komt de stad tot leven met culturele evenementen en tentoonstellingen. Dit zijn ideale maanden om zowel monumenten te bezoeken als wijken te verkennen te voet, zonder de drukte of de hitte van de zomer.

    De zomermaanden kunnen warm en soms drukkend aanvoelen, zeker in juli en augustus. Tegelijk is dit een periode waarin het leven zich nog meer naar buiten verplaatst en terrassen, ferry’s en avondwandelingen langs de Bosporus hun charme hebben. Omdat veel locals tijdelijk naar de kust trekken, voelt de stad op sommige plekken rustiger aan en liggen prijzen voor accommodaties vaak lager.

     De winter toont een meer ingetogen Istanbul. De stad is rustiger, musea en bezienswaardigheden zijn minder druk en het dagelijkse leven speelt zich meer binnen af. Het kan koud zijn en bij slecht weer kunnen ferryverbindingen tijdelijk worden onderbroken, maar wie Istanbul in deze periode bezoekt, ervaart een authentieke stad zonder veel toeristische drukte.
`,
    departureCity: "Brussel",
    departureNote: "Brussel of naar keuze",
    images: [
      "/istanbul/istanbul-1.jpg",
      "/istanbul/istanbul-2.jpg",
      "/istanbul/istanbul-3.jpg",
      "/istanbul/istanbul-4.jpg",
      "/istanbul/istanbul-5.jpg",
      "/istanbul/istanbul-6.jpg",
      "/istanbul/istanbul-7.jpg",
      "/istanbul/istanbul-8.jpg",
    ],
    overview:
      "Istanbul is een stad die zich laag per laag onthult op het kruispunt van Europa en Azië. Byzantijnse kerken, Ottomaanse moskeeën, joodse synagogen en moderne wijken bestaan naast elkaar.",
    introductionText:
      "Istanbul is een stad die zich laag per laag onthult. Ze ligt op het kruispunt van Europa en Azië en werd gevormd door beschavingen die elk hun sporen nalieten. Byzantijnse kerken, Ottomaanse moskeeën, joodse synagogen en moderne stadswijken bestaan hier naast elkaar en maken van Istanbul een stad met een uitzonderlijke culturele rijkdom. Het dagelijkse leven speelt zich af op straat, aan het water en in de wijken waar verschillende gemeenschappen al eeuwenlang samenleven.\n\nDit vijfdaagse programma biedt een inhoudelijk kader om Istanbul te ontdekken. Het is opgebouwd als suggestie en laat ruimte om de stad op eigen tempo te verkennen, met aandacht voor zowel de grote historische lijnen als het hedendaagse stadsleven.",
    highlights: [
      "Sultanahmet: Hagia Sophia, Blauwe Moskee en Hippodroom",
      "Basilica Cisterne - ondergronds waterreservoir",
      "Istanbul Archeologisch Museum",
      "Topkapi Paleis met tuinen en uitzicht op de Bosporus",
      "Boottocht op de Bosporus",
      "Galata en Beyoğlu: culturele diversiteit en hedendaagse kunst",
      "Istanbul Modern museum",
      "Historische synagogen, kerken en moskeeën",
    ],
    itinerary: [
      {
        day: 1,
        title: "Aankomst in Istanbul",
        description:
          "Na aankomst op de luchthaven volgt een privétransfer naar het gekozen hotel. De rest van de dag is vrij om rustig kennis te maken met de stad. Een eerste wandeling in de buurt van het hotel, een diner aan de Bosporus of gewoon observeren hoe de stad beweegt, volstaat vaak om het ritme van Istanbul aan te voelen.\n\nOvernachting in Istanbul.",
        locations: ["Istanbul"],
      },
      {
        day: 2,
        title: "Sultanahmet en het ontstaan van de stad",
        description:
          "Vandaag verken je het historische hart van Istanbul, waar de fundamenten van de stad werden gelegd. In de wijk Sultanahmet wandel je door het voormalige Constantinopel, een plek waar religie, macht en publiek leven eeuwenlang samenkwamen. Een bezoek aan Hagia Sophia vormt een natuurlijk beginpunt en maakt meteen duidelijk hoe deze stad door de eeuwen heen van functie en betekenis veranderde.\n\nVlakbij liggen de Blauwe Moskee en het Hippodroom, ooit het sociale en ceremoniële centrum van de Byzantijnse hoofdstad. Hoewel de oorspronkelijke tribunes verdwenen zijn, blijft de open ruimte herkenbaar en vertellen monumenten zoals de obelisk en de Slangenzuil het verhaal van een stad die zich al vroeg als wereldstad profileerde.\n\nOnder de straten van Sultanahmet bevindt zich de indrukwekkende Basilica Cisterne, een ondergronds waterreservoir dat eeuwenlang essentieel was voor de bevoorrading van de stad. Het bezoek vormt een bijzonder contrast met het leven bovengronds en laat zien hoe ingenieus Constantinopel was opgebouwd.\n\nWie de historische lijn verder wil doortrekken, kan aansluitend het Istanbul Archeologisch Museum bezoeken. De collecties plaatsen de monumenten van vandaag in een bredere context en tonen hoe verschillende beschavingen de stad en haar omgeving hebben gevormd.\n\nOvernachting in Istanbul.",
        locations: [
          "Sultanahmet",
          "Hagia Sophia",
          "Blauwe Moskee",
          "Basilica Cisterne",
        ],
      },
      {
        day: 3,
        title: "Ottomaanse paleizen en leven langs het water",
        description:
          "De relatie tussen Istanbul en de Bosporus staat vandaag centraal. Een bezoek aan het Topkapi Paleis laat zien hoe strategisch de ligging van de stad was en hoe het Ottomaanse Rijk van hieruit werd bestuurd. De tuinen en terrassen bieden uitzicht op het water en maken duidelijk waarom deze plek eeuwenlang het centrum van de macht vormde.\n\nLater op de dag kan je Istanbul ervaren vanaf de Bosporus zelf. Tijdens een boottocht glijden de Europese en Aziatische oevers langzaam voorbij en wordt zichtbaar hoe wonen, werken en leven hier altijd met het water verbonden zijn. Een lunch aan boord vormt een mooie aanvulling op deze ervaring.\n\nOvernachting in Istanbul.",
        locations: ["Topkapi Paleis", "Bosporus"],
      },
      {
        day: 4,
        title: "Galata, minderheden en hedendaags Istanbul",
        description:
          "Vandaag ontdek je een ander gezicht van de stad. In Galata en Beyoğlu wandel je door wijken waar verschillende culturen en religies eeuwenlang samenleefden. Naast kerken en moskeeën vind je hier ook historische synagogen. Samen vormen ze een tastbare weerspiegeling van de culturele en religieuze diversiteit die Istanbul door de eeuwen heen heeft gekenmerkt en die vandaag nog steeds zichtbaar is in het straatbeeld.\n\nGalata is tegelijk een van de meest levendige wijken van vandaag. Kunstgalerieën, cafés en musea zoals Istanbul Modern laten zien hoe Istanbul zich blijft heruitvinden en hoe hedendaagse cultuur hier een vaste plaats heeft.\n\nOvernachting in Istanbul.",
        locations: ["Galata", "Beyoğlu", "Istanbul Modern"],
      },
      {
        day: 5,
        title: "Vrije tijd & vertrek",
        description:
          "Afhankelijk van de vertrektijd van de vlucht is er nog vrije tijd in de stad. Dit moment leent zich voor een laatste wandeling, een bezoek aan een markt of een koffie met zicht op het water. Nadien volgt de privétransfer naar de luchthaven voor de terugvlucht naar huis.",
        locations: ["Istanbul"],
      },
    ],
    included: [
      "Vluchten",
      "Hotelovernachting",
      "Pocketguide Istanbul",
      "24/7 noodnummer",
      "Privetransfer van en naar het hotel",
    ],
    excluded: [
      "Persoonlijke uitgaven",
      "Reisverzekeringen (bijstand, annulatie..)",
      "Niet vermelde diensten bij inbegrepen",
    ],
    accommodation: "Doubletree by Hilton Sirkeci 4* of gelijkwaardig",
    transportationIncluded: true,
    importantNotes: [
      "Dit programma is opgevat als een suggestie voor eigen invulling en geeft een beeld van wat Istanbul te bieden heeft. Wens je een begeleide citytrip met privégids, excursies op maat of een andere invulling van de dagen, dan werken wij graag een persoonlijk reisvoorstel uit.",
    ],
    tags: ["xplore cities", "Istanbul", "citytrip"],
    featured: true,
    coordinates: [28.9784, 41.0082],
  },
  {
    id: "2",
    slug: "cappadocie-rondreis",
    title: "Xplore Cappadocië",
    subtitle:
      "XPLORE ROUND TRIPS: ontworpen door locals, met een verfijnde kijk op de bestemming",
    type: "round-trips", // Deprecated - kept for backwards compatibility
    tripTypes: ["round-trips"], // XPLORE ROUND TRIPS
    region: "centraal-anatolie",
    duration: 6,
    price: "Op aanvraag", // Op aanvraag
    priceNote: "Wij maken voor jullie steeds een voorstel op maat.",
    bestTravelTime: "april - mei, september - oktober",
    bestTravelTimeDetailed: `Cappadocië is het hele jaar door toegankelijk, maar lente (april–mei) en herfst (september–oktober) bieden de meest aangename omstandigheden. In deze periodes zijn de temperaturen mild en zijn wandelingen door valleien en bezoeken aan openluchtlocaties comfortabel.

    De zomer kan warm zijn, maar door het droge klimaat blijven ochtenden en avonden geschikt voor activiteiten. In de winter is het kouder en kan er sneeuw vallen, wat het landschap een ander karakter geeft en zorgt voor een rustiger bezoekmoment.
`,
    departureCity: "Brussel",
    departureNote: "Brussel of naar keuze",
    images: [
      "/cappadocia/cappadocia-1.jpg",
      "/cappadocia/cappadocia-2.jpg",
      "/cappadocia/cappadocia-3.jpg",
      "/cappadocia/cappadocia-4.jpg",
      "/cappadocia/cappadocia-5.jpg",
      "/cappadocia/cappadocia-6.jpg",
      "/cappadocia/cappadocia-7.jpg",
    ],
    overview:
      "Cappadocië is een regio waar landschap en geschiedenis elkaar op een uitzonderlijke manier ontmoeten in het hart van Anatolië.",
    introductionText:
      "Het hart van Anatolië\n\nCappadocië is een regio waar landschap en geschiedenis elkaar op een uitzonderlijke manier ontmoeten. Al sinds de oudheid wordt dit deel van Anatolië bewoond, maar vooral in de Romeinse en Byzantijnse periode kreeg het gebied zijn historische betekenis. Vroege christelijke gemeenschappen maakten gebruik van het zachte tufsteen om kerken, kloosters en ondergrondse schuilplaatsen uit te houwen, waarvan vele vandaag nog zichtbaar zijn in de valleien en rotsformaties rond Göreme.\n\nHet unieke uitzicht van Cappadocië is het resultaat van miljoenen jaren vulkanische activiteit en erosie. Uitbarstingen van omliggende vulkanen legden dikke lagen as en lava neer, die door wind en water werden uitgesleten tot het karakteristieke reliëf met feeënschoorstenen. Deze natuurlijke omstandigheden bepaalden niet alleen het landschap, maar ook de manier waarop mensen hier leefden. Vandaag vormt Cappadocië een levend decor waarin dorpen, tradities en eeuwenoude routes het verleden en het heden op een vanzelfsprekende manier verbinden.",
    highlights: [
      "Asmalı Konak - iconisch herenhuis met traditionele architectuur",
      "Hayal Vadisi (Verbeeldingsvallei) - fantasierijke rotsformaties",
      "Çavuşin - historisch dorp met oude rotswoningen en kerken",
      "Traditioneel pottenbakkersatelier - eeuwenoud ambacht",
      "Paşabağ - indrukwekkende feeënschoorstenen met meerdere 'hoeden'",
      "Zelve Openluchtmuseum - verlaten nederzetting van grotwoningen",
      "Liefdesvallei - hoge rotsformaties",
      "Ortahisar Kasteel - indrukwekkende rotsburcht",
      "Duivenvallei - uitgehouwen duiventillen in rotswanden",
      "Ondergrondse stad - ingenieus netwerk van gangen en kamers",
      "Drie Schoonheden - iconische rotsformatie",
      "Ürgüp en Mustafapaşa (Sinassos) - charmante dorpen",
      "Ihlara-vallei uitkijkpunt - panoramisch uitzicht",
      "Tuz Gölü (Zoutmeer) - uitgestrekte witte vlakte",
    ],
    itinerary: [
      {
        day: 1,
        title: "Aankomst in het hart van Anatolië",
        description:
          "Vlucht naar Kayseri of Ankara, waar je bij aankomst wordt verwelkomd. Na de meet & greet volgt een privétransfer naar het hotel in Cappadocië.\n\nOvernachting in Cappadocië.",
        locations: ["Kayseri/Ankara", "Cappadocië"],
      },
      {
        day: 2,
        title: "Dorpen, valleien en lokaal vakmanschap",
        description:
          "De dag start met een fotomoment bij Asmalı Konak, een iconisch herenhuis dat symbool staat voor de traditionele architectuur van de regio. Vervolgens verken je de fantasierijke rotsformaties van Hayal Vadisi, ook wel de Verbeeldingsvallei genoemd, waar wind en erosie vormen hebben gecreëerd die tot de verbeelding spreken. Wie dat wenst, kan hier een korte wandeling maken.\n\nIn het nabijgelegen Çavuşin wandel je door een historisch dorp met oude rotswoningen en kerken, dat een goed beeld geeft van het vroegere dorpsleven in Cappadocië. Na de lunch maak je kennis met een van de oudste ambachten van de regio tijdens een demonstratie in een traditioneel pottenbakkersatelier, waar het werken met klei al generaties lang wordt doorgegeven.\n\nOvernachting in Cappadocië.",
        locations: [
          "Asmalı Konak",
          "Hayal Vadisi",
          "Çavuşin",
          "Pottenbakkersatelier",
        ],
      },
      {
        day: 3,
        title: "Feeënschoorstenen en openluchtmusea",
        description:
          "Vandaag staat het sprookjesachtige landschap van Cappadocië centraal. In Paşabağ wandel je tussen indrukwekkende feeënschoorstenen met meerdere 'hoeden', een van de meest herkenbare natuurverschijnselen van de regio. Aansluitend bezoek je het Zelve Openluchtmuseum, een verlaten nederzetting van grotwoningen en kerken die een uniek inzicht biedt in het vroegere leven in deze valleien.\n\nVia Avanos, bekend om zijn brug over de Kızılırmak en levendige ambachtentradities, gaat het verder naar de Liefdesvallei, waar hoge rotsformaties het landschap domineren. De dag wordt aangevuld met een bezoek aan een onyxatelier, waar je meer leert over deze natuursteen en de manier waarop hij lokaal wordt bewerkt.\n\nOvernachting in Cappadocië.",
        locations: [
          "Paşabağ",
          "Zelve Openluchtmuseum",
          "Avanos",
          "Liefdesvallei",
          "Onyxatelier",
        ],
      },
      {
        day: 4,
        title: "Kastelen, ondergrondse steden en dorpen",
        description:
          "De ochtend start bij Ortahisar Kasteel, een indrukwekkende rotsburcht die boven het landschap uittorent en vroeger een strategische rol speelde. Daarna volgt een wandeling door de Duivenvallei, waar uitgehouwen duiventillen in de rotswanden herinneren aan eeuwenoude landbouwtradities.\n\nEen afdaling in een ondergrondse stad laat zien hoe bewoners zich in tijden van gevaar konden terugtrekken in een ingenieus netwerk van gangen en kamers. Verder maak je kennis met de tapijt- en kilimkunst, een belangrijk cultureel erfgoed in Anatolië. De iconische rotsformatie van de Drie Schoonheden vormt een herkenbaar fotomoment, waarna je de sfeer opsnuift in Ürgüp en het voormalige Griekse dorp Mustafapaşa (Sinassos), bekend om zijn elegante stenen huizen.\n\nOvernachting in Cappadocië.",
        locations: [
          "Ortahisar Kasteel",
          "Duivenvallei",
          "Ondergrondse stad",
          "Drie Schoonheden",
          "Ürgüp",
          "Mustafapaşa",
        ],
      },
      {
        day: 5,
        title: "Panorama's en terugreis",
        description:
          "Op weg naar Ankara wordt nog halt gehouden bij het glazen uitkijkpunt boven de Ihlara-vallei, waar je geniet van een panoramisch uitzicht over het diepe groen uitgesneden landschap. De reis wordt in stijl afgesloten met een stop aan Tuz Gölü, het uitgestrekte Zoutmeer, dat met zijn witte vlakte en weerspiegelingen een bijzonder contrast vormt met het vulkanische landschap van de voorbije dagen.\n\nAansluitend transfer naar Ankara voor de terugvlucht naar huis.",
        locations: ["Ihlara-vallei", "Tuz Gölü", "Ankara"],
      },
    ],
    included: [
      "Vluchten incl. ruimbagage",
      "Luchthaventaksen",
      "Hotelovernachting incl. ontbijt in gelijkwaardige hotels",
      "Vermelde entreegelden volgens programma",
      "Reisgids",
      "24/7 noodnummer",
      "Het vervoer en de transfers met privé A/C wagen zoals vermeld in het programma",
    ],
    excluded: [
      "Persoonlijke uitgaven, niet vermelde maaltijden",
      "Fooien",
      "Reisverzekeringen (bijstand, annulatie..)",
      "Niet vermelde diensten bij inbegrepen",
      "Optionele excursies (contacteer ons voor de mogelijkheden)",
    ],
    accommodation:
      "Karaktervol boetiekhotel of kwalitatief 4-sterrenhotel, passend bij de stijl en sfeer van Cappadocië",
    transportationIncluded: false,
    importantNotes: [
      "Nederlandstalige gids op aanvraag.",
      "Optioneel: Ballonvaart Cappadocië (contacteer ons voor meer informatie en prijzen).",
    ],
    tags: ["xplore round trips", "Cappadocië", "rondreis", "Anatolië"],
    featured: true,
    coordinates: [34.8403, 38.6431], // Cappadocia coordinates
  },
  {
    id: "3",
    slug: "mezopotamie-rondreis",
    title: "Zuidoost-Anatolië & Mesopotamië",
    subtitle:
      "XPLORE ROUND TRIPS: individuele rondreis met gids, ontworpen door locals",
    type: "round-trips",
    tripTypes: ["round-trips"],
    region: "zuidoost-mesopotamie",
    duration: 7,
    price: "Op aanvraag",
    priceText: "",
    priceNote: "Wij maken voor jullie steeds een voorstel op maat.",
    bestTravelTime: "april - mei, september - oktober",
    bestTravelTimeDetailed:
      "De beste periode om Zuidoost-Anatolië te bezoeken is het voorjaar (april–mei) en het najaar (september–oktober). In deze maanden zijn de temperaturen aangenaam en zijn zowel stadsbezoeken als archeologische sites comfortabel te verkennen.",
    departureCity: "Brussel",
    departureNote: "Brussel of naar keuze",
    images: [
      "/mezopotamie/mezopotamie-1.jpg",
      "/mezopotamie/mezopotamie-2.jpg",
      "/mezopotamie/mezopotamie-3.jpg",
      "/mezopotamie/mezopotamie-4.jpg",
      "/mezopotamie/mezopotamie-5.jpg",
      "/mezopotamie/mezopotamie-6.jpg",
      "/mezopotamie/mezopotamie-7.jpg",
    ],
    overview:
      "Zuidoost-Anatolië vormt het historische hart van Mesopotamië, de regio waar enkele van de oudste beschavingen ter wereld tot bloei kwamen. Tussen de Eufraat en de Tigris ontmoeten archeologie, religie en dagelijks leven elkaar op een manier die nergens anders zo tastbaar is.",
    introductionText:
      "Verborgen schatten van Mesopotamië\n\nZuidoost-Anatolië vormt het historische hart van Mesopotamië, de regio waar enkele van de oudste beschavingen ter wereld tot bloei kwamen. Tussen de Eufraat en de Tigris ontwikkelden zich steden, handelsroutes en religieuze centra die tot op vandaag hun sporen nalaten in het landschap. Hier ontmoeten archeologie, religie en dagelijks leven elkaar op een manier die nergens anders zo tastbaar is.\n\nDeze reis voert door een regio met een uitzonderlijke culturele gelaagdheid. Van Romeinse mozaïeken en heiligdommen uit de prehistorie tot levendige bazaars en stille kloosters: Zuidoost-Anatolië is geen openluchtmuseum, maar een levend gebied waar verleden en heden voortdurend in dialoog staan. Het programma is opgevat als individuele rondreis met Engelstalige gids (Nederlandstalig op aanvraag).",
    highlights: [
      "Gaziantep – citadel, bazaar en UNESCO-gastronomie",
      "Zeugma Mozaïekmuseum – Romeinse mozaïeken",
      "Halfeti – boottocht op de Eufraat, verzonken dorp",
      "Nemrut Dağı – monumentale beelden en grafheuvel",
      "Göbeklitepe – oudste tempelcomplex ter wereld",
      "Harran – bijenkorfhuizen en intellectuele traditie",
      "Şanlıurfa – Balıklıgöl en religieuze plekken",
      "Deyrulzafaran Klooster – Syrisch-orthodox erfgoed",
      "Mardin – Kasımiye Medrese en oude stad",
      "Midyat – stenen herenhuizen en zilversmeedkunst",
      "Diyarbakır – stadsmuren, Ulu-moskee, Tien-ogenbrug",
    ],
    itinerary: [
      {
        day: 1,
        title: "Gaziantep: handelsstad en culinaire hoofdstad",
        description:
          "Na aankomst op de luchthaven van Gaziantep word je verwelkomd en naar het stadscentrum gebracht. Gaziantep is al eeuwenlang een belangrijk knooppunt op handelsroutes tussen Anatolië en Mesopotamië. Tijdens een eerste verkenning wandel je langs de citadel en door de oude bazaarwijken, waar koperhandelaars, overdekte markten en karavanserais herinneren aan de rol van de stad als handelscentrum. Naast haar geschiedenis staat Gaziantep ook bekend om haar gastronomie, die door UNESCO werd erkend.\n\nOvernachting in Gaziantep.\n\nHotel: Shimall Hotel Gaziantep of gelijkwaardig.",
        locations: ["Gaziantep"],
      },
      {
        day: 2,
        title: "Romeinse mozaïeken en de Eufraat",
        description:
          "Na het ontbijt bezoek je het Zeugma Mozaïekmuseum, een van de belangrijkste archeologische musea van Turkije. Daarna rijd je naar Halfeti, een stad die deels onder water verdween na de bouw van een stuwdam. Tijdens een boottocht ervaar je het verstilde landschap van verzonken huizen en minaretten. In de namiddag keer je terug naar Gaziantep.\n\nOvernachting in Gaziantep.\n\nHotel: Shimall Hotel Gaziantep of gelijkwaardig.",
        locations: ["Zeugma", "Halfeti", "Gaziantep"],
      },
      {
        day: 3,
        title: "Van de Eufraat naar de berg van de goden",
        description:
          "Vandaag verlaat je Gaziantep en rijd je richting Adıyaman. Onderweg stop je bij het uitkijkpunt over de Atatürk-dam. In de namiddag bereik je Nemrut Dağı, een van de meest iconische archeologische sites van Turkije. De monumentale beelden en grafheuvel, opgericht door koning Antiochos I, combineren Hellenistische, Perzische en lokale invloeden. Na het bezoek rijd je verder naar Şanlıurfa.\n\nOvernachting in Şanlıurfa.\n\nHotel: Hilton Garden Inn Urfa of gelijkwaardig.",
        locations: ["Atatürk-dam", "Nemrut Dağı", "Şanlıurfa"],
      },
      {
        day: 4,
        title: "Oorsprong van beschaving en religie",
        description:
          "Je bezoekt Göbeklitepe, het oudste gekende tempelcomplex ter wereld. Aansluitend rijd je naar Harran, een oude stad met karakteristieke bijenkorfhuizen. Terug in Şanlıurfa wandel je rond Balıklıgöl, een belangrijke religieuze plek waar verschillende geloofstradities samenkomen.\n\nOvernachting in Şanlıurfa.\n\nHotel: Hilton Garden Inn Urfa of gelijkwaardig.",
        locations: ["Göbeklitepe", "Harran", "Şanlıurfa"],
      },
      {
        day: 5,
        title: "Mardin en de Mesopotamische vlakte",
        description:
          "Na het ontbijt rijd je via Nusaybin richting Mardin, spectaculair gelegen boven de Mesopotamische vlakte. Onderweg bezoek je het Deyrulzafaran Klooster. In Mardin ontdek je een stad waar architectuur, religie en landschap samenvloeien. Bezoek aan de Kasımiye Medrese en een wandeling door de oude stad.\n\nOvernachting in Mardin.\n\nHotel: Raymar Hotels Mardin of gelijkwaardig.",
        locations: ["Deyrulzafaran", "Mardin"],
      },
      {
        day: 6,
        title: "Midyat en Diyarbakır: van steen tot basalt",
        description:
          "Vandaag rijd je naar Midyat, bekend om zijn traditionele stenen herenhuizen en ambachtelijke zilversmeedkunst. Daarna gaat de reis verder naar Diyarbakır, gelegen aan de oevers van de Tigris. De stadsmuren, gebouwd uit zwart basalt, behoren tot de langste ter wereld. Je bezoekt de Ulu-moskee en een historische karavanserai.\n\nOvernachting in Diyarbakır.\n\nHotel: Novotel Diyarbakir of gelijkwaardig.",
        locations: ["Midyat", "Diyarbakır"],
      },
      {
        day: 7,
        title: "Afsluiting in Diyarbakır",
        description:
          "Na het ontbijt bezoek je nog de iconische Tien-ogenbrug over de Tigris. Daarna volgt de transfer naar de luchthaven van Diyarbakır, waar deze individuele rondreis door Mesopotamië wordt afgesloten.",
        locations: ["Diyarbakır"],
      },
    ],
    included: [
      "Vluchten incl. ruimbagage",
      "Luchthaventaksen",
      "Hotelovernachting incl. ontbijt in gelijkwaardige hotels",
      "Vermelde entreegelden volgens programma",
      "Reisgids",
      "24/7 noodnummer",
      "Vervoer en transfers met privé A/C wagen zoals vermeld",
      "Engelstalige gids gedurende de reis (Nederlandstalig op aanvraag)",
    ],
    excluded: [
      "Persoonlijke uitgaven, niet vermelde maaltijden",
      "Fooien",
      "Reisverzekeringen (bijstand, annulatie..)",
      "Niet vermelde diensten bij inbegrepen",
      "Optionele excursies (contacteer ons voor de mogelijkheden)",
    ],
    accommodation:
      "Wij werken met zorgvuldig geselecteerde 4* en 5* hotels voor dit programma.",
    transportationIncluded: true,
    importantNotes: ["Nederlandstalige gids op aanvraag."],
    tags: [
      "xplore round trips",
      "Mesopotamië",
      "Zuidoost-Anatolië",
      "rondreis",
    ],
    featured: true,
    coordinates: [40.23, 37.31], // Mardin area
  },
];

export const getTripBySlug = (slug: string): Trip | undefined => {
  return trips.find((trip) => trip.slug === slug);
};

export const getTripsByType = (type: string): Trip[] => {
  return trips.filter((trip) => trip.type === type);
};

export const getTripsByRegion = (region: string): Trip[] => {
  return trips.filter((trip) => trip.region === region);
};

export const getFeaturedTrips = (): Trip[] => {
  return trips.filter((trip) => trip.featured);
};

export const getAllTrips = (): Trip[] => {
  return trips;
};
