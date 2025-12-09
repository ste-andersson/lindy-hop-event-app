# Lindy Hop Event App

En webbapplikation för Lindy Hop-evenemanget "Fall Vibes". Appen innehåller verktyg för att hjälpa dansare under evenemanget.

> **Notera**: Detta projekt skapades i [Lovable](https://lovable.dev).

**Live-app**: https://lindy-hop-event-app.lovable.app

## Funktioner

Appen innehåller tre huvudfunktioner:

- **BPM-mätare** - För att mäta hur snabb musiken är
- **Terrible Lindy Bot** - En komisk lindy hop bot som man kan ringa upp och ha röstkonversationer med om lindy hop
- **Dance Card** - Ett digitalt danskort för att hålla kolla på vilka man har dansat med och ska dansa med

## Teknisk stack

Projektet är byggt med moderna webbteknologier:

- **Vite** - Snabb build-tool och dev server
- **React 18** - UI-bibliotek
- **TypeScript** - Typad JavaScript
- **React Router** - Routing
- **shadcn-ui** - UI-komponenter baserade på Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Data fetching och state management
- **React Hook Form** - Formulärhantering
- **Zod** - Schema-validering

## Installation

För att köra projektet lokalt behöver du:

- Node.js (rekommenderas att installera via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm eller bun

### Steg för att komma igång

```sh
# 1. Klona repositoryt
git clone <YOUR_GIT_URL>

# 2. Navigera till projektmappen
cd lindy-hop-event-app

# 3. Installera dependencies
npm install

# 4. Starta utvecklingsservern
npm run dev
```

Appen kommer nu att köras på `http://localhost:5173` (eller annan port som Vite väljer).

## Tillgängliga kommandon

- `npm run dev` - Startar utvecklingsservern med hot-reload
- `npm run build` - Bygger produktionversionen
- `npm run build:dev` - Bygger i development-läge
- `npm run preview` - Förhandsvisar produktionsbyggen
- `npm run lint` - Kör ESLint för kodkvalitetskontroll

## Projektstruktur

```
lindy-hop-event-app/
├── src/
│   ├── components/     # Återanvändbara komponenter
│   │   ├── ui/        # shadcn-ui komponenter
│   │   └── NavLink.tsx
│   ├── pages/         # Sidkomponenter
│   │   ├── Menu.tsx
│   │   ├── BpmCounter.tsx
│   │   ├── TerribleLindyBot.tsx
│   │   ├── DanceCard.tsx
│   │   └── NotFound.tsx
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Hjälpfunktioner
│   ├── assets/        # Bilder och statiska filer
│   ├── App.tsx         # Huvudapplikationskomponent
│   └── main.tsx        # Applikationsentrypunkt
├── public/            # Statiska filer
└── package.json       # Projektkonfiguration och dependencies
```

## Deployment

Appen är deployad via Lovable och kan nås live på https://lindy-hop-event-app.lovable.app
