// ─────────────────────────────────────────────────────────────
//  Contenuti del sito — unica fonte di verità per testi e link
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Matteo Pastorino",
  shortName: "MP",
  role: "Creative Frontend & Builder",
  email: "matteoomega99@gmail.com",
  github: "https://github.com/mpastorino1",
  linkedin: "https://www.linkedin.com/in/matteo-pastorino-a9393522b/",
} as const;

// Tre varianti di headline proposte: cambia HEADLINE per switchare.
export const HEADLINE_VARIANTS = {
  create: "Do vita a idee, interfacce ed esperienze digitali.",
  craft: "Frontend nell'anima, builder per vocazione.",
  bold: "Sviluppo interfacce che non si limitano a funzionare: si fanno ricordare.",
} as const;

export const HEADLINE = HEADLINE_VARIANTS.bold;
// Porzione evidenziata in color spark (deve comparire in HEADLINE)
export const HEADLINE_HIGHLIGHT = "si fanno ricordare.";

export const HERO = {
  status: "Disponibile per nuove idee e collaborazioni",
  subtitle:
    "Sono Matteo Pastorino. Il mio habitat naturale è il frontend moderno con Next.js e TypeScript, ma non mi fermo lì: sperimento su mobile con Expo, backend con Node.js e ovunque ci sia qualcosa di entusiasmante da costruire da zero.",
  ctaPrimary: "Scrivimi una mail",
  ctaSecondary: "Esplora il playground",
  microcopy:
    "Non è il solito portfolio: tocca, clicca e sperimenta. Questo spazio è il mio laboratorio.",
} as const;

export const ABOUT = {
  label: "La scintilla",
  title: "Il mio approccio",
  pull: "Non scrivo solo righe di codice: mi piace vedere nascere le cose.",
  paragraphs: [
    "C'è qualcosa di magico nel momento esatto in cui un'idea astratta, uno schizzo o un prototipo grezzo si trasforma in un'interfaccia viva, reattiva e fluida sotto le dita dell'utente.",
    "La mia bussola punta sempre verso il frontend: la cura per le micro-interazioni, la reattività visiva e l'architettura dei componenti. Ma quando un progetto chiama, non mi tiro mai indietro dall'esplorare il resto dello stack — dal backend all'ecosistema mobile. Per me la tecnologia non è un fine, ma lo strumento con cui dare forma a qualcosa che prima semplicemente non c'era.",
  ],
  pillars: [
    {
      title: "Visione d'insieme",
      text: "Parto dal frontend con cura maniacale per l'interazione, ma guardo sempre all'intero flusso del prodotto.",
    },
    {
      title: "Passione per la genesi",
      text: "Adoro la fase in cui il progetto prende vita, dalla prima riga di codice all'esperienza finita.",
    },
    {
      title: "Curiosità continua",
      text: "Se c'è una nuova libreria, un pattern innovativo o una transizione complessa da testare, la sto già provando.",
    },
  ],
} as const;

export const STACK = {
  label: "Lo Stack",
  title: "Gli strumenti del mestiere",
  tagline: "Cosa uso per trasformare un concetto in realtà digitale.",
  hint: "trascina · lancia · clicca",
  philosophy:
    "Type-safety, componenti modulari, performance e cura del dettaglio.",
  chips: [
    { label: "Next.js", note: "Il mio habitat: routing, RSC e performance out of the box." },
    { label: "React", note: "Componenti come pensiero: composizione prima di tutto." },
    { label: "TypeScript", note: "Type-safety end-to-end: refactor senza paura." },
    { label: "Tailwind CSS", note: "Sistemi di design rapidi, coerenti, mantenibili." },
    { label: "Framer Motion", note: "Micro-interazioni e transizioni che si fanno sentire." },
    { label: "Expo", note: "Mobile cross-platform con un feedback loop rapido." },
    { label: "React Native", note: "Esperienze native, gesti e reattività sotto le dita." },
    { label: "Node.js", note: "Backend aggrappato allo stesso linguaggio del frontend." },
    { label: "REST", note: "API chiare, prevedibili, ben documentate." },
    { label: "GraphQL", note: "Query precise quando il prodotto cresce." },
    { label: "Modern DBs", note: "Dalla struttura dei dati nasce il prodotto." },
    { label: "UI Animation", note: "Il movimento è gerarchia, non decorazione." },
  ],
} as const;

export const PLAYGROUND = {
  label: "Playground",
  title: "Esperimenti Creativi",
  subtitle: "Progetti, prototipi e idee che hanno preso vita.",
  callout:
    "In continuo aggiornamento. Sperimento spesso con nuove idee: se vuoi vedere a cosa sto lavorando in questo periodo, facciamoci due chiacchiere.",
  projects: [
    {
      tag: "Creative Coding · Next.js",
      title: "Personal Playground",
      text: "Questo stesso sito: un testbed per interazioni fluide, componenti custom e micro-animazioni.",
    },
    {
      tag: "Mobile · Expo · TypeScript",
      title: "Mobile Experience Concept",
      text: "Esplorazione di interfacce mobile-first focalizzate su gesti, reattività e design nativo.",
    },
    {
      tag: "Full Stack · Node.js · Next.js",
      title: "From 0 to 1 Prototype",
      text: "Dall'architettura database fino all'interfaccia utente: un'idea portata a terra e resa navigabile.",
    },
  ],
} as const;

export const CONTACT = {
  label: "Contatti",
  title: "Hai un'idea nel cassetto da far nascere? Parliamone.",
  subtitle:
    "Che si tratti di un'interfaccia complessa, un'applicazione web o un nuovo concept creativo, sono sempre aperto a scambiare due parole su progetti stimolanti.",
  copyLabel: "Copia email",
  copiedLabel: "Copiato ✓",
  footer: "Progettato e sviluppato con curiosità da Matteo Pastorino.",
} as const;
