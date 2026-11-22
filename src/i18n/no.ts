import type { Dictionary } from "./en";

/** Norwegian (Bokmål). */
export const no: Dictionary = {
  meta: {
    title: "Abu Sahid Reza — Technical AI Product Manager",
    description:
      "Technical AI Product Manager med rundt 10 års erfaring fra programvare, som kombinerer praktisk utvikling med produktledelse. Har bygget Loominote, en KI-app for talenotater med 1 500 betalende abonnenter, og leder leveranser i stor skala hos TCS.",
    ogAlt: "Abu Sahid Reza — Technical AI Product Manager",
  },

  nav: {
    skip: "Hopp til innholdet",
    about: "Om meg",
    experience: "Erfaring",
    work: "Prosjekter",
    expertise: "Kompetanse",
    contact: "Kontakt",
    resume: "CV",
    menu: "Åpne meny",
    close: "Lukk meny",
    language: "Språk",
    home: "Abu Sahid Reza — forside",
  },

  hero: {
    eyebrow: "Technical AI Product Manager · LLM- og stemme-KI-produkter",
    titleA: "Jeg bygger intelligente produkter.",
    titleB: "Og skaper verdi som betyr noe.",
    sub: "Jeg er Abu Sahid Reza — en Technical AI Product Manager som brenner for å gjøre kompleks teknologi om til intelligente, menneskesentrerte produkter.",
    ctaPrimary: "Se arbeidet mitt",
    ctaSecondary: "Ta kontakt",
    scroll: "Rull",
    portraitAlt: "Portrett av Abu Sahid Reza",
    availability: "Åpen for muligheter over hele verden",
    caption: "Abu Sahid Reza",
    captionRole: "KI-produkt · Utvikling · Leveranse",
  },

  about: {
    label: "Om meg",
    title: "Teknologi er grunnmuren min. Produkttenkning er styrken min.",
    lead: "I rundt ti år har jeg jobbet der programvare møter menneskene som er avhengige av den. Jeg startet som iOS-utvikler, vokste inn i teknisk ledelse og leder i dag KI-produkter fra start til mål — fra den første prompten til den første betalende kunden.",
    chaptersTitle: "Veien så langt",
    chapters: [
      {
        year: "2016",
        title: "Utvikler",
        text: "Startet som iOS-utvikler, leverte produkter til kunder og vurderte krav, wireframes og design for teknisk gjennomførbarhet.",
      },
      {
        year: "2018",
        title: "Bygger",
        text: "Designet og utviklet mer enn ti iOS-apper i Swift, Objective-C, SwiftUI og UIKit, og ledet et Android-team på ni personer.",
      },
      {
        year: "2021",
        title: "Leder",
        text: "Som Module Lead leverte jeg app-moduler til Delta Air Lines-appen og bidro til løsningsdesign for Virgin Atlantic.",
      },
      {
        year: "2022",
        title: "Produkt",
        text: "Hos TCS: Delivery SPOC for programmet Ultimatix Reimagine, og teamleder og Scrum Master for et iOS-team.",
      },
      {
        year: "I dag",
        title: "KI",
        text: "Bygget og lanserte Loominote, en LLM-basert app for talenotater, som eneste produktleder og utvikler.",
      },
    ],
    pillars: [
      {
        title: "Teknisk dybde",
        text: "Praktisk programvareerfaring fra Swift og UIKit til tale-til-tekst- og LLM-API-er — slik at produktbeslutninger bygger på hvordan ting faktisk lages.",
      },
      {
        title: "Produktforståelse",
        text: "Visjon, veikart, PRD-er, brukerhistorier og akseptansekriterier — alltid knyttet til suksessmål som betyr noe for virksomheten.",
      },
      {
        title: "Leveranse i stor skala",
        text: "Én felles leveranseplan for CIO, forretningsenhetsleder, leveranseleder og produkteier — og fulgt helt frem til lansering.",
      },
    ],
  },

  experience: {
    label: "Erfaring",
    title: "En karriere bygget fra koden og opp.",
    sub: "Fra iOS-utvikling til ansvar for store leveranser og KI-produkter.",
    listLabel: "Roller",
    jobs: [
      {
        id: "tcs",
        company: "Tata Consultancy Services",
        short: "TCS",
        role: "AI Product Manager & Delivery Lead",
        period: "aug. 2022 – i dag",
        location: "Kolkata, India",
        summary:
          "Delivery SPOC for Ultimatix Reimagine og samtidig teamleder og Scrum Master for et iOS-team.",
        highlights: [
          "Delivery SPOC for programmet Ultimatix Reimagine, med CIO, forretningsenhetsleder, leveranseleder og produkteier samlet om én leveranseplan.",
          "Leverte 423 leveranser fordelt på fire arbeidsstrømmer.",
          "Samtidig teamleder og Scrum Master for iOS-teamet Major Incidents & Communication (MIC): sprintplanlegging, backlog-forbedring, retrospektiver og produksjonsstøtte.",
          "Skriver PRD-er, brukerhistorier og akseptansekriterier; leder kravverksteder og konsekvensanalyser av endringer sammen med utvikling, design og QA.",
          "Holder en fast teamøkt om hvordan LLM-er, KI-agenter og API-er fungerer.",
        ],
        tags: ["Produkteierskap", "Leveranse", "Scrum", "PRD-er og backlog"],
      },
      {
        id: "mindtree",
        company: "Mindtree (nå LTIMindtree)",
        short: "Mindtree",
        role: "Module Lead",
        period: "aug. 2021 – juli 2022",
        location: "Kolkata, India",
        summary: "Mobilleveranser for internasjonale flyselskaper.",
        highlights: [
          "Leverte app-moduler til Delta Air Lines-appen, som brukes av millioner av reisende.",
          "Bidro til kravinnsamling og løsningsdesign for Virgin Atlantics digitale produktportefølje.",
          "Koordinerte leveranser, testing og lanseringer av komponenter for å holde tidsplanen.",
        ],
        tags: ["Mobil", "Løsningsdesign", "Lanseringskoordinering"],
      },
      {
        id: "genius",
        company: "Genius Consultants Limited",
        short: "Genius",
        role: "iOS-utvikler",
        period: "aug. 2018 – aug. 2021",
        location: "Kolkata, India",
        summary: "Utviklet iOS-apper og ledet et team på tvers av plattformer.",
        highlights: [
          "Designet og utviklet 10+ iOS-apper i Swift, Objective-C, SwiftUI og UIKit.",
          "Ledet et team på ni personer som leverte en Android-app.",
          "Ledet innsiktsarbeid og overordnet design for mellomstore og store prosjekter.",
        ],
        tags: ["Swift", "SwiftUI", "UIKit", "Teamledelse"],
      },
      {
        id: "rplanx",
        company: "Rplanx Private Limited",
        short: "Rplanx",
        role: "iOS-utvikler",
        period: "nov. 2016 – mai 2018",
        location: "Kolkata, India",
        summary: "Der det begynte: iOS-produkter for kunder.",
        highlights: [
          "Leverte iOS-produkter til kunder i tide, i direkte dialog med kunder og prosjektledere.",
          "Vurderte krav, wireframes og design for teknisk gjennomførbarhet.",
        ],
        tags: ["iOS", "Kundeleveranser"],
      },
    ],
  },

  work: {
    label: "Utvalgte prosjekter",
    title: "Produkter med en historie. Resultater med tall.",
    problem: "Problem",
    approach: "Hva jeg gjorde",
    quality: "Kvalitet",
    result: "Resultat",
    role: "Rolle",
    loominote: {
      eyebrow: "Case 01 · KI-produkt",
      name: "Loominote",
      tagline: "KI som lytter.",
      description:
        "En KI-drevet app for talenotater som gjør opptak om til strukturerte transkripsjoner, sammendrag og konkrete innsikter.",
      role: "Produktleder og eneste utvikler",
      platformsLabel: "Laget for",
      platforms: ["iPhone", "Apple Watch", "iPad", "Mac"],
      stats: [
        { value: 1500, prefix: "", suffix: "", label: "betalende abonnenter" },
        { value: 25000, prefix: "", suffix: " USD", label: "netto omsetning" },
        { value: 4, prefix: "", suffix: "", label: "måneder" },
      ],
      modesTitle: "Én app. Tre måter å lytte på.",
      modesSub: "Hver modus har egne prompter, tilpasset hva opptaket skal brukes til.",
      modes: [
        {
          id: "meeting",
          name: "Møte",
          text: "Gjør et møte om til en transkripsjon, et sammendrag og oppgavene som kom ut av det.",
          sample: {
            title: "Ukentlig produktmøte",
            summary: "Ble enige om innholdet i lanseringen og flyttet to saker til neste sprint.",
            items: ["Bekreft lanseringsdato med QA", "Del oppdatert veikart", "Gå gjennom onboarding-tekstene"],
          },
        },
        {
          id: "lecture",
          name: "Forelesning",
          text: "Tar vare på lange foredrag og forelesninger som søkbare transkripsjoner med tydelige sammendrag.",
          sample: {
            title: "Forelesning 4 · Nevrale nettverk",
            summary: "Hvordan lag lærer representasjoner, og hvorfor trening krever mye data.",
            items: ["Hovedidé: lagvise representasjoner", "Se igjen: backpropagation", "Lesestoff til neste uke"],
          },
        },
        {
          id: "journal",
          name: "Dagbok",
          text: "Gjør personlige taledagbøker om til korte sammendrag du kan komme tilbake til.",
          sample: {
            title: "Kveldsrefleksjon",
            summary: "En fokusert dag. Godt å bli ferdig med utkastet tidlig.",
            items: ["Hold morgenene til fokusarbeid", "Ring hjem på søndag", "Begynn på den nye boka"],
          },
        },
      ],
      mockLabel: "Illustrasjon av grensesnittet",
      mockTranscript: "Transkripsjon",
      mockSummary: "Sammendrag",
      mockActions: "Oppgaver",
      mockRecording: "Opptak",
      pipelineTitle: "Slik fungerer det",
      pipeline: [
        { title: "Ta opp", text: "På iPhone, Apple Watch, iPad eller Mac." },
        { title: "Transkriber", text: "Sanntidstranskripsjon med tale-til-tekst-API-er." },
        { title: "Forstå", text: "Sammendrag og oppgaver fra LLM-API-er, med prompter per modus." },
        { title: "Forbedre", text: "Et evalueringsrammeverk og tilbakemeldinger i appen forbedrer promptene." },
      ],
      problem: "Opptak av møter, forelesninger og dagbøker er vanskelige å søke i og vanskelige å handle på.",
      approach:
        "Definerte visjonen og veikartet; bygget sanntidstranskripsjon, sammendrag og uttrekk av oppgaver på tale-til-tekst- og LLM-API-er; lanserte modusene Møte, Forelesning og Dagbok, hver med egne prompter.",
      quality:
        "Valgte KI-leverandører ut fra transkripsjonsnøyaktighet, kvalitet på sammendrag, svartid, kostnad og personvern; bygget et evalueringsrammeverk for kvalitet, relevans og nøyaktighet i sammendragene; brukte tilbakemeldinger i appen til å forbedre promptene.",
      result: "1 500 betalende abonnenter og 25 000 USD i netto omsetning i løpet av fire måneder.",
      appStore: "Se i App Store",
    },
    ultimatix: {
      eyebrow: "Case 02 · Transformasjon i stor skala",
      name: "Ultimatix Reimagine",
      tagline: "Endring i stor skala, levert punkt for punkt.",
      description:
        "Programmet som fornyer Ultimatix, virksomhetsplattformen som brukes av flere hundre tusen ansatte i TCS.",
      role: "AI Product Manager og Delivery SPOC",
      stakeholdersLabel: "Én plan, fire interessenter",
      planLabel: "Én felles leveranseplan",
      stakeholders: ["CIO", "Forretningsenhetsleder", "Leveranseleder", "Produkteier"],
      totalLabel: "leveranser fordelt på fire arbeidsstrømmer",
      breakdownLabel: "Levert per arbeidsstrøm",
      workstreams: [
        {
          name: "Rasjonalisering av e-post",
          count: 342,
          problem: "342 systemgenererte e-poster, hver med egen eier og målgruppe, måtte rasjonaliseres.",
          approach: "Gikk gjennom e-postene med eierne, ble enige om utfallet for hver enkelt og planla endringene inn i lanseringer.",
        },
        {
          name: "IACT",
          count: 35,
          problem: "35 IACT-saker måtte lukkes innenfor leveranseplanen for Reimagine.",
          approach: "Fulgte opp eier, avhengigheter og status for hver sak, og eskalerte hindringer tidlig.",
        },
        {
          name: "Endring av avsender-ID-er",
          count: 34,
          problem: "34 aktive avsender-ID-er måtte endres uten å forstyrre e-postleveransen eller de ansattes tillit til e-post fra Ultimatix.",
          approach: "Planla hver endring, koordinerte lanseringer med utvikling og QA, og tok hver endring gjennom godkjenning fra forretningssiden til den var lukket.",
        },
        {
          name: "Anbefalinger",
          count: 12,
          problem: "Interessentene i Reimagine trengte anbefalinger de kunne handle på.",
          approach: "Eide hver anbefaling gjennom gjennomgang med interessentene frem til en beslutningsklar overlevering.",
        },
      ],
      mic: {
        eyebrow: "Samtidig · Major Incidents & Communication (MIC)",
        title: "Kvalitet du kan regne med. Bokstavelig talt.",
        role: "Teamleder og Scrum Master",
        statLabel: "iOS-feil i produksjon gjennom 3 år med lanseringer, bekreftet av produkteieren.",
        note: "3 feil i produksjon for hele teamet i samme periode (2 backend, 1 Android), og ingen krevde en hasteretting.",
      },
    },
  },

  expertise: {
    label: "Kompetanse",
    title: "Der utvikling møter produktledelse.",
    groups: [
      {
        name: "KI og produkt",
        items: [
          "KI-produktstrategi",
          "LLM-integrasjon",
          "Prompt engineering",
          "KI-evaluering",
          "KI-agenter",
          "Produktveikart",
          "Produktinnsikt",
          "Produktanalyse",
        ],
      },
      {
        name: "Teknologi",
        items: ["Swift", "SwiftUI", "UIKit", "iOS-utvikling", "REST-API-er", "Tale-til-tekst-API-er", "LLM-API-er"],
      },
      {
        name: "Ledelse",
        items: [
          "Produkteierskap",
          "Interessenthåndtering",
          "Smidig leveranse",
          "Scrum",
          "Tverrfaglig ledelse",
          "Programledelse i stor skala",
        ],
      },
    ],
  },

  achievements: {
    label: "Resultater",
    title: "Tallene bak arbeidet.",
    items: [
      { value: 10, prefix: "", suffix: "+", label: "År", detail: "Erfaring med programvare og produkt" },
      { value: 1500, prefix: "", suffix: "", label: "Abonnenter", detail: "Betalende Loominote-abonnenter" },
      { value: 25000, prefix: "", suffix: " USD", label: "Omsetning", detail: "Netto omsetning på fire måneder" },
      { value: 423, prefix: "", suffix: "", label: "Levert", detail: "Leveranser i et virksomhetsprogram" },
      { value: 0, prefix: "", suffix: "", label: "Feil", detail: "iOS-feil i produksjon på tre år" },
    ],
  },

  education: {
    label: "Utdanning og læring",
    title: "Alltid i læring. Særlig nå.",
    degreeLabel: "Utdanning",
    degree: "B.Tech. i Computer Science and Engineering (informatikk)",
    school: "Calcutta Institute of Engineering and Management",
    place: "Kolkata, India",
    year: "2015",
    certsLabel: "Sertifiseringer",
    completed: "Fullført",
    inProgress: "Pågår",
    certs: [
      { name: "Claude 101", issuer: "Anthropic", status: "completed" },
      { name: "Claude Certified Associate – Foundations", issuer: "Anthropic", status: "inProgress" },
      { name: "Claude Code-sertifisering", issuer: "Anthropic", status: "inProgress" },
    ],
    learningLabel: "Kontinuerlig læring innen KI",
    learning: "Ved siden av sertifiseringene holder jeg en fast teamøkt hos TCS om hvordan LLM-er, KI-agenter og API-er fungerer.",
    languagesLabel: "Språk",
    languages: ["Engelsk", "Tysk · A1–A2, under opplæring"],
  },

  contact: {
    label: "Kontakt",
    title: "Har du en spennende utfordring? La oss bygge noe meningsfullt.",
    sub: "Åpen for muligheter og samarbeid over hele verden — innen KI-produktledelse, produktledelse og store virksomhetsprogrammer.",
    availabilityLabel: "Tilgjengelighet",
    availability: "Åpen for internasjonale roller — fjernarbeid, hybrid eller flytting.",
    emailLabel: "E-post",
    linkedinLabel: "LinkedIn",
    resumeLabel: "Last ned CV",
    resumeButton: "CV",
    pdf: "PDF",
    form: {
      title: "Send en melding",
      name: "Navn",
      email: "E-post",
      company: "Selskap",
      optional: "valgfritt",
      message: "Melding",
      placeholder: "Fortell meg om rollen, produktet eller utfordringen.",
      send: "Send melding",
      sending: "Sender …",
      success: "Takk! Meldingen din er sendt, og jeg svarer snart.",
      mailtoSuccess: "E-postprogrammet ditt skal nå være åpnet med meldingen klar til sending.",
      error: "Noe gikk galt. Send meg gjerne en e-post direkte i stedet.",
      required: "Fyll ut dette feltet.",
      invalidEmail: "Skriv inn en gyldig e-postadresse.",
      privacy: "Opplysningene dine brukes bare til å svare deg.",
      subject: "Hei fra nettsiden din",
    },
  },

  footer: {
    tagline: "Technical AI Product Manager",
    rights: "Alle rettigheter forbeholdt.",
    top: "Til toppen",
  },
};
