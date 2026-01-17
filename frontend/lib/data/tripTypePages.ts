import { TripType } from "@/types";

export interface TripTypePageContent {
  type: TripType;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  description: string;
  highlights: string[];
  whyChoose: {
    title: string;
    description: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
}

export const tripTypePages: Record<TripType, TripTypePageContent> = {
  groepsreizen: {
    type: "groepsreizen",
    heroTitle: "Groepsreizen naar Turkije",
    heroSubtitle: "Reis samen met andere reizigers en ontdek de mooiste plekken van Turkije",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    description: "Onze groepsreizen zijn perfect voor reizigers die graag samen met anderen op avontuur gaan. Je reist in een kleine groep met een ervaren Nederlandssprekende gids die je meeneemt naar de mooiste plekken van Turkije. Van de magische landschappen van Cappadocië tot de historische steden aan de kust, elke reis is zorgvuldig samengesteld voor een onvergetelijke ervaring.",
    highlights: [
      "Kleine groepen voor persoonlijke aandacht",
      "Nederlandssprekende gidsen",
      "Zorgvuldig samengestelde routes",
      "Alle transfers en accommodaties geregeld",
      "Flexibele opties voor vrije tijd",
    ],
    whyChoose: [
      {
        title: "Gezelligheid",
        description: "Ontmoet gelijkgestemde reizigers en deel je avonturen met anderen.",
      },
      {
        title: "Zorgeloos",
        description: "Alles is voor je geregeld, jij hoeft alleen maar te genieten.",
      },
      {
        title: "Lokale Kennis",
        description: "Onze gidsen kennen Turkije door en door en nemen je mee naar verborgen pareltjes.",
      },
    ],
    faq: [
      {
        question: "Hoe groot zijn de groepen?",
        answer: "Onze groepen bestaan uit maximaal 16 personen, zodat iedereen persoonlijke aandacht krijgt.",
      },
      {
        question: "Moet ik alles samen doen?",
        answer: "Nee, er is altijd vrije tijd ingepland zodat je ook op eigen gelegenheid kunt ontdekken.",
      },
    ],
  },
  maatwerk: {
    type: "maatwerk",
    heroTitle: "Maatwerk Reizen naar Turkije",
    heroSubtitle: "Volledig op maat gemaakte reizen die perfect aansluiten bij jouw wensen",
    heroImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1920&q=80",
    description: "Wil je een reis die volledig is afgestemd op jouw wensen, budget en reisstijl? Onze maatwerk reizen zijn perfect voor stellen, gezinnen of kleine groepen die een unieke, persoonlijke ervaring zoeken. Samen met onze reisexperts stel je een reis samen die precies bij jou past, van luxe resorts tot authentieke accommodaties, van actieve avonturen tot ontspannende vakanties.",
    highlights: [
      "Volledig op maat gemaakt",
      "Persoonlijk reisadvies",
      "Flexibele reisdatums",
      "Luxe of budget opties",
      "Privé gidsen en transfers",
    ],
    whyChoose: [
      {
        title: "Volledige Vrijheid",
        description: "Jij bepaalt het tempo, de bestemmingen en de activiteiten.",
      },
      {
        title: "Persoonlijke Aandacht",
        description: "Elke reis wordt speciaal voor jou samengesteld door onze experts.",
      },
      {
        title: "Unieke Ervaringen",
        description: "Toegang tot exclusieve locaties en ervaringen die niet in groepsreizen zitten.",
      },
    ],
    faq: [
      {
        question: "Hoe werkt het maatwerk proces?",
        answer: "We beginnen met een gesprek over jouw wensen, budget en interesses. Vervolgens stellen we een voorstel op dat we samen verfijnen tot het perfect is.",
      },
      {
        question: "Hoe lang duurt het om een maatwerk reis te plannen?",
        answer: "Meestal hebben we binnen 1-2 weken een eerste voorstel klaar, afhankelijk van de complexiteit van je wensen.",
      },
    ],
  },
  "self-drives": {
    type: "self-drives",
    heroTitle: "Self Drive Reizen in Turkije",
    heroSubtitle: "Ontdek Turkije op je eigen tempo met volledige vrijheid",
    heroImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80",
    description: "Voor reizigers die graag zelf de controle hebben, bieden we flexibele self drive reizen. Je krijgt een huurauto en een gedetailleerde routebeschrijving, maar bent vrij om te stoppen waar je wilt, langer te blijven waar het je bevalt, en je eigen tempo te bepalen. Perfect voor avonturiers die de vrijheid willen om Turkije op hun eigen manier te ontdekken.",
    highlights: [
      "Volledige vrijheid en flexibiliteit",
      "Gedetailleerde routebeschrijvingen",
      "24/7 support tijdens je reis",
      "Flexibele accommodaties",
      "GPS navigatie inbegrepen",
    ],
    whyChoose: [
      {
        title: "Vrijheid",
        description: "Stop waar je wilt, blijf langer waar het je bevalt, bepaal je eigen tempo.",
      },
      {
        title: "Avontuur",
        description: "Ontdek verborgen plekken die je alleen met een auto kunt bereiken.",
      },
      {
        title: "Flexibiliteit",
        description: "Pas je route aan onderweg, zonder vast te zitten aan een schema.",
      },
    ],
    faq: [
      {
        question: "Moet ik een internationaal rijbewijs hebben?",
        answer: "Ja, voor het huren van een auto in Turkije heb je een geldig internationaal rijbewijs nodig naast je Nederlandse rijbewijs.",
      },
      {
        question: "Is het veilig om in Turkije te rijden?",
        answer: "Ja, de hoofdwegen zijn goed onderhouden. We geven je tips over verkeersregels en veilig rijden in Turkije.",
      },
    ],
  },
  citytrips: {
    type: "citytrips",
    heroTitle: "City Trips naar Turkije",
    heroSubtitle: "Korte stedentrips naar de mooiste steden van Turkije",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    description: "Heb je weinig tijd maar wel zin in een onvergetelijke ervaring? Onze city trips zijn perfect voor een korte maar intense kennismaking met de mooiste steden van Turkije. Van de bruisende metropool Istanbul tot de historische steden aan de kust, ontdek in 3-5 dagen de highlights van elke stad met onze zorgvuldig samengestelde programma's.",
    highlights: [
      "Korte maar intensieve trips",
      "Perfect voor weekend of korte vakantie",
      "Alle highlights in één reis",
      "Centrale accommodaties",
      "Optionele excursies",
    ],
    whyChoose: [
      {
        title: "Tijdsefficiënt",
        description: "Ontdek de beste plekken van een stad in slechts een paar dagen.",
      },
      {
        title: "Betaalbaar",
        description: "Korte trips zijn vaak betaalbaarder dan langere reizen.",
      },
      {
        title: "Flexibel",
        description: "Perfect te combineren met een langere vakantie of als standalone trip.",
      },
    ],
    faq: [
      {
        question: "Hoe lang duren de city trips?",
        answer: "Onze city trips variëren van 3 tot 5 dagen, perfect voor een lang weekend of korte vakantie.",
      },
      {
        question: "Zijn de accommodaties centraal gelegen?",
        answer: "Ja, we kiezen altijd voor centrale accommodaties zodat je gemakkelijk alle bezienswaardigheden kunt bereiken.",
      },
    ],
  },
};

export const getTripTypePage = (type: TripType): TripTypePageContent => {
  return tripTypePages[type];
};

