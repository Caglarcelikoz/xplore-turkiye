import { TripType, TripTypeInfo } from "@/types";

export const tripTypes: Record<TripType, TripTypeInfo> = {
  cities: {
    id: "cities",
    name: "XPLORE CITIES",
    shortName: "Cities",
    tagline: "Citytrips om te beleven",
    description: "Wat maakt een stad écht een stad?",
    longDescription: `Wat maakt een stad écht een stad?
In Turkije zijn steden altijd meer geweest dan een verzameling gebouwen. Ze waren ontmoetingsplaatsen van culturen, religies en handelsroutes en dat voel je vandaag nog steeds.

Met XPLORE CITIES ontdek je steden als levende omgevingen. Je beweegt door historische wijken, lokale buurten en hedendaagse stadsdelen waar het dagelijkse leven zich afspeelt. Architectuur, gastronomie en straatbeeld vertellen samen het verhaal van de stad. Elke stad toont een ander facet van Turkije en laat zien hoe verleden en heden voortdurend met elkaar verweven blijven.`,
    icon: "Landmark",
    image: "/xplore-cities.jpg",
    color: "#d44e42", // accent color
  },
  "round-trips": {
    id: "round-trips",
    name: "XPLORE ROUND TRIPS",
    shortName: "Round Trips",
    tagline: "Ontdek unieke rondreizen, zorgvuldig samengesteld",
    description:
      "Wist je dat Turkije uit tientallen regio's bestaat, elk met een eigen karakter?",
    longDescription: `Een rondreis maakt het mogelijk om die verschillen echt te begrijpen.

XPLORE ROUND TRIPS verbinden meerdere regio's tot één samenhangend traject. Niet willekeurig, maar opgebouwd rond historische verbanden, geografische logica en een evenwichtig tempo. Steden, natuur en landelijke gebieden wisselen elkaar af en versterken samen het totaalbeeld. Zo ontstaat een reis die niet alleen afwisselend is, maar ook inhoudelijk klopt.`,
    icon: "Route",
    image: "/images/trip-types/round-trips.jpg",
    color: "#294d54", // primary color
  },
  "road-trips": {
    id: "road-trips",
    name: "XPLORE ON THE ROAD",
    shortName: "Road Trips",
    tagline: "Ontdek Turkije op eigen ritme",
    description:
      "Sommige landen ontdek je het best onderweg. Turkije is er zo één.",
    longDescription: `Met XPLORE ON THE ROAD ervaar je het land stap voor stap, van achter het stuur, via routes die landschap, dorpen en regio's met elkaar verbinden.

Deze selfdrive-reizen combineren vrijheid met structuur. Je volgt een zorgvuldig uitgestippelde route, met logies en stops die passen bij de omgeving. 

Onderweg zie je hoe het landschap verandert, hoe regio's in elkaar overvloeien en hoe het dagelijkse leven verschilt van streek tot streek.`,
    icon: "Car",
    image: "/images/trip-types/road-trips.jpg",
    color: "#182e32", // foreground color
  },
  group: {
    id: "group",
    name: "XPLORE IN GROUP",
    shortName: "Group",
    tagline: "Groepsreizen met aandacht voor inhoud",
    description: "Kan een groepsreis persoonlijk aanvoelen? Absoluut.",
    longDescription: `XPLORE IN GROUP kiest bewust voor kleine groepen tot maximaal 20 deelnemers. Dat zorgt voor rust, betrokkenheid en ruimte voor individuele beleving binnen de groep.

Deze reizen bieden structuur en verdieping. Dankzij begeleiding en context krijgen plaatsen extra betekenis, zonder dat het programma strak of gehaast aanvoelt. De groep vormt een kader waarin samen beleven centraal staat, met voldoende ruimte voor eigen indrukken en ervaringen.`,
    icon: "Users",
    image: "/xplore-group.jpg",
    color: "#294d54", // primary color
  },
  different: {
    id: "different",
    name: "XPLORE DIFFERENT",
    shortName: "Different",
    tagline: "",
    description: "Niet elke reis past in een vast formaat.",
    longDescription: `XPLORE DIFFERENT is ontstaan vanuit de nood aan flexibiliteit en creativiteit.

Hier brengen we ideeën samen die een reis verdiepen of uitbreiden. Denk aan pré-stays of verlengingen bij een bestaand programma, kleinschalige trajecten, bijzondere excursies of combinatiereizen waarbij Turkije wordt verbonden met een ander land.

Niet elke reis past in een vast kader. Heb je nog niet gevonden wat je zocht, of zit je met een idee dat verder gaat dan onze reistypes? Neem vrijblijvend contact met ons op. We denken graag met je mee en werken samen aan een reis die vertrekt vanuit jouw verwachtingen.`,
    icon: "Sparkles",
    image: "/xplore-different.jpg",
    color: "#d44e42", // accent color
  },
};

export const getAllTripTypes = (): TripTypeInfo[] => {
  return Object.values(tripTypes);
};

export const getTripTypeById = (id: TripType): TripTypeInfo | undefined => {
  return tripTypes[id];
};

export const getTripTypeBySlug = (slug: string): TripTypeInfo | undefined => {
  return Object.values(tripTypes).find((type) => type.id === slug);
};

const tripTypeHeroFallbacks: Record<TripType, string> = {
  cities: "/xplore-cities.jpg",
  "round-trips": "/xplore-round-trips.jpg",
  "road-trips": "/xplore-road.jpg",
  group: "/xplore-group.jpg",
  different: "/xplore-different.jpg",
};

export function getTripTypeHeroImage(typeId: string): string {
  return (
    tripTypeHeroFallbacks[typeId as TripType] ?? tripTypeHeroFallbacks.cities
  );
}
