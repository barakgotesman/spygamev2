# Spy Game (spygamev2)

Pass-the-phone party game based on Spyfall. Originally an Angular 10 app (2020, hand-written); rewritten in React.
One device, 2+ players: everyone secretly sees the same location except the spy(s), then players question each other
against a timer and vote on who the spy is.

## Stack
Vite · React 19 · TypeScript (strict) · Tailwind CSS v4 · Zustand (+ persist) · motion (Framer Motion) · lucide-react · Vitest + Testing Library.

## Commands
```bash
npm run dev         # vite dev server
npm run build       # typecheck + production build
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm test            # vitest run
```

## Game rules and flow
Phase machine lives in `useGameStore` (`setup | reveal | round | settings`), no router.
1. **Setup** - players (min 2) and spies (1..players). Changing one clamps the other (see `lib/clampCounts.ts`). START picks a random location and random spy seats.
2. **Reveal** - "Player N" card; tap/hold to reveal role (Spy or location), "Got it" hides it and passes to the next player. After the last player the round starts. Cancel resets.
3. **Round** - timer (default 7 min, start/pause), vote pool equal to number of players (+/- per player), "Time's up" state, then spy reveal and New Game.
4. **Settings** - Locations (add name + optional image URL, delete, reset to defaults, list/grid view) and Timer (minutes). Persisted in localStorage.
Spies do not know each other. Default locations live in `src/data/defaultLocations.ts`.

## Project structure
`src/features/<feature>/` screens and feature-local components · `src/components/` shared UI · `src/store/` Zustand stores ·
`src/lib/` pure, unit-tested logic · `src/hooks/` reusable hooks · `src/data/` static data · `src/types/` shared types.

## Conventions
- TypeScript strict. No `any`, no non-null `!`, explicit return types on exported functions, `type` over `interface` unless extending.
- Function components and hooks only. Named exports only (default export only for config files).
- PascalCase for components/files that export a component, camelCase for everything else (`useGameStore.ts`, `formatTime.ts`).
- Feature folders; keep files small and single-purpose. Pure logic goes in `lib/` with a colocated `*.test.ts`.
- Zustand: always use selectors (`useGameStore((s) => s.phase)`), never subscribe to the whole store.
- Tailwind utilities only, design tokens in `@theme` in `src/index.css`. No inline styles, no CSS modules, no Bootstrap/jQuery.
- No `console.log` in committed code. No hot-linked images: bundle assets under `public/` or `src/assets/`.
- Comments explain why, not what. English only in code and UI copy; fix typos (it is "reset", "spies", "restaurant").
- Accessibility: semantic elements, 44px minimum touch targets, visible focus rings, aria labels on icon buttons, respect `prefers-reduced-motion`.
- Mobile-first: `dvh` units, safe-area insets, no tap-highlight, inputs at 16px+ to avoid iOS zoom, keep screen awake during a round (Wake Lock).
- Never leak a role: reveal screens must auto-hide and never persist a role in the DOM when hidden.
- Destructive actions (cancel game) go through `ConfirmDialog`.

## Design
"Ticket roll" world, not a dark dashboard: every screen is flooded with one saturated ticket stock (raffle red, cobalt, mint, a per-player color on reveal) and the objects on it are notched, perforated tickets printed in ink. Each player gets an "ADMIT ONE" ticket to the location; the spy's ticket is stamped VOID. Votes are tally marks. Fonts (self-hosted): Ultra (display), Bricolage Grotesque (UI), Courier Prime (printed details).
Avoid: near-black + neon, condensed all-caps display, generic rounded dark cards. Role text must always fit (`useFitText`); test long names at 320x568.
Use these skills when working on UI: `impeccable`, `mobile-native`, `emil-design-eng`, `animate`, `break-ui` (stress-test worst-case data), `vercel:react-best-practices` (review).

## Git
Remote `origin` is https://github.com/barakgotesman/spygamev2.git. Never push, force-push or open PRs without asking.
Small focused commits with imperative messages.
