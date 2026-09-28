# Portfolio — Matteo Pastorino

Sito personale one-page: hero interattiva, approccio, stack con fisica, playground e contatti.

## Stack

Next.js 15 (App Router, `output: "export"`) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

## Comandi

```bash
npm install
npm run dev      # sviluppo su http://localhost:3000
npm run build    # build statica in ./out
```

Il build produce una cartella `out/` statica, pronta per qualsiasi hosting
(GitHub Pages, Vercel, Netlify, hosting statico). Su un path non-root
(es. GitHub Pages project site) imposta `basePath` in `next.config.ts`.

## Contenuti

Tutti i testi e i link vivono in **`lib/content.ts`**:

- `SITE.email` — email di contatto
- `SITE.linkedin` — profilo LinkedIn
- `HEADLINE` — cambia valore in `HEADLINE_VARIANTS.create | craft | bold` per switchare headline

## Interazioni

- **Hero**: campo di scintille su canvas che reagisce al puntatore
- **Stack (L'officina)**: badge con fisica — trascina, lancia, clicca per i dettagli; "rimescola" / "riordina"
- **Playground**: card con tilt 3D al passaggio del mouse
- **Contatti**: pulsante copia-email con feedback
- Pulsanti magnetici, reveal a scorrimento, barra di avanzamento scroll

Tutto rispetta `prefers-reduced-motion`.
